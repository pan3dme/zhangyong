/**
* 基础列表格子
*/
module common {
	export class ItemBox extends ui.box.ItemBoxUI {

		constructor() {
			super();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public set dataSource(data: inface.IItemData) {
			this._dataSource = data;
			this.lbLevel.visible = false;
			if (data) {
				this.img_icon.skin = data.getIconUrl();
				this.img_qulity.skin = data.getQulity();
				let isChip = data.isChip();
				this.img_suipian.visible = isChip;
				if(isChip && GameUtil.isFunction(data.getChipSkin)) {
					this.img_suipian.skin = data.getChipSkin();
				}
				let moreSix=data.isMoreThanSix();
				if(moreSix)
				{
					this.list_awake.repeatX = data.getStar()-5;
					this.list_awake.visible=true;
					this.list_star.visible=false;	
				}
				else
				{
					this.list_star.visible = data.getStar() == 0 ? false : true;
					this.list_star.repeatX = data.getStar();	
					this.list_awake.visible=false;
				}
				this.img_race.visible = data.showRace() == 0 ? false : true;
				if (this.img_race.visible) {
					this.img_race.skin = SkinUtil.getGodRaceSkin(Number(data.showRace()));
				}
				if( GameUtil.isFunction(data.getLvStr)){
					let str = data.getLvStr();
					this.lbLevel.visible = str && str!="";
					this.lbLevel.text = str;
				}
				if (data instanceof ItemVo || data instanceof tb.TB_item || data instanceof TreasureItemVo || data instanceof GemstoneItemVo) {
					let num = data.getNum();
					let constnum = data.getConstNum();
					if (data.getShow()) {
						this.on(Laya.Event.CLICK, this, this.showTip);
					}
					if (num > 0 || constnum > 0) {
						this.label_number.visible = true;
						if (constnum > 0) {
							this.label_number.text = Snums(num) + "/" + Snums(constnum);
							this.label_number.color = num >= constnum ? ColorConst.WHITE : ColorConst.redFont;
						}
						else {
							this.label_number.text = "x" + Snums(num);
						}
					} else {
						this.label_number.text = "";
					}
					if(data instanceof TreasureItemVo){
						this.label_number.text = num > 0 && !data.isExsitGod() ? "x" + Snums(num) : "";
						this.lbLevel.visible = data.strengthLv > 0;
						this.lbLevel.text = "+" + data.strengthLv;
					}else if(data instanceof GemstoneItemVo){
						this.label_number.text = num > 0 && !data.isExsitGod() ? "x" + Snums(num) : "";
						this.lbLevel.visible = data.gemLv > 0;
						this.lbLevel.text = "Lv." + data.gemLv;
					}
				}else if (data instanceof EquipItemVo) {
					if (data.getShow()) {
						this.on(Laya.Event.CLICK, this, this.showTip);
					}
					if(data.type == 1){
						var slv=data.getRefineLevel();//精炼
						this.label_number.visible =  slv!= 0; 
						this.label_number.text = "+" + slv;
						this.label_number.y=7;
					}
					else if(data.type == 0){
						var slv=data.getStrengthLv();//强化
						this.label_number.visible =  slv!= 0; 
						this.label_number.text = "+" + slv;
						this.label_number.y=62;
					}
					else 
					{
						this.label_number.text = "";
					}
				}else {
					this.label_number.text = "";
				}
				if (data.isStartAction()) {
					this.scale(1.4, 1.4);
					this.visible = false;
				}
			}
			else //清理格子
			{
				this.list_star.visible = false;
				this.off(Laya.Event.CLICK, this, this.showTip);
				this.img_qulity.skin = SkinUtil.getBoxQulityIcon(1);
				this.img_icon.skin = null;
				this.label_number.text = "";
			}
		}
		/** 手动添加tips打开事件 */
		public addTipsListener():void {
			this.on(Laya.Event.CLICK, this, this.showTip);
		}

		/**
		 * 显示tip
		 */
		private showTip(): void {
			if (this._dataSource instanceof ItemVo || this._dataSource instanceof tb.TB_item){
				let itemtemp:tb.TB_item;
				if (this._dataSource instanceof ItemVo){
					itemtemp = tb.TB_item.get_TB_itemById(this._dataSource.id);
				}else{
					itemtemp = this._dataSource;
				}
				if (itemtemp && itemtemp.type == iface.tb_prop.itemTypeKey.treasure){
					let treasureVo:TreasureItemVo = new TreasureItemVo(itemtemp);
					UIUtil.showTip(treasureVo);
				}else{
					UIUtil.showTip(this._dataSource);
				}
			}else{
				UIUtil.showTip(this._dataSource);
			}
		}
	}
}