/**
* name 
*/
module game {
	export class godTabfuseView extends ui.god.tab.TabRonghunUI {
		/** 当前融魂 */
		private curBall;
		/** 是否需要初始化 */
		private _needInit : boolean;
		private _typeAry = [CostTypeKey.hun_life, CostTypeKey.hun_attack, CostTypeKey.hun_defense];
		/** 旧融魂等级 */
		private _oldFuseLv : number = 0;
		constructor() {
			super();
			this.jindubox1.on(Laya.Event.CLICK, this, this.onItemClick, [1]);
			this.jindubox2.on(Laya.Event.CLICK, this, this.onItemClick, [2]);
			this.jindubox3.on(Laya.Event.CLICK, this, this.onItemClick, [3]);
			this.btn_tupo.on(Laya.Event.CLICK, this, this.onTupo);
			this.btn_look.on(Laya.Event.CLICK, this, this.onLookInfo);
			this._needInit = true;
			this.curBall = 1;
		}

		public set dataSource($value) {
			let oldVo = this._dataSource as GodItemVo;
			if(oldVo && $value && oldVo.uuid == $value.uuid){
				this._needInit = false;
			}else{
				this._needInit = true;
			}
			this._dataSource = $value;
		}

		public get dataSource() :GodItemVo{
			return this._dataSource;
		}

		public close(): void {
			this.dataSource = null;
			this._needInit = true;
			this.jindubox1.dataSource = null;
			this.jindubox2.dataSource = null;
			this.jindubox3.dataSource = null;
			Laya.timer.clearAll(this);
			this.removeAllEffect();
			tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.updateResCount, this);
		}
		
