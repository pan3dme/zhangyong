

module game {
    export class FateIR extends ui.tujian.render.FateIRUI {
        constructor() {
            super();
            this.list_god.renderHandler = new Handler(this, this.onRender);
            this.btn_lightup.on(Laya.Event.CLICK, this, this.onLightUp);
            this.ani_item.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);
			this.ani_item2.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);
            this.ani_item.visible = this.ani_item2.visible = false;
            this.ani_item.stop();
            this.ani_item2.stop();
        }

        public set dataSource($value: FateVo) {
            this._dataSource = $value;
            this.initView();
        }
        public get dataSource(): FateVo {
            return this._dataSource;
        }

        private initView(): void {
            let info = this.dataSource;
            if (info) {
                //神灵list
                this.list_god.array = info.listItem;
                this._totalnum = info.listItem.length;
                //属性增加
                if (info.tbGodFate.attr.length == 1) {
                    this.lb_desc.text = LanMgr.getLan('{0} ( {1} + {2} )', -1, info.tbGodFate.name, info.getAttrByIndex(0)[0], info.getAttrByIndex(0)[1]);
                } else if (info.tbGodFate.attr.length == 2) {
                    this.lb_desc.text = LanMgr.getLan('{0} ( {1} + {2} , {3} + {4} )', -1, info.tbGodFate.name, info.getAttrByIndex(0)[0], info.getAttrByIndex(0)[1], info.getAttrByIndex(1)[0], info.getAttrByIndex(1)[1]);
                } else if (info.tbGodFate.attr.length == 3) {
                    this.lb_desc.text = LanMgr.getLan('{0} ( {1} + {2} , {3} + {4} , {5} + {6} )', -1, info.tbGodFate.name, info.getAttrByIndex(0)[0], info.getAttrByIndex(0)[1], info.getAttrByIndex(1)[0], info.getAttrByIndex(1)[1], info.getAttrByIndex(2)[0], info.getAttrByIndex(2)[1]);
                }
                this.refreshData();
            }else{
                this.ani_item.visible = this.ani_item2.visible = false;
                this.ani_item.stop();
                this.ani_item2.stop();
                clearTimeout(this._efftag);
            }
        }

        private refreshData():void {
            let info = this.dataSource;
            if (!info) return;
            /** 是否激活羁绊 */
            if (info.isActiviteComplete()) {
                this.img_success.visible = true;
                this.lb_success.visible = true;
                this.lb_desc.color = ColorConst.FATE_GREEN;
                if (this.redPoint) {
                    this.redPoint.onDispose();
                }
            } else {
                this.img_success.visible = false;
                this.lb_success.visible = false;
                this.lb_desc.color = ColorConst.FATE_GOLD;

                if (this.redPoint) {
                    let strKey = 'fate_' + info.tbGodFate.ID;
                    this.redPoint.setRedPointName(strKey);
                }
            }
            this.btn_lightup.visible = !info.isActiviteComplete() && info.isActivite();
        }


        private _effidx: number
		private _efftag: number;

		private _effnum: number;
        private _totalnum : number;
        private playEff() {
			if (this._effnum >= this._totalnum) {
				return;
			}
			let fanpaiui = this.ani_item;
			if (this._effnum % 2 == 1) {
				fanpaiui = this.ani_item2;
			}
			if (fanpaiui.visible && fanpaiui.isPlaying) {
				this.onAniComplete();
			}

			fanpaiui.visible = true;
			let cell = this.list_god.getCell(this._effnum)
			fanpaiui.x = this.list_god.x + cell.x + 45;
			fanpaiui.y = this.list_god.y + cell.y + 45;
			this._effnum++;
			fanpaiui.play(0, false);

			clearTimeout(this._efftag);
			this._efftag = setTimeout(() => {
				this.playEff();
			}, 150);
		}

        private onAniComplete() {
			let cell = this.list_god.getCell(this._effidx);
            if(cell) {
                cell.visible = true;
                this._effidx++;
            }
		}

        private onRender(cell: common.HeadBox, index: number) {
            cell.gray = !this.dataSource.isOwned(this.dataSource.listItem[index].templateId);
        }

        private onLightUp() {
            let info = this.dataSource;
            if (!info) return;
            //激活
            let args = {};
            args[Protocol.game_god_godFate.args.id] = info.tbGodFate.ID;
            PLC.request(Protocol.game_god_godFate, args, ($data: any, msg: any) => {
                if (!$data) return;
                this.refreshData();
                this.list_god.cells.forEach((cell)=>{
                    cell.visible = false;
                });
                this._effnum = 0;
                this._effidx = 0;
                this.playEff();
                dispatchEvt(new game.TujianEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC));
            });
        }
    }
}