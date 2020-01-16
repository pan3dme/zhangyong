module game {
    export class BagIR extends ui.bag.ItemRenderUI implements common.IAccordionItemRenderer {
        constructor() {
            super();
            this.list_lineitem.mouseHandler = new Handler(this, this.clickAchi);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData() {
            if (this._dataSource) {
                let i = this._dataSource[0].bag ? 6 : 7;
                let ary: Array<ItemVo> = this._dataSource;
                let curline = Math.floor(ary[0].indexid / i)//当前行
                let selectline = ary[0].selectid == -1 ? -1 : Math.floor(ary[0].selectid / i)//选中行
                if (curline == selectline) {
                    let selectvo: ItemVo;
                    for (let j = 0; j < ary.length; j++) {
                        if (ary[j].indexid == ary[j].selectid)
                            selectvo = ary[j];
                    }
                    logdebug(selectvo);
                    this.onShow(selectvo);
                } else {
                    this.onHide();
                }
                this.list_lineitem.array = ary;
            } else {
                this.onHide();
                this.list_lineitem.array = null;
            }
        }

        public updataItem($idx: number) {
            let sitem = this.list_lineitem.array[$idx];
            this.list_lineitem.setItem($idx, sitem);
            if (this.isShow()) {
                let vo: ItemVo = this.ui_detail.dataSource;
                if (vo.id == sitem.id) {
                    this.ui_detail.dataSource = sitem;
                }
            }
        }

        /** 点击打开详细成就介绍 */
        private clickAchi(event: Laya.Event, index: number): void {
            if (event.type == Laya.Event.CLICK) {
                this.showDetail(this.list_lineitem.array[index]);
            }
        }
        public showDetail(itemVo:ItemVo):void {
            dispatchEvt(new common.TreeEvent(common.TreeEvent.SELECT_TAB, itemVo));
        }

        /** 展开子任务 */
        public onShow($data: any): void {
            this.ui_detail.visible = true;
            this.ui_detail.dataSource = $data;
            this.height = 360;
            // this.ui_detail.btn_buttons.x = $data.bag? 375:430;
            this.ui_detail.img_di.width = $data.bag ? 590 : 620;
        }

        /** 隐藏子任务 */
        public onHide(): void {
            this.ui_detail.visible = false;
            this.ui_detail.dataSource = null;
            this.height = 115;
        }

        /** 是否是展开的 */
        public isShow(): boolean {
            return this.ui_detail.visible;
        }
    }
}