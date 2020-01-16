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
    var RefineView = /** @class */ (function (_super) {
        __extends(RefineView, _super);
        function RefineView() {
            var _this = _super.call(this) || this;
            /**限制信息 */
            _this.tbEquipSet = tb.TB_equip_set.get_TB_equip_setById(1);
            _this._isSchedule = false;
            _this.isModelClose = true;
            _this.btn_refine.on(Laya.Event.CLICK, _this, _this.refine);
            _this.btn_next.on(Laya.Event.CLICK, _this, _this.switch, [1]);
            _this.btn_last.on(Laya.Event.CLICK, _this, _this.switch, [-1]);
            _this.btn_red.on(Laya.Event.CLICK, _this, _this.redlevel, [1]);
            _this.btn_add.on(Laya.Event.CLICK, _this, _this.addlevel, [1]);
            _this.btn_red10.on(Laya.Event.CLICK, _this, _this.redlevel, [10]);
            _this.btn_add10.on(Laya.Event.CLICK, _this, _this.addlevel, [10]);
            return _this;
        }
        RefineView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView(this.dataSource);
        };
        RefineView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView(this.dataSource);
        };
        RefineView.prototype.initView = function (data) {
            this.dataSource = data;
            this.initHeroCostAry();
            this.ui_itemBox.dataSource = data;
            this.btn_last.disabled = data.slot == 1;
            this.btn_next.disabled = data.slot == 4;
            this._perCurExp = data.getcurRefineExp();
            var level = data.getRefineLevel();
            this.lab_nowLevel.changeText(level.toString());
            this.lab_nextLevel.changeText((level + 1).toString());
            this.list_nowAtrri.dataSource = data.getAttributeByValue(0, 0);
            this.lab_xiajie.visible = data.refineLv < this.tbEquipSet.refine_maxlevel;
            var model = game.EquipModel.getInstance();
            this.btn_last.visible = model.showEquipByView != EquipType.BAG_VIEW;
            this.btn_next.visible = model.showEquipByView != EquipType.BAG_VIEW;
            this.bgPanel.dataSource = { uiName: UIConst.Equip_Refine, closeOnSide: this.isModelClose };
            if (data.refineLv < this.tbEquipSet.refine_maxlevel)
                this.list_nextAtrri.array = data.getAttributeByValue(0, 1);
            else
                this.list_nextAtrri.array = [];
        };
        /**玩家拥有材料数量 */
        RefineView.prototype.initHeroCostAry = function () {
            var info = this.dataSource;
            var godVo = App.hero.getGodVoById(info.godId);
            // let maxLv = godVo ? tb.TB_equip_set.getRefineLimit(godVo.degree) : this.tbEquipSet.refine_maxlevel;
            var maxLv = this.tbEquipSet.refine_maxlevel;
            this.btn_red.disabled = info.refineLv == maxLv;
            this.btn_add.disabled = info.refineLv == maxLv;
            this.lab_maxLv.text = info.refineLv == this.tbEquipSet.refine_maxlevel ? LanMgr.getLan("", 12589) : LanMgr.getLan("", 12590);
            this.lab_maxLv.visible = info.refineLv == maxLv;
            this.img_right.visible = info.refineLv != maxLv;
            this.btn_red10.disabled = info.refineLv == maxLv;
            this.btn_add10.disabled = info.refineLv == maxLv;
            this.lab_nextLevel.visible = info.refineLv != maxLv;
            if (info.refineLv == maxLv) {
                this.input_level.text = "0";
                this.lab_nextLevel.text = "";
                this.costList.array = [];
                return;
            }
            this.computeRefineCost();
        };
        /**消耗所有精炼石后的最高等级 */
        RefineView.prototype.computeRefineCost = function () {
            var data = this.dataSource;
            this._maxRefineLevel = data.getCanRefineNum();
            this.upGradeNeedCost(1);
        };
        /**升到n级需要消耗的精炼石 */
        RefineView.prototype.upGradeNeedCost = function (addLv) {
            var info = this.dataSource;
            var godVo = App.hero.getGodVoById(info.godId);
            // let maxLv = godVo ? tb.TB_equip_set.getRefineLimit(godVo.degree) : this.tbEquipSet.refine_maxlevel;
            var maxLv = this.tbEquipSet.refine_maxlevel;
            addLv = Math.max(1, addLv); // 最少升1级
            addLv = Math.min((maxLv - info.refineLv), addLv); // 最大升到上限
            this.input_level.text = addLv.toString();
            this.lab_nextLevel.text = info.refineLv + addLv + "";
            this.list_nextAtrri.array = info.getAttributeByValue(0, addLv);
            var needCost = map2ary(info.getRefineCost(addLv));
            this.costList.array = CostVo.createCostVos(needCost);
            this.btn_add.disabled = addLv + info.refineLv >= maxLv;
            this.btn_red.disabled = addLv <= 1;
            this.btn_red10.disabled = this.btn_red.disabled;
            this.btn_add10.disabled = this.btn_add.disabled;
        };
        /**切换装备 */
        RefineView.prototype.switch = function (type) {
            var obj = { equip: this.dataSource, type: type };
            dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.SWITCH]);
        };
        /** 减 */
        RefineView.prototype.redlevel = function (num) {
            var addLv = Number(this.input_level.text) - num;
            this.upGradeNeedCost(addLv);
        };
        /** 加 */
        RefineView.prototype.addlevel = function (num) {
            if (this._maxRefineLevel == 0) {
                showToast(LanMgr.getLan("", 10287));
                return;
            }
            var addLv = Number(this.input_level.text) + num;
            this.upGradeNeedCost(addLv);
        };
        /**精炼 */
        RefineView.prototype.refine = function () {
            var info = this.dataSource;
            var obj = { uuid: info.uuid, refNum: Number(this.input_level.text), type: 1 };
            dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.REFINE]);
        };
        RefineView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.list_nowAtrri.array = null;
            this.list_nextAtrri.array = null;
        };
        return RefineView;
    }(ui.equip.EquipRefineUI));
    game.RefineView = RefineView;
})(game || (game = {}));
