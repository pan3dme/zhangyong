/**
* name 
*/
module common{
	export class ItemTip extends ui.component.ItemTipUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.lab_desc.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.init();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.init();
		}

		private init():void{
			let $data: any=this.dataSource;
			let vo = new ItemVo($data.ID || $data.id,$data.getNum());
			vo.show = false;
			this.ui_Itembox.dataSource = vo;
			let item = tb.TB_item.get_TB_itemById($data.ID || $data.id);
			this.lab_name.text = item.name;
			// this.lab_num.text = $data.getNum().toString() != 0 ? Snums($data.getNum()) : LanMgr.getLan("未知",-1);
			this.lab_num.text = Snums(App.hero.getBagItemNum(vo.id.toString()))+"";
			this.lab_desc.text = item.desc;
			this.lab_way.text = item.way;
		}

		private prevX:number = 0;
        private prevY:number = 0;
		 /* 开始滚动文本 */
        private startScrollText(e:Event):void
        {
            this.prevX = this.lab_desc.mouseX;
            this.prevY = this.lab_desc.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        }
        
        /* 停止滚动文本 */
        private finishScrollText(e:Event):void
        {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        }

        /* 鼠标滚动文本 */
        private scrollText(e:Event):void
        {
            var nowX:number = this.lab_desc.mouseX;
            var nowY:number = this.lab_desc.mouseY;
            this.lab_desc.textField.scrollX += this.prevX - nowX;
            this.lab_desc.textField.scrollY += this.prevY - nowY;
            this.prevX = nowX;
            this.prevY = nowY;
        }

		public close(){
			super.close();
		}
	}
}