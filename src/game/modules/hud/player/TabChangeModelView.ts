
module game{
    export class IGodModelVo {
        tbGod : tb.TB_god;
        skinVo : game.GodSkinVo;
        sortNum ?: number;
    }

	export class TabChangeModelView extends ui.hud.player.TabChangeHeroicModelUI{

        private _uiScene: Base2dSceneLayer;
        private _curSelectVo : IGodModelVo;
		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.listBtn.selectedIndex = -1;
            this.listBtn.selectHandler = new Handler(this, this.onSelectTab);
            this.listBtn.renderHandler = new Handler(this, this.onRenderTab);
            this.listBtn.array = ["初始","觉醒","时装"];
            this.listGod.array = null;
            this.listGod.selectedIndex = -1;
            this.listGod.selectHandler = new Handler(this, this.onSelectGod);
            this.listGod.renderHandler = new Handler(this, this.onRenderGod);
            this._uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this._uiScene);
            this._uiScene.setModelBox(this, this.lbName, this.boxRole);
            this.btnSure.on(Laya.Event.CLICK,this,this.onSure);
        }

		public close(){
			// super.close();
            this.listBtn.selectedIndex = -1;
            this.listGod.selectedIndex = -1;
            this.listGod.array = null;
            this._curSelectVo = null;
            Laya.timer.clearAll(this);
            this._uiScene.onExit();
		}
		public show(){
			// super.show();
            this.initView();
		}

        private _isInit : boolean;
        private _originList : IGodModelVo[];
        private _awakenList : IGodModelVo[];
        private _skinList : IGodModelVo[];
        private initView():void {
            if(!this._isInit) {
                this._isInit = true;
                this._originList = [];
                this._awakenList = [];
                this._skinList = [];
                let gods = tb.TB_god.get_TB_god();
                for(let tbGod of gods){
                    let skinList = tbGod.getSkinList();
                    for(let skinVo of skinList){
                        if(skinVo.skinId == GodSkinType.origin){
                            this._originList.push({tbGod,skinVo});
                        }else if(skinVo.skinId == GodSkinType.awaken){
                            if(tbGod.isCanAwaken()){
                                this._awakenList.push({tbGod,skinVo});
                            }
                        }else if(skinVo.isSpecialSkin()){
                            this._skinList.push({tbGod,skinVo});
                        }
                    }
                }
            }
            // 默认模型排序 按已解锁和未解锁排序
            this._originList.forEach((a,index)=>{
                a.sortNum = GodUtils.isActiveGod(a.tbGod.ID) ? (a.tbGod.ID-1000000) : a.tbGod.ID;
            });
            this._originList.sort((a,b)=>{
                return a.sortNum - b.sortNum;
            });
            // 觉醒模型排序
            this._awakenList.forEach((a,index)=>{
                let isAwaken = App.hero.godAwakens.indexOf(a.tbGod.ID) != -1;
                a.sortNum = isAwaken ? (a.tbGod.ID-1000000) : a.tbGod.ID;
            });
            this._awakenList.sort((a,b)=>{
                return a.sortNum - b.sortNum;
            });
            // 特殊时装排序
            this._skinList.forEach((a,index)=>{
                let isActivity = a.skinVo.isActivity(0,false) || a.skinVo.isCanActivity();
                a.sortNum = isActivity ? (a.tbGod.ID-1000000) : a.tbGod.ID;
            });
            this._skinList.sort((a,b)=>{
                return a.sortNum - b.sortNum;
            });
            this._uiScene.onShow();
            // 选中已选模型tab
            let index = App.hero.showSkinId == GodSkinType.origin ? 0 : (App.hero.showSkinId == GodSkinType.awaken ? 1 : 2);
            this.listBtn.selectedIndex = index;
        }

        /** 选择标签页 */
		private onSelectTab(index: number) {
			if(index < 0) return;
            let list = index == 0 ? this._originList : (index == 1 ? this._awakenList : this._skinList);
            this.listGod.array = list;
            // 清除选中标识,不然会出现不能选同一个index
            this.listGod.selectedIndex = -1;
            // 打开界面默认选择当前展示模型
            if(!this._curSelectVo){
                let selectedIndex = list.findIndex((vo)=>{
                    return vo.tbGod.ID == App.hero.showGodId && vo.skinVo.skinId == App.hero.showSkinId;
                });
                selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
                this._curSelectVo = list[selectedIndex];
                this.listGod.selectedIndex = selectedIndex;
            }
        }
        
        private onRenderTab(itemRender: Laya.Button, index: number) {
            if(itemRender.dataSource) {
                itemRender.label = itemRender.dataSource;
                itemRender.skin = this.listBtn.selectedIndex == index ? SkinUtil.fenye_down : SkinUtil.fenye_up;
                itemRender.labelSize = this.listBtn.selectedIndex == index ? 24 : 22;
                itemRender.labelColors = this.listBtn.selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
                itemRender.labelBold = true;
            }
        }

        /** 选中 */ 
        private onSelectGod(index: number): void {
            if(index < 0) return;
            // 模型
            let showVo : IGodModelVo = this.listGod.array[index];
            if(!showVo) return;
            this._curSelectVo = showVo;
            let tbGod : tb.TB_god = showVo.tbGod;
            let skinVo = showVo.skinVo;
            this.lbName.text = skinVo.getTitle();
            this.lbUnlock.text = skinVo.getCondition(false);
            let isAwaken = App.hero.godAwakens.indexOf(tbGod.ID) != -1;
            let isActivity = skinVo.isActivity(isAwaken?tb.TB_god_set.get_TB_god_set().awake_section:0,false);
            this.lbUnlock.color = isActivity ? ColorConst.GREEN : ColorConst.RED;
            this.btnSure.gray = !isActivity;
            this.btnSure.label = isActivity ? "更 换" : "未获得";
            this._uiScene.onShow();
            Laya.timer.once(300, this, this.delayShow, [skinVo.getModelId()]);
        }
        private onRenderGod(itemRender: Laya.Box, index: number) {
            let showVo : IGodModelVo = itemRender.dataSource;
            if(showVo){
                let tbGod = showVo.tbGod;
                let skinVo = showVo.skinVo;
                let imgSelected : Laya.Image = itemRender.getChildByName("imgSelected") as Laya.Image;
                let imgIcon : Laya.Image = itemRender.getChildByName("imgIcon") as Laya.Image;
                let imgZhezhao : Laya.Image = itemRender.getChildByName("imgZhezhao") as Laya.Image;
                let imgDi : Laya.Image = itemRender.getChildByName("imgDi") as Laya.Image;
                let imgGou : Laya.Image = itemRender.getChildByName("imgGou") as Laya.Image; 
                let lbDi : Laya.Image = itemRender.getChildByName("lbDi") as Laya.Image; 
                let lbName : Laya.Label = itemRender.getChildByName("lbName") as Laya.Label;

                imgSelected.visible = showVo == this._curSelectVo;
                imgZhezhao.visible = imgGou.visible = tbGod.ID == App.hero.showGodId && skinVo.skinId == App.hero.showSkinId;
                imgIcon.skin = SkinUtil.getHeroIcon(tbGod.ID);
                lbName.text = skinVo.getName2();
                let isAwaken = App.hero.godAwakens.indexOf(tbGod.ID) != -1;
                let isActivity = skinVo.isActivity(isAwaken?tb.TB_god_set.get_TB_god_set().awake_section:0,false);
                imgDi.gray = imgIcon.gray = lbDi.gray = lbName.gray = !isActivity;

                if (!imgIcon.mask){
                    UIUtil.createHeadMask(imgIcon, imgIcon.width/2);
                }
                if (!imgZhezhao.mask){
                    UIUtil.createHeadMask(imgZhezhao, imgZhezhao.width/2);
                }
            }else{

            }
        }

        private onSure():void {
            if(!this._curSelectVo) return;
            let tbGod : tb.TB_god = this._curSelectVo.tbGod;
            let skinVo = this._curSelectVo.skinVo;
            let isAwaken = App.hero.godAwakens.indexOf(tbGod.ID) != -1;
            let isActivity = skinVo.isActivity(isAwaken?tb.TB_god_set.get_TB_god_set().awake_section:0,false);
            if(App.hero.showGodId == tbGod.ID && skinVo.skinId == App.hero.showSkinId){
                showToast(LanMgr.getLan("", 10433));
                return;
            }
            if(!isActivity){
                showToast(LanMgr.getLan("", 10434));
                return;
            }
            let args = {};
			args[Protocol.game_common_setPlayerShow.args.godId] = tbGod.ID;
			args[Protocol.game_common_setPlayerShow.args.skinId] = skinVo.skinId;
			PLC.request(Protocol.game_common_setPlayerShow, args, ($data: any, $msg) => {
			    if ($data) {
                    showToast(LanMgr.getLan("", 10435));
                    App.hero.showGodId = Number($data.showGodId);
                    App.hero.showSkinId = Number($data.showSkinId);
					this.listGod.refresh();
                    dispatchEvt(new HudEvent(HudEvent.SET_SHOW_GOD_MODEL));
				}
			});
        }

        

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(modeid: any): void {
            let point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            this._uiScene.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, point.y - Launch.offsetY, 180, 2.7);
            // this._uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        }
        
    }
}