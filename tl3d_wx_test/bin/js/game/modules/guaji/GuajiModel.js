/**
* name
*/
var game;
(function (game) {
    var GuajiBtnState;
    (function (GuajiBtnState) {
        GuajiBtnState[GuajiBtnState["CANBOSS"] = 0] = "CANBOSS";
        GuajiBtnState[GuajiBtnState["TIME"] = 1] = "TIME";
        GuajiBtnState[GuajiBtnState["FIGHTING"] = 2] = "FIGHTING";
        GuajiBtnState[GuajiBtnState["MAP"] = 3] = "MAP";
        GuajiBtnState[GuajiBtnState["OPEN"] = 4] = "OPEN";
        GuajiBtnState[GuajiBtnState["JINGYING"] = 5] = "JINGYING";
    })(GuajiBtnState = game.GuajiBtnState || (game.GuajiBtnState = {}));
    var GuajiModel = /** @class */ (function () {
        function GuajiModel() {
            /** 章节是否初始化 */
            this.inited = false;
            // private _currentZhangjie: ZhangjieVo;
            // public set currentZhangjie(val) {
            // 	this._currentZhangjie = val;
            // }
            // public get currentZhangjie(): ZhangjieVo {
            // 	return this._currentZhangjie
            // }
            /** 是否在后台 */
            this.isEnable = false;
            /** 是否在挑战 */
            this.isFight = false;
            /** 是否有阵容变化 */
            // public isRefresh: boolean = false;
            /** 最高章节 */
            this.maxZhangjie = null;
            /** 新章节解锁 0:没有 xxx:章节id*/
            this.newOpen = 0;
            /** 移动状态 */
            this.moveState = false;
            this.copyName = ["", "普通", "困难", "地狱"];
            this.arrSubType = ["简单", "困难", "地狱"];
        }
        GuajiModel.getInstance = function () {
            if (!GuajiModel._instance) {
                GuajiModel._instance = new GuajiModel();
            }
            return GuajiModel._instance;
        };
        GuajiModel.prototype.initModel = function () {
            this.newOpen = 0;
            this.zhangjieList = new Array();
            this._copyList = tb.TB_copy.fuwenFuben;
            var len = this._copyList.length;
            for (var i = 0; i < len; i++) {
                var $item = this._copyList[i];
                var zhangjie = new game.ZhangjieVo($item);
                if (!this.currentZhangjie) {
                    //初始化当前章节 第一次进来的情况
                    this.maxZhangjie = this.currentZhangjie = zhangjie;
                }
                else {
                    var zhangjiePass = zhangjie.finish();
                    if (zhangjiePass) {
                        this.maxZhangjie = this.currentZhangjie = zhangjie;
                    }
                    else if (zhangjie.isOpen()) {
                        if (zhangjie.isNew()) {
                            //未通关的新章节
                            if (App.hero.copyUnlockId < zhangjie.id) {
                                this.newOpen = zhangjie.id;
                            }
                            else {
                                this.currentZhangjie = zhangjie;
                            }
                        }
                        else {
                            //未通关的老章节
                            this.currentZhangjie = zhangjie;
                        }
                    }
                }
                this.zhangjieList.push(zhangjie);
            }
            this.lastCopyId = this.getMaxLev();
        };
        /** 更新章节变化 */
        GuajiModel.prototype.updatePassGuanqia = function (zjId, gqId) {
            //下一个章节序列
            var nexzj = -1;
            var nextid = -1;
            var gqVo = null;
            var len = this.zhangjieList.length;
            for (var i = 0; i < len; i++) {
                var zhj = this.zhangjieList[i];
                if (zhj.id == zjId) {
                    //更新当前关卡
                    zhj.updateGuaqiaState(gqId);
                    gqVo = zhj.getGuanqiaById(gqId);
                    if (zhj.id > this.maxZhangjie.id)
                        this.maxZhangjie = zhj;
                    //更新下一个开启关卡
                    nextid = zhj.updateNextGuaqiaState(gqId);
                    if (nextid != -1 && i < (len - 1)) {
                        nexzj = i + 1;
                    }
                    break;
                }
            }
            //新开章节时，需要更新
            if (nexzj != -1) {
                var nzj = this.zhangjieList[nexzj];
                nzj.updateGuaqiaState(nextid);
                //新章节提示
                if (this.currentZhangjie && this.currentZhangjie.id != nzj.id && nzj.isOpen() && nzj.isNew()) {
                    this.newOpen = nzj.id;
                }
            }
        };
        GuajiModel.prototype.isInMapGuide = function () {
            return this.newOpen != 0;
        };
        /** 是否解锁章节 */
        GuajiModel.prototype.isUnlockCapter = function (chapter) {
            var unlockCapter = App.hero.copyUnlockId == 1 ? 1000 : App.hero.copyUnlockId;
            return chapter <= unlockCapter;
        };
        /**获取关卡 */
        GuajiModel.prototype.getGuanqiaById = function (id) {
            for (var index = 0; index < this.zhangjieList.length; index++) {
                var zj = this.zhangjieList[index];
                for (var key in zj.guankaMap) {
                    if (zj.guankaMap.hasOwnProperty(key)) {
                        var element = zj.guankaMap[key];
                        if (element.tbCopyInfo.ID == id) {
                            return element;
                        }
                    }
                }
            }
            return null;
        };
        /**获取章节 */
        GuajiModel.prototype.getZhangjie = function (id) {
            for (var index = 0; index < this.zhangjieList.length; index++) {
                var element = this.zhangjieList[index];
                if (element.id == id) {
                    return element;
                }
            }
            return null;
        };
        /**
         * 获得当前章节的下一章节 相对的
         */
        GuajiModel.prototype.getNextZj = function () {
            var idx = this.zhangjieList.indexOf(this.currentZhangjie);
            if (idx == -1) {
                return null;
            }
            else {
                var nextid = idx + 1;
                if (nextid > this.zhangjieList.length)
                    return null;
                return this.zhangjieList[nextid];
            }
        };
        /**
         * 获得当前章节通关的最高Id
         * 如当前章节，未通关过任何关卡，返回-1
         * @param chapter
         */
        GuajiModel.prototype.getCopyInfoByChapter = function (chapter) {
            var copyid = -1;
            if (App.hero.runeCopyInfo.hasOwnProperty(chapter)) {
                copyid = Number(App.hero.runeCopyInfo[chapter]);
            }
            return copyid;
        };
        /**
         * 获得历练副本已挑战次数
         * @param id
         */
        GuajiModel.prototype.getCopyNumById = function (id) {
            var num = 0;
            if (App.hero.copyChallengeInfo.hasOwnProperty(id))
                num = Number(App.hero.copyChallengeInfo[id]);
            return num;
        };
        /** 是否通关副本 */
        GuajiModel.prototype.isPassCopy = function (copyId) {
            var tbCpInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            var tbCopy = tb.TB_copy.get_TB_copyById(tbCpInfo.area);
            var curCopyId = this.getCopyInfoByChapter(tbCopy.chapter);
            return curCopyId >= copyId;
        };
        /** 获取当前最大的关卡完成id */
        GuajiModel.prototype.getMaxLev = function () {
            var maxlev = 0;
            for (var key in App.hero.runeCopyInfo) {
                if (App.hero.runeCopyInfo.hasOwnProperty(key)) {
                    maxlev = Math.max(maxlev, Number(App.hero.runeCopyInfo[key]));
                }
            }
            return maxlev;
        };
        /** 获取当前最大的关卡完成id */
        GuajiModel.prototype.getMaxChapter = function () {
            var maxlev = this.getMaxLev();
            var copyinfo = tb.TB_copy_info.get_TB_copy_infoById(maxlev);
            return copyinfo ? copyinfo.area : 1000;
        };
        GuajiModel.prototype.getCopyRankDesc = function (copyId) {
            var info = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if (info) {
                // let copy = tb.TB_copy.get_TB_copyById(info.area);
                var id = copyId.toString().split("");
                return LanMgr.getLan("" + this.arrSubType[id[1]] + (Number(id[2]) + 1) + "-" + info.area_number, -1);
            }
            return '无';
        };
        GuajiModel.prototype.getCopyDesc = function (copyId) {
            var info = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if (info) {
                // let copy = tb.TB_copy.get_TB_copyById(info.area);
                var id = copyId.toString().split("");
                return LanMgr.getLan("" + this.arrSubType[id[1]], -1);
            }
            return '无';
        };
        GuajiModel.prototype.getSelfRankDesc = function () {
            return this.getCopyRankDesc(this.getMaxLev());
        };
        /** 红点规则 挂机宝箱未领取收益是否大于30分钟*/
        GuajiModel.prototype.isPassTime = function () {
            var time = (App.getServerTime() - App.hero.lastGetAfkTime) / 60;
            return time >= 30;
        };
        /** 是否可以挑战 */
        GuajiModel.prototype.isCanChallenge = function (copyId) {
            var copyInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if (!copyInfo)
                return false;
            if (App.hero.level < copyInfo.getConditionVal(CopyConditionType.level)) {
                return false;
            }
            var maxlev = this.getMaxLev();
            if (copyInfo.getConditionVal(CopyConditionType.id) > maxlev) {
                return false;
            }
            return true;
        };
        /** 获得可以挑战的最大关卡 */
        GuajiModel.prototype.getCanChallengeMaxCopy = function () {
            var copyId = this.getMaxLev();
            var tbCopy = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if (tbCopy) {
                var nextCopy = tb.TB_copy_info.get_TB_copy_infoById(tbCopy.next);
                return nextCopy;
            }
            return null;
        };
        /** 获取收益速率 */
        GuajiModel.prototype.getShouyiSpeedList = function () {
            var lastCopy = tb.TB_copy_info.get_TB_copy_infoById(this.lastCopyId);
            var curCopy = tb.TB_copy_info.get_TB_copy_infoById(this.getMaxLev());
            if (!curCopy)
                return [];
            var ary = [];
            // 是否有变化
            var lastGodExpSp = lastCopy ? lastCopy.exp_speed : 0;
            var lastGoldSp = lastCopy ? lastCopy.gold_speed : 0;
            var lastRoleExpSp = lastCopy ? lastCopy.role_exp_speed : 0;
            if (curCopy.exp_speed > lastGodExpSp || curCopy.gold_speed > lastGoldSp || curCopy.role_exp_speed > lastRoleExpSp) {
                ary.push({ type: iface.tb_prop.resTypeKey.roleExp, last: Math.floor(lastRoleExpSp), cur: Math.floor(curCopy.role_exp_speed) });
                ary.push({ type: iface.tb_prop.resTypeKey.gold, last: Math.floor(lastGoldSp), cur: Math.floor(curCopy.gold_speed) });
                ary.push({ type: iface.tb_prop.resTypeKey.godExp, last: Math.floor(lastGodExpSp), cur: Math.floor(curCopy.exp_speed) });
            }
            return ary;
        };
        /**
         * 先从本章已通关的随机
         */
        GuajiModel.prototype.getRandomMonster = function (chapter) {
            var guanqiaList = [];
            var zj = this.zhangjieList[chapter];
            for (var key in zj.guankaMap) {
                var element = zj.guankaMap[key];
                if (element.tbCopyInfo.area_number != 10 && (element.isPass || element.isNext())) {
                    guanqiaList.push(element);
                }
            }
            var guanqiaKey = random(guanqiaList.length);
            return guanqiaList[guanqiaKey] ? guanqiaList[guanqiaKey].tbCopyInfo : null;
        };
        /**　获取最大的挂机收益时间 */
        GuajiModel.prototype.getMaxOfflineTime = function () {
            var time = tb.TB_copy_set.getCopySet().offline_time;
            var hasMonthCard = App.serverTimeSecond <= App.hero.welfare.monthCardEndTime;
            if (hasMonthCard) {
                time += tb.TB_month_card.getTbMonthCardById(1).offline_time;
            }
            var hasLifeCard = App.hero.welfare.lifelongCard == 1;
            if (hasLifeCard) {
                time += tb.TB_month_card.getTbMonthCardById(2).offline_time;
            }
            return time;
        };
        //是否可领取宝箱奖励
        GuajiModel.prototype.isCanReceiveBX = function () {
            if (App.hero.lastGetAfkTime == 0)
                return false;
            //挂机时间   单位:秒
            var time = App.serverTimeSecond - App.hero.lastGetAfkTime;
            var guajiTime = tb.TB_copy_set.getCopySet().short_time;
            return guajiTime <= time;
        };
        return GuajiModel;
    }());
    game.GuajiModel = GuajiModel;
})(game || (game = {}));
