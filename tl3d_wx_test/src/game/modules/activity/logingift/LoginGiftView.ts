
module game {

    export class LoginGiftView extends ui.activity.logingift.logingiftUI {
        public static TYPE_ONE:number = 1;//7天
        public static TYPE_TWO:number = 2;//14天

        public static DAY_NUM:number = 7;
        public static ITEM_NUM:number = 4;

        private _uiDayArr:ui.activity.logingift.logingiftIRUI[];
        private _uiItemArr:common.ItemBox[];
        constructor(){
            super();
            this.isModelClose = true;
        }

        createChildren():void{
            super.createChildren();

            this._uiDayArr = [];
            for (let i:number = 0; i < LoginGiftView.DAY_NUM; i++){
                this._uiDayArr[i] = this["ui_day_"+i];
            }
            this._uiItemArr = [];
            for (let i:number = 0; i < LoginGiftView.ITEM_NUM; i++){
                this._uiItemArr[i] = this["ui_item_"+i];
            }
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed():void {
            super.onClosed();
            if (this._uiDayArr){
                for (let i:number = 0; i < this._uiDayArr.length; i++){
                    this._uiDayArr[i].off(Laya.Event.CLICK, this, this.onClickDay);
                }
            }
            this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
            tl3d.ModuleEventManager.removeEvent(HuodongEvent.TOTAL_LOGIN_DAY, this.onLoginDayChange, this);
            tl3d.ModuleEventManager.removeEvent(HuodongEvent.LOGIN_GIFT_RECEIVE, this.onReceiveChange, this);
            for (let i:number = 0; i < this._uiItemArr.length; i++){
                let uiitem:common.ItemBox = this._uiItemArr[i];
                uiitem.dataSource = null;
            }
            HuodongModel.getInstance().checkOpenLoginGift();
        }

        /** 初始化界面 */
        private _type:number;
        private _firstDay:number;
        private _curIdx:number;
        private initView():void {
            this._type = this.dataSource ? this.dataSource : LoginGiftView.TYPE_ONE;
            this._firstDay = (this._type - 1) * tb.TB_sevendays.TYPE_DAYS + 1;

            for (let i:number = 0; i < this._uiDayArr.length; i++){
                this._uiDayArr[i].on(Laya.Event.CLICK, this, this.onClickDay, [i]);
            }
            this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive);
            tl3d.ModuleEventManager.addEvent(HuodongEvent.TOTAL_LOGIN_DAY, this.onLoginDayChange, this);
            tl3d.ModuleEventManager.addEvent(HuodongEvent.LOGIN_GIFT_RECEIVE, this.onReceiveChange, this);
            
            this.updateTitleImg();
            this.initDay();
            let idx:number = this.getCanReceiveIdx();
            this.setSelectIdx(idx);
        }

        private onLoginDayChange():void{
            this.updateTitleImg();
            this.updateReceiveBtn();
            this.updateDay();
        }

        //
        private onReceiveChange():void{
            this.updateDay();
            let idx:number = this.getCanReceiveIdx();
            this.setSelectIdx(idx);
        }

        private updateTitleImg():void{
            let skin:string = "";
            let dayNum:number = this._curIdx+this._firstDay;
            if (this._type == LoginGiftView.TYPE_ONE){
                if (dayNum <= 2){
                    skin = "2tian";
                }else if (dayNum <= 3){
                    skin = "3tian";
                }else{
                    skin = "7tian";
                }
            }else{
                if (dayNum <= 10){
                    skin = "10tian";
                }else{
                    skin = "14tian";
                }
            }
            this.img_title.skin = LanMgr.getLan("huodong/logingift/{0}.png", -1, skin);
        }

