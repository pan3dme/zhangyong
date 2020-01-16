/**
* name 
*/
module game {
    export class GuanQiaNewView extends ui.guaji.GuanQiaNewUI {


        public downX: number;
        public downY: number;
        public mLastMouseX: number;
        public mLastMouseY: number;

        /** 关卡位置信息 */
        private static GUANQIA_POS_INFO:number[][] = [
            [209,158,   152,258,   83,376,   292,373,   519,374,   696,459,   740,362,   638,167,   808,207,   824,96],
            [178,155,   213,332,   189,425,   423,409,   648,512,   766,432,   649,341,   417,255,   681,193,   534,122],
            [612,172,   415,90,   254,162,   118,259,   239,290,   454,236,   419,367,   253,412,   545,425,   750,377],
            [168,147,   269,226,   189,332,   314,414,   400,364,   554,459,   715,393,   682,280,   506,239,   456,116],
            [135,93,   169,187,   248,358,   427,300,   596,325,   756,458,   714,223,   580,189,   372,214,   495,138],
            
            [198,310,   337,343,   308,460,   446,494,   461,400,   578,373,   738,379,   608,271,   482,294,  442,208],

            [229,319,   270,423,   470,401,   617,442,   833,411,   781,273,   686,127,  547,151,    432,196,   314,119],
            [252,444,   705,488,   828,298,   694,113,   503,123,   224,85,   127,173,   272,311,   604,251,   420,338],
            [105,220,   168,326,   386,462,   648,487,   566,387,   728,348,   672,259,   519,213,   285,241,   492,111],
            [548,483,   434,417,   266,382,   397,332,   596,366,   704,271,   556,196,   358,225,   233,194,   439,70],
        ];
        constructor() {
            super();
            this.isModelClose = true;
            this.img_viewport.scrollRect = new laya.maths.Rectangle(0, 0, 600, 1006);
            let range:number = this.img_viewport.scrollRect.width - this.img_guanqia.width;
            if (range > 0){
                this._leftRange = -321;
                this._rightRange = this._leftRange + range;
            }else{
                this._rightRange = -321;
                this._leftRange = this._rightRange + range;
            }
            this._uiGuanQiaList = [];
            for (let i:number = 0; i < 10; i++){
                this._uiGuanQiaList[i] = this["ui_level_"+i];
            }
        }

        private _curZhangJieVo:ZhangjieVo;
        private _curGuanQiaVo:GuaJiGuanqiaVo;
        private _curGuanQiaPos:number[];
        private _allGuanQiaVo:GuaJiGuanqiaVo[];
        private _uiGuanQiaList:GuanQiaNewIR[];
        public popup() {
            super.popup();

            //监听
            this.img_bg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.img_bg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.img_bg.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            for (let i:number = 0; i < this._uiGuanQiaList.length; i++){
                this._uiGuanQiaList[i].on(Laya.Event.CLICK, this, this.onClickGuanQia, [i]);
            }
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
            this.img_worldmap.on(Laya.Event.CLICK, this, this.onClickWorldMap);
            tl3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.onGuanQiaChange, this);
            // Pan3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT, this.onZhangJieChange, this);

            
            this.onZhangJieChange();
            this.onGuanQiaChange();


        }

        //更新章节
        private onZhangJieChange():void{
            this._curZhangJieVo = this.dataSource;
            this._curGuanQiaPos = GuanQiaNewView.GUANQIA_POS_INFO[this._curZhangJieVo.tbCopy.chapter-1];
            this._allGuanQiaVo = [];
            for (let key in this._curZhangJieVo.guankaMap){
                let obj:GuaJiGuanqiaVo = this._curZhangJieVo.guankaMap[key];
                this._allGuanQiaVo[obj.index-1] = obj;
            }

            this.updateZhangJie();
        }

        //更新关卡
        private onGuanQiaChange():void{
            this._curGuanQiaVo = this._curZhangJieVo.getCurGuanqia();
            this.updateGuanQia();
            let curIndex:number = this._curGuanQiaVo.index -1;
            let curGuanQiaPosx:number = this._curGuanQiaPos[curIndex*2];
            this.scrollMap(-51-curGuanQiaPosx);
        }

