

module game {

    export class JishaJiangliView extends ui.guild.copy.JishaJiangliUI{

        private _copyVo : GuildChallengeVo;
        constructor(){
            super();
            this.rewardList.array = null;
            this.rankList.array = null;
        }

        onEnter(guanqia:GuildGuanqiaVo):void {
            if(!guanqia || this._copyVo) return;
            if(!this._copyVo){
                this._copyVo = new GuildChallengeVo();
                this._copyVo.setGuanqiaVo(guanqia);
                let arg = {};
                arg[Protocol.guild_guildCopy_copyInfo.args.id] = guanqia.tbCopy.ID;
                PLC.request(Protocol.guild_guildCopy_copyInfo,arg,($data)=>{
                    if (!$data) return;
                    this._copyVo.setSvo($data);
                    this.renderView();
                });
            }else{
                this.renderView();
            }
        }

        private renderView():void {
            if(!this._copyVo) return;
            let rewards = this._copyVo.guanqiaVo.getRewardList();
            this.rewardList.array = rewards;
            this.rewardList.width = rewards.length * (90 + this.rewardList.spaceX);
            this.rankList.array = this._copyVo.guanqiaVo.getRankList();
            if(this._copyVo.svo){
                let rank = this._copyVo.getSelfRank();
                let rankText = rank == 0 ? LanMgr.getLan('',10028) : LanMgr.getLan('',10029,this._copyVo.getSelfRank());
                this.lbDesc.text = LanMgr.getLan('',10080,this._copyVo.svo.totalDamage) + "     " + rankText;
            }
        }

        onExit():void {
            this._copyVo = null;
            this.rewardList.array = null;
            this.rankList.array = null;
        }

    }
}