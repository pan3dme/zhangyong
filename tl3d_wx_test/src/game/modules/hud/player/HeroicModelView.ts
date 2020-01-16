
module game{
	export class HeroicModelView extends ui.hud.player.HeroicModelMainUI{

		private _curIndex : number;
		private _tabModelView : TabChangeModelView;
		private _tabHeadView : TabChangeHeadView;
		private _tabHeadBoxView : TabChangeHeadBoxView;
		constructor(){
			super();
		}
        
        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.HeroicModelView, closeOnSide: this.isModelClose,title:"英雄形象" };
			this._curIndex = -1;
			this.tabBar.selectedIndex = -1;
			this.tabBar.selectHandler = new Handler(this,this.onSelect);
			this.addChild(this.bgPanel.btnClose);
        }

		public close(){
			super.close();
			let view = this.getView(this._curIndex);
			if(view){
				view.close();
				view.visible = false;
			}
			this._curIndex = -1;
			this.tabBar.selectedIndex = -1;
		}

		public popup(){
			super.popup();
            this.initView();
		}

        private initView():void {
            this.tabBar.selectedIndex = 0;
        }

		private onSelect(index:number):void {
			if(index == -1)return;
			let oldView = this.getView(this._curIndex);
			if(oldView){
				oldView.close();
				oldView.visible = false;
			}
			this._curIndex = index;
			let newView = this.getView(this._curIndex);
			if(newView){
				newView.show();
				newView.visible = true;
			}
			let title = index == 0 ? "英雄形象设置" : (index == 1 ? "头像设置" : "头像框设置");
			this.bgPanel.updateTitle(title);
		}
		// 获取界面
		private getView(index:number):common.DialogExt {
			let view ;
			switch(index){
				case 0:
					if(!this._tabModelView){
						this._tabModelView = new TabChangeModelView();
						this._tabModelView.centerX = 0;
						this.boxContent.addChild(this._tabModelView);
					}
					view = this._tabModelView;
					break;
				case 1:
					if(!this._tabHeadView){
						this._tabHeadView = new TabChangeHeadView();
						this._tabHeadView.centerX = 0;
						this.boxContent.addChild(this._tabHeadView);
					}
					view = this._tabHeadView;
					break;
				case 2:
					if(!this._tabHeadBoxView){
						this._tabHeadBoxView = new TabChangeHeadBoxView();
						this._tabHeadBoxView.centerX = 0;
						this.boxContent.addChild(this._tabHeadBoxView);
					}
					view = this._tabHeadBoxView;
					break;
			}
			return view;
		}

	}
}