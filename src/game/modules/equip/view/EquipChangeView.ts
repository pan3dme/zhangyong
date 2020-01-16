/**
* name 
*/
module game {
	export class EquipChangeView extends ui.equip.EquipChangeUI {
		public shipinList: common.BagRenderList;
		constructor() {
			super();
			this.isModelClose = true;
			this.initUi();
		}

		private initUi() {
			this.shipinList = new common.BagRenderList(625, 680);
			this.shipinList.itemRender = BagIR;
			this.shipinList.spaceY = 5;
			this.shipinList.x = 45;
			this.shipinList.y = 87;
			this.addChild(this.shipinList);
		}

		public popup() {
			super.popup();
			this.refreshData();
			this.bgPanel.dataSource = { uiName: UIConst.EquipChangeView, closeOnSide: this.isModelClose, closeOnButton: true, title:LanMgr.getLan("",12599) };
		}

		/**
		 * 获取列表数据
		 */
		public refreshData() {
			let tempdata;
			if (this.dataSource[1] == 0) {
				// let pos: number = this.dataSource[0] - 4;
			} else {
				tempdata = App.hero.getEquips(this.dataSource[0],true);
			}
			let ary = new Array
			//初始化序号和选择项
			for (var j = 0; j < tempdata.length; j++) {
				var element: any = tempdata[j];
				element.selectid = -1;
				element.indexid = j;
				element.bag = false;
			}
			//一维数组转二维数组的方法
			let len = tempdata.length;
			let n = BagModel.line_num; //假设每行显示6个
			let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
			for (let i = 0; i < lineNum; i++) {
				// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
				let temp = tempdata.slice(i * n, i * n + n);
				ary.push(temp);
			}
			this.shipinList.dataSource = ary;
			if(this.dataSource[2])
				this.findSelected(this.dataSource[2].uuid);
		}

		/**
		 * 强化后找到item位置
		 */
		public findSelected(uuid = this.changeUuid){
			let data = this.shipinList.dataSource;
			for (var v = 0; v < data.length; v++) {
				for (var l = 0; l < data[v].length; l++) {
					var element = data[v][l];
					if (element.uuid == uuid) {
						//如果找到当前变化的符文
						let line = Math.floor(element.indexid / BagModel.line_num);
						element.selectid = element.indexid;
						this.shipinList.dataSource[line][0].selectid = element.indexid;
						this.shipinList.scrollBarTo(100*line);
					}
				}
			}
		}

		/**
         * 刷新某个item
         * @param ndata 
         */
		private changeUuid;
		// private selected;
		// private idx;
		public updateItem(ndata:EquipItemVo) {
			this.changeUuid = ndata.uuid;
			let slist = this.shipinList.dataSource;
			for (var v = 0; v < slist.length; v++) {
				for (var l = 0; l < slist[v].length; l++) {
					var element = slist[v][l];
					if (ndata.uuid == element.uuid) {
						//如果找到当前变化的符文
						ndata.selectid = element.selectid;
						// this.selected = element.selectid;
						ndata.indexid = element.indexid;
						// this.idx = element.indexid;
						slist[v].splice(l, 1, ndata);
						let line = Math.floor(element.indexid / BagModel.line_num)
						let item: BagIR = this.shipinList.getCell(line) as BagIR;
						item.updataItem(l);
					}
				}
			}
		}

		public close() {
			super.close();
			this.bgPanel.dataSource = null;
			this.shipinList.dataSource = [];
		}
	}
}