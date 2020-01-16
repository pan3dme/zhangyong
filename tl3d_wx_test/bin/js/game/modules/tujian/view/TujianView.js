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
    var TujianView = /** @class */ (function (_super) {
        __extends(TujianView, _super);
        function TujianView() {
            return _super.call(this) || this;
        }
        TujianView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.TujianView, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12117) };
            this.tab.selectHandler = new Handler(this, this.onTab);
            this.tab.selectedIndex = -1;
            this.list_tujian.mouseHandler = new Handler(this, this.onMouse);
            this.list_race.selectHandler = new Handler(this, this.onSelect);
            this.list_race.array = [0, 1, 2, 3, 4, 5];
            this.list_race.selectedIndex = -1;
        };
        TujianView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TujianView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TujianView.prototype.close = function (type, showEffect, sound) {
            if (sound === void 0) { sound = true; }
            _super.prototype.close.call(this);
            this.tab.selectedIndex = -1;
            this.list_tujian.array = null;
            this.list_race.selectedIndex = -1;
            this.tuijianView.onExit();
            this.ui_tujian.onExit();
            this._allTuJianGodTemps = null;
        };
        TujianView.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this);
        };
        TujianView.prototype.initView = function () {
            if (!this._allTuJianGodTemps || this._allTuJianGodTemps.length == 0) {
                var alldata = game.TujianModel.getInstance().getTuJianGodTArr();
                //过滤下
                this._allTuJianGodTemps = alldata.filter(function (vo) {
                    return vo.starLv == vo.godTemp.star[0] || vo.starLv == vo.godTemp.star[1] || vo.starLv == 5 || vo.starLv == 6;
                });
            }
            this.tab.selectedIndex = 0;
        };
        TujianView.prototype.onTab = function (index) {
            if (index == -1)
                return;
            this.viewstack.selectedIndex = index;
            if (index == 0) {
                this.tuijianView.onExit();
                this.ui_tujian.onExit();
                this.list_race.selectedIndex = this.list_race.selectedIndex == -1 ? 0 : this.list_race.selectedIndex;
            }
            else if (index == 1) {
                this.ui_tujian.onExit();
                this.tuijianView.onShow();
            }
            else if (index == 2) {
                this.tuijianView.onExit();
                game.FateModel.getInstance().initFateList();
                this.ui_tujian.onShow();
            }
            this.imgBg.visible = index != 0;
        };
        /** 种族选择 */
        TujianView.prototype.onSelect = function (index) {
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
        TujianView.prototype.onMouse = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_XIANGXI_PANEL), [index, this.list_tujian.array]);
            }
        };
        return TujianView;
    }(ui.tujian.TujianViewUI));
    game.TujianView = TujianView;
})(game || (game = {}));
