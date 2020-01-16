/**
* OnlineModel
*/
module game{
	export class OnlineModel{
		private static _instance: OnlineModel;
		static getInstance(): OnlineModel {
			if (!OnlineModel._instance) {
				OnlineModel._instance = new OnlineModel();
			}
			return OnlineModel._instance;
		}

		static curId:number;

		private _list:Array<BoxVo>;
		public getList():Array<BoxVo> {
			if(this._list){
				return this._list;
			}
			this._list = new Array
			let arytab: Array<tb.TB_online> = tb.TB_online.getTB_share();
            for (var i = 0; i < arytab.length; i++) {
                let itemvo: BoxVo = new BoxVo;
                itemvo.id = i;
                itemvo.tab = arytab[i];
                itemvo.needtime = itemvo.tab.time * 60;
                this._list.push(itemvo);
            }
			return this._list;
		}

		public visiableView(){
			let list = this.getList();
			for (var i = 0; i < list.length; i++) {
				if(!list[i].isReceive()){
					return true;
				}
			}
			return false;
		}

		public lastItemState(){
			let list = this.getList();
			for (var i = 0; i < list.length; i++) {
				let item = list[i];
				if(!item.isReceive()){
					return {istime:!item.canReceive(),vo:item};
				}
			}
			return null;
		}
	}
}