/**
* name 
*/
module game {
	export class PingjiaInfo {
		time : number;
		playerId : string;
		name : string;
		click : boolean;
		content : string;
		num : number;

		public aryStr : any;
		constructor(dataAry:any[]) {
			this.aryStr = dataAry[0];
			let data : any[] = JSON.parse(dataAry[0]);
			this.time = data[0];
			this.playerId = data[1];
			this.name = data[2];
			this.click = data[3];
			this.content = data[4];
			this.num = Number(dataAry[1]);
		}
	}

	export class PingjiaView extends ui.tujian.PingjiaUI {
		private _evaluate: common.Accordion;
		constructor() {
			super();
			this.isModelClose = true;
			this._evaluate = new common.Accordion(580, 560);
			this.btn_Add.on(Laya.Event.CLICK, this, this.onAdd);
			this._evaluate.itemRender = PingjiaIR;
			this.addChild(this._evaluate);
			this._evaluate.spaceY = 10;
			this._evaluate.x = 52;
			this._evaluate.y = 360;
			this._evaluate.isAutoScroll = false;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12118) };
		}

		onClosed():void {
			super.onClosed();
			Laya.timer.clearAll(this);
		}

		public popup() {
			super.popup();
			this.initView();
		}

		private initView(): void {
			let tbGod : tb.TB_god = this.dataSource;
			var args = {};
			args[Protocol.game_god_getComment.args.templateId] = tbGod.ID;
			PLC.request(Protocol.game_god_getComment, args, ($data: any, msg: any) => {
				if (!$data) return;
				this.updateData($data.allComment);
			});
			this.lab_desc.text = "        " + tbGod.desc;
			this.lbl_name.text= tbGod.name;
		}

		/** 更新数据 */
		public updateData(allComment:any[]):void {
			let curScroll = this._evaluate.scrollBar.value;
			allComment = allComment || [];
			let list : PingjiaInfo[] = [];
			for (let i in allComment) {
				let vo = new PingjiaInfo(allComment[i])
				list.push(vo);
			}
			list.sort((a,b)=>{
				return a.time - b.time;
			});
			
			this._evaluate.dataSource = list;
			for (let i = 0, len = this._evaluate.cells.length; i < len; i++) {
				let box: PingjiaIR = this._evaluate.cells[i] as PingjiaIR;
				box.refresh();
			}
		}

		/** 刷新列表 */
		public refreshList():void {
			for (let i = 0, len = this._evaluate.cells.length; i < len; i++) {
				let box: PingjiaIR = this._evaluate.cells[i] as PingjiaIR;
				box.refresh();
			}
		}

		public getCurGodId(): number {
			return this.dataSource.ID;
		}

		/**添加评价 */
		private onAdd(): void {
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_EVALUATIONINPUT_PANEL), this.dataSource);
		}
	}
}