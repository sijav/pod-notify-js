declare module 'pod-notify-js' {

	export default class Notify {
		public constructor(config?: PodNotifyConfig);
		public notify: Notify;
		public config: PodNotifyConfig;
		public clientUniques: ClientUniques;
		public serviceWorkerSubscription?: PushSubscription | null;
		public on: (eventName: PodEventType, callback: (params: any, ack?: any) => void) => string | undefined;
		public off: (eventName: PodEventType, id: number) => string | undefined;
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
