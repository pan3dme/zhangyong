
module game{
    export interface IGuildHelpSVo {
        helpId : string;
        helpType : number;
        playerId : string;
        name : string;
        helpNum : number;   // 收到援助次数
        getNum : number;    // 领取次数
        head : number;
        level : number;
        helpPos : number;
    }
    /** 我的求助数据vo */
    export class GuildHelpVo {
        public svo : IGuildHelpSVo;
        public pos : number = -1;    // 栏位 从0开始
        public tbHelp : tb.TB_guild_help;
        private _itemVo : ItemVo;
        constructor(){
        }

        public updateSvo(svo:IGuildHelpSVo):void {
            this.svo = svo;
            if(svo){
                this.tbHelp = tb.TB_guild_help.getItemnById(svo.helpType);
                if(!this.tbHelp){
                    logerror("数据错误,",svo);
                }
                // 因为更新数据频繁，防止重复创建
                let vo = this.tbHelp.getRewardList()[0];
                if(!this._itemVo){
                    this._itemVo = new ItemVo(0,0);
                    this._itemVo.show = true;
                }
                this._itemVo.id = vo.id;
                this._itemVo.count = vo.count;
            }else{
                this.tbHelp = null;
            }
        }

        getItemVo():ItemVo {
            return this._itemVo && this._itemVo.id ? this._itemVo : null;
        }
        
        // ------- 我的求援列表vo数据 --------
        /** 获取可领取数量 */
        getCanRewardNum():number {
            return this.svo ? this.svo.helpNum - this.svo.getNum : 0;
        }
        /** 是否求援过 */
        isExist():boolean {
            return this.svo ? true : false
        }
        /** 是否可领取 */
        isCanReward():boolean {
            return this.getCanRewardNum() > 0;
        }
        /** 是否领取完成 */
        isRewardFinish():boolean {
            return this.svo && this.svo.getNum >= this.tbHelp.help_num;
        }
        /** 是否完成 */
        isFinish():boolean {
            return this.svo && this.svo.helpNum >= this.tbHelp.help_num;
        }

        /** 是否免费 */
        isFree():boolean {
            return GuildHelpModel.getInstance().isFreeHelp();
        }
        /** 获取援助消耗 */
        getCost():number[]{
            return tb.TB_guild_set.getSet().help_cost[0];
        }
        /** 清理 */
        clear():void {
            this.svo = null;
            this.tbHelp = null;
        }
    }
}