var game;
(function (game) {
    var gloryLastRankPropIR = /** @class */ (function () {
        function gloryLastRankPropIR(rankui) {
            this._rankui = rankui;
            this._rankui.visible = false;
            this.lbName = rankui.getChildByName("lbName");
            var hbox = rankui.getChildByName("hbox");
            this.lbForce = hbox.getChildByName("lbForce");
            this.roleBox = rankui.getChildByName("roleBox");
            this.uiScene = new Base2dSceneLayer();
            this.roleBox.addChildAt(this.uiScene, 0);
            this.uiScene.setModelBox(rankui, this.roleBox, this.lbForce);
        }
        Object.defineProperty(gloryLastRankPropIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        gloryLastRankPropIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info.name;
                this.lbForce.text = info.force + "";
                this.lbForce.event(Laya.Event.RESIZE);
                this.uiScene.onShow();
                var model = game.GodUtils.getShowGodModel(info.showGodId, info.showSkinId);
                Laya.timer.once(200, this, this.delayShow, [model]);
                this._rankui.visible = true;
                this.roleBox.on(Laya.Event.CLICK, this, this.onShowInfo);
            }
            else {
                this.uiScene.onExit();
                Laya.timer.clearAll(this);
                this._rankui.visible = false;
                this.roleBox.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        };
        gloryLastRankPropIR.prototype.onShowInfo = function () {
            var info = this.dataSource;
            if (info && info.playerId) {
                UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
            }
        };
        /** 延迟展示模型（延迟主要为了定位） */
        gloryLastRankPropIR.prototype.delayShow = function (modelId) {
            if (modelId <= 0)
                return;
            var point = this.roleBox.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(modelId, point.x + this.roleBox.width / 2 - Launch.offsetX, point.y - Launch.offsetY + 200, 180, 1.8);
        };
        return gloryLastRankPropIR;
    }());
    game.gloryLastRankPropIR = gloryLastRankPropIR;
})(game || (game = {}));
