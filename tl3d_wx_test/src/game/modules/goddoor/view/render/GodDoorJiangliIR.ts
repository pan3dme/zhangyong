/**
* name 
*/
module game{
	export class GodDoorJiangliIR extends ui.goddoor.render.JiangliIRUI implements common.IAccordionItemRenderer{
		constructor(){
			super();
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource(){
			return this._dataSource;
		}

		private refreshView() {
			if(this.dataSource){
				// let idx = data.indexid==0?0:2;
				//避免神界之门奖励界面覆盖关闭按钮
				this.scale(0.97,0.97);
				let start = this.dataSource.id == 0? 4: 5;
				this.lab_miaoshu.text = LanMgr.getLan('{0}星英雄掉落(整卡掉落概率{1}%，碎片掉落概率{2}%)',-1,start,this.dataSource.rato[0],this.dataSource.rato[1]); 
				this.onShow(this.dataSource.list);
			} else {

			}
		}

		/** 展开子任务 */
        public onShow($data: any): void {
			let temparry = new Array;
            this.img_di.visible = true;
            // this.img_di.dataSource = $data;
			for(let i = 0; i < $data.length; i++){
				let vo: ItemVo = App.hero.createItemVo($data[i][1], $data[i][0]);
				vo.show = true;
				vo.bag = true;
				temparry.push(vo);
			}
			this.list_head.dataSource = temparry;
			let heightXishu = Math.ceil(temparry.length / 5);
			this.list_head.height = 100*heightXishu;
			this.img_di.height = heightXishu==1?120*heightXishu+20:120*heightXishu;
			this.height = heightXishu==1?140*heightXishu+50:140*heightXishu;
        }

        /** 隐藏子任务 */
        public onHide(): void {
            this.img_di.visible = false;
            this.img_di.dataSource = null;
            this.height = 100;
        }

        /** 是否是展开的 */
        public isShow(): boolean {
            return this.img_di.visible;
        }
	}
}