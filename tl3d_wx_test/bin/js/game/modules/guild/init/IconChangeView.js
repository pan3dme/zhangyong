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
    var IconChangeView = /** @class */ (function (_super) {
        __extends(IconChangeView, _super);
        function IconChangeView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.IconChangeView, closeOnSide: _this.isModelClose, title: "头像设置" };
            return _this;
        }
        IconChangeView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        IconChangeView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        IconChangeView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list_icon.array = null;
            this.btn_sure.off(Laya.Event.CLICK, this, this.sure);
        };
        IconChangeView.prototype.initView = function () {
            var _this = this;
            this.btn_sure.on(Laya.Event.CLICK, this, this.sure);
            //将表中的图标数据读出来
            var list = this.dataSource.list_icon;
            this.list_icon.array = list;
            this.list_icon.mouseHandler = new Handler(this, this.onSelect);
            this.list_icon.renderHandler = new Handler(this, this.onRender);
            /** 获取到默认的index或者已有的index */
            var index = 0;
            if (this.dataSource.iconId) {
                index = list.findIndex(function (vo) {
                    return vo.tbHead.ID == _this.dataSource.iconId;
                });
            }
            this.list_icon.selectedIndex = index;
        };
        IconChangeView.prototype.sure = function () {
            if (this.dataSource.type == game.GuildIconChangeType.createChange) {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.CREATE_GUILD_CHANGEICON), this.list_icon.selectedItem);
            }
            else if (this.dataSource.type == game.GuildIconChangeType.infoChange) {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_HALL_VIEW_CHANGEICON), this.list_icon.selectedItem);
            }
        };
        IconChangeView.prototype.onSelect = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
            }
        };
        IconChangeView.prototype.onRender = function (itemRender, index) {
            if (index > this.list_icon.length)
                return;
            itemRender.img_selected.visible = index == this.list_icon.selectedIndex;
        };
        return IconChangeView;
    }(ui.guild.init.IconChangeUI));
    game.IconChangeView = IconChangeView;
})(game || (game = {}));
