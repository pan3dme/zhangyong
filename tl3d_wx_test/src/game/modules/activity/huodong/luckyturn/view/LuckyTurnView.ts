/**
* name 
*/
module game {
	export class LuckyTurnView extends ui.activity.huodong.luckyturn.luckyturnUI {
		public static TURN_ITEM_NUM:number = 8;//转盘奖励物品8个
		static IS_JUMP:boolean = false;//是否跳过动画
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.box_Content.addChild(this.img_bg);
		}

		public popup(): void {
			super.popup();
			this.initView();
		}

		public get tabIdx() {
			return this.tab.selectedIndex;
		}

		private _turnTypeArr:number[] = [TURNTABLE.GOD, TURNTABLE.EQUIP, TURNTABLE.TREASURE];
		private initView(): void {
			this.bgPanel.dataSource = { uiName: UIConst.LuckyTurnView, closeOnSide: false, closeOnButton: false, title: "幸运转盘" };
			this.tab.selectHandler = Handler.create(this, this.onTab, null, false);
			this.tab.array=this._turnTypeArr;
			this.lab_title.visible = this.lab_title1.visible = App.serverTimeSecond <= (App.hero.openSvrTime + 7*TimeConst.ONE_DAY_SEC);

			Laya.timer.loop(1, this, this.update);
			this.img_one.on(Laya.Event.CLICK, this, this.onCLickBuy,[0]);
			this.img_ten.on(Laya.Event.CLICK, this, this.onCLickBuy,[1]);
			this.img_record.on(Laya.Event.CLICK, this, this.onClickRecord);
			this.img_sw_box.on(Laya.Event.CLICK, this, this.onClickTreasure);
			this.chk_jump.on(Laya.Event.CHANGE, this, this.onJump);
			for (let i:number = 0; i < 4; i++){
				this["ui_equip_item_"+i].on(Laya.Event.CLICK, this, this.onClickEquipReward, [i]);
			}
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE,this.updateCost,this);
			tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE,this.updateCost,this);
			tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_GOD_VALUE_CHANGE,this.onGodValueChange,this);
			tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_EQUIP_VALUE_CHANGE,this.onEquipValueChange,this);
			tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_TREASURE_VALUE_CHANGE,this.onTreasureValueChange,this);
			tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_EQUIP_REWARD_CHANGE,this.updateEquipReward,this);

			this.updateTab();
			this.update();
			this.chk_jump.selected = LuckyTurnView.IS_JUMP;
			this.ani_point.play();
			this.isModelClose = true;
		}

		private onGodValueChange():void{
			if (this._curType == TURNTABLE.GOD){
				this.updateProgress();
			}
		}

		private onEquipValueChange():void{
			if (this._curType == TURNTABLE.EQUIP){
				this.updateProgress();
				this.updateEquipReward();
			}
		}

		private onTreasureValueChange():void{
			if (this._curType == TURNTABLE.TREASURE){
				this.updateProgress();
				this.updateTreasureBox();
			}
		}

		public updateTab():void{
			this.initTab();
			if (this._firstType == -1){
				this.close()
				return;
			}
			this.onTab(this._firstType);
		}

		private _firstType:number;
		private initTab():void{
			this._firstType = -1;
			let idx:number = 0;
			for (let i:number = 0; i < this.tab.cells.length; i++){
				let type:number = this._turnTypeArr[i];
				let id:number = HuodongModel.getLuckIdByType(type);
				if (id > 0){
					this.tab.addChild(this.tab.cells[i]);
					this.tab.cells[i].x = idx * 123;
					idx++;
					if (this._firstType == -1){
						this._firstType = i;
					}
				}else{
					this.tab.removeChild(this.tab.cells[i]);
				}
			}
		}

		private _curTimeTemp:any;
		private _curRewardTemp:any[];
		private _curType:number;
		private onTab(index: number): void {
			if (this._isPlayTurnAni) return;
			this.tab.selectedIndex = index;
			if (index < 0 || index >= this.tab.cells.length) return;

			for (var i = 0; i < this.tab.cells.length; i++) {
				var element = this.tab.cells[i];
				let selectItem:Laya.Animation = element.getChildByName("selectBox");
				selectItem.visible = index == i;
				if(selectItem.visible){
					selectItem.play(0,true);
				}
			}

			this._curType = this._turnTypeArr[index];
			let id:number;
			switch(this._curType){
				case TURNTABLE.GOD://神灵
					id = App.hero.welfare.luckGodId;
					this._curTimeTemp = tb.TB_luck_god_time.get_TB_luck_god_timeById(id);
					this._curRewardTemp = tb.TB_luck_god.get_TB_luck_god('type', id+"");
					break;
				case TURNTABLE.EQUIP://装备
					id = App.hero.welfare.luckEquipId;
					this._curTimeTemp = tb.TB_luck_equip_time.get_TB_luck_equip_timeById(id);
					this._curRewardTemp = tb.TB_luck_equip.get_TB_luck_equip('type', id+"");
					break;
				case TURNTABLE.TREASURE://圣物
					id = App.hero.welfare.luckTreasureId;
					this._curTimeTemp = tb.TB_luck_treasure_time.getTempById(id);
					this._curRewardTemp = tb.TB_luck_treasure.get_TB_luck_Treasure('type', id+"");
					break;
			}
			this.updateTurnItem();
			this.updateCost();
			this.updateRemainTime();
			this.updateTabView();
		}

		//心跳
		private update():void{
			if (this._remainTimeS > 0){
				this.updateRemainTimeStr();
			}

			this.updateAction();
		}

		//转盘物品
		private updateTurnItem():void{
			if (!this._curRewardTemp || this._curRewardTemp.length < LuckyTurnView.TURN_ITEM_NUM) return;
			this._curRewardTemp.sort((a,b)=>{
				return a.location - b.location 
			});
			for (let i:number = 0; i < this._curRewardTemp.length; i++){
				let itemUI:common.ItemBox2 = this["ui_item_"+i];
				if (!itemUI){
					break;
				}
				let data = this._curRewardTemp[i];
				let itemvo:ItemVo = new ItemVo(data.item[0], data.item[1]);
				itemvo.isShowEff = data.is_show_effect == 1;
				itemUI.dataSource = itemvo;

			}
		}

		//消耗
		private _isFree:boolean = false;
		private _isCanOne:boolean = false;
		private _isCanTen:boolean = false;
		private updateCost():void{
			if (!this._curTimeTemp) return;
			let freeCount:number = HuodongModel.getLuckFreeCount(this._curType);
			let diamond:number = App.hero.diamond;

			this.ui_red.setRedPointName(HuodongModel.LuckRedNames[this._curType]);
			if (freeCount > 0){
				//免费
				this._isFree = true;
				this.lab_cost_one.text = "免费";
				this.lab_cost_one.color = "#ffffff";
				this.lab_cost_one.stroke = 4;
				this.img_cost_one.visible = false;
			}else{
				this._isFree = false;
				let cost:number = this._curTimeTemp.buy_cost[0];
				this.lab_cost_one.text = cost+"";
				this.img_cost_one.visible = true;
				if (diamond < this._curTimeTemp.buy_cost[0]){
					//钱不够
					this.lab_cost_one.color = "#ff0000";
					this.lab_cost_one.stroke = 0;
					this._isCanOne = false;
				}else{
					this.lab_cost_one.color = "#ffffff";
					this.lab_cost_one.stroke = 4;
					this._isCanOne = true;
				}
			}
			//十次
			let cost:number = this._curTimeTemp.buy_cost[1];
			this.lab_cost_ten.text = cost+"";
			if (diamond < cost){
				this.lab_cost_ten.color = "#ff0000";
				this.lab_cost_ten.stroke = 0;
				this._isCanTen = false;
			}else{
				this.lab_cost_ten.color = "#ffffff";
				this.lab_cost_ten.stroke = 4;
				this._isCanTen = true;
			}
		}

		//剩余时间
		private _remainTimeS:number = 0;
		private _curTimeMs:number = 0;
		private updateRemainTime():void{
			if (!this._curTimeTemp) return;
			this._remainTimeS = HuodongModel.getRemainTimeByTemp(this._curTimeTemp.type, this._curTimeTemp.time);
			this._curTimeMs = Laya.timer.currTimer;
			this.updateRemainTimeStr(true);
		}

		private updateRemainTimeStr(force:boolean = false):void{
			let nextTime:number = Laya.timer.currTimer;
			let cha:number = nextTime - this._curTimeMs;
			if (force || cha >= 1000){
				this._remainTimeS -= cha/1000;
				this._curTimeMs = nextTime;

				if (this._remainTimeS <= 0){
					this.lab_time.text = LanMgr.getLan("该活动已结束", -1);
				}else{
					this.lab_time.text = LanMgr.getLan("剩余:{0}", -1, activityTime(this._remainTimeS, 0));
				}
			}
		}

		//更新
		private updateTabView():void{
			if (!this._curTimeTemp) return;
			this.clearTabView();
			switch(this._curType){
				case TURNTABLE.GOD://神灵
					this.lab_god.visible = true;
					this.lab_luck_title.text = "幸运值";
					this.lab_title.text = "整只传说英雄概率翻倍";
					break;
				case TURNTABLE.EQUIP://装备
					this.box_equip.visible = true;
					this.lab_luck_title.text = "幸运值";
					this._equipMaxValue = 0;
					this._equipRewards = tb.TB_luck_equip_reward.get_TB_luck_equip_reward("type", this._curTimeTemp.ID);
					for (let i:number = 0; i < 10;i++){
						let item:common.ItemBox2 = this["ui_equip_item_"+i];
						if (!item){
							break;
						}
						if (this._equipRewards[i]){
							let itemvo:ItemVo = new ItemVo(this._equipRewards[i].reward[0][0],this._equipRewards[i].reward[0][1]);
							itemvo.show = false;
							item.dataSource = itemvo;
							//获取最大幸运值
							if (this._equipRewards[i].lucky > this._equipMaxValue){
								this._equipMaxValue = this._equipRewards[i].lucky;
							}
						}
					}
					this.lab_title.text = "橙装概率翻倍";
					break;
				case TURNTABLE.TREASURE:
					this.box_sw.visible = true;
					this.lab_luck_title.text = "充能";
					this.lab_title.text = "红色圣物概率翻倍";
					break;
			}
			let tw:number = this.lab_title.width + this.lab_title1.width + 5;
			this.lab_title1.x = (this.width - tw)/2;
			this.lab_title.x = this.lab_title1.x+this.lab_title1.width+5;

			this.updateProgress();
			this.updateEquipReward();
			this.updateTreasureBox();
		}

		//进度条
		private _equipMaxValue;Number = 0;
		private updateProgress():void{
			if (!this._curTimeTemp) return;
			let curVal:number = 0;
			let maxVal:number = 0;
			switch(this._curType){
				case TURNTABLE.GOD:
					curVal = App.hero.welfare.luckGodNum;
					maxVal = this._curTimeTemp.luck_reward[0];
					break;
				case TURNTABLE.EQUIP:
					curVal = App.hero.welfare.luckEquipNum;
					maxVal = this._equipMaxValue;
					break;
				case TURNTABLE.TREASURE:
					maxVal = this._curTimeTemp.luck_value;
					curVal = App.hero.welfare.luckTreasureNum;
					break;
			}

			if (this._curType == TURNTABLE.EQUIP){
				this.lab_luck_val.text = "";
			}else{
				this.lab_luck_val.text = curVal + "/" + maxVal;
			}
			this.pro_luck.value = curVal/maxVal;
		}

		//
		private _equipRewards:tb.TB_luck_equip_reward[];
		private updateEquipReward():void{
			if (!this._equipRewards) return;
			for (let i:number = 0; i < 4; i++){
				let hasR:boolean = App.hero.welfare.luckEquipAward && App.hero.welfare.luckEquipAward[this._equipRewards[i].ID] != null;
				this["img_equip_receive_"+i].visible = hasR
				this["img_equip_light_"+i].visible = !hasR && this._equipRewards[i].lucky <= this.pro_luck.value * this._equipMaxValue;
			}
		}

		private updateTreasureBox():void{
			if (this._curType != TURNTABLE.TREASURE) return;
			if (this.pro_luck.value >= 1){
				this.ani_sw_eff.visible = true;
				this.ani_sw_eff.loadAnimation(ResConst.anim_baoxiang,Handler.create(null,()=>{
					this.ani_sw_eff.play(0, true);
				}),ResConst.atlas_baoxiang);
				
			}else{
				this.ani_sw_eff.visible = false;
				this.ani_sw_eff.stop();
			}
			this.img_sw_box.skin = "comp/flag/task_baoxiang4.png";
		}

		private clearTabView():void{
			this.box_equip.visible = false;
			this.box_sw.visible = false;
			this.lab_god.visible = false;
			for (let i:number = 0; i < 10;i++){
				let item:common.ItemBox2 = this["ui_equip_item_"+i];
				if (!item){
					break;
				}
				item.dataSource =null;
			}
			this.ani_sw_eff.visible = false;
			this.ani_sw_eff.stop();
			this._equipRewards = null;
		}

		//记录
		private onClickRecord(index:number):void{
			UIMgr.showUI(UIConst.LuckRecordView, this._curType);
		}

		private onCLickBuy(index:number):void{
			if (this._isPlayTurnAni) return;
			if (this._remainTimeS <= 0) return;
			let count:number = 0;
			if (index == 0){
				//一次
				if (!this._isFree && !this._isCanOne){
					showToast(LanMgr.getLan(``, 10005));
					return;
				}
				count = 1;
			}else{
				if (!this._isCanTen){
					showToast(LanMgr.getLan(``, 10005));
					return;
				}
				count = 10;
			}
			let args = {
				"_0":this._curTimeTemp.ID,
				"_1":count
			}
			let protocol;
			switch(this._curType){
				case TURNTABLE.GOD:
					protocol = Protocol.game_luck_buyluckGod;
					break;
				case TURNTABLE.EQUIP:
					protocol = Protocol.game_luck_buyluckEquip;
					break;
				case TURNTABLE.TREASURE:
					protocol = Protocol.game_luck_buyluckTreasure;
					break;
			}
			PLC.request(protocol, args, ($data: Object, $msg) => {
				if (!$data) return;
				if ($msg && $msg.length > 0){
					showToast($msg);
				}else{
					this.startAction($data, $msg);
				}
			})
		}

		private onClickEquipReward(index:number, e:Laya.Event):void{
			if (!this._equipRewards || !this._equipRewards[index]) return;
			if (!this["img_equip_light_"+index].visible){
				UIUtil.showTip(this["ui_equip_item_"+index].dataSource);
				return;
			}
			if (this._remainTimeS <= 0) return;
			let args = {};
			args[Protocol.game_activity_getLevelFundReward.args.id] = this._equipRewards[index].ID;
			PLC.request(Protocol.game_luck_getluckEquipAward, args, ($data: any, $msg) => {
				if (!$data) return;
				// this.LuckyTurnView.turnView.refreshRewardList();
				UIUtil.showRewardView($data.commonData);
			})
		}

		private onClickTreasure():void{
			if (!this._curTimeTemp) return;
			if (this.pro_luck.value < 1){
				let list:ItemVo[] = [];
				list.push(new ItemVo(this._curTimeTemp.luck_reward[0], this._curTimeTemp.luck_reward[1]));
				UIMgr.showUI(UIConst.ManyItemsTip, {data:list});
				return;
			}
			if (this._remainTimeS <= 0) return;
			this.img_sw_box.skin = "comp/flag/task_baoxiang444.png";
			Laya.timer.once(100, this, ()=>{
				let args = {}
				args[Protocol.game_luck_getluckTreasureAward.args.id] = this._curTimeTemp.ID;
				PLC.request(Protocol.game_luck_getluckTreasureAward, args, ($data: any, $msg) => {
					if (!$data) return;
					UIUtil.showRewardView($data.commonData);
				})
			});
		}

		private onJump():void{
			LuckyTurnView.IS_JUMP = this.chk_jump.selected;
		}




		/**
		 * 光效转动
		 * @param data 服务端返回数据
		 * @param msg 服务端返回msg	
		 */
		private _serverData:any;
		private _ids:number[];
		public startAction(data: any, msg: string): void {
			this._serverData = data;
			let tbdata:any;
			switch(this._curType){
				case TURNTABLE.GOD:
					if (data.luckGodIds && data.luckGodIds.length > 0){
						tbdata = tb.TB_luck_god.get_TB_luck_godById(data.luckGodIds[0]);
						this._ids = data.luckGodIds;
					}
					break;
				case TURNTABLE.EQUIP:
					if (data.luckEquipIds && data.luckEquipIds.length > 0){
						tbdata = tb.TB_luck_equip.get_TB_luck_equipById(data.luckEquipIds[0]);
						this._ids = data.luckEquipIds;
					}
					break;
				case TURNTABLE.TREASURE:
					if (data.luckTreasureIds && data.luckTreasureIds.length > 0){
						tbdata = tb.TB_luck_treasure.getTempById(data.luckTreasureIds[0]);
						this._ids = data.luckTreasureIds;
					}
					break;
			}
			if (!tbdata) return;
			let endAng:number = -45 * (tbdata.location - 1) - 22.5 + 2160;
			if (LuckyTurnView.IS_JUMP){
				this.box_turn.rotation = endAng;
				this._turnStartTime = Laya.timer.currTimer - LuckyTurnView.TURN_WEEK_TIME;
				this._isPlayXXAni = false;
				if (this._serverData){
					Laya.timer.once(100, this, ()=>{
						// UIUtil.showRewardView(this._serverData.commonData);
						// HuodongModel.getRewards()
						this.showQuickPage(this._curType, this._ids);
					});
				}
			}else{
				this.startTurnAni(endAng);
				UIMgr.hideUIByName(UIConst.TurnRewardView);
			}
		}

		private showQuickPage(type:number, ids:number[]):void{
			let itemlist:ItemVo[] = [];
			for (let i:number = 0; i < ids.length; i++){
				switch(type){
					case TURNTABLE.GOD:
						let temp:tb.TB_luck_god = tb.TB_luck_god.get_TB_luck_godById(ids[i]);
						itemlist.push(new ItemVo(temp.item[0], temp.item[1]));
						break;
					case TURNTABLE.EQUIP:
						let equiptemp:tb.TB_luck_equip = tb.TB_luck_equip.get_TB_luck_equipById(ids[i]);
						itemlist.push(new ItemVo(equiptemp.item[0], equiptemp.item[1]));
						break;
					case TURNTABLE.TREASURE:
						let treasuretemp:tb.TB_luck_treasure = tb.TB_luck_treasure.getTempById(ids[i]);
						itemlist.push(new ItemVo(treasuretemp.item[0], treasuretemp.item[1]));
						break;
				}
			}
			if (UIMgr.hasStage(UIConst.TurnRewardView)){
				let uiPanel: TurnRewardView = UIMgr.getUIByName(UIConst.TurnRewardView);
				uiPanel.dataSource = {type:type, items:itemlist};
				uiPanel.initView();
			}else{
				UIMgr.showUI(UIConst.TurnRewardView, {type:type, items:itemlist});
			}
		}

		

		private updateAction():void{
			let curT:number = Laya.timer.currTimer;
			this.updateTurnAni(curT);

			if (!this._isPlayXXAni && curT >= this._turnStartTime + LuckyTurnView.TURN_WEEK_TIME + 2000){
				this.startXXAni();
			}
			this.updateXXANI(curT);
		}

		private static TURN_WEEK_TIME:number = 6000;
		private _turnStartAng:number = 0;
		private _turnTotalAng:number = 0;
		private _turnStartTime:number = 0;
		private _isPlayTurnAni:boolean = false;
		private startTurnAni(endAng:number):void{
			this._turnStartAng = this.box_turn.rotation % 360;
			this._turnTotalAng = endAng - this._turnStartAng;
			this._turnStartTime = Laya.timer.currTimer;
			this._isPlayTurnAni = true;
			this.isModelClose = false;

			this.endXXAni();
		}

		private updateTurnAni(curT:number):void{
			if (!this._isPlayTurnAni) return;
			let ang:number = this.getTurnAngle(this._turnStartAng, this._turnTotalAng, curT - this._turnStartTime, LuckyTurnView.TURN_WEEK_TIME);
			this.box_turn.rotation = ang % 360;
			if (curT >= this._turnStartTime + LuckyTurnView.TURN_WEEK_TIME){
				this.endTurnAni();
				if (this._serverData){
					Laya.timer.once(100, this, ()=>{
						// UIUtil.showRewardView(this._serverData.commonData);
						this.showQuickPage(this._curType, this._ids);
					});
				}
			}
		}

		private getTurnAngle(startAngle:number, TurnAngle:number, curTime:number, totalTime:number):number{
			if (curTime >= totalTime) return startAngle + TurnAngle;
			let t:number = curTime/totalTime -1;
			return -TurnAngle * (t * t * t * t - 1) + startAngle;
		}

		private endTurnAni():void{
			this._isPlayTurnAni = false;
			this.isModelClose = true;
		}

		//开始休闲动画
		private static XX_ANI_STOP_TIME:number = 1000;//休闲动画停顿时间（ms）
		private static XX_ANI_WEEK_TIME:number = 7800;//休闲动画周期时间(ms)
		private static XX_ANI_SPEED:number = 0.1;//休闲动画速度
		private _xxSpeed:number = 0;//休闲动画速度
		private _xxEndTime:number = 0;
		private _isPlayXXAni:boolean = false;
		private startXXAni():void{
			this._isPlayXXAni = true;
			this._xxEndTime = 0;
		}

		private updateXXANI(curT:number):void{
			if (!this._isPlayXXAni) return;
			if (curT <= this._xxEndTime){
				//旋转
				this.box_turn.rotation += this._xxSpeed;
			}else if (curT > this._xxEndTime + LuckyTurnView.XX_ANI_STOP_TIME){
				//过了停顿时间，又要开始旋转
				let rand:number = Math.random();
				this._xxSpeed = (rand >0.7?-1:1) * LuckyTurnView.XX_ANI_SPEED;
				this._xxEndTime = curT + LuckyTurnView.XX_ANI_WEEK_TIME;
			}else{
				//停顿时，啥事情也不做
			}
		}

		//结束休闲动画
		private endXXAni():void{
			this._isPlayXXAni = false;
		}


		public onClosed(): void {
			super.onClosed();
			this.bgPanel.dataSource = null;
			this.endTurnAni();
			this.endXXAni();
			Laya.timer.clearAll(this);
			this.img_one.off(Laya.Event.CLICK, this, this.onCLickBuy);
			this.img_ten.off(Laya.Event.CLICK, this, this.onCLickBuy);
			this.img_record.off(Laya.Event.CLICK, this, this.onClickRecord);
			this.img_sw_box.off(Laya.Event.CLICK, this, this.onClickTreasure);
			this.chk_jump.off(Laya.Event.CHANGE, this, this.onJump);
			for (let i:number = 0; i < 4; i++){
				this["ui_equip_item_"+i].off(Laya.Event.CLICK, this, this.onClickEquipReward);
			}
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE,this.updateCost,this);
			tl3d.ModuleEventManager.removeEvent(ResEvent.LIMIT_VALUE_CHANGE,this.updateCost,this);
			tl3d.ModuleEventManager.removeEvent(HuodongEvent.LUCK_GOD_VALUE_CHANGE,this.onGodValueChange,this);
			tl3d.ModuleEventManager.removeEvent(HuodongEvent.LUCK_EQUIP_VALUE_CHANGE,this.onEquipValueChange,this);
			tl3d.ModuleEventManager.removeEvent(HuodongEvent.LUCK_TREASURE_VALUE_CHANGE,this.onTreasureValueChange,this);
			tl3d.ModuleEventManager.removeEvent(HuodongEvent.LUCK_EQUIP_REWARD_CHANGE,this.updateEquipReward,this);
		}
	}
}