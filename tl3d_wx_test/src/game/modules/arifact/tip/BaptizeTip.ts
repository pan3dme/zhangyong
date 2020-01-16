/**
* name 
*/
module game{
	export class BaptizeTip extends ui.artifact.tip.BaptizeTipUI{
		constructor(){
			super();
			this.isModelClose = true;
            this.bgPanel.dataSource = {uiName:UIConst.Artifact_BaptizeTip,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12530)};
		}

		public popup():void{
			super.popup();
			let baptizeLv:number = App.hero.artifactBaptizeLv;
			let baptizeExp:number = App.hero.artifactBaptizeExp;
			this.lab_Lv.text = LanMgr.getLan("",12531,baptizeLv);
			this.lab_Exp.text = LanMgr.getLan("",12532) + `：${baptizeExp}/${tb.TB_artifact_baptize.get_TB_artifact_baptizeById(baptizeLv).exp}`;
		}

		public onClosed():void{
			super.onClosed();
			this.lab_Lv.text = ``;
			this.lab_Exp.text = ``;
		}
	}
}