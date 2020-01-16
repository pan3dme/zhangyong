module common {
	export class StarList extends ui.component.StarListUI {
		private _starList:Laya.Image[];
		private static STAR_WIDTH:number = 28;
		constructor() {
			super();
			this._starList = [];
			for (let i:number = 0; i < 5; i++){
				this._starList[i] = this["img_"+i];
			}
			this.setStarNum(0, true);
		}

		private _num:number = 0;
		public setStarNum(num:number, force:boolean = false, spacex:number = 0):void{
			if (num < 0) num = 0;
			if (this._num == num && !force) return;

			this._num = num;
			if (this._num == 0){
				this.visible = false;
			}else{
				this.visible = true;

				if (this._starList){
					let len:number = this._starList.length;
					let shownum:number = this._num % len;
					if (shownum == 0) shownum = len;
					for (let i:number = 0; i < len; i++){
						let img:Laya.Image = this._starList[i];
						if (i < shownum){
							img.visible = true;
							img.skin = num > len ? "comp/image/juexing_xingji.png" : "comp/image/xinxi_xingji.png";
						}else{
							img.visible = false;
						}
					}

					//布局
					let totalW:number = StarList.STAR_WIDTH * shownum + (shownum-1)* spacex;
					let posx:number = (this.width - totalW + StarList.STAR_WIDTH)/2;
					for (let i:number = 0; i < shownum; i++){
						let img:Laya.Image = this._starList[i];
						img.x = posx;
						posx += StarList.STAR_WIDTH + spacex;
					}
				}
			}
			
		}
	
	}
}