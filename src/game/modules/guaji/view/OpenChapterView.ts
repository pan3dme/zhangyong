/**
* name 
*/
module game {
	export class OpenChapterView extends ui.guaji.OpenChapterViewUI {
		static TYPE_GUAJI:number = 0;//挂机
		static TYPE_SHILIANTA:number = 1;//试炼塔
		constructor() {
			super();
			this.isModelClose = false;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(false, false);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(false, false);
			
            this.initView();
        }

		public close() {
            super.close(null, false, false);
      
            
        }

        /** 界面移除 */
        public onClosed(): void {
            super.onClosed();
			this.ani_hide.gotoAndStop(0);
			this.ani_show.gotoAndStop(0);
			this.ani_guang.gotoAndStop(0);
			Laya.timer.clearAll(this);
			this._zhangjievo = null;
        }

		private _type:number = 0;
		private _isOpenNew:boolean;
		private _zhangjievo:ZhangjieVo;
        private initView(): void {
            this.ani_show.on(Laya.Event.COMPLETE, this, this.onAniShowComplete);
			this.ani_hide.on(Laya.Event.COMPLETE, this, this.onAniHideComplete);

			this._type = this.dataSource.type;
			switch(this._type){
				case OpenChapterView.TYPE_GUAJI:
					this._isOpenNew = this.dataSource.isnew;
					this._zhangjievo = this.dataSource.infovo;

					this.lab_name.text = this._zhangjievo.tbCopy.name;
					this.lab_title.text = this._isOpenNew ? "开启新章节":"挂机";
					break;
				case OpenChapterView.TYPE_SHILIANTA:
					this._isOpenNew = true;
					this.lab_name.text = "下一层";
					this.lab_title.text = "";
					break;
			}
			
			this.isModal = this._isOpenNew;
			this.ani_hide.gotoAndStop(0);
			this.ani_hide.visible = false;
			this.ani_show.play(0, false);
			this.ani_show.visible = true;
			this.ani2.gotoAndStop(0);
			this.ani1.play(0, false);
			this.ani_guang.play(0,true);
			// if (this._isOpenNew){
			// 	this.ani_hide.gotoAndStop(0);
			// 	this.ani_hide.visible = false;
			// 	this.ani_show.play(0, false);
			// 	this.ani_show.visible = true;
			// }else{
			// 	this.ani_hide.gotoAndStop(0);
			// 	this.ani_hide.visible = true;
			// 	this.ani_show.gotoAndStop(0);
			// 	this.ani_show.visible = false;
			// 	this.onAniShowComplete();
			// }
        }

		//
		private onAniShowComplete():void{
			
			Laya.timer.once(1000, this, ()=>{
				this.ani_show.visible = false;
				this.ani_hide.visible = true;
				this.ani_hide.play(0, false);
				this.ani2.play(0, false);
			});
		}

		private onAniHideComplete():void{
			this.close();
		}

		

		



	
	}
}