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
    var PingjiaInfo = /** @class */ (function () {
        function PingjiaInfo(dataAry) {
            this.aryStr = dataAry[0];
            var data = JSON.parse(dataAry[0]);
            this.time = data[0];
            this.playerId = data[1];
            this.name = data[2];
            this.click = data[3];
            this.content = data[4];
            this.num = Number(dataAry[1]);
        }
        return PingjiaInfo;
    }());
    game.PingjiaInfo = PingjiaInfo;
    var PingjiaView = /** @class */ (function (_super) {
        __extends(PingjiaView, _super);
        function PingjiaView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this._evaluate = new common.Accordion(580, 560);
            _this.btn_Add.on(Laya.Event.CLICK, _this, _this.onAdd);
            _this._evaluate.itemRender = game.PingjiaIR;
            _this.addChild(_this._evaluate);
            _this._evaluate.spaceY = 10;
            _this._evaluate.x = 52;
            _this._evaluate.y = 360;
            _this._evaluate.isAutoScroll = false;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12118) };
            return _this;
        }
        PingjiaView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
        };
        PingjiaView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        PingjiaView.prototype.initView = function () {
            var _this = this;
            var tbGod = this.dataSource;
            var args = {};
            args[Protocol.game_god_getComment.args.templateId] = tbGod.ID;
            PLC.request(Protocol.game_god_getComment, args, function ($data, msg) {
                if (!$data)
                    return;
                _this.updateData($data.allComment);
            });
            this.lab_desc.text = "        " + tbGod.desc;
            this.lbl_name.text = tbGod.name;
        };
        /** 更新数据 */
        PingjiaView.prototype.updateData = function (allComment) {
            var curScroll = this._evaluate.scrollBar.value;
            allComment = allComment || [];
            var list = [];
            for (var i in allComment) {
                var vo = new PingjiaInfo(allComment[i]);
                list.push(vo);
            }
            list.sort(function (a, b) {
                return a.time - b.time;
            });
            this._evaluate.dataSource = list;
            for (var i = 0, len = this._evaluate.cells.length; i < len; i++) {
                var box = this._evaluate.cells[i];
                box.refresh();
            }
        };
        /** 刷新列表 */
        PingjiaView.prototype.refreshList = function () {
            for (var i = 0, len = this._evaluate.cells.length; i < len; i++) {
                var box = this._evaluate.cells[i];
                box.refresh();
            }
        };
        PingjiaView.prototype.getCurGodId = function () {
            return this.dataSource.ID;
        };
        /**添加评价 */
        PingjiaView.prototype.onAdd = function () {
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_EVALUATIONINPUT_PANEL), this.dataSource);
        };
        return PingjiaView;
    }(ui.tujian.PingjiaUI));
    game.PingjiaView = PingjiaView;
})(game || (game = {}));
