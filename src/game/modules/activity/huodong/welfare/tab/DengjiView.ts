/**
* name 
*/
module game{
	export class DengjiView extends ui.activity.huodong.welfare.tab.DengjiUI{
		constructor(){
			super();
			this.listRender();	
		}

		public onAdd(){
			this.listRender();
		}

		public onExit(){
			this.close();
		}

		public listRender() {
			//对等级奖励进行排序，可领取 > 未到达 > 已领取
			let arr:Array<tb.TB_level> = tb.TB_level.get_TB_level();
			arr.sort((a, b)=>{
				//------------------------------------------------------已领取------------------------------------未到达-----------可领取
				let aSortNum = a.ID in App.hero.welfare.levelGiftPack ? a.ID + 1000 : App.hero.level < a.level ? a.ID + 100 : a.ID + 10;
				let bSortNum = b.ID in App.hero.welfare.levelGiftPack ? b.ID + 1000 : App.hero.level < b.level ? b.ID + 100 : b.ID + 10;
				if (aSortNum > bSortNum) {
					return 1;
				} else if(aSortNum < bSortNum) {
					return -1;
				} else {
					return 0;
				}
			});
			this.list_jiangli.dataSource = arr;
		}
	}
}