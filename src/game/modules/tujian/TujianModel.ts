/**
* name 
*/
module game {
	export class TujianModel {
		//英雄详细界面的index
		public index: number = 0;
		private _tuJianGodTArr:TuJianGodTemp[];
		public tabNames: Array<string>;
		public yeqianData = [[1],[1,2,3],[1,2,3]];
		constructor() {
			this.tabNames = [LanMgr.getLan("",12114),LanMgr.getLan("",12115),LanMgr.getLan("",12116)];
		}
		private static _instance: TujianModel;
		public static getInstance(): TujianModel {
			if (!TujianModel._instance) {
				TujianModel._instance = new TujianModel();
			}
			return TujianModel._instance;
		}

		//获取图鉴英雄模板
		public getTuJianGodTArr():TuJianGodTemp[]{
			if (!this._tuJianGodTArr){
				this._tuJianGodTArr = [];
				let tabGods: tb.TB_god[] = TableData.getInstance().getTableByName(TableData.tb_god).data;
				if (tabGods){
					for (let key in tabGods){
						let godt:tb.TB_god = tabGods[key];
						if (godt){
							let startLv:number = godt.star[0];
							let endLv:number = godt.star[1];
							if (endLv < startLv){
								logwarn("英雄模板等级配置错误，最大等级小于最小等级:", godt.name);
								continue;
							}
							for (let lv:number = startLv; lv <= endLv; lv++){
								let temp:TuJianGodTemp = new TuJianGodTemp();
								temp.init(godt, lv);
								this._tuJianGodTArr.push(temp);
							}
						}
					}

					//排序
					this._tuJianGodTArr.sort((a,b)=>{
						let sorta:number = 0;
						let sortb:number = 0;
						
						if (a.starLv != b.starLv){
							//等级
							sorta = a.starLv;
							sortb = b.starLv;
						}else{
							//阵营
							sorta = a.godTemp.race_type;
							sortb = b.godTemp.race_type;
						}

						return sorta - sortb;
					})
				}
			}
			return this._tuJianGodTArr;
		}
		
	}

	export class TuJianGodTemp{
		public godTemp:tb.TB_god;
		public starLv:number;

		//初始化
		public init(godT:tb.TB_god, starLevel:number){
			this.godTemp = godT;
			this.starLv = starLevel;
			if (this.starLv < godT.star[0]){
				this.starLv = godT.star[0]
			}else if (this.starLv > godT.star[1]){
				this.starLv = godT.star[1];
			}
		}
	}
}