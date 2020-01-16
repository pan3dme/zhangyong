

module game {

  export class GuildFightThread {

    private _model : GuildFightModel;
    constructor() {
      this._model = GuildFightModel.getInstance();
    }

    public requestFlag: boolean = false;
    /** 请求赛季信息 {session,regTime} */
    requestSeason(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        let model = this._model;
        if (this.requestFlag || !model.isOpenGuildWar()) {
          resolve();
        } else {
          PLC.request(Protocol.guild_guildWar_getGuildWarSession, null, ($data) => {
            if(!$data) return;
            model.updateSeason($data);
            // this.requestFlag = true;
            resolve();
          });
        }
      });
    }

    /** 请示刷新匹配数据 */
    loopRequestMatchInfo(): void {
      this.stopMatchLoop();
      if(this._model.myTeamVo.getMember(App.hero.playerId)){
        Laya.timer.loop(30000, this, this.requestMatchInfo);
      }
    }
    stopMatchLoop(): void {
      Laya.timer.clear(this, this.requestMatchInfo)
    }
    /** 请求匹配信息 */
    requestMatchInfo(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        let model = this._model;
        if(!model.isInGameTime()) {
          this.stopMatchLoop();
          return resolve();
        }
        PLC.request(Protocol.guild_guildWar_getGuildWarMatchInfo, null, ($data) => {
          model.setMatchInfo($data);
          resolve();
        });
      });
    }


  }


}