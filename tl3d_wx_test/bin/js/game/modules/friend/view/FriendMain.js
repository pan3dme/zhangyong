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
    var FriendMain = /** @class */ (function (_super) {
        __extends(FriendMain, _super);
        function FriendMain() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.Friend_MainView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 12410) };
            _this.addChild(_this.bgPanel.btnClose);
            _this.tab.selectedIndex = -1;
            _this.tab.selectHandler = new Handler(_this, _this.onTab);
            return _this;
        }
        FriendMain.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tab.selectedIndex = -1;
            this.tab_friendlist.dataSource = null;
            this.tab_addfriend.dataSource = null;
            this.tab_applyfriend.dataSource = null;
        };
        FriendMain.prototype.show = function () {
            _super.prototype.show.call(this);
            this.tab.selectedIndex = this.dataSource ? this.dataSource : 0;
        };
        FriendMain.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.tab.selectedIndex = this.dataSource ? this.dataSource : 0;
        };
        FriendMain.prototype.onTab = function (index) {
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            if (index == 0) {
                this.tab_friendlist.dataSource = true;
            }
            else if (index == 1) {
                this.tab_addfriend.dataSource = true;
            }
            else {
                this.tab_applyfriend.dataSource = true;
            }
        };
        FriendMain.prototype.initFriendListView = function () {
            this.tab_friendlist.initView();
        };
        FriendMain.prototype.initApplyFriendList = function ($data) {
            this.tab_applyfriend.initFriendsList($data);
        };
        return FriendMain;
    }(ui.friend.FriendMainUI));
    game.FriendMain = FriendMain;
})(game || (game = {}));
