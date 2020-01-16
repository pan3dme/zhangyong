/**
* ShenjiezhimenModel
*/
module game{
	export class GodDoorModel{
		private static _instance: GodDoorModel;
		static getInstance(): GodDoorModel {
			if (!GodDoorModel._instance) {
				GodDoorModel._instance = new GodDoorModel();
			}
			return GodDoorModel._instance;
		}

		public getGodList($teamType:number):Array<GodItemVo>{
			let tab:tb.TB_divinity_set = tb.TB_divinity_set.get_TB_divinity_set();
			let allgods:Array<GodItemVo> = App.hero.getGodAry();
			let needGods = new Array;
			for (var i = 0; i < allgods.length; i++) {
				let curgod = allgods[i];
				//符合星级条件
				if(tab.star.indexOf(Number(curgod.starLevel)) != -1){
					//符合类型
					let racetype:number = curgod.tab_god.race_type;
					if(($teamType == 0 && racetype != iface.tb_prop.godRaceTypeKey.light && racetype != iface.tb_prop.godRaceTypeKey.dark) || racetype == $teamType){
						needGods.push(curgod);
					}
				}
			}
			return needGods;
		}


	}
}