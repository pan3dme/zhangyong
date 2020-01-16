module game {

    export class GloryNoticeMgr {

        constructor() {

        }
        private static _instance: GloryNoticeMgr;
        public static getInstance(): GloryNoticeMgr {
            if (!this._instance) {
                this._instance = new GloryNoticeMgr();
            }
            return this._instance;
        }

        /** 开始公告 */
        startRun():void {
            // 监听系统开启
            GuideWeakManager.listenSysOpen(ModuleConst.GLORY_FIGHT,this)
            .then(()=>{
                this.checkJoinNotice();
                let model = GloryModel.getInstance();
                // 报名阶段没人报名时，需要在报名截止时间后去重新请求是否有人报名
                if(model.serverPhase == 0 && model.isInJoinTime()){
                    let time = model.endJoinTime - App.serverTimeSecond;
                    Laya.timer.once(time*1000,this,this.timeoutRequest);
                    return;
                }
                this.checkInterval();
            });
        }

        // ============== 开始时间内 =============
        /** 报名阶段没人报名时，需要在报名截止时间后去重新请求是否有人报名 */
        private timeoutRequest():void {
            Laya.timer.clear(this,this.timeoutRequest);
            GloryThread.requestSeason().then(()=>{
                this.checkInterval();
            });
        }

        private _gameTimeAry : Array<Array<any>> = [];
        /** 开始定时 从第二阶段的提示 */
        private checkInterval():void {
            let model = GloryModel.getInstance();
            if(model.serverPhase == 0){
                return;
            }
            this._gameTimeAry.length = 0;
            for(let i = GloryId.benfu_16t8 ; i <= GloryId.kuafu_juesai ; i++){
                let tbHonour = tb.TB_honour.getItemById(i);
                let timeAry = tbHonour ? tbHonour.notice_time : [];
                if(timeAry.length == 0) continue;
                for(let ary of timeAry){
                    let time = GloryUtil.getFormatTime(ary[0],ary[1],ary[2]);
                    if(time > App.serverTimeSecond){
                        this._gameTimeAry.push([time,tbHonour.getNotice()]);
                    }
                }
            }
            this._gameTimeAry.sort((a,b)=>{
                return a[0] - b[0];
            });
            loghgy("阶段公告时间点列表",this._gameTimeAry);
            this.startGameInterval();
        }
        /** 阶段提示 */
        private startGameInterval():void {
            if(this._gameTimeAry.length == 0){
                Laya.timer.clear(this,this.sendGameNotice);
                return;
            }
            let ary = this._gameTimeAry.shift();
            let time = ary[0] - App.serverTimeSecond;
            loghgy(`延迟${time}秒发阶段公告`);
            Laya.timer.once(time*1000,this,this.sendGameNotice,[ary[1]]);
        }
        /** 发送阶段开始公告 */
        private sendGameNotice(content:string):void {
            loghgy("发阶段公告：",content);
            ChatModel.getInstance().addCustomChat(content);
            ChatNoticeMgr.getInstance().addCustomNotice(content);
            this.startGameInterval();
        }

        // ============== 报名阶段 =============
        private _joinTimeAry : number[] = [];
        /** 检测 */
        private checkJoinNotice():void {
            // 报名公告时间
            this._joinTimeAry.length = 0;
            let timeAry = tb.TB_honour.getItemById(GloryId.benfu_haixuan).notice_time;
            for(let ary of timeAry){
                let time = GloryUtil.getFormatTime(ary[0],ary[1],ary[2]);
                if(time > App.serverTimeSecond){
                    this._joinTimeAry.push(time);
                }
            }
            this._joinTimeAry.sort((a,b)=>{
                return a- b;
            });
            loghgy("报名公告时间点列表",this._joinTimeAry);
            this.startJoinInterval();
        }
        /** 报名阶段的提示 */
        private startJoinInterval():void {
            if(this._joinTimeAry.length == 0){
                Laya.timer.clear(this,this.sendJoinNotice);
                return;
            }
            let time = this._joinTimeAry.shift() - App.serverTimeSecond;
            loghgy(`延迟${time}秒发报名公告`);
            Laya.timer.once(time*1000,this,this.sendJoinNotice);
        }
        /** 发送报名公告 */
        private sendJoinNotice():void {
            let tbHonour = tb.TB_honour.getItemById(GloryId.benfu_haixuan);
            loghgy("发报名公告：",tbHonour.getNotice());
            ChatModel.getInstance().addCustomChat(tbHonour.getNotice());
            ChatNoticeMgr.getInstance().addCustomNotice(tbHonour.getNotice());
            this.startJoinInterval();
        }
    }
}