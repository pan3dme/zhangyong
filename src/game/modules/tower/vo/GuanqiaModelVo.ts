

module game {

    export class GuanqiaModelVo {
        /** 难度模式 */
        public tbCopy : tb.TB_copy;
        /** 关卡列表 */
        private _guanqiaList : GuanqiaVo[] = [];
        /** 页数 */
        public pageNum : number = 0;
        /** 当前页数 从0开始*/
        public curPage : number = 0;
        /** 最后一关副本id */
        public endCopyId : number = 0;

        /** 当前关卡 */
        public curGuanqia : GuanqiaVo;
        constructor(cp:tb.TB_copy){
            this.tbCopy = cp;
            let infos = tb.TB_copy_info.get_TB_copy_info('area',String(cp.ID));
            infos.forEach(($item,index:number)=>{
                // boss关卡默认就是每个第十关
                this._guanqiaList.push(new GuanqiaVo($item,(index%10==9)));
            });
            let len = this._guanqiaList.length;
            this.endCopyId = this._guanqiaList[len-1].tbCopyInfo.ID;
            this.pageNum = Math.ceil(len/TowerModel.PAGE_NUM);
        }

        /** 更新关卡数据 */
        public updateGuanqia():void {
            let copyId = App.hero.towerCopyInfo[this.tbCopy.sub_type];
            let copyInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            let finishGuanqia : GuanqiaVo;
            let tbCopy = copyInfo ? tb.TB_copy.get_TB_copyById(copyInfo.area) : null;
            if( copyInfo && tbCopy && tbCopy.type == iface.tb_prop.copyTypeKey.tower ) {
                finishGuanqia = this.getGuanqiaVo(copyInfo.ID);
                if(!copyInfo.next) {
                    this.curGuanqia = this.getGuanqiaVo(copyId);
                }else{
                    this.curGuanqia = this.getGuanqiaVo(copyInfo.next);
                }
            }else{
                //从第一个开始
                this.curGuanqia = this._guanqiaList[0];
            }
            // 当前模式的通过层数
            let num = this.curGuanqia.tbCopyInfo.area_number;
            // 上一关卡,如果上一个关卡是boss关，且未领取奖励,则定位到该层
            if(finishGuanqia && finishGuanqia.isBoss && !finishGuanqia.isReward()) {
                num = finishGuanqia.tbCopyInfo.area_number;
            }
            // 当前页数（从0开始计算）
            this.curPage = Math.floor((num-1) / TowerModel.PAGE_NUM);
        }

        /** 获取关卡 */
        public getGuanqiaVo(id:number):GuanqiaVo {
            return this._guanqiaList.find((vo:GuanqiaVo)=>{
                return vo.tbCopyInfo.ID == id;
            })
        }
        /** 获取关卡 */
        public getGuanqiaVoByIndex(idx:number):GuanqiaVo {
            return this._guanqiaList[idx];
        }
        public getGuanqiaVoById(id:number):GuanqiaVo {
            return this._guanqiaList.find((vo)=>{
                return vo.tbCopyInfo.ID == id;
            });
        }

        /** 获取当前层的10个关卡 */
        public getListByPage(page:number):GuanqiaVo[] {
            let startIdx = TowerModel.PAGE_NUM*page;
            let list = this._guanqiaList.slice(startIdx,startIdx+TowerModel.PAGE_NUM);
            return list;
        }

        /** 当前层是否通过 */
        public isPassByPage(page:number):boolean {
            let list = this.getListByPage(page);
            return list.every((item)=>{
                return item.isPass();
            });
        }

        /** 奖励列表 */
        private _jiangliList : JiangliVo[];
		getJiangliList():JiangliVo[] {
			if(!this._jiangliList) {
				this._jiangliList = [];
				let tb = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_trial)).data;
                for(let id in tb){
                    let tbTrial : tb.TB_trial = tb[id];
                    if(tbTrial.type == 0) {
                        this._jiangliList.push(new JiangliVo(tb[id]));
                    }else if(tbTrial.type == this.tbCopy.sub_type) {
                        this._jiangliList.push(new JiangliVo(tb[id]));
                    }
                }
			}
			return this._jiangliList;
		}
        /** 获取可领取的关卡 */
        public getCanRewardVo():GuanqiaVo {
            return this._guanqiaList.find((vo)=>{
                return vo.isCanReward();
            });
        }

        /** 是否有未领取的boss奖励 -- 上一关是boss关卡时,必须领取完才能进入下一关 */
        public isCanReward():boolean {
            return this.getCanRewardVo() ? true : false;
        }

        /** 当前模式是否全部通关 */
        isAllFinish():boolean {
            let copyId = App.hero.towerCopyInfo[this.tbCopy.sub_type];
            return copyId >= this.endCopyId;
        }

        /** 全部通关并且全部领取 */
        isAllPass():boolean {
            return this.isAllFinish() && !this.isCanReward();
        }
    }
}