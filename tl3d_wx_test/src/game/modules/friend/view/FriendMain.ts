/**
* name 
*/
module game {
	export class FriendMain extends ui.friend.FriendMainUI {
        
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.Friend_MainView, closeOnSide: this.isModelClose,title:LanMgr.getLan("",12410) };	
			this.addChild(this.bgPanel.btnClose);
			this.tab.selectedIndex = -1;
			this.tab.selectHandler = new Handler(this, this.onTab);
		}

		onClosed():void {
			super.onClosed();
			this.tab.selectedIndex = -1;
			this.tab_friendlist.dataSource = null;
			this.tab_addfriend.dataSource = null;
			this.tab_applyfriend.dataSource = null;
		}

		public show(): void {
			super.show();
			this.tab.selectedIndex =  this.dataSource ? this.dataSource : 0;
		}

		public popup(closeOther?: boolean, showEffect?: boolean):void{
			super.popup(closeOther, showEffect);
			this.tab.selectedIndex =  this.dataSource ? this.dataSource : 0;
		}

		private onTab(index: number): void {
			if(index == -1) return;
			this.viewStack.selectedIndex = index;
			if(index == 0) {
				this.tab_friendlist.dataSource = true;
			}else if(index == 1){
				this.tab_addfriend.dataSource = true;	
			}else {
				this.tab_applyfriend.dataSource = true;
			}
		}

		public initFriendListView():void{
			this.tab_friendlist.initView();
		}

		public initApplyFriendList($data: any):void{
			this.tab_applyfriend.initFriendsList($data);
		}


	}
}