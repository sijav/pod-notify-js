import { Notify } from './notify';
import { Global, PodNotifyConfig, ClientUniques, PodEventType, DeviceUUIDParsed, NotificationToSend } from './types';
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
	public notify: Notify;
	public config: PodNotifyConfig;
	public clientUniques: ClientUniques;
	public serviceWorkerSubscription?: PushSubscription | null;
	private _eventCallbacks: {
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
	private _async: any;
	private _appId: string;
	private _deviceFingerPrint: string;
	private _peerId?: string;
	private _connected: boolean = false;
	private _uniqueInfo: {
		lat: number | null;
		lng: number | null;
		OS: string;
		Brand: string;
		Version: string;
		model: string;
	};
	private _uniqueInfoString: string;
	private _notificationStack: NotificationToSend[] = [];

	constructor(config?: PodNotifyConfig) {
		this._getLatLng();
		// @ts-ignore
		this.notify = new Notify(typeof window !== 'undefined' ? window as Global : global as Global);
		this.config = config || {
			socketAddress: 'ws://172.16.110.235:8003/ws',
			token: '2233',
			serverName: 'mnot'
		};
		this._appId = this.config.appId || localStorage.getItem('appId') || new Date().getTime().toString();
		localStorage.setItem('appId', this._appId);
		const deviceUUID = new DeviceUUID();
		const uuid: string = deviceUUID.get();
		const parsedDevice: DeviceUUIDParsed = deviceUUID.parse();
		const parser = new UAParser();
		const browser = parser.getBrowser();
		const device = parser.getDevice();
		const os = parser.getOS();
		this._deviceFingerPrint = localStorage.getItem('deviceId') || uuid;
		localStorage.setItem('deviceId', this._deviceFingerPrint);
		this.clientUniques = {
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
			OS: this.clientUniques.os || '',
			Brand: this.clientUniques.deviceVendor || '',
			Version: this.clientUniques.osVersion || '',
			model: this.clientUniques.deviceName || ''
		}
		this._uniqueInfoString = JSON.stringify(this._uniqueInfo);
		if (this.config.serviceWorker) {
			this.notify.config({
				serviceWorker: this.config.serviceWorker,
				fallback: () => { } // TODO: Change this fallback to support push on low end browsers
			});
		}
		this._asyncInitialize();
	}

	public on = (eventName: PodEventType, callback: (_peerId?: string) => void) => {
		if (this._eventCallbacks[eventName]) {
			const id = generateUUID();
			this._eventCallbacks[eventName][id] = callback;
			return id;
		}
		if (eventName === PodEventTypes.CONNECT && this._connected) {
			callback(this._peerId);
		}
	}

	private _asyncInitialize = () => {
		this._async = new Async({
			...this.config,
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
					peerName: this.config.serverName,
					content: JSON.stringify({
						serviceName: "SetStatusPush",
						messageType: 547,
						content: JSON.stringify({
							type: 10,
							messageId: null,
							senderId: null,
							receiverId: this._peerId,
							appId: this._appId,
							deviceId: this.clientUniques.deviceId,
							token: this.config.token,
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
						if (this.config.handlePushNotification) {
							this._sendNotif({
								text: contentChild.text,
								title: contentChild.title,
								onClose: () => {
									this._async.send({
										type: 4,
										content: {
											peerName: "mnot",
											content: JSON.stringify({
												serviceName: "SetStatusPush",
												messageType: 547,
												content: JSON.stringify({
													type: 13,
													messageId: contentChild.messageId,
													senderId: contentChild.senderId,
													receiverId: this._peerId,
													appId: this._appId,
													deviceId: this.clientUniques.deviceId,
													token: this.config.token,
													sdkType: 'WEB',
													info: this._uniqueInfoString
												})
											})
										}
									});
								},/*
								onError: () => {
									this._async.send({
										type: 4,
										content: {
											peerName: "mnot",
											content: JSON.stringify({
												serviceName: "SetStatusPush",
												messageType: 547,
												content: JSON.stringify({
													type: 13,
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
								},*/
								onShow: () => {
									this._async.send({
										type: 4,
										content: {
											peerName: "mnot",
											content: JSON.stringify({
												serviceName: "SetStatusPush",
												messageType: 547,
												content: JSON.stringify({
													type: 11,
													messageId: contentChild.messageId,
													senderId: contentChild.senderId,
													receiverId: this._peerId,
													appId: this._appId,
													deviceId: this.clientUniques.deviceId,
													token: this.config.token,
													sdkType: 'WEB',
													info: this._uniqueInfoString
												})
											})
										}
									});
								},
								onClick: () => {
									this._async.send({
										type: 4,
										content: {
											peerName: "mnot",
											content: JSON.stringify({
												serviceName: "SetStatusPush",
												messageType: 547,
												content: JSON.stringify({
													type: 12,
													messageId: contentChild.messageId,
													senderId: contentChild.senderId,
													receiverId: this._peerId,
													appId: this._appId,
													deviceId: this.clientUniques.deviceId,
													token: this.config.token,
													sdkType: 'WEB',
													info: this._uniqueInfoString
												})
											})
										}
									});
								}
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

	private _getLatLng = () => {
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
		}).catch(this._getLatLng);
	}

	private _fireEvent = (eventName: PodEventType, param: any, ack?: any) => {
		try {
			if (ack) {
				for (const id in this._eventCallbacks[eventName]) {
					this._eventCallbacks[eventName][id](param, ack);
				}
			} else {
				for (const id in this._eventCallbacks[eventName]) {
					this._eventCallbacks[eventName][id](param);
				}
			}
		} catch (e) {
			this._fireEvent(PodEventTypes.ERROR, {
				errorCode: 999,
				errorMessage: "Unknown ERROR!",
				errorEvent: e
			});
		}
	};

	private _sendNotif = (notif?: NotificationToSend) => {
		if(notif) {
			this._notificationStack.push(notif);
		}
		if(this.notify.Permission.has()) {
			this._notificationStack.forEach((item) => {
				this.notify.create(item.title || '', {
					body: item.text || '',
					title: item.title || '',
					vibrate: [100, 50, 100],
					data: {
						dateOfArrival: Date.now()
					},
					requireInteraction: true,
					onClick: item.onClick,
					onClose: item.onClose,
					onError: item.onError,
					onShow: item.onShow
				});
			});
			this._notificationStack = [];
		} else {
			this.notify.Permission.request(() => {
				this._sendNotif();
			}, () => {});
		}
	}
}