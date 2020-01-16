/**
* name 
*/
module game{
	export class godFuseIR extends ui.god.render.RonghunBoxUI{

		private _oldAttrVal : number = -1;
		constructor(){
			super();
		}

		public set dataSource($value) {
            this._dataSource = $value;
            this.initView();
        }

        public get dataSource() {
            return this._dataSource;
        }

		private initView() {
			if(this.dataSource){
				this.img_jindu.skin = SkinUtil.getJinduBox(this._dataSource.attrNo);
				this.icon.skin = SkinUtil.getAwakenIcon(this._dataSource.attrNo);
				this.updateView();
				this.ballRP.onDispose();
				this.ballRP.setRedPointName(`god_ball_${this._dataSource.curVo.uuid}_${this._dataSource.attrNo}`);

			}else{
				this.ballRP.onDispose();
				this.img_jindu.mask = null;
				this._oldAttrVal = -1;
			}
        }

		public setSelect(val:boolean):void{
			if (val){
				this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                	this.ani_select.play();
                	this.ani_select.visible = true;
            	}), ResConst.atlas_circle_select);
			}else{
				this.ani_select.visible = false;
				this.ani_select.gotoAndStop(0);
			}
		}

		private updateView():void {
			let godVo = this._dataSource.curVo as GodItemVo;
			let type = this._dataSource.attrNo;
			let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
			let attr = godVo.countRonghunAttr();
			let jindu = attr[type] > fusiontab.getMaxAttr(type) ? 1 : attr[type] / fusiontab.getMaxAttr(type);
			/**上升效果 */
			let mask : Laya.Sprite = this.img_jindu.mask;
			if(!this.img_jindu.mask){
				mask = new Laya.Sprite();
				mask.graphics.drawRect(0, 0, 107,107, "");
				this.img_jindu.mask = mask;
			}
			if(this._oldAttrVal == -1){
				mask.pos(0, 107 * (1-jindu));
				this._oldAttrVal = attr[type];
			}else{
				Laya.Tween.to(mask, { y: 107 * (1-jindu)}, 500);
			}
			this.lbMax.visible = attr[type] >= fusiontab.getMaxAttr(type);
			this.lab_attr.text = LanMgr.attrName[type] +"："+attr[type];
		}

	}
}