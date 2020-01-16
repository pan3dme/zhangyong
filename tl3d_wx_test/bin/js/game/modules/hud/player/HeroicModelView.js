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
    var HeroicModelView = /** @class */ (function (_super) {
        __extends(HeroicModelView, _super);
        function HeroicModelView() {
            return _super.call(this) || this;
        }
        HeroicModelView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.HeroicModelView, closeOnSide: this.isModelClose, title: "英雄形象" };
            this._curIndex = -1;
            this.tabBar.selectedIndex = -1;
            this.tabBar.selectHandler = new Handler(this, this.onSelect);
            this.addChild(this.bgPanel.btnClose);
        };
        HeroicModelView.prototype.close = function () {
            _super.prototype.close.call(this);
            var view = this.getView(this._curIndex);
            if (view) {
                view.close();
                view.visible = false;
            }
            this._curIndex = -1;
            this.tabBar.selectedIndex = -1;
        };
        HeroicModelView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        HeroicModelView.prototype.initView = function () {
            this.tabBar.selectedIndex = 0;
        };
        HeroicModelView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            var oldView = this.getView(this._curIndex);
            if (oldView) {
                oldView.close();
                oldView.visible = false;
            }
            this._curIndex = index;
            var newView = this.getView(this._curIndex);
            if (newView) {
                newView.show();
                newView.visible = true;
            }
            var title = index == 0 ? "英雄形象设置" : (index == 1 ? "头像设置" : "头像框设置");
            this.bgPanel.updateTitle(title);
        };
        // 获取界面
        HeroicModelView.prototype.getView = function (index) {
            var view;
            switch (index) {
                case 0:
                    if (!this._tabModelView) {
                        this._tabModelView = new game.TabChangeModelView();
                        this._tabModelView.centerX = 0;
                        this.boxContent.addChild(this._tabModelView);
                    }
                    view = this._tabModelView;
                    break;
                case 1:
                    if (!this._tabHeadView) {
                        this._tabHeadView = new game.TabChangeHeadView();
                        this._tabHeadView.centerX = 0;
                        this.boxContent.addChild(this._tabHeadView);
                    }
                    view = this._tabHeadView;
                    break;
                case 2:
                    if (!this._tabHeadBoxView) {
                        this._tabHeadBoxView = new game.TabChangeHeadBoxView();
                        this._tabHeadBoxView.centerX = 0;
                        this.boxContent.addChild(this._tabHeadBoxView);
                    }
                    view = this._tabHeadBoxView;
                    break;
            }
            return view;
        };
        return HeroicModelView;
    }(ui.hud.player.HeroicModelMainUI));
    game.HeroicModelView = HeroicModelView;
})(game || (game = {}));
