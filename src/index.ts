import { Notify } from './notify';
import { Global, PodNotifyConfig, ClientUniques, PodEventType, DeviceUUIDParsed } from './types';
import generateUUID from './utility/GenerateUUID';
// @ts-ignore
import Async from 'podasync';
import axios from 'axios';
// @ts-ignore
import { DeviceUUID } from 'device-uuid';
import UAParser from 'ua-parser-js';

const PodEventTypes : {
	CONNECT: "connect";
	DISCONNECT: "disconnect";
	RECONNECT: "reconnect";
	MESSAGE: "message";
	ASYNC_READY: "asyncReady";
	STATE_CHANGE: "stateChange";
	ERROR: "error"
} = {
	CONNECT: "connect",
	DISCONNECT: "disconnect",
	RECONNECT: "reconnect",
	MESSAGE: "message",
	ASYNC_READY: "asyncReady",
	STATE_CHANGE: "stateChange",
	ERROR: "error"
}

export default class PodNotify {
	Notify: Notify;
	Config: PodNotifyConfig;
	ClientUniques: ClientUniques;
	_eventCallbacks: {
		connect: any,
		disconnect: any,
		reconnect: any,
		message: any,
		asyncReady: any,
		stateChange: any,
		error: any
	} = {
		connect: {},
		disconnect: {},
		reconnect: {},
		message: {},
		asyncReady: {},
		stateChange: {},
		error: {}
	};
	_async: any;
	_appId: string;
	_deviceFingerPrint: string;
	_peerId?: string;
	_connected: boolean = false;
	_uniqueInfo: {
		lat: number | null;
		lng: number | null;
		OS: string;
		Brand: string;
		Version: string;
		model: string;
	};
	_uniqueInfoString: string;

	constructor(config?: PodNotifyConfig) {
		this._getLatLng();
		// @ts-ignore
		this.Notify = new Notify(typeof window !== 'undefined' ? window as Global : global as Global);
		this.Config = config || {
			socketAddress: 'ws://172.16.110.235:8003/ws',
			token: '2233',
			serverName: 'mnot'
		};
		this._appId = localStorage.getItem('appId') || new Date().getTime().toString();
		const deviceUUID = new DeviceUUID();
		const uuid: string = deviceUUID.get();
		const parsedDevice: DeviceUUIDParsed = deviceUUID.parse();
		const parser = new UAParser();
		const browser = parser.getBrowser();
		const device = parser.getDevice();
		const os = parser.getOS();
		this._deviceFingerPrint = localStorage.getItem('deviceId') || uuid;
		localStorage.setItem('deviceId', this._deviceFingerPrint);
		this.ClientUniques = {
			browser: browser.name || '',
			browserMajorVersion: browser.major || '',
			browserVersion: browser.version || '',
			currentResolution: (parsedDevice.resolution || []).join('x'),
			deviceId: this._deviceFingerPrint,
			deviceName: device.model || '',
			deviceType: device.type || '',
			deviceVendor: device.vendor || '',
			os: os.name || '',
			osVersion: os.version || ''
		};
		this._uniqueInfo = {
			lat: null,
			lng: null,
			OS: this.ClientUniques.os || '',
			Brand: this.ClientUniques.deviceVendor || '',
			Version: this.ClientUniques.osVersion || '',
			model: this.ClientUniques.deviceName || ''
		}
		this._uniqueInfoString = JSON.stringify(this._uniqueInfo);
		this._async = new Async({
			...this.Config,
			appId: this._appId,
			deviceId: this._deviceFingerPrint
		});
		this._async.on(PodEventTypes.CONNECT, (peerId: string) => {
			this._peerId = peerId;
			this._connected = true;
			this._fireEvent(PodEventTypes.CONNECT, this._peerId);
		});
		this._async.on(PodEventTypes.DISCONNECT, (param: any, ack?: any) => {
			this._peerId = undefined;
			this._connected = false;
			this._fireEvent(PodEventTypes.DISCONNECT, param, ack);
		});
		this._async.on(PodEventTypes.ERROR, (param: any, ack?: any) => {
			this._fireEvent(PodEventTypes.ERROR, param, ack);
		});
		this._async.on(PodEventTypes.ASYNC_READY, (param: any, ack?: any) => {
			this._peerId = this._peerId || this._async.getPeerId();
			this._async.send({
				type: 4,
				content: {
				  peerName: this.Config.serverName,
				  content: JSON.stringify({
					serviceName: "SetStatusPush",
					messageType: 547,
					content: JSON.stringify({
					  type: 0,
					  messageId: null,
					  senderId: null,
					  receiverId: this._peerId,
					  appId: this._appId,
					  deviceId: this.ClientUniques.deviceId,
					  token: this.Config.token,
					  sdkType: 'WEB',
					  info: this._uniqueInfoString
					})
				  })
				}
			});
			this._fireEvent(PodEventTypes.ASYNC_READY, param, ack);
		});
		this._async.on(PodEventTypes.MESSAGE, (param: any, ack?: any) => {
			try {
				const content = JSON.parse(param.content);
				if (content.messageType === 545) {
					const contentChild = JSON.parse(content.content);
					if (contentChild.messageId && contentChild.senderId) {
						this._async.send({
						  type: 4,
						  content: {
							peerName: "mnot",
							content: JSON.stringify({
							  serviceName: "SetStatusPush",
							  messageType: 547,
							  content: JSON.stringify({
								type: 1,
								messageId: contentChild.messageId,
								senderId: contentChild.senderId,
								receiverId: this._peerId,
								appId: this._appId,
								deviceId: this.ClientUniques.deviceId,
								token: this.Config.token,
								sdkType: 'WEB',
								info: this._uniqueInfoString
							  })
							})
						  }
						});
						if (this.Config.handlePushNotification) {
							this.Notify.create(contentChild.title, {
								body: contentChild.text,
								title: contentChild.title
							});
						}
					}
				}
			} catch (_) { }
			this._fireEvent(PodEventTypes.MESSAGE, param, ack);
		});
		this._async.on(PodEventTypes.STATE_CHANGE, (param: any, ack?: any) => {
			this._fireEvent(PodEventTypes.STATE_CHANGE, param, ack);
		});
	}

	_getLatLng = () => {
		axios.get('https://geoip-db.com/json/').then((res: {
			data: {
				country_code?: string;
				country_name?: string;
				city?: string;
				postal?: string;
				latitude?: number;
				longitude?: number;
				IPv4?: string;
				state: string;
			}
		}) => {
			this._uniqueInfo.lat = res.data.latitude || null;
			this._uniqueInfo.lng = res.data.longitude || null;
			this._uniqueInfoString = JSON.stringify(this._uniqueInfo);
		}).catch(() => {this._getLatLng});
	}

	_fireEvent = (eventName: PodEventType, param: any, ack?: any) => {
		try {
			if (ack) {
				for (let id in this._eventCallbacks[eventName])
					this._eventCallbacks[eventName][id](param, ack);
			} else {
				for (let id in this._eventCallbacks[eventName])
					this._eventCallbacks[eventName][id](param);
			}
		} catch (e) {
			this._fireEvent(PodEventTypes.ERROR, {
				errorCode: 999,
				errorMessage: "Unknown ERROR!",
				errorEvent: e
			});
		}
	};

	on = (eventName: PodEventType, callback: Function) => {
		if (this._eventCallbacks[eventName]) {
			var id = generateUUID();
			this._eventCallbacks[eventName][id] = callback;
			return id;
		}
		if (eventName === PodEventTypes.CONNECT && this._connected) {
			callback(this._peerId);
		}
	}
}
