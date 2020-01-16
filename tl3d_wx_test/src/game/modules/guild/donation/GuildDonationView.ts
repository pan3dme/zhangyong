
module game {

    export class GuildDonationView extends ui.guild.donation.GuildDonationUI {

        constructor(){
            super();
            this.isModelClose = true;
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
            this.list.array = null;
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            this.bgPanel.dataSource = { uiName: UIConst.GuildDonationView, closeOnSide: this.isModelClose,title:"公会贡献" };
            this.list.itemRender = GuildDonationItemRender;
            this.renderView();
        }

        public renderView():void {
            let guildInfo = GuildModel.getInstance().guildInfo;
            this.lbTitle.text = `${guildInfo.name} Lv：${guildInfo.level}`;
			this.lbExp.text = guildInfo.exp + "/" + tb.TB_guild.get_TB_guildById(guildInfo.level).need_exp;
			this.expProg.value = guildInfo.exp / tb.TB_guild.get_TB_guildById(guildInfo.level).need_exp;
            this.lbGongxian.text = "X" + App.hero.guildDonate;
            this.list.array = GuildModel.getInstance().getDonationList();
        }

    }
}