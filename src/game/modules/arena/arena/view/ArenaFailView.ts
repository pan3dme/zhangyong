/**
* name 
*/
module game {
	export class ArenaFailView extends ui.arena.arena.ArenaFailUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.channel.callback = () => {
				this.dataSource['flag'] = true;
				if (!UIMgr.hasStage(UIConst.Main3DView)){
					UIMgr.showUI(UIConst.Main3DView);
				}
				this.close();
			}
		}
		popup(): void {
			
			this.initView();
			super.popup(false, false);
		}

		private initView(): void {
			AudioMgr.playSound("sound/defeated.mp3");
			let data: ArenaReportVo = this.dataSource.eventdata;
			this.lbrank.text = `${data.rank}`;
			this.rewardList.array = data.getRewards();

			this.lbdoem.text = `(${data.chgRank}`;
			this.hbox.refresh();
			this.lbdoem.visible = this.imgchg.visible = this.lbright.visible = data.chgRank != 0;
			if (this.rewardList.array && this.rewardList.array.length > 0){
				this.box_reward.visible = true;
				this.box_force.y = this.box_reward.y + 80;
			}else{
				this.box_reward.visible = false;
				this.box_force.y = this.box_reward.y;
				
			}
			this.channel.y = this.box_force.y + 43;
			this.height = this.bgPanel.height = this.channel.y + this.channel.height + 40;
			this.lab_empty.y = this.height + 60;
			this.bgPanel.showTitle(false, "zhandoubiaoxian/shibai.png", false, true, false, null, this);
		}

		close(): void {
			super.close();
			dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
		}
	}
}