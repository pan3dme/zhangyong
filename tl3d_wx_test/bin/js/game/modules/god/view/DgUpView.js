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
    var DgUpView = /** @class */ (function (_super) {
        __extends(DgUpView, _super);
        function DgUpView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.group = UIConst.two_group;
            _this.list_nowdegree.renderHandler = new Handler(_this, _this.onRender);
            _this.list_nextdegree.renderHandler = new Handler(_this, _this.onRender);
            _this.btn_shengjie.on(Laya.Event.CLICK, _this, _this.onShengjie);
            _this.bgPanel.dataSource = { uiName: UIConst.God_DgUpView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12354) };
            _this.lab_cost.autoSize = true;
            _this.lab_have.autoSize = true;
            return _this;
        }
        DgUpView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.refreshData(this.dataSource);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.setCostText, this);
        };
        DgUpView.prototype.refreshData = function (data) {
            this.setCostText();
            var nowAttr = data.jisuanchushi(data.degree);
            var nextAttr = data.jisuanchushi(data.degree + 1);
            var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(this.dataSource.degree);
            var nextevotab = tb.TB_god_evolution.get_TB_god_evolutionById(data.degree + 1);
            var degreeNum = data.starLevel < 6 ? data.starLevel : 6;
            var nowAry = new Array;
            var nextAry = new Array;
            for (var i = 0; i < 3; i++) {
                this["lab_now" + (i + 1)].text = Math.floor(nowAttr[i][1]);
                this["lab_next" + (i + 1)].text = Math.floor(nextAttr[i][1]);
            }
            this.lab_nowlv.text = String(evotab.level);
            this.lab_nextlv.text = String(nextevotab.level);
            this.list_nowdegree.repeatX = degreeNum;
            this.list_nextdegree.repeatX = degreeNum;
            for (var i = 0; i < degreeNum; i++) {
                nowAry.push(data.degree);
                nextAry.push(data.degree + 1);
            }
            this.list_nowdegree.dataSource = nowAry;
            this.list_nextdegree.dataSource = nextAry;
        };
        DgUpView.prototype.setCostText = function () {
            var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(this.dataSource.degree);
            var cost = App.hero.bagItemsObj[evotab.cost[0][0]];
            var costWidth = this.imgCost.width + 5;
            this.lab_cost.text = cost ? Snums(cost) : "0";
            this.lab_cost.color = cost >= evotab.cost[0][1] ? ColorConst.normalFont : ColorConst.redFont;
            costWidth += this.lab_cost.width;
            this.lab_have.text = " / " + evotab.cost[0][1];
            costWidth += this.lab_have.width;
            var startX = this.width / 2 - costWidth / 2;
            this.imgCost.x = startX;
            this.lab_cost.x = this.imgCost.x + this.imgCost.width + 5;
            this.lab_have.x = this.lab_cost.x + this.lab_cost.width;
        };
        DgUpView.prototype.onRender = function (itemRender, index) {
            itemRender.gray = itemRender.dataSource - 1 < index;
        };
        DgUpView.prototype.onShengjie = function () {
            var _this = this;
            var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(this.dataSource.degree);
            var cost = App.hero.getBagItemNum(evotab.cost[0][0]);
            if (cost < evotab.cost[0][1]) {
                showToast(LanMgr.getLan("", Lans.cost, evotab.cost[0][0]));
                return;
            }
            var args = {};
            var uuid = this.dataSource.uuid;
            args[Protocol.game_god_raiseDegree.args.godId] = uuid;
            PLC.request(Protocol.game_god_raiseDegree, args, function ($data, $msg) {
                if ($msg && !$data) { //数据异常处理（这个根据每个地方实际情况处理）
                    _this.close();
                    return;
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.GOD_SHENGJIE_SUCCESS), uuid);
                for (var key in $data.targetGod)
                    dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_SHENGJIE_ATTR), uuid);
                _this.close();
            });
        };
        DgUpView.prototype.close = function () {
            _super.prototype.close.call(this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.setCostText, this);
        };
        return DgUpView;
    }(ui.god.ShengjieUI));
    game.DgUpView = DgUpView;
})(game || (game = {}));
