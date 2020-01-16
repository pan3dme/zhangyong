

module game {
    export class TabChangeHeadView extends ui.hud.player.TabChangeHeadUI {
        private _selectIndex:number = 0;
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
            //将表中的图标数据读出来
            let list:HeadIconVo[] = [];
            let arrGameGods: Array<tb.TB_god> = [];
			let GameGods_obj: Array<any> = TableData.getInstance().getTableByName(TableData.tb_god).data;
			for (let key in GameGods_obj) {
				if (GameGods_obj[key]) {
					arrGameGods.push(GameGods_obj[key] as tb.TB_god);
				}
			}
            let headIconVo:HeadIconVo;
            for (let i:number = 0; i< arrGameGods.length; i++){
                let isLock : boolean = !(App.hero.godAlbum.some(vo => vo == arrGameGods[i].ID) || arrGameGods[i].ID == common.GlobalData.DEFAULT_HEAD) ;
                headIconVo = new HeadIconVo(arrGameGods[i].ID,arrGameGods[i], isLock)
                list.push(headIconVo);
            }
            // 按已解锁和未解锁排序
            list.sort((a,b)=>{
                if(a.isLock && b.isLock){
                    return a.headId - b.headId;
                }else if(a.isLock){
                    return 1;
                }else if(b.isLock){
                    return -1;
                }else{
                    return a.headId - b.headId;
                }
            });
            this._selectIndex = list.findIndex((vo)=>{
                return vo.headId == App.hero.getHeadId();
            });
            this._selectIndex = this._selectIndex < 0 ? 0 : this._selectIndex;
            this.listIcon.array = list;
            this.listIcon.selectedIndex = this._selectIndex;
        }

        /** 选中 */ 
        private onSelect(event: Laya.Event, index: number): void {
            if(index < 0) return;
            if (event.type == Laya.Event.CLICK) {
                if (this.listIcon.array[index].isLock){
                    showToast(LanMgr.getLan("", 10430,this.listIcon.array[index].name));
                    this.listIcon.selectedIndex = this._selectIndex;
                    return;
                }
                this._selectIndex = this.listIcon.selectedIndex;
            }
        }

        /** 确定 */
        private sure(): void {
            let headIconVo:HeadIconVo = this.listIcon.array[this.listIcon.selectedIndex]
            if (headIconVo.isLock){
                //虽然不会走到这一步，还是防下比较安拉
                return;
            }
            let id:number = headIconVo.headId;
            if (id == App.hero.getHeadId()){
                showToast(LanMgr.getLan("", 10431));
                return;
            }
            let args = {};
			args[Protocol.game_common_setPlayerHead.args.headId] = id;
			PLC.request(Protocol.game_common_setPlayerHead, args, ($data: any, $msg) => {
			    if ($data) {
                    showToast(LanMgr.getLan("", 10432));
					App.hero.setHeadId($data.head);
                    dispatchEvt(new HudEvent(HudEvent.SET_HEAD_ICON));
					this.listIcon.refresh();
				}
			});
        }
        
        private onRender(itemRender: ui.guild.init.IconRenderUI, index: number): void {
            let headIconVo:HeadIconVo = itemRender.dataSource;
            if(!headIconVo) return;
            itemRender.img_selected.visible = index == this.listIcon.selectedIndex;
            let box_icon = itemRender.box_icon;
            let img_icon = itemRender.img_icon;
            let img_zz = itemRender.img_zz;
            img_zz.visible = headIconVo.headId == App.hero.getHeadId();
            let img_gou = itemRender.img_gou;
            img_gou.visible = headIconVo.headId == App.hero.getHeadId();
            if (headIconVo){
                img_icon.skin = headIconVo.headIcon;
                itemRender.gray = headIconVo.isLock;
            }
            if (!box_icon.mask){
                UIUtil.createHeadMask(box_icon, box_icon.width/2);
            }
        }

    }
}