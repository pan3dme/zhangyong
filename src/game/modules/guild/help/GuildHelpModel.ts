module game {
    export class GuildHelpModel {

        public static VO_SIGN : string = "guild_help_vo";

        private static _instance: GuildHelpModel;
        public static getInstance(): GuildHelpModel {
            if(!GuildHelpModel._instance) {
                GuildHelpModel._instance = new GuildHelpModel();
            }
            return GuildHelpModel._instance;
        }
        constructor() {
            this._myHelpList = [];
            this._othersHelps = [];
            this._myHelpIds = [];
        };

        /** 我的求援数据列表 */
        private _myHelpList : GuildHelpVo[];
        /** 我的求援ID列表 -- 方便做些判断 */
        private _myHelpIds : number[];
        /** 是否全部结束 -- 避免频繁去判断 */
        private _isAllFinish : boolean = false;
        /** 是否领取完全部碎片 */
        private _isAllRewardFinish : boolean = false;
        public initModel():void {
            this._myHelpList = [];
            this._isAllFinish = false;
            this._isAllRewardFinish = false;
            let num = tb.TB_guild_set.getSet().daily_help_num;
            for(let i = 0 ; i < num ; i++) {
                let vo = new GuildHelpVo();
                vo.pos = i;
                this._myHelpList.push(vo);
            }
        }
        /** 清除跨天数据 我的求助列表及工会救援不需要充值，打开界面就会重新请求*/
        clearCrossDayData():void {
            UIMgr.hideUIByName(UIConst.GuildHelpView);
            UIMgr.hideUIByName(UIConst.GuildAskHelpView);
            // 跨天清除已领取完成数据
            for(let vo of this._myHelpList){
                if(vo.isRewardFinish()) {
                    vo.clear();
                }
            }
            this.updateFinishState();
            this._hasRequestMy = false;
            App.hero.guildHelpNum = this._myHelpIds.length;
        }
        /** 更新我的求助数据 */
        public updateHelpList(list:IGuildHelpSVo[]):void {
            for(let i = 0 ; i < this._myHelpList.length ; i++){
                let vo = this._myHelpList[i];
                let svo = list.find((value)=>{
                    return value.helpPos == vo.pos;
                });
                vo.updateSvo(svo);
            }
            this.updateFinishState();
        }
        /** 更新数量 */
        updateHelpAwardNum(info:GuildHelpVo,svo:IGuildHelpSVo):void {
            if(info && info.svo) {
                info.svo.getNum = svo.getNum;
                info.svo.helpNum = svo.helpNum;
                this.updateFinishState();
            }
        }
        /** 更新完成状态 */
        private updateFinishState():void {
            this._myHelpIds.length = 0;
            this._isAllFinish = true;
            this._isAllRewardFinish = true;
            for(let vo of this._myHelpList){
                if(vo.isExist()){
                    this._myHelpIds.push(vo.tbHelp.ID);
                }
                if(!vo.isFinish()) {
                    this._isAllFinish = false;
                }
                if(!vo.isRewardFinish()) {
                    this._isAllRewardFinish = false;
                }
            }
        }
        /** 新增求援数据 */
        addHelp(svo:IGuildHelpSVo):void {
            if(!svo) return;
            let helpVo = this._myHelpList.find((vo)=>{
                return vo.pos == svo.helpPos;
            });
            if(!helpVo){
                logerror("获取不到改槽位的vo：",svo);
            }
            helpVo.updateSvo(svo);
            this.updateFinishState();
        }
        /** 获取我的求助列表 */
        getMyHelps():GuildHelpVo[] {
            return this._myHelpList;
        }
        /** 是否存在该求助 */
        public isExistHelp(tbid:number):boolean {
            return this._myHelpIds.indexOf(tbid) != -1;
        }
        /** 是否我的求助全部完成 */
        isAllFinish():boolean{
            return this._isAllFinish;
        }
        /** 是否领取完全部碎片 */
        isAllRewardFinish():boolean{
            return this._isAllRewardFinish;
        }
        /** 获取求援次数 */
        getAskHelpNum():number{
            return this._myHelpIds.length;
        }
        /** 获取全部完成（领取完碎片）次数 */
        getRewardFinishNum():number {
            let num = 0;
            this._myHelpList.forEach((vo)=>{
                if(vo.isRewardFinish()) {
                    num ++;
                }
            });
            return num;
        }

        // ------------ 公会援助 ------------
        /** 公会成员求援 */
        private _othersHelps : GuildHelpVo[];
        /** 更新援助数据 */
        updateOthersHelp(list:any[]):void {
            for(let vo of this._othersHelps){
                vo.clear();
                Laya.Pool.recover(GuildHelpModel.VO_SIGN,vo);
            }
            this._othersHelps.length = 0;
            for(let svo of list){
                let helpVo = Laya.Pool.getItemByClass(GuildHelpModel.VO_SIGN,GuildHelpVo) as GuildHelpVo;
                helpVo.updateSvo(svo);
                this._othersHelps.push(helpVo);
            }
        }
        getOthersHelp():GuildHelpVo[] {
            return this._othersHelps;
        }
        /** 更新数量 */
        updateOthersNum(svo:IGuildHelpSVo):void {
            let info = this.getOthersInfoById(svo.helpId);
            if(info && info.svo){
                info.svo.getNum = svo.getNum;
                info.svo.helpNum = svo.helpNum;
                if(info.isFinish()){
                    this.removeOthersById(svo.helpId);
                }
            }
        }
        /** 获取其他人的求援 */
        getOthersInfoById(helpId:string):GuildHelpVo {
            return this._othersHelps.find((vo)=>{
                return vo.svo.helpId == helpId;
            });
        }
        /** 移除 */
        removeOthersById(helpId:string):void {
            let findVo = this._othersHelps.find((vo)=>{
                return vo.svo.helpId == helpId;
            });
            let index = this._othersHelps.indexOf(findVo);
            if(index != -1){
                this._othersHelps.splice(index,1);
                findVo.clear();
                Laya.Pool.recover(GuildHelpModel.VO_SIGN,findVo);
            }
        }
        // ------------ 公会援助 ------------

        /** 获取免费援助次数 */
        getFreeHelpNum():number{
            let total = tb.TB_guild_set.getSet().free_help_num;
            let cur = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.dailyFreeHelpNum);
            return total - cur; 
        }
        /** 是否可以免费援助 */
        isFreeHelp():boolean {
            return this.getFreeHelpNum() > 0;
        }
        /** 获取钻石援助剩余次数 */
        getCostNum():number {
            return tb.TB_guild_set.getSet().cost_help_max - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildHelpBuyNum)
        }
        /** 是否消耗援助达到上限 */
        isCostMax():boolean {
            return this.getCostNum() <= 0;
        }
        /** 是否已领取宝箱 */
        isReawrdBX():boolean {
            return App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildHelpAwardNum) > 0;
        }
        /** 是否可领取宝箱 -- 需要领取完全部碎片才代表完成*/
        isCanRewardBX():boolean {
            return GuildModel.getInstance().isHasGuild() && !this.isReawrdBX() && this.isAllRewardFinish();
        }
        /** 是否可以求援 */
        isCanAskHelp():boolean {
            if(!GuildModel.getInstance().isHasGuild()) return false;
            let total = tb.TB_guild_set.getSet().daily_help_num;
            return this._hasRequestMy ? (this.getAskHelpNum() < total) : (App.hero.guildHelpNum < total);
        }
        /** 是否可以领取碎片 */
        isCanRewardSuipian():boolean {
            return GuildModel.getInstance().isHasGuild() && this._myHelpList.some((vo)=>{
                return vo.isCanReward();
            });
        }
        /** 是否可以援助其他人 */
        isCanHelpOthers():boolean {
            return GuildModel.getInstance().isHasGuild() && this.isFreeHelp() && this._othersHelps.length > 0;
        }

        // ------------ 数据请求 ------------
        /** 是否已经请求了我的求援数据列表 */
        private _hasRequestMy : boolean = false;
        /** 请求我的求援列表 -- 主要援助我的数量 */
        requestMyHelpList():Promise<any>{
            return new Promise<any>((resolve)=>{
                // 求援是手动发起的，如果已请求过，但没有求援数据或者已经完成，就不需要重新请求
                if(this._hasRequestMy && (this.getAskHelpNum() == 0 || this.isAllFinish())){
                    resolve();
                    return;
                }
                PLC.request(Protocol.guild_guildHelp_getMyGuildHelpList,null,(data)=>{
                    if(!data){
                        resolve();
                        return;
                    }
                    this.updateHelpList(data["guildHelpList"]);
                    let isFirst = !this._hasRequestMy;
                    this._hasRequestMy = true;
                    dispatchEvt(new GuildEvent(GuildEvent.UPDATE_MY_HELP_LIST),isFirst);
                    resolve();
                });
            });
        }
        /** 请求公会援助列表 */
        requestOthersHelpList():Promise<any>{
            return new Promise<any>((resolve)=>{
                PLC.request(Protocol.guild_guildHelp_getGuildHelpList,null,(data)=>{
                    if(!data){
                        resolve();
                        return;
                    }
                    this.updateOthersHelp(data["guildHelpList"]);
                    dispatchEvt(new GuildEvent(GuildEvent.UPDATE_OTHERS_HELP_LIST));
                    resolve();
                });
            });
        }

    }
}