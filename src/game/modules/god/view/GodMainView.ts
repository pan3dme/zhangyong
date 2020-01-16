module game {
    export class GodMainView extends ui.god.NewGodMainUI {
        private _curIdx: number;
        private _initIndex: number = -1;
        constructor() {
            super();
            this.group = UIConst.hud_group;
        }

        createChildren():void {
            super.createChildren();
            this.roleList.mouseHandler = new Handler(this, this.onMouseClick);
            this.roleList.renderHandler = new Handler(this, this.onRender);
            this.roleList.selectedIndex = -1;
            this._curIdx = -1;
            this.godView.visible = false;
        }

        setSize(w:number,h:number):void {
            super.setSize(w,h);
            this.godView.height = h;
            this.boxList.y = GameUtil.isFullScreen() ? (5+HudModel.TOP_ADD_HEIGHT) : 5;
        }

        //打开面板
        public onOpened(): void {
            super.onOpened();
            this.godView.toOpen();
            this._initIndex = this.dataSource && isNaN(this.dataSource[1]) ? -1 : this.dataSource[1];
            let godUuid = this.dataSource ? this.dataSource[0] : null;
            let ary = GodModel.getInstance().getViewGods();
            let len = ary.filter((vo)=>{
                return vo.godVo;
            }).length;
            this.roleList.array = ary;
            this.godView.visible = len > 0;
            let index = ary.findIndex((vo)=>{
                return vo &&  vo.godVo && vo.godVo.uuid == godUuid;
            });
            // 打开英雄界面又有英雄，没有上阵，打开英雄就打开布阵界面
            if(len <= 0 && App.hero.getGodArr().length > 0){
                this.godView.onBuzhen();
            }
            this.setGodSelectIndex(index != -1 ? index : 0);
            let topy = GameUtil.isFullScreen() ? (5+HudModel.TOP_ADD_HEIGHT) : 5;
            UIUtil.boxUpDownTween(this.boxList,-this.boxList.height,topy,false,310,0.1);
            let targetY = this.godView.height - this.godView.boxBottom.height - 80;
            UIUtil.boxUpDownTween(this.godView.boxBottom,targetY+this.godView.boxBottom.height,targetY,true,310,0.05);
            this.godView.btnChange.visible = this.godView.btn_gh.visible = this.godView.btnBuzhen.visible = true;
        }

        public get curVo(): GodItemVo {
            return this.godView.curVo;
        }

        /**
         * 选择英雄
         * @param index 
         * @param newModel 是否刷新模型 可用于区分打开界面、切换英雄和对英雄进行操作（升级升阶） 进行操作的时候不刷新模型
         */
        private onMouseClick(event:Laya.Event,index: number) {
            if(event.type == Laya.Event.CLICK){
                if(index == -1) return;
                let info : LineupGodVo = this.roleList.array[index];
                if(!info) return;
                if(!GodUtils.isUnlock(info.pos,App.hero.level)){
                    this.roleList.selectedIndex = this._curIdx;
                    showToast(LanMgr.getLan(``, 10158,GodUtils.getUnlockLv(info.pos)))
                    return;
                }
                if (!info.godVo) {
                    if(!GodUtils.isCanBuzhen()){
                        showToast(LanMgr.getLan(``, 10372))
                        return;
                    }
                    dispatchEvt(new GodEvent(GodEvent.SHOW_REPLACE_VIEW));
                    return;
                }
                if(index == this._curIdx) {
                    return;
                }
                this.setGodSelectIndex(index,true);
            }
        }
        /** 设置神灵列表索引 */
        public setGodSelectIndex(index:number, newModel: boolean = true):void {
            let info : LineupGodVo = this.roleList.array[index];
            if(!info || !info.godVo) return;
            this._curIdx = index;
            this.roleList.selectedIndex = index;
            this.selectGod(info,newModel);
        }
        /** 选中神灵 */
        private selectGod(info:LineupGodVo, newModel: boolean = true):void {
            this.godView.curVo = info.godVo;
            dispatchEvt(new GodEvent(GodEvent.SELECT_GOD_EVENT));
            let curTabIndex = this.godView.tabList.selectedIndex;
            if (this._initIndex != -1) {
                curTabIndex = this._initIndex;
                this._initIndex = -1;
            }
            if (curTabIndex != -1) {
                this.godView.onSetIndex(curTabIndex);
            } else {
                this.godView.tabList.selectedIndex = 0;
            }
            if(info.godVo){
                this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHENLING,info.godVo.tab_god.race_type);
            }
        }

        /* 渲染英雄列表 */
        private onRender(cell: LineupGodIR, index: number) {
            let info : LineupGodVo = cell.dataSource;
            cell.redPoint.onDispose();
            if(info){
                if(info.godVo){
                    cell.redPoint.setRedPointName(`attack_linuep_god_${info.godVo.uuid}`);
                }else if(GodUtils.isUnlock(info.pos,App.hero.level)){
                    cell.redPoint.setRedPointName(`shenling_buzhen_group`);
                }
            }
        }

        /**
         * 布阵完成重新刷新列表
         * @param sort 重新排序
         */
        public refreshRoles():void {
            let lineupVo : LineupGodVo = this.roleList.selectedItem;
            let gods = GodModel.getInstance().getViewGods();
            let index = gods.findIndex((vo)=>{
                return lineupVo && vo.godVo && lineupVo.godVo && vo.godVo.uuid == lineupVo.godVo.uuid;
            });
            // 不影响到当前神灵，不刷新界面
            let isRefresh = index == -1;
            this.roleList.array = gods;
            let len = gods.filter((vo)=>{
                return vo.godVo;
            }).length;
            this.godView.visible = len > 0;
            index = index != -1 ? index : 0;
            this.setGodSelectIndex(index, isRefresh);
        }

        /** 刷新列表中的某一个数据 */
        public refreshRolesByGod(godVo: GodItemVo,refresh:boolean=false) {
            if (!godVo) return;
            if (!godVo || !this.godView.curVo) return;
            if(this.godView.curVo.uuid == godVo.uuid){
                this.godView.updateView();
                this.godView.refreshCurRole();
            }
            this.roleList.refresh();
        }

        /**
         * 替换或者上阵英雄
         * @param originGod 存在表示替换英雄，否则是新增上阵英雄
         * @param replaceGod 要上阵的英雄
         */
        public changeRole(originGod:GodItemVo,replaceGod:GodItemVo):void {
            let curGods : LineupGodVo[] = this.roleList.array;
            // 找出要替换的位置
            let item : LineupGodVo = curGods.find((vo:LineupGodVo) => {
                if(originGod){
                    return vo && vo.godVo && vo.godVo.uuid == originGod.uuid;
                }else{
                    return vo && !vo.godVo;
                }
            });
            let index = this.roleList.array.indexOf(item);
            if (index != -1) {
                let obj : LineupGodVo = {pos:item.pos,godVo:replaceGod};
                this.roleList.array[index] = obj;
                this.setGodSelectIndex(index, true);
                this.roleList.refresh();
            }
        }

        /** 关闭面板 */
        public onClosed(): void {
            super.onClosed();
            this.godView.toClose();
            this.godView.btnChange.visible = false;
            this.roleList.array = null;
            this.roleList.selectedIndex = -1;
            this._curIdx = -1;
        }

        /** 获取可以布阵的列表选项 */
        getCanShangzhenIR():LineupGodIR {
            let cells = this.roleList.cells;
            for(let i = 0 ; i < cells.length ; i++){
                let cell = cells[i] as LineupGodIR;
                let vo = cell.dataSource;
                if(vo && !vo.godVo && GodUtils.isUnlock(vo.pos,App.hero.level)){
                    return cell;
                }
            }
            return null;
        }

        get list_tab():Laya.List {
            return this.godView.tabList;
        }
        get viewInfo():godTabInfoView {
            return this.godView.viewInfo;
        }
        get viewJuexing():godTabAwakeView {
            return this.godView.viewJuexing;
        }
        get viewStarup():godTabStarupView {
            return this.godView.viewStarup;
        }
        get viewRonghun():godTabfuseView {
            return this.godView.viewRonghun;
        }
       
    }
}