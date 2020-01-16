
module game{
	export class TabChangeHeadBoxView extends ui.hud.player.TabChangeHeadBoxUI{

        private _selectIndex : number;
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this.listIcon.mouseHandler = new Handler(this, this.onSelect);
            this.listIcon.renderHandler = new Handler(this, this.onRender);
            this.btnChange.on(Laya.Event.CLICK, this, this.sure);
        }

        public close(){
			// super.close();
            this.listIcon.array = null;
		}
		public show(){
			// super.show();
            this.initView();
		}

        private initView(): void {
            this.listIcon.array = null;
            let list : tb.TB_picture_frame[] = tb.TB_picture_frame.getList();
            this._selectIndex = list.findIndex((vo)=>{
                return vo.ID == App.hero.headFrame;
            });
            // 按已解锁和未解锁排序
            list.sort((a,b)=>{
                let alock = a.isLock();
                let block = b.isLock();
                if(alock && block){
                    return a.rank - b.rank;
                }else if(alock){
                    return 1;
                }else if(block){
                    return -1;
                }else{
                    return a.rank - b.rank;
                }
            });
            this.listIcon.array = list;
            this.listIcon.selectedIndex = this._selectIndex;
        }

		/** 选中 */ 
        private onSelect(event: Laya.Event, index: number): void {
            if(index < 0) return;
            if (event.type == Laya.Event.CLICK) {
                let tbData : tb.TB_picture_frame = this.listIcon.array[index];
                if (tbData.isLock()){
                    showToast(tbData.desc);
                    this.listIcon.selectedIndex = this._selectIndex;
                    return;
                }
                this._selectIndex = this.listIcon.selectedIndex;
            }
        }

        /** 确定 */
        private sure(): void {
            let tbData : tb.TB_picture_frame = this.listIcon.array[this.listIcon.selectedIndex]
            if (!tbData || tbData.isLock()){
                return;
            }
            let id:number = tbData.ID;
            if (id == App.hero.headFrame){
                showToast(LanMgr.getLan("",10428));
                return;
            }
            let args = {};
			args[Protocol.game_common_setPlayerHeadFrame.args.id] = id;
			PLC.request(Protocol.game_common_setPlayerHeadFrame, args, ($data: any, $msg) => {
			    if ($data) {
                    showToast(LanMgr.getLan("", 10429));
                    App.hero.headFrame = $data.headFrame || 0;
					this.listIcon.refresh();
                    dispatchEvt(new HudEvent(HudEvent.SET_HEAD_FRAME));
				}
			});
        }
        
        private onRender(itemRender: Laya.Box, index: number): void {
            let tbHead:tb.TB_picture_frame = itemRender.dataSource;
            if(tbHead) {
                let imgFrame : Laya.Image = itemRender.getChildByName("imgFrame") as Laya.Image;
                let img_selected : Laya.Image = itemRender.getChildByName("imgSelected") as Laya.Image;
                let img_gou : Laya.Image = itemRender.getChildByName("imgGou") as Laya.Image;
                let lbName : Laya.Label = itemRender.getChildByName("lbName") as Laya.Label;
                lbName.text = tbHead.name;
                imgFrame.visible = tbHead.ID > 0;
                imgFrame.skin = tbHead.ID > 0 ? SkinUtil.getHeadFrame(tbHead.ID) : "";
                img_selected.visible = index == this.listIcon.selectedIndex;
                img_gou.visible = tbHead.ID == App.hero.headFrame;
                itemRender.gray = tbHead.isLock();
            }else{

            }
        }
    }
}