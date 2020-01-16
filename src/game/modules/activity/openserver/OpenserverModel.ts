/**
* OpenserverModel
*/
module game {
	export class OpenserverModel {
		private static _instance: OpenserverModel;
		static getInstance(): OpenserverModel {
			if (!OpenserverModel._instance) {
				OpenserverModel._instance = new OpenserverModel();
			}
			return OpenserverModel._instance;
		}

		constructor(){
			this.initOpenServerGift();
		}

		//开服礼包
		private _openServerGiftVoArr:OpenServerGiftVo[];
		private _osGiftStartTime:number = 0;
		private _osGiftEndTime:number = 0;
		private initOpenServerGift():void{
			this._openServerGiftVoArr = [];
			let alldata = TableData.getInstance().getTableByName(TableData.tb_openservice_gift).data;
			for (let key in alldata){
				let temp:tb.TB_openservice_gift = alldata[key];
				if (temp){
					if (!this._openServerGiftVoArr[temp.time_index-1]){
						let giftTime:tb.TB_gift_time = tb.TB_gift_time.getSet(temp.time_index);
						let osGiftVo:OpenServerGiftVo = new OpenServerGiftVo(giftTime);
						this._openServerGiftVoArr[temp.time_index-1] = osGiftVo;
						if (this._osGiftStartTime == 0 || this._osGiftStartTime > osGiftVo.getStartTime()){
							this._osGiftStartTime = osGiftVo.getStartTime();
						}
						if (osGiftVo.getEndTime() > this._osGiftEndTime){
							this._osGiftEndTime = osGiftVo.getEndTime();
						}
					}
					this._openServerGiftVoArr[temp.time_index-1].addGift(temp);
				}
			}
		}

		//获取开服礼包数据
		public getOpenServerGiftVoArr():OpenServerGiftVo[]{
			return this._openServerGiftVoArr;
		}

		//获取当前开服礼包活动数据
		public getCurOpenServerGiftVo(stayLast:boolean = false):OpenServerGiftVo{
			for (let i:number = 0; i < this._openServerGiftVoArr.length; i++){
				if (this._openServerGiftVoArr[i].isActivityTime()){
					return this._openServerGiftVoArr[i];
				}
			}
			return stayLast && this._openServerGiftVoArr.length > 0 ? this._openServerGiftVoArr[this._openServerGiftVoArr.length-1] : null;
		}

		//获取开服礼包开始时间
		public getOsGiftStartTime():number{
			return this._osGiftStartTime;
		}

		//获取开服礼包结束时间
		public getOsGiftEndTime():number{
			return this._osGiftEndTime;
		}

		//是否有开服礼包活动
		public hasOsGiftActivity():boolean{
			let curTime:number = App.getServerTime();
			return this._osGiftStartTime < curTime && curTime < this._osGiftEndTime;
		}

		//获取开服礼包活动数据
		public getOsGiftByRechargeid(id:number):tb.TB_openservice_gift{
			for (let i:number = 0; i < this._openServerGiftVoArr.length; i++){
				if (this._openServerGiftVoArr[i].isActivityTime()){
					let allgift:tb.TB_openservice_gift[] = this._openServerGiftVoArr[i].getGiftList();
					for (let j:number = 0; j < allgift.length; j++){
						if (allgift[j].charge_id == id) return allgift[j];
					}
				}
			}
			return null;
		}

		public allday: number;
		public init() {
			var $obj: any = TableData.getInstance().getTableByName(TableData.tb_openservice);
			let keys: Array<string> = Object.keys($obj.data);
			this.allday = Number(keys[keys.length - 1]);
			this._payList = [];
		}

		private _list: Array<DayVo>
		public getList() {
			if (this._list) {
				return this._list;
			}
			this._list = new Array;
			let tabary: Array<tb.TB_openservice> = tb.TB_openservice.getTB_openservice();
			for (var i = 0; i < tabary.length; i++) {
				let vo: DayVo = new DayVo;
				vo.tab = tabary[i];
				vo.id = vo.tab.ID;
				this._list.push(vo);
			}
			return this._list;
		}

		private _payList: Array<number>;
		public addpay($id: number) {
			if (this._payList.indexOf($id) == -1) {
				this._payList.push($id);
			}
		}

		public delpay($id: number) {
			let delid = this._payList.indexOf($id);
			if (delid != -1) {
				this._payList.splice(delid,1);
			}
		}

		public hasPay($id){
			return this._payList.indexOf($id) != -1;
		}

		public visiableView(){
			var $obj: any = TableData.getInstance().getTableByName(TableData.tb_openservice);
			let keys: Array<string> = Object.keys($obj.data);
			this.allday = Number(keys[keys.length - 1]);
			let list = this.getList();
			for (var i = 0; i < list.length; i++) {
				var element = list[i];
				if(element.canBuy()){
					return true;
				}
				if(element.isbuy() && !element.isReceive()){
					return true;
				}
			}
			return false;
		}

		/**
         * 是否在购买时间内
         */
        public needtime():boolean{
            var now = App.serverTime;
			var createTimeStamp = App.hero.getCreateDayTiem();
			var endTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * OpenserverModel.getInstance().allday;
			return endTime > now;
        }

		onTime():string{
			var createTimeStamp = App.hero.getCreateDayTiem();
			var endTime = createTimeStamp + TimeConst.ONE_DAY_MILSEC * OpenserverModel.getInstance().allday;
			return LanMgr.getLan("",12632) + activityTime(endTime / 1000, App.getServerTime());
		}
	}
}