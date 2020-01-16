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
    var TabChangeHeadView = /** @class */ (function (_super) {
        __extends(TabChangeHeadView, _super);
        function TabChangeHeadView() {
            var _this = _super.call(this) || this;
            _this._selectIndex = 0;
            return _this;
        }
        TabChangeHeadView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.listIcon.mouseHandler = new Handler(this, this.onSelect);
            this.listIcon.renderHandler = new Handler(this, this.onRender);
            this.btnChange.on(Laya.Event.CLICK, this, this.sure);
        };
        TabChangeHeadView.prototype.close = function () {
            // super.close();
            this.listIcon.array = null;
        };
        TabChangeHeadView.prototype.show = function () {
            // super.show();
            this.initView();
        };
        TabChangeHeadView.prototype.initView = function () {
            //将表中的图标数据读出来
            var list = [];
            var arrGameGods = [];
            var GameGods_obj = TableData.getInstance().getTableByName(TableData.tb_god).data;
            for (var key in GameGods_obj) {
                if (GameGods_obj[key]) {
                    arrGameGods.push(GameGods_obj[key]);
                }
            }
            var headIconVo;
            var _loop_1 = function (i) {
                var isLock = !(App.hero.godAlbum.some(function (vo) { return vo == arrGameGods[i].ID; }) || arrGameGods[i].ID == common.GlobalData.DEFAULT_HEAD);
                headIconVo = new game.HeadIconVo(arrGameGods[i].ID, arrGameGods[i], isLock);
                list.push(headIconVo);
            };
            for (var i = 0; i < arrGameGods.length; i++) {
                _loop_1(i);
            }
            // 按已解锁和未解锁排序
            list.sort(function (a, b) {
                if (a.isLock && b.isLock) {
                    return a.headId - b.headId;
                }
                else if (a.isLock) {
                    return 1;
                }
                else if (b.isLock) {
                    return -1;
                }
                else {
                    return a.headId - b.headId;
                }
            });
            this._selectIndex = list.findIndex(function (vo) {
                return vo.headId == App.hero.getHeadId();
            });
            this._selectIndex = this._selectIndex < 0 ? 0 : this._selectIndex;
            this.listIcon.array = list;
            this.listIcon.selectedIndex = this._selectIndex;
        };
        /** 选中 */
        TabChangeHeadView.prototype.onSelect = function (event, index) {
            if (index < 0)
                return;
            if (event.type == Laya.Event.CLICK) {
                if (this.listIcon.array[index].isLock) {
                    showToast(LanMgr.getLan("", 10430, this.listIcon.array[index].name));
                    this.listIcon.selectedIndex = this._selectIndex;
                    return;
                }
                this._selectIndex = this.listIcon.selectedIndex;
            }
        };
        /** 确定 */
        TabChangeHeadView.prototype.sure = function () {
            var _this = this;
            var headIconVo = this.listIcon.array[this.listIcon.selectedIndex];
            if (headIconVo.isLock) {
                //虽然不会走到这一步，还是防下比较安拉
                return;
            }
            var id = headIconVo.headId;
            if (id == App.hero.getHeadId()) {
                showToast(LanMgr.getLan("", 10431));
                return;
            }
            var args = {};
            args[Protocol.game_common_setPlayerHead.args.headId] = id;
            PLC.request(Protocol.game_common_setPlayerHead, args, function ($data, $msg) {
                if ($data) {
                    showToast(LanMgr.getLan("", 10432));
                    App.hero.setHeadId($data.head);
                    dispatchEvt(new game.HudEvent(game.HudEvent.SET_HEAD_ICON));
                    _this.listIcon.refresh();
                }
            });
        };
        TabChangeHeadView.prototype.onRender = function (itemRender, index) {
            var headIconVo = itemRender.dataSource;
            if (!headIconVo)
                return;
            itemRender.img_selected.visible = index == this.listIcon.selectedIndex;
            var box_icon = itemRender.box_icon;
            var img_icon = itemRender.img_icon;
            var img_zz = itemRender.img_zz;
            img_zz.visible = headIconVo.headId == App.hero.getHeadId();
            var img_gou = itemRender.img_gou;
            img_gou.visible = headIconVo.headId == App.hero.getHeadId();
            if (headIconVo) {
                img_icon.skin = headIconVo.headIcon;
                itemRender.gray = headIconVo.isLock;
            }
            if (!box_icon.mask) {
                UIUtil.createHeadMask(box_icon, box_icon.width / 2);
            }
        };
        return TabChangeHeadView;
    }(ui.hud.player.TabChangeHeadUI));
    game.TabChangeHeadView = TabChangeHeadView;
})(game || (game = {}));