        //更新章节
        private updateZhangJie():void{
            if (!this._curZhangJieVo) return;
            this.img_guanqia.skin = LanMgr.getLan("guaji/sjdt/{0}.jpg", -1, this._curZhangJieVo.tbCopy.chapter);
            let sub_type:number = this._curZhangJieVo.tbCopy.sub_type;
            let stateStr:string = sub_type == 1 ? "普通" : sub_type == 2 ? "困难" : "地狱";
            this.lab_title.text = LanMgr.getLan("{0}({1})", -1, this._curZhangJieVo.tbCopy.name,stateStr);
            this.img_title.width = this.lab_title.width + 70;
            for (let i:number = 0; i < this._uiGuanQiaList.length; i++){
                let ui:GuanQiaNewIR = this._uiGuanQiaList[i];
                if (i < this._allGuanQiaVo.length){
                    ui.visible = true;
                    ui.dataSource = this._allGuanQiaVo[i];
                    ui.x = this._curGuanQiaPos[i*2];
                    ui.y = this._curGuanQiaPos[i*2+1];
                }else{
                    ui.visible = false;
                    ui.dataSource = null;
                }
            }
        }

        //更新关卡
        private updateGuanQia():void{
            let hasAni:boolean = false;
            for (let i:number = 0; i < this._allGuanQiaVo.length; i++){
                let ui:GuanQiaNewIR = this._uiGuanQiaList[i];
                if (ui){
                    let vo:GuaJiGuanqiaVo = this._allGuanQiaVo[i];
                    vo.updateState();
                    if (vo.isPass || vo.isNext()){
                        ui.setSelect(true);
                    }else{
                        ui.setSelect(false);
                    }

                    if (!this._curGuanQiaVo.isPass && vo.index == this._curGuanQiaVo.index){
                        hasAni = true;
                        this.ani_select.x = ui.x +28;
                        this.ani_select.y = ui.y - 20;
                    }
                }
            }
            if (hasAni){
                this.ani_select.visible = true;
                this.ani_select.play();
            }else{
                this.ani_select.visible = false;
                this.ani_select.stop();
            }
        }

        //设置关卡地图位置
        private _leftRange:number = 0;
        private _rightRange:number = 0;
        private scrollMap(posx:number):void{
            if (posx < this._leftRange) posx = this._leftRange;
            if (posx > this._rightRange) posx = this._rightRange;
            if (this.img_bg.x == posx) return;
            this.img_bg.x = posx;
            
        }

        private onClickGuanQia(index:number):void{
            if (this._allGuanQiaVo && this._allGuanQiaVo[index]){
                UIMgr.showUI(UIConst.GuanQiaInfoView, this._allGuanQiaVo[index]);
            }
        }

        private onClickWorldMap():void{
            UIMgr.showUI(UIConst.WordMap);
            this.close();
        }

        /**
		 * 鼠标按下拖动地图
		 * @param e 
		 */
        private mouseDown(e: Laya.Event): void {
            this.downX = this.mLastMouseX = this.img_bg.mouseX;
            this.downY = this.mLastMouseY = this.img_bg.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

		/**
		 * 拖动
		 * @param e 
		 */
        private mouseMove(e: Laya.Event): void {
            let diffx = (this.img_bg.mouseX - this.mLastMouseX);
            this.scrollMap(this.img_bg.x + diffx);
        }

        private mouseUp(): void {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }



        public close(): void {
            super.close("", false);
            
            this.img_bg.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.img_bg.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.img_bg.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            for (let i:number = 0; i < this._uiGuanQiaList.length; i++){
                this._uiGuanQiaList[i].off(Laya.Event.CLICK, this, this.onClickGuanQia);
            }
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            this.img_worldmap.off(Laya.Event.CLICK, this, this.onClickWorldMap);
            tl3d.ModuleEventManager.removeEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.onGuanQiaChange, this);
            // Pan3d.ModuleEventManager.removeEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT, this.onZhangJieChange, this);

            this._curZhangJieVo = null;
            this._curGuanQiaVo = null;
            this._curGuanQiaPos = null;
            this._allGuanQiaVo = null;
        }

    }
}