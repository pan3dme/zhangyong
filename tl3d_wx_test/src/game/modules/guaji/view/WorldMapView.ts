/**
* name 
*/
module game {
    export class WorldMapView extends ui.guaji.WorldMapUI {
        //通关的最高难度
        private _maxLv: number = 1;
        /** 当前选择的难度 */
        private _curlev: number;

        public downX: number;
        public downY: number;
        public mLastMouseX: number;
        public mLastMouseY: number;

        private moveFlag: boolean;

        private moveAni: boolean = false;

        private _model : GuajiModel;
        constructor() {
            super();
            this.isModelClose = true;
            this.box_chapter0.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter1.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter2.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter3.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter4.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter5.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter6.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter7.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter8.on(Laya.Event.CLICK, this, this.onClick);
            this.box_chapter9.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_lev0.on(Laya.Event.CLICK, this, this.onSelectLev);
            this.btn_lev1.on(Laya.Event.CLICK, this, this.onSelectLev);
            this.btn_lev2.on(Laya.Event.CLICK, this, this.onSelectLev);
            this.btn_close.on(Laya.Event.CLICK, this, this.close);

            this.img_viewport.scrollRect = new laya.maths.Rectangle(0, 0, 600, 1006);
            this._model = GuajiModel.getInstance();
        }

        /**
		 * 鼠标按下拖动地图
		 * @param e 
		 */
        private mouseDown(e: Laya.Event): void {
            if (this._model.isInMapGuide()) {
                return;
            }
            this.moveFlag = false;
            this.downX = this.mLastMouseX = this.bg.mouseX;
            this.downY = this.mLastMouseY = this.bg.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

		/**
		 * 拖动
		 * @param e 
		 */
        private mouseMove(e: Laya.Event): void {
            let diffx = (this.bg.mouseX - this.mLastMouseX);
            this.bg.x += diffx;
            let viewport = this.img_viewport.scrollRect;
            let vw = viewport.width;
            // let vh = viewport.height;
            if (this.bg.x < (vw - this.bg.width)) {
                this.bg.x = vw - this.bg.width;
            }
            if (this.bg.x > 0) {
                this.bg.x = 0;
            }

            if (!this.moveFlag) {
                let moveX = Math.abs(this.downX - this.bg.mouseX);
                let moveY = Math.abs(this.downY - this.bg.mouseY);
                this.moveFlag = moveX > 3 || moveY > 3;
                this.stopAni(this.ani_move);
            }
        }

        private mouseUp(): void {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

        /**
         * 移动到某个点
         * @param tx 
         * @param ty 
         */
        public moveMap(cb?: Function) {
            //移动完毕前，禁止任何点击操作。
            GuideMask.showWithTransparent();
            let viewport = this.img_viewport.scrollRect;
            let vw = viewport.width;
            let tx = this._curCenter[0];
            tx = -(tx - vw / 2);
            if (tx < (viewport.width - this.bg.width)) {
                tx = viewport.width - this.bg.width;
            }
            if (tx > 0) {
                tx = 0;
            }
            Laya.Tween.to(this.bg, { "x": tx }, 500, null, Handler.create(this, () => {
                if (cb) {
                    cb();
                } else {
                    GuideMask.hide();
                }
            }));
        }

        private setBtnGary(): void {
            this.btn_lev0.gray = Number(this.btn_lev0.name) > this._maxLv;
            this.btn_lev1.gray = Number(this.btn_lev1.name) > this._maxLv;
            this.btn_lev2.gray = Number(this.btn_lev2.name) > this._maxLv;
        }

        private onSelectLev($e: Laya.Event) {
            let btnlev: number = Number($e.target.name);
            if (btnlev > this._maxLv) {
                showToast(LanMgr.getLan('', 10085));
                return;
            }

            this._curlev = btnlev;
            this.refreshData();
            this.showtip();
        }


        private setLev() {
            // this.btn_lev0.mouseEnabled = this.btn_lev0.selected = this._curlev != 1;
            // this.btn_lev1.mouseEnabled = this.btn_lev1.selected = this._curlev != 2;
            // this.btn_lev2.mouseEnabled = this.btn_lev2.selected = this._curlev != 3;
            //10 118 225
            this.btn_select.x = this._curlev == 1 ? 10 : this._curlev == 2 ? 118 : 225;
        }

        public popup() {
            super.popup();
            if (isNaN(this.bg.x)) {
                this.bg.x = 0;
            }
            //监听
            this.bg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.bg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.bg.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);

            this.ani_suo.visible = false;
            this._zjlist = this._model.zhangjieList;
            this._curlev = this._model.currentZhangjie.tbCopy.sub_type;
            this.getMaxLvOpt();
            this.refreshData();
            this.setBtnGary();
            this.showtip();


        }

        private showtip() {
            //新难度提示
            let ntag: number = this._model.newOpen;
            this.aniArrow.visible = false;
            if (ntag != 0) {
                let zj = this.getZjVoById(ntag);
                if (zj.tbCopy.sub_type == this._curlev) {
                    //在当前难度
                    let idx = zj.tbCopy.chapter - 1;
                    let ui = this["box" + idx];
                    this._curCenter = [ui.x, ui.y];
                    this.moveMap(() => {
                        this.ani_suo.visible = true;
                        this.ani_suo.x = ui.x;
                        this.ani_suo.y = ui.y;
                        this.ani_suo.play(0, false);
                        setTimeout(() => {
                            this.ani_suo.visible = false;
                            if(!GuideWeakManager.isExcuting()){
                                this.aniArrow.visible = true;
                            }
                            this.aniArrow.x = ui.x + this.bg.x;
                            this.aniArrow.y = ui.y;
                            this.aniArrow.rotation = 180;
                            GuideMask.hide();
                        }, 1000);
                    });
                } else {
                    if(!GuideWeakManager.isExcuting()){
                        this.aniArrow.visible = true;
                    }
                    let idx = zj.tbCopy.sub_type - 1;
                    let ui: Laya.Button = this["btn_lev" + idx];
                    this.aniArrow.x = ui.x;
                    this.aniArrow.y = ui.y;
                    this.aniArrow.rotation = 0;
                    this.moveMap();
                }
                this.aniArrow.play();
            } else {
                this.aniArrow.stop();
                //没有新解锁的章节
                this.moveMap();

                if (!this.ani_move.visible && !this.moveAni) {
                    this.moveAni = true;
                    this.ani_move.visible = true;
                    this.ani_move.play();
                }
            }


        }


        private _zjlist: Array<ZhangjieVo>;
        private getZjVoById(id: number): ZhangjieVo {
            for (var i = 0; i < this._zjlist.length; i++) {
                if (this._zjlist[i].id == id) {
                    return this._zjlist[i];
                }
            }
            return null;
        }

        private getMaxLvOpt() {
            for (var i = 0; i < this._zjlist.length;) {
                var element = this._zjlist[i];
                if (element.isOpen()) {
                    i = i + tb.TB_copy_set.getCopySet().max_chapter;
                    this._maxLv = element.tbCopy.sub_type;
                } else {
                    break;
                }
            }
        }

        private onClick($e: Laya.Event) {
            //战斗中无法切换地图
            if(this._model.isFight){
                showToast(LanMgr.getLan(``,10391));
                return;
            }
            // if (this.moveFlag) return;
            let target: Laya.Box = $e.target as Laya.Box;
            let zjvo: ZhangjieVo = target.dataSource;

            let ui: Laya.Image = this["img_chapter" + (zjvo.tbCopy.chapter - 1)];
            AudioMgr.playSound();

            Laya.Tween.to(ui, { scaleX: 1.2, scaleY: 1.2 }, 120, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(ui, { scaleX: 1, scaleY: 1 }, 120, null, Laya.Handler.create(this, () => {
                    if (ui.gray) {
                        showToast(ui.dataSource.info)
                        return;
                    }

                    if (App.hero.copyUnlockId < zjvo.id) {
                        var args = {};
                        args[Protocol.game_copy_copyUnlock.args.id] = zjvo.id;
                        PLC.request(Protocol.game_copy_copyUnlock, args, ($data: any) => {
                            if (!$data) return;
                            App.hero.copyUnlockId = $data.copyUnlockId;
                            this._model.newOpen = 0;
                            this.onClickBtn(zjvo, true);
                        });
                    } else {
                        this.onClickBtn(zjvo);
                    }
                }));
            }));
        }

