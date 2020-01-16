module game {

    export class DamageRankView extends ui.guild.copy.DamageRankUI {

        private _damageRankList: any[];
        private _guildRankList: any[];
        private _curGuanqia: GuildGuanqiaVo;
        constructor() {
            super();
            this.isModelClose = true;
            this.rewardList.array = tb.TB_arena_new.get_TB_arena_new();
            this.tab.selectHandler = new Handler(this, this.onTabSelect);
            this.bgPanel.dataSource = { uiName: UIConst.DamageRankView, closeOnSide: true, closeOnButton: true, title: `公会副本排行` }
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
            this.tab.selectedIndex = -1;
            this._damageRankList = null;
            this._guildRankList = null;
        }

        private initView(): void {
            this.resetText();
            this.tab.selectedIndex = 0;
        }

        //伤害排行更新
        public updateView(): void {
            if (this._curGuanqia && this.dataSource && this.dataSource.tbCopy.ID == this._curGuanqia.tbCopy.ID && this._damageRankList) {
                this.renderDamaList();
                return;
            }
            this.lbRank.text = this.damagerankinfo;
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
                    if (obj['playerId'] == App.hero.playerId) {
                        this.damagerankinfo = "我的排名:" + parseInt(key) + "    我的伤害:" + Math.round(obj['value']);
                    }
                }
                this.renderDamaList();
            });
        }

        private renderDamaList(): void {
            let rankList = this._damageRankList ? this._damageRankList : [];
            this.rankList.array = rankList;
            this.lbRank.text = this.damagerankinfo;
            this.lab_empty.visible = !rankList || rankList.length == 0;
        }

        private onTabSelect(index: number): void {
            this.viewstack.selectedIndex = index;
            if (index == 0) {
                this.updateView();
            } else {
                this.updateGuild();
            }
        }

        private damagerankinfo = "";
        private guildrankinfo = "";
        public updateGuild(): void {
            if (!this._guildRankList) {
                this.lbRank.text = this.guildrankinfo;
                //公会排行
                PLC.request(Protocol.guild_guild_copyRankList, null, ($data) => {
                    if (!$data) return;
                    this._guildRankList = [];
                    let copyList = $data.copyRankList ? $data.copyRankList : [];
                    for (let i = 0; i < copyList.length; i++) {
                        let obj = copyList[i];
                        obj['type'] = 'GuildRank';
                        obj['rank'] = i + 1;
                        let tbCopy = tb.TB_guild_copy.getItemnById(obj.copyId);
                        obj['desc'] = tbCopy ? tbCopy.getName() : "无";
                        this._guildRankList.push(obj);
                    }
                    let guanqia = GuildCopyModel.getInstance().getGuanqiaById($data.rankValue);
                    if(guanqia){
                        this.guildrankinfo = "我的排名:" + ($data.myRank || 0) + "    最高关卡:" + guanqia.getName();
                    }
                    this.renderGuildList();
                });
            }
            this.renderGuildList();
        }

        private renderGuildList(): void {
            let copyList = this._guildRankList ? this._guildRankList : [];
            this.rewardList.array = copyList;
            this.lbRank.text = this.guildrankinfo;
            this.lab_empty.visible = !copyList || copyList.length == 0;
        }

        private resetText():void {
            this.damagerankinfo = "我的排名:无    我的伤害:0";
            this.guildrankinfo = "我的排名:无    最高关卡:无";
        }
    }
}