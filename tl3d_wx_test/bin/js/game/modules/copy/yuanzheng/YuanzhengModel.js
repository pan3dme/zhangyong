var game;
(function (game) {
    var YuanzhengModel = /** @class */ (function () {
        function YuanzhengModel() {
            /** 好友支援我的英雄列表 */
            this._helpMeList = [];
            // ----------- 我的派遣 --------------
            /** 派遣列表 - 我支援好友的英雄列表 */
            this._myDispatchList = [];
            /** 是否请求派遣数据 */
            this._isRequestDis = false;
        }
        YuanzhengModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new YuanzhengModel();
            }
            return this._instance;
        };
        /** 重置 */
        YuanzhengModel.prototype.resetDataByCrossDay = function () {
            UIMgr.hideUIByName(UIConst.Yuanzheng_HelpView);
            this._isRequestDis = false;
            this._myDispatchList.length = 0;
            this._helpMeList.length;
            App.hero.copyInfo.helpGodId = [];
            App.hero.copyInfo.friendHelpList = [];
        };
        YuanzhengModel.prototype.initModel = function () {
            this.curChallengeVo = new game.YZChallengeVo();
            this._guanqiaList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_expedition).data;
            var i = 1;
            for (var key in tbData) {
                this._guanqiaList.push(new game.YZGuanqiaVo(tbData[key], i++));
            }
            this._baoxiangList = [];
            this._baoxiangList = this._guanqiaList.filter(function (vo) {
                return vo.isHasBaoxiang();
            });
            this.updateCurGuanqia();
        };
        /** 更新当前关卡 */
        YuanzhengModel.prototype.updateCurGuanqia = function () {
            var finishId = App.hero.copyInfo.expeditionId;
            var index = this._guanqiaList.findIndex(function (vo) {
                return vo.tbCopy.ID == finishId;
            });
            var curIndex = index + 1;
            this.curGuanqia = this._guanqiaList[curIndex];
            this.curChallengeVo.setGuanqiaVo(this.curGuanqia);
        };
        /** 更新数据 */
        YuanzhengModel.prototype.updateData = function (challengerInfo) {
            this.curChallengeVo.setServerInfo(challengerInfo);
        };
        /** 获取自身英雄血量
         *  向上取整
         */
        YuanzhengModel.prototype.getGodHp = function (uuid) {
            if (Number(uuid) < 0) {
                //援助
                var svo = this.getHelpItemByUuid(uuid);
                return svo && svo.godInfo[3][1];
            }
            var godVo = App.hero.getGodVoById(uuid);
            var blood = godVo.getPropertyValue(1);
            var selfHpInfo = App.hero.copyInfo.expeditionSelfHpInfo;
            if (selfHpInfo.hasOwnProperty(uuid)) {
                return Math.ceil(blood * selfHpInfo[uuid] / YuanzhengModel.BLOOD_BASE);
            }
            // logdebug('获取自身英雄血量:',uuid,godVo.tab_god.name,godVo.templateId,blood);
            return Math.ceil(blood);
        };
        /** 获取所有关卡列表 */
        YuanzhengModel.prototype.getGuanqiaList = function () {
            return this._guanqiaList;
        };
        /** 获取宝箱关卡列表 */
        YuanzhengModel.prototype.getBaoxiangList = function () {
            return this._baoxiangList;
        };
        YuanzhengModel.prototype.getGuanqiaById = function (id) {
            return this._guanqiaList.find(function (vo) {
                return vo.tbCopy.ID == id;
            });
        };
        /** 获取英雄列表（可回复或者可复活的） */
        YuanzhengModel.prototype.getGodsByRecoveryType = function (type) {
            var _this = this;
            var godsAry = App.hero.getGodAry();
            return godsAry.filter(function (vo) {
                if (vo.level < YuanzhengModel.SHANGZHEN_LEVEL) {
                    return false;
                }
                var hp = _this.getGodHp(vo.uuid);
                if (type == iface.tb_prop.expeditionOpTypeKey.revive) {
                    return hp <= 0;
                }
                else if (type == iface.tb_prop.expeditionOpTypeKey.recover) {
                    return hp > 0 && hp < vo.getPropertyValue(1);
                }
                return true;
            });
        };
        /** 获取药水消耗的钻石数 */
        YuanzhengModel.prototype.getMedicineCost = function (type) {
            var ary = tb.TB_copy_set.getCopySet().special_type_cost;
            var find = ary.find(function (vo) {
                return vo[0] == type;
            });
            return find ? find[1] : 0;
        };
        /** 是否全部通关 */
        YuanzhengModel.prototype.isAllFinish = function () {
            return this._guanqiaList.every(function (vo) {
                return vo.isPass();
            });
        };
        // ----------- 支援我的 --------------
        /** 本次战斗所使用的援助对象 */
        YuanzhengModel.prototype.setAidTag = function (aid) {
            this._aidTag = aid;
        };
        YuanzhengModel.prototype.getAidTag = function () {
            return this._aidTag;
        };
        YuanzhengModel.prototype.clearAidTag = function () {
            this._aidTag = null;
        };
        YuanzhengModel.prototype.hasAidTag = function () {
            return Boolean(this._aidTag);
        };
        YuanzhengModel.prototype.getHelpMeList = function () {
            return this._helpMeList;
        };
        /** 今日雇佣数量 */
        YuanzhengModel.prototype.getHireCount = function () {
            return this._helpMeList.filter(function (vo) {
                return vo.isHire();
            }).length;
        };
        /** 请求好友支援我的列表 */
        YuanzhengModel.prototype.requestHelpMeList = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_friendHelp_getFriendHelpList, null, function (sdata, msg) {
                    if (!sdata) {
                        resolve();
                        return;
                    }
                    var list = sdata['friendHelpList'] || [];
                    _this._helpMeList.length = 0;
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var svo = list_1[_i];
                        _this._helpMeList.push(new game.YZHelpInfoVo(svo));
                    }
                    _this._helpMeList.sort(function (a, b) {
                        return b.force - a.force;
                    });
                    resolve();
                });
            });
        };
        /** 添加雇佣信息 */
        YuanzhengModel.prototype.addHireInfo = function (addInfo) {
            if (!addInfo)
                return;
            App.hero.copyInfo.friendHelpList.push(addInfo);
        };
        /** 获取我的雇佣神灵列表  */
        YuanzhengModel.prototype.getMyHireList = function () {
            var godList = [];
            var list = App.hero.copyInfo.friendHelpList || [];
            for (var i = 0; i < list.length; i++) {
                var uuid = (-1 - i) + "";
                if (App.hero.copyInfo.expeditionSelfHpInfo.hasOwnProperty(uuid) && App.hero.copyInfo.expeditionSelfHpInfo[uuid] <= 0)
                    continue;
                var helpVo = list[i];
                var obj = helpVo.godInfo;
                var tbGod = tb.TB_god.get_TB_godById(obj[0]);
                var godVo = new GodItemVo(tbGod);
                // [templateId, starLv, level, attrs, degree, awakenLv, skinId]
                godVo.starLevel = obj[1];
                godVo.level = obj[2];
                godVo.degree = obj[4];
                if (obj[3]) {
                    godVo.iSeverAttri = map2ary(obj[3]);
                }
                godVo.uuid = uuid;
                godVo.fightPower = helpVo.force;
                godVo.isAid = true;
                godList.push(godVo);
            }
            return godList;
        };
        YuanzhengModel.prototype.getHelpItemByUuid = function (uuid) {
            var id = Math.abs(Number(uuid)) - 1;
            return App.hero.copyInfo.friendHelpList[id] || null;
        };
        YuanzhengModel.prototype.getMyDispatchList = function () {
            return this._myDispatchList;
        };
        /** 添加派遣英雄数据 */
        YuanzhengModel.prototype.addDispatchInfo = function (addHelpGodId, svo) {
            App.hero.copyInfo.helpGodId.push(addHelpGodId);
            var vo = new game.YZHelpInfoVo(svo);
            vo.godVo.uuid = addHelpGodId + "";
            this._myDispatchList.push(vo);
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.YZ_DISPATCH_SUCC));
            return vo;
        };
        /** 请求我支援好友的英雄列表 */
        YuanzhengModel.prototype.requestDispatchList = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this._isRequestDis) {
                    resolve();
                    return;
                }
                PLC.request(Protocol.friend_friendHelp_getMyFriendHelpList, null, function (sdata, msg) {
                    if (!sdata) {
                        return;
                    }
                    _this._isRequestDis = true;
                    var list = sdata['friendHelpList'] || [];
                    _this._myDispatchList.length = 0;
                    for (var i = 0; i < list.length; i++) {
                        var vo = new game.YZHelpInfoVo(list[i]);
                        vo.godVo.uuid = App.hero.copyInfo.helpGodId[i];
                        _this._myDispatchList.push(vo);
                    }
                    resolve();
                });
            });
        };
        /** 是否派遣某神灵 */
        YuanzhengModel.prototype.isDispatch = function (uuid) {
            var ids = App.hero.copyInfo.helpGodId || [];
            return ids.indexOf(uuid) != -1;
        };
        /** 获取派遣数量 */
        YuanzhengModel.prototype.getDispatchNum = function () {
            var ids = App.hero.copyInfo.helpGodId || [];
            return ids.length;
        };
        YuanzhengModel.SHANGZHEN_LEVEL = 30; // 上阵最低等级
        YuanzhengModel.BLOOD_BASE = 10000; // 血量万分比计算
        return YuanzhengModel;
    }());
    game.YuanzhengModel = YuanzhengModel;
})(game || (game = {}));
