/**
* name 
*/
module game {
	export class EnchantTip extends ui.artifact.tip.EnchantTipUI {
		constructor() {
			super()
			this.isModelClose = true;
			this.bgPanel.dataSource = {uiName:UIConst.Artifact_EnchantTip,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12525)};
		}

		public popup(): void {
			super.popup();
			let starLV:number = App.hero.artifactStarLv;
			this.lab_explain.text = LanMgr.getLan("",12526);
			
			this.lab_lv.text = LanMgr.getLan("",12529,starLV);
			this.lab_tips.text = LanMgr.getLan("",12527);
			var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact_enchant)
            for (var $key in $obj.data) {
				let id:number = $obj.data[$key].ID;
				if (id < 2) continue;
				let lab:Laya.Label = id <= starLV ? this.lab_details : this.lab_details_no;
				lab.text += `${id}${LanMgr.getLan("",12528)}：`;
				let specialArr:number[][] = $obj.data[$key].enchant_special;
				for (let j in specialArr) {
					if (Number(j) > 0 && Number(j) < 2) lab.text += `,`;
					lab.text += `${LanMgr.attrName[specialArr[j][0]]}+`;
					lab.text += specialArr[j][0] > 4 ? `${Math.floor(specialArr[j][2] * 100)}%` : `${specialArr[j][2]}`;
					if (Number(j) > 0 && Number(j) < 2 && specialArr.length >= 3) lab.text += `\n`;
				}
				lab.text += `\n`;
			}
			let str:string = this.lab_details.text;
			this.lab_details.text = str.substring(0, str.length-1);
			this.lab_details_no.y = this.lab_details.y + this.lab_details.height;
		}

		public onClosed(): void {
			super.onClosed();
			this.lab_details.text = ``;
			this.lab_details_no.text = ``;
		}

	}
}