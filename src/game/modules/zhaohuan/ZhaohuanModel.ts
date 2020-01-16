/*
* name;
*/
module game{    
    export class ZhaohuanModel {
			curObj = {isOne:false,type:-1};
			private static _instance:ZhaohuanModel;
			public static getInstance():ZhaohuanModel{
				if(!ZhaohuanModel._instance){
					ZhaohuanModel._instance=new ZhaohuanModel();
				}
				return ZhaohuanModel._instance;
			}

			/** 跳过动画 */
      private _jumpAni: boolean = false;
      public set jumpAni($value) {
				this._jumpAni = $value;
			}
			public get jumpAni(): boolean {
				return this._jumpAni;
			}



    }
}