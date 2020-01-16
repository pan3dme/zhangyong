/**
* name 
*/
module common{
	export class ManyItemsTip extends ui.component.ManyItemsTipUI{
		constructor(){
			super();
			this.isModelClose = true;
		}

		public popup():void{
			super.popup();
			this.initView(this.dataSource.data);
			if(this.dataSource.info){
				this.lab_info.text = this.dataSource.info;
			}
		}

		private initView(data:Array<ItemVo>){
			this.list_item.x = 301 - ((45 + (this.list_item.spaceX / 2)) * this.dataSource.length);
			this.list_item.array = data;
			this.list_item.width = data.length * 90 + (data.length - 1) * this.list_item.spaceX;
		}

		public onClosed():void{
			super.onClosed();
			this.list_item.array = null;
		}
	}
}