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
    var BianQiangIR = /** @class */ (function (_super) {
        __extends(BianQiangIR, _super);
        function BianQiangIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BianQiangIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        BianQiangIR.prototype.refreshView = function () {
            var guidedata = this._dataSource;
            if (guidedata) {
                this.icon.skin = SkinUtil.getSysOpenSkin(guidedata.icon);
                this.lab_title.text = guidedata.name;
                if (guidedata.recommend == BianQiangIR.TYPE_XSRM) {
                    this.lab_type.text = LanMgr.getLan("", 12150);
                    this.lab_type.strokeColor = "#297d0d";
                }
                else if (guidedata.recommend == BianQiangIR.TYPE_XZBB) {
                    this.lab_type.text = LanMgr.getLan("", 12151);
                    this.lab_type.strokeColor = "#6c4ac7";
                }
                else if (guidedata.recommend == BianQiangIR.TYPE_THBS) {
                    this.lab_type.text = LanMgr.getLan("", 12152);
                    this.lab_type.strokeColor = "#a22a2a";
                }
                else {
                    this.lab_type.text = "";
                    this.lab_type.strokeColor = "#579f36";
                }
                this.lab_desc.text = guidedata.desc;
                this.img_type.skin = this.getTypeIcon(guidedata.recommend);
                this.btnOperate.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.btnOperate.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        BianQiangIR.prototype.getTypeIcon = function (type) {
            switch (type) {
                case BianQiangIR.TYPE_XSRM:
                    return "comp/flag/woyaobianqiang_butiao01.png";
                case BianQiangIR.TYPE_XZBB:
                    return "comp/flag/woyaobianqiang_butiao02.png";
                case BianQiangIR.TYPE_THBS:
                    return "comp/flag/woyaobianqiang_butiao03.png";
                default:
                    return "";
            }
        };
        BianQiangIR.prototype.onClick = function () {
            var guidedata = this._dataSource;
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, guidedata.link));
        };
        BianQiangIR.TYPE_XSRM = 1; //新手入门
        BianQiangIR.TYPE_XZBB = 2; //小资必备
        BianQiangIR.TYPE_THBS = 3; //土豪必刷
        return BianQiangIR;
    }(ui.task.bianqiang.BianQiangIRUI));
    game.BianQiangIR = BianQiangIR;
})(game || (game = {}));
