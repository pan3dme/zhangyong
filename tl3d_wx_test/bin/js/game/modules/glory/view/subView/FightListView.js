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
    var gloryFightListView = /** @class */ (function (_super) {
        __extends(gloryFightListView, _super);
        function gloryFightListView() {
            var _this = _super.call(this) || this;
            _this._itemList = [];
            for (var i = 1; i <= 16; i++) {
                var item = _this["userBox" + i];
                _this._itemList.push(item);
            }
            _this.btn2_1.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_1, 2, 1]); // [1,16]
            _this.btn2_2.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_2, 2, 8]); // [8,9]
            _this.btn2_3.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_3, 2, 4]); // [4,13]
            _this.btn2_4.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_4, 2, 5]); // [5,12]
            _this.btn2_5.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_5, 2, 2]); // [2,15]
            _this.btn2_6.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_6, 2, 7]); // [7,10]
            _this.btn2_7.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_7, 2, 3]); // [3,14]
            _this.btn2_8.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn2_8, 2, 6]); // [6,11]
            _this.btn3_1.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn3_1, 3, 1]); // [1,16,8,9]
            _this.btn3_2.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn3_2, 3, 4]); // [4,13,5,12]
            _this.btn3_3.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn3_3, 3, 2]); // [2,15,7,10]
            _this.btn3_4.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn3_4, 3, 3]); // [3,14,6,11]
            _this.btn4_1.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn4_1, 4, 1]); // [1,16,8,9,4,13,5,12]
            _this.btn4_2.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn4_2, 4, 2]); // [2,15,7,10,3,14,6,11]
            _this.btn5.on(Laya.Event.CLICK, _this, _this.onClick, [_this.btn5, 5, 1]); // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            _this.gjHead.on(Laya.Event.CLICK, _this, _this.onLineup);
            _this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GLORY_FIGHT, 1);
            return _this;
        }
        gloryFightListView.prototype.show = function (val) {
            this.dataSource = val;
            this.initView();
        };
        gloryFightListView.prototype.close = function () {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dataSource = null;
            }
        };
        Object.defineProperty(gloryFightListView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (val) {
                this._dataSource = val;
            },
            enumerable: true,
            configurable: true
        });
        gloryFightListView.prototype.initView = function () {
            var info = this.dataSource;
            var list = info.getMatchList();
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dataSource = list[i];
            }
            var guanJunVo = info.getGuanjun();
            this.boxGj.visible = guanJunVo ? true : false;
            this.lbDesc.visible = guanJunVo ? false : true;
            this.lbDesc.text = "" + (info.honorType == game.GroupType.benfu ? LanMgr.getLan("", 12401) : LanMgr.getLan("", 12402)) + LanMgr.getLan("", 12403);
            this.imgWangguan.y = guanJunVo ? 235 : 400;
            if (guanJunVo) {
                this.gjHead.dataSource = guanJunVo.headVo;
                this.gjName.text = guanJunVo.name;
                this.gjShenli.text = LanMgr.getLan("", 10117, guanJunVo.force);
            }
            else {
                this.gjHead.dataSource = null;
            }
            this.renderLine();
            this.renderBtnState();
        };
        /** 线路绘制 */
        gloryFightListView.prototype.renderLine = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var honorType = info.honorType;
            var imgDic = {
                "2": { "user1": [1], "user2": [2], "user3": [3], "user4": [4], "user5": [5], "user6": [6], "user7": [7], "user8": [8], "user9": [9], "user10": [10], "user11": [11], "user12": [12], "user13": [13], "user14": [14], "user15": [15], "user16": [16] },
                "3": { "user3_1": [1, 16], "user3_2": [8, 9], "user3_3": [4, 13], "user3_4": [5, 12], "user3_5": [2, 15], "user3_6": [7, 10], "user3_7": [3, 14], "user3_8": [6, 11] },
                "4": { "user4_1": [1, 16, 8, 9], "user4_2": [4, 13, 5, 12], "user4_3": [2, 15, 7, 10], "user4_4": [3, 14, 6, 11] },
                "5": { "user5_1": [1, 16, 8, 9, 4, 13, 5, 12], "user5_2": [2, 15, 7, 10, 3, 14, 6, 11] },
            };
            for (var key in imgDic) {
                var group = Number(key);
                // 当时跨服对决时，阶段转换成 7,8,9,10
                if (honorType == game.GroupType.kuafu) {
                    group += 5;
                }
                var obj = imgDic[key];
                for (var imgVal in obj) {
                    this[imgVal].visible = info.isWin(group, obj[imgVal]);
                }
            }
        };
        /** 渲染按钮状态 */
        gloryFightListView.prototype.renderBtnState = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var honorType = info.honorType;
            var btnDic = {
                "2": { "btn2_1": [1, 16], "btn2_2": [8, 9], "btn2_3": [4, 13], "btn2_4": [5, 12], "btn2_5": [2, 15], "btn2_6": [7, 10], "btn2_7": [3, 14], "btn2_8": [6, 11] },
                "3": { "btn3_1": [1, 16, 8, 9], "btn3_2": [4, 13, 5, 12], "btn3_3": [2, 15, 7, 10], "btn3_4": [3, 14, 6, 11] },
                "4": { "btn4_1": [1, 16, 8, 9, 4, 13, 5, 12], "btn4_2": [2, 15, 7, 10, 3, 14, 6, 11] },
                "5": { "btn5": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
            };
            for (var key in btnDic) {
                var group = Number(key);
                // 当时跨服对决时，阶段转换成 7,8,9,10
                if (honorType == game.GroupType.kuafu) {
                    group += 5;
                }
                var obj = btnDic[key];
                // 是否结束
                var isEnd = info.isEnd(group);
                // 是否当前
                var isCur = game.GloryModel.getInstance().updateCurGroup() == group;
                for (var btnVal in obj) {
                    var btn = this[btnVal];
                    var imgRp = this[btnVal.replace("btn", "rp")];
                    imgRp.visible = false;
                    if (isEnd) {
                        btn.visible = true;
                        btn.skin = SkinUtil.btn_fangdajing;
                        btn.stateNum = 1;
                    }
                    else {
                        if (isCur) {
                            var canBet = game.GloryUtil.isInBetTime(group);
                            btn.visible = true;
                            var hasBet = info.getBetType(group, obj[btnVal]) != 0;
                            if (!canBet || hasBet) {
                                btn.skin = SkinUtil.btn_vs;
                                btn.stateNum = 1;
                            }
                            else {
                                imgRp.visible = true;
                                btn.skin = SkinUtil.btn_bet;
                                btn.stateNum = 1;
                            }
                        }
                        else {
                            btn.visible = false;
                        }
                    }
                }
            }
        };
        gloryFightListView.prototype.onClick = function (btn, group, pos) {
            var info = this.dataSource;
            if (!info)
                return;
            var skin = btn.skin;
            if (skin == SkinUtil.btn_fangdajing || skin == SkinUtil.btn_bet || skin == SkinUtil.btn_vs) {
                var honorType = info.honorType;
                // 当时跨服对决时，阶段转换成 7,8,9,10
                if (honorType == game.GroupType.kuafu) {
                    group += 5;
                }
                // 后端的位置从0开始
                game.GloryThread.requestWarInfo(info, group, pos - 1).then(function (info) {
                    if (info) {
                        UIMgr.showUI(UIConst.GloryGroupView, info);
                    }
                });
            }
        };
        gloryFightListView.prototype.onLineup = function () {
            var info = this.dataSource;
            var guanJunVo = info ? info.getGuanjun() : null;
            if (guanJunVo) {
                game.GloryThread.requestUserLineup(guanJunVo).then(function () {
                    dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_LINEUP_VIEW), guanJunVo);
                });
            }
        };
        return gloryFightListView;
    }(ui.glory.FightListUI));
    game.gloryFightListView = gloryFightListView;
})(game || (game = {}));
