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
    var AttrView = /** @class */ (function (_super) {
        __extends(AttrView, _super);
        function AttrView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Tujian_AttrView, closeOnSide: _this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12121) };
            _this.bgPanel.addChildAt(_this.img_bg, 3);
            return _this;
        }
        AttrView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        AttrView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        AttrView.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        AttrView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        AttrView.prototype.initView = function () {
            this.lb_ack.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(1));
            this.lb_def.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(2));
            this.lb_hp.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(3));
            this.lb_speed.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(4));
            this.lb_crit.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(5) + '%');
            this.lb_defcrit.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(6) + '%');
            this.lb_hit.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(7) + '%');
            this.lb_res.text = LanMgr.getLan(' + {0}', -1, game.FateModel.getInstance().getCurFateAttrById(8) + '%');
        };
        return AttrView;
    }(ui.tujian.AttrViewUI));
    game.AttrView = AttrView;
})(game || (game = {}));
