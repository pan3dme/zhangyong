/**
* name 
*/
module game {
	export class RankTabIR extends ui.rank.render.RankTabIRUI {
		constructor() {
			super();
		}

		private _redName:string;
		private _rankType:number;
		private _bgSkin:string;
		private _firstData:any;
		public set dataSource($value: {typeList,svo}) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():{typeList,svo} {
			return this._dataSource;
		}

		public refreshData() {
			let info : {typeList,svo} = this.dataSource;
			if (info){
				this.on(Laya.Event.CLICK, this, this.onClickBg);
				this.btn_wordShip.on(Laya.Event.CLICK, this, this.onClickMB);
				tl3d.ModuleEventManager.addEvent(RankingListEvent.RANK_DATA_CHANGE, this.updateInfo, this);
				tl3d.ModuleEventManager.addEvent(RankingListEvent.RANK_MOBAI_CHANGE, this.updateBtn, this);

				let ary = info.typeList;
				this._redName = ary[1];
				this._rankType = ary[2];
				this._bgSkin = ary[5];
				this.img_bg.skin= LanMgr.getLan("paihangbang/{0}", -1, this._bgSkin);
				this.updateInfo();
			}else{
				this._rankType = 0;
				this._redName = "";
				this._bgSkin = "";
				this.img_bg.skin= "";
				this.redPoint.setRedPointName("");
				this._firstData = null;
				this.off(Laya.Event.CLICK, this, this.onClickBg);
				this.btn_wordShip.off(Laya.Event.CLICK, this, this.onClickMB);
				tl3d.ModuleEventManager.removeEvent(RankingListEvent.RANK_DATA_CHANGE, this.updateInfo, this);
				tl3d.ModuleEventManager.removeEvent(RankingListEvent.RANK_MOBAI_CHANGE, this.updateBtn, this);
			}
		}

		private updateInfo():void{
			let info : {typeList,svo} = this.dataSource;
			this._firstData = info ? info.svo : null;
			if (this._firstData){
				//有数据
				this.box_info.visible = true;
				this.lab_empty.visible = false;
				let valueName = LanMgr.getLan(info.typeList[3], -1);
				if (this._rankType == RankListType.Guild){
					this.lab_name.text = this._firstData.name;
					let valueStr:string = this._firstData.level+"";
					this.lab_value1.text = valueName + "：" + valueStr;
					this.ui_headBox.dataSource = new UserHeadVo(this._firstData.head, this._firstData.level,this._firstData.headFrame,true);
				}else{
					let head = this._firstData[3];
					let name = this._firstData[2];
					let value = this._firstData[1];
					let level = this._firstData[4];
					let playerId = this._firstData[0];
					let guildName = this._firstData[5];
					let headFrame = this._firstData[6];

					this.lab_name.text = name;
					let valueStr:string = value+"";
					if (this._rankType == RankListType.Tower){
						valueStr = TowerModel.getInstance().getCopyRankDesc(value);
					}else if (this._rankType == RankListType.Copy){
						valueStr = GuajiModel.getInstance().getCopyRankDesc(value);
					}
					this.lab_value1.text = valueName + "：" + valueStr;
					this.ui_headBox.dataSource = new UserHeadVo(head, level,headFrame,false);
				}
				this.redPoint.setRedPointName(this._redName);
				this.updateBtn();
			}else{
				this.box_info.visible = false;
				this.lab_empty.visible = true;
				this.redPoint.setRedPointName("");
			}
		}

		private updateBtn():void{
			//是否可以膜拜
			let can = App.hero.worshipInfo[this._rankType] ? true : false;
			if (can){
				this.btn_wordShip.gray = true;
				this.btn_wordShip.label = LanMgr.getLan("",12188);
			}else{
				this.btn_wordShip.gray = false;
				this.btn_wordShip.label = LanMgr.getLan("",12189);
			}
		}

		private onClickBg(e:Laya.Event):void{
			if (!this._firstData){
				showToast(LanMgr.getLan('', 10447));
				return;
			}
			dispatchEvt(new RankingListEvent(RankingListEvent.SHOW_RANKINGLIST_PANEL), this._rankType);
		}

		//点击膜拜
		private onClickMB(e:Laya.Event):void{
			e.stopPropagation();
			if (this.btn_wordShip.gray) return;
			dispatchEvt(new RankingListEvent(RankingListEvent.RANKINGLIST_IS_WORKSHIP), this._rankType);
		}

	

		

	
	}
}