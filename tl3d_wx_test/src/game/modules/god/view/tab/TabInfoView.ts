/**
* name 
*/
module game {
	export class godTabInfoView extends ui.god.tab.TabInfoUI {

		private _model : GodModel;
		constructor() {
			super();
		}

		createChildren():void {
			super.createChildren();
			this._model = GodModel.getInstance();
			this.list_pinjie.renderHandler = new Handler(this, this.onDegreeRender);
			this.btn_shengjie.on(Laya.Event.CLICK, this, this.openShengjie);
			this.btn_upGrade.on(Laya.Event.CLICK, this, this.onMouseDown);
			this.btnLookAttr.on(Laya.Event.CLICK, this, this.onLookAttr);
			this.checkBox.on(Laya.Event.CHANGE, this, this.onCheckBox);
			this.skillBox.visible = false;
			this.skillBox.dataSource = null;
			this.skillList.array = null;
			this.skillList.mouseHandler = new Handler(this, this.onSkillClick);
			this.bombAnim.visible = false;
			this.bombAnim.stop();
		}

		public close() {
			Laya.timer.clearAll(this);
			this.dataSource = null;
			this.dgupRedPoint.onDispose();
			this.lvupRedPoint.onDispose();
			this.list_pinjie.array = null;
			this.skillBox.visible = false;
			this.skillBox.dataSource = null;
			this.skillList.array = null;
			this.bombAnim.visible = false;
			this.bombAnim.stop();
			Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
		}

		public set dataSource($value) {
			this._dataSource = $value;
		}

		public get dataSource(): GodItemVo {
			return <GodItemVo>this._dataSource;
		}

		public init() {
			this.initData();
			this.updateXinxi();
		}

		/** 初始化数据 */
		private initData() {
			let godVo = this.dataSource;
			if (godVo) {
				let tbGod = godVo.tab_god;
				this.lbType.text = LanMgr.godTypeName[tbGod.type];
				this.skillBox.visible = false;
				this.skillBox.dataSource = null;
				this.bombAnim.visible = false;
				this.bombAnim.stop();
				Laya.stage.on(Laya.Event.CLICK, this, this.onClickStage);
				this.updateList();
			}
		}

		/** 更新信息 */
		public updateXinxi() {
			let godVo = this.dataSource;
			if (godVo) {
				this.setCostText();
				this.setPinjieList()
				let starAndDegerr = godVo.degree >= tb.TB_god_set.get_TB_god_set().star_evolution ? godVo.starLevel : godVo.degree;
				let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(starAndDegerr);
				let maxLevel = evotab ? evotab.level : -1;
				// 是否能升阶
				let canUp = godVo.level == maxLevel && godVo.level < GodModel.getMaxLv(godVo.starLevel) ? true : false;
				this.lab_dengji.text = LanMgr.getLan("{0}/{1}", -1, godVo.level, maxLevel);
				this.lbMaxLv.visible = this.imgDi.visible = godVo.level >= godVo.maxTbLv;
				//判断是否满级 升级按钮还是升阶按钮
				this.btn_shengjie.label = LanMgr.getLan("",12356);
			 	this.checkBox.visible =	this.btn_upGrade.visible = godVo.level == maxLevel ? false : true;
				this.checkBox.selected = this._model.isOnekeyLvup;
				this.box_canup.visible = this.btn_upGrade.visible;
				this.btn_shengjie.visible = !this.btn_upGrade.visible && canUp;

				if (!this.btn_shengjie.visible && !this.btn_upGrade.visible && godVo.canStarUp()) {
					this.btn_shengjie.label = LanMgr.getLan("",12357);
					this.btn_shengjie.visible = true;
				}
				this.lvupRedPoint.setRedPointName(`god_lvup_${godVo.uuid}`);
				this.dgupRedPoint.setRedPointName(`god_dgup_${godVo.uuid}`);
			}
		}


		/** 打开属性总览界面 */
		private onLookAttr() {
			let godVo = this.dataSource;
			let basic = godVo.getProperty();
			let sumAttr = godVo.getAllAttr(iface.tb_prop.lineupTypeKey.attack);
			let godAttr: IGodAttr = {basicAttr:basic,allAttr:sumAttr};
			UIMgr.showUI(UIConst.God_AttrView, godAttr);
		}

		/**设置品阶List */
		private setPinjieList(): void {
			let godVo = this.dataSource;
			let degreeNum = godVo.starLevel < 6 ? godVo.starLevel : 6;
			let nowAry = new Array;
			for (let i = 0; i < degreeNum; i++) {
				nowAry.push(godVo.degree);
			}
			this.list_pinjie.repeatX = degreeNum;
			this.list_pinjie.dataSource = nowAry;
		}


