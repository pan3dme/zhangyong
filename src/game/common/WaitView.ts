/**
* name 
*/
module common{
	export class WaitView extends ui.login.WaitUI {
		private _progress: number;
		constructor(){
			super();
		}

        public onOpened(): void{
			this.lbl_progress.text =this.dataSource?this.dataSource: LanMgr.getLan("加载中...",-1);
			if(this.ani_load) this.ani_load.play(0, true);
			super.onOpened();
		}


		public onClosed(): void{
			if(this.ani_load) this.ani_load.stop();
			super.onClosed();
		}

		  //设置进度条
        public setProgress(value: number): void {
            this._progress = Math.ceil(value * 100);
            this.lbl_progress.text = this._progress + "%";
        }

	}
}