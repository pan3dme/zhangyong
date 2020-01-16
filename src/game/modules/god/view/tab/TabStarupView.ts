/**
* name 
*/
module game {
	export class godTabStarupView extends ui.god.tab.TabStarupUI {

		/** 是否需要初始化 */
		private _needInit : boolean;
		constructor() {
			super();
			this.list_nowstar.renderHandler = new Handler(this, this.onXingjiRender);
			this.list_nextstar.renderHandler = new Handler(this, this.onXingjiRender);
			this.list_maxstar.renderHandler = new Handler(this, this.onXingjiRender);
			this.list_predegree.renderHandler = new Handler(this, this.onDegreeRender);
			this.list_afterdegree.renderHandler = new Handler(this, this.onDegreeRender);
			this.btn_starup.on(Laya.Event.CLICK, this, this.onStarUp);
			this._needInit = true;
			this.list_choose.mouseHandler = new Handler(this,this.onChooseSelect);
		}

		public set dataSource($value:GodItemVo) {
			let oldVo = this._dataSource as GodItemVo;
			if(oldVo && $value && oldVo.uuid == $value.uuid){
				this._needInit = false;
			}else{
				this._needInit = true;
			}
			this._dataSource = $value;
		}
		public get dataSource(): GodItemVo {
			return this._dataSource;
		}
		public close() {
			this._needInit = true;
			this._dataSource = null;
			this.list_choose.array = null;
			this.list_maxstar.array = null;
			this.list_nextstar.array = null;
			this.list_nowstar.array = null;
			this.starupRp.onDispose();
			this.btn_tip.off(Laya.Event.CLICK, this, this.onClickTip);
		}

