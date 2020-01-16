

module game {

    export class ArtifactListIR extends ui.artifact.itemRender.ArtifactListIRUI{
        private _htmlText: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        constructor(){
            super();
            this.initHtmlText();
        }

        private initHtmlText(): void {
			this._htmlText.style.fontSize = this.lbDesc.fontSize;
			this._htmlText.style.leading = this.lbDesc.leading;
			this._htmlText.style.height = this.lbDesc.height;
			this._htmlText.style.width = this.lbDesc.width;
			this._htmlText.style.color = this.lbDesc.color;
			this._htmlText.style.font = this.lbDesc.font;
			this._htmlText.x = this.lbDesc.x;
			this._htmlText.y = this.lbDesc.y;
			this._htmlText.style.wordWrap = true;
            this.lbDesc.visible = false;
			this.addChild(this._htmlText);
		}

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():tb.TB_artifact {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
			if(info){
				this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(info.icon);
                this.lbName.text = info.name;
                let isUnlock = ArtifactModel.getInstance().isUnlock(info.ID);
                let isWear = App.hero.isWearArtifact(info.ID, iface.tb_prop.lineupTypeKey.attack);
                this.imgSuo.visible = this.imgShenqi.gray = this.btnOperate.gray = !isUnlock;
                this.imgSuo.visible = !isUnlock;
                this.btnOperate.label = isUnlock ? (isWear ? LanMgr.getLan("",12522) : LanMgr.getLan("",12366)) : LanMgr.getLan("",10434);
                this.btnOperate.on(Laya.Event.CLICK,this,this.onOperate);

                let skillLv: number = App.hero.artifactSkillLv;
                let skillid: number = info.ID * 1000 + skillLv;
                let artifactSkillT: tb.TB_artifact_skill = tb.TB_artifact_skill.get_TB_artifact_skillById(skillid);
                let skillT: tb.TB_skill = tb.TB_skill.get_TB_skillById(artifactSkillT.skill);
                let desc: string = artifactSkillT.next ? FormatStr(skillT.info, artifactSkillT.next).replace(/[\\]/ig, "") : skillT.info;
                this._htmlText.innerHTML = desc;
			} else{
                this.btnOperate.off(Laya.Event.CLICK,this,this.onOperate);
			}
        }

        private onOperate():void {
            if(this.btnOperate.gray){
                showToast(LanMgr.getLan(``,10243));
                return;
            }
            let info = this.dataSource;
			if(info){
                let wearid: number = App.hero.isWearArtifact(info.ID, iface.tb_prop.lineupTypeKey.attack) ? 0 : info.ID
                let obj = { id: wearid, type: iface.tb_prop.lineupTypeKey.attack };
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION), [obj, Artifact.WEAR_OR_TAKEOFF]);
            }
        }
		
    }
}