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
/*
* name;
*/
var common;
(function (common) {
    var CommonLevelUpTitleView = /** @class */ (function (_super) {
        __extends(CommonLevelUpTitleView, _super);
        function CommonLevelUpTitleView() {
            var _this = _super.call(this) || this;
            /**
            *显示升级标题
            *@param titleSkin 标题图片
            *@param showStar 显示星星
            *@param showHg 显示皇冠
            *@param showLight 显示底部光圈旋转特效
            */
            _this._isShow = false;
            _this._isShowStar = false;
            _this._isShowLight = false;
            _this._step = 0;
            _this._cdTime = 0;
            _this.closeTitle();
            return _this;
        }
        CommonLevelUpTitleView.prototype.showTitle = function (titleSkin, showStar, showLight, callback, tparent) {
            if (showStar === void 0) { showStar = true; }
            if (showLight === void 0) { showLight = true; }
            if (callback === void 0) { callback = null; }
            if (tparent === void 0) { tparent = null; }
            this.closeTitle(false);
            this._isShowStar = showStar;
            this._isShowLight = showLight;
            this._callBack = callback;
            this._titleparent = tparent;
            this._isShow = true;
            if (tparent) {
                // this.bg.width = this._titleparent.width+40;
                // this.bg.height = this._titleparent.height - this.bg.y;
                if (this._titleparent["box_content"]) {
                    this._titleparent["box_content"].visible = false;
                }
            }
            this.img_title.skin = titleSkin;
            this._step = 0;
            Laya.timer.loop(30, this, this.update);
        };
        CommonLevelUpTitleView.prototype.update = function () {
            this._cdTime -= 30;
            if (this._cdTime <= 0) {
                if (this._step == 0 && !this.box_cb.visible) {
                    this._step = 1;
                    this.box_cb.visible = true;
                    this.ani_cb_zk.play(0, false);
                    if (this._isShowStar) {
                        this.ani_star.visible = true;
                        this.ani_star.play(0, true);
                    }
                    this.img_hg_bg.visible = true;
                    this._cdTime = 100;
                }
                else if (this._step == 1 && !this.box_light_eff.visible) {
                    this._step = 2;
                    if (this._isShowLight) {
                        this.box_light_eff.visible = true;
                        this.eff_guang.play();
                        this._cdTime = 200;
                    }
                    if (this._titleparent && this._titleparent["box_content"]) {
                        this._titleparent["box_content"].visible = true;
                    }
                    this.ani_bg_sf.play(0, false);
                    this.ani_cb_hd.play();
                    this.box_star.visible = true;
                    // this.ani_star.visible = false;
                    this.ani_xx_xz.play();
                }
                else if (this._step == 2) {
                    this._step = 3;
                    this.ani_bg_pd.play(0, true);
                }
                else if (this._step >= 3) {
                    //结束拉
                    this.endUpdate();
                }
            }
            // && !this.ani_cb_zk.isPlaying
            // if (this._step > 0 && !this.ani_cb_hd.isPlaying){
            //     this.ani_cb_hd.play();
            // }
            // if (this._isShowStar && this._step > 0 && !this.ani_star.isPlaying){
            //     this.box_star.visible = true;
            //     this.ani_star.visible = false;
            //     this.ani_xx_xz.play();
            // }
        };
        CommonLevelUpTitleView.prototype.endUpdate = function () {
            if (this._callBack) {
                this._callBack.run();
                this._callBack = null;
            }
            Laya.timer.clear(this, this.update);
        };
        CommonLevelUpTitleView.prototype.closeTitle = function (force) {
            if (force === void 0) { force = true; }
            if (!force && !this._isShow)
                return;
            this._isShow = false;
            //翅膀
            this.ani_cb_hd.stop();
            this.ani_cb_zk.stop();
            this.box_cb.visible = false;
            //星星
            this.ani_star.stop();
            this.ani_star.visible = false;
            this.ani_xx_xz.stop();
            this.box_star.visible = false;
            //皇冠
            this.img_hg_bg.visible = false;
            this.eff_guang.stop();
            this.box_light_eff.visible = false;
            this.ani_bg_sf.gotoAndStop(0);
            this.ani_bg_pd.gotoAndStop(0);
            Laya.timer.clearAll(this);
            if (this._callBack) {
                this._callBack.recover();
                this._callBack = null;
            }
            if (this._titleparent && this._titleparent["box_content"]) {
                this._titleparent["box_content"].visible = true;
            }
            this._titleparent = null;
        };
        return CommonLevelUpTitleView;
    }(ui.component.CommonLevelUpTitleUI));
    common.CommonLevelUpTitleView = CommonLevelUpTitleView;
})(common || (common = {}));
