/**
* DafuwengModel
*/
module game {
	export enum RiskType {
		EMPTY, PROP, OUT, QUESTION, BOX,CAIQUAN,CAIDAXIAO,BIYANLI
	}
	export class DafuwengModel {

		constructor() {
		}

		private static _instance: DafuwengModel;
		static getInstance(): DafuwengModel {
			if (!DafuwengModel._instance) {
				DafuwengModel._instance = new DafuwengModel();
			}
			return DafuwengModel._instance;
		}
		// 十次探险选中
		public TEN_SELECT : boolean = false;
		public static STEP_COUNT : number = 80;

		//服务端记录的当前点
		public curRiskId: number
		//服务端记录的走过的点
		public riskIds: number[];

		public riskKey : any;	/** 奇遇自增ID */
		public riskInfo : {[key:string]:IRiskSvo};	/** 奇遇信息 */
		public riskList : DafuwengVo[] = [];

		/** 初始化数据 */
		initData():void {
			let welfare = App.hero.welfare;
			this.curRiskId = isEmptyObject(welfare) ? 0 : welfare.curRiskId;
			this.riskIds = isEmptyObject(welfare) ? [] : welfare.riskIds;
			this.riskInfo = isEmptyObject(welfare) ? {} : welfare.riskInfo;
			this.riskList.length = 0;
			for(let key in this.riskInfo) {
				let vo = new DafuwengVo(Number(key),this.riskInfo[key]);
				if(!vo.isExpire()) {
					this.riskList.push(vo);
				}
			}
			this.resetTimeout();
			dispatchEvt(new DafuwengEvent(DafuwengEvent.UPDATE_RISK_INFO));
		}

		/** 获取奇遇列表 */
		getRiskList(sort:boolean=false):DafuwengVo[] {
			this.checkInvaildRisk();
			if(sort) {
				this.riskList.sort((a,b)=>{
					return a.svo.limitTime - b.svo.limitTime;
				});
			}
			return this.riskList;
		}

		/** 添加奇遇信息 */
		addRiskInfo(riskSvo : any):DafuwengVo[] {
			let addVos = [];
			for(let key in riskSvo) {
				this.riskInfo[key] = riskSvo[key];
				let vo = new DafuwengVo(Number(key),riskSvo[key]);
				this.riskList.push(vo);
				addVos.push(vo);
			}
			this.resetTimeout();
			dispatchEvt(new DafuwengEvent(DafuwengEvent.ADD_RISK_INFO));
			return addVos;
		}
		/** 删除奇遇信息 */
		delRiskInfo(keys:number[]):void {
			for(let key of keys) {
				delete this.riskInfo[key];
			}
			for(let i = this.riskList.length - 1 ; i >= 0 ; i--) {
				if( keys.indexOf(this.riskList[i].key) != -1) {
					this.riskList.splice(i,1);
				}
			}
			this.resetTimeout();
			dispatchEvt(new DafuwengEvent(DafuwengEvent.DEL_RISK_INFO));
		}

		/** 获取奇遇信息 */
		getRiskInfo(key:any):DafuwengVo {
			return this.riskList.find((vo)=>{
				return vo.key == key;
			});
		}

		/** 检测无效奇遇：过期 */
		checkInvaildRisk():void {
			let keys = [];
			for(let vo of this.riskList) {
				if(vo.isExpire()) {
					keys.push(vo.key);
				}
			}
			if(keys.length > 0) {
				this.delRiskInfo(keys);
			}
		}	

		/** 重置最大超时时间 */
		resetTimeout():void {
			let maxTime : number = 0;
			for(let vo of this.riskList) {
				if(vo.svo.limitTime > maxTime) {
					maxTime = vo.svo.limitTime;
				}
			}
			let time = maxTime - App.serverTimeSecond;
			Laya.timer.clearAll(this);
			if(time > 0) {
				Laya.timer.once(time*1000,this,()=>{
					dispatchEvt(new DafuwengEvent(DafuwengEvent.UPDATE_RISK_INFO));
				});
			}
		}

	}

	/** 服务端奇遇信息 */
	export interface IRiskSvo {
		riskId : number;	// 格子ID
		limitTime : number;	// 限制时间
		questId : number;	//　问题ID
	}
}