        private initDay():void{
            for (let i:number = 0; i < this._uiDayArr.length; i++){
                let uiday:ui.activity.logingift.logingiftIRUI = this._uiDayArr[i];
                uiday.img_icon.skin = LanMgr.getLan("huodong/logingift/{0}.png", -1, this.getDayIcon(this._firstDay+i));;
                uiday.lab_day.text = LanMgr.getLan("第{0}天", -1, this._firstDay+i);
            }
            this.updateDay();
        }

        private updateDay():void{
            let dayNum:number = App.hero.welfare.totalLoginDay;
            for (let i:number = 0; i < this._uiDayArr.length; i++){
                let uiday:ui.activity.logingift.logingiftIRUI = this._uiDayArr[i];
                let day:number = this._firstDay+i;
                uiday.img_gou.visible = this.isReceive(this._firstDay+i);
                uiday.img_red.visible = dayNum >= day && !this.isReceive(day);
            }
        }

        private setSelectIdx(index:number):void{
            if (index < 0) index = 0;
            else if (index >= this._uiDayArr.length) index = this._uiDayArr.length -1;
            this._curIdx = index;

            for (let i:number = 0; i < this._uiDayArr.length; i++){
                let uiday:ui.activity.logingift.logingiftIRUI = this._uiDayArr[i];
                uiday.img_select.visible = this._curIdx == i;
            }
            let day:number = this._firstDay+this._curIdx;
            this.lab_day.text = day +"";
            let temp:tb.TB_sevendays = tb.TB_sevendays.get_TB_sevendaysById(day);
            if (temp){
                for (let i:number = 0; i < this._uiItemArr.length; i++){
                    let uiitem:common.ItemBox = this._uiItemArr[i];
                    if (i < temp.reward.length){
                        let itemvo:ItemVo = new ItemVo(temp.reward[i][0], temp.reward[i][1]);
                        uiitem.dataSource = itemvo;
                    }else{
                        uiitem.dataSource = null;
                    }
                }
            }

            this.updateReceiveBtn();
            this.updateTitleImg();
        }

        private updateReceiveBtn():void{
            let dayNum:number = App.hero.welfare.totalLoginDay;
            let day:number = this._firstDay + this._curIdx;
            if (day > dayNum){
                //未达到
                this.btn_receive.label = "未达到";
                this.btn_receive.gray = true;
                this.img_red.visible = false;
            }else if (this.isReceive(day)){
                //已领取
                this.btn_receive.label = "已领取";
                this.btn_receive.gray = true;
                this.img_red.visible = false;
            }else{
                this.btn_receive.label = "领取";
                this.btn_receive.gray = false;
                this.img_red.visible = true;
            }
        }


        //点击天
        private onClickDay(index:number):void{
            if (this._curIdx != index){
                this.setSelectIdx(index);
            }
        }

        //点击领取
        private onClickReceive():void{
            if (this.btn_receive.gray){
                if (this.btn_receive.label == "已领取"){
                    showToast(LanMgr.getLan('', 10220));
                }else{
                    showToast(LanMgr.getLan('', 10227));
                }
                return;
            }
            let day:number = this._firstDay + this._curIdx;
            let args = {};
			args[Protocol.game_welfare_loginGiftPack.args.id] = day;
			PLC.request(Protocol.game_welfare_loginGiftPack, args, ($data: any, $msg) => {
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
			})
        }

        //获取可领取index
        private getCanReceiveIdx():number{
            let dayNum:number = App.hero.welfare.totalLoginDay;
            for (let i:number = 0; i < this._uiDayArr.length; i++){
                let day:number = this._firstDay+i;
                if (day > dayNum) return i;
                if (!this.isReceive(day)) return i;
            }
            return this._uiDayArr.length -1;
        }

        //是否领取
        private isReceive(day:number):boolean{
            return App.hero.welfare.loginGiftPack.hasOwnProperty(day);
        }
        
        //获取图片
        private getDayIcon(day:number):number{
            if (day == 9) return 4;
            if (day == 11) return 6;
            if (day == 14) return 7;
            return day;
        }

    

     


    }

}