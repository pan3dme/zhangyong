var common;
(function (common) {
    /** 选项卡界面切换
     *  注意：因为没有监听界面移除的事件,所以需手动调用viewDispose方法,清除当前界面状态,防止重新打开时没有重新渲染界面
     */
    var TabListOperate = /** @class */ (function () {
        function TabListOperate(tabList, container) {
            /** 视图列表数据 */
            this._dataList = [];
            /** 视图集 */
            this._viewMap = {};
            this._tab = tabList;
            this._parentContainer = container;
            if (this._tab instanceof common.ListBase) {
                this._tab.verifyHandler = new Handler(this, this.onVerifyCallback);
            }
            this._tab.selectHandler = new Handler(this, this.onSelectHandler);
        }
        /** 添加选项卡数据 */
        TabListOperate.prototype.addTabItem = function (info) {
            if (this.isExist(info.viewName)) {
                logerror("重复添加视图数据失败", info.viewName);
                return;
            }
            this._dataList.push(info);
            return this;
        };
        /** 设置数据源 */
        TabListOperate.prototype.setTabItemist = function (ary) {
            this._dataList.length = 0;
            for (var i = 0; i < ary.length; i++) {
                this.addTabItem(ary[i]);
            }
        };
        /** 是否验证通过 */
        TabListOperate.prototype.onVerifyCallback = function (index) {
            var item = this._dataList[index];
            if (item && item.onSelectVerify) {
                return item.onSelectVerify();
            }
            return true;
        };
        /** 选中回调 */
        TabListOperate.prototype.onSelectHandler = function (index) {
            var tabInfo = this._dataList[index];
            if (!tabInfo || !tabInfo.viewClz)
                return;
            if (tabInfo.onSelectBefore) {
                tabInfo.onSelectBefore(this.selectTabItem.bind(this, tabInfo));
            }
            else {
                this.selectTabItem(tabInfo);
            }
        };
        /** 选中选项卡界面：创建界面、显示隐藏界面 */
        TabListOperate.prototype.selectTabItem = function (tabInfo) {
            if (!tabInfo.viewClz) {
                logerror("没有设置视图类", tabInfo.viewName);
                return;
            }
            if (!this._viewMap.hasOwnProperty(tabInfo.viewName)) {
                this._viewMap[tabInfo.viewName] = this.createView(tabInfo);
                this._viewMap[tabInfo.viewName].visible = false;
            }
            for (var key in this._viewMap) {
                var view = this._viewMap[key];
                var oldVisible = view.visible;
                var newVisible = key == tabInfo.viewName;
                // 设置界面数据源
                if (newVisible) {
                    this._selectedName = tabInfo.viewName;
                    if (!view.dataSource || view.dataSource != tabInfo.dataSource) {
                        view.dataSource = tabInfo.dataSource;
                    }
                }
                // 渲染界面，切换界面
                if (oldVisible != newVisible) {
                    if (newVisible && tabInfo.onShow) {
                        tabInfo.onShow(view);
                    }
                    else if (!newVisible && tabInfo.onHide) {
                        tabInfo.onHide(view);
                    }
                }
                view.visible = newVisible;
            }
            if (tabInfo.onSelectAfter) {
                tabInfo.onSelectAfter();
            }
        };
        /** 创建视图 */
        TabListOperate.prototype.createView = function (tabInfo) {
            var view = new tabInfo.viewClz();
            view.name = tabInfo.viewName;
            view.dataSource = tabInfo.dataSource;
            if (tabInfo.onCreated) {
                tabInfo.onCreated(view);
            }
            this._parentContainer.addChild(view);
            return view;
        };
        /** 更新视图并且更新数据 */
        TabListOperate.prototype.updateItemByName = function (viewName, data) {
            var info = this.getViewInfoByName(viewName);
            if (!info)
                return;
            info.dataSource = data;
            var view = this.getViewByName(viewName);
            if (view) {
                view.dataSource = data;
            }
            info.onShow && info.onShow(view);
        };
        /** 刷新视图不更新数据 */
        TabListOperate.prototype.refreshItemByItem = function (viewName) {
            var info = this.getViewInfoByName(viewName);
            if (!info)
                return;
            var view = this.getViewByName(viewName);
            info.onShow && info.onShow(view);
        };
        /** 获取界面 */
        TabListOperate.prototype.getViewByName = function (viewName) {
            return this._viewMap[viewName];
        };
        /** 获取选项数据：TabOperateInfo */
        TabListOperate.prototype.getViewInfoByName = function (viewName) {
            return this._dataList.find(function (vo) {
                return vo.viewName == viewName;
            });
        };
        /** 通过界面名称获取索引 */
        TabListOperate.prototype.getViewIndex = function (viewName) {
            return this._dataList.findIndex(function (vo) {
                return vo.viewName == viewName;
            });
        };
        /** 通过索引获取界面名称 */
        TabListOperate.prototype.getViewName = function (index) {
            var info = this._dataList[index];
            return info ? info.viewName : null;
        };
        /** 获取当前选中界面名称 */
        TabListOperate.prototype.getSelectedName = function () {
            return this._selectedName;
        };
        /** 移除视图数据 */
        TabListOperate.prototype.removeTabItem = function (viewName) {
            var view = this._viewMap[viewName];
            if (view) {
                view.removeSelf();
            }
            this._viewMap[viewName] = null;
            delete this._viewMap[viewName];
            var index = this._dataList.findIndex(function (vo) {
                return vo.viewName == viewName;
            });
            if (index != -1) {
                this._dataList.splice(index, 1);
            }
        };
        /** 是否存在 */
        TabListOperate.prototype.isExist = function (viewName) {
            return this._dataList.some(function (vo) {
                return vo.viewName == viewName;
            });
        };
        /** 获取界面数量 */
        TabListOperate.prototype.getViewNum = function () {
            return this._dataList.length;
        };
        /** 清除选择 */
        TabListOperate.prototype.clearSelected = function () {
            this._tab.selectedIndex = -1;
            this._selectedName = null;
            for (var viewName in this._viewMap) {
                if (this._viewMap[viewName]) {
                    this._viewMap[viewName].visible = false;
                }
            }
        };
        /** 界面释放 */
        TabListOperate.prototype.viewDispose = function () {
            for (var _i = 0, _a = this._dataList; _i < _a.length; _i++) {
                var info = _a[_i];
                var view = this.getViewByName(info.viewName);
                if (info.onClosed) {
                    info.onClosed(view);
                }
            }
            this.clearSelected();
        };
        /** 释放后再次使用需要重新设置数据源列表 */
        TabListOperate.prototype.realDispose = function () {
            for (var _i = 0, _a = this._dataList; _i < _a.length; _i++) {
                var info = _a[_i];
                var view = this.getViewByName(info.viewName);
                if (info.onClosed) {
                    info.onClosed(view);
                }
            }
            this._dataList.length = 0;
            this._viewMap = {};
            this._selectedName = null;
            this._parentContainer.removeChildren();
        };
        return TabListOperate;
    }());
    common.TabListOperate = TabListOperate;
})(common || (common = {}));
