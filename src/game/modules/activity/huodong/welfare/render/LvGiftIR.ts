/**
* name 
*/
module game {
	export class LvGiftIR extends ui.activity.huodong.welfare.render.DengjilibaoRenderUI {
		constructor() {
			super();			
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refreshData() {
			let $data = this._dataSource;
			if ($data) {
				let arrAwerad: Array<ItemVo> = new Array();
				for (let i in $data.reward) {
					arrAwerad.push(new ItemVo($data.reward[i][0], $data.reward[i][1]));
				}
				this.list_item.dataSource = arrAwerad;
				let levelBool:boolean = App.hero.level < $data.level;
				this.btn_lingqu.on(Laya.Event.CLICK, this, this.linquDengjiLiBao);
				let lingquBool: boolean = $data.ID in App.hero.welfare.levelGiftPack;				
				this.img_already.visible = App.hero.welfare.totalLoginDay >= $data.ID;				
				this.lab_level.text = $data.level + LanMgr.getLan("级奖励:", -1);
				this.btn_lingqu.skin = "comp/button/btn_qianwang.png";
				this.btn_lingqu.labelStrokeColor = "#538901";
				if (levelBool){
					this.btn_lingqu.label = LanMgr.getLan("未达到", -1)
				}else{
					this.btn_lingqu.label = LanMgr.getLan("领取", -1);
				}
				this.btn_lingqu.disabled = levelBool;
				this.img_already.visible = lingquBool;
				this.btn_lingqu.visible = !this.img_already.visible;
			} else {
				this.btn_lingqu.off(Laya.Event.CLICK, this, this.linquDengjiLiBao);
			}
		}

		/**领取等级礼包 */
		private linquDengjiLiBao(): void {
			let args = {};
			args[Protocol.game_welfare_levelGiftPack.args.id] = this._dataSource.ID;
			PLC.request(Protocol.game_welfare_levelGiftPack, args, ($data: any, msg: any) => {
				if(!$data) return;
				this.img_already.visible = true;
				this.btn_lingqu.visible = false;
				UIUtil.showRewardView($data.commonData);
				if(UIMgr.hasStage(UIConst.WelfareView)) {
					let ui = <WelfareView>UIMgr.getUIByName(UIConst.WelfareView);
					ui.initDengjiView();
				}
			});
		}
	}
}