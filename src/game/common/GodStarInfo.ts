/**
* name 
*/
module common{
	export class GodStarInfo extends ui.component.GodStarInfoUI {
		private _allStar:Laya.Image[];
		private _starNum:number = 0;
		private _starWidth:number = 0;
		private _showNum:number = 0;
		constructor(){
			super();

			this._allStar = [];
			for (let i:number = 0;i < 10; i++){
				let img:Laya.Image = this.getChildByName("img_star_"+i) as Laya.Image;
				if (!img){
					break;
				}
				img.visible = false;
				this._allStar[i] = img;
			}
			this._starNum = this._allStar.length;
			this._starWidth = this.width / this._starNum;
			this.starAlign = GodStarInfo.STAR_ALIGN_CENTER;
		}

		private _starLv:number = 0;

		public get starLevel():number{
			return this._starLv;
		}

		public set starLevel(val:number){
			if (val < 0) val = 0;
			if (this._starLv == val) return;
			this._starLv = val;

			let skin:string = val > this._starNum ? "comp/image/juexing_xingji.png" : "comp/image/xinxi_xingji.png";
			this._showNum = (val -1) % this._starNum + 1;
			for (let i:number = 0; i < this._starNum; i++){
				if (i < this._showNum){
					//显示
					this._allStar[i].visible = true;
					this._allStar[i].skin = skin;
				}else{
					this._allStar[i].visible = false;
				}
			}

			this.layoutStar();
		}

		//布局
		static STAR_ALIGN_LEFT:number = 0;
		static STAR_ALIGN_CENTER:number = 1;
		static STAR_ALIGN_RIGHT:number = 2;

		private _starAlign:number = 0;
		public get starAlign():number{
			return this._starAlign;
		}

		public set starAlign(val:number){
			if (this._starAlign == val) return;
			this._starAlign = val;
			this.layoutStar();
		}

		private layoutStar():void{
			if (this._showNum <= 0) return;

			let showWidth:number = this._starWidth * this._showNum;

			let startPosx:number = 0;
			switch(this._starAlign){
				case GodStarInfo.STAR_ALIGN_CENTER:
					startPosx = (this.width - showWidth)/2;
					break;
				case GodStarInfo.STAR_ALIGN_RIGHT:
					startPosx = this.width - showWidth;
					break;
			}

			for (let i:number = 0; i < this._showNum; i++){
				let starImg:Laya.Image = this._allStar[i];
				starImg.x = startPosx + i*this._starWidth;
			}
		}

		//获取显示的星星总宽度
		public getTotalStarWidth():number{
			return this._showNum * this._starWidth;
		}

        

	}
}