module common {
    export class BagRenderList extends Accordion {
        constructor(width: number, height: number) {
            super(width, height);
            this.useInitBuff = true;
        }

        /** 选中标签展开内容 
         * 点击对象的name需要设置为clickTarget，并且事件类型为Click点击
         * 如果选中了同一个则关闭，如果选择了同一行且不是同一个，则切换数据源，如果选择其他行，则先关闭再打开其他行
        */
        protected onSelect(event: TreeEvent): void {
            //该次点击的选中项
            let selectVo = event.data;
            if (!selectVo) return;
            //新选中id -1为不选中任何
            let nselect: number = selectVo.selectid == selectVo.indexid ? -1 : selectVo.indexid;
            for (let i = 0, len = this._items.length; i < len; i++) {
                let box = this._items[i];
                //给一行数据源修改选中标识
                for (let k = 0; k < box.dataSource.length; k++) {
                    box.dataSource[k].selectid = nselect;
                }
                //刷新列表
                if (box instanceof game.BagIR)
                    box.list_lineitem.refresh();
                //执行弹出或者关闭逻辑。如果只是切换数据源，也是重新执行该方法。
                if (nselect != -1) {
                    let line = Math.floor(nselect / game.BagModel.line_num);
                    if (line == i) {
                        if (box['onShow']) {
                            box['onShow'](selectVo);
                        }
                    } else {
                        if (box['isShow'] && box['isShow']()) {
                            if (box['onHide']) {
                                box['onHide']();
                            }
                        }
                    }
                } else {
                    if (box['onHide']) {
                        box['onHide']();
                    }
                }
            }
            this.layoutAllItem();
        }
    }
}