/**
* name 
*/
module game{
	export class TuijianView extends ui.tujian.TuijianViewUI{
		constructor(){
			super();
			this.list_buttons.selectHandler = new Handler(this, this.onSelectTab);
            this.list_buttons.renderHandler = new Handler(this, this.onRenderTab);
			this.list_yeqian.selectHandler = new Handler(this, this.onSelectYeqian);
            this.list_yeqian.renderHandler = new Handler(this, this.onRenderYeqian);
			this.panel_info.vScrollBarSkin = "";
		}

		public onShow() {
			this.btn_left.on(Laya.Event.CLICK,this,this.onChange, [true]);
			this.btn_right.on(Laya.Event.CLICK,this,this.onChange, [false]);
			this.list_buttons.dataSource = TujianModel.getInstance().tabNames;
			this.list_buttons.selectedIndex = 0;
			this.onSelectTab(0);
		}

		public onExit():void{
			this.btn_left.off(Laya.Event.CLICK, this, this.onChange);
			this.btn_right.off(Laya.Event.CLICK, this, this.onChange);
			this.list_yeqian.dataSource=null;
			this.lab_info.text="";
			this.lab_location.text="";
		}

		/**
		 * 选择标签页
		 * @param index 
		 */
		private onSelectTab(index: number) {
			if(index == -1) return;
			this.lbName.text = TujianModel.getInstance().tabNames[index];
            this.curTabIdx = index;
			let dataAry = TujianModel.getInstance().yeqianData[index];
			this.list_yeqian.dataSource = dataAry;
			let len = dataAry.length;
			this.list_yeqian.repeatX = len;
			this.list_yeqian.width = len * 20 + (len-1) * this.list_yeqian.spaceX;
			this.list_yeqian.selectedIndex = 0;
			this.onSelectYeqian(0);
        }

		/**
		 * 选择页签
		 * @param index 
		 */
		private onSelectYeqian(index: number) {
			if(index == -1) return;
            this.curYeqianIdx = index;
			this.refreshTabData(index);
        }

		private refreshTabData(index: number) {
			let squadtab:tb.TB_recommend_squad = tb.TB_recommend_squad.get_TB_recommend_squadById((index+1)+(this.curTabIdx+1)*10);
			let nexttab: tb.TB_recommend_squad = tb.TB_recommend_squad.get_TB_recommend_squadById((index+2)+(this.curTabIdx+1)*10)
			// this.btn_left.gray = this.btn_left.disabled = index==0?true:false;
			// this.btn_right.gray = this.btn_right.disabled = !nexttab?true:false;
			this.btn_left.visible = index == 0 ? false : true;
			this.btn_right.visible = !nexttab ? false : true;
			this.lab_info.text = squadtab.desc;
			this.lab_location.text = squadtab.location;
			for (var i = 0; i < 6; i++) {
				this["ui_Item"+i].dataSource = squadtab.god[i];
			}
			this.panel_info.refresh();
		}

		private curTabIdx = -1;
		private onRenderTab(itemRender: Laya.Button, index: number) {
            itemRender.label = itemRender.dataSource;
			itemRender.skin = index == this.curTabIdx ? SkinUtil.fenye_down : SkinUtil.fenye_up;
			// itemRender.selected = index == this.curTabIdx;
			itemRender.labelSize = this.list_buttons.selectedIndex == index ? 24 : 22;
			itemRender.labelColors = this.list_buttons.selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
			itemRender.labelBold = true;
        }

		private curYeqianIdx = -1;
		private onRenderYeqian(itemRender: YeqianIR, index: number) {
			itemRender.img_yellow.visible = index == this.curYeqianIdx;
        }

		/**
		 * 点击左右按钮
		 * @param left 
		 */
		private onChange(left:boolean) {
			if(left) {
				this.list_yeqian.selectedIndex = this.curYeqianIdx - 1;
			} else {
				this.list_yeqian.selectedIndex = this.curYeqianIdx + 1;
			}
		}
	}
}