        private onClickBtn(zjvo: ZhangjieVo, isUnlock:boolean = false) {
            if (isUnlock && this._model.currentZhangjie.id != zjvo.id) {
                this._model.currentZhangjie = zjvo;
                dispatchEvt(new GuajiEvent(GuajiEvent.UPDATE_ZHANGJIE_EVENT));
                 UIMgr.showUI(UIConst.OpenChapterView, {type:OpenChapterView.TYPE_GUAJI, isnew:true, infovo:zjvo});
            }else{
                UIMgr.showUI(UIConst.GuanQiaNewView, zjvo);
            }
            this.close();
        }

        private stopAni(ani) {
            if (ani && ani.visible) {
                ani.gotoAndStop(0);
                ani.visible = false;
            }
        }

        private _curCenter: Array<number> = [1000, 1000];
        private refreshData() {
            this.stopAni(this.ani_fight);
            this.setLev();
            for (var i = 0; i < this._zjlist.length; i++) {
                let zj: ZhangjieVo = this._zjlist[i];
                let tb: tb.TB_copy = zj.tbCopy;
                if (tb.sub_type == this._curlev) {
                    let idx = tb.chapter - 1;
                    //绑定红点
                    let redpointId = tb.sub_type * 10 + tb.chapter;

                    let ui: Laya.Image = this["img_chapter" + idx];
                    ui.dataSource = tb;
                    let tag: number = i % 10;
                    this["box_chapter" + tag].dataSource = zj;
                    this["lab_chapter" + tag].text = tb.name;
                    let isopen = zj.isOpen();
                    this["img_chapter" + tag].gray = !isopen;
                    this["img_chapter" + tag].dataSource = {info:LanMgr.getLan("", 11003)};
                    this["lab_open" + tag].visible = false;
                    if (!isopen && zj.isNew()) {
                        let lev = zj.getOpenLev();
                        if (lev != 0 && lev > App.hero.level) {
                            this["lab_open" + tag].visible = true;
                            this["lab_open" + tag].text = `${lev}级开启`;
                            this["img_chapter" + tag].dataSource = {info:`${lev}级开启`};
                        }
                    }

                    if (zj.id == this._model.currentZhangjie.id) {
                        this.ani_fight.visible = true;
                        this.ani_fight.x = this["box" + tag].x;
                        this.ani_fight.y = this["box" + tag].y;
                        this.ani_fight.play(0, true);
                        this._curCenter = [this.ani_fight.x, this.ani_fight.y];
                    }
                }
            }
        }

        public close(): void {
            super.close("", false);
            //移除监听
            this.bg.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.bg.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.bg.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            Laya.Tween.clearAll(this.bg);
            //关闭界面时，一定要关闭掉遮罩。
            GuideMask.hide();
            this.stopAni(this.ani_move);
        }

    }
}