/**
* name 
*/
module game {
    export class TujianProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "TujianProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TujianEvent(TujianEvent.SHOW_TUJIAN_PANEL),
                new TujianEvent(TujianEvent.SHOW_XIANGXI_PANEL),
                new TujianEvent(TujianEvent.SHOW_EVALUATION_PANEL),
                new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL),
                new TujianEvent(TujianEvent.UPDATE_EVALUATION),
                new TujianEvent(TujianEvent.SHOW_EVALUATIONINPUT_PANEL),
                new TujianEvent(TujianEvent.SHOW_PINGLUNGOD_PANEL),
                new TujianEvent(TujianEvent.DIANZAN),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof TujianEvent) {
                switch ($event.type) {
                    case TujianEvent.SHOW_TUJIAN_PANEL:
                        this.showTujianPanel();
                        break;
                    case TujianEvent.SHOW_XIANGXI_PANEL:
                        this.showXiangxiPanel($event.data);
                        break;
                    case TujianEvent.SHOW_EVALUATION_PANEL:
                        this.getGodevaluations($event.data);
                        break;
                    case TujianEvent.SHOW_EVALUATIONINPUT_PANEL:
                        this.showInput($event.data);
                        break;
                    case TujianEvent.SHOW_GUAIWUXINXI_PANEL:
                        this.showTujianView($event.data);
                        break;
                    case TujianEvent.UPDATE_EVALUATION:
                        this.updatePingjia($event.data);
                        break;
                    case TujianEvent.SHOW_PINGLUNGOD_PANEL:
                        this.showPinglunPanel($event.data);
                        break;
                    case TujianEvent.DIANZAN:
                        this.dianzan($event.data);
                        break;
                }
            }
        }

        /** 打开图鉴界面 */
        private showTujianPanel(): void {
            UIMgr.showUI(UIConst.TujianView);
            let args = {};
            args[Protocol.game_common_openUI.args.type] = iface.tb_prop.uiTypeKey.album;
            PLC.request(Protocol.game_common_openUI, args, ($data: any, msg: any) => {
                if (!$data) return;
            });
        }

        /**切换到英雄详细界面
         * @param $data 当前英雄排序数组索引
         */
        private showXiangxiPanel(ary: any[]): void {
            let index = ary[0];
            let godList : TuJianGodTemp[] = ary[1];
            TujianModel.getInstance().index = index;
            UIMgr.showUI(UIConst.TujianHeroView, [index,godList]);
        }


        /**进入评价界面 */
        private getGodevaluations(god): void {
            UIMgr.showUI(UIConst.Tujian_PingjiaView, god);
        }

        /** 发布评价 */
        private updatePingjia(args): void {
            PLC.request(Protocol.game_god_publishComment, args, ($data: any, msg: any) => {
                if (!$data) return;
                if (UIMgr.hasStage(UIConst.Tujian_PingjiaView)) {
                    let ui: PingjiaView = UIMgr.getUIByName(UIConst.Tujian_PingjiaView);
                    ui.updateData($data.allComment);
                }
            });
        }
        /**
         * 输入评价
         * @param data 
         */
        private showInput(data:tb.TB_god): void {
            if(App.hero.level < tb.TB_god_set.get_TB_god_set().comment_needlevel){
                showToast(LanMgr.getLan('', 10466));
                return;
            }
            if(!GodUtils.isActiveGod(data.ID)) {
                showToast(LanMgr.getLan('', 10467));
                return;
            }
            UIMgr.showUI(UIConst.Tujian_PingjiaShuruView, data);
        }

        /**查看英雄/怪物信息界面 */
        private showTujianView(eventdata): void {
            UIMgr.showUI(UIConst.GuaiwuxinxiView, eventdata);
        }

        private showPinglunPanel(info:PingjiaInfo): void {
            let args = {};
            args[Protocol.game_god_observeGod.args.playerId] = info.playerId;
            args[Protocol.game_god_observeGod.args.templateId] = this.pingjiaView.getCurGodId();
            PLC.request(Protocol.game_god_observeGod, args, ($data: any, msg: any) => {
                if (!$data) return;
                let obsInfo = $data.observeGodInfo;
                let tab = tb.TB_god.get_TB_godById(obsInfo[0]);
                if (!tab) {
                    logerror("查看评价页面失败：",$data);
                    return;
                }
                let data = new GodItemVo(tab);
                for (let key in obsInfo[3]) {
                    data.iSeverAttri.push([Number(key), Number(obsInfo[3][key])])
                }
                data.starLevel = obsInfo[1];
                data.level = obsInfo[2];
                data.degree = obsInfo[4];
                data.awakenLv = obsInfo[5];
                data.skinId = obsInfo[6];
                UIMgr.showUI(UIConst.GuaiwuxinxiView, data);
            })
        }

        /** 点赞 */
        private dianzan(data:PingjiaInfo): void {
            let args = {};
            args[Protocol.game_god_likeComment.args.value] = data.aryStr;
            args[Protocol.game_god_likeComment.args.templateId] = this.pingjiaView.getCurGodId();
            PLC.request(Protocol.game_god_likeComment, args, ($data: any, msg: any) => {
                if (!$data) return;
                data.num ++;
                this.pingjiaView.refreshList();
            })
        }

        /** 详细界面 */
        public get xiangxiview(): TujianHeroView {
            return UIMgr.getUIByName(UIConst.TujianHeroView);
        }

        /** 图鉴界面 */
        public get tbagView(): TujianView {
            return UIMgr.getUIByName(UIConst.TujianView);
        }

        /** 评价界面 */
        public get pingjiaView(): PingjiaView {
            return UIMgr.getUIByName(UIConst.Tujian_PingjiaView);
        }

    }
}