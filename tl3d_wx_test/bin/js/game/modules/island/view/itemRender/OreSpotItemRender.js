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
    var OreSpotIR = /** @class */ (function (_super) {
        __extends(OreSpotIR, _super);
        function OreSpotIR() {
            var _this = _super.call(this) || this;
            // 绘制区域
            // let gps:Laya.Graphics = new Laya.Graphics();
            // gps.drawPoly(0,0,[40,0,110,0,146,58,110,106,40,106,0,58],"#ff9900");
            // this.graphics.clear();
            // this.graphics = gps;
            // 点击区域
            var hitarea = new Laya.HitArea();
            var graphics = new Laya.Graphics();
            graphics.drawPoly(0, 88, [40, 0, 110, 0, 146, 58, 110, 106, 40, 106, 0, 58], "#ff9900");
            hitarea.hit = graphics;
            _this.hitArea = hitarea;
            return _this;
        }
        Object.defineProperty(OreSpotIR.prototype, "dataSource", {
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
        OreSpotIR.prototype.refreshView = function () {
            var info = this.dataSource;
            var uiFlag = this.ui_flag;
            if (info) {
                var exist = info.isExist();
                if (exist) {
                    this.lbTbName.text = exist ? info.tbOre.name : "";
                    this.lbTbName.color = game.IslandModel.ORE_COLORS[info.tbOre.ID];
                    this.icon.skin = SkinUtil.getIslandOreUrl(info.tbOre.ID);
                    this.icon.visible = this.lbTbName.visible = true;
                    var hasUser = info.hasUser();
                    if (hasUser) {
                        this.ImgForeBg.visible = this.lbName.visible = uiFlag.visible = true;
                        this.lbName.text = info.svo.playerName;
                        if (info.isSelf()) {
                            this.lbName.color = "#008bff";
                            uiFlag.img_di_0.skin = uiFlag.img_di_1.skin = "shenmidaoyu/wofangzuobiaodian.png";
                            uiFlag.img_flag.skin = "shenmidaoyu/wofang.png";
                            uiFlag.ani1.play(0, true);
                            uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = true;
                            uiFlag.ani2.play(0, true);
                        }
                        else {
                            this.lbName.color = "#ff0000";
                            uiFlag.img_di_0.skin = uiFlag.img_di_1.skin = "shenmidaoyu/difangzuobiaodian.png";
                            uiFlag.img_flag.skin = "shenmidaoyu/difang.png";
                            uiFlag.ani1.gotoAndStop(0);
                            uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                            uiFlag.ani2.gotoAndStop(0);
                        }
                    }
                    else {
                        this.ImgForeBg.visible = this.lbName.visible = uiFlag.visible = false;
                        uiFlag.ani1.gotoAndStop(0);
                        uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                        uiFlag.ani2.gotoAndStop(0);
                    }
                }
                else {
                    this.lbName.visible = this.lbTbName.visible = uiFlag.visible = false;
                    uiFlag.ani1.gotoAndStop(0);
                    uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                    uiFlag.ani2.gotoAndStop(0);
                    this.ImgForeBg.visible = this.icon.visible = false;
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.off(Laya.Event.CLICK, this, this.onClick);
                uiFlag.ani1.gotoAndStop(0);
                uiFlag.imgGuang.visible = uiFlag.imgShifu.visible = false;
                uiFlag.ani2.gotoAndStop(0);
            }
        };
        OreSpotIR.prototype.onClick = function () {
            if (!this.dataSource.tbOre)
                return;
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.OPEN_ORE_INFO, this.dataSource));
        };
        return OreSpotIR;
    }(ui.island.itemrender.OreSpotItemRenderUI));
    game.OreSpotIR = OreSpotIR;
})(game || (game = {}));
