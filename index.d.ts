declare module 'pod-notify-js' {

	export default class PodNotify {
		public constructor(config?: PodNotifyConfig);
		public notify: Notify;
		public config: PodNotifyConfig;
		public clientUniques: ClientUniques;
		public serviceWorkerSubscription?: PushSubscription | null;
		public on: (eventName: PodEventType, callback: (params: any, ack?: any) => void) => string | undefined;
		public off: (eventName: PodEventType, id: string) => boolean;
	}

	export class Notify {
		public Permission: PushPermission;
		constructor(win: Window);
		create: (title: string, options: NotifyOptions) => Promise<void>;
		count: () => number;
		close: (tag: string) => boolean | undefined;
		clear: () => boolean;
		supported: () => boolean;
		config: (settings?: PushParams) => PushParams;
		extend: (manifest: PluginManifest) => void;
	}

	export interface PluginManifest {
		plugin: {};
		config?: PushParams;
	}

	export interface PushParams {
		serviceWorker?: string;
		fallback?: Function;
	}

	export interface NotifyOptions {
		body?: string;
		icon?: string;
		link?: string;
		timeout?: number;
		tag?: string;
		requireInteraction?: boolean;
		vibrate?: boolean | Number | Number[];
		silent?: boolean;
		data?: any;
		onClick?: Function;
		onClose?: Function;
		onError?: Function;
		onShow?: Function;
		title?: string;
	}

	export interface NotificationType {
		prototype: Notification;
		new(title: string, options?: NotificationOptions): Notification;
		readonly maxActions: number;
		readonly permission: NotificationPermission;
		requestPermission(deprecatedCallback?: NotificationPermissionCallback): Promise<NotificationPermission>;
	}

	export interface PushPermission {
		DEFAULT: string;
		GRANTED: string;
		DENIED: string;

		request(onGranted?: Function, onDenied?: Function): void | Promise<void>;

		has(): boolean;

		get(): string;
	}

	export interface PodNotifyConfig {
		socketAddress: string;
		token: string;
		serverName: string;
		appId?: string;
		handlePushNotification?: boolean;
		wsConnectionWaitTime?: number;
		connectionCheckTimeout?: number;
		connectionCheckTimeoutThreshold?: number;
		messageTtl?: number;
		serverRegisteration?: boolean;
		connectionRetryInterval?: number;
		asyncLogging?: {
			onFunction?: boolean;
			onMessageReceive?: boolean;
			onMessageSend?: boolean;
			workerId?: number;
		};
		serviceWorker?: string;
	}

	export interface ClientUniques {
		deviceId: string;
		browser: string;
		browserVersion: string;
		browserMajorVersion: string;
		os: string;
		osVersion: string;
		deviceName: string;
		deviceType: string;
		deviceVendor: string;
		currentResolution: string;
	}

	export type PodEventType = "notification" | "connect" | "disconnect" | "reconnect" | "message" | "asyncReady" | "stateChange" | "error";
}
