/**
* FenjieModel
*/
module game{
	export class FenjieModel{
		private static _instance: FenjieModel;
		static getInstance(): FenjieModel {
			if (!FenjieModel._instance) {
				FenjieModel._instance = new FenjieModel();
			}
			return FenjieModel._instance;
		}

		/** 临时返还材料数据 */
		public tempReturnData : any = {};

		/** 请求返还材料数据 */
		requestReturnList(godList:GodItemVo[]):Promise<any[]>{
			return new Promise((resolve,reject)=>{
				if(godList.length == 0){
					resolve([]);
					return;
				}
				// 没缓存列表
				let ids : string[] = [];
				for(let i = 0 ; i < godList.length ; i++){
					let godVo = godList[i];
					if(!this.tempReturnData.hasOwnProperty(godVo.uuid)){
						ids.push(godVo.uuid);
					}
				}
				if(ids.length == 0) {
					resolve(this.getReturnList(godList,[],true));
					return;
				}
				let onlyId = ids.length == 1 ? ids[0] : "";
				let args = {};
				args[Protocol.game_god_queryResolve.args.rsvIds] = ids;
				PLC.request(Protocol.game_god_queryResolve,args,(data:any)=>{
					if(!data) return;
					let list = [];
					for(let ary of data['resolveItem']) {
						list.push(new ItemVo(ary[0],ary[1]));
					}
					// 只请求一个，缓存起来
					if(onlyId != ""){
						this.tempReturnData[onlyId] = list;
						resolve(this.getReturnList(godList,[],true));
					}else{
						resolve(this.getReturnList(godList,list,false));
					}
				});
			});
		}

		/** 获取返还材料数据 */
		getReturnList(gods:GodItemVo[],itemList:ItemVo[],fromCache:boolean):any[] {
			let list = [];
			if(fromCache){
				let itemObj = {};
				for(let obj of gods) {
					let tempList : ItemVo[] = this.tempReturnData[obj.uuid];
					if(!tempList || tempList.length ==0) continue;
					for(let itemVo of tempList){
						if(!itemObj.hasOwnProperty(itemVo.id)){
							itemObj[itemVo.id] = 0;
						}
						itemObj[itemVo.id] += itemVo.count;
					}
				}
				itemList = [];
				for(let key in itemObj) {
					itemList.push(new ItemVo(Number(key),Number(itemObj[key])));
				}
			}
			if(itemList && itemList.length > 0){
				list.push(...itemList);
			}
			let gemDic = {};
			// 装备放后
			for(let obj of gods) {
                let arrEquip : string[] = obj.getEquipItems();
                for(let obj of arrEquip) {
                    let equip = App.hero.getEquipByuuid(obj);
                    equip.show = true;
                    equip.type = 2;
                    list.push(equip);
                }
				let gemsList = obj.gemsList;
				for(let gemVo of gemsList){
					if(!gemDic[gemVo.templateId]){
						gemDic[gemVo.templateId] = 0;
					}
					gemDic[gemVo.templateId] ++;
				}
            }
			for(let id in gemDic){
				list.push(new ItemVo(Number(id),gemDic[id]));
			}
			return list;
		}
	}
}