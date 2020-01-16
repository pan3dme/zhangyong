/**
* name 
*/
module game{

	export class TreasureStrengthView extends ui.god.treasure.TreasureStrengthUI{

        private _chooseList : Array<TreasureItemVo|ItemVo>;
        private _curExp : number;
		constructor(){
			super();
            this.isModelClose = true;
		}

		createChildren():void {
			super.createChildren();
            this._chooseList = [];
            this._curExp = 0;
            this.itemList.selectEnable = false;
			this.itemList.mouseHandler = new Handler(this,this.onTreasureClick);
            this.itemList.renderHandler = new Handler(this,this.onTrasureRender);
            this.btnQuick.on(Laya.Event.CLICK,this,this.onQuick);
            this.btnRule.on(Laya.Event.CLICK,this,this.onRule);
            this.btnStrength.on(Laya.Event.CLICK,this,this.onStrength);
		}
		public show(closeOther?: boolean, showEffect?: boolean){
			super.show(closeOther,showEffect);
			this.initView();
		}
		public popup(closeOther?: boolean, showEffect?: boolean){
			super.popup(closeOther,showEffect);
			this.initView();
		}

		public onClosed(){
			super.onClosed();
			this.itemList.array = null;
            this._chooseList.length = 0;
            this._curExp = 0;
			Laya.timer.clearAll(this);
		}

