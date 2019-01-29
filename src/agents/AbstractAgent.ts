import { Global } from '../types';

export default class AbstractAgent {
	protected _win: Global;

	constructor(win: Global) {
		this._win = win;
	}
}