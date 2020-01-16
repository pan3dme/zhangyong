

module game {


    export class YuanzhengModel {

        public static SHANGZHEN_LEVEL: number = 30; // 上阵最低等级
        public static BLOOD_BASE: number = 10000;  // 血量万分比计算
        private _aidTag: GodItemVo;
        constructor() {

        }
        private static _instance: YuanzhengModel;
        public static getInstance(): YuanzhengModel {
            if (!this._instance) {
                this._instance = new YuanzhengModel();
            }
            return this._instance;
        }

        /** 重置 */
        resetDataByCrossDay(): void {
            UIMgr.hideUIByName(UIConst.Yuanzheng_HelpView);
            this._isRequestDis = false;
            this._myDispatchList.length = 0;
            this._helpMeList.length;
            App.hero.copyInfo.helpGodId = [];
            App.hero.copyInfo.friendHelpList = [];
        }

        /** 当前挑战数据 */
        public curChallengeVo: YZChallengeVo;
        /** 当前挑战的关卡 */
        public curGuanqia: YZGuanqiaVo;
        private _guanqiaList: YZGuanqiaVo[];    // 关卡数据
        private _baoxiangList: YZGuanqiaVo[];   // 宝箱数据
        public initModel(): void {
            this.curChallengeVo = new YZChallengeVo();
            this._guanqiaList = [];
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_expedition)).data;
            let i: number = 1;
            for (let key in tbData) {
                this._guanqiaList.push(new YZGuanqiaVo(tbData[key], i++));
            }
            this._baoxiangList = [];
            this._baoxiangList = this._guanqiaList.filter((vo) => {
                return vo.isHasBaoxiang();
            });
            this.updateCurGuanqia();
        }
        /** 更新当前关卡 */
        updateCurGuanqia(): void {
            let finishId = App.hero.copyInfo.expeditionId;
            let index = this._guanqiaList.findIndex((vo) => {
                return vo.tbCopy.ID == finishId;
            });
            let curIndex = index + 1;
            this.curGuanqia = this._guanqiaList[curIndex];
            this.curChallengeVo.setGuanqiaVo(this.curGuanqia);
        }

        /** 更新数据 */
        public updateData(challengerInfo: IYZChallengeInfoVo): void {
            this.curChallengeVo.setServerInfo(challengerInfo);
        }

        /** 获取自身英雄血量
         *  向上取整
         */
        getGodHp(uuid: string): number {
            if (Number(uuid) < 0) {
                //援助
                let svo = this.getHelpItemByUuid(uuid);
                return svo && svo.godInfo[3][1];
            }
            let godVo = App.hero.getGodVoById(uuid);
            let blood = godVo.getPropertyValue(1);
            let selfHpInfo = App.hero.copyInfo.expeditionSelfHpInfo;
            if (selfHpInfo.hasOwnProperty(uuid)) {
                return Math.ceil(blood * selfHpInfo[uuid] / YuanzhengModel.BLOOD_BASE);
            }
            // logdebug('获取自身英雄血量:',uuid,godVo.tab_god.name,godVo.templateId,blood);
            return Math.ceil(blood);
        }

        /** 获取所有关卡列表 */
        getGuanqiaList(): YZGuanqiaVo[] {
            return this._guanqiaList;
        }
        /** 获取宝箱关卡列表 */
        getBaoxiangList(): YZGuanqiaVo[] {
            return this._baoxiangList;
        }

        getGuanqiaById(id: number): YZGuanqiaVo {
            return this._guanqiaList.find((vo) => {
                return vo.tbCopy.ID == id;
            });
        }

        /** 获取英雄列表（可回复或者可复活的） */
        getGodsByRecoveryType(type: number): GodItemVo[] {
            let godsAry = App.hero.getGodAry();
            return godsAry.filter((vo) => {
                if (vo.level < YuanzhengModel.SHANGZHEN_LEVEL) {
                    return false;
                }
                let hp = this.getGodHp(vo.uuid);
                if (type == iface.tb_prop.expeditionOpTypeKey.revive) {
                    return hp <= 0;
                } else if (type == iface.tb_prop.expeditionOpTypeKey.recover) {
                    return hp > 0 && hp < vo.getPropertyValue(1);
                }
                return true;
            });
        }

        /** 获取药水消耗的钻石数 */
        getMedicineCost(type: number): number {
            let ary = tb.TB_copy_set.getCopySet().special_type_cost;
            let find = ary.find((vo) => {
                return vo[0] == type;
            });
            return find ? find[1] : 0;
        }
        /** 是否全部通关 */
        isAllFinish(): boolean {
            return this._guanqiaList.every((vo) => {
                return vo.isPass();
            });
        }



        // ----------- 支援我的 --------------

        /** 本次战斗所使用的援助对象 */
        setAidTag(aid: GodItemVo) {
            this._aidTag = aid;
        }

        getAidTag() {
            return this._aidTag
        }

        clearAidTag() {
            this._aidTag = null;
        }

        hasAidTag(): boolean {
            return Boolean(this._aidTag);
        }

        /** 好友支援我的英雄列表 */
        private _helpMeList: YZHelpInfoVo[] = [];
        getHelpMeList(): YZHelpInfoVo[] {
            return this._helpMeList;
        }
        /** 今日雇佣数量 */
        getHireCount(): number {
            return this._helpMeList.filter((vo) => {
                return vo.isHire();
            }).length;
        }
        /** 请求好友支援我的列表 */
        requestHelpMeList(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_friendHelp_getFriendHelpList, null, (sdata: any, msg: any) => {
                    if (!sdata) {
                        resolve();
                        return;
                    }
                    let list = sdata['friendHelpList'] || [];
                    this._helpMeList.length = 0;
                    for (let svo of list) {
                        this._helpMeList.push(new YZHelpInfoVo(svo));
                    }
                    this._helpMeList.sort((a, b) => {
                        return b.force - a.force;
                    });
                    resolve();
                });
            })
        }
        /** 添加雇佣信息 */
        addHireInfo(addInfo: any): void {
            if (!addInfo) return;
            App.hero.copyInfo.friendHelpList.push(addInfo);
        }
        /** 获取我的雇佣神灵列表  */
        getMyHireList(): GodItemVo[] {
            let godList: GodItemVo[] = [];
            let list = App.hero.copyInfo.friendHelpList || [];

            for (let i = 0; i < list.length; i++) {
                let uuid = (-1 - i) + "";
                if (App.hero.copyInfo.expeditionSelfHpInfo.hasOwnProperty(uuid) && App.hero.copyInfo.expeditionSelfHpInfo[uuid] <= 0) continue;
                let helpVo = list[i];
                let obj = helpVo.godInfo;

                let tbGod = tb.TB_god.get_TB_godById(obj[0]);
                let godVo = new GodItemVo(tbGod);
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
        }

        public getHelpItemByUuid(uuid: String) {
            let id = Math.abs(Number(uuid)) - 1;
            return App.hero.copyInfo.friendHelpList[id] || null;
        }

        // ----------- 我的派遣 --------------
        /** 派遣列表 - 我支援好友的英雄列表 */
        private _myDispatchList: YZHelpInfoVo[] = [];
        getMyDispatchList(): YZHelpInfoVo[] {
            return this._myDispatchList;
        }
        /** 添加派遣英雄数据 */
        addDispatchInfo(addHelpGodId: string, svo: IYZFriendHelpListSvo): YZHelpInfoVo {
            App.hero.copyInfo.helpGodId.push(addHelpGodId);
            let vo = new YZHelpInfoVo(svo);
            vo.godVo.uuid = addHelpGodId + "";
            this._myDispatchList.push(vo);
            dispatchEvt(new YuanzhengEvent(YuanzhengEvent.YZ_DISPATCH_SUCC));
            return vo;
        }
        /** 是否请求派遣数据 */
        private _isRequestDis: boolean = false;
        /** 请求我支援好友的英雄列表 */
        requestDispatchList(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (this._isRequestDis) {
                    resolve();
                    return;
                }
                PLC.request(Protocol.friend_friendHelp_getMyFriendHelpList, null, (sdata: any, msg: any) => {
                    if (!sdata) {
                        return;
                    }
                    this._isRequestDis = true;
                    let list = sdata['friendHelpList'] || [];
                    this._myDispatchList.length = 0;
                    for (let i = 0; i < list.length; i++) {
                        let vo = new YZHelpInfoVo(list[i]);
                        vo.godVo.uuid = App.hero.copyInfo.helpGodId[i];
                        this._myDispatchList.push(vo);
                    }
                    resolve();
                });
            });
        }
        /** 是否派遣某神灵 */
        public isDispatch(uuid: string): boolean {
            let ids = App.hero.copyInfo.helpGodId || [];
            return ids.indexOf(uuid) != -1;
        }
        /** 获取派遣数量 */
        public getDispatchNum(): number {
            let ids = App.hero.copyInfo.helpGodId || [];
            return ids.length;
        }

    }

}