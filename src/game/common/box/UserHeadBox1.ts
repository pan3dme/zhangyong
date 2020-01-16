/**
* name 
*/
module common {
	export class UserHeadBox1 extends ui.box.UserHeadBox1UI {
		constructor() {
			super();
		}

		public set dataSource($data: inface.IUserHeadData) {
			this._dataSource = $data;
			if ($data) {
				let frameSkin = $data.getFrame();
				this.img_frame.visible = frameSkin ? true : false;
				if(frameSkin){
					this.img_frame.skin = frameSkin
				}
				this.imgLv.skin = $data.getImgLv();
				this.img_icon.skin = $data.getIconUrl();
				if ($data.getLevel() >= 0) {
					this.box_lev.visible = true;
					this.txt_lv.text = $data.getLevel().toString();
				} else {
					this.box_lev.visible = false;
					this.txt_lv.text = "";
				}
			}
			else {
				this.img_icon.skin = null;
				this.img_frame.visible = false;
				this.box_lev.visible = false;
			}
		}
	}
}