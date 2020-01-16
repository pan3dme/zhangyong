module common {
	/*
	* name;
	*/
	export class CamraView extends ui.component.CamraUI {
		constructor(scene) {
			super();
			this._scene = scene;
			this.bar_1.changeHandler = new Handler(this, this.Change1);
			this.bar_2.changeHandler = new Handler(this, this.Change2);
			this.bar_3.changeHandler = new Handler(this, this.Change3);
			this.bar_4.changeHandler = new Handler(this, this.Change4);
			this.bar_5.changeHandler = new Handler(this, this.Change5);
			this.bar_6.changeHandler = new Handler(this, this.Change6);
			this.bar_7.changeHandler = new Handler(this, this.Change7);
			this.bar_8.changeHandler = new Handler(this, this.Change8);
			this.bar_9.changeHandler = new Handler(this, this.Change9);
			this.bar_10.changeHandler = new Handler(this, this.Change10);
			this.btn_fre.on(Laya.Event.CLICK, this, this.initCam);
			this.btn_vis.on(Laya.Event.CLICK, this, () => {
				this._scene.LogPos();
				this._vis = !this._vis;
				this.box_item.visible = this._vis;
			});

			this.initCam();
		}
		private _scene: game.FightScene;
		private _vis: boolean = true;

		private Change1(value: number): void {
			this.lbl_1.text = value.toString();
			this._scene.gameScene.camRotationX = value;
		}

		private Change2(value: number): void {
			this.lbl_2.text = value.toString();
			this._scene.gameScene.camRotationY = value;
		}

		private Change3(value: number): void {
			this.lbl_3.text = value.toString();
			this._scene.gameScene.camDistance = value;
		}

		private Change4(value: number): void {
			this.lbl_4.text = value.toString();
			this._scene.gameScene.camPositionX = value;
		}

		private Change5(value: number): void {
			this.lbl_5.text = value.toString();
			this._scene.gameScene.camPositionY = value;
		}

		private Change6(value: number): void {
			this.lbl_6.text = value.toString();
			this._scene.gameScene.camPositionZ = value;
		}

		private Change7(value: number): void {
			this.lbl_7.text = value.toString();
			this._scene.gameScene.camViewLH = value / 100;
		}

		private Change8(value: number): void {
			this.lbl_8.text = value.toString();
			this._scene.gameScene.camFar = value;
		}

		private Change9(value: number): void {
			this.lbl_9.text = value.toString();
			Scene_data.fogData[0] = value;
		}

		private Change10(value: number): void {
			this.lbl_10.text = value.toString();
			Scene_data.fogData[1] = value / 1000;
		}

		private initCam(): void {
			this.bar_1.value = this._scene.gameScene.camRotationX;
			this.bar_2.value = this._scene.gameScene.camRotationY;//水平旋转
			this.bar_3.value = this._scene.gameScene.camDistance;
			this.bar_4.value = this._scene.gameScene.camPositionX;//px
			this.bar_5.value = this._scene.gameScene.camPositionY;
			this.bar_6.value = this._scene.gameScene.camPositionZ;
			this.bar_7.value = this._scene.gameScene.camViewLH * 100;
			this.bar_8.value = this._scene.gameScene.camFar;
			this.bar_9.value = Scene_data.fogData[0];
			this.bar_10.value = Scene_data.fogData[1] * 1000;
		}
	}
}