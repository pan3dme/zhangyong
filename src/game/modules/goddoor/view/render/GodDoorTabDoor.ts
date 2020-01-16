module game {
    export class GodDoorTabDoor extends ui.goddoor.render.TabDoorUI {
         private uiBottomScene: Base2dSceneLayerExt;
         private uiTopScene: Base2dSceneLayerExt;
        constructor() {
            super();
            this.uiBottomScene = new Base2dSceneLayerExt();
            this.addChildAt(this.uiBottomScene, 1);
            this.uiTopScene = new Base2dSceneLayerExt();
            this.addChildAt(this.uiTopScene, 3);
            this.btn_left.on(Laya.Event.CLICK, this, this.onLeft);
            this.btn_right.on(Laya.Event.CLICK, this, this.onRight);
            this.boxbtn_right.on(Laya.Event.CLICK, this, this.onRight);
            this.boxbtn_left.on(Laya.Event.CLICK, this, this.onLeft);
            this.boxbtn_top.on(Laya.Event.CLICK, this, this.onTop);
            this.btn_shop.on(Laya.Event.CLICK, this, this.onShop);
            this.btn_kaiqi.on(Laya.Event.CLICK, this, this.onOpen);
            this.lbXiangqing.on(Laya.Event.CLICK, this, this.onYulan);
        }

        public init() {
            this._clicktype = true;
            this.buildState();
            this.addBgEff();
        }

        private _isClickZH:boolean = false;
        private onOpen(){
            if (!this._clicktype) {
                return;
            }
            if (this._isClickZH || this._hasRewardEff){
                return;
            }
            dispatchEvt(new GodDoorEvent(GodDoorEvent.OPEN_DOOR_EVENT),this["img_" + this._lastType].dataSource);
            this.openDoorEvent(this["img_" + this._lastType].dataSource);
        }

         private openDoorEvent($data: tb.TB_divinity_door) {
            if ($data.cost[1] > App.hero.getBagItemNum(CostTypeKey.shenjiemiyao)) {
                showToast(LanMgr.getLan("", Lans.cost, CostTypeKey.shenjiemiyao));
                return;
            }
            this._isClickZH = true;
            var args = {};
            args[Protocol.game_god_doorEmploy.args.race] = $data.ID;
            PLC.request(Protocol.game_god_doorEmploy, args, ($sdata: any) => {
                this._isClickZH = false;
                if (!$sdata) return
                this.addRewardEff();
                Laya.timer.once(600, this, ()=>{
                    this.removeRewardEff();
                    UIUtil.showRewardView($sdata.commonData);
                })
                dispatchEvt(new GodDoorEvent(GodDoorEvent.KAIQI_SUCCESS));
            });
        }

        public close() {
            Laya.timer.clearAll(this);
            this.removeBgEff();
            this.removeRewardEff();
            this.uiBottomScene.onExit();
            this.uiTopScene.onExit();
            Laya.Tween.clearAll(this.img_1);
            Laya.Tween.clearAll(this.img_2);
            Laya.Tween.clearAll(this.img_3);
            Laya.Tween.clearAll(this.img_4);
            clearTimeout(this._timeout);
        }

        //添加背景特效
        private _bgEff:any;
        private _hasbgEff:boolean = false;
        private addBgEff():void{
            if (this._hasbgEff) return;
            this._hasbgEff = true;
            this.uiBottomScene.addEffect(this, 10000020, new tl3d.Vector3D(180, 0, -480), 2.5, 0, ($particle) => {
				this._bgEff = $particle;
                if (!this._hasbgEff){
                    this.removeBgEff();
                }
			});
        }

        //移除背景特效
        private removeBgEff():void{
            this._hasbgEff = false;
            if (this._bgEff) {
				this.uiBottomScene.removeEffect(this._bgEff);
				this._bgEff = null;
			}
        }

        //添加获得物品特效
        private _rewardEff:any;
        private _hasRewardEff:boolean = false;
        private addRewardEff():void{
            if (this._hasRewardEff) return;
            this._hasRewardEff = true;
            this.uiTopScene.addEffect(this, 10000021, new tl3d.Vector3D(180, 0, -480), 2.5, 0, ($particle) => {
				this._rewardEff = $particle;
                if (!this._hasRewardEff){
                    this.removeRewardEff();
                }
			});
        }

        //移除获得物品特效
        private removeRewardEff():void{
            this._hasRewardEff = false;
            if (this._rewardEff) {
				this.uiTopScene.removeEffect(this._rewardEff);
				this._rewardEff = null;
			}
        }

        private _clicktype: boolean;
        private _timeout: number;
        private _lastType: number = 1;
        private onTop() {
            if (!this._clicktype) {
                return;
            }
            clearTimeout(this._timeout);
            this.turnBuild(this._lastType + 1);
            this._timeout = setTimeout(() => {
                this.turnBuild(this._lastType + 1);
            }, 500);
        }

        private onShop() {
            dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.shenjie);
        }

        private onLeft() {
            if (!this._clicktype) {
                return;
            }
            clearTimeout(this._timeout);
            this.turnBuild(this._lastType - 1);
        }

        private onRight() {
            if (!this._clicktype) {
                return;
            }
            clearTimeout(this._timeout);
            this.turnBuild(this._lastType + 1);
        }

        private posMap = [
            { pos: [289, 376], scale: 1, alpha: 1, zoder: 3 },
            { pos: [494, 213], scale: 0.7, alpha: 0.7, zoder: 2 },
            { pos: [285, 112], scale: 0.7, alpha: 0.5, zoder: 0 },
            { pos: [82, 213], scale: 0.7, alpha: 0.7, zoder: 1 }
        ];

        private turnBuild(ntype: number) {
            this.removeBgEff();
            this._clicktype = false;
            let nid = ntype % this.posMap.length;
            this._lastType = nid == 0 ? 4 : nid;
            this.buildState(true);
        }

        private buildState(isturn: boolean = false) {
            //阵营数量
            let len = this.posMap.length;
            let tablist: Array<tb.TB_divinity_door> = tb.TB_divinity_door.get_TB_divinity_door();
            for (var i = 0; i < tablist.length; i++) {
                let curid = (len + tablist[i].ID - this._lastType) % len;
                let tempimg: Laya.Image = this["img_" + tablist[i].ID];

                if (curid == 0) {
                    this.img_teamtag.skin = SkinUtil.getGodRaceSkin2(this._lastType);
                    this.lab_cost.text = "X" + tablist[i].cost[1];
                    // this.lab_teamname.text = SkinUtil.teamName[this._lastType];
                    // this.btn_kaiqi.label = "X" + tablist[i].cost[1] + "召唤";
                }

                Laya.Tween.clearTween(tempimg);
                if (isturn) {
                    Laya.Tween.to(tempimg, { alpha: this.posMap[curid].alpha, x: this.posMap[curid].pos[0], y: this.posMap[curid].pos[1], scaleX: this.posMap[curid].scale, scaleY: this.posMap[curid].scale }, 500, null, Handler.create(this, () => {
                        tempimg.zOrder = this.posMap[curid].zoder;
                    }));
                } else {
                    tempimg.dataSource = tablist[i];
                    tempimg.pos(this.posMap[curid].pos[0], this.posMap[curid].pos[1]);
                    tempimg.scale(this.posMap[curid].scale, this.posMap[curid].scale);
                    tempimg.alpha = this.posMap[curid].alpha;
                    tempimg.zOrder = this.posMap[curid].zoder;
                }
            }
            dispatchEvt(new GodDoorEvent(GodDoorEvent.TURN_BUILD_OK));
            if (isturn) {
                setTimeout(() => {
                    this._clicktype = true;
                    this.addBgEff();
                }, 500);
            }
        }

        getLastType():number {
            return this._lastType;
        }

        private onYulan(){
            UIMgr.showUI(UIConst.GodDoor_JiangliView, this._lastType);
        }
    }
}