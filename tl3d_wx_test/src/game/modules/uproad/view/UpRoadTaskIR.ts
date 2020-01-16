/**
* name 
*/
module game {
	export class UpRoadTaskIR extends ui.uproad.UpRoadTaskIRUI {
		constructor() {
			super();
			this.htmltext.style.fontSize = 20;
			this.htmltext.style.color = "#7e5336";
			this.htmltext.style.bold = true;
			this.htmltext.style.wordWrap = false;
		}

		public set dataSource($value: tb.TB_advance_condition) {
			this._dataSource = $value;
			this.refresh();
		}

		public get dataSource() {
			return this._dataSource;
		}

		private _curStatu:number = 0;
		private _curURLv:number;
		private refresh(): void {
			let data = this.dataSource;
			if (data) {
				this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive);

				let lv:number = tb.TB_advance_condition.getAdvanceLevel(data.ID);
				this._curURLv = App.hero.tasks.advanceLevel;
				if (lv > this._curURLv+1){
					//未解锁
					this.lab_title.text = "";
					this.lab_has.text = "";
					this.lab_need.text = "";
					this.list_reward.dataSource = null;
					this.btn_receive.visible = false;
					this.img_hasreceive.visible = false;
					this.list_reward.visible = false;
					this.ui_red.visible = false;
					return;
				}

				let hasnum:number = App.hero.tasks.advanceInfos[data.ID].count ? App.hero.tasks.advanceInfos[data.ID].count : 0;
				let neednum:number = data.num;
				let receive:boolean = App.hero.tasks.advanceInfos[data.ID].reward && App.hero.tasks.advanceInfos[data.ID].reward > 0;

				this.lab_title.text = data.name;
				this.list_reward.dataSource = ary2prop(data.reward);
				this.list_reward.visible = true;
				if (receive){
					//已领取
					this._curStatu = 2;
					this.img_hasreceive.visible = true;
					this.btn_receive.visible = false;
					this.ui_red.visible = false;

					this.lab_has.text = LanMgr.getLan("",11006);
					this.lab_has.color = "#319c28";
					this.lab_need.text = "(       )";
				}else if (hasnum >= neednum){
					//领取
					this._curStatu = 1;

					this.img_hasreceive.visible = false;
					this.btn_receive.visible = true;
					this.ui_red.visible = true;
					this.btn_receive.label = LanMgr.getLan("",10041);
					this.btn_receive.skin = "comp/button/btn_qianwang.png";
					this.btn_receive.labelStrokeColor = "#538901";

					this.lab_has.text = LanMgr.getLan("",11006);
					this.lab_has.color = "#319c28";
					this.lab_need.text = "(       )";
					
				}else{
					//前往
					this._curStatu = 0;
					this.img_hasreceive.visible = false;
					this.btn_receive.visible = true;
					this.ui_red.visible = false;
					this.btn_receive.label = LanMgr.getLan("",10042);
					this.btn_receive.skin = "comp/button/button.png";
					this.btn_receive.labelStrokeColor = "#ca7005";

					this.lab_has.color = "#ff0000";
					if (neednum == 1){
						this.lab_has.text = LanMgr.getLan("",10045);
						this.lab_need.text = "(           )";
					}else{
						this.lab_has.text = hasnum.toString();
						let str:string = hasnum > 9 ? "(    /{0})":"(  /{0})"
						this.lab_need.text = LanMgr.getLan(str, -1, neednum);
					}
				}

				this.lab_need.x = this.lab_title.x + this.lab_title.width + 3;
				this.lab_has.x = this.lab_need.x + 8;
			} else {
				this.list_reward.dataSource = null;
				this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
			}
		}

		private onClickReceive():void{
			if (this._curStatu == 1){
				//领取
				let self = this;
				let args = {};
            	args[Protocol.game_task_getAdvanceReward.args.id] = this.dataSource.ID;
           		PLC.request(Protocol.game_task_getAdvanceReward, args, ($data: any, $msg: any) => {
                	if (!$data) return;
					if ($data.advanceLevel != null && $data.advanceLevel > self._curURLv){
						//有等级变化，说明升级,弹激活界面
						UIMgr.showUI(UIConst.UpRoadSuccessView, [$data.advanceLevel, $data.commonData]);
					}else{
						UIUtil.showRewardView($data.commonData);
					}
					dispatchEvt(new UpRoadEvent(UpRoadEvent.REWARD_SUCCESS));
            	})
			}else if (this._curStatu == 2){
				//已领取
			}else{
				//前往
            	dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW,this.dataSource.link));
			}
		}

	

		public destroy(destroyChild:boolean = true):void{
			this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
			super.destroy(destroyChild);
		}


	}
}