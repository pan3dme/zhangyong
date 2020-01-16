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
    var TabTequan = /** @class */ (function (_super) {
        __extends(TabTequan, _super);
        function TabTequan() {
            var _this = _super.call(this) || this;
            _this.list_tequaninfo.renderHandler = new Handler(_this, _this.onInfoRender);
            _this.btn_left.on(Laya.Event.CLICK, _this, _this.onLeft);
            _this.btn_right.on(Laya.Event.CLICK, _this, _this.onRight);
            _this.btn_buy.on(Laya.Event.CLICK, _this, _this.onBuy);
            return _this;
        }
        Object.defineProperty(TabTequan.prototype, "dataSource", {
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
        /**
         * 刷新数据
         */
        TabTequan.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lab_yuanjia.text = String(info.original_price);
                this.lab_xianjia.text = String(info.now_price);
                this.now = info.ID;
                this.updateBtn();
                this.controls();
                this.tequaninfo(info);
                this.icondata(info);
                this.updateRedPoint();
            }
        };
        TabTequan.prototype.updateBtn = function () {
            this.btn_right.gray = this.now == App.getMaxVipLv() ? true : false;
            this.btn_left.gray = this.now == 1 ? true : false;
        };
        /**
         * 存放特权描述
         * @param data
         */
        TabTequan.prototype.tequaninfo = function (data) {
            var infoary = new Array();
            var arr = tb.TB_vip_privilege.get_TB_vip_privilege("vip_level", this.now + "");
            for (var i = 0; i < arr.length; i++) {
                infoary.push({ desc: arr[i].desc, isspecial: arr[i].is_show_special, rank: 0 });
            }
            if (this.now == 1) {
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum, data.god_limit));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum, data.arena_buy));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum, data.fast_fighting));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.wishNum, data.wish_limit));
                // infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime, data.offline_time));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.hangupIncome, data.hang_up));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum, data.guildcopy_buy));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum, data.daily_copy));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum, data.gold_exchange));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.worldBossNum, data.worldboss));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.runeCopyExtraNum, data.match_buy));
                // infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum, data.sweep_add));
                infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum, data.fight_goddomain));
            }
            else {
                var preData = tb.TB_vip.get_TB_vipById(this.now - 1);
                if (preData.god_limit != data.god_limit)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum, data.god_limit));
                if (preData.arena_buy != data.arena_buy)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum, data.arena_buy));
                if (preData.fast_fighting != data.fast_fighting)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum, data.fast_fighting));
                if (preData.wish_limit != data.wish_limit)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.wishNum, data.wish_limit));
                // if(preData.offline_time != data.offline_time) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime, data.offline_time));
                if (preData.hang_up != data.hang_up)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.hangupIncome, data.hang_up));
                if (preData.guildcopy_buy != data.guildcopy_buy)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum, data.guildcopy_buy));
                if (preData.daily_copy != data.daily_copy)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum, data.daily_copy));
                if (preData.gold_exchange != data.gold_exchange)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum, data.gold_exchange));
                if (preData.worldboss != data.worldboss)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.worldBossNum, data.worldboss));
                if (preData.match_buy != data.match_buy)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.runeCopyExtraNum, data.match_buy));
                // if(preData.sweep_add != data.sweep_add) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum, data.sweep_add));
                if (preData.fight_goddomain != data.fight_goddomain)
                    infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum, data.fight_goddomain));
                infoary.push({ desc: LanMgr.getLan("包含VIP{0}所有特权", -1, this.now - 1), isspecial: 0, rank: 100000 });
            }
            infoary.sort(function (a, b) {
                return a.rank - b.rank;
            });
            this.list_tequaninfo.dataSource = infoary;
        };
        TabTequan.prototype.getTeQuanInfo = function (id, value) {
            var temp = tb.TB_vip_desc.get_TB_vip_descById(id);
            if (!temp)
                return { desc: value, isspecial: 0, rank: 99999 };
            var hzstr = "";
            if (id == iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime)
                value /= 3600;
            if (id == iface.tb_prop.vipPrivilegeTypeKey.hangupIncome)
                hzstr = "%";
            return { desc: LanMgr.getLan(temp.desc + hzstr, -1, value), isspecial: 0, rank: temp.rank };
        };
        /**
         * 特权礼包数据
         * @param data
         */
        TabTequan.prototype.icondata = function (data) {
            var temparry = new Array();
            for (var i = 0; i < data.item_gift.length; i++) {
                var vo = void 0;
                vo = App.hero.createItemVo(data.item_gift[i][1], data.item_gift[i][0]);
                temparry.push({ item: vo, play: i < data.flash_num });
            }
            this.list_icon.dataSource = temparry;
            this.list_icon.repeatX = temparry.length > 5 ? 5 : temparry.length;
            this.list_icon.centerX = 0.5;
        };
        /**
         * 渲染特权描述
         * @param itemRender
         * @param index
         */
        TabTequan.prototype.onInfoRender = function (itemRender, index) {
            itemRender.text = (index + 1) + "." + this.list_tequaninfo.dataSource[index].desc;
            if (this.list_tequaninfo.dataSource[index].isspecial == 1) {
                //特殊
                itemRender.color = "#c26939";
            }
            else {
                itemRender.color = "#72503f";
            }
        };
        /**
         * 更新红点
         */
        TabTequan.prototype.updateRedPoint = function () {
            var model = game.ChongzhiModel.getInstance();
            this.img_rpbuy.visible = this.img_rpleft.visible = this.img_rpright.visible = false;
            //左红点
            for (var i = 0; i < this.now; i++) {
                if (model.isVisibleByid(i))
                    this.img_rpleft.visible = true;
            }
            //右红点 以16未限避免 now + 1 = 16
            for (var i = this.now + 1; i <= 16; i++) {
                if (model.isVisibleByid(i))
                    this.img_rpright.visible = true;
            }
            if (model.isVisibleByid(this.now)) {
                this.img_rpbuy.visible = true;
            }
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.UPDATE_TEQUANRED_EVEN));
        };
        /**
         * 点击向右按钮
         */
        TabTequan.prototype.onRight = function () {
            var maxVip = App.getMaxVipLv();
            if (this.now < maxVip) {
                this.now++;
                var viptab = tb.TB_vip.get_TB_vipById(this.now);
                this.dataSource = viptab;
                this.refreshData();
                this.controls();
                this.updateBtn();
            }
        };
        /**
         * 点击向左按钮
         */
        TabTequan.prototype.onLeft = function () {
            if (this.now > 1) {
                this.now--;
                var viptab = tb.TB_vip.get_TB_vipById(this.now);
                this.dataSource = viptab;
                this.refreshData();
                this.controls();
                this.updateBtn();
            }
        };
        /**
         * 控制控件
         */
        TabTequan.prototype.controls = function () {
            this.img_vip.text = "VIP" + this.now.toString() + "特权";
            this.lab_vip.text = "VIP" + this.now + "尊享礼包";
            if (App.hero.welfare.privilegeGiftPack[this.now]) {
                this.img_hasbuy.visible = true;
                this.btn_buy.visible = false;
            }
            else {
                this.img_hasbuy.visible = false;
                this.btn_buy.visible = true;
            }
        };
        /**
         * 点击购买
         */
        TabTequan.prototype.onBuy = function () {
            var _this = this;
            if (this.now > App.hero.vip) {
                showToast(LanMgr.getLan("", 10214, this.now));
            }
            else {
                var args = {};
                args[Protocol.game_welfare_privilegeGiftPack.args.id] = this.now;
                PLC.request(Protocol.game_welfare_privilegeGiftPack, args, function ($data, $msg) {
                    if (!$data)
                        return;
                    UIUtil.showRewardView($data.commonData, null, false, UI_DEPATH_VALUE.TOP);
                    App.hero.welfare.privilegeGiftPack[_this.now] = $data.privilegeGiftPack[_this.now];
                    _this.controls();
                    _this.updateRedPoint();
                });
            }
        };
        return TabTequan;
    }(ui.activity.chongzhi.TabTequanUI));
    game.TabTequan = TabTequan;
})(game || (game = {}));
