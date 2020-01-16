/**
* name 
*/
module game{

	export class TreasureStarupView extends ui.god.treasure.TreasureStarupUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName:UIConst.TreasureStarupView, closeOnButton:true, closeOnSide: this.isModelClose, title:LanMgr.getLan("",12382) };
			this.btnStarup.on(Laya.Event.CLICK,this,this.onStarup);
			this.btnYulan.on(Laya.Event.CLICK,this,this.onYulan);
			this.materialList.mouseHandler = new Handler(this,this.onChooseSelect);
		}
		
		public popup(){
			super.popup();
			this._curStatLv = -1;
			this.initView();
		}

		public onClosed(){
			super.onClosed();
			Laya.timer.clearAll(this);
			this.materialList.array = null;
			this.attrList.array = null;
		}

		private _curStatLv:number = -1;
		public initView():void{
			let treasureVo = this.dataSource as TreasureItemVo;
			let isMaxLv = treasureVo.isTopStarLv();
			this.nextBox.visible = this.costBox.visible = this.btnStarup.visible = this.imgArrow.visible = !isMaxLv;
			this.maxLvBox.visible = isMaxLv;

			let curVo = TreasureUtil.createTreasureVo("",treasureVo);
			curVo.show = true;
			curVo.num = 0;
			this.curItem.dataSource = curVo;
			if(isMaxLv) {
				this.curBox.x = 268;
				let ary = this.getAttrList(curVo,null);
				this.attrList.array = ary;
				this.attrList.width = 130;
				this.attrList.height = ary.length * 26 + (ary.length - 1) * this.attrList.length;
			}else{
				this.curBox.x = 118;
				let nextVo = TreasureUtil.createTreasureVo("",curVo);
                nextVo.show = true;
				nextVo.num = 0;
                nextVo.starLv += 1;
                this.nextItem.dataSource = nextVo;
				let ary = this.getAttrList(curVo,nextVo);
				this.attrList.array = ary;
				this.attrList.width = 250;
				this.attrList.height = ary.length * 26 + (ary.length - 1) * this.attrList.length;

				let tbStar = treasureVo.getTbStarup();
				let materialList = tbStar.getMaterialList().map((vo)=>{
					return new TreasureMaterialVo(vo,treasureVo);
				});
				this.materialList.array = materialList;
				Laya.timer.callLater(this,this.refreshChooseList);
				this.materialList.width = (100 * materialList.length) + (materialList.length - 1) * this.materialList.spaceX;
			}

			if (this._curStatLv != treasureVo.starLv){
				if (this._curStatLv != -1){
					this.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                	this.ani_succ.play(0, false);
                	this.ani_succ.visible = true;
            	}), ResConst.atlas_strength_effect);
					this.ani_succ_r.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                	this.ani_succ_r.play(0, false);
                	this.ani_succ_r.visible = true;
            	}), ResConst.atlas_strength_effect);
				}
				this._curStatLv = treasureVo.starLv;
			}

			
		}

		private onChooseSelect(event:Laya.Event,index:number):void {
			let treasureVo = this.dataSource as TreasureItemVo;
			if (event.type == Laya.Event.CLICK) {
                let item = this.materialList.getCell(index) as TreasureMaterialIR;
				let info = item.dataSource;
				if(info){
					let ary : ChooseTreasureMaterialVo[] = [];
					let itemList : TreasureMaterialVo[] = this.materialList.array;
					for(let vo of itemList){
						if(vo != info){
							ary.push(...vo.choose)
						}
					}
					let listdata: any[] = TreasureUtil.filterTreasures(info.tbVo,treasureVo, ary);
					if (listdata.length > 0) {
						let obj : ChooseTreasureViewVo = {allList:listdata,curMaterail:info};
						UIMgr.showUI(UIConst.ChooseTreasureMaterialView, obj);
					}
					else {
						showToast(info.getWarn());
						// UIUtil.showJumpPanle2(2);
					}
				}
            }
		}

		/** 获取属性列表 */
		private getAttrList(curVo:TreasureItemVo,nextVo:TreasureItemVo):string[] {
			let curList = TreasureUtil.getTbAttrStrAry(curVo.getTbStarup());
			let nextList = nextVo ? TreasureUtil.getTbAttrStrAry(nextVo.getTbStarup()) : [];
			let ary = [];
			if(curList.length > 0) {
				for (let i: number = 0; i < curList.length; i++) {
					let str1 = curList[i][0] + " " +curList[i][1];
					let str2 = nextList[i] ? `(${ nextList[i][1]})` : "";
					ary.push([str1,str2]);
				}
			}else{
				if(nextList.length > 0) {
					for (let i: number = 0; i < nextList.length; i++) {
						let str1 = nextList[i][0] + " +0";
						let str2 = nextList[i] ? `(${ nextList[i][1]})` : "";
						ary.push([str1,str2]);
					}
				}
			}
			return ary;
		}

		/** 刷新材料列表 */
		public refreshChooseList():void {
			for(let item of this.materialList.cells){
				(<TreasureMaterialIR>item).refreshData(this.materialList.array);
			}
		}

		private onStarup():void {
			if(!this.dataSource) return;
			dispatchEvt(new TreasureEvent(TreasureEvent.TREASURE_OPERATION),[TreasureOperation.starup,[this.dataSource,this.materialList.array]]);
		}

		private onYulan():void {
			if(!this.dataSource) return;
			dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_STAR_ATTR_PREVIEW),this.dataSource);
		}

	}
}