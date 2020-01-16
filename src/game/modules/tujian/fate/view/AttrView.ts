
module game {
    export class AttrView extends ui.tujian.AttrViewUI {
        constructor(){
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.Tujian_AttrView, closeOnSide: this.isModelClose,closeOnButton:false, title:LanMgr.getLan("",12121)};
			this.bgPanel.addChildAt(this.img_bg, 3);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public close(): void {
            super.close();
        }

        public onClosed(): void {
            super.onClosed();
        }

        private initView(): void {
            this.lb_ack.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(1));
            this.lb_def.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(2));
            this.lb_hp.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(3));
            this.lb_speed.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(4));
            this.lb_crit.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(5) + '%');
            this.lb_defcrit.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(6) + '%');
            this.lb_hit.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(7) + '%');
            this.lb_res.text = LanMgr.getLan(' + {0}', -1, FateModel.getInstance().getCurFateAttrById(8) + '%');
        }
    }
}