		/** 显示拥有/消耗经验 */
		public setCostText():void {
			let godVo = this.dataSource;
			if (!godVo) return;
			let allExp = App.hero.godExp;
			let godlevel: tb.TB_god_level = tb.TB_god_level.get_TB_god_levelnById(godVo.level);
			let needexp = godlevel.cost[0][1] - godVo.exp;//减掉已有的经验
			this.lab_allExp.text = Snums(allExp);
			this.lab_needExp.text = "/" + Snums(needexp);
			this.lab_allExp.color = allExp < needexp ? ColorConst.redFont : ColorConst.normalFont;
			this.lab_getGold.text = "/" + Snums(godlevel.cost[1][1]);
			this.lab_getGold.color = App.hero.gold < godlevel.cost[1][1] ? ColorConst.redFont : ColorConst.normalFont;
			this.lbAllGold.text = Snums(App.hero.gold);
			this.HBoxExp.refresh();
			this.hboxGold.refresh();
		}


		/** 英雄升级 */
		private onMouseDown(): void {
			let godVo = this.dataSource;
			let Exppool: number = App.hero.godExp;
			let godlevel: tb.TB_god_level = tb.TB_god_level.get_TB_god_levelnById(godVo.level);
			let needexp: number = godlevel.cost[0][1] - godVo.exp;
			if (Exppool < needexp) {/**魂石不足 */
				showToast(LanMgr.getLan("", Lans.cost, 6));
			} else if (App.hero.gold < godlevel.cost[1][1]) {/**金币不足 */
				showToast(LanMgr.getLan("", Lans.glod));
			} else if (this.btn_shengjie.visible) {
				return;/**满级需要升阶 */
			} else { /**条件满足发送请求 */
				dispatchEvt(new GodEvent(GodEvent.USE_EXPPOOL), [godVo,this.checkBox.selected]);
			}
		}

        /**
         * 打开升阶面板
         */
		public openShengjie() {
			if (this.btn_shengjie.label == LanMgr.getLan("",12357)) this.godView.list_tab.selectedIndex = 1;
			else {
				if (!App.IsSysOpen(ModuleConst.SHENGJIE)) {
					let tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHENGJIE);
					showToast(tbSys.prompt);
				} else {
					UIMgr.showUI(UIConst.God_DgUpView, this.dataSource);
				}
			}
		}

		get godView(): GodMainView {
			return UIMgr.getUIByName(UIConst.God_MainView);
		}


		/**
         * 渲染阶级
         * @param itemRender 
         * @param index 
         */
		private onDegreeRender(itemRender: Laya.Image, index: number) {
			itemRender.gray = itemRender.dataSource - 1 < index;
		}
		/**
		 * 渲染星星
		 */
		private onXingjiRender(cell:Laya.Image,index:number):void {
			let data = cell.dataSource;
			if(data){
				cell.skin = SkinUtil.superXing;
				cell.width = 29;
				cell.height = 31;
			}else{
				cell.skin = SkinUtil.xingxing;
			}
		}

		private onCheckBox():void {
			this._model.isOnekeyLvup = this.checkBox.selected;
		}

		/** 更新技能 */
		public updateList():void {
			let godVo = this.dataSource;
			if (godVo) {
				let ary: any[] = godVo.getSkillList();
				let list: any[] = [];
				for (let i in ary) {
					let skillT:tb.TB_skill = tb.TB_skill.get_TB_skillById(ary[i][0]);
					if (skillT && skillT.type != 1){
						let openDgLv = ary[i][1];
						list.push({ skill: skillT, godId: godVo.tab_god.ID, openDgLv, dgLv: godVo.degree, index:i })
					}
				}
				this.skillList.array = list;
				this.skillList.width = 95 * list.length + (list.length - 1) * this.skillList.spaceX;
			}
		}

		/** 点击技能 */
		private onSkillClick(event:Laya.Event,index:number):void {
			if (event.type == Laya.Event.CLICK) {
                let iRender = this.skillList.getCell(index) as GodSkillItemIR;
				if(iRender && iRender.dataSource){
					this.skillBox.dataSource = iRender.dataSource;
					let skillX = this.skillList.x + 48 + index * 96 + this.skillList.spaceX * index;
					this.skillBox.x = (skillX + this.skillBox.width >= this.width) ? (this.width-this.skillBox.width) : skillX;
					this.skillBox.y = this.skillList.y - this.skillBox.height;
					this.skillBox.visible = true;
				}else{
					this.skillBox.dataSource = null;
					this.skillBox.visible = false;
				}
            }else if (event.type == Laya.Event.MOUSE_UP || event.type == Laya.Event.MOUSE_OUT) {
                // this.skillBox.dataSource = null;
				// this.skillBox.visible = false;
            }
		}
		private onClickStage(e:Laya.Event):void{
			if (e.target instanceof GodSkillItemIR) return;
			this.skillBox.dataSource = null;
			this.skillBox.visible = false;
		}
		
	}
}