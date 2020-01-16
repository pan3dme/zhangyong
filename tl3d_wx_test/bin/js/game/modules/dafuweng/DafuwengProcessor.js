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
    * DafuwengProcessor
    */
    var DafuwengProcessor = /** @class */ (function (_super) {
        __extends(DafuwengProcessor, _super);
        function DafuwengProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            return _this;
        }
        DafuwengProcessor.prototype.getName = function () {
            return "DafuwengProcessor";
        };
        //监听事件
        DafuwengProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.DafuwengEvent(game.DafuwengEvent.SHOW_QIYU_VIEW),
                new game.DafuwengEvent(game.DafuwengEvent.DEL_QIYU_TAB),
                new game.DafuwengEvent(game.DafuwengEvent.CLICK_CAIDAXIAO),
            ];
        };
        //处理事件
        DafuwengProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.DafuwengEvent) {
                switch (event.type) {
                    case game.DafuwengEvent.SHOW_QIYU_VIEW:
                        this.showQiyuView();
                        break;
                    case game.DafuwengEvent.DEL_QIYU_TAB:
                        this.delQiyuTab(event.data);
                        break;
                    case game.DafuwengEvent.CLICK_CAIDAXIAO:
                        this.clickCaidaxiao(event.data);
                        break;
                }
            }
        };
        DafuwengProcessor.prototype.showQiyuView = function () {
            if (game.DafuwengModel.getInstance().getRiskList(false).length == 0) {
                showToast(LanMgr.getLan("", 10281));
                return;
            }
            UIMgr.showUI(UIConst.DFW_QiyuView);
        };
        /** 删除标签页 */
        DafuwengProcessor.prototype.delQiyuTab = function (key) {
            if (UIMgr.hasStage(UIConst.DFW_QiyuView)) {
                var view = UIMgr.getUIByName(UIConst.DFW_QiyuView);
                view.delTab(key);
            }
        };
        DafuwengProcessor.prototype.clickCaidaxiao = function (data) {
            if (UIMgr.hasStage(UIConst.DFW_QiyuView)) {
                var view = UIMgr.getUIByName(UIConst.DFW_QiyuView);
                view.caiDaXiaoResult(data);
            }
        };
        return DafuwengProcessor;
    }(tl3d.Processor));
    game.DafuwengProcessor = DafuwengProcessor;
})(game || (game = {}));
