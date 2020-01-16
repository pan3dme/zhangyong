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
    var YuekaView = /** @class */ (function (_super) {
        __extends(YuekaView, _super);
        function YuekaView() {
            var _this = _super.call(this) || this;
            _this._cells = null;
            _this.initView();
            _this.btn_getyueka.on(Laya.Event.CLICK, _this, _this.lingqu, [1]);
            _this.btn_zhongsheng.on(Laya.Event.CLICK, _this, _this.lingqu, [2]);
            _this._initCard1Y = _this.box_card1.y;
            _this._initCard2Y = _this.box_card2.y;
            return _this;
        }
        YuekaView.prototype.onAdd = function () {
            var _this = this;
            if (this._cells) {
                Laya.timer.callLater(this, function () {
                    UIUtil.playListEff(_this._cells);
                });
            }
        };
        YuekaView.prototype.onExit = function () {
            this.close();
            this.box_card1.y = this._initCard1Y;
            this.box_card2.y = this._initCard2Y;
            UIUtil.clearListEff(this._cells);
        };
        YuekaView.prototype.initView = function () {
            this._cells = [this.box_card1, this.box_card2];
            tl3d.ModuleEventManager.addEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.initView, this);
            //月卡
            var buyYK = App.hero.welfare.monthCardEndTime > App.getServerTime();
            var ykTemp = tb.TB_month_card.getTbMonthCardById(1);
            this.btn_getyueka.skin = "comp/button/button.png";
            this.btn_getyueka.labelStrokeColor = "#ca7005";
            if (buyYK) {
                //购买
                var endtime = parseInt(App.hero.welfare.monthCardEndTime);
                var dayBetween = (endtime - App.getServerTime()) / 86400;
                this.lab_time.text = LanMgr.getLan("剩余{0}天", -1, String(Math.ceil(dayBetween)));
                if (App.hero.welfare.monthCardAward != 1) {
                    //可领取
                    this.btn_getyueka.label = "领取";
                    this.btn_getyueka.gray = false;
                    this.btn_getyueka.skin = "comp/button/btn_qianwang.png";
                    this.btn_getyueka.labelStrokeColor = "#538901";
                    // this.btn_getyueka.visible = true;
                    this.img_yk_receive.visible = false;
                }
                else {
                    //领取完了
                    this.btn_getyueka.label = "已领取";
                    this.btn_getyueka.gray = true;
                    this.btn_getyueka.skin = "comp/button/btn_qianwang.png";
                    this.btn_getyueka.labelStrokeColor = "#538901";
                    // this.btn_getyueka.visible = false;
                    this.img_yk_receive.visible = false;
                }
            }
            else {
                //未购买
                this.btn_getyueka.gray = false;
                this.lab_time.text = "";
                this.btn_getyueka.label = "￥" + ykTemp.recharge_count;
                // this.btn_getyueka.visible = true;
                this.img_yk_receive.visible = false;
                // this.btn_getyueka.skin = "comp/button/button.png";
                // this.btn_getyueka.labelStrokeColor = "#ca7005";
            }
            var itemarr = ary2prop(ykTemp.item_gift);
            this.list_yueka.dataSource = itemarr.map(function (vo) {
                return { item: vo, show: buyYK };
            });
            //终身卡
            var buyZSK = App.hero.welfare.lifelongCard == 1;
            var zskTemp = tb.TB_month_card.getTbMonthCardById(2);
            this.btn_zhongsheng.skin = "comp/button/button.png";
            this.btn_zhongsheng.labelStrokeColor = "#ca7005";
            if (buyZSK) {
                //购买
                if (App.hero.welfare.lifelongCardAward != 1) {
                    //可领取
                    this.btn_zhongsheng.label = "领取";
                    this.btn_zhongsheng.gray = false;
                    this.btn_zhongsheng.skin = "comp/button/btn_qianwang.png";
                    this.btn_zhongsheng.labelStrokeColor = "#538901";
                    // this.btn_zhongsheng.visible = true;
                    this.img_zs_receive.visible = false;
                }
                else {
                    //领取完了
                    // this.btn_zhongsheng.visible = false;
                    this.img_zs_receive.visible = false;
                    this.btn_zhongsheng.label = "已领取";
                    this.btn_zhongsheng.gray = true;
                    this.btn_zhongsheng.skin = "comp/button/btn_qianwang.png";
                    this.btn_zhongsheng.labelStrokeColor = "#538901";
                }
            }
            else {
                //未购买
                this.btn_zhongsheng.gray = false;
                this.btn_zhongsheng.label = "￥" + zskTemp.recharge_count;
                // this.btn_zhongsheng.visible = true;
                this.img_zs_receive.visible = false;
                // this.btn_zhongsheng.skin = "comp/button/button.png";
                // this.btn_zhongsheng.labelStrokeColor = "#ca7005";
            }
            itemarr = ary2prop(zskTemp.item_gift);
            this.list_zhonghsenka.dataSource = itemarr.map(function (vo) {
                return { item: vo, show: buyZSK };
            });
            this.yuekaRP.onDispose();
            this.yuekaRP.setRedPointName("month_reward");
            this.lifeRP.onDispose();
            this.lifeRP.setRedPointName("life_reward");
        };
        /**
         * 点击领取
         * @param num
         */
        YuekaView.prototype.lingqu = function (num) {
            var _this = this;
            if (num == 1) {
                //月卡
                if (App.hero.welfare.monthCardEndTime > App.getServerTime()) {
                    //购买了
                    if (App.hero.welfare.monthCardAward != 1) {
                        PLC.request(Protocol.game_welfare_getMonthCardAward, null, function ($data, msg) {
                            if ($data)
                                UIUtil.showRewardView($data.commonData);
                            _this.initView();
                        });
                    }
                    else {
                        showToast(LanMgr.getLan('', 10219));
                    }
                }
                else {
                    //未购买
                    var Temp = tb.TB_month_card.getTbMonthCardById(1);
                    this.jump(Temp.recharge_id);
                }
            }
            else {
                //终身卡
                if (App.hero.welfare.lifelongCard == 1) {
                    //购买了
                    if (App.hero.welfare.lifelongCardAward != 1) {
                        PLC.request(Protocol.game_welfare_getLifelongCardAward, null, function ($data, msg) {
                            if ($data)
                                UIUtil.showRewardView($data.commonData);
                            _this.initView();
                        });
                    }
                    else {
                        showToast(LanMgr.getLan('', 10219));
                    }
                }
                else {
                    //未购买
                    var Temp = tb.TB_month_card.getTbMonthCardById(2);
                    this.jump(Temp.recharge_id);
                }
            }
        };
        /**跳转到充值界面 */
        YuekaView.prototype.jump = function (id) {
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                var item = tb.TB_recharge.get_TB_rechargeById(id);
                game.ChongzhiModel.pay(item);
            }
            else {
                this.test(id); //模拟充值
            }
        };
        /**
         * 测试购买
         * @param id
         */
        YuekaView.prototype.test = function (id) {
            var _this = this;
            UIUtil.payDebug(id, null, function () {
                _this.initView();
            });
        };
        return YuekaView;
    }(ui.activity.huodong.welfare.tab.YuekaUI));
    game.YuekaView = YuekaView;
})(game || (game = {}));
