module game {
    export class OnlineMainPage extends ui.activity.online.mainPageUI {
        constructor() {
            super();
            this.isModelClose = true;
        }


        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        private init() {
            OnlineModel.curId = 999;
            this._lastid = -1;
            let ary: Array<BoxVo> = OnlineModel.getInstance().getList();
            for (var i = 0; i < ary.length; i++) {
                let itemvo = ary[i];
                if (!itemvo.canReceive()) {
                    OnlineModel.curId = Math.min(OnlineModel.curId, itemvo.id);
                }
            }
            this.list_item.renderHandler = Handler.create(this, this.onItemRender, null, false);
            this.list_item.dataSource = ary;
            this.tickLoop();
        }

        private onItemRender(cell:game.ItemIR, index:number):void{
            cell.anim_select.scale(0.9, 0.9);
        }

        /** 是否需要计时器刷新 */
        private needTick() {
            let listdata: Array<BoxVo> = this.list_item.dataSource;
            for (var i = 0; i < listdata.length; i++) {
                if (!listdata[i].canReceive()) {
                    return true;
                }
            }
            return false;
        }

        private tickLoop() {
            if (this.needTick()) {
                this.timerLoop(1000, this, this.onLoop);
            } else {
                OnlineModel.curId = 999;
                this.clearTimer(this, this.onLoop);
            }
        }

        private _lastid: number;
        private onLoop() {
            let nid: number = -1;
            //找出最近的一个需要倒计时的容器，并刷新
            let listdata: Array<BoxVo> = this.list_item.dataSource;
            for (var i = 0; i < listdata.length; i++) {
                if (!listdata[i].canReceive()) {
                    nid = i;
                    if (OnlineModel.curId != i) OnlineModel.curId = i;
                    this.list_item.setItem(i, listdata[i]);
                    break;
                }
            }
            //如果切换到下一个容器，则需要刷新上一个容器一次
            if (nid != this._lastid) {
                if (this._lastid == -1) {
                    this._lastid = nid;
                } else {
                    this.updateLast();
                    this._lastid = nid;
                }
            }
            this.tickLoop();
        }

        private updateLast() {
            if (this._lastid != -1) {
                this.list_item.setItem(this._lastid, this.list_item.dataSource[this._lastid]);
            }
        }

        public updateItem(id:number){
            this.list_item.setItem(id, this.list_item.dataSource[id]);
        }

        public onClosed() {
            super.onClosed();
            if (this.list_item.renderHandler){
                this.list_item.renderHandler.recover();
                this.list_item.renderHandler = null;
            }
            this.list_item.dataSource = null;
            this.clearTimer(this, this.onLoop);
        }
    }
}