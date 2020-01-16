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
    var GodMainView = /** @class */ (function (_super) {
        __extends(GodMainView, _super);
        function GodMainView() {
            var _this = _super.call(this) || this;
            _this._initIndex = -1;
            _this.group = UIConst.hud_group;
            return _this;
        }
        GodMainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.roleList.mouseHandler = new Handler(this, this.onMouseClick);
            this.roleList.renderHandler = new Handler(this, this.onRender);
            this.roleList.selectedIndex = -1;
            this._curIdx = -1;
            this.godView.visible = false;
        };
        GodMainView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.godView.height = h;
            this.boxList.y = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
        };
        //打开面板
        GodMainView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.godView.toOpen();
            this._initIndex = this.dataSource && isNaN(this.dataSource[1]) ? -1 : this.dataSource[1];
            var godUuid = this.dataSource ? this.dataSource[0] : null;
            var ary = game.GodModel.getInstance().getViewGods();
            var len = ary.filter(function (vo) {
                return vo.godVo;
            }).length;
            this.roleList.array = ary;
            this.godView.visible = len > 0;
            var index = ary.findIndex(function (vo) {
                return vo && vo.godVo && vo.godVo.uuid == godUuid;
            });
            // 打开英雄界面又有英雄，没有上阵，打开英雄就打开布阵界面
            if (len <= 0 && App.hero.getGodArr().length > 0) {
                this.godView.onBuzhen();
            }
            this.setGodSelectIndex(index != -1 ? index : 0);
            var topy = GameUtil.isFullScreen() ? (5 + game.HudModel.TOP_ADD_HEIGHT) : 5;
            UIUtil.boxUpDownTween(this.boxList, -this.boxList.height, topy, false, 310, 0.1);
            var targetY = this.godView.height - this.godView.boxBottom.height - 80;
            UIUtil.boxUpDownTween(this.godView.boxBottom, targetY + this.godView.boxBottom.height, targetY, true, 310, 0.05);
            this.godView.btnChange.visible = this.godView.btn_gh.visible = this.godView.btnBuzhen.visible = true;
        };
        Object.defineProperty(GodMainView.prototype, "curVo", {
            get: function () {
                return this.godView.curVo;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 选择英雄
         * @param index
         * @param newModel 是否刷新模型 可用于区分打开界面、切换英雄和对英雄进行操作（升级升阶） 进行操作的时候不刷新模型
         */
        GodMainView.prototype.onMouseClick = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                if (index == -1)
                    return;
                var info = this.roleList.array[index];
                if (!info)
                    return;
                if (!game.GodUtils.isUnlock(info.pos, App.hero.level)) {
                    this.roleList.selectedIndex = this._curIdx;
                    showToast(LanMgr.getLan("", 10158, game.GodUtils.getUnlockLv(info.pos)));
                    return;
                }
                if (!info.godVo) {
                    if (!game.GodUtils.isCanBuzhen()) {
                        showToast(LanMgr.getLan("", 10372));
                        return;
                    }
                    dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_REPLACE_VIEW));
                    return;
                }
                if (index == this._curIdx) {
                    return;
                }
                this.setGodSelectIndex(index, true);
            }
        };
        /** 设置神灵列表索引 */
        GodMainView.prototype.setGodSelectIndex = function (index, newModel) {
            if (newModel === void 0) { newModel = true; }
            var info = this.roleList.array[index];
            if (!info || !info.godVo)
                return;
            this._curIdx = index;
            this.roleList.selectedIndex = index;
            this.selectGod(info, newModel);
        };
        /** 选中神灵 */
        GodMainView.prototype.selectGod = function (info, newModel) {
            if (newModel === void 0) { newModel = true; }
            this.godView.curVo = info.godVo;
            dispatchEvt(new game.GodEvent(game.GodEvent.SELECT_GOD_EVENT));
            var curTabIndex = this.godView.tabList.selectedIndex;
            if (this._initIndex != -1) {
                curTabIndex = this._initIndex;
                this._initIndex = -1;
            }
            if (curTabIndex != -1) {
                this.godView.onSetIndex(curTabIndex);
            }
            else {
                this.godView.tabList.selectedIndex = 0;
            }
            if (info.godVo) {
                this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHENLING, info.godVo.tab_god.race_type);
            }
        };
        /* 渲染英雄列表 */
        GodMainView.prototype.onRender = function (cell, index) {
            var info = cell.dataSource;
            cell.redPoint.onDispose();
            if (info) {
                if (info.godVo) {
                    cell.redPoint.setRedPointName("attack_linuep_god_" + info.godVo.uuid);
                }
                else if (game.GodUtils.isUnlock(info.pos, App.hero.level)) {
                    cell.redPoint.setRedPointName("shenling_buzhen_group");
                }
            }
        };
        /**
         * 布阵完成重新刷新列表
         * @param sort 重新排序
         */
        GodMainView.prototype.refreshRoles = function () {
            var lineupVo = this.roleList.selectedItem;
            var gods = game.GodModel.getInstance().getViewGods();
            var index = gods.findIndex(function (vo) {
                return lineupVo && vo.godVo && lineupVo.godVo && vo.godVo.uuid == lineupVo.godVo.uuid;
            });
            // 不影响到当前神灵，不刷新界面
            var isRefresh = index == -1;
            this.roleList.array = gods;
            var len = gods.filter(function (vo) {
                return vo.godVo;
            }).length;
            this.godView.visible = len > 0;
            index = index != -1 ? index : 0;
            this.setGodSelectIndex(index, isRefresh);
        };
        /** 刷新列表中的某一个数据 */
        GodMainView.prototype.refreshRolesByGod = function (godVo, refresh) {
            if (refresh === void 0) { refresh = false; }
            if (!godVo)
                return;
            if (!godVo || !this.godView.curVo)
                return;
            if (this.godView.curVo.uuid == godVo.uuid) {
                this.godView.updateView();
                this.godView.refreshCurRole();
            }
            this.roleList.refresh();
        };
        /**
         * 替换或者上阵英雄
         * @param originGod 存在表示替换英雄，否则是新增上阵英雄
         * @param replaceGod 要上阵的英雄
         */
        GodMainView.prototype.changeRole = function (originGod, replaceGod) {
            var curGods = this.roleList.array;
            // 找出要替换的位置
            var item = curGods.find(function (vo) {
                if (originGod) {
                    return vo && vo.godVo && vo.godVo.uuid == originGod.uuid;
                }
                else {
                    return vo && !vo.godVo;
                }
            });
            var index = this.roleList.array.indexOf(item);
            if (index != -1) {
                var obj = { pos: item.pos, godVo: replaceGod };
                this.roleList.array[index] = obj;
                this.setGodSelectIndex(index, true);
                this.roleList.refresh();
            }
        };
        /** 关闭面板 */
        GodMainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.godView.toClose();
            this.godView.btnChange.visible = false;
            this.roleList.array = null;
            this.roleList.selectedIndex = -1;
            this._curIdx = -1;
        };
        /** 获取可以布阵的列表选项 */
        GodMainView.prototype.getCanShangzhenIR = function () {
            var cells = this.roleList.cells;
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                var vo = cell.dataSource;
                if (vo && !vo.godVo && game.GodUtils.isUnlock(vo.pos, App.hero.level)) {
                    return cell;
                }
            }
            return null;
        };
        Object.defineProperty(GodMainView.prototype, "list_tab", {
            get: function () {
                return this.godView.tabList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodMainView.prototype, "viewInfo", {
            get: function () {
                return this.godView.viewInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodMainView.prototype, "viewJuexing", {
            get: function () {
                return this.godView.viewJuexing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodMainView.prototype, "viewStarup", {
            get: function () {
                return this.godView.viewStarup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodMainView.prototype, "viewRonghun", {
            get: function () {
                return this.godView.viewRonghun;
            },
            enumerable: true,
            configurable: true
        });
        return GodMainView;
    }(ui.god.NewGodMainUI));
    game.GodMainView = GodMainView;
})(game || (game = {}));
