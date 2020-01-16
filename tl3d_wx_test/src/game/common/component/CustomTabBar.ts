

module common {
    /** 简易按钮选项切换 */
    export class CustomTabBar {

        private _buttonList: Laya.Button[] = [];
        private _selectHandler: Handler;
        private _selectedIndex: number = -1;

        private _buttonsData : TabBtnData[];
        constructor() {
            this._buttonList = [];
        }

        /** 设置按钮组 */
        set buttons(list: Laya.Button[]) {
            this._buttonList = list;
            for (let btn of list) {
                btn.on(Laya.Event.CLICK, this, this.onSelected);
            }
        }

        /** 设置按钮数据 */
        set buttonsData(value:TabBtnData[]) {
            this._buttonsData = value;
            for(let i = 0, len = this._buttonList.length ; i < len ; i++){
                if(value[i] && value[i].name){
                    this._buttonList[i].label = value[i].name;
                }
            }
            this.updateLockState();
        }

        get selectedIndex(): number {
            return this._selectedIndex;
        }
        set selectedIndex(value: number) {
            if(value >= this._buttonList.length){
                return;
            }
            if(this._selectedIndex == value){
                return;
            }
            let buttonData = this.getButtonData(value);
            /** 判断是否需要检测选择的tab是否开启，为false表示未开启，就不选择 */
            if(buttonData && buttonData.openHandler){
                if(buttonData.openHandler instanceof Laya.Handler){
                    if(!buttonData.openHandler.run()){
                        if(buttonData.prompt){
                            showToast(buttonData.prompt);
                        }
                    }else {
                        this.doSelectedIndex(value);
                    }
                    return;
                }else if(buttonData.openHandler instanceof Promise){
                    buttonData.openHandler.then((open)=>{
                        if(!open){
                            if(buttonData.prompt){
                                showToast(buttonData.prompt);
                            }
                        }else{
                            this.doSelectedIndex(value);
                        }
                    });
                }
            }else{
                this.doSelectedIndex(value);
            }
        }
        private doSelectedIndex(value:number):void {
            this._selectedIndex = value;
            this.updateSelectState();
            this.runHandler();
        }
        /** 设置选中时回调函数 */
        set selectHandler(Handler: Laya.Handler) {
            this._selectHandler = Handler;
        }

        /** 执行函数 */
        private runHandler(): void {
            let index = this._selectedIndex;
            if (index == -1) return;
            if(this._selectHandler){
                this._selectHandler.runWith([index]);
            }
        }

        /** 选中按钮 */
        private onSelected(event: Laya.Event): void {
            let btn: Laya.Button = event.target as Laya.Button;
            let index = this._buttonList.indexOf(btn);
            this.selectedIndex = index;
        }

        /** 更新选中状态 */
        public updateSelectState(): void {
            let len = this._buttonList.length;
            for (let i = 0; i < len; i++) {
                this._buttonList[i].selected = i == this._selectedIndex;
            }
        }

        /** 更新按钮的锁定状态 */
        public updateLockState():void {
            let len = this._buttonList.length;
            for (let i = 0; i < len; i++) {
                let btn = this._buttonList[i];
                let btnData = this.getButtonData(i);
                if(!btnData) continue;
                let type = btnData.openTye;
                if(type == BtnOpenType.gray){
                    if(btnData.openHandler instanceof Laya.Handler){
                        btn.gray = !btnData.openHandler.run();
                    }else if(btnData.openHandler instanceof Promise){
                        btnData.openHandler.then((open)=>{
                            btn.gray = !open;
                        });
                    }else{
                        btn.gray = false;
                    }
                }else if(type == BtnOpenType.visible){
                    let lockComp : Laya.Sprite = btn['imgLock'];
                    if(!lockComp) continue;
                    if(btnData.openHandler instanceof Laya.Handler){
                        btn.gray = !btnData.openHandler.run();
                    }else if(btnData.openHandler instanceof Promise){
                        btnData.openHandler.then((open)=>{
                            btn.gray = !open;
                        });
                    }else{
                        lockComp.visible = false;
                    }
                }
            }
        }
        /** 获取按钮数据 */
        getButtonData(index:number){
            return this._buttonsData ? this._buttonsData[index] : null;
        }

        public onClose(): void {
            for (let btn of this._buttonList) {
                btn.off(Laya.Event.CLICK, this, this.onSelected);
            }
            this._buttonList.length = 0;
            this._buttonsData = null;
            this._selectHandler = null;
            this._selectedIndex = -1;
        }
    }
    /** 按钮数据 */
    export interface TabBtnData {
        name ?: string;
        openHandler ?: Handler | Promise<any>;
        openTye ?: BtnOpenType;      
        prompt ?: string;
    }
    /** 按钮开启状态的设置类型 */
    export enum BtnOpenType {
        none = 0,
        gray = 1,       // 按钮置灰
        visible = 2     // 锁visible
    }
}