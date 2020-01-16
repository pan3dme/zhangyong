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
    var TabChangeHeadBoxView = /** @class */ (function (_super) {
        __extends(TabChangeHeadBoxView, _super);
        function TabChangeHeadBoxView() {
            return _super.call(this) || this;
        }
        TabChangeHeadBoxView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.listIcon.mouseHandler = new Handler(this, this.onSelect);
            this.listIcon.renderHandler = new Handler(this, this.onRender);
            this.btnChange.on(Laya.Event.CLICK, this, this.sure);
        };
        TabChangeHeadBoxView.prototype.close = function () {
            // super.close();
            this.listIcon.array = null;
        };
        TabChangeHeadBoxView.prototype.show = function () {
            // super.show();
            this.initView();
        };
        TabChangeHeadBoxView.prototype.initView = function () {
            this.listIcon.array = null;
            var list = tb.TB_picture_frame.getList();
            this._selectIndex = list.findIndex(function (vo) {
                return vo.ID == App.hero.headFrame;
            });
            // 按已解锁和未解锁排序
            list.sort(function (a, b) {
                var alock = a.isLock();
                var block = b.isLock();
                if (alock && block) {
                    return a.rank - b.rank;
                }
                else if (alock) {
                    return 1;
                }
                else if (block) {
                    return -1;
                }
                else {
                    return a.rank - b.rank;
                }
            });
            this.listIcon.array = list;
            this.listIcon.selectedIndex = this._selectIndex;
        };
        /** 选中 */
        TabChangeHeadBoxView.prototype.onSelect = function (event, index) {
            if (index < 0)
                return;
            if (event.type == Laya.Event.CLICK) {
                var tbData = this.listIcon.array[index];
                if (tbData.isLock()) {
                    showToast(tbData.desc);
                    this.listIcon.selectedIndex = this._selectIndex;
                    return;
                }
                this._selectIndex = this.listIcon.selectedIndex;
            }
        };
        /** 确定 */
        TabChangeHeadBoxView.prototype.sure = function () {
            var _this = this;
            var tbData = this.listIcon.array[this.listIcon.selectedIndex];
            if (!tbData || tbData.isLock()) {
                return;
            }
            var id = tbData.ID;
            if (id == App.hero.headFrame) {
                showToast(LanMgr.getLan("", 10428));
                return;
            }
            var args = {};
            args[Protocol.game_common_setPlayerHeadFrame.args.id] = id;
            PLC.request(Protocol.game_common_setPlayerHeadFrame, args, function ($data, $msg) {
                if ($data) {
                    showToast(LanMgr.getLan("", 10429));
                    App.hero.headFrame = $data.headFrame || 0;
                    _this.listIcon.refresh();
                    dispatchEvt(new game.HudEvent(game.HudEvent.SET_HEAD_FRAME));
                }
            });
        };
        TabChangeHeadBoxView.prototype.onRender = function (itemRender, index) {
            var tbHead = itemRender.dataSource;
            if (tbHead) {
                var imgFrame = itemRender.getChildByName("imgFrame");
                var img_selected = itemRender.getChildByName("imgSelected");
                var img_gou = itemRender.getChildByName("imgGou");
                var lbName = itemRender.getChildByName("lbName");
                lbName.text = tbHead.name;
                imgFrame.visible = tbHead.ID > 0;
                imgFrame.skin = tbHead.ID > 0 ? SkinUtil.getHeadFrame(tbHead.ID) : "";
                img_selected.visible = index == this.listIcon.selectedIndex;
                img_gou.visible = tbHead.ID == App.hero.headFrame;
                itemRender.gray = tbHead.isLock();
            }
            else {
            }
        };
        return TabChangeHeadBoxView;
    }(ui.hud.player.TabChangeHeadBoxUI));
    game.TabChangeHeadBoxView = TabChangeHeadBoxView;
})(game || (game = {}));