		private initView():void{
            let treasureVo = this.dataSource as TreasureItemVo;
            let list = TreasureModel.getInstance().getStrengthTreasureList([treasureVo.uuid]);
			this.itemList.array = list;
            this.imgEmpty.visible = list.length == 0;
            let isMaxLv = treasureVo.isTopStrengthLv();
            this.nextBox.visible = this.imgTopArrow.visible = this.btnQuick.visible = this.btnStrength.visible = this.pgBar.visible = !isMaxLv;
            this.imgAttrArrow.visible = this.nextAttrList.visible = !isMaxLv;
            this.maxLvBox.visible = isMaxLv;

            let curVo = TreasureUtil.createTreasureVo("",treasureVo);
            curVo.show = true;
            curVo.num = 0;
            this.curItem.dataSource = curVo;
            let curAttrs = TreasureUtil.getTbAttrStrAry(curVo.getTbStrength());
            this.curAttrList.array = curAttrs;
            this.curAttrList.height = 24 * curAttrs.length + (curAttrs.length-1) * this.curAttrList.spaceY;
            if(isMaxLv) {
                this.curBox.x = 268;
                this.curAttrList.x = 210;
                // 设置高度
            }else{
                this.curBox.x = 118;
                this.curAttrList.x = 70;
                let nextVo = TreasureUtil.createTreasureVo("",curVo);
                nextVo.show = true;
                nextVo.num = 0;
                nextVo.strengthLv += 1;
                this.nextItem.dataSource = nextVo;
                let nextAttrs = TreasureUtil.getTbAttrStrAry(nextVo.getTbStrength()).map((ary)=>{
                    // 添加值颜色
                    ary[2] = ColorConst.TASK_GREEN;
                    return ary;
                });
                this.nextAttrList.array = nextAttrs;
                this.nextAttrList.height = 24 * nextAttrs.length + (nextAttrs.length-1) * this.nextAttrList.spaceY;
            }
            this.updateProgress();
		}
        /** 强化后不会取消圣物的选择，并且需要刷新圣物强化石数量以及下一级信息 */
        public updateView():void {
            let treasureVo = this.dataSource as TreasureItemVo;
            if(!treasureVo) return;
            // 剩余的圣物
            let list = TreasureModel.getInstance().getStrengthTreasureList([treasureVo.uuid]);
            let bagIds = [];
            let bagV0 = [];
            let treasureIds = [];
            for(let i = 0 ; i < list.length ; i++) {
                let vo = list[i];
                if(vo instanceof TreasureItemVo) {
                    treasureIds.push(vo.uuid);
                }else if(vo instanceof ItemVo){
                    bagIds.push(vo.id);
                    bagV0.push(vo);
                }
            }
            // 更新选中的圣物
            for(let i = this._chooseList.length -1 ; i >= 0 ; i--) {
                let vo = this._chooseList[i];
                if(vo instanceof TreasureItemVo && treasureIds.indexOf(vo.uuid) == -1) {
                    this._chooseList.splice(i,1);
                }else if(vo instanceof ItemVo){
                    let idx:number = bagIds.indexOf(vo.id);
                    if (idx == -1){
                        this._chooseList.splice(i,1);
                    }else{
                        this._chooseList[i] = bagV0[idx];
                    }
                    
                }
            }
            this.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                this.ani_succ.play(0, false);
                this.ani_succ.visible = true;
            }), ResConst.atlas_strength_effect);
            this.ani_succ_r.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                this.ani_succ_r.play(0, false);
                this.ani_succ_r.visible = true;
            }), ResConst.atlas_strength_effect);
            this.initView();
        }
        /** 更新经验条 */
        private updateProgress():void {
            let treasureVo = this.dataSource as TreasureItemVo;
            let tbStrength = treasureVo ? treasureVo.getTbStrength() : null;
            if(!treasureVo || !tbStrength) return;
            let exp = 0;
            for(let vo of this._chooseList) {
                if(vo instanceof TreasureItemVo) {
                    exp += vo.getTbStrength().return_exp * vo.num + tb.TB_treasure_set.getSet().getQualityExp(vo.quality) * vo.num;
                }else if(vo instanceof ItemVo) {
                    exp += (vo.count * tb.TB_treasure_set.getSet().getTreasureExp(vo.id));
                }
            }
            this._curExp = exp;
            this.pgBar.value = exp / tbStrength.exp;
            this.lbValue.text = exp + "/" + tbStrength.exp;
        }

        /** 选择圣物 */
		private onTreasureClick(evt:Laya.Event,index:number):void {
            if(index == -1) return;
            if(evt.type == Laya.Event.CLICK) {
                let uiRender = evt.currentTarget as ChooseTreasureIR;
				let treasureVo = uiRender.dataSource;
                let listIdx = this.getExistChooseIdx(treasureVo);
                // 是否已选中
                let isSelected = listIdx != -1;
				if(isSelected) {
					this._chooseList.splice(listIdx,1);
                    uiRender.imgGouxuan.visible = false;
				}else{
                    this._chooseList.push(treasureVo);
                    uiRender.imgGouxuan.visible = true;
                }
                this.updateProgress();
                dispatchEvt(new TreasureEvent(TreasureEvent.SELECT_STRENGTH_TREASURE))
			}
        }
        private onTrasureRender(uiRender:ChooseTreasureIR,index:number):void {
            let vo = uiRender.dataSource;
            if(vo) {
                let isSelected = this.isExistChoose(uiRender.dataSource);
                uiRender.imgGouxuan.visible = isSelected;
            }
        }

        /** 快速选择前10个圣物加上当前选中 */
        private onQuick():void {
            let len = this.itemList.cells.length;
            for(let i = 0 ; i < len ; i++ ){
                if(i < 10){
                    let uiRender = this.itemList.getCell(i) as ChooseTreasureIR;
                    if(uiRender && uiRender.dataSource){
                        if(!this.isExistChoose(uiRender.dataSource)) {
                            this._chooseList.push(uiRender.dataSource);
                        }
                        uiRender.imgGouxuan.visible = true;
                    }
                }
            }
            this.updateProgress();
        }

        /** 是否存在选中列表 */
        private getExistChooseIdx(target:TreasureItemVo|ItemVo):number {
            if(!target) return -1;
            return this._chooseList.findIndex((vo)=>{
                return (vo instanceof TreasureItemVo && target instanceof TreasureItemVo && vo.uuid == target.uuid) || (vo instanceof ItemVo && target instanceof ItemVo && vo.id == target.id);
            });
        }
        /** 是否存在选中列表 */
        private isExistChoose(target:TreasureItemVo|ItemVo):boolean {
            return this.getExistChooseIdx(target) != -1;
        }

        private onRule():void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20019));
        }
        /** 强化 */
        private onStrength():void {
            let treasureVo = this.dataSource as TreasureItemVo;
            if(!treasureVo) return;
            let needExp = treasureVo.getTbStrength() ? treasureVo.getTbStrength().exp : 0;
            if(this._curExp < needExp) {
                showToast(LanMgr.getLan("", 10371));
                return;
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.TREASURE_OPERATION), [TreasureOperation.strength,[treasureVo,this._chooseList]]);
        }
	}
}