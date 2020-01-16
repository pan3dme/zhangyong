var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var BossFightRankIR = /** @class */ (function (_super) {
        __extends(BossFightRankIR, _super);
        function BossFightRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BossFightRankIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        BossFightRankIR.prototype.getIconMask = function () {
            //创建遮罩对象
            if (!this._iconmask) {
                this._iconmask = new Laya.Sprite();
            }
            this._iconmask.graphics.clear();
            this._iconmask.graphics.drawCircle(55, 55, 46, "#f16712", null, 0.01);
            return this._iconmask;
        };
        BossFightRankIR.prototype.refreshView = function () {
            var info = this.dataSource;
            // logyhj("获得数据", info);
            this.clearTimer(this, this.addMask);
            this.icon.mask = null;
            if (info) {
                // this.addChild(this.getIconMask());
                this.frameOnce(3, this, this.addMask);
                this.icon.skin = SkinUtil.getHeroIcon(info.head);
                this.imgRank.skin = SkinUtil.getRankSkin(info.rank + 1);
                var isExist = info.playerId ? true : false;
                this.lbName.text = isExist ? info.playerName : LanMgr.getLan("", 12508);
                this.lbName.y = isExist ? 42 : 52;
                this.lbDamage.visible = isExist;
                this.lbDamage.value = info.value + "";
                this.icon.on(Laya.Event.CLICK, this, this.onShow);
            }
            else {
                // this.icon.mask = null;
                this.icon.skin = "";
                this.imgRank.skin = "";
                this.icon.off(Laya.Event.CLICK, this, this.onShow);
            }
        };
        BossFightRankIR.prototype.addMask = function () {
            this.icon.mask = this.getIconMask();
        };
        BossFightRankIR.prototype.onShow = function () {
            var info = this.dataSource;
            if (info && info.playerId) {
                UIUtil.showPlayerLineupInfo(info.playerId);
            }
        };
        return BossFightRankIR;
    }(ui.boss.FightRankIRUI));
    game.BossFightRankIR = BossFightRankIR;
})(game || (game = {}));
