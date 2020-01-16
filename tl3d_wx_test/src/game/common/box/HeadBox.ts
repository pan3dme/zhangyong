/**
* name 
*/
module common {
	import LList=Laya.List;
	import LImage=Laya.Image;
	export class HeadBox extends ui.box.HeadBoxUI {
		_img_shangzhen:LImage;
		constructor() {
			super();		
			// UIUtil.createHeadMask(this.img_icon, this.img_icon.width/2);
		}

		//出战图片
		public get img_shangzhen():LImage{
			if(!this._img_shangzhen){
				this._img_shangzhen=new LImage(SkinUtil.chuzhan);
				this._img_shangzhen.scale(0.7, 0.7);
				this._img_shangzhen.x=1,this._img_shangzhen.y=33;
				this.addChild(this._img_shangzhen);
			}
			return this._img_shangzhen;
		}

		getDataSource():any{
			return this._dataSource;
		}

		public set dataSource(data: inface.IHeadData) {
			this._dataSource = data;
			if (data) {
				this.img_icon.skin = data.getIconUrl();
				this.img_qulity.skin = data.getFrameUrl();
				if(typeof data.getLevelStr == "function" && data.getLevelStr() !== void 0){
					this.txt_lv.text = data.getLevelStr();
				}else{
					this.txt_lv.text = data.getLevel() == 0 ? "" : data.getLevel().toString();
				}
				// this.img_awake.visible = data.isAwaken();
				this.img_race.visible = data.getRaceType();
				if(data.getRaceType()) //阵营
				{
					this.img_race.skin = SkinUtil.getGodRaceSkin(data.getRaceType());
				}
				if (this._dataSource.getDataType() == 1) {
					this.img_icon.on(Laya.Event.CLICK,this,this.onshow);
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
					this.list_awake.visible = false;
				}
			
			}
			else {
				this.img_race.visible = false;
				this.img_icon.skin = this.img_qulity.skin = null;
				this.txt_lv.text = "";
				this.img_icon.off(Laya.Event.CLICK,this,this.onshow);
				this.list_awake.visible=false;
				this.list_star.visible=false;
				this.list_awake.repeatX=0;
				this.list_star.repeatX=0;
			}
		}

		private onshow():void{
			dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL),this._dataSource);
		}
	}
}