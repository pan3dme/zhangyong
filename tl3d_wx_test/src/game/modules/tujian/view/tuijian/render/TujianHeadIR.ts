/**
* name 
*/
module game{
	export class TujianHeadIR extends ui.tujian.render.TuijianIRUI{
		constructor(){
			super();
			this.headIcon.on(Laya.Event.CLICK,this, this.onHead);
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refreshData() {
			if(this._dataSource){
				let godtab: tb.TB_god = tb.TB_god.get_TB_godById(this._dataSource[0]);
				let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(this._dataSource[1]);
				let realDegree = this._dataSource[1]<=5?this._dataSource[1]:6;
				let obj = { templateId: godtab.ID, starLevel: this._dataSource[1], level: evotab.level, skill: godtab.skill, degree: realDegree };
				let godData: GodItemVo = new GodItemVo(obj);
				godData.levelStr = "";
				godData.level = 0;
				this.lab_name.text = godtab.name;
				this.headIcon.visible = true;
				this.headIcon.dataSource = godData;
				this.godInfoData = godData;
			}else{
				this.headIcon.visible = false;
				this.headIcon.dataSource = null;
			}
		}

		private godInfoData: GodItemVo;
		private onHead() {
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL), this.godInfoData);
		}
	}

	export class YeqianIR extends ui.tujian.render.YeqianIRUI{
		constructor(){
			super();
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refreshData() {
			if(!this._dataSource) return;
			
		}
	}
}