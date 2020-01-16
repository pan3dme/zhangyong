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
    var LoginGiftView = /** @class */ (function (_super) {
        __extends(LoginGiftView, _super);
        function LoginGiftView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        LoginGiftView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._uiDayArr = [];
            for (var i = 0; i < LoginGiftView.DAY_NUM; i++) {
                this._uiDayArr[i] = this["ui_day_" + i];
            }
            this._uiItemArr = [];
            for (var i = 0; i < LoginGiftView.ITEM_NUM; i++) {
                this._uiItemArr[i] = this["ui_item_" + i];
            }
        };
        LoginGiftView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        LoginGiftView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        LoginGiftView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (this._uiDayArr) {
                for (var i = 0; i < this._uiDayArr.length; i++) {
                    this._uiDayArr[i].off(Laya.Event.CLICK, this, this.onClickDay);
                }
            }
            this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
            tl3d.ModuleEventManager.removeEvent(game.HuodongEvent.TOTAL_LOGIN_DAY, this.onLoginDayChange, this);
            tl3d.ModuleEventManager.removeEvent(game.HuodongEvent.LOGIN_GIFT_RECEIVE, this.onReceiveChange, this);
            for (var i = 0; i < this._uiItemArr.length; i++) {
                var uiitem = this._uiItemArr[i];
                uiitem.dataSource = null;
            }
            game.HuodongModel.getInstance().checkOpenLoginGift();
        };
        LoginGiftView.prototype.initView = function () {
            this._type = this.dataSource ? this.dataSource : LoginGiftView.TYPE_ONE;
            this._firstDay = (this._type - 1) * tb.TB_sevendays.TYPE_DAYS + 1;
            for (var i = 0; i < this._uiDayArr.length; i++) {
                this._uiDayArr[i].on(Laya.Event.CLICK, this, this.onClickDay, [i]);
            }
            this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.TOTAL_LOGIN_DAY, this.onLoginDayChange, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LOGIN_GIFT_RECEIVE, this.onReceiveChange, this);
            this.updateTitleImg();
            this.initDay();
            var idx = this.getCanReceiveIdx();
            this.setSelectIdx(idx);
        };
        LoginGiftView.prototype.onLoginDayChange = function () {
            this.updateTitleImg();
            this.updateReceiveBtn();
            this.updateDay();
        };
        //
        LoginGiftView.prototype.onReceiveChange = function () {
            this.updateDay();
            var idx = this.getCanReceiveIdx();
            this.setSelectIdx(idx);
        };
        LoginGiftView.prototype.updateTitleImg = function () {
            var skin = "";
            var dayNum = this._curIdx + this._firstDay;
            if (this._type == LoginGiftView.TYPE_ONE) {
                if (dayNum <= 2) {
                    skin = "2tian";
                }
                else if (dayNum <= 3) {
                    skin = "3tian";
                }
                else {
                    skin = "7tian";
                }
            }
            else {
                if (dayNum <= 10) {
                    skin = "10tian";
                }
                else {
                    skin = "14tian";
                }
            }
            this.img_title.skin = LanMgr.getLan("huodong/logingift/{0}.png", -1, skin);
        };
        LoginGiftView.prototype.initDay = function () {
            for (var i = 0; i < this._uiDayArr.length; i++) {
                var uiday = this._uiDayArr[i];
                uiday.img_icon.skin = LanMgr.getLan("huodong/logingift/{0}.png", -1, this.getDayIcon(this._firstDay + i));
                ;
                uiday.lab_day.text = LanMgr.getLan("第{0}天", -1, this._firstDay + i);
            }
            this.updateDay();
        };
        LoginGiftView.prototype.updateDay = function () {
            var dayNum = App.hero.welfare.totalLoginDay;
            for (var i = 0; i < this._uiDayArr.length; i++) {
                var uiday = this._uiDayArr[i];
                var day = this._firstDay + i;
                uiday.img_gou.visible = this.isReceive(this._firstDay + i);
                uiday.img_red.visible = dayNum >= day && !this.isReceive(day);
            }
        };
        LoginGiftView.prototype.setSelectIdx = function (index) {
            if (index < 0)
                index = 0;
            else if (index >= this._uiDayArr.length)
                index = this._uiDayArr.length - 1;
            this._curIdx = index;
            for (var i = 0; i < this._uiDayArr.length; i++) {
                var uiday = this._uiDayArr[i];
                uiday.img_select.visible = this._curIdx == i;
            }
            var day = this._firstDay + this._curIdx;
            this.lab_day.text = day + "";
            var temp = tb.TB_sevendays.get_TB_sevendaysById(day);
            if (temp) {
                for (var i = 0; i < this._uiItemArr.length; i++) {
                    var uiitem = this._uiItemArr[i];
                    if (i < temp.reward.length) {
                        var itemvo = new ItemVo(temp.reward[i][0], temp.reward[i][1]);
                        uiitem.dataSource = itemvo;
                    }
                    else {
                        uiitem.dataSource = null;
                    }
                }
            }
            this.updateReceiveBtn();
            this.updateTitleImg();
        };
        LoginGiftView.prototype.updateReceiveBtn = function () {
            var dayNum = App.hero.welfare.totalLoginDay;
            var day = this._firstDay + this._curIdx;
            if (day > dayNum) {
                //未达到
                this.btn_receive.label = "未达到";
                this.btn_receive.gray = true;
                this.img_red.visible = false;
            }
            else if (this.isReceive(day)) {
                //已领取
                this.btn_receive.label = "已领取";
                this.btn_receive.gray = true;
                this.img_red.visible = false;
            }
            else {
                this.btn_receive.label = "领取";
                this.btn_receive.gray = false;
                this.img_red.visible = true;
            }
        };
        //点击天
        LoginGiftView.prototype.onClickDay = function (index) {
            if (this._curIdx != index) {
                this.setSelectIdx(index);
            }
        };
        //点击领取
        LoginGiftView.prototype.onClickReceive = function () {
            if (this.btn_receive.gray) {
                if (this.btn_receive.label == "已领取") {
                    showToast(LanMgr.getLan('', 10220));
                }
                else {
                    showToast(LanMgr.getLan('', 10227));
                }
                return;
            }
            var day = this._firstDay + this._curIdx;
            var args = {};
            args[Protocol.game_welfare_loginGiftPack.args.id] = day;
            PLC.request(Protocol.game_welfare_loginGiftPack, args, function ($data, $msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
            });
        };
        //获取可领取index
        LoginGiftView.prototype.getCanReceiveIdx = function () {
            var dayNum = App.hero.welfare.totalLoginDay;
            for (var i = 0; i < this._uiDayArr.length; i++) {
                var day = this._firstDay + i;
                if (day > dayNum)
                    return i;
                if (!this.isReceive(day))
                    return i;
            }
            return this._uiDayArr.length - 1;
        };
        //是否领取
        LoginGiftView.prototype.isReceive = function (day) {
            return App.hero.welfare.loginGiftPack.hasOwnProperty(day);
        };
        //获取图片
        LoginGiftView.prototype.getDayIcon = function (day) {
            if (day == 9)
                return 4;
            if (day == 11)
                return 6;
            if (day == 14)
                return 7;
            return day;
        };
        LoginGiftView.TYPE_ONE = 1; //7天
        LoginGiftView.TYPE_TWO = 2; //14天
        LoginGiftView.DAY_NUM = 7;
        LoginGiftView.ITEM_NUM = 4;
        return LoginGiftView;
    }(ui.activity.logingift.logingiftUI));
    game.LoginGiftView = LoginGiftView;
})(game || (game = {}));
