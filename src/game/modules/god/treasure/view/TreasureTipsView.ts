/**
* name 
*/
module game {
	export class TreasureTipsView extends ui.equip.EquipTipsUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.mouseEnabled = true;
			this.mouseThrough = false;
			this.zOrder = UI_DEPATH_VALUE.TOP+9;
			this.name = UIConst.TreasureTipsView;
		}

		private static _target: Laya.Sprite;
		private static _tips: TreasureTipsView;
		/** 神灵界面tips */
		public static showTip(target: Laya.Sprite, itemVo: TreasureItemVo, godVo: GodItemVo): void {
			if (target == this._target && this._tips) return;
			this._target = target;
			if (!this._tips) {
				this._tips = new TreasureTipsView();
			}
			this._tips.isModal = false;
			this._tips.popupCenter = false;
			this._tips.dataSource = [itemVo,godVo,true];
			if (this._tips.parent) {
				this._tips.initView();
			} else {
				this._tips.show(false, false);
			}
			this._tips.x = Laya.stage.mouseX + this._tips.width > Laya.stage.width ? Laya.stage.width - this._tips.width : Laya.stage.mouseX;
			this._tips.y = Laya.stage.mouseY + this._tips.height > Laya.stage.height ? Laya.stage.height - this._tips.height : Laya.stage.mouseY;;
			Laya.stage.on(Laya.Event.CLICK, this, this.onClickStage);
		}

		/** 通用tips弹框 */
		public static popupTip(itemVo: TreasureItemVo,godVo: GodItemVo=null, showAllBtn:boolean=false,args?:any):TreasureTipsView {
			if (!this._tips) {
				this._tips = new TreasureTipsView();
			}
			this._tips.isModal = true;
			this._tips.popupCenter = true;
			this._tips.dataSource = [itemVo,godVo,showAllBtn,args];
			if (this._tips.parent) {
				this._tips.initView();
			} else {
				this._tips.popup(false, true);
			}
			return this._tips;
		}

		public static getTipsUI():TreasureTipsView {
			return this._tips;
		}

		private static onClickStage(e: Laya.Event): void {
			if (this._tips && this._tips.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) return;
			if (this._target && this._target.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) return;
			this.HideTip();
		}

		public static HideTip(): void {
			this._target = null;
			if (this._tips) {
				this._tips.close();
				this._tips.removeSelf();
				this._tips.destroy(true);
				this._tips = null;
			}
			Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			// 先initView居中
			this.initView();
			super.popup(closeOther, showEffect);
		}

		public onOpened(): void {
			super.onOpened();
		}

		/** 当前圣物 */
		private _treasureVo: TreasureItemVo;
		/** 表示要穿戴该圣物的神灵，并不是表示该圣物的当前穿戴者 */
		private _godVo: GodItemVo;
		/** 是否显示所有按钮 */
		private _isShowAllBtn: boolean = true;
		/** 额外参数 */
		private _args : any;	


		private _spiltArr: Laya.Image[];
		//基础属性
		private _baseTitle: Laya.Label;
		private _baseArr: Laya.Label[];
		private _baseBtn: Laya.Button;
		//升星属性
		private _starTitle: Laya.Label;
		private _starArr: Laya.Label[];
		private _starBtn: Laya.Button;
		//介绍
		private _itemTitle: Laya.Label;
		private _itemDesc: Laya.Label;
		private _btnTakeoff: Laya.Button;
		private _btnChange: Laya.Button;
		private _btnWear : Laya.Button;
		
		public initView(): void {
			this.clear();
			this._treasureVo = this.dataSource[0];
			this._godVo = this.dataSource[1];
			this._isShowAllBtn = this.dataSource[2];
			this._args = this.dataSource[3];
			this._spiltArr = [];
			this.updateData();
		}

		//刷新数据
		private updateData(): void {
			this.updateTop();
			this.updateBase();
			if(this._treasureVo && !this._treasureVo.isForbitStarup()) {
				this.updateStarup();
			}
			this.updateSuit();
			this.layout();
		}

		private updateTop(): void {
			if (!this._treasureVo) return;
			this.lab_name.text = this._treasureVo.tbItem.name;
			this.lab_quality.text = LanMgr.getLan("", 12374, LanMgr.qualityName[this._treasureVo.quality]);
			this.ui_item_icon.dataSource = this._treasureVo;
			this.img_bg_quality.skin = LanMgr.getLan("zhaungbei/zhaungbeipinzhi0{0}.png", -1, this._treasureVo.quality);
		}

		//基础属性
		private updateBase(): void {
			if (!this._treasureVo) return;
			//基础属性
			this._baseTitle = new Laya.Label(LanMgr.getLan("",12373));
			this._baseTitle.color = "#e8c859";
			this._baseTitle.fontSize = 22;
			this.addChild(this._baseTitle);

			this._baseBtn = new Laya.Button("comp/button/btn_qianwang.png");
			this._baseBtn.stateNum = 2;
			this._baseBtn.width = 97;
			this._baseBtn.height = 40;
			this._baseBtn.label = LanMgr.getLan("",12375);
			this._baseBtn.labelSize = 22;
			this._baseBtn.labelColors = "#ffffff,#ffffff,#ffffff";
			this._baseBtn.labelStroke = 4;
			this._baseBtn.labelStrokeColor = "#538901";
			this._baseBtn.on(Laya.Event.CLICK, this, this.onClickBase);
			this.addChild(this._baseBtn);


			this._baseArr = [];
			let allAttr: Array<Array<string>> = TreasureUtil.getTbAttrStrAry(this._treasureVo.getTbStrength());
			for (let i: number = 0; i < allAttr.length; i++) {
				let lab: Laya.Label = new Laya.Label();
				lab.color = "#ffeecc";
				lab.fontSize = 20;
				lab.text = allAttr[i][0] + allAttr[i][1];
				this.addChild(lab);
				this._baseArr.push(lab);
			}
		}

		//升星属性
		private updateStarup(): void {
			if (!this._treasureVo) return;

			//升星属性
			this.addSplit();
			this._starTitle = new Laya.Label(LanMgr.getLan("",12376));
			this._starTitle.color = "#e8c859";
			this._starTitle.fontSize = 22;
			this.addChild(this._starTitle);

			this._starBtn = new Laya.Button("comp/button/btn_qianwang.png");
			this._starBtn.stateNum = 2;
			this._starBtn.width = 97;
			this._starBtn.height = 40;
			this._starBtn.label = LanMgr.getLan("",12377);
			this._starBtn.labelSize = 22;
			this._starBtn.labelColors = "#ffffff,#ffffff,#ffffff";
			this._starBtn.labelStroke = 4;
			this._starBtn.labelStrokeColor = "#538901";
			this._starBtn.on(Laya.Event.CLICK, this, this.onClickStarup);
			this.addChild(this._starBtn);

			this._starArr = [];
			if (this._treasureVo.starLv <= 0) {
				let lab: Laya.Label = new Laya.Label();
				lab.color = "#ffeecc";
				lab.fontSize = 20;
				lab.text = LanMgr.getLan("",12084);
				this.addChild(lab);
				this._starArr.push(lab);
			} else {
				let arrAttr: Array<Array<string>> = TreasureUtil.getTbAttrStrAry(this._treasureVo.getTbStarup());
				for (let i: number = 0; i < arrAttr.length; i++) {
					let lab: Laya.Label = new Laya.Label();
					lab.color = "#ffeecc";
					lab.fontSize = 20;
					lab.text = arrAttr[i][0] + arrAttr[i][1];
					this.addChild(lab);
					this._starArr.push(lab);
				}
			}
		}

		//套装属性
		private updateSuit(): void {
			if (!this._treasureVo) return;

			//套装属性
			this.addSplit();
			this._itemTitle = new Laya.Label(LanMgr.getLan("",12378));
			this._itemTitle.color = "#e8c859";
			this._itemTitle.fontSize = 22;
			this.addChild(this._itemTitle);

			this._itemDesc = new Laya.Label(this._treasureVo.tbItem.desc);
			this._itemDesc.width = 270;
			this._itemDesc.leading = 5;
			this._itemDesc.autoSize = true;
			this._itemDesc.wordWrap = true;
			this._itemDesc.color = "#ffeecc";
			this._itemDesc.fontSize = 20;
			this.addChild(this._itemDesc);

			this._btnChange = new Laya.Button("comp/button/button.png");
			this._btnChange.stateNum = 2;
			this._btnChange.label = LanMgr.getLan("",12379);
			this._btnChange.labelSize = 22;
			this._btnChange.labelColors = "#ffffff,#ffffff,#ffffff";
			this._btnChange.labelStroke = 4;
			this._btnChange.labelStrokeColor = "#ca7005";
			this.addChild(this._btnChange);
			this._btnChange.on(Laya.Event.CLICK, this, this.onClickTH);

			this._btnTakeoff = new Laya.Button("comp/button/btn_quxiao.png");
			this._btnTakeoff.stateNum = 2;
			this._btnTakeoff.label = LanMgr.getLan("",12380);
			this._btnTakeoff.labelSize = 22;
			this._btnTakeoff.labelColors = "#ffffff,#ffffff,#ffffff";
			this._btnTakeoff.labelStroke = 4;
			this._btnTakeoff.labelStrokeColor = "#e6360d";
			this.addChild(this._btnTakeoff);
			this._btnTakeoff.on(Laya.Event.CLICK, this, this.onClickTZ);

			this._btnWear = new Laya.Button("comp/button/button.png");
			this._btnWear.stateNum = 2;
			this._btnWear.label = LanMgr.getLan("",12366);
			this._btnWear.labelSize = 22;
			this._btnWear.labelColors = "#ffffff,#ffffff,#ffffff";
			this._btnWear.labelStroke = 4;
			this._btnWear.labelStrokeColor = "#ca7005";
			this.addChild(this._btnWear);
			this._btnWear.on(Laya.Event.CLICK, this, this.onClickWear);

		}

		//添加分割线
		private addSplit(): void {
			let img: Laya.Image = new Laya.Image("comp/image/zhaungbeixingxi02.png");
			this.addChild(img);
			this._spiltArr.push(img);
		}

		//布局
		private layout(): void {
			let posx: number = 24;
			let posy: number = 150;
			let splitIndex: number = 0;
			//基础属性
			if (this._baseTitle) {
				this._baseTitle.x = posx;
				this._baseTitle.y = posy + 5;

				if (this._baseBtn) {
					this._baseBtn.x = this.width - 15 - this._baseBtn.width; //  * this._baseBtn.anchorX
					this._baseBtn.y = posy + 5; // this._baseBtn.height * this._baseBtn.anchorY
				}

				posy = this._baseTitle.y + this._baseTitle.height + 10;
			}
			if (this._baseArr) {
				for (let i: number = 0; i < this._baseArr.length; i++) {
					let lab: Laya.Label = this._baseArr[i];
					if (lab) {
						lab.x = posx;
						lab.y = posy;
						posy += lab.height + 10;
					}
				}
			}
			//升星属性
			if (this._starTitle) {
				this._spiltArr[splitIndex].x = posx + 0;
				this._spiltArr[splitIndex].y = posy;
				splitIndex++;
				posy += 10;

				this._starTitle.x = posx;
				this._starTitle.y = posy + 5;

				if (this._starBtn) {
					this._starBtn.x = this.width - 15 - this._starBtn.width; //  * this._starBtn.anchorX
					this._starBtn.y = posy + 5;	//  this._starBtn.height * this._starBtn.anchorY
				}

				posy = this._starTitle.y + this._starTitle.height + 10;
			}
			if (this._starArr) {
				for (let i: number = 0; i < this._starArr.length; i++) {
					let lab: Laya.Label = this._starArr[i];
					if (lab) {
						lab.x = posx;
						lab.y = posy;
						posy += lab.height + 10;
					}
				}
			}
			//套装属性
			if (this._itemTitle) {
				this._spiltArr[splitIndex].x = posx + 0;
				this._spiltArr[splitIndex].y = posy;
				splitIndex++;
				posy += 10;

				this._itemTitle.x = posx;
				this._itemTitle.y = posy + 5;
				posy = this._itemTitle.y + this._itemTitle.height + 10;
			}
			if (this._itemDesc) {
				this._itemDesc.x = posx;
				this._itemDesc.y = posy + 5;
				posy = this._itemDesc.y + this._itemDesc.height + 10;
			}

			this._btnWear.centerX = 0;
			this._btnWear.y = posy;
			this._btnTakeoff.x = posx - 9;
			this._btnTakeoff.y = posy;
			this._btnChange.x = posx + this._btnTakeoff.width + 0;
			this._btnChange.y = posy;
			posy += this._btnChange.height + 20;

			this._btnWear.label = LanMgr.getLan("",12366);
			// 按钮显示规则 : 通用情况下显示tips，隐藏全部按钮；个别界面需要显示个别按钮
			this._baseBtn.visible = this._btnChange.visible = this._btnTakeoff.visible = this._btnWear.visible = this._isShowAllBtn;
			if(this._starBtn) {
				this._starBtn.visible = this._isShowAllBtn;
			}
			// 在需要显示按钮的情况下：
			// 通用情况下： 强化、升星、替换、脱下按钮需要在该圣物有拥有者时显示； 穿戴按钮需要在其没有拥有者，并且需要有传入的要穿戴的神灵时显示
			if(this._isShowAllBtn){
				let isExistGod = this._treasureVo && this._treasureVo.isExsitGod();
				// 强化、升星、替换、脱下需要在有拥有者上操作
				this._baseBtn.visible = this._btnChange.visible = this._btnTakeoff.visible = isExistGod;
				if(this._starBtn) {
					this._starBtn.visible = isExistGod && !this._treasureVo.isForbitStarup();
				}
				// 穿戴需要其没有拥有者，并且需要有传入的要穿戴的神灵
				this._btnWear.visible = !isExistGod && (this._godVo ? true : false);

			}
			// 额外参数：强制控制按钮的显示
			// 显示强化按钮
			if(this._args && this._args.hasOwnProperty("showStrengthBtn")) {
				this._baseBtn.visible = this._args["showStrengthBtn"];
			}
			// 显示升星按钮
			if(this._starBtn && this._args && this._args.hasOwnProperty("showStarBtn")) {
				this._starBtn.visible = this._args["showStarBtn"] && !this._treasureVo.isForbitStarup();
			}
			// 显示穿戴按钮，显示lable文字选择
			if(this._args && this._args.hasOwnProperty("chooseFlag")) {
				this._btnWear.visible = true;
				this._btnWear.label = LanMgr.getLan("",12381);
			}


			// 是否显示了底部的按钮
			let isShowBottomBtns : boolean = this._btnChange.visible || this._btnTakeoff.visible || this._btnWear.visible;
			this.img_bg.height = isShowBottomBtns ? posy : posy - 60;
			this.height = isShowBottomBtns ? posy : posy - 60 ;
			
		}

		public clear(): void {
			this.ui_item_icon.dataSource = null;
			this.lab_name.text = "";
			this.lab_quality.text = "";
			this.img_bg_quality.skin = "";
			
			//基础属性
			this.clearLabel(this._baseTitle);
			this.clearButton(this._baseBtn, this.onClickBase);
			this.clearLabelArr(this._baseArr);
			this._baseTitle = null;
			this._baseBtn = null;
			this._baseArr = null;

			//升星属性
			this.clearLabel(this._starTitle);
			this.clearButton(this._starBtn, this.onClickStarup);
			this.clearLabelArr(this._starArr);
			this._starTitle = null;
			this._starBtn = null;
			this._starArr = null;

			//套装属性
			this.clearLabel(this._itemTitle);
			this.clearLabel(this._itemDesc);
			this.clearButton(this._btnTakeoff, this.onClickTZ);
			this.clearButton(this._btnChange, this.onClickTH);
			this.clearButton(this._btnWear, this.onClickWear);
			this._itemTitle = null;
			this._btnChange = null;
			this._btnTakeoff = null;
			this._btnWear = null;

			//分隔线
			if (this._spiltArr) {
				for (let i: number = 0; i < this._spiltArr.length; i++) {
					let img: Laya.Image = this._spiltArr[i];
					if (img) {
						img.removeSelf();
						img.destroy(true);
						img = null;
					}
				}
				this._spiltArr = null;
			}

			this.img_bg.height = 200;
			this.height = 200;
		}

		private clearLabel(lab: Laya.Label): void {
			if (!lab) return;
			lab.removeSelf();
			lab.destroy(true);
			lab = null;
		}

		private clearButton(btn: Laya.Component, fun: Function): void {
			if (!btn) return;
			if (fun) btn.off(Laya.Event.CLICK, this, fun);
			btn.removeSelf();
			btn.destroy(true);
			btn = null;
		}

		private clearLabelArr(labArr: Laya.Label[]): void {
			if (!labArr) return;
			for (let i: number = 0; i < labArr.length; i++) {
				let lab: Laya.Label = labArr[i];
				if (lab) {
					lab.removeSelf();
					lab.destroy(true);
					lab = null;
				}
			}
			labArr = null;
		}

		/** 强化 */
		private onClickBase(): void {
			if(this._treasureVo) {
				dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_STRENGTH_VIEW), this._treasureVo);
				TreasureTipsView.HideTip();
			}
		}
		/** 升星 */
		private onClickStarup(): void {
			if(this._treasureVo) {
				dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_STARUP_VIEW), this._treasureVo);
				TreasureTipsView.HideTip();
			}
		}
		//替换
		private onClickTH(): void {
			if(!this._treasureVo) return;
			let godVo = App.hero.getGodVoById(this._treasureVo.godId);
			if(godVo) {
				dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW),[ChooseTreasureOpenType.change,this._treasureVo,godVo]);
				TreasureTipsView.HideTip();
			}
		}

		//脱装
		private onClickTZ(): void {
			if( this._treasureVo ) {
				dispatchEvt(new TreasureEvent(TreasureEvent.TREASURE_OPERATION), [TreasureOperation.takeoff, [this._treasureVo]]);
				TreasureTipsView.HideTip();
			}
		}
		// 穿戴
		private onClickWear():void {
			let isChoose = this._args && this._args["chooseFlag"];
			if(isChoose) {
				dispatchEvt(new TreasureEvent(TreasureEvent.CHOOSE_TREASURE), this._treasureVo);
				TreasureTipsView.HideTip();
			}else{
				if( this._godVo && this._treasureVo ) {
					dispatchEvt(new TreasureEvent(TreasureEvent.TREASURE_OPERATION), [TreasureOperation.wear,[this._godVo,this._treasureVo]]);
					TreasureTipsView.HideTip();
				}
			}
		}

		public getBtnWear():Laya.Button {
			return this._btnWear;
		}

		public getBtnStreng():Laya.Button {
			return this._baseBtn;
		}

		public onClosed(): void {
			super.onClosed();
			this.clear();
			this._godVo = null;
			this._treasureVo = null;
			this._isShowAllBtn = false;
			this._args = null;
		}
	}
}