var common;
(function (common) {
    /** 简易按钮选项切换 */
    var CustomTabBar = /** @class */ (function () {
        function CustomTabBar() {
            this._buttonList = [];
            this._selectedIndex = -1;
            this._buttonList = [];
        }
        Object.defineProperty(CustomTabBar.prototype, "buttons", {
            /** 设置按钮组 */
            set: function (list) {
                this._buttonList = list;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var btn = list_1[_i];
                    btn.on(Laya.Event.CLICK, this, this.onSelected);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomTabBar.prototype, "buttonsData", {
            /** 设置按钮数据 */
            set: function (value) {
                this._buttonsData = value;
                for (var i = 0, len = this._buttonList.length; i < len; i++) {
                    if (value[i] && value[i].name) {
                        this._buttonList[i].label = value[i].name;
                    }
                }
                this.updateLockState();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomTabBar.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                var _this = this;
                if (value >= this._buttonList.length) {
                    return;
                }
                if (this._selectedIndex == value) {
                    return;
                }
                var buttonData = this.getButtonData(value);
                /** 判断是否需要检测选择的tab是否开启，为false表示未开启，就不选择 */
                if (buttonData && buttonData.openHandler) {
                    if (buttonData.openHandler instanceof Laya.Handler) {
                        if (!buttonData.openHandler.run()) {
                            if (buttonData.prompt) {
                                showToast(buttonData.prompt);
                            }
                        }
                        else {
                            this.doSelectedIndex(value);
                        }
                        return;
                    }
                    else if (buttonData.openHandler instanceof Promise) {
                        buttonData.openHandler.then(function (open) {
                            if (!open) {
                                if (buttonData.prompt) {
                                    showToast(buttonData.prompt);
                                }
                            }
                            else {
                                _this.doSelectedIndex(value);
                            }
                        });
                    }
                }
                else {
                    this.doSelectedIndex(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        CustomTabBar.prototype.doSelectedIndex = function (value) {
            this._selectedIndex = value;
            this.updateSelectState();
            this.runHandler();
        };
        Object.defineProperty(CustomTabBar.prototype, "selectHandler", {
            /** 设置选中时回调函数 */
            set: function (Handler) {
                this._selectHandler = Handler;
            },
            enumerable: true,
            configurable: true
        });
        /** 执行函数 */
        CustomTabBar.prototype.runHandler = function () {
            var index = this._selectedIndex;
            if (index == -1)
                return;
            if (this._selectHandler) {
                this._selectHandler.runWith([index]);
            }
        };
        /** 选中按钮 */
        CustomTabBar.prototype.onSelected = function (event) {
            var btn = event.target;
            var index = this._buttonList.indexOf(btn);
            this.selectedIndex = index;
        };
        /** 更新选中状态 */
        CustomTabBar.prototype.updateSelectState = function () {
            var len = this._buttonList.length;
            for (var i = 0; i < len; i++) {
                this._buttonList[i].selected = i == this._selectedIndex;
            }
        };
        /** 更新按钮的锁定状态 */
        CustomTabBar.prototype.updateLockState = function () {
            var len = this._buttonList.length;
            var _loop_1 = function (i) {
                var btn = this_1._buttonList[i];
                var btnData = this_1.getButtonData(i);
                if (!btnData)
                    return "continue";
                var type = btnData.openTye;
                if (type == BtnOpenType.gray) {
                    if (btnData.openHandler instanceof Laya.Handler) {
                        btn.gray = !btnData.openHandler.run();
                    }
                    else if (btnData.openHandler instanceof Promise) {
                        btnData.openHandler.then(function (open) {
                            btn.gray = !open;
                        });
                    }
                    else {
                        btn.gray = false;
                    }
                }
                else if (type == BtnOpenType.visible) {
                    var lockComp = btn['imgLock'];
                    if (!lockComp)
                        return "continue";
                    if (btnData.openHandler instanceof Laya.Handler) {
                        btn.gray = !btnData.openHandler.run();
                    }
                    else if (btnData.openHandler instanceof Promise) {
                        btnData.openHandler.then(function (open) {
                            btn.gray = !open;
                        });
                    }
                    else {
                        lockComp.visible = false;
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
        };
        /** 获取按钮数据 */
        CustomTabBar.prototype.getButtonData = function (index) {
            return this._buttonsData ? this._buttonsData[index] : null;
        };
        CustomTabBar.prototype.onClose = function () {
            for (var _i = 0, _a = this._buttonList; _i < _a.length; _i++) {
                var btn = _a[_i];
                btn.off(Laya.Event.CLICK, this, this.onSelected);
            }
            this._buttonList.length = 0;
            this._buttonsData = null;
            this._selectHandler = null;
            this._selectedIndex = -1;
        };
        return CustomTabBar;
    }());
    common.CustomTabBar = CustomTabBar;
    /** 按钮开启状态的设置类型 */
    var BtnOpenType;
    (function (BtnOpenType) {
        BtnOpenType[BtnOpenType["none"] = 0] = "none";
        BtnOpenType[BtnOpenType["gray"] = 1] = "gray";
        BtnOpenType[BtnOpenType["visible"] = 2] = "visible"; // 锁visible
    })(BtnOpenType = common.BtnOpenType || (common.BtnOpenType = {}));
})(common || (common = {}));
