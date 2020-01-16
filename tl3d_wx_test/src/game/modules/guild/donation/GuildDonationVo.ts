

module game {

    export class GuildDonationVo {

        public tbDonate : tb.TB_guild_donate;
        constructor(tb:tb.TB_guild_donate){
            this.tbDonate = tb;
        }

        isDonate():boolean {
            let id = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate);
            return id == this.tbDonate.ID;
        }

        /** 获取贡献值 */
        getDonate():number {
            let num = 0;
            let reward = this.tbDonate.reward;
            for(let ary of reward){
                if(Number(ary[0]) == iface.tb_prop.resTypeKey.guildDonate){
                    num = Number(ary[1]);
                    break;
                }
            }
            return num;
        }
    }
}