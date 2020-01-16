module game{

    /** 队员信息菜单 */
	export class MemberMenuView extends ui.goddomain.MemberMenuUI{
		constructor(){
			super();
            this.visible = false;
		}

		public show(data : {point:Laya.Point,info:GodDmMemberVo}): void {
            this.dataSource = data;
            this.x = data.point.x;
            this.y = data.point.y;
            this.visible = true;
            this.parent.setChildIndex(this,this.parent.numChildren-1);
            this.btnChange.on(Laya.Event.CLICK,this,this.onClick);
            this.btnOut.on(Laya.Event.CLICK,this,this.onClick);
            this.btnShow.on(Laya.Event.CLICK,this,this.onClick);	
		}

        public onClosed():void{
            this.visible = false;
            this.btnChange.off(Laya.Event.CLICK,this,this.onClick);
            this.btnOut.off(Laya.Event.CLICK,this,this.onClick);
            this.btnShow.off(Laya.Event.CLICK,this,this.onClick);
		}

        private onClick(event:Laya.Event):void {
            let btn = event.target as Laya.Button;
            let data : {point:Laya.Point,info:GodDmMemberVo} = this.dataSource;
            let member = data.info;
            if(!member || !member.isExist()) {
                showToast(LanMgr.getLan("", 10382));
                return ;
            }
            let instan = GodDmThread.getInstance();
            if(btn == this.btnChange){
                instan.appointCaptain(member).then(()=>{
                    this.onClosed();
                });
            }else if(btn == this.btnOut){
                instan.kickoutMember(member).then(()=>{
                    this.onClosed();
                });
            }else if(btn == this.btnShow){
                dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_PLAYER_INFO),member);
                this.onClosed();
            }
        }

        /** 检测是否存在 */
        checkExist():void {
            let data : {point:Laya.Point,info:GodDmMemberVo} = this.dataSource;
            if(!data || !data.info || !data.info.isExist()){
                this.onClosed();
            }
        }

    }
}