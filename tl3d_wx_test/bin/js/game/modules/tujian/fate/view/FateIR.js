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
    var FateIR = /** @class */ (function (_super) {
        __extends(FateIR, _super);
        function FateIR() {
            var _this = _super.call(this) || this;
            _this.list_god.renderHandler = new Handler(_this, _this.onRender);
            _this.btn_lightup.on(Laya.Event.CLICK, _this, _this.onLightUp);
            _this.ani_item.on(Laya.UIEvent.COMPLETE, _this, _this.onAniComplete);
            _this.ani_item2.on(Laya.UIEvent.COMPLETE, _this, _this.onAniComplete);
            _this.ani_item.visible = _this.ani_item2.visible = false;
            _this.ani_item.stop();
            _this.ani_item2.stop();
            return _this;
        }
        Object.defineProperty(FateIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        FateIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                //神灵list
                this.list_god.array = info.listItem;
                this._totalnum = info.listItem.length;
                //属性增加
                if (info.tbGodFate.attr.length == 1) {
                    this.lb_desc.text = LanMgr.getLan('{0} ( {1} + {2} )', -1, info.tbGodFate.name, info.getAttrByIndex(0)[0], info.getAttrByIndex(0)[1]);
                }
                else if (info.tbGodFate.attr.length == 2) {
                    this.lb_desc.text = LanMgr.getLan('{0} ( {1} + {2} , {3} + {4} )', -1, info.tbGodFate.name, info.getAttrByIndex(0)[0], info.getAttrByIndex(0)[1], info.getAttrByIndex(1)[0], info.getAttrByIndex(1)[1]);
                }
                else if (info.tbGodFate.attr.length == 3) {
                    this.lb_desc.text = LanMgr.getLan('{0} ( {1} + {2} , {3} + {4} , {5} + {6} )', -1, info.tbGodFate.name, info.getAttrByIndex(0)[0], info.getAttrByIndex(0)[1], info.getAttrByIndex(1)[0], info.getAttrByIndex(1)[1], info.getAttrByIndex(2)[0], info.getAttrByIndex(2)[1]);
                }
                this.refreshData();
            }
            else {
                this.ani_item.visible = this.ani_item2.visible = false;
                this.ani_item.stop();
                this.ani_item2.stop();
                clearTimeout(this._efftag);
            }
        };
        FateIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (!info)
                return;
            /** 是否激活羁绊 */
            if (info.isActiviteComplete()) {
                this.img_success.visible = true;
                this.lb_success.visible = true;
                this.lb_desc.color = ColorConst.FATE_GREEN;
                if (this.redPoint) {
                    this.redPoint.onDispose();
                }
            }
            else {
                this.img_success.visible = false;
                this.lb_success.visible = false;
                this.lb_desc.color = ColorConst.FATE_GOLD;
                if (this.redPoint) {
                    var strKey = 'fate_' + info.tbGodFate.ID;
                    this.redPoint.setRedPointName(strKey);
                }
            }
            this.btn_lightup.visible = !info.isActiviteComplete() && info.isActivite();
        };
        FateIR.prototype.playEff = function () {
            var _this = this;
            if (this._effnum >= this._totalnum) {
                return;
            }
            var fanpaiui = this.ani_item;
            if (this._effnum % 2 == 1) {
                fanpaiui = this.ani_item2;
            }
            if (fanpaiui.visible && fanpaiui.isPlaying) {
                this.onAniComplete();
            }
            fanpaiui.visible = true;
            var cell = this.list_god.getCell(this._effnum);
            fanpaiui.x = this.list_god.x + cell.x + 45;
            fanpaiui.y = this.list_god.y + cell.y + 45;
            this._effnum++;
            fanpaiui.play(0, false);
            clearTimeout(this._efftag);
            this._efftag = setTimeout(function () {
                _this.playEff();
            }, 150);
        };
        FateIR.prototype.onAniComplete = function () {
            var cell = this.list_god.getCell(this._effidx);
            if (cell) {
                cell.visible = true;
                this._effidx++;
            }
        };
        FateIR.prototype.onRender = function (cell, index) {
            cell.gray = !this.dataSource.isOwned(this.dataSource.listItem[index].templateId);
        };
        FateIR.prototype.onLightUp = function () {
            var _this = this;
            var info = this.dataSource;
            if (!info)
                return;
            //激活
            var args = {};
            args[Protocol.game_god_godFate.args.id] = info.tbGodFate.ID;
            PLC.request(Protocol.game_god_godFate, args, function ($data, msg) {
                if (!$data)
                    return;
                _this.refreshData();
                _this.list_god.cells.forEach(function (cell) {
                    cell.visible = false;
                });
                _this._effnum = 0;
                _this._effidx = 0;
                _this.playEff();
                dispatchEvt(new game.TujianEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC));
            });
        };
        return FateIR;
    }(ui.tujian.render.FateIRUI));
    game.FateIR = FateIR;
})(game || (game = {}));
