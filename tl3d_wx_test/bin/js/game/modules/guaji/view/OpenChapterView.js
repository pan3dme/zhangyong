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
    var OpenChapterView = /** @class */ (function (_super) {
        __extends(OpenChapterView, _super);
        function OpenChapterView() {
            var _this = _super.call(this) || this;
            _this._type = 0;
            _this.isModelClose = false;
            return _this;
        }
        OpenChapterView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, false, false);
            this.initView();
        };
        OpenChapterView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, false, false);
            this.initView();
        };
        OpenChapterView.prototype.close = function () {
            _super.prototype.close.call(this, null, false, false);
        };
        /** 界面移除 */
        OpenChapterView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.ani_hide.gotoAndStop(0);
            this.ani_show.gotoAndStop(0);
            this.ani_guang.gotoAndStop(0);
            Laya.timer.clearAll(this);
            this._zhangjievo = null;
        };
        OpenChapterView.prototype.initView = function () {
            this.ani_show.on(Laya.Event.COMPLETE, this, this.onAniShowComplete);
            this.ani_hide.on(Laya.Event.COMPLETE, this, this.onAniHideComplete);
            this._type = this.dataSource.type;
            switch (this._type) {
                case OpenChapterView.TYPE_GUAJI:
                    this._isOpenNew = this.dataSource.isnew;
                    this._zhangjievo = this.dataSource.infovo;
                    this.lab_name.text = this._zhangjievo.tbCopy.name;
                    this.lab_title.text = this._isOpenNew ? "开启新章节" : "挂机";
                    break;
                case OpenChapterView.TYPE_SHILIANTA:
                    this._isOpenNew = true;
                    this.lab_name.text = "下一层";
                    this.lab_title.text = "";
                    break;
            }
            this.isModal = this._isOpenNew;
            this.ani_hide.gotoAndStop(0);
            this.ani_hide.visible = false;
            this.ani_show.play(0, false);
            this.ani_show.visible = true;
            this.ani2.gotoAndStop(0);
            this.ani1.play(0, false);
            this.ani_guang.play(0, true);
            // if (this._isOpenNew){
            // 	this.ani_hide.gotoAndStop(0);
            // 	this.ani_hide.visible = false;
            // 	this.ani_show.play(0, false);
            // 	this.ani_show.visible = true;
            // }else{
            // 	this.ani_hide.gotoAndStop(0);
            // 	this.ani_hide.visible = true;
            // 	this.ani_show.gotoAndStop(0);
            // 	this.ani_show.visible = false;
            // 	this.onAniShowComplete();
            // }
        };
        //
        OpenChapterView.prototype.onAniShowComplete = function () {
            var _this = this;
            Laya.timer.once(1000, this, function () {
                _this.ani_show.visible = false;
                _this.ani_hide.visible = true;
                _this.ani_hide.play(0, false);
                _this.ani2.play(0, false);
            });
        };
        OpenChapterView.prototype.onAniHideComplete = function () {
            this.close();
        };
        OpenChapterView.TYPE_GUAJI = 0; //挂机
        OpenChapterView.TYPE_SHILIANTA = 1; //试炼塔
        return OpenChapterView;
    }(ui.guaji.OpenChapterViewUI));
    game.OpenChapterView = OpenChapterView;
})(game || (game = {}));
