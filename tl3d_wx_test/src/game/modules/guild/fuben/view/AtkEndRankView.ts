module game {

    export class AtkEndRankView extends ui.guild.copy.atkEndRankUI {

        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.AtkEndRankView, closeOnSide: true, closeOnButton: true, title: `击杀排行` }
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
        }

        private initView(): void {
            this.rankList.array = null;
            this.updateView();
        }

        private _damageRankList;
        private _curGuanqia;
        //伤害排行更新
        public updateView(): void {
            if (this._curGuanqia && this.dataSource && this.dataSource.tbCopy.ID == this._curGuanqia.tbCopy.ID && this._damageRankList) {
                this.renderDamaList();
                return;
            }

            this._curGuanqia = this.dataSource;
            let guanqia: GuildGuanqiaVo = this._curGuanqia;
            let arg = {};
            arg[Protocol.guild_guildCopy_copyInfo.args.id] = guanqia.tbCopy.ID;
            PLC.request(Protocol.guild_guildCopy_copyInfo, arg, ($data) => {
                if (!$data) return;
                // 伤害排行
                let info: IGuildChallengeInfo = $data;
                let rankInfo = info.rankInfo ? info.rankInfo : {};
                this._damageRankList = [];
                this.lbRank.text = "";
                for (let key in rankInfo) {
                    let obj = {};
                    obj['type'] = 'DamageRank';
                    obj['rank'] = parseInt(key);
                    obj['playerId'] = rankInfo[key][0];
                    obj['name'] = rankInfo[key][1];
                    obj['head'] = rankInfo[key][2];
                    obj['level'] = rankInfo[key][3];
                    obj['force'] = Math.ceil(rankInfo[key][4]);
                    obj['headFrame'] = rankInfo[key][5];
                    obj['value'] = rankInfo[key][6];
                    this._damageRankList.push(obj);
                    if (rankInfo[key][0] == App.hero.playerId) {
                        this.lbRank.text = "我的排名:" + parseInt(key) + "    我的伤害:" + Math.round(obj['value']);
                    }
                }
                this.renderDamaList();
            });
        }

        private renderDamaList(): void {
            let rankList = this._damageRankList ? this._damageRankList : [];
            this.rankList.array = rankList;
        }

    }
}