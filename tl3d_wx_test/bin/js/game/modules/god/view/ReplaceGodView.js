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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
* name
*/
var game;
(function (game) {
    var ReplaceGodView = /** @class */ (function (_super) {
        __extends(ReplaceGodView, _super);
        function ReplaceGodView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        ReplaceGodView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12338) };
            this.raceList.selectHandler = new Handler(this, this.onRaceSelect);
            this.raceList.selectedIndex = -1;
            this._godAry = [];
        };
        ReplaceGodView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        ReplaceGodView.prototype.getPos = function () {
            return this._pos;
        };
        ReplaceGodView.prototype.getGodVo = function () {
            return this._godVo;
        };
        ReplaceGodView.prototype.initView = function () {
            var dataAry = this.dataSource;
            this._godVo = dataAry[0];
            this._pos = dataAry[1];
            var gods = __spreadArrays(App.hero.getGodArr());
            gods = gods.filter(function (vo) {
                return !vo.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            });
            gods.forEach(function (vo) {
                // 星级-》等级-》稀有度-》阵营
                vo.sortNum = -vo.starLevel * 100000 - vo.level * 100 - vo.tab_god.quality * 10 + vo.tab_god.race_type;
            });
            this._godAry = gods.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            this.raceList.array = [0, 1, 2, 3, 4, 5];
            this.raceList.selectedIndex = 0;
        };
        /** 种族选择 */
        ReplaceGodView.prototype.onRaceSelect = function (index) {
            if (index == -1)
                return;
            var ary = index == 0 ? this._godAry : this._godAry.filter(function (vo) {
                return vo.getRaceType() == index;
            });
            this.godList.array = ary;
            this.boxEmpty.visible = ary.length == 0;
        };
        ReplaceGodView.prototype.getIRByid = function (tbid) {
            var cells = this.godList.cells;
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if (cell.dataSource && cell.dataSource.templateId == tbid) {
                    return cell;
                }
            }
            return cells[0];
        };
        ReplaceGodView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.godList.array = null;
            this.raceList.array = null;
            this.raceList.selectedIndex = -1;
            this._godAry.length = 0;
        };
        return ReplaceGodView;
    }(ui.god.ReplaceGodUI));
    game.ReplaceGodView = ReplaceGodView;
})(game || (game = {}));
