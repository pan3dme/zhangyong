module game {
    export class MainTabPage extends ui.activity.powerrank.mainTabPageUI {

        private uiScene1: Base2dSceneLayer;
        private _data:RankListVo;
        private _list: Array<PrRankVo>;
        constructor() {
            super();
            this.isModelClose = true;
            this.uiScene1 = new Base2dSceneLayerExt();
            this.boxRole.addChild(this.uiScene1);
            this.btnRank.on(Laya.Event.CLICK,this,this.onClick);
            this.boxFirst.on(Laya.Event.CLICK,this,this.onShowInfo,[0]);
            this.boxSecond.on(Laya.Event.CLICK,this,this.onShowInfo,[1]);
            this.boxThird.on(Laya.Event.CLICK,this,this.onShowInfo,[2]);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        public onOpened() {
            super.onOpened();
        }

        public close() {
            // super.close();
            this.listRank.array = null;
            this._list = null;
            this.uiScene1.onExit();
            this.lab_time.clearTimer(this, this.onLoop);
        }

        public init() {
            this._data = this.dataSource;
            let ary: Array<PrRankVo> = [];
            for (var i = 0; i < this._data.rewardList.length; i++) {
                ary.push(this._data.rewardList[i]);
            }
            this._list = ary;
            this.listRank.array = this._list;

            this.lab_mypower.text = this._data.getMyRankDesc();
            this.lab_myrank.text = this._data.getMyValueDesc();
            Laya.timer.clearAll(this);
            this.lab_time.timerLoop(10000, this, this.onLoop);
            this.onLoop();
            this.drawRank();
        }

        private onLoop() {
            let nTime = App.getOpenServerTime() + this._data.rankType.time[1] * TimeConst.ONE_DAY_SEC;
            let visibleTime = nTime - App.getServerTime();
            if (visibleTime > 0) {
                this.lab_time.text = LanMgr.getLan("",12632) + activityTime(nTime, App.getServerTime());
            } else {
                this.lab_time.text = LanMgr.getLan("", 11010);
                this.lab_time.clearTimer(this, this.onLoop);
            }
        }

        private drawRank() {
            let firstVo : PrRankVo = this._list[0];
            if(firstVo.hasPerson) {
                this.lbFirstName.text = firstVo.name;
                this.lbFisrtDesc.text = firstVo.getTitle()+":" + firstVo.getValueDesc();
            }
            this.lbFirstName.visible = this.lbFisrtDesc.visible = firstVo.hasPerson;
            this.lbFirstEmpty.visible = this.imgFirstEmpty.visible = !firstVo.hasPerson;

            let secondVo : PrRankVo = this._list[1];
            if(secondVo.hasPerson) {
                this.lbSecondName.text = secondVo.name;
                this.lbSecondDesc.text = secondVo.getTitle()+":" + secondVo.getValueDesc();
            }
            this.lbSecondName.visible = this.lbSecondDesc.visible = secondVo.hasPerson;
            this.lbSecondEmpty.visible = this.imgSecondEmpty.visible = !secondVo.hasPerson;

            let thirdVo : PrRankVo = this._list[2];
            if(thirdVo.hasPerson) {
                this.lbThirdName.text = thirdVo.name;
                this.lbThirdDesc.text = thirdVo.getTitle()+":" + thirdVo.getValueDesc();
            }
            this.lbThirdName.visible = this.lbThirdDesc.visible = thirdVo.hasPerson;
            this.lbThirdEmpty.visible = this.imgThirdEmpty.visible = !thirdVo.hasPerson;
            
            this.uiScene1.onShow();
            let model = firstVo.hasPerson ? this._data.getModelId(1) : 0;
            Laya.timer.once(300,this,this.showmodel1,[model]);

            model = secondVo.hasPerson ? this._data.getModelId(2) : 0;
            Laya.timer.once(350,this,this.showmodel2,[model]);
            
            model = thirdVo.hasPerson ? this._data.getModelId(3) : 0;
            Laya.timer.once(400,this,this.showmodel3,[model]);
        }

        private _uiChar1 : GameUIChar;
        public showmodel1(model:number):void {
            this.removeUIChar(1);
            if( model == 0) return;
            let posSprite = this.imgFirstTY;
            let point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar1 = this.uiScene1.addModelChar(String(model), point.x + posSprite.width*posSprite.scaleX/2 - Launch.offsetX, point.y+40 - Launch.offsetY, 180, 1.8);
        }
        private _uiChar2 : GameUIChar;
        public showmodel2(model:number):void {
            this.removeUIChar(2);
            if(model == 0) return;
            let posSprite = this.imgSecondTY;
            let point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar2 = this.uiScene1.addModelChar(String(model), point.x + posSprite.width*posSprite.scaleX/2 - Launch.offsetX, point.y+40 - Launch.offsetY, 180, 1.8);
        }
        private _uiChar3 : GameUIChar;
        public showmodel3(model:number):void {
            this.removeUIChar(3);
            if(model == 0) return;
            let posSprite = this.imgThirdTY;
            let point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar3 = this.uiScene1.addModelChar(String(model), point.x + posSprite.width*posSprite.scaleX/2 - Launch.offsetX, point.y+40 - Launch.offsetY, 180, 1.8);
        }
        private removeUIChar(index:number):void {
            if(index == 1 && this._uiChar1) {
                this._uiChar1.removeSelf();
                this._uiChar1 = null;
            }else if(index == 2 && this._uiChar2) {
                this._uiChar2.removeSelf();
                this._uiChar2 = null;
            }else if(index == 3 && this._uiChar3) {
                this._uiChar3.removeSelf();
                this._uiChar3 = null;
            }
        }

        private onClick() {
            dispatchEvt(new PowerrankEvent(PowerrankEvent.OPEN_DETAIL_PANEL));
        }
        
        private onShowInfo(index:number):void {
            let vo = this._list ? this._list[index] : null;
            if(!vo) return;
            UIUtil.showPlayerLineupInfo(vo.playerID);
        }
    }
}