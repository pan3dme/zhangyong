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
    /*
    * ShenjiezhimenProcessor
    */
    var GodDoorProcessor = /** @class */ (function (_super) {
        __extends(GodDoorProcessor, _super);
        function GodDoorProcessor() {
            return _super.call(this) || this;
        }
        GodDoorProcessor.prototype.getName = function () {
            return "GodDoorProcessor";
        };
        //监听事件
        GodDoorProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GodDoorEvent(game.GodDoorEvent.OPEN_SHEN_MEN_VIEW),
                new game.GodDoorEvent(game.GodDoorEvent.OPEN_DOOR_EVENT),
                new game.GodDoorEvent(game.GodDoorEvent.TURN_GOD_EVENT),
                new game.GodDoorEvent(game.GodDoorEvent.TURN_GOD_OK),
                new common.GlobalEvent(common.GlobalEvent.DIALOG_CLOSED),
                new game.ResEvent(game.ResEvent.RESOURCE_CHANGE),
                new game.ResEvent(game.ResEvent.PROP_CHANGE),
            ];
        };
        //处理事件
        GodDoorProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.GodDoorEvent) {
                switch (event.type) {
                    case game.GodDoorEvent.OPEN_SHEN_MEN_VIEW:
                        this.openView();
                        break;
                    case game.GodDoorEvent.OPEN_DOOR_EVENT:
                        break;
                    case game.GodDoorEvent.TURN_GOD_EVENT:
                        this.turnGodEvent(event.data);
                        break;
                    case game.GodDoorEvent.TURN_GOD_OK:
                        this.turnGodOkEvent(event.data);
                        break;
                }
            }
            if (event instanceof common.GlobalEvent) {
                switch (event.type) {
                    case common.GlobalEvent.DIALOG_CLOSED:
                        var panel = event.data;
                        if (panel.name == UIConst.GuaiwuxinxiView && UIMgr.hasStage(UIConst.GodDoorView)) {
                            this.shenjiezhimen.vs_item1.addMask();
                        }
                        break;
                }
            }
            if (event instanceof game.ResEvent) {
                switch (event.type) {
                    case game.ResEvent.RESOURCE_CHANGE:
                    case game.ResEvent.PROP_CHANGE:
                        this.coinsChange();
                        break;
                }
            }
        };
        GodDoorProcessor.prototype.openView = function () {
            UIMgr.showUI(UIConst.GodDoorView);
        };
        GodDoorProcessor.prototype.turnGodOkEvent = function ($data) {
            var _this = this;
            var args = {};
            args[Protocol.game_god_doorConvertSave.args.godId] = $data.uuid;
            PLC.request(Protocol.game_god_doorConvertSave, args, function ($sdata) {
                if ($sdata && $sdata.targetGod) {
                    if (_this.shenjiezhimen) {
                        _this.shenjiezhimen.vs_item1.refreshResult($sdata.targetGod);
                    }
                }
            });
        };
        GodDoorProcessor.prototype.turnGodEvent = function ($data) {
            var _this = this;
            var tabkey = $data.tab_god.race_type * 100 + $data.starLevel * 10 + $data.tab_god.quality;
            var replacetab = tb.TB_divinity_replace.get_TB_divinity_replaceById(tabkey);
            var flag = true;
            for (var i = 0; i < replacetab.cost.length; i++) {
                if (replacetab.cost[i][0] == iface.tb_prop.resTypeKey.convertDust) {
                    if (replacetab.cost[i][1] > App.hero.convertDust) {
                        flag = false;
                        showToast(LanMgr.getLan("", 10120));
                        break;
                    }
                }
                else if (replacetab.cost[i][0] == iface.tb_prop.resTypeKey.gold) {
                    if (replacetab.cost[i][1] > App.hero.gold) {
                        flag = false;
                        showToast(LanMgr.getLan("", 10120));
                        break;
                    }
                }
                else {
                    logdebug("新增道具没加判断！");
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var args = {};
                args[Protocol.game_god_doorConvert.args.godId] = $data.uuid;
                PLC.request(Protocol.game_god_doorConvert, args, function ($sdata) {
                    if ($sdata && $sdata.convertTpltId) {
                        if (_this.shenjiezhimen) {
                            _this.shenjiezhimen.vs_item1.turnResult($sdata.convertTpltId);
                        }
                    }
                });
            }
        };
        GodDoorProcessor.prototype.coinsChange = function () {
            if (this.shenjiezhimen) {
                this.shenjiezhimen.drawMoney();
            }
        };
        Object.defineProperty(GodDoorProcessor.prototype, "shenjiezhimen", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GodDoorView);
            },
            enumerable: true,
            configurable: true
        });
        return GodDoorProcessor;
    }(tl3d.Processor));
    game.GodDoorProcessor = GodDoorProcessor;
})(game || (game = {}));
