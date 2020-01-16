/**
* name 
*/
module game{
	export class HudChangeNameView extends ui.hud.player.ChangeNameUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.btn_queding.on(Laya.Event.CLICK, this, this.onChange);
			this.lab_diamonds.text = tb.TB_game_set.get_TB_game_setById(1).modify_name_cost[1].toString();
			this.bgPanel.dataSource = { uiName: UIConst.Hud_ChangeNameView, closeOnSide: this.isModelClose,title:"修改昵称" };
		}

		public popup(){
			super.popup();
		}

		public onChange(){
			if(!this.textInput.text||this.textInput.text == ""){
				showToast(LanMgr.getLan('', 10129));
			}else if(App.hero.diamond < tb.TB_game_set.get_TB_game_setById(1).modify_name_cost[1]){
				showToast(LanMgr.getLan('', 10130));
			}else if(this.lengthCount()){
				showToast(LanMgr.getLan('', 10068));
			}else if(this.haveBlockWord()){
				showToast(LanMgr.getLan('', 10132))
			}else{
				var args = {};
				args[Protocol.game_common_changePlayerName.args.newName] = this.textInput.text;
				PLC.request(Protocol.game_common_changePlayerName, args, ($data: any, $msg) => {
					if ($data) {
						App.hero.name = $data.name;
                    	dispatchEvt(new HudEvent(HudEvent.SET_NAME));
						this.close();
					}
				});
			}
		}

		private lengthCount(): boolean{
			let len = 0;
			let str = this.textInput.text
			for(let i =0; i < str.length; i++){
				let c = str.charCodeAt(i);
				if((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f))
					len++;
				else
					len+=2;
			}
			return len > 12;
		}

		private haveBlockWord():boolean{
			return false;
		}

		public close(){
			super.close();
			this.textInput.text = "";
		}
	}
}