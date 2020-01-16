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
    * FenjieProcessor
    */
    var FenjieProcessor = /** @class */ (function (_super) {
        __extends(FenjieProcessor, _super);
        function FenjieProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.FenjieModel.getInstance();
            return _this;
        }
        FenjieProcessor.prototype.getName = function () {
            return "FenjieProcessor";
        };
        //监听事件
        FenjieProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW),
                new game.FenjieEvent(game.FenjieEvent.CLICK_BTN_FENJIE),
                new game.GodEvent(game.GodEvent.GOD_CHANGE),
            ];
        };
        //处理事件
        FenjieProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.FenjieEvent) {
                switch (event.type) {
                    case game.FenjieEvent.SHOW_FENJIE_VIEW:
                        this.showFenjie();
                        break;
                    case game.FenjieEvent.CLICK_BTN_FENJIE:
                        this.fenjie(event.data);
                        break;
                }
            }
            else if (event instanceof game.GodEvent) {
                switch (event.type) {
                    case game.GodEvent.GOD_CHANGE:
                        if (this.fenjieview) {
                            this.refrshFenjieView();
                        }
                        break;
                }
            }
        };
        /** 打开分解界面 */
        FenjieProcessor.prototype.showFenjie = function () {
            UIMgr.showUI(UIConst.FenjieView);
        };
        /** 点击分解 */
        FenjieProcessor.prototype.fenjie = function (gods) {
            var _this = this;
            if (!gods || gods.length == 0)
                return;
            //遍历数组查看是否有超过4星的神灵
            var haveFour = false;
            for (var i = 0; i < gods.length; i++) {
                if (gods[i].starLevel >= 4) {
                    haveFour = true;
                    break;
                }
            }
            //如果有4星
            if (haveFour) {
                var alertStr = LanMgr.getLan("", 10500);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: function () {
                        //协议方法
                        _this.sendFenjie(gods);
                    }
                });
            }
            else {
                //协议方法
                this.sendFenjie(gods);
            }
        };
        /** 分解的协议 */
        FenjieProcessor.prototype.sendFenjie = function (gods) {
            var _this = this;
            if (!gods || gods.length == 0)
                return;
            var IdAry = new Array;
            for (var i = 0; i < gods.length; i++) {
                IdAry.push(gods[i].uuid);
            }
            var args = {};
            args[Protocol.game_god_resolve.args.rsvIds] = IdAry;
            PLC.request(Protocol.game_god_resolve, args, function ($data, $msg) {
                if (!$data)
                    return;
                _this.refrshFenjieView();
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    var uiPanel = UIMgr.getUIByName(UIConst.God_MainView);
                    uiPanel.onOpened();
                }
                // 返还装备？
                if ($data.commonData['modifyEquips']) {
                    $data.commonData['returnEquip'] = {};
                    var equips = $data.commonData['modifyEquips'];
                    for (var key in equips) {
                        var equip = App.hero.getEquipByuuid(key);
                        equip.type = 2;
                        $data.commonData['returnEquip'][key] = equip;
                    }
                }
                UIUtil.showRewardView($data.commonData);
            });
        };
        /** 刷新分解界面 */
        FenjieProcessor.prototype.refrshFenjieView = function () {
            var view = this.fenjieview;
            view.refreshView();
            view.clearSelect();
            view.showHaveGod();
            view.refreshItemList();
        };
        Object.defineProperty(FenjieProcessor.prototype, "fenjieview", {
            /** 获得分解View */
            get: function () {
                return UIMgr.getUIByName(UIConst.FenjieView);
            },
            enumerable: true,
            configurable: true
        });
        return FenjieProcessor;
    }(tl3d.Processor));
    game.FenjieProcessor = FenjieProcessor;
})(game || (game = {}));
