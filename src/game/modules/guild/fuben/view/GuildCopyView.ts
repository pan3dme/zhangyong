

module game {

    export class GuildCopyView extends ui.guild.copy.GuildCopyUI {

        private _itemList: GuildGuanqiaItemRender[];
        private uiScene: Base2dSceneLayer;
        private _model: GuildCopyModel;

        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.GuildCopyView, closeOnSide: this.isModelClose, title: "公会副本" };
            this._model = GuildCopyModel.getInstance();
            this._itemList = [];
            for (let i = 1; i <= 3; i++) {
                this._itemList.push(this['item' + i]);
            }
            this.uiScene = new Base2dSceneLayer();
            this.topBox.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.topBox, this.lab_name);
            this.bgPanel.box_Content.addChild(this.img_bg);

            this.btnPrev.on(Laya.Event.CLICK, this, this.onClick);
            this.btnNext.on(Laya.Event.CLICK, this, this.onClick);
            this.btnRank.on(Laya.Event.CLICK, this, this.onClick);
            this.btnRule.on(Laya.Event.CLICK, this, this.onClick);
            this.btnReward.on(Laya.Event.CLICK, this, this.onClick);
            this.btnChallenge.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_sweep.on(Laya.Event.CLICK, this, this.onClick);
            this.btnBuy.on(Laya.Event.CLICK, this, this.onClick);
            for (let i = 0; i < this._itemList.length; i++) {
                this._itemList[i].on(Laya.Event.CLICK, this, this.onClickGuanqia);
            }
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close(type?: string, showEffect?: boolean, sound = true): void {
            super.close(type, showEffect, sound);
            this.uiScene.onExit();
            Laya.timer.clear(this, this.delayShow);
            this._curGuanqia = null;
            this._startIdx = 0;
            this._modeid = 0;
        }

        private initView(): void {
            this.uiScene.onShow();
            this._startIdx = this._model.getCurCopyIdx();
            this.updateChapterData(this._startIdx);
            this.updateCount();
        }

        /** 开始的索引 */
        private _startIdx: number = 0;
        private _curGuanqia: GuildGuanqiaVo;
        private updateChapterData(startIdx: number): void {
            let allList = this._model.getCopyList();
            let len = allList.length;
            this.btnPrev.disabled = startIdx == 0;
            this.btnNext.disabled = startIdx >= len - 3;
            // 不合法
            if (startIdx < 0 || startIdx > len - 3) {
                return;
            }
            this._startIdx = startIdx;
            let list = allList.slice(startIdx, startIdx + 3);
            // 第一次初始化当前关卡不存在时，查找当前可挑战关卡否则最后一关
            if (!this._curGuanqia) {
                this._curGuanqia = list.find((vo) => {
                    return vo.isCurrent();
                }) || list[list.length - 1];
            }
            for (let i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dataSource = list[i];
            }
            if (this._curGuanqia) {
                this.renderGuanqia(this._curGuanqia);
            }
        }

        /** 渲染关卡数据 */
        private renderGuanqia(guanqia: GuildGuanqiaVo): void {
            this._curGuanqia = guanqia;
            for (let i = 0; i < this._itemList.length; i++) {
                let itemInfo = this._itemList[i].dataSource;
                this._itemList[i].setSelected(itemInfo == guanqia);
            }
            if (this._curGuanqia && this._curGuanqia.isCurrent()) {
                this.btnChallenge.label = LanMgr.getLan('', 10093);
                this.btn_sweep.visible = true;
                this.btnChallenge.x = 378;
            } else {
                this.btnChallenge.label = LanMgr.getLan('', 10094);
                this.btn_sweep.visible = false;
                this.btnChallenge.x = 258;
            }
            if (this._curGuanqia) {
                let monsterT: tb.TB_monster = tb.TB_monster.get_TB_monsterById(this._curGuanqia.tbCopy.getMonterId());
                this.lab_name.text = LanMgr.getLan("{0}Lv{1}", -1, monsterT.name, monsterT.level);
            } else {
                this.lab_name.text = "";
            }

            this.btn_sweep.removeChild(this.ui_red_sweep);
            this._curGuanqia && this._curGuanqia.isCurrent() ? this.btnChallenge.addChild(this.btn_red) : this.btnChallenge.removeChild(this.btn_red);
            Laya.timer.once(200, this, this.delayShow.bind(this));
            if (this._curGuanqia.isCurrent()) {
                let info = GuildCopyModel.getInstance().copyChallengeVo;
                info.setGuanqiaVo(guanqia);
                let arg = {};
                arg[Protocol.guild_guildCopy_copyInfo.args.id] = guanqia.tbCopy.ID;
                PLC.request(Protocol.guild_guildCopy_copyInfo, arg, ($data) => {
                    if ($data) {
                        info.setSvo($data);
                        let curBlood = info.getMonstersRestBlood();
                        this.lbBlood.text = curBlood + "/" + info.getMonstersBlood();
                        this.pbBlood.value = curBlood / info.getMonstersBlood();
                        // 兼容boss被工会成员打掉
                        let guildInfo = GuildModel.getInstance().guildInfo;
                        if (guildInfo && $data.hasOwnProperty("copyId") && $data["copyId"]) {
                            guildInfo.copyId = $data["copyId"];
                        }

                        if (this._curGuanqia && this._curGuanqia.isCurrent()) {
                            this.btnChallenge.label = LanMgr.getLan('', 10093);
                            this.btn_sweep.visible = true;
                            this.btnChallenge.x = 378;
                            this.btnChallenge.addChild(this.btn_red);
                            if (info.isKillMonsters(App.hero.playerId)) {
                                this.btn_sweep.addChild(this.ui_red_sweep);
                            } else {
                                this.btn_sweep.removeChild(this.ui_red_sweep);
                            }
                        } else {
                            this.btnChallenge.label = LanMgr.getLan('', 10094);
                            this.btn_sweep.visible = false;
                            this.btnChallenge.x = 258;
                            this.btnChallenge.removeChild(this.btn_red);
                            this.btn_sweep.removeChild(this.ui_red_sweep);
                        }
                    } else {
                        this.grayGuanqia();
                        // 数据不匹配说明被打了
                        GuildModel.getInstance().checkGuildExist(true);
                    }
                });
            } else {
                this.grayGuanqia();
            }
        }

        public updateGuanQiaInfo(guanqia: GuildGuanqiaVo): void {
            if (!guanqia || !this._curGuanqia || guanqia.tbCopy.ID != this._curGuanqia.tbCopy.ID) return;
            for (let guanqia of this._itemList) {
                guanqia.refreshData();
            }
            this.renderGuanqia(guanqia);
            this.updateCount();
        }
        /** 点击关卡 */
        private onClickGuanqia(event: Laya.Event): void {
            let itemRender = event.currentTarget as GuildGuanqiaItemRender;
            let vo = itemRender.dataSource;
            if (!vo.isPass() && !vo.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            this.renderGuanqia(vo);
        }
        /** 按钮点击 */
        private onClick(event: Laya.Event): void {
            let target = event.target;
            let modle = GuildCopyModel.getInstance();
            switch (target) {
                case this.btnNext:
                    let allList = this._model.getCopyList();
                    if (this._startIdx < allList.length - 3) {
                        this.updateChapterData(this._startIdx + 1);
                    }
                    break;
                case this.btnPrev:
                    if (this._startIdx > 0) {
                        this.updateChapterData(this._startIdx - 1);
                    }
                    break;
                case this.btnRank:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_COPY_RANK, this._curGuanqia));
                    break;
                case this.btnRule:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_COPY_RULE));
                    break;
                case this.btnReward:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_COPY_TONGGUAN_REWARD, this._curGuanqia));
                    break;
                case this.btnBuy:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_CHALLENGE_NUM_BUY));
                    break;
                case this.btnChallenge:
                    if (!this._curGuanqia) return;
                    if (this._curGuanqia.isCurrent()) {
                        let info = modle.copyChallengeVo;
                        if (info.svo) {
                            dispatchEvt(new GuildEvent(GuildEvent.GUANQIA_FIGHT, modle.copyChallengeVo));
                        }
                    } else {
                        dispatchEvt(new GuildEvent(GuildEvent.SHOW_ATKEND_RANK, this._curGuanqia));
                    }
                    break;
                case this.btn_sweep://扫荡
                    if (!this._curGuanqia) return;
                    if (this._curGuanqia.isCurrent()) {
                        let info = modle.copyChallengeVo;
                        if (info.svo) {
                            dispatchEvt(new GuildEvent(GuildEvent.GUILD_COPY_SWEEP, info));
                        }
                    }
                    break;
            }
        }

        public updateCount(): void {
            this.lbNum.text = LanMgr.getLan('', 10081, " " + App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum));
        }

        public grayGuanqia(): void {
            this.lbBlood.text = 0 + "/" + (this._curGuanqia ? this._curGuanqia.monster.getPropValByType(1) : 0);
            this.pbBlood.value = 0;
            this.btnChallenge.label = LanMgr.getLan('', 10094);
            this.btnChallenge.removeChild(this.btn_red);
            this.btn_sweep.removeChild(this.ui_red_sweep);
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private _modeid: number;
        private delayShow(): void {
            if (!this._curGuanqia || this._curGuanqia.tbCopy.model == this._modeid) return;
            let point = this.lab_name.localToGlobal(new Laya.Point(0, 0));
            this._modeid = this._curGuanqia.tbCopy.model;
            this.uiScene.addModelChar(this._modeid + "", point.x + this.lab_name.width / 2 - Launch.offsetX, point.y - 50 - Launch.offsetY, 180, 1.8);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        }

    }
}