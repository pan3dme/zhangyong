/**
* name 
*/
module game {
	export class UnLockView extends ui.artifact.ArtifactUnLockUI {
		private uiScene: Base2dSceneLayer;
		constructor() {
			super();
			this.lab_text.text = ``;
			this.lab_text.alpha = 0;
			this.lab_close.alpha = 0;
			this.isModelClose = false;
			this.img_bg.zOrder = 100;
			this.uiScene = new Base2dSceneLayer();
			this.addChild(this.uiScene);
			this.img_zhezhao.on(Laya.Event.CLICK, this, this.onExit)
		}

		close():void {
			super.close();
			this.uiScene.onExit();
			Laya.timer.clearAll(this);
		}

		public show(): void {
			super.show(false, false);
			this.uiScene.onShow();
			this.initView(this.dataSource);
		}

		private initView(data: tb.TB_artifact) {
			if (!data) return;
			this.lab_text.text = LanMgr.getLan("",12512,data.name);
			this.lab_text.centerX = 0;
			Laya.Tween.to(this.img_bg, { alpha: 0 }, 500, null, Handler.create(this, () => {
				this.uiScene.addEffect(this, 10000016, new tl3d.Vector3D(180, 0, -350), 7, 3, null, 180);
				Laya.timer.frameOnce(60, this, () => {
					this.refreshModel(data);
				});
				Laya.Tween.to(this.lab_text, { alpha: 1 }, 500)
				Laya.Tween.to(this.lab_close, { alpha: 1 }, 800, null, Handler.create(this, () => { 
					this.isModelClose = true;
					dispatchEvt(new ArtifactEvent(ArtifactEvent.SHOW_VISIBLE_TRUE));
				 }));
			}))
		}

		/**
         * 刷新模型id
         * @param modeid 模型id
         */
		public refreshModel(tbArtifact: tb.TB_artifact) {
			let locations = tbArtifact.location;
			this.uiScene.addModelChar(tbArtifact.model.toString(), (Laya.stage.width >> 1)
				+ Number(locations[0]) - Launch.offsetX, Number(locations[1]+150), Number(locations[2]), Number(locations[3]), Number(locations[4]));
		}

		public onExit() {
			if (this.isModelClose) {
				this.img_bg.alpha = 1;
				this.lab_text.alpha = 0;
				this.lab_text.text = ``;
				this.lab_close.alpha = 0;
				this.isModelClose = false;
				this.close();
			}
		}
	}
}