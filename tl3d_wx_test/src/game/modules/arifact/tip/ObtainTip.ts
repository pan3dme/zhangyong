/**
* name 
*/
module game {
	export class ObtainTip extends ui.artifact.tip.ObtainTipUI {
		private _htmlText: Laya.HTMLDivElement = new Laya.HTMLDivElement();
		constructor() {
			super()
			this.initHtmlText();
			this.isModelClose = true;
			this.bgPanel.dataSource = {uiName:UIConst.Artifact_ObtainTip,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12523)};
		}

		popup(): void {
			super.popup();
			this.initView();
		}

		private initView(): void {
			let model = ArtifactModel.getInstance();
			let attrTxt = ``;
			let data = ArtifactModel.getArtObtain();
			let obtainNum = model.getUnlockArtifactNum();
			this.lbhas.text = LanMgr.getLan("",12515,obtainNum);
			let tbs = tb.TB_artifact_obtain.get_TB_artifact_obtain();
			for (let key in tbs) {
				let color = ~~tbs[key].ID <= obtainNum ? ColorConst.TASK_GREEN : ColorConst.normalFont;
				attrTxt += `<span style='color:${color};'>${tbs[key].ID}${LanMgr.getLan("",12524)}：</span>`;
				for (let v in tbs[key].attr) {
					let attr = tbs[key].attr[v];
					let name = LanMgr.attrName[attr[0]];
					let value = Number(attr[2]) >= 1 ? `+${attr[2]}` : `+${attr[2] * 100}%`;
					attrTxt += `<span style='color:${color};'>${name + value}</span>` + `<span></span>&nbsp;`;
					if (~~v == 2 && tbs[key].attr.length > 3) attrTxt += `<br/>` + `<span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
				}
				attrTxt += `<br/><br/><br/>`;
			}
			this._htmlText.innerHTML = attrTxt;
		}

		private initHtmlText(): void {
			this._htmlText.style.fontSize = this.lab_details.fontSize;
			this._htmlText.style.leading = this.lab_details.leading;
			this._htmlText.style.color = ColorConst.GRAY;
			this._htmlText.style.width = this.width;
			this._htmlText.style.valign = "center";
			this._htmlText.y = this.lab_details.y + 10;
			this._htmlText.x = this.lab_details.x - 25;
			this._htmlText.style.wordWrap = true;
			this.addChild(this._htmlText);
		}

		onClosed(): void {

		}
	}
}