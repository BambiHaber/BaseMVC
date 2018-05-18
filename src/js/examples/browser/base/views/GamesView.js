import {BaseView} from "../../../dist/bambis-BaseMVC.standalone.js";
import {GameCollection} from "../collections/GameCollection.js";
import GamesTemplate from "../templates/GamesTemplate.js";
import {GamesData} from "../data/GamesData.js";

export class GamesView extends BaseView {
	constructor() {
		super();
		this.el = document.querySelector('table');
		this.model = new GameCollection(GamesData);
		this.template = GamesTemplate;
	}
}
