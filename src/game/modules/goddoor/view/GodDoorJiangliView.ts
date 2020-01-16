/**
* name 
*/
module game {
	export class GodDoorJiangliView extends ui.goddoor.JiangliUI {
		public JiangliItemList: common.BagRenderList;
		constructor() {
			super();
			this.isModelClose = true;
			this.initUi();
		}

		public popup() {
			super.popup();
			this.refreshData();
			this.bgPanel.dataSource = { uiName: UIConst.GodDoor_JiangliView, closeOnSide: this.isModelClose };
		}

		private initUi() {
			this.JiangliItemList = new common.BagRenderList(530, 570);
			this.JiangliItemList.itemRender = GodDoorJiangliIR;
			this.JiangliItemList.spaceY = 3;
			this.JiangliItemList.x = 45;
			this.JiangliItemList.y = 70;
			this.JiangliItemList.max = 100;
			this.addChild(this.JiangliItemList);
		}

		/**
		 * 获取列表数据
		 */
		public refreshData() {
			let itemtab: tb.TB_divinity_door = tb.TB_divinity_door.get_TB_divinity_doorById(this.dataSource);
			let tempMiaoshu: Array<any> = new Array;
			tempMiaoshu.push(itemtab.show_god4);
			tempMiaoshu.push(itemtab.show_god5);
			let ary = new Array
			//初始化序号和选择项
			// for (var j = 0; j < tempMiaoshu.length; j++) {
			// 	var element: any = tempMiaoshu[j];
			// 	element.selectid = -1;
			// 	element.indexid = j;
			// 	element.bag = false;
			// }
			// //一维数组转二维数组的方法
			// let len = tempMiaoshu.length;
			// let n = 1; //假设每行显示6个
			// let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
			for (let i = 0; i < tempMiaoshu.length; i++) {
				// let obj = {};
				// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
				ary.push({ id: i, list: tempMiaoshu[i], rato: itemtab.god_percent.slice(i * 2, (i * 2) + 2) });

			}
			this.JiangliItemList.dataSource = ary;
			// if(this.dataSource[2])
			// 	this.findSelected(this.dataSource[2].uuid);
		}

		public close() {
			super.close();
			this.bgPanel.dataSource = null;
			this.JiangliItemList.dataSource = null;
		}
	}
}