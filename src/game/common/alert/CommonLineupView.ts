module common {
    export interface CommonLineupInfo {
        lineupGods : GodItemVo[] | tb.TB_monster[];
        shenqiAry : number[];

        showShenli : boolean;
        title ?: string;
        force ?: number;
        userLevel ?: number;
    }

    export class CommonLineupView extends ui.god.CommonLineupViewUI {
        
        private _godItems : HeadNameBox[];
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this._godItems = [];
            for (let i = 0; i < 6; i++) {
				let headBox = this[`godBox${i}`] as HeadNameBox; 
                headBox.ui_head.mouseEnabled = false;
				headBox.on(Laya.Event.CLICK,this,this.onShowGodInfo);
				this._godItems.push(headBox)
			}
        }

        set dataSource(v) {
			this._dataSource = v;
            if(v){
			    this.initView();
            }else{
                this.onExit();
            }
		}

		get dataSource(): CommonLineupInfo {
			return this._dataSource;
		}

        private initView():void{
            let info = this.dataSource;
            info.userLevel = info.userLevel || 999;
            this.setLinueBox();
            let ary = info.shenqiAry;
			let shenqiId = ary && ary.length > 0 ? ary[0] : 0;
            this.imgShenqi.visible = shenqiId > 0;
            if(shenqiId > 0){
                let tbShenqi = tb.TB_artifact.get_TB_artifactById(shenqiId);
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(tbShenqi.icon);
            }
            this.lbShenli.visible = this.imgShenli.visible = info.showShenli;
            this.lbTitle.visible = !info.showShenli;
            this.lbShenli.text = info.force + "";
            this.lbTitle.text = info.title;
        }

        /**设置阵容数据 */
		private setLinueBox(): void {
            let info = this.dataSource;
            if(!info) return;
            let lineupAry = info.lineupGods || [];
			let posAry = [];
            let tabgameset = tb.TB_game_set.get_TB_game_setById(1);
			for (let i = 0; i < 6; i++) {
				let godVo = lineupAry[i];
				let headBox = this._godItems[i];
                let lbPos : Laya.Label = this[`lbPos${i}`];
                let lbLock : Laya.Label = this[`lbLock${i}`];
                let imgLock : Laya.Image = this[`imgLock${i}`];
                let isUnloc = tabgameset.lineup[i] <= info.userLevel;
                lbPos.visible = isUnloc && !godVo;
                lbLock.visible = imgLock.visible = !isUnloc;
                lbLock.text = tabgameset.lineup[i] + `级开启`;
                lbPos.text = i < 2 ? "前排" : "后排";
				if (godVo instanceof GodItemVo){
					headBox.dataSource = godVo;
					headBox.visible = godVo ? true : false;
					posAry.push(godVo.tab_god.race_type);
				}else if(godVo instanceof tb.TB_monster){
					headBox.dataSource = godVo;
					headBox.visible = godVo ? true : false;
					posAry.push(godVo.race_type);
				}else{
					headBox.visible = false;
					posAry.push(-1);
				}
			}
			this.guanghuanUI.initView(0,posAry);
		}

        private clearGodList():void{
            for (let i:number = 0;i < this._godItems.length; i++){
                let godui:HeadNameBox = this._godItems[i];
                godui.dataSource = null;
            }
        }

        /** 显示神灵信息 */
		private onShowGodInfo(event:Laya.Event):void {
			let headBox = event.currentTarget as HeadNameBox;
			if(headBox && headBox.dataSource){
				dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL),headBox.dataSource);
			}
		}

        onExit():void {
            this.guanghuanUI.onExit();
            this.clearGodList();
            this._dataSource = null;
        }
    }
}



