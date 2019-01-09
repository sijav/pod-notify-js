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
	serviceWorker?: string;
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
}

declare type PodEventType = "connect" | "disconnect" | "reconnect" | "message" | "asyncReady" | "stateChange" | "error";

declare interface DeviceUUIDParsed {
	language?: string;
	platform?: string;
	os?: string;
	cpuCores?: number;
	silkAccelerated?: boolean;
	isAuthoritative?: boolean;
	isKindleFire?: boolean;
	isDesktop?: boolean;
	isMobile?: boolean;
	isTablet?: boolean;
	isWindows?: boolean;
	isLinux?: boolean;
	isLinux64?: boolean;
	isMac?: boolean;
	isiPad?: boolean;
	isiPhone?: boolean;
	isiPod?: boolean;
	isSmartTV?: boolean;
	pixelDepth?: string;
	isTouchScree?: boolean;
	resolution?: number[];
}

declare interface NotificationToSend {
	title: string;
	text: string;
	onClose: (e) => void;
	onOpen: (e) => void;
	onShow: (e) => void;
}

export { NotificationType, GenericNotification, Global, NotifyOptions, PushParams, PluginManifest, PushPermission, PodNotifyConfig, ClientUniques, PodEventType, DeviceUUIDParsed, NotificationToSend }