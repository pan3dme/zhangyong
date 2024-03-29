/**
* name 
*/
module game {
	export class RankModuleIR extends ui.rank.render.RankIRUI {
		constructor() {
			super();
		}

		public set dataSource($value: ServerRankListVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():ServerRankListVo {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if (data) {
				let model = RankModel.getInstance();
				let names = RankModel.getInstance().arrRankListName.find(vo => vo[2] == model.curRankType);
				this.redPoint.setRedPointName(names[1]);
				this.ui_view.dataSource = {rank:data.king + 1}

				if (!data.hasOwnProperty("name")){
					this.box_info.visible = false;
					this.lab_empty.visible = true;
					return;
				}
				this.box_info.visible = true;
				this.lab_empty.visible = false;
				//公会
				this.lab_guildName.text = "公会：" +　(data.guildName ? data.guildName == "" ? LanMgr.getLan("无", -1) : data.guildName : LanMgr.getLan("无", -1));
				//是否可以膜拜
				let can = App.hero.worshipInfo[names[2]] ? true : false;
				//
				let valueName = LanMgr.getLan(names[3], -1);
				this.lab_name.text = data.name;
				
				this.ui_headBox.dataSource = new UserHeadVo(data.head, data.level,data.headFrame,data instanceof GuildRankListVo);
				//进行排序
				//判断是否是公会
				if(model.curRankType == 4) {
					this.ui_headBox.off(Laya.Event.CLICK, this, this.onClick);
					this.lab_name.text = '会长：' + data.name;
					this.lab_name.y = 70;
					this.lab_guildName.y = 35;
				} else {
					this.ui_headBox.on(Laya.Event.CLICK, this, this.onClick);
					this.lab_name.y = 35;
					this.lab_guildName.y = 70;
				}
				//第一名
				if (data.king == 0) {
					this.lab_value1.text = valueName + "：" + data.value;
					this.btn_wordShip.on(Laya.Event.CLICK, this, this.wordShip);
					this.btn_wordShip.selected = this.btn_wordShip.disabled = can;
					this.btn_wordShip.label = can ? LanMgr.getLan("已膜拜", -1) : LanMgr.getLan("膜拜", -1);
					//判断是否是公会
					if(model.curRankType == 4) {
						this.lab_guildName.y = 20;
						this.lab_name.y = 50;
						this.lab_value1.y = 80;
					} else {
						this.lab_name.y = 20;
						this.lab_guildName.y = 50;
						this.lab_value1.y = 80;
					}
				} else {
					//被膜拜遮盖的具体数值
					this.lab_value2.text = valueName;
					this.lab_value22.text = data.value;
					this.btn_wordShip.off(Laya.Event.CLICK, this, this.wordShip);
				}
				//右边数值的显示
				// this.lab_value2.visible = this.lab_value22.visible = data.king != 0;
				//按钮和左边值1的显示状态
				// this.lab_value1.visible = data.king == 0;
				this.lab_value2.visible = this.lab_value22.visible = true;
				this.lab_value1.visible = false;
				this.btn_wordShip.visible = false;
			} else {
				this.btn_wordShip.off(Laya.Event.CLICK, this, this.wordShip);
				this.redPoint.onDispose();
			}
		}

		public updateBtn():void {
			let data = this.dataSource;
			if (data.king == 0) {
				this.btn_wordShip.visible = false;
			}
		}

		private wordShip(): void {
			dispatchEvt(new RankingListEvent(RankingListEvent.RANKINGLIST_IS_WORKSHIP));
		}

		private onClick(): void {
			if(this.dataSource) {
				UIUtil.showPlayerLineupInfo(this.dataSource.playerId);
			}
		}
	}
}