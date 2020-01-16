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
    var CommonTitle5View = /** @class */ (function (_super) {
        __extends(CommonTitle5View, _super);
        function CommonTitle5View() {
            var _this = _super.call(this) || this;
            _this.btnClose.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
            // this.setTitleVisible(false);
        }
        Object.defineProperty(CommonTitle5View.prototype, "dataSource", {
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
        CommonTitle5View.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.btnClose.visible = data.hasOwnProperty('closeOnButton') ? data.closeOnButton : true;
                this.closeByBlank.visible = data.hasOwnProperty('closeOnSide') ? data.closeOnSide : true;
                this.closeByBlank.bottom = data.hasOwnProperty('bottom') ? data.bottom : -60;
                var hasTitle = data.hasOwnProperty('title') ? (data.title && data.title != "") : false;
                this.lbTitle.text = hasTitle ? data.title : "";
                this.setTitleVisible(hasTitle);
            }
            else {
                this.setTitleVisible(false);
            }
        };
        /** 更新标题 */
        CommonTitle5View.prototype.updateTitle = function (title) {
            var data = this.dataSource;
            if (data) {
                data.title = title;
            }
            this.lbTitle.text = title;
            this.setTitleVisible(title ? true : false);
        };
        CommonTitle5View.prototype.setTitleVisible = function (visible) {
            this.bgTitle.visible = this.lbTitle.visible = visible;
        };
        CommonTitle5View.prototype.onClick = function () {
            if (this.dataSource && this.dataSource.uiName) {
                UIMgr.hideUIByName(this.dataSource.uiName);
            }
            else {
                var dialog = this.parent;
                if (dialog) {
                    dialog.close('buttonClose', true);
                }
            }
        };
        return CommonTitle5View;
    }(ui.component.CommonTitle5UI));
    common.CommonTitle5View = CommonTitle5View;
})(common || (common = {}));