		public init() {
			let godVo = this.dataSource;
			if (!godVo || !this._needInit) return;
			this._needInit = false;
			this._oldFuseLv = 0;
			this.updateView();
			this.list_have.array = this._typeAry;
			this.onItemClick(this.curBall);
			tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateResCount, this);
		}
		/** 更新按钮状态 */
		private updateView():void {
			let godVo = this.dataSource;
			if (!godVo) return;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			let nexttab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel + 1);
			let isMaxLimit : boolean = godVo.isRonghunMax();
			let isMaxLv = nexttab ? false : true;
			this.box_ronghun.visible = !isMaxLimit;
			this.box_tupo.visible = !this.box_ronghun.visible && !isMaxLv;
			this.boxMaxLv.visible = isMaxLv && isMaxLimit;
			this.lab_tiaojian.text = LanMgr.getLan("", 12359,fusiontab.break_limit);
			this.lab_level.text = godVo.fuseLevel + LanMgr.getLan("", 10031);
			if(godVo.fuseLevel > this._oldFuseLv){
				this._oldFuseLv = godVo.fuseLevel;
				this.jindubox1.dataSource = { attrNo: 1, curVo: godVo };
				this.jindubox2.dataSource = { attrNo: 2, curVo: godVo };
				this.jindubox3.dataSource = { attrNo: 3, curVo: godVo };
				this.onItemClick(this.curBall);
				this.removeAllEffect();
			}
		}
		/** 更新资源变化 */
		private updateResCount():void {
			this.list_have.refresh();
		}

		/**
		 * 选择属性球
		 * @param type 序号 1生命 2攻击 3防御
		 */
		private onItemClick(type: number) {
			let godVo = this.dataSource;
			this.curBall = type;
			for (let i = 1; i < 4; i++) {
				let uiitem: godFuseIR = this["jindubox" + i];
				uiitem.setSelect(type == i ? true : false);
			}
			let soulTab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			this.img_oneIcon.skin = SkinUtil.getRonghunHave(this._typeAry[type - 1]);
			let cost = soulTab.getOnceCost(type);
			this.lab_oneNeed.text = cost +"";
			this.updateCostColor(soulTab,type);
			this.ronghunRP.onDispose();
			this.ronghunRP.setRedPointName(`god_ronghun_${godVo.uuid}_${type}`);
			this.ronghunTenRP.onDispose();
			this.ronghunTenRP.setRedPointName(`god_ronghunten_${godVo.uuid}_${type}`);
			this.btn_one.on(Laya.Event.CLICK, this, this.onRonghun, [type, false]);
			this.btn_ten.on(Laya.Event.CLICK, this, this.onAuto, [type, true]);
			dispatchEvt(new GodEvent(GodEvent.SELECT_RONGHUN_ITEM));
		}


		/**
		 * 点击融魂
		 * @param type 
		 * @param isTen 
		 */
		private onRonghun(type: number, isTen: boolean) {
			let godVo = this.dataSource;
			if(!godVo) return;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			if (godVo.fuseAttrLevels[type] >= fusiontab.attr_max[type - 1][1]) {
				showToast(LanMgr.getLan('', 10374));
				return;
			}
			let oneCost = fusiontab.getOnceCost(type);
			let cost = isTen ? (oneCost*10) : oneCost;
			let costid = this._typeAry[type - 1];
			if (App.hero.getBagItemNum(costid) < cost) {
				showToast(LanMgr.getLan('', 10120, costid));
				return;
			}
			var args = {};
			args[Protocol.game_god_fuseSoul.args.godId] = godVo.uuid;
			args[Protocol.game_god_fuseSoul.args.attrType] = type;
			args[Protocol.game_god_fuseSoul.args.numType] = isTen ? iface.tb_prop.fuseNumTypeKey.ten : iface.tb_prop.fuseNumTypeKey.one;
			PLC.request(Protocol.game_god_fuseSoul, args, ($data: any, $msg) => {
				if (!$data) return;
				this.updateCostColor(fusiontab,type);
				this.successEffect(this.btn_one,type,fusiontab);
				dispatchEvt(new GodEvent(GodEvent.RONGHUN_SUCCESS));
			});
		}

		/** 自动融魂 */
		private onAuto(type: number, isAuto: boolean): void {
			this._timeout = 0;
			//设遮罩
			GuideMask.show(this.btn_ten, DirectionType.none, null, true, null, 0,false);
			//替换事件
			this.btn_ten.off(Laya.Event.CLICK, this, this.onAuto);
			this.btn_ten.label = LanMgr.getLan("停 止", -1);
			this.btn_ten.on(Laya.Event.CLICK, this, this.onStop);
			//开始自动融魂
			this._timeoutflag = false;
			this.onRonghunAuto(type, isAuto);
			Laya.timer.loop(150, this, this.onRonghunAuto, [this.curBall, true]); 
		}
		/** 停下 */
		private onStop(): void {
			this._timeout = 0;
			this._timeoutflag = false;
			//停止自动融魂
			Laya.timer.clear(this, this.onRonghunAuto);
			//遮罩隐藏
			GuideMask.hide();
			//替换事件
			this.btn_ten.off(Laya.Event.CLICK, this, this.onStop);
			this.btn_ten.label = LanMgr.getLan("", 12358);
			this.btn_ten.on(Laya.Event.CLICK, this, this.onAuto, [this.curBall, true]);
		}

		private _timeout:number;
		private _timeoutflag:boolean;
		/** 自动融魂 */
		private onRonghunAuto(type: number, isAuto: boolean) {		
			let godVo = this.dataSource;	
			if(!godVo) return;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			if (godVo.fuseAttrLevels[type] >= fusiontab.attr_max[type - 1][1]) {
				this.onStop();
				showToast(LanMgr.getLan('', 10374));
				return;
			}
			let oneCost = fusiontab.getOnceCost(type);
			let costid = this._typeAry[type - 1];
			if (App.hero.getBagItemNum(costid) < oneCost) {
				this.onStop();
				showToast(LanMgr.getLan('', 10120, costid));
				return;
			}

			if(this._timeoutflag){
				if((App.serverTime - this._timeout) > 5000){
					//5秒超时，就停止自动
					this.onStop();
				}
				return;
			}

			this._timeoutflag = true;
			this._timeout = App.serverTime;
			var args = {};
			args[Protocol.game_god_fuseSoul.args.godId] = godVo.uuid;
			args[Protocol.game_god_fuseSoul.args.attrType] = type;
			args[Protocol.game_god_fuseSoul.args.numType] = iface.tb_prop.fuseNumTypeKey.one;
			PLC.request(Protocol.game_god_fuseSoul, args, ($data: any, $msg) => {
				this._timeoutflag = false;
				if (!$data) {
					this.onStop();
					return;
				};
				this.updateCostColor(fusiontab,type);
				this.successEffect(this.btn_ten,type,fusiontab);
				dispatchEvt(new GodEvent(GodEvent.RONGHUN_SUCCESS));
			});
		}
		/** 更新消耗颜色 */
		private updateCostColor(fusiontab:tb.TB_fusion_soul,type):void {
			let needNum = fusiontab.getOnceCost(type);
			this.lab_oneNeed.color = App.hero.getBagItemNum(this._typeAry[type - 1]) >= needNum ? ColorConst.normalFont : ColorConst.redFont;
		}

		/**
		 * 点击突破
		 * 
		 */
		private onTupo() {
			let godVo = this.dataSource;	
			if(!godVo) return;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			let nexttab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel + 1);
			if (!nexttab) {
				showToast(LanMgr.getLan("", 10375));
				return;
			}
			if (godVo.starLevel < fusiontab.break_limit) {
				showToast(LanMgr.getLan(``, 10376,fusiontab.break_limit));
				return;
			}
			var args = {};
			args[Protocol.game_god_break.args.godId] = godVo.uuid;
			PLC.request(Protocol.game_god_break, args, ($data: any, $msg) => {
				if (!$data) return;
				UIMgr.showUI(UIConst.God_TupoView, App.hero.getGodVoById(godVo.uuid));
				this.updateView();
			});
		}

		private _imagePoolList : Laya.Image[] = [];
		private _curImageList : Laya.Image[] = [];
		/** 成功特效 */
		private successEffect(btn:Laya.Button,type,tbFusion:tb.TB_fusion_soul):void {
			this.updateView();
			let skin = "";
			let num = 0;
			let text = iface.tb_prop.fuseAttrType[type] + "+" + num;
			let targetBox = this[`jindubox${type}`] as godFuseIR;
			if(type == iface.tb_prop.fuseAttrTypeKey.hp){
				skin = SkinUtil.getRonghunHave(CostTypeKey.hun_life);
				num = tbFusion.add_hp;
			}else if(type == iface.tb_prop.fuseAttrTypeKey.atk){
				skin = SkinUtil.getRonghunHave(CostTypeKey.hun_attack);
				num = tbFusion.add_atk;
			}else if(type == iface.tb_prop.fuseAttrTypeKey.def){
				skin = SkinUtil.getRonghunHave(CostTypeKey.hun_defense);
				num = tbFusion.add_def;
			}
			if(num == 0 || !targetBox) return;
			text = LanMgr.attrName[type] + "+" + num;
			let targetX = targetBox.x + targetBox.width / 2 ;
			let targetY = targetBox.y + 120;
			let img : Laya.Image;
			if(this._imagePoolList.length > 0){
				img = this._imagePoolList.shift();
				img.skin = skin;
			}else{
				img = new Laya.Image(skin);
				img.width = img.height = 28;
				img.anchorX = img.anchorY = 0.5;
			}
			this._curImageList.push(img);
			img.x = this.box_ronghun.x + btn.x + btn.width / 2;
			img.y = this.box_ronghun.y + btn.y;
			this.addChild(img);
			// loghgy(img.x,img.y,targetX,targetY,this.dataSource.fuseAttrLevels[type]);
			Laya.Tween.to(img,{x:targetX,y:targetY},1000,Laya.Ease.sineOut,new Handler(this,this.popText,[img,targetBox,type,text]));
		}
		private _lableList : Laya.Label[] = [];
		private popText(img:Laya.Image,box:godFuseIR,type:number,text:string):void {
			if(!this.dataSource) return;
			box.dataSource = { attrNo: type, curVo: this.dataSource };
			img.removeSelf();
			this._imagePoolList.push(img);
			let index = this._curImageList.indexOf(img);
			if(index != -1){
				this._curImageList.splice(index,1);
			}
			let label = new Laya.Label(text);
			label.fontSize = 20;
			label.x = img.x + 50;
			label.y = img.y;
			label.color = "#00ff00";
			this._lableList.push(label);
			this.addChild(label);
			Laya.Tween.to(label,{y:label.y-50},800,Laya.Ease.sineOut,new Handler(this,()=>{
				label.removeSelf();
			}));
		}

		/**
		 * 点击放大镜
		 */
		private onLookInfo() {
			if(!this.dataSource) return;
			UIMgr.showUI(UIConst.God_fuseView, this.dataSource);
		}

		/** 移除所有特效 */
		private removeAllEffect():void {
			Laya.Tween.clearTween(this);
			for(let label of this._lableList){
				label.removeSelf();
			}
			for(let image of this._curImageList){
				image.removeSelf();
				this._imagePoolList.push(image);
			}
		}
	}
}