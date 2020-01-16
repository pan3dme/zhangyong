

module common {
    /** 
     * 计数器
    */
    export class CounterBar {

        public btnAddOne : Laya.Button;     // 单次增加
        public btnAddDuo : Laya.Button;     // 十次增加
        public btnRedOne : Laya.Button;     // 单次减少
        public btnRedDuo : Laya.Button;     // 十次减少
        public textInput : Laya.TextInput | Laya.Label;

        private _curNum : number;       // 当前数值
        private _maxNum : number;       // 最大数值
        private _callBack : Function;

		private _addMultiNum : number = 10;	// 多个增减的数量
        constructor() {
            
        }

        /** 设置组件 */
        setComponent(btnAddOne : Laya.Button,btnAddDuo : Laya.Button,btnRedOne : Laya.Button,btnRedDuo : Laya.Button,textInput : Laya.TextInput|Laya.Label,addMultiNum:number=10):void {
            this.btnAddOne = btnAddOne;
            this.btnAddDuo = btnAddDuo;
            this.btnRedOne = btnRedOne;
            this.btnRedDuo = btnRedDuo;
            this.textInput = textInput;
			this._addMultiNum = addMultiNum;
            if(this.textInput instanceof Laya.TextInput) {
                this.textInput.type = Laya.Input.TYPE_NUMBER;
                this.textInput.on(Laya.Event.INPUT, this, this.onput);
            }
            
			this.btnAddOne.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			this.btnAddOne.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			this.btnAddOne.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
			this.btnAddDuo.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
			this.btnAddDuo.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
			this.btnAddDuo.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);

			this.btnRedOne.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			this.btnRedOne.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			this.btnRedOne.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
			this.btnRedDuo.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
			this.btnRedDuo.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
			this.btnRedDuo.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
        }

        /** 设置初始数据 */
        setInitData(curNum:number,maxNum:number,callBack:Function):void {
            this._curNum = curNum;
            this._maxNum = maxNum;
            this._callBack = callBack;
			this.updateBtn();
        }

        /** 点击时间 */
		private _downTime : number;
		/** 按下：根据时间判断多次还是单次 */
		private onMouseDown(evt:Laya.Event):void {
			let target = evt.currentTarget as Laya.Button;
			let num = 1;
			if(target == this.btnAddOne) {
				num = 1;
			}else if(target == this.btnAddDuo) {
				num = this._addMultiNum;
			}else if(target == this.btnRedOne) {
				num = -1;
			}else if(target == this.btnRedDuo) {
				num = -this._addMultiNum;
			}
			this._downTime = new Date().getTime();
			// loghgy("onMouseDown",num)
			Laya.timer.loop(300,this,this.onLoop,[num]);
		}
		/** 抬起结束 */
		private onMouseUp(evt:Laya.Event):void {
			let target = evt.currentTarget as Laya.Button;
			let num = 1;
			if(target == this.btnAddOne) {
				num = 1;
			}else if(target == this.btnAddDuo) {
				num = this._addMultiNum;
			}else if(target == this.btnRedOne) {
				num = -1;
			}else if(target == this.btnRedDuo) {
				num = -this._addMultiNum;
			}
			// loghgy("onMouseUp",num)
			let time = new Date().getTime();
			if(time - this._downTime < 200){
				// loghgy("200:onClick",num);
				this.excute(num);
			}
			Laya.timer.clearAll(this);
		}
		/** 出界结束 */
		private onMouseOut():void {
			// loghgy("onMouseOut");
			Laya.timer.clearAll(this);
		}
		/** 累计 */
		private onLoop(num:number):void {
			if( (this._curNum + num >= this._maxNum) || (this._curNum + num <= 1)) {
				// loghgy("clearLoop");
				Laya.timer.clear(this,this.onLoop);
			}
			this.excute(num);
		}

		/** 执行 */
		private excute(num:number):void {
			// num 负数为减
			this._curNum += num;
			// 上限下限限制
			// 最大max
			this._curNum = Math.min(this._maxNum,this._curNum);
			// 最小1
			this._curNum = Math.max(1, this._curNum);
			this.doCallBack();
		}

        /** 设置购买数量 */
		private onput(): void {
            let input = Number(this.textInput.text);
			input = Math.max(1, input);
			input = Math.min(this._maxNum, input);
			this._curNum = input;
			this.doCallBack();
		}

        private doCallBack():void {
			this.updateBtn()
            if(this._callBack){
                this._callBack(this._curNum);
            }
        }
		private updateBtn(){
			this.btnRedOne.disabled = this.btnRedDuo.disabled = this._curNum <= 1;
			this.btnAddOne.disabled = this.btnAddDuo.disabled = this._curNum >= this._maxNum;
		}

        getCurNum():number {
            return this._curNum;
        }

        dispose():void {
            if(this.textInput) {
                this.textInput.off(Laya.Event.INPUT, this, this.onput);
            }
			this.btnAddOne.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			this.btnAddOne.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			this.btnAddOne.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
			this.btnAddDuo.off(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
			this.btnAddDuo.off(Laya.Event.MOUSE_UP,this,this.onMouseUp);
			this.btnAddDuo.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);

			this.btnRedOne.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			this.btnRedOne.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			this.btnRedOne.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
			this.btnRedDuo.off(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
			this.btnRedDuo.off(Laya.Event.MOUSE_UP,this,this.onMouseUp);
			this.btnRedDuo.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
            this._callBack = null;
        }
    }

}