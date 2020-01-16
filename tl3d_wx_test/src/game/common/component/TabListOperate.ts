
module common {

    export interface TabOperateInfo {
        /** 试图名称,标识 */
        viewName: string;
        /** 视图类名称 */
        viewClz : any;
        /** 选中前验证是否可选中 */
        onSelectVerify?: ()=>boolean;
        /** 选中后渲染前回调：可用于渲染之前的数据请求赋值等,比如请求后台数据 */
        onSelectBefore?: (callback: Function) => void;
        /** 选中后渲染后回调：表示结束 */
        onSelectAfter?: () => void;
        /** 创建视图后回调 */
        onCreated?: (component?: Laya.Component) => void;
        /** 释放视图回调 */
        onClosed?: (component?: Laya.Component) => void;
        /** 新选中界面的显示：可用于重新渲染 */
        onShow?: (component?: Laya.Component) => void;
        /** 旧选中界面的隐藏：可用于释放 */
        onHide?: (component?: Laya.Component) => void;
        /** 视图数据源 */
        dataSource?: any;
    }
    
    /** 选项卡界面切换
     *  注意：因为没有监听界面移除的事件,所以需手动调用viewDispose方法,清除当前界面状态,防止重新打开时没有重新渲染界面
     */
    export class TabListOperate {
        /** 选项卡列表 */
        private _tab: ITabList;
        /** 视图列表数据 */
        private _dataList : TabOperateInfo[] = [];
        /** 视图集 */
        private _viewMap: {[key:string]: Laya.Component; } = {};
        /** 容器 */
        private _parentContainer : Laya.Component;
        /** 当前选择界面 */
        private _selectedName : string;
        constructor(tabList: ITabList,container:Laya.Component) {
            this._tab = <ITabList>tabList;
            this._parentContainer = container;
            if(this._tab instanceof ListBase) {
                this._tab.verifyHandler = new Handler(this,this.onVerifyCallback);
            }
            this._tab.selectHandler = new Handler(this,this.onSelectHandler);
        }

        /** 添加选项卡数据 */
        addTabItem(info: TabOperateInfo): this {
            if(this.isExist(info.viewName)){
                logerror("重复添加视图数据失败",info.viewName);
                return;
            }
            this._dataList.push(info);
            return this;
        }
        /** 设置数据源 */
        setTabItemist(ary:TabOperateInfo[]):void {
            this._dataList.length = 0;
            for(let i = 0 ; i < ary.length ; i++){
                this.addTabItem(ary[i]);
            }
        }

        /** 是否验证通过 */
        private onVerifyCallback(index:number):boolean {
            var item = this._dataList[index];
            if (item && item.onSelectVerify) {
                return item.onSelectVerify();
            }
            return true;
        }

        /** 选中回调 */
        private onSelectHandler(index:number):void {
            let tabInfo = this._dataList[index];
            if(!tabInfo || !tabInfo.viewClz) return;
            if(tabInfo.onSelectBefore){
                tabInfo.onSelectBefore(this.selectTabItem.bind(this,tabInfo))
            }else{
                this.selectTabItem(tabInfo);
            }
        }

        /** 选中选项卡界面：创建界面、显示隐藏界面 */
        private selectTabItem(tabInfo:TabOperateInfo):void {
            if(!tabInfo.viewClz){
                logerror("没有设置视图类",tabInfo.viewName);
                return;
            }
            if(!this._viewMap.hasOwnProperty(tabInfo.viewName)){
                this._viewMap[tabInfo.viewName] = this.createView(tabInfo);
                this._viewMap[tabInfo.viewName].visible = false;
            }
            for(let key in this._viewMap) {
                let view = this._viewMap[key];
                let oldVisible = view.visible;
                let newVisible = key == tabInfo.viewName;
                // 设置界面数据源
                if(newVisible) {
                    this._selectedName = tabInfo.viewName;
                    if(!view.dataSource || view.dataSource != tabInfo.dataSource){
                        view.dataSource = tabInfo.dataSource;
                    }
                }
                // 渲染界面，切换界面
                if(oldVisible != newVisible){
                    if(newVisible && tabInfo.onShow){
                        tabInfo.onShow(view);
                    }else if(!newVisible && tabInfo.onHide){
                        tabInfo.onHide(view);
                    }
                }
                view.visible = newVisible;
            }
            if(tabInfo.onSelectAfter){
                tabInfo.onSelectAfter();
            }
        }

