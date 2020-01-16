module game{
    
	export class gloryFightListView extends ui.glory.FightListUI{

        private _itemList : gloryFightPlayerIR[];
		constructor(){
			super();
            this._itemList = [];
            for(let i = 1 ; i <= 16 ; i++){
                let item = this[`userBox${i}`] as gloryFightPlayerIR;
                this._itemList.push(item);
            }
            this.btn2_1.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_1,2,1]);       // [1,16]
            this.btn2_2.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_2,2,8]);       // [8,9]
            this.btn2_3.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_3,2,4]);       // [4,13]
            this.btn2_4.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_4,2,5]);       // [5,12]
            this.btn2_5.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_5,2,2]);       // [2,15]
            this.btn2_6.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_6,2,7]);       // [7,10]
            this.btn2_7.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_7,2,3]);       // [3,14]
            this.btn2_8.on(Laya.Event.CLICK,this,this.onClick,[this.btn2_8,2,6]);       // [6,11]
            this.btn3_1.on(Laya.Event.CLICK,this,this.onClick,[this.btn3_1,3,1]);       // [1,16,8,9]
            this.btn3_2.on(Laya.Event.CLICK,this,this.onClick,[this.btn3_2,3,4]);       // [4,13,5,12]
            this.btn3_3.on(Laya.Event.CLICK,this,this.onClick,[this.btn3_3,3,2]);       // [2,15,7,10]
            this.btn3_4.on(Laya.Event.CLICK,this,this.onClick,[this.btn3_4,3,3]);       // [3,14,6,11]
            this.btn4_1.on(Laya.Event.CLICK,this,this.onClick,[this.btn4_1,4,1]);       // [1,16,8,9,4,13,5,12]
            this.btn4_2.on(Laya.Event.CLICK,this,this.onClick,[this.btn4_2,4,2]);       // [2,15,7,10,3,14,6,11]
            this.btn5.on(Laya.Event.CLICK,this,this.onClick,[this.btn5,5,1]);           // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            this.gjHead.on(Laya.Event.CLICK,this,this.onLineup); 
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GLORY_FIGHT,1);
		}

        show(val:MatchGroupListVo):void {
            this.dataSource = val;
            this.initView();
        }

        close():void {
            for(let i = 0 ; i < this._itemList.length ; i++){
                this._itemList[i].dataSource = null;
            }
        }

        set dataSource(val:MatchGroupListVo){
            this._dataSource = val;
        }
        get dataSource():MatchGroupListVo{
            return this._dataSource;
        }
        
        private initView():void {
            let info = this.dataSource;
            let list = info.getMatchList();
            for(let i = 0 ; i < this._itemList.length ; i++){
                this._itemList[i].dataSource = list[i];
            }
            let guanJunVo = info.getGuanjun();
            this.boxGj.visible = guanJunVo ? true : false;
            this.lbDesc.visible = guanJunVo ? false : true;
            this.lbDesc.text = `${info.honorType==GroupType.benfu? LanMgr.getLan("",12401) : LanMgr.getLan("",12402)}${LanMgr.getLan("",12403)}`;
            this.imgWangguan.y = guanJunVo ? 235 : 400;
            if(guanJunVo){
                this.gjHead.dataSource = guanJunVo.headVo;
                this.gjName.text = guanJunVo.name;
                this.gjShenli.text = LanMgr.getLan("",10117,guanJunVo.force);
            }else{
                this.gjHead.dataSource = null;
            }
            this.renderLine();
            this.renderBtnState();
        }

        /** 线路绘制 */
        public renderLine():void {
            let info = this.dataSource;
            if(!info) return;
            let honorType = info.honorType;
            let imgDic = {
                "2" : {"user1":[1],"user2":[2],"user3":[3],"user4":[4],"user5":[5],"user6":[6],"user7":[7],"user8":[8],"user9":[9],"user10":[10],"user11":[11],"user12":[12],"user13":[13],"user14":[14],"user15":[15],"user16":[16]},
                "3" : {"user3_1":[1,16],"user3_2":[8,9],"user3_3":[4,13],"user3_4":[5,12],"user3_5":[2,15],"user3_6":[7,10],"user3_7":[3,14],"user3_8":[6,11]},
                "4" : {"user4_1":[1,16,8,9],"user4_2":[4,13,5,12],"user4_3":[2,15,7,10],"user4_4":[3,14,6,11]},
                "5" : {"user5_1":[1,16,8,9,4,13,5,12],"user5_2":[2,15,7,10,3,14,6,11]},
            }
            for(let key in imgDic){
                let group = Number(key);
                // 当时跨服对决时，阶段转换成 7,8,9,10
                if(honorType == GroupType.kuafu){
                    group += 5;
                }
                let obj = imgDic[key];
                for(let imgVal in obj){
                    (this[imgVal] as Laya.Image).visible = info.isWin(group,obj[imgVal]);
                }
            }
        }

        /** 渲染按钮状态 */
        public renderBtnState():void {
            let info = this.dataSource;
            if(!info) return;
            let honorType = info.honorType;
            let btnDic = {
                "2" : {"btn2_1":[1,16],"btn2_2":[8,9],"btn2_3":[4,13],"btn2_4":[5,12],"btn2_5":[2,15],"btn2_6":[7,10],"btn2_7":[3,14],"btn2_8":[6,11]},
                "3" : {"btn3_1":[1,16,8,9],"btn3_2":[4,13,5,12],"btn3_3":[2,15,7,10],"btn3_4":[3,14,6,11]},
                "4" : {"btn4_1":[1,16,8,9,4,13,5,12],"btn4_2":[2,15,7,10,3,14,6,11]},
                "5" : {"btn5":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
            }
            for(let key in btnDic){
                let group = Number(key);
                // 当时跨服对决时，阶段转换成 7,8,9,10
                if(honorType == GroupType.kuafu){
                    group += 5;
                }
                let obj = btnDic[key];
                // 是否结束
                let isEnd = info.isEnd(group);
                // 是否当前
                let isCur = GloryModel.getInstance().updateCurGroup() == group;
                for(let btnVal in obj){
                    let btn : Laya.Button = this[btnVal];
                    let imgRp : Laya.Image = this[btnVal.replace("btn","rp")];
                    imgRp.visible = false;
                    if(isEnd){
                        btn.visible = true;
                        btn.skin = SkinUtil.btn_fangdajing;
                        btn.stateNum = 1;
                    }else{
                        if(isCur){
                            let canBet = GloryUtil.isInBetTime(group);
                            btn.visible = true;
                            let hasBet = info.getBetType(group,obj[btnVal]) != 0;
                            if(!canBet || hasBet){
                                btn.skin = SkinUtil.btn_vs;
                                btn.stateNum = 1;
                            }else{
                                imgRp.visible = true;
                                btn.skin = SkinUtil.btn_bet;
                                btn.stateNum = 1;
                            }
                        }else{
                            btn.visible = false;
                        }
                    }
                }
            }
        }

        private onClick(btn:Laya.Button,group,pos:number):void {
            let info = this.dataSource; 
            if(!info) return;
            let skin = btn.skin;
            if(skin == SkinUtil.btn_fangdajing || skin == SkinUtil.btn_bet || skin == SkinUtil.btn_vs){
                let honorType = info.honorType;
                // 当时跨服对决时，阶段转换成 7,8,9,10
                if(honorType == GroupType.kuafu){
                    group += 5;
                }
                // 后端的位置从0开始
                GloryThread.requestWarInfo(info,group,pos-1).then((info:MatchGroupVo)=>{
                    if(info){
                        UIMgr.showUI(UIConst.GloryGroupView,info);
                    }
                });
            }
        }

        private onLineup():void {
            let info = this.dataSource;
            let guanJunVo = info ? info.getGuanjun() : null;
            if(guanJunVo){
                GloryThread.requestUserLineup(guanJunVo).then(()=>{
					dispatchEvt(new HudEvent(HudEvent.SHOW_PLAYER_LINEUP_VIEW),guanJunVo);
				});
            }
        }


    }
}