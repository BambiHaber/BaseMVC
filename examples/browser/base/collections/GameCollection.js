import {BaseCollection} from "../../../dist/bambis-BaseMVC.standalone.js";
import {GameModel} from "../models/GameModel.js";

export class GameCollection extends BaseCollection {
	constructor(data, options) {
		super(data, Object.assign({}, options, {
			model: GameModel
		}))
	}
}
