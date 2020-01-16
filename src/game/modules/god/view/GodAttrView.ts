/**
* name 
*/
module game {
	export class GodAttrView extends ui.god.GodAttrUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.attrList.renderHandler = new Handler(this, this.onAttrRender);
			this.greenList.renderHandler = new Handler(this, this.onGreenRender);
			this.bgPanel.lbTitle.visible = this.bgPanel.bgTitle.visible = false;
			this.bgPanel.dataSource = { uiName: UIConst.God_AttrView, closeOnSide: this.isModelClose,closeOnButton:false, title:LanMgr.getLan("",12121) };
			this.bgPanel.addChildAt(this.img_bg, 3);
		}

		set dataSource(v) {
			this._dataSource = v;
			if(!!v) this.initView();
		}

		get dataSource(): IGodAttr {
			return this._dataSource;
		}

		private initView(): void {
			// 绿色加成只显示基础属性前四个，后面的属性直接显示总值
			let basicAttr = this.dataSource.basicAttr || [];
			// 复制
			basicAttr = [...basicAttr]; 
			let allAttr = this.dataSource.allAttr;
			let greenAttr = new Array();
			for (let i = 0; i < 4; i++) {
				let num = Math.floor(allAttr[i][1]) - Math.floor(basicAttr[i][1]);
				if (num != 0)
					greenAttr.push(num);
				else
					greenAttr.push(0);
			}
			for (let i = 4; i < 8; i++) {
				basicAttr[i][1] = (Math.floor(allAttr[i][1] * 10000) / 100) + "%";
			}
			
			let ary = allAttr[iface.tb_prop.attrTypeKey.addDmg-1] || [];
			let value : number = ary[1] || 0;
			value = (Math.floor(value * 10000) / 100);
			basicAttr.push([iface.tb_prop.attrTypeKey.addDmg,(value > 0 ? value+"%" : "0%")]);

			ary = allAttr[iface.tb_prop.attrTypeKey.subDmg-1] || [];
			value = ary[1] || 0;
			value = (Math.floor(value * 10000) / 100);
			basicAttr.push([iface.tb_prop.attrTypeKey.subDmg,(value > 0 ? value+"%" : "0%")]);

			this.greenList.array = greenAttr;
			this.attrList.array = basicAttr;
		}

		/** 绿字属性渲染 */
		private onAttrRender(cell: Laya.Label, index: number) {
			let data: number[] = cell.dataSource;
			if (data) {
				let name = LanMgr.attrName[data[0]];
				let value = index < 4 ? String(Math.floor(data[1])) : data[1] + ``;
				cell.text = `${name} : ${value}`
			}
		}

		/** 绿字属性渲染 */
		private onGreenRender(cell: Laya.Label, index: number) {
			let data: number = cell.dataSource;
			if (data) {
				cell.text = `+` + data;
			} else {
				cell.text = ``;
			}
		}

		onClosed(): void {
			super.onClosed();
			this.attrList.array = null;
			this.greenList.array = null;
		}

	}

	export interface IGodAttr {
		/**基础属性 */
		basicAttr: any[][];
		/**额外属性 */
		allAttr: any[][];
	}
}