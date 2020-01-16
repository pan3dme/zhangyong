

module common {
	export class GodRaceAddIR extends ui.box.GodRaceAddUI {
		constructor() {
			super();
		}

		set dataSource(v) {
			this._dataSource = v;
			this.refresh();
		}

		get dataSource(): {isActive:boolean,tbData:tb.TB_halo} {
			return this._dataSource;
		}

		private _autoCheck:boolean = true;
		public autoCheckActive(val:boolean):void{
			this._autoCheck = val;
		} 

		private refresh(): void {
			let info : {isActive:boolean,tbData:tb.TB_halo} = this.dataSource;
			if (info){
				let temp:tb.TB_halo = info.tbData;
				this.lab_title.text = temp.conditionStr+":";
				this.lab_content.text = temp.desc;
				this.lab_content.color = this.lab_title.color = info.isActive ? "#008f07" : "#656565";
				this.lab_content.x = this.lab_title.x + this.lab_title.width + 5;
			}
		}

	}
}
