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
    var JiangliIR = /** @class */ (function (_super) {
        __extends(JiangliIR, _super);
        function JiangliIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(JiangliIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        JiangliIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                if (info.rank[0] == info.rank[1]) {
                    this.img_first.visible = true;
                    this.lb_rank.visible = false;
                }
                else {
                    this.img_first.visible = false;
                    this.lb_rank.visible = true;
                    this.lb_rank.text = info.rank[0] + "-" + info.rank[1];
                }
                this.lb_score.text = info.score + '分';
                this.list_items.array = [new ItemVo(info.reward[0][0], info.reward[0][1])];
            }
            else {
                return;
            }
        };
        return JiangliIR;
    }(ui.activity.limitebuy.render.JiangliIRUI));
    game.JiangliIR = JiangliIR;
})(game || (game = {}));
