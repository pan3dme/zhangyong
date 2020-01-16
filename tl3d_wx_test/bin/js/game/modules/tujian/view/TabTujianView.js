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
    var TabTujianView = /** @class */ (function (_super) {
        __extends(TabTujianView, _super);
        function TabTujianView() {
            return _super.call(this) || this;
        }
        TabTujianView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.list_tujian.mouseHandler = new Handler(this, this.onMouse);
            this.list_race.selectHandler = new Handler(this, this.onSelect);
            this.list_race.array = [0, 1, 2, 3, 4, 5];
            this.list_race.selectedIndex = -1;
        };
        TabTujianView.prototype.close = function () {
            Laya.timer.clearAll(this);
            this._allTuJianGodTemps = null;
            this.list_tujian.array = null;
            this.list_race.selectedIndex = -1;
        };
        TabTujianView.prototype.initView = function () {
            if (!this._allTuJianGodTemps || this._allTuJianGodTemps.length == 0) {
                var alldata = game.TujianModel.getInstance().getTuJianGodTArr();
                //过滤下
                this._allTuJianGodTemps = alldata.filter(function (vo) {
                    return vo.starLv == vo.godTemp.star[0] || vo.starLv == vo.godTemp.star[1] || vo.starLv == 5 || vo.starLv == 6;
                });
            }
            this.list_race.selectedIndex = 0;
        };
        /** 种族选择 */
        TabTujianView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            var arrGodTemp = [];
            arrGodTemp = this._allTuJianGodTemps.filter(function (vo) {
                return index == 0 || vo.godTemp.race_type == index;
            });
            this.list_tujian.array = arrGodTemp;
            this.lbType.text = LanMgr.GOD_RACE_NAME[index];
        };
        //打开详细界面
        TabTujianView.prototype.onMouse = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_XIANGXI_PANEL), [index, this.list_tujian.array]);
            }
        };
        return TabTujianView;
    }(ui.tujian.TabTujianUI));
    game.TabTujianView = TabTujianView;
})(game || (game = {}));
