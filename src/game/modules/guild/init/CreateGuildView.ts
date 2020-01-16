/**
* name 
*/
module game {
	export class CreateGuildView extends ui.guild.init.CreateGuildUI {

		private _model : GuildModel;
		constructor() {
			super();
			this.isModelClose = true;
			this._model = GuildModel.getInstance();
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
			this.bgPanel.dataSource = null;
			this.btn_red.off(Laya.Event.CLICK, this, this.redlevel);
			this.btn_add.off(Laya.Event.CLICK, this, this.addlevel);
			this.btn_create.off(Laya.Event.CLICK, this, this.create);
			this.lab_level.off(Laya.Event.INPUT, this, this.onput);
			this.img_icon.off(Laya.Event.CLICK, this, this.changeIcon);
			this.btn_seticon.off(Laya.Event.CLICK, this, this.changeIcon);
        }

		private initView(): void {
			this.btn_red.on(Laya.Event.CLICK, this, this.redlevel);
			this.btn_add.on(Laya.Event.CLICK, this, this.addlevel);
			this.btn_create.on(Laya.Event.CLICK, this, this.create);
			this.lab_level.on(Laya.Event.INPUT, this, this.onput);
			this.img_icon.on(Laya.Event.CLICK, this, this.changeIcon);
			this.btn_seticon.on(Laya.Event.CLICK, this, this.changeIcon);
			let model = this._model;
			this.img_icon.skin = model.createInitIconID ? SkinUtil.getGuildHeadIconById(model.createInitIconID) : SkinUtil.getGuildHeadIconById(1);
			this.lab_diamonds.text = "x" + tb.TB_guild_set.getSet().create_cost[1];
			this.bgPanel.dataSource = { uiName: UIConst.CreateGuildView, closeOnSide: this.isModelClose, title:"创建公会" };
			let needVip = tb.TB_guild_set.getSet().create_viplevel;
			this.lbVip.text = `VIP${needVip}可创建公会`;
			this.lbVip.color = App.hero.vip >= needVip ? ColorConst.GREEN : ColorConst.RED;
		}

		private onput(): void {
			this.btn_red.disabled = Number(this.lab_level.text) == 1;
			this.btn_add.disabled = Number(this.lab_level.text) == 50;
			this.lab_level.text = Math.min(50, Number(this.lab_level.text)).toString();
			this.lab_level.text = Math.max(1, Number(this.lab_level.text)).toString();
		}

		private redlevel(): void {
			this.lab_level.text = Math.max(1, Number(this.lab_level.text) - 1).toString();
		}

		private addlevel(): void {
			this.lab_level.text = Math.min(50, Number(this.lab_level.text) + 1).toString();
		}

		private create(): void {
			let info = {name:this.are_putin.text, level:parseInt(this.lab_level.text), auto:this.chk_auto.selected, head:this._model.createInitIconID};
			dispatchEvt(new GuildEvent(GuildEvent.CREATE_GUILD,info));
		}

		private changeIcon(): void {
			let model = this._model;
			let dataSource = {type: GuildIconChangeType.createChange, iconId:model.createInitIconID, list_icon: model.getIconList()};
			dispatchEvt(new GuildEvent(GuildEvent.CHANGE_GUILD_ICON), dataSource);
		}
		
		public changeIconSuccess(iconVo :IconVo): void {
			this.img_icon.skin = SkinUtil.getGuildHeadIcon(iconVo.tbHead.icon); 
			this._model.createInitIconID = iconVo.tbHead.ID;
		}
        
	}
}