        /** 创建视图 */
        private createView(tabInfo:TabOperateInfo):Laya.Component{
            let view = new tabInfo.viewClz() as Laya.Component;
            view.name = tabInfo.viewName;
            view.dataSource = tabInfo.dataSource;
            if(tabInfo.onCreated){
                tabInfo.onCreated(view);
            }
            this._parentContainer.addChild(view);
            return view;
        }

        /** 更新视图并且更新数据 */
        updateItemByName(viewName:string,data:any):void{
            let info = this.getViewInfoByName(viewName);
            if(!info) return;
            info.dataSource = data;
            let view = this.getViewByName(viewName);
            if(view){
                view.dataSource = data;
            }
            info.onShow && info.onShow(view);
        }
        /** 刷新视图不更新数据 */
        refreshItemByItem(viewName:string):void {
            let info = this.getViewInfoByName(viewName);
            if(!info) return;
            let view = this.getViewByName(viewName);
            info.onShow && info.onShow(view);
        }
        
        /** 获取界面 */
        public getViewByName(viewName:string):Laya.Component {
            return this._viewMap[viewName];
        }
        /** 获取选项数据：TabOperateInfo */
        public getViewInfoByName(viewName:string):TabOperateInfo {
            return this._dataList.find((vo)=>{
                return vo.viewName == viewName;
            });
        }
        /** 通过界面名称获取索引 */
        public getViewIndex(viewName:string):number {
            return this._dataList.findIndex((vo)=>{
                return vo.viewName == viewName;
            });
        }
        /** 通过索引获取界面名称 */
        public getViewName(index:number):string {
            let info = this._dataList[index];
            return info ? info.viewName : null;
        }
        /** 获取当前选中界面名称 */
        getSelectedName():string {
            return this._selectedName;
        }

        /** 移除视图数据 */
        public removeTabItem(viewName:string):void {
            let view = this._viewMap[viewName];
            if(view){
                view.removeSelf();
            }
            this._viewMap[viewName] = null;
            delete this._viewMap[viewName];
            let index = this._dataList.findIndex((vo)=>{
                return vo.viewName == viewName;
            });
            if(index!=-1){
                this._dataList.splice(index,1);
            }
        }
        
        /** 是否存在 */
        public isExist(viewName):boolean {
            return this._dataList.some((vo)=>{
                return vo.viewName == viewName;
            });
        }
        /** 获取界面数量 */
        public getViewNum():number {
            return this._dataList.length;
        }

        /** 清除选择 */
        clearSelected():void {
            this._tab.selectedIndex = -1;
            this._selectedName = null;
            for(let viewName in this._viewMap) {
                if(this._viewMap[viewName]) {
                    this._viewMap[viewName].visible = false;
                }
            }
        }

        /** 界面释放 */
        public viewDispose():void {
            for(let info of this._dataList){
                let view = this.getViewByName(info.viewName);
                if(info.onClosed){
                    info.onClosed(view);
                }
            }
            this.clearSelected();
        }

        /** 释放后再次使用需要重新设置数据源列表 */
        public realDispose():void {
            for(let info of this._dataList){
                let view = this.getViewByName(info.viewName);
                if(info.onClosed){
                    info.onClosed(view);
                }
            }
            this._dataList.length = 0;
            this._viewMap = {};
            this._selectedName = null;
            this._parentContainer.removeChildren();
        }
        
    }
}