		public init() {
			if (!this.dataSource || !this._needInit) return;
			let godVo = this.dataSource;
			let canstar = godVo.isStarupGod();
			this.lab_nostar.visible = !canstar;
			if (!canstar) {
				//无法升星英雄
				this.box_manxing.visible = this.box_shengxing.visible = this.list_choose.visible = false;
				this.imgDi.y = 263;
				return;
			}
			// 红点
			this.starupRp.onDispose();
			if (godVo.isInLinuep(iface.tb_prop.lineupTypeKey.attack)) {
				this.starupRp.setRedPointName(`god_starup_${godVo.uuid}`);
			}
			let nowtab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel);
			let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel + 1);
			let nowlv = godVo.isMoreThanSix() ? godVo.getStar() - 5 : godVo.getStar();
			let ismaxlev = godVo.tab_god.star[1] == godVo.starLevel;
			this.box_manxing.visible = ismaxlev;
			this.list_choose.visible = this.box_shengxing.visible = !ismaxlev;
			this.imgDi.y = ismaxlev ? 263 : 213;
			if (!ismaxlev) {
				if (!evotab) {
					return;
				}
				this.box_shuxing.visible = godVo.starLevel >= 5;
				this.box_lvup.visible = godVo.starLevel >= 6;
				this.list_afterdegree.visible = this.list_predegree.visible = !this.box_lvup.visible;
				if(this.box_shuxing.visible) {
					this.box_awaken.y = 36;
					this.list_predegree.y = this.list_afterdegree.y = 72;
				}else{
					this.box_awaken.y = 16;
					this.list_predegree.y = this.list_afterdegree.y = 52;
				}
				//设置星星
				let nextlv = (nowlv + 1) >= 6 ? (nowlv + 1) - 5 : (nowlv + 1);
				this.list_nowstar.repeatX = godVo.starLevel;
				this.list_nextstar.repeatX = godVo.starLevel + 1;
				this.list_nowstar.spaceX = this.list_nextstar.spaceX = 5;
				this.starUp();
				this.setStarData(nowlv, godVo.starLevel, this.list_nowstar);
				this.setStarData(nextlv, godVo.starLevel + 1, this.list_nextstar);
				let cur = tb.TB_awaken_conditions.getTbById(godVo.starLevel);
				let next = tb.TB_awaken_conditions.getTbById(godVo.starLevel+1);
				this.lab_nowattr.text = nowtab.multiple_show + "%";
				this.lab_nextattr.text = evotab.multiple_show + "%";
				this.lbNowAwaken.text = cur.awake_section_max + "";
				this.lbNextAwaken.text = next ? next.awake_section_max + "" : "0";
				if (this.box_lvup.visible) {
					this.lab_nowmaxlv.text = String(nowtab.level);
					this.lab_nextmaxlv.text = String(evotab.level);
				} else {
					let degreeNum = godVo.starLevel < 6 ? godVo.starLevel : 6;
					this.setDegreeData(degreeNum, this.list_predegree);
					this.setDegreeData(degreeNum + 1, this.list_afterdegree);
					this.list_predegree.repeatX = degreeNum;
					this.list_afterdegree.repeatX = degreeNum + 1;
				}
			} else {
				this.list_maxstar.repeatX = godVo.starLevel;
				this.lab_maxlevel.text = String(nowtab.level);
				this.lbAwakenLimit.text = tb.TB_awaken_conditions.getTbById(godVo.starLevel).awake_section_max + "";
				this.lab_maxattr.text = nowtab.multiple_show + "%";
				this.setStarData(nowlv, godVo.starLevel, this.list_maxstar);
				this.list_maxstar.width = 30 * nowlv + this.list_maxstar.spaceX * (nowlv - 1);
			}
			this.btn_tip.on(Laya.Event.CLICK, this, this.onClickTip);
		}

		/**
         * 升星选择格子数据
         */
		private starUp() {
			let godVo = this.dataSource;
			if(!godVo) return;
			let ID = GodUtils.getGodStarId(godVo.starLevel,godVo.templateId);
			let startab: tb.TB_god_star = tb.TB_god_star.get_TB_god_starById(ID);
			if (!startab) return;
			let costtab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel);
			let godMaterial = startab.getGodMaterialList().map((vo)=>{
				return new GodMaterialVo(vo,godVo);
			});
			this.list_choose.array = godMaterial;
			Laya.timer.callLater(this,this.refreshChooseList);
			this.list_choose.width = (100 * godMaterial.length) + (godMaterial.length - 1) * this.list_choose.spaceX;
			if (godVo.starLevel < tb.TB_god_set.get_TB_god_set().star_evolution) {
				this.costContainer.visible = false;
			} else {
				let hasNum = App.hero.getBagItemNum(costtab.cost[0][0]);
				let isCan = hasNum >= costtab.cost[0][1];
				let color = isCan ? ColorConst.normalFont : ColorConst.RED;
				this.costContainer.visible = this.imgCost.visible = true;
				this.lab_cost.text = `/${costtab.cost[0][1]}`;
				this.lbhas.text = `${hasNum}`;
				this.lbhas.color = color;
				this.lbhas.event(Laya.Event.RESIZE);
				this.boxCost.refresh();
			}
			this.btn_starup.centerX = this.costContainer.visible ? 160 : 0;
		}

		private onChooseSelect(event:Laya.Event,index:number):void {
			if (event.type == Laya.Event.CLICK) {
                let item = this.list_choose.getCell(index) as GodMaterialIR;
				let info = item.dataSource;
				if(info){
					let ary : GodChooseMaterialVo[] = [];
					let godList : GodMaterialVo[] = this.list_choose.array;
					for(let vo of godList){
						if(vo != info){
							ary.push(...vo.choose)
						}
					}
					let listdata: any[] = GodUtils.filterGods(info.tbVo,info.curGod, ary);
					// info.tbVo.count
					if (listdata.length > 0) {
						let obj : ChooseGodVo = {allList:listdata,curMaterail:info,openType:ChooseOpenType.starUp};
						UIMgr.showUI(UIConst.God_ChooseGodView, obj);
					}
					else {
						showToast(LanMgr.getLan("", 10368));
						UIUtil.showJumpPanle2(1);
					}
				}
            }
		}
		/** 刷新神灵材料列表 */
		public refreshChooseList():void {
			for(let item of this.list_choose.cells){
				(<GodMaterialIR>item).refreshData(this.list_choose.array);
			}
		}

		private onStarUp() {
			if(!this.dataSource) return;
			dispatchEvt(new GodEvent(GodEvent.CLICK_STAR_UP),[this.dataSource,this.list_choose.array]);
		}

		private onClickTip():void{
			 UIUtil.showCommonTipView(LanMgr.getLanArr(40001));
		}

		/**
         * 星星数据
         * @param star 
         * @param list 
         */
		private setStarData(realStar: number, starNum: number, list: Laya.List) {
			let tempStararry = new Array;
			for (let i = 0; i < realStar; i++) {
				tempStararry[i] = starNum >= 6 ? true : false;
			}
			list.array = tempStararry;
		}


		/**
		 * 阶级数据
		 * @param realDegree 
		 * @param list 
		 */
		private setDegreeData(realDegree: number, list: Laya.List) {
			let godVo = this.dataSource;
			if(!godVo) return;
			let tempStararry = new Array;
			for (let i = 0; i < realDegree; i++) {
				tempStararry.push(godVo.degree);
			}
			list.array = tempStararry;
		}

		/**
         * 渲染星星
         * @param cell 
         * @param index 
         */
		private onXingjiRender(cell: Laya.Image, index: number) {
			let data = cell.dataSource;
			if (data) {
				cell.skin = SkinUtil.superXing;
				cell.width = 29;
				cell.height = 31;
			}
			else
				cell.skin = SkinUtil.xingxing;
		}

		/**
         * 渲染阶级
         * @param itemRender 
         * @param index 
         */
		private onDegreeRender(itemRender: Laya.Image, index: number) {
			itemRender.gray = itemRender.dataSource - 1 < index;
		}

	}
}