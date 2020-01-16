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
    var GodDoorJiangliIR = /** @class */ (function (_super) {
        __extends(GodDoorJiangliIR, _super);
        function GodDoorJiangliIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodDoorJiangliIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        GodDoorJiangliIR.prototype.refreshView = function () {
            if (this.dataSource) {
                // let idx = data.indexid==0?0:2;
                //避免神界之门奖励界面覆盖关闭按钮
                this.scale(0.97, 0.97);
                var start = this.dataSource.id == 0 ? 4 : 5;
                this.lab_miaoshu.text = LanMgr.getLan('{0}星英雄掉落(整卡掉落概率{1}%，碎片掉落概率{2}%)', -1, start, this.dataSource.rato[0], this.dataSource.rato[1]);
                this.onShow(this.dataSource.list);
            }
            else {
            }
        };
        /** 展开子任务 */
        GodDoorJiangliIR.prototype.onShow = function ($data) {
            var temparry = new Array;
            this.img_di.visible = true;
            // this.img_di.dataSource = $data;
            for (var i = 0; i < $data.length; i++) {
                var vo = App.hero.createItemVo($data[i][1], $data[i][0]);
                vo.show = true;
                vo.bag = true;
                temparry.push(vo);
            }
            this.list_head.dataSource = temparry;
            var heightXishu = Math.ceil(temparry.length / 5);
            this.list_head.height = 100 * heightXishu;
            this.img_di.height = heightXishu == 1 ? 120 * heightXishu + 20 : 120 * heightXishu;
            this.height = heightXishu == 1 ? 140 * heightXishu + 50 : 140 * heightXishu;
        };
        /** 隐藏子任务 */
        GodDoorJiangliIR.prototype.onHide = function () {
            this.img_di.visible = false;
            this.img_di.dataSource = null;
            this.height = 100;
        };
        /** 是否是展开的 */
        GodDoorJiangliIR.prototype.isShow = function () {
            return this.img_di.visible;
        };
        return GodDoorJiangliIR;
    }(ui.goddoor.render.JiangliIRUI));
    game.GodDoorJiangliIR = GodDoorJiangliIR;
})(game || (game = {}));
