import {BaseModel} from "../../../dist/bambis-BaseMVC.standalone.js";

export class GameModel extends BaseModel {
	constructor(data, options) {
		super(data, Object.assign({}, options, {
			defaults: {
				title: null,
				year: null,
				publisher: null,
				regions: []
			}
		}));
	}
}
