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
    var ChongzhiView = /** @class */ (function (_super) {
        __extends(ChongzhiView, _super);
        function ChongzhiView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_tequan.on(Laya.Event.CLICK, _this, _this.onTequan);
            _this.btn_chongzhi.on(Laya.Event.CLICK, _this, _this.onChongzhi);
            _this.list_item.selectHandler = new Handler(_this, _this.onSelect);
            _this.list_item.mouseHandler = new Handler(_this, _this.onMouse);
            _this.bgPanel.box_Content.addChild(_this.img_bg);
            return _this;
        }
        ChongzhiView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.refreshData();
            this.dataSource ? this.onTequan() : this.onChongzhi();
            this.bgPanel.dataSource = { uiName: UIConst.ChongzhiView, closeOnSide: false, closeOnButton: false, title: "充 值" };
            this.btnClose.on(Laya.Event.CLICK, this, this.onCLickClose);
        };
        /**
         * 刷新充值界面数据
         */
        ChongzhiView.prototype.refreshData = function () {
            this.exp();
            var rechargetab;
            var itemarry = new Array();
            // let flag: boolean = false;
            // if(App.hero.welfare.lifelongCard == 1)
            // 	flag = true;
            for (var i = 1; i < 10; i++) {
                // if (i == 1 && App.hero.welfare.monthCardEndTime >= App.getServerTime()){
                // 	//已购买月卡就不显示
                // 	continue;
                // }
                // if (App.hero.welfare.lifelongCard == 1 && i == 2) { //已购买过终身卡 不再显示终身卡选项
                // 	// if(i == 2)
                // 	continue;
                // }
                // 隐藏月卡和终身卡选项
                if (i == 1 || i == 2) {
                    continue;
                }
                rechargetab = tb.TB_recharge.get_TB_rechargeById(i);
                itemarry.push(rechargetab);
            }
            itemarry.sort(function (a, b) {
                return a.rank - b.rank;
            });
            this.list_item.dataSource = itemarry;
            this.list_item.selectedIndex = -1;
            this.lbl_vip.text = App.hero.vip.toString();
        };
        /**
         * 计算并显示经验值
         */
        ChongzhiView.prototype.exp = function () {
            var maxVip = App.getMaxVipLv();
            var nextVip = App.hero.vip == maxVip ? tb.TB_vip.get_TB_vipById(maxVip) : tb.TB_vip.get_TB_vipById(App.hero.vip + 1);
            var vipScore = App.hero.vipScore;
            var expvalue = 1;
            var expstr;
            if (nextVip) {
                expvalue = vipScore / (nextVip.recharge * 10);
            }
            this.probar_exp.value = expvalue;
            this.explabui.text = vipScore + "/" + nextVip.recharge * 10;
            this.box_nextlv.visible = App.hero.vip == 15 ? false : true;
            this.lab_more.text = Snums(Math.floor(nextVip.recharge * 10 - vipScore));
            this.lab_nextlv.text = "VIP" + (App.hero.vip + 1);
        };
        /**
         * 点击购买项
         * @param index
         */
        ChongzhiView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            var item = this.list_item.dataSource[index];
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                game.ChongzhiModel.pay(item);
            }
            else {
                this.test(item); //模拟充值
            }
            //需要重置为-1 ，否则无法下次点击
            this.list_item.selectedIndex = -1;
        };
        /**
         * 按钮点击效果
         * @param e
         * @param index
         */
        ChongzhiView.prototype.onMouse = function (e, index) {
            switch (e.type) {
                case Laya.Event.MOUSE_DOWN:
                    AudioMgr.playSound();
                    e.target.scaleX = 0.9;
                    e.target.scaleY = 0.9;
                    break;
                case Laya.Event.MOUSE_OUT:
                case Laya.Event.MOUSE_UP:
                    e.target.scaleX = 1;
                    e.target.scaleY = 1;
                    break;
            }
        };
        /**
         * 测试购买
         * @param id
         */
        ChongzhiView.prototype.test = function (item) {
            var _this = this;
            UIUtil.payDebug(item.ID, null, function () {
                var $evt = new game.HuodongEvent(game.HuodongEvent.REFRESH_YUEKA_PANEL);
                dispatchEvt($evt);
                _this.refreshData();
                _this.list_item.selectedIndex = -1;
            });
        };
        /**
         * 查看特权界面
         */
        ChongzhiView.prototype.onTequan = function () {
            var viptab;
            if (App.hero.vip > 0) {
                viptab = tb.TB_vip.get_TB_vipById(App.hero.vip);
            }
            else
                viptab = tb.TB_vip.get_TB_vipById(1);
            this.list_item.visible = false;
            this.box_cz.visible = false;
            this.btn_chongzhi.visible = true;
            this.btn_tequan.visible = false;
            this.view_tequan.visible = true;
            this.view_tequan.dataSource = viptab;
        };
        ChongzhiView.prototype.onCLickClose = function () {
            UIMgr.hideUIByName(UIConst.ChongzhiView);
        };
        /**
         * 点击前往充值
         */
        ChongzhiView.prototype.onChongzhi = function () {
            this.list_item.visible = true;
            this.box_cz.visible = true;
            this.btn_chongzhi.visible = false;
            this.btn_tequan.visible = true;
            this.view_tequan.visible = false;
            this.view_tequan.dataSource = null;
        };
        ChongzhiView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.btnClose.off(Laya.Event.CLICK, this, this.onCLickClose);
            this.bgPanel.dataSource = null;
            this.list_item.dataSource = null;
            this.view_tequan.dataSource = null;
        };
        return ChongzhiView;
    }(ui.activity.chongzhi.ChongzhiUI));
    game.ChongzhiView = ChongzhiView;
})(game || (game = {}));
