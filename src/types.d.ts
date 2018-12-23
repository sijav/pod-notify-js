declare interface NotificationType {
	prototype: Notification;
	new(title: string, options?: NotificationOptions): Notification;
	readonly maxActions: number;
	readonly permission: NotificationPermission;
	requestPermission(deprecatedCallback?: NotificationPermissionCallback): Promise<NotificationPermission>;
}

declare type GenericNotification = NotificationType | any;

declare interface Global {
	Notification?: NotificationType;
	webkitNotifications?: any;
	external?: any;
	navigator?: Navigator;
}

declare interface NotifyOptions {
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

declare interface PushParams {
	serviceWorker?: string;
	fallback?: Function;
}

declare interface PluginManifest {
	plugin: {};
	config?: PushParams;
}

declare interface PushPermission {
	DEFAULT: string;
	GRANTED: string;
	DENIED: string;

	request(onGranted?: Function, onDenied?: Function): void | Promise<void>;

	has(): boolean;

	get(): string;
}

declare interface PodNotifyConfig {
	socketAddress: string;
	token: string;
	serverName: string;
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
}

declare interface ClientUniques {
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
	hasLocalStorage: boolean;
}

declare type PodEventType = "connect" | "disconnect" | "reconnect" | "message" | "asyncReady" | "stateChange" | "error";

export { NotificationType, GenericNotification, Global, NotifyOptions, PushParams, PluginManifest, PushPermission, PodNotifyConfig, ClientUniques, PodEventType }