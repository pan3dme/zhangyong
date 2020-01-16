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
    var TujianProcessor = /** @class */ (function (_super) {
        __extends(TujianProcessor, _super);
        function TujianProcessor() {
            return _super.call(this) || this;
        }
        TujianProcessor.prototype.getName = function () {
            return "TujianProcessor";
        };
        TujianProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TujianEvent(game.TujianEvent.SHOW_TUJIAN_PANEL),
                new game.TujianEvent(game.TujianEvent.SHOW_XIANGXI_PANEL),
                new game.TujianEvent(game.TujianEvent.SHOW_EVALUATION_PANEL),
                new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL),
                new game.TujianEvent(game.TujianEvent.UPDATE_EVALUATION),
                new game.TujianEvent(game.TujianEvent.SHOW_EVALUATIONINPUT_PANEL),
                new game.TujianEvent(game.TujianEvent.SHOW_PINGLUNGOD_PANEL),
                new game.TujianEvent(game.TujianEvent.DIANZAN),
            ];
        };
        //处理事件
        TujianProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.TujianEvent) {
                switch ($event.type) {
                    case game.TujianEvent.SHOW_TUJIAN_PANEL:
                        this.showTujianPanel();
                        break;
                    case game.TujianEvent.SHOW_XIANGXI_PANEL:
                        this.showXiangxiPanel($event.data);
                        break;
                    case game.TujianEvent.SHOW_EVALUATION_PANEL:
                        this.getGodevaluations($event.data);
                        break;
                    case game.TujianEvent.SHOW_EVALUATIONINPUT_PANEL:
                        this.showInput($event.data);
                        break;
                    case game.TujianEvent.SHOW_GUAIWUXINXI_PANEL:
                        this.showTujianView($event.data);
                        break;
                    case game.TujianEvent.UPDATE_EVALUATION:
                        this.updatePingjia($event.data);
                        break;
                    case game.TujianEvent.SHOW_PINGLUNGOD_PANEL:
                        this.showPinglunPanel($event.data);
                        break;
                    case game.TujianEvent.DIANZAN:
                        this.dianzan($event.data);
                        break;
                }
            }
        };
        /** 打开图鉴界面 */
        TujianProcessor.prototype.showTujianPanel = function () {
            UIMgr.showUI(UIConst.TujianView);
            var args = {};
            args[Protocol.game_common_openUI.args.type] = iface.tb_prop.uiTypeKey.album;
            PLC.request(Protocol.game_common_openUI, args, function ($data, msg) {
                if (!$data)
                    return;
            });
        };
        /**切换到英雄详细界面
         * @param $data 当前英雄排序数组索引
         */
        TujianProcessor.prototype.showXiangxiPanel = function (ary) {
            var index = ary[0];
            var godList = ary[1];
            game.TujianModel.getInstance().index = index;
            UIMgr.showUI(UIConst.TujianHeroView, [index, godList]);
        };
        /**进入评价界面 */
        TujianProcessor.prototype.getGodevaluations = function (god) {
            UIMgr.showUI(UIConst.Tujian_PingjiaView, god);
        };
        /** 发布评价 */
        TujianProcessor.prototype.updatePingjia = function (args) {
            PLC.request(Protocol.game_god_publishComment, args, function ($data, msg) {
                if (!$data)
                    return;
                if (UIMgr.hasStage(UIConst.Tujian_PingjiaView)) {
                    var ui_1 = UIMgr.getUIByName(UIConst.Tujian_PingjiaView);
                    ui_1.updateData($data.allComment);
                }
            });
        };
        /**
         * 输入评价
         * @param data
         */
        TujianProcessor.prototype.showInput = function (data) {
            if (App.hero.level < tb.TB_god_set.get_TB_god_set().comment_needlevel) {
                showToast(LanMgr.getLan('', 10466));
                return;
            }
            if (!game.GodUtils.isActiveGod(data.ID)) {
                showToast(LanMgr.getLan('', 10467));
                return;
            }
            UIMgr.showUI(UIConst.Tujian_PingjiaShuruView, data);
        };
        /**查看英雄/怪物信息界面 */
        TujianProcessor.prototype.showTujianView = function (eventdata) {
            UIMgr.showUI(UIConst.GuaiwuxinxiView, eventdata);
        };
        TujianProcessor.prototype.showPinglunPanel = function (info) {
            var args = {};
            args[Protocol.game_god_observeGod.args.playerId] = info.playerId;
            args[Protocol.game_god_observeGod.args.templateId] = this.pingjiaView.getCurGodId();
            PLC.request(Protocol.game_god_observeGod, args, function ($data, msg) {
                if (!$data)
                    return;
                var obsInfo = $data.observeGodInfo;
                var tab = tb.TB_god.get_TB_godById(obsInfo[0]);
                if (!tab) {
                    logerror("查看评价页面失败：", $data);
                    return;
                }
                var data = new GodItemVo(tab);
                for (var key in obsInfo[3]) {
                    data.iSeverAttri.push([Number(key), Number(obsInfo[3][key])]);
                }
                data.starLevel = obsInfo[1];
                data.level = obsInfo[2];
                data.degree = obsInfo[4];
                data.awakenLv = obsInfo[5];
                data.skinId = obsInfo[6];
                UIMgr.showUI(UIConst.GuaiwuxinxiView, data);
            });
        };
        /** 点赞 */
        TujianProcessor.prototype.dianzan = function (data) {
            var _this = this;
            var args = {};
            args[Protocol.game_god_likeComment.args.value] = data.aryStr;
            args[Protocol.game_god_likeComment.args.templateId] = this.pingjiaView.getCurGodId();
            PLC.request(Protocol.game_god_likeComment, args, function ($data, msg) {
                if (!$data)
                    return;
                data.num++;
                _this.pingjiaView.refreshList();
            });
        };
        Object.defineProperty(TujianProcessor.prototype, "xiangxiview", {
            /** 详细界面 */
            get: function () {
                return UIMgr.getUIByName(UIConst.TujianHeroView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TujianProcessor.prototype, "tbagView", {
            /** 图鉴界面 */
            get: function () {
                return UIMgr.getUIByName(UIConst.TujianView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TujianProcessor.prototype, "pingjiaView", {
            /** 评价界面 */
            get: function () {
                return UIMgr.getUIByName(UIConst.Tujian_PingjiaView);
            },
            enumerable: true,
            configurable: true
        });
        return TujianProcessor;
    }(tl3d.Processor));
    game.TujianProcessor = TujianProcessor;
})(game || (game = {}));
