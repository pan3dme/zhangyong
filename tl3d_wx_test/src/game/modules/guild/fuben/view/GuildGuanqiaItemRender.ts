/**
* name 
*/
module game{
    export class GuildGuanqiaItemRender extends ui.guild.copy.GuildGuanqiaUI{
        constructor(){
            super();
        }

        public set dataSource($value: GuildGuanqiaVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():GuildGuanqiaVo {
            return this._dataSource;
        }

        public refreshData() {
            let data = this.dataSource;
            if(data){
                this.lab_title.text = data.getName();
                this.img_icon.skin = SkinUtil.getHeadIcon(data.monster.icon); 
				let isLock = !data.isPass() && !data.isCurrent();
				this.box_icon.gray = isLock;
				this.imgSuo.visible = isLock;
            }else{
				this.ani_select.gotoAndStop(0);
				this.ani1.gotoAndStop(0);
			}
        }

		public setSelected(flag:boolean):void {
			this.ani_select.visible = flag;
			if (flag){
				this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                	this.ani_select.play();
					this.ani1.play(0,true);
            	}), ResConst.atlas_circle_select);
			}else{
				this.ani_select.gotoAndStop(0);
				this.ani1.gotoAndStop(0);
			}
		}

    }
}
