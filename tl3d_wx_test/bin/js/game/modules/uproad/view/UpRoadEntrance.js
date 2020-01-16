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
    var UpRoadEntrance = /** @class */ (function (_super) {
        __extends(UpRoadEntrance, _super);
        function UpRoadEntrance() {
            var _this = _super.call(this) || this;
            _this._maxLv = 0;
            _this.imgIcon.skin = "";
            _this.pro_value.value = 0;
            _this.lab_pro.text = "";
            return _this;
        }
        UpRoadEntrance.prototype.show = function () {
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
            this.on(Laya.Event.CLICK, this, this.onclick);
            this.ui_red.setRedPointName("uproad_red");
            this._curURLv = App.hero.tasks.advanceLevel;
            this._maxLv = tb.TB_advance_road.getMaxLevel();
            var idx = this._curURLv >= this._maxLv ? this._maxLv : this._curURLv + 1;
            this._curAdvanceRoadT = tb.TB_advance_road.getSet(idx);
            this.updateLevel();
        };
        UpRoadEntrance.prototype.onConditionChange = function () {
            this.updateProgress();
        };
        UpRoadEntrance.prototype.onUpRoadChange = function () {
            var newLv = App.hero.tasks.advanceLevel;
            if (newLv != this._curURLv) {
                this._curURLv = newLv;
                var idx = this._curURLv >= this._maxLv ? this._maxLv : this._curURLv + 1;
                this._curAdvanceRoadT = tb.TB_advance_road.getSet(idx);
                this.updateLevel();
            }
        };
        UpRoadEntrance.prototype.updateLevel = function () {
            if (!this._curAdvanceRoadT)
                return;
            this.imgIcon.skin = LanMgr.getLan("zhaohuanshi/{0}.png", -1, this._curAdvanceRoadT.ID);
            this.updateProgress();
        };
        UpRoadEntrance.prototype.updateProgress = function () {
            if (!this._curAdvanceRoadT)
                return;
            var hasNum = this.getCompleteNum();
            var needNum = this._curAdvanceRoadT.condition.length;
            this.lab_pro.text = LanMgr.getLan("{0}/{1}", -1, hasNum, needNum);
            this.pro_value.value = hasNum / needNum;
        };
        UpRoadEntrance.prototype.getCompleteNum = function () {
            if (!this._curAdvanceRoadT)
                return 0;
            var num = 0;
            var advanceInfos = App.hero.tasks.advanceInfos;
            for (var i = 0; i < this._curAdvanceRoadT.condition.length; i++) {
                var id = this._curAdvanceRoadT.condition[i];
                if (advanceInfos[id] && advanceInfos[id].reward && advanceInfos[id].reward > 0) {
                    num++;
                }
            }
            return num;
        };
        UpRoadEntrance.prototype.onclick = function () {
            UIMgr.showUI(UIConst.UpRoadView);
        };
        UpRoadEntrance.prototype.close = function () {
            tl3d.ModuleEventManager.removeEvent(game.UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
            tl3d.ModuleEventManager.removeEvent(game.UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
            this.off(Laya.Event.CLICK, this, this.onclick);
            this.ui_red.onDispose();
            this._curAdvanceRoadT = null;
            this.imgIcon.skin = "";
            this.pro_value.value = 0;
            this.lab_pro.text = "";
        };
        UpRoadEntrance.prototype.destroy = function (destroyChild) {
            if (destroyChild === void 0) { destroyChild = true; }
            _super.prototype.destroy.call(this, destroyChild);
        };
        return UpRoadEntrance;
    }(ui.uproad.UpRoadEntranceUI));
    game.UpRoadEntrance = UpRoadEntrance;
})(game || (game = {}));
