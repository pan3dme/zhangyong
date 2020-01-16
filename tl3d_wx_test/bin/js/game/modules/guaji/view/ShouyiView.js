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
    var ShouyiView = /** @class */ (function (_super) {
        __extends(ShouyiView, _super);
        function ShouyiView() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = true;
            _this.isModelClose = true;
            _this.list_reward.array = null;
            return _this;
        }
        ShouyiView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, false);
            this.initView();
        };
        ShouyiView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, false);
            // this.ani_coin.showEff(this);
            this.initView();
        };
        ShouyiView.prototype.initView = function () {
            var info = this.dataSource;
            if (!info)
                return;
            this.bgPanel.dataSource = { title: "comp/title/guajishouyi.png" };
            var maxlev = game.GuajiModel.getInstance().getMaxLev();
            var curCopy = tb.TB_copy_info.get_TB_copy_infoById(maxlev);
            this.lbExp.text = curCopy ? "+" + curCopy.role_exp_speed + "/m" : "+0/m";
            this.lbGold.text = curCopy ? "+" + curCopy.gold_speed + "/m" : "+0/m";
            this.lbHunshi.text = curCopy ? "+" + curCopy.exp_speed + "/m" : "+0/m";
            //离线收益
            var allItem = [];
            //挂机收益
            if (info.data.commonData.addBagItems) {
                var addBagItems = info.data.commonData.addBagItems;
                for (var key in addBagItems) {
                    var num = addBagItems[key];
                    var id = Number(key);
                    allItem.push(new ItemVo(id, num));
                }
            }
            if (info.data.commonData.addResource) {
                var addResource = info.data.commonData.addResource;
                for (var key in addResource) {
                    var num = addResource[key];
                    var id = Number(key);
                    allItem.push(new ItemVo(id, num));
                }
            }
            if (info.data.commonData.addEquips) {
                var addEquips = info.data.commonData.addEquips;
                //统计装备数量
                var equips = {};
                for (var key in addEquips) {
                    var id = Number(addEquips[key].templateId);
                    equips[id] = !equips[id] ? 1 : equips[id] + 1;
                }
                for (var key in equips) {
                    allItem.push(new ItemVo(parseInt(key), equips[key]));
                }
            }
            var time = App.getServerTime() - info.lastTime;
            var maxtime = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime);
            time = Math.min(maxtime, time);
            this.lab_time.text = tl3d.TimeUtil.getDiffTime2(time);
            this.list_reward.array = allItem;
        };
        ShouyiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            // this.ani_coin.closeEff();
            this.bgPanel.dataSource = null;
            this.list_reward.array = null;
        };
        return ShouyiView;
    }(ui.guaji.ShouyiUI));
    game.ShouyiView = ShouyiView;
})(game || (game = {}));
