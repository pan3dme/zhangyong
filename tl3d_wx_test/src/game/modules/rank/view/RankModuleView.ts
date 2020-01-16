/**
* name 
*/
module game {
	export class RankModuleView extends ui.rank.RankViewUI {

		private uiScene: Base2dSceneLayerExt;
		private _selectTabNum: number = 0;
		private _model : RankModel;
		private _rankVoList : any[];
		constructor() {
			super();
			this.isModelClose = true;
			this._model = RankModel.getInstance();
			this.uiScene = new Base2dSceneLayerExt();
            this.boxRole.addChild(this.uiScene);

			this.boxFirst.on(Laya.Event.CLICK,this,this.onShowInfo,[0]);
            this.boxSecond.on(Laya.Event.CLICK,this,this.onShowInfo,[1]);
            this.boxThird.on(Laya.Event.CLICK,this,this.onShowInfo,[2]);
		}

		close():void {
			this._rankVoList = null;
			super.close();
			if (this.uiScene) {
                this.uiScene.onExit();
            }
			this.list_rankList.array = null;
		}

		public popup() {
			super.popup();
			this.initView(this.dataSource);
		}

		public initView(data: any): void {
			let model = this._model;
			// 是否公会排行
			let isGuild : boolean = model.curRankType == RankListType.Guild;
			let rank;
			this._rankVoList = [];
			if (isGuild) {//公会
				for (let i in data.levelRankList) {
					let value = new GuildRankListVo(data.levelRankList[i]);
					this._rankVoList.push(value);
				}
				rank = data.myRank == 0 ? LanMgr.getLan("", 12084) : data.myRank;
				this.list_rankList.y = 135;
				this.list_rankList.height = 848;
				this.boxCommonRank.visible = false;
			} else {
				for (let i in data.rankList) {
					let value = new ServerRankListVo(data.rankList[i]);
					this._rankVoList.push(value);
				}
				rank = data.myRank != 0 ? data.myRank : LanMgr.getLan("", 12187);
				this.list_rankList.y = 614;
				this.list_rankList.height = 369;
				this.boxCommonRank.visible = true;
			}
			for (let i in this._rankVoList) {
				this._rankVoList[i].king = Number(i);
			}

			this.lab_valueName.text = model.getValueName();
			this.setSelectTabNum(~~RankModel.getInstance().arrRankListName.findIndex(vo => vo[2] == model.curRankType));
			let selfInfo = this._rankVoList.find(Info => Info.playerId == App.hero.playerId);
			this.lab_myValue.text = selfInfo ? selfInfo.value : model.getValue();
			this.lab_myRank.text = rank;

			let bottomList = isGuild ? this._rankVoList : this._rankVoList.slice(3);
			//
			if (isGuild){
				if (bottomList.length < 6){
					for (let i:number = bottomList.length; i <6;i++){
						bottomList.push({king:i});
					}
				}
			}else{
				if (bottomList.length < 3){
					for (let i:number = bottomList.length; i <3;i++){
						bottomList.push({king:i+3});
					}
				}
			}
			this.lab_empty.visible = bottomList.length == 0;
			this.lab_empty.y = isGuild ? 589 : 889;

			this.list_rankList.array = bottomList;
			if(!isGuild) {
				this.uiScene.onShow();
				this.drawTopRank(this._rankVoList[0],this._rankVoList[1],this._rankVoList[2]);
				let godInfo = data['godInfo'] || {};
				let modelId : number = godInfo[1] && godInfo[1].length >= 3 ? GodUtils.getShowGodModel(godInfo[1][0],godInfo[1][2]) : 0;
				Laya.timer.once(400,this,this.showmodel1,[modelId]);
				
				modelId = godInfo[2] && godInfo[2].length >= 3 ? GodUtils.getShowGodModel(godInfo[2][0],godInfo[2][2]) : 0;
				Laya.timer.once(350,this,this.showmodel2,[modelId]);

				modelId = godInfo[3] && godInfo[3].length >= 3 ? GodUtils.getShowGodModel(godInfo[3][0],godInfo[3][2]) : 0;
				Laya.timer.once(300,this,this.showmodel3,[modelId]);
			}else{
				this.uiScene.onExit();
				Laya.timer.clearAll(this);
			}
		}
		/** 渲染前三名 */
		private drawTopRank(firstVo:ServerRankListVo,secondVo:ServerRankListVo,thirdVo:ServerRankListVo):void {
			let names = RankModel.getInstance().arrRankListName.find(vo => vo[2] == this._model.curRankType);
			let valueName = LanMgr.getLan(names[3], -1);
            if(firstVo) {
                this.lbFirstName.text = firstVo.name;
				this.lbFisrtDesc.text = valueName + "：" + firstVo.value;
            }
            this.lbFirstName.visible = this.lbFisrtDesc.visible = firstVo ? true : false;
            this.lbFirstEmpty.visible = this.imgFirstEmpty.visible = !firstVo;
			this.updateBtn();

            if(secondVo) {
                this.lbSecondName.text = secondVo.name;
                this.lbSecondDesc.text = valueName + "：" + secondVo.value;
            }
            this.lbSecondName.visible = this.lbSecondDesc.visible = secondVo ? true : false;
            this.lbSecondEmpty.visible = this.imgSecondEmpty.visible = !secondVo;

            if(thirdVo) {
                this.lbThirdName.text = thirdVo.name;
                this.lbThirdDesc.text = valueName + "：" + thirdVo.value;
            }
            this.lbThirdName.visible = this.lbThirdDesc.visible = thirdVo ? true : false;
            this.lbThirdEmpty.visible = this.imgThirdEmpty.visible = !thirdVo;
        }
		/** 更新按钮 */
		public updateBtn():void {
			// 是否公会排行
			let isGuild : boolean = this._model.curRankType == RankListType.Guild;
			if(isGuild) {
				this.list_rankList.refresh();
			}
		}

