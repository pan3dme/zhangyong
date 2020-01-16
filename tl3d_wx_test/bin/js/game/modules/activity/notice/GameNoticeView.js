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
    /** 游戏内公告 */
    var GameNoticeView = /** @class */ (function (_super) {
        __extends(GameNoticeView, _super);
        function GameNoticeView() {
            var _this = _super.call(this) || this;
            _this._list = [];
            _this.panel_list.vScrollBarSkin = '';
            _this.NOTICE_INFOS = [
                {
                    img: "huodong/gonggao1.jpg",
                    img_h: 224,
                    content: LanMgr.getLan("", 20021)
                },
                {
                    img: "huodong/gonggao2.jpg",
                    img_h: 224,
                    content: LanMgr.getLan("", 20022)
                }
            ];
            return _this;
        }
        GameNoticeView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GameNoticeView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        GameNoticeView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnClose.off(Laya.Event.CLICK, this, this.onBtnClick);
        };
        GameNoticeView.prototype.onBtnClick = function () {
            if (this.dataSource.openFlag) {
                game.HuodongModel.getInstance().autoOpenLoginGift();
            }
            this.close();
        };
        /** 初始化界面 */
        GameNoticeView.prototype.initView = function () {
            this.isModelClose = !this.dataSource.openFlag;
            this.btnClose.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.clearNotice();
            for (var i = 0; i < this.NOTICE_INFOS.length; i++) {
                this.addNotice(this.NOTICE_INFOS[i]);
            }
            this.layout();
        };
        GameNoticeView.prototype.addNotice = function (info) {
            if (!info)
                return;
            var item = new ui.activity.notice.NoticeIRUI();
            item.img_show.skin = info.img;
            item.img_show.height = info.img_h;
            item.lab_content.text = info.content;
            item.lab_content.y = item.img_show.height + 10;
            item.height = item.lab_content.y + item.lab_content.height + 10;
            this._list.push(item);
            this.panel_list.addChild(item);
        };
        GameNoticeView.prototype.clearNotice = function () {
            for (var i = 0; i < this._list.length; i++) {
                this._list[i].destroy();
            }
            this._list.length = 0;
        };
        GameNoticeView.prototype.layout = function () {
            var posy = 0;
            for (var i = 0; i < this._list.length; i++) {
                var item = this._list[i];
                item.y = posy;
                posy += item.height;
            }
        };
        GameNoticeView.noticeVersion = "v1";
        return GameNoticeView;
    }(ui.activity.notice.GameNoticeUI));
    game.GameNoticeView = GameNoticeView;
})(game || (game = {}));
