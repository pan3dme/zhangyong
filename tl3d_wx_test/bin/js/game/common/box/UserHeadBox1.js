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
var common;
(function (common) {
    var UserHeadBox1 = /** @class */ (function (_super) {
        __extends(UserHeadBox1, _super);
        function UserHeadBox1() {
            return _super.call(this) || this;
        }
        Object.defineProperty(UserHeadBox1.prototype, "dataSource", {
            set: function ($data) {
                this._dataSource = $data;
                if ($data) {
                    var frameSkin = $data.getFrame();
                    this.img_frame.visible = frameSkin ? true : false;
                    if (frameSkin) {
                        this.img_frame.skin = frameSkin;
                    }
                    this.imgLv.skin = $data.getImgLv();
                    this.img_icon.skin = $data.getIconUrl();
                    if ($data.getLevel() >= 0) {
                        this.box_lev.visible = true;
                        this.txt_lv.text = $data.getLevel().toString();
                    }
                    else {
                        this.box_lev.visible = false;
                        this.txt_lv.text = "";
                    }
                }
                else {
                    this.img_icon.skin = null;
                    this.img_frame.visible = false;
                    this.box_lev.visible = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        return UserHeadBox1;
    }(ui.box.UserHeadBox1UI));
    common.UserHeadBox1 = UserHeadBox1;
})(common || (common = {}));
