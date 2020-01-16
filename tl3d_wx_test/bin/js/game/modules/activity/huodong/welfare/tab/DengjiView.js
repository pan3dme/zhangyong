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
    var DengjiView = /** @class */ (function (_super) {
        __extends(DengjiView, _super);
        function DengjiView() {
            var _this = _super.call(this) || this;
            _this.listRender();
            return _this;
        }
        DengjiView.prototype.onAdd = function () {
            this.listRender();
        };
        DengjiView.prototype.onExit = function () {
            this.close();
        };
        DengjiView.prototype.listRender = function () {
            //对等级奖励进行排序，可领取 > 未到达 > 已领取
            var arr = tb.TB_level.get_TB_level();
            arr.sort(function (a, b) {
                //------------------------------------------------------已领取------------------------------------未到达-----------可领取
                var aSortNum = a.ID in App.hero.welfare.levelGiftPack ? a.ID + 1000 : App.hero.level < a.level ? a.ID + 100 : a.ID + 10;
                var bSortNum = b.ID in App.hero.welfare.levelGiftPack ? b.ID + 1000 : App.hero.level < b.level ? b.ID + 100 : b.ID + 10;
                if (aSortNum > bSortNum) {
                    return 1;
                }
                else if (aSortNum < bSortNum) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            this.list_jiangli.dataSource = arr;
        };
        return DengjiView;
    }(ui.activity.huodong.welfare.tab.DengjiUI));
    game.DengjiView = DengjiView;
})(game || (game = {}));
