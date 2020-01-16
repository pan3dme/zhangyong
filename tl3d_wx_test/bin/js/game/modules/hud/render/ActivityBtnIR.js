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
/**
* name
*/
var game;
(function (game) {
    var Event = Laya.Event;
    var ActivityBtnIR = /** @class */ (function (_super) {
        __extends(ActivityBtnIR, _super);
        function ActivityBtnIR(vo) {
            var _this = _super.call(this) || this;
            _this.dataSource = vo;
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_ONLINEREWARD, _this.updateState, _this);
            _this.name = vo.sysOpenId + "";
            _this.on(Event.CLICK, _this, function () {
                game.HudModel.ActivityBtnEvent(vo.sysOpenId);
            });
            return _this;
        }
        Object.defineProperty(ActivityBtnIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                if (v)
                    this.init();
            },
            enumerable: true,
            configurable: true
        });
        ActivityBtnIR.prototype.updateState = function () {
            if (this.dataSource && this.dataSource.sysOpenId == iface.tb_prop.sysOpenTypeKey.onlineAward) {
                this.loopOnline();
            }
        };
        ActivityBtnIR.prototype.init = function () {
            var vo = this.dataSource;
            var sysId = vo.sysOpenId;
            this.redPoint.setRedPointName(vo.redpointName);
            this.btn.skin = SkinUtil.getTabBtnSkin(vo.tabHud.icon);
            game.HudModel.getInstance().isPlayEffect(sysId) ? this.ani.play() : this.ani.destroy();
            if (sysId == iface.tb_prop.sysOpenTypeKey.onlineAward) {
                if (!this._img_time) {
                    this._img_time = new Laya.Image("comp/bg/pic_shenlizhi.png");
                    this._img_time.x = -3;
                    this._img_time.y = 94;
                    this._img_time.width = 100;
                    this._img_time.height = 25;
                    this.btn.addChild(this._img_time);
                }
                if (!this._lab_time) {
                    this._lab_time = new Laya.Label();
                    this._lab_time.color = "#fff0a0";
                    this._lab_time.fontSize = 19;
                    this._lab_time.stroke = 2;
                    this._lab_time.strokeColor = "#000000";
                    this._lab_time.anchorX = 0.5;
                    this._lab_time.x = 47;
                    this._lab_time.y = 98;
                    this.btn.addChild(this._lab_time);
                }
                this.loopOnline();
            }
            else {
                if (this._img_time) {
                    this._img_time.removeSelf();
                    this._img_time = null;
                }
                if (this._lab_time) {
                    this._lab_time.removeSelf();
                    this._lab_time = null;
                }
            }
        };
        ActivityBtnIR.prototype.loopOnline = function () {
            if (this._lab_time) {
                var vo = game.OnlineModel.getInstance().lastItemState();
                if (vo == null || !vo.istime) {
                    //不需要计时器
                    this.clearloop(vo);
                    return;
                }
                else {
                    this.timerLoop(1000, this, this.onLoop, [vo]);
                }
                this.onLoop(vo);
            }
            else {
                this.clearTimer(this, this.onLoop);
            }
        };
        ActivityBtnIR.prototype.onLoop = function (vo) {
            if (vo.vo.canReceive()) {
                this.clearloop(vo);
            }
            else {
                if (this._lab_time) {
                    this._lab_time.text = vo.vo.onTime();
                }
                else {
                    this.clearloop(vo);
                }
            }
        };
        ActivityBtnIR.prototype.clearloop = function (vo) {
            if (this._lab_time) {
                this._lab_time.text = (vo == null || vo.vo.isReceive()) ? "已领取" : "领取";
            }
            this.clearTimer(this, this.onLoop);
        };
        //活动按钮移除
        ActivityBtnIR.prototype.removeBtn = function () {
            this.removeSelf();
            this.redPoint.removeSelf();
        };
        return ActivityBtnIR;
    }(ui.hud.render.ActivityBtnIRUI));
    game.ActivityBtnIR = ActivityBtnIR;
    var ActivityBtnVo = /** @class */ (function () {
        function ActivityBtnVo(tb) {
            this.sysOpenId = tb.system_id;
            this.tabHud = tb;
            this.redpointName = "sys" + this.sysOpenId + "_group";
            if (this.sysOpenId == 393) {
                this.redpointName = "timeActivity" + game.TimelimitModel.ACTIVITY_JIJIN_ID;
            }
        }
        /**在活动时间? */
        ActivityBtnVo.prototype.isOnActivityTime = function () {
            // return HudModel.IsOnActivatyTime(this.sysOpenId) && this.sysOpenId != iface.tb_prop.sysOpenTypeKey.firstCharge;//忽略首充按钮
            return game.HudModel.IsOnActivatyTime(this.sysOpenId);
        };
        /**更新下是否开启，是否有变化 */
        ActivityBtnVo.prototype.isHaveChange = function () {
            var isOpen = this.isOnActivityTime();
            if (this._isOpen != isOpen) {
                this._isOpen = isOpen;
                return true;
            }
            return false;
        };
        return ActivityBtnVo;
    }());
    game.ActivityBtnVo = ActivityBtnVo;
})(game || (game = {}));