		public setSelectTabNum(value) {
			this._selectTabNum = value;
			this.bgPanel.dataSource = { uiName: UIConst.RankView, closeOnSide: this.isModelClose, title: RankModel.getInstance().arrRankListName[value][3]+LanMgr.getLan("",12186) };
		}
		private onTabSelect(index: number):void {
			dispatchEvt(new RankingListEvent(RankingListEvent.SHOW_RANKINGLIST_PANEL), ~~RankModel.getInstance().arrRankListName[index][2]);
		}

		private onTabRender($cell: common.TabIR1, $index: number) {
			$cell.btn_tab.selected = $index == this._selectTabNum;
		}

		private wordShip(): void {
			dispatchEvt(new RankingListEvent(RankingListEvent.RANKINGLIST_IS_WORKSHIP));
		}

		private onShowInfo(index:number):void {
            let vo = this._rankVoList ? this._rankVoList[index] : null;
            if(!vo || this._model.curRankType == RankListType.Guild) return;
			if(vo instanceof ServerRankListVo) {
            	UIUtil.showPlayerLineupInfo(vo.playerId);
			}
        }

		private _uiChar1 : GameUIChar;
		public showmodel1(model:number):void {
			if(this._uiChar1) {
                this._uiChar1.removeSelf();
                this._uiChar1 = null;
            }
            if( model == 0) return;
            let posSprite = this.imgFirstTY;
            let point = posSprite.localToGlobal(new Laya.Point(0, 0));
			this._uiChar1 = this.uiScene.addModelChar(String(model), point.x + posSprite.width*posSprite.scaleX/2 - Launch.offsetX, point.y+40 - Launch.offsetY, 180, 1.8);
        }
		private _uiChar2 : GameUIChar;
        public showmodel2(model:number):void {
			if(this._uiChar2) {
                this._uiChar2.removeSelf();
                this._uiChar2 = null;
            }
            if(model == 0) return;
            let posSprite = this.imgSecondTY;
            let point = posSprite.localToGlobal(new Laya.Point(0, 0));
			this._uiChar2 = this.uiScene.addModelChar(String(model), point.x + posSprite.width*posSprite.scaleX/2 - Launch.offsetX, point.y-20 - Launch.offsetY, 180, 1.7);
			this._uiChar2.y = -40;
        }
		private _uiChar3 : GameUIChar;
        public showmodel3(model:number):void {
			if(this._uiChar3) {
                this._uiChar3.removeSelf();
                this._uiChar3 = null;
            }
            if(model == 0) return;
            let posSprite = this.imgThirdTY;
            let point = posSprite.localToGlobal(new Laya.Point(0, 0));
			this._uiChar3 = this.uiScene.addModelChar(String(model), point.x + posSprite.width*posSprite.scaleX/2 - Launch.offsetX, point.y-20 - Launch.offsetY, 180, 1.7);
			this._uiChar3.y = -40;
        }
	}
}