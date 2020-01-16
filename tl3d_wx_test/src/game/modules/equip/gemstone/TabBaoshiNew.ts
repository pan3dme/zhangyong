/**
* name 
*/
module game {
    export interface IGodGemUIVo {
        equipVo : EquipItemVo;
        godVo : GodItemVo;
        position : number;  // 1-4 装备槽位
    }

	export class TabBaoshiNew extends ui.equip.gemstone.TabBaoshiNewUI {

		private _curIdx = -1; //当前选择的装备index
        // private _curEquipUUid : string; // 存uuid获取最新的EquipItemVo（EquipItemVo会变）
		constructor() {
			super();
            this.list_equip.selectedIndex = -1;
			this.list_equip.mouseHandler = new Handler(this, this.onEquipMouseSelect);  
			this.list_equip.renderHandler = new Handler(this, this.onEquipItemRender);

			this.btnOnekeyUnload.on(Laya.Event.CLICK, this, this.onUnload);
			this.btnOnekeyWear.on(Laya.Event.CLICK, this, this.onWear);
			this.btnComp.on(Laya.Event.CLICK, this, this.onComp);
		}
		public set dataSource($value: GodItemVo) {
			this._dataSource = $value;
		}

		public get dataSource(): GodItemVo {
			return this._dataSource;
		}

        public close() {
			Laya.timer.clearAll(this);
			this.list_equip.array = null;
            this.list_equip.selectedIndex = -1;
            this._curIdx = -1;
            this.gemItem1.dataSource = null;
            this.gemItem2.dataSource = null;
            this.gemItem3.dataSource = null;
		}

		public init() {
			let godVo = this.dataSource as GodItemVo;
            let ary: IGodGemUIVo[] = [];
            for(let i = 1 ; i <= 4 ; i++){
                let equipVo = godVo.getEquipmentBySlot(i);
                let uiVo = {equipVo,godVo,position:i};
                ary.push(uiVo);
            }
            this.list_equip.array = ary;
            // 选择已有的装备
            this._curIdx = ary.findIndex((vo)=>{
                return vo ? true : false;
            });
            this._curIdx = this._curIdx < 0 ? 0 : this._curIdx;
            this.list_equip.selectedIndex = this._curIdx;
            this.onEquipMouseSelect(null,this._curIdx,false);
		}

        /**
         * 选择装备
         * @param idx 
         */
		private onEquipMouseSelect(event:Laya.Event,idx:number,show:boolean=true):void {
			if (event && event.type != Laya.Event.CLICK) return;
            let gemUIVo = this.list_equip.getItem(idx) as IGodGemUIVo;
            if(!gemUIVo ) return;
            this._curIdx = idx;
            this.renderEquipInfo();
            // if (!gemUIVo.equipVo && show) {
			// 	EquipModel.getInstance().showEquipByView = EquipType.SHENLING_BAOSHI_VIEW;
			// 	dispatchEvt(new EquipEvent(EquipEvent.OPEN_EQUIP_PANEL), [idx + 1, 1]);
			// }
		}

        /** 渲染装备的宝石信息 */
        public renderEquipInfo():void {
            if(this._curIdx<0) return;
            let gemUIVo : IGodGemUIVo = this.list_equip.getItem(this._curIdx);
            let godVo = this.dataSource;
            if(!gemUIVo || !godVo) return;
            let equipVo = gemUIVo.equipVo;
            this.lbEquipName.text = equipVo ? equipVo.tab_item.name : "";
            let ary = [];
            let slot = this._curIdx * GemstoneModel.gemstone_type_count + GemstoneType.shengming;
            this.gemItem1.dataSource = {godVo,slot,equipVo,type:GemstoneType.shengming,gemVo:godVo.getGemsBySlot(slot)};
            slot = this._curIdx * GemstoneModel.gemstone_type_count + GemstoneType.gongji;
            this.gemItem2.dataSource = {godVo,slot,equipVo,type:GemstoneType.gongji,gemVo:godVo.getGemsBySlot(slot)};
            slot = this._curIdx * GemstoneModel.gemstone_type_count + GemstoneType.fangyu;
            this.gemItem3.dataSource = {godVo,slot,equipVo,type:GemstoneType.fangyu,gemVo:godVo.getGemsBySlot(slot)};
            let betterGems : boolean = Object.keys(GemstoneUtils.getCanWearGemList(godVo)).length > 0;
            this.btnOnekeyWear.visible = betterGems;
            this.btnOnekeyUnload.visible = !betterGems;
        }

        /** 选中装备 */
        public selectedEquip(equipId:string):void {
            let uiVoList = this.list_equip.array as IGodGemUIVo[];
            let index = uiVoList.findIndex((vo)=>{
                return vo && vo.equipVo && vo.equipVo.uuid == equipId;
            });
            if(index != -1) {
                this.list_equip.selectedIndex = index;
                this.onEquipMouseSelect(null,index);
            }
        }

        /** 播放动画 */
        public playAnim(types:number[]):void {
            if(this.gemItem1.dataSource && types.indexOf(this.gemItem1.dataSource.type) != -1) {
                this.gemItem1.playAnim();
            }
            if(this.gemItem2.dataSource && types.indexOf(this.gemItem2.dataSource.type) != -1) {
                this.gemItem2.playAnim();
            }
            if(this.gemItem3.dataSource && types.indexOf(this.gemItem3.dataSource.type) != -1) {
                this.gemItem3.playAnim();
            }
        }


        /** 一键卸下 */
        private onUnload():void {
            let godVo = this.dataSource
            if(!godVo) return;
            dispatchEvt(new GemstoneEvent(GemstoneEvent.ONE_KEY_UNLOAD),godVo);
        }
        /** 一键镶嵌 */
        private onWear():void {
            let godVo = this.dataSource
            if(!godVo) return;
            dispatchEvt(new GemstoneEvent(GemstoneEvent.ONE_KEY_WEAR),godVo);
        }
        /** 合成 */
        private onComp():void {
            dispatchEvt(new GemstoneEvent(GemstoneEvent.SHOW_COMPOUND_VIEW));
        }

		private _isplayEff:boolean = false;
        private _playCallback : Function;
        public playEquipEff(callback:Function):void{
            this._playCallback = callback;
            this.stopEquipEff();
            this._isplayEff = true;
            for (let i:number = 0; i < this.list_equip.cells.length; i++){
                let cell = this.list_equip.cells[i];
                Laya.Tween.to(cell, {x:152,y:121}, 160, null);
            }
            Laya.timer.once(260, this, this.fanEquipEff);
        }

        private fanEquipEff():void{
            for (let i:number = 0; i < this.list_equip.cells.length; i++){
                let cell = this.list_equip.cells[i];
                Laya.Tween.to(cell, {x:this.equippos[i*2],y:this.equippos[i*2+1]}, 260, null);
            }
            Laya.timer.once(260, this, this.stopEquipEff);
        }

        public stopEquipEff():void{
            if(this._playCallback) {
                this._playCallback();
                this._playCallback = null;
            }
            this._isplayEff = false;
            Laya.timer.clear(this, this.fanEquipEff);
            Laya.timer.clear(this, this.stopEquipEff);
            for (let i:number = 0; i < this.list_equip.cells.length; i++){
                let cell = this.list_equip.cells[i];
                cell.x = this.equippos[i*2];
                cell.y = this.equippos[i*2+1];
                Laya.Tween.clearAll(cell);
            }
        }

        public equippos:number[] = [0,0, 304,0, 0,242, 304,242];
		/**
         * 装备渲染
         * @param item 
         * @param index 
         */
		private onEquipItemRender(itemIR: game.EquipBaoshiIR, index: number): void {
			if (!itemIR) return;
            itemIR.x = this.equippos[index*2];
            itemIR.y = this.equippos[index*2+1];
            let equipBox = itemIR.equipBox;
            let selectBox = equipBox.getChildByName("selectBox") as Laya.Sprite;
            selectBox.visible = this._curIdx == index;
		}

		
	}

	
}