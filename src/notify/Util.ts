export default class Util {
	public static isUndefined(obj: any) {
		return obj === undefined;
	}

	public static isNull(obj: any) {
		return obj === null;
	}

	public static isString(obj: any) {
		return typeof obj === 'string';
	}

	public static isFunction(obj: any) {
		return obj && {}.toString.call(obj) === '[object Function]';
	}

	public static isObject(obj: any) {
		return typeof obj === 'object';
	}

	public static objectMerge(target: any, source: any) {
		for (const key in source) {
			if (
				target.hasOwnProperty(key) &&
				this.isObject(target[key]) &&
				this.isObject(source[key])
			) {
				this.objectMerge(target[key], source[key]);
			} else {
				target[key] = source[key];
			}
		}
	}
}