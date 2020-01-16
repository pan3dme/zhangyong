
module game {

    export class ChatNoticeMgr {
        private static _instance: ChatNoticeMgr;
        public static getInstance(): ChatNoticeMgr {
            if (!ChatNoticeMgr._instance) {
                ChatNoticeMgr._instance = new ChatNoticeMgr();
            }
            return ChatNoticeMgr._instance;
        }

        /** 存要弹出提示的数组 */
        private _noticeAry: Array<NoticeVo> = new Array();

        /** 添加公告 */
        public addNoticeToPush(noticeVo: NoticeVo): void {
            let bool: boolean = this._noticeAry.length == 0;
            this._noticeAry.push(noticeVo);
            if (bool) this.showNotice();
        }
        /** 添加自定义公告,仅自己可见 */
        addCustomNotice(content: string): void {
            let vo = new NoticeVo([-1, content]);
            this.addNoticeToPush(vo);
        }

        /** 删除数组最后一个并且开始下一个 */
        public startNext(): void {
            this._noticeAry.shift();
            this.showNotice();
        }

        /** 播放公告 */
        private showNotice(): void {
            if (this._noticeAry.length == 0) {
                let uiPanel: ChatNoticeEffect = UIMgr.getUIByName(UIConst.ChatNoticeEffect);
                uiPanel.removeSelf();
                return;
            }
            let noticeText = this._noticeAry[0].getText();
            if (noticeText) {
                if (UIMgr.hasStage(UIConst.ChatNoticeEffect)) {
                    let uiPanel: ChatNoticeEffect = UIMgr.getUIByName(UIConst.ChatNoticeEffect);
                    uiPanel.startAction(noticeText);
                } else {
                    UIMgr.showUI(UIConst.ChatNoticeEffect, noticeText);
                }
            }
        }

        /** 获取公告内容 */
        public getNoticeText(ary: any[], formatHtml: boolean = false): string {
            let id = ary.shift();
            let data: any[] = ary;
            let tbNotice = tb.TB_notice.get_TB_notice_ById(id);
            // 有点击参数时,替换数据
            if (tbNotice && tbNotice.par_click) {
                let obj: game.IHtmlHrefVo;
                let tbGod: tb.TB_god;
                let godName, godid;
                for (let key in data) {
                    let type = tbNotice.getType(Number(key));
                    switch (type) {
                        case NoticeParamType.god:
                            godid = data[key];
                            tbGod = tb.TB_god.get_TB_godById(parseInt(godid));
                            godName = tbGod ? tbGod.name : "";
                            if (tbGod && formatHtml) {
                                let godStar = data[tbNotice.getIndex(NoticeParamType.godStar)];
                                obj = { type, id: godid, num: godStar ? godStar : 1 };
                                data[key] = `<span href='${JSON.stringify(obj)}'>${godName}</span>`;
                            } else {
                                data[key] = godName;
                            }
                            break;
                        case NoticeParamType.rarityGod:
                            godid = data[key];
                            tbGod = tb.TB_god.get_TB_godById(parseInt(godid));
                            godName = tbGod ? tbGod.name : "";
                            godName = godName;
                            if (tbGod && formatHtml) {
                                let godStar = data[tbNotice.getIndex(NoticeParamType.godStar)];
                                obj = { type, id: godid, num: godStar ? godStar : 1 };
                                data[key] = `<span href='${JSON.stringify(obj)}'>${godName}</span>`;
                            } else {
                                data[key] = godName;
                            }
                            break;
                        case NoticeParamType.item:
                            let itemid = data[key];
                            let tbItem = tb.TB_item.get_TB_itemById(parseInt(itemid));
                            let itemName = tbItem ? tbItem.name : "";
                            if (tbItem && formatHtml) {
                                let itemCnt = data[tbNotice.getIndex(NoticeParamType.itemCnt)];
                                obj = { type, id: itemid, num: itemCnt ? itemCnt : 1 };
                                data[key] = `<span href='${JSON.stringify(obj)}'>${itemName}</span>`;
                            } else {
                                data[key] = itemName;
                            }
                            break;
                        case NoticeParamType.guildHelpItem:
                            let itemAry: any[] = data[key];
                            let str = "";
                            for (let i = 0, len = itemAry.length; i < len; i++) {
                                let helpId = itemAry[i][0];
                                let tbHelp = tb.TB_guild_help.getItemnById(parseInt(helpId));
                                if (tbHelp) {
                                    str += `${tbHelp.desc}x${itemAry[i][1]}${i < len - 1 ? '，' : ''}`
                                }
                            }
                            data[key] = str;
                            break;
                        case NoticeParamType.gloryId:
                            let gloryId = data[key];
                            let tbHonour = tb.TB_honour_reward.getItemById(parseInt(gloryId));
                            data[key] = tbHonour ? tbHonour.desc : "未知";
                            break;
                        case NoticeParamType.joinGuildState:
                            let isYes = Number(data[key]) == iface.tb_prop.guildAutoJoinTypeKey.yes;
                            data[key] = isYes ? "加入" : "申请";
                            break;
                        case NoticeParamType.joinGuild:
                            let guildId = data[key];
                            obj = { type, guildId, guildName:data[1]||"" };
                            if(formatHtml){
                                data[key] = `<span style="color:#f66227;" href='${JSON.stringify(obj)}'>我要加入</span>`;
                            }else{
                                data[key] = `<span style="color:#f66227;">我要加入</span>`;
                            }
                            break;
                        case NoticeParamType.joinTeamGroup:
                            let teamGroupId = data[key];
                            obj = { type, teamGroupId };
                            if(formatHtml){
                                data[key] = `<span style="color:#f66227;" href='${JSON.stringify(obj)}'>点击加入</span>`;
                            }else{
                                data[key] = `<span style="color:#f66227;">点击加入</span>`;
                            }
                            break;
                    }
                }
            }
            return tbNotice ? FormatStr(tbNotice.content, data).replace(/[\\]/ig, "") : "";
        }
    }

    export class ChatNoticeEffect extends DialogExt {
        private _htmlText: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        private _imgBg: Laya.Image = new Laya.Image(SkinUtil.chatnotice);
        private _initPosX: number;
        private _endPosX: number;
        constructor() {
            super();

            this.close = null;
            //
            this.isIgnore = true;
            this._imgBg.width = Laya.stage.width;
            this._imgBg.height = 50;
            this._imgBg.anchorX = 0.5;
            this._imgBg.anchorY = 0.5;
            this.addChild(this._imgBg);
            this._imgBg.x = Laya.stage.width / 2;
            this._imgBg.top = 80;
            this._imgBg.alpha = 0.5;
            // 
            this._htmlText.style.fontSize = 27;
            this.addChild(this._htmlText);
            this._htmlText.style.color = '#ffffff'
            this._htmlText.style.align = 'center';
            this._htmlText.style.wordWrap = false;
            this._htmlText.style.valign = 'center';
            //
            this._initPosX = this._imgBg.x + (this._imgBg.width / 2);
            this._endPosX = this._initPosX - this._imgBg.width - (this._htmlText.width * 1.2);
            this.popupCenter = false;
            this.mouseEnabled = false;
            this._imgBg.sizeGrid = `5,5,5,5`
        }

        private isHideBg(): void {
            if (this._imgBg.skin)
                this._imgBg.skin = null;
        }

        private isShowbg(): void {
            if (!this._imgBg.skin)
                this._imgBg.skin = SkinUtil.chatnotice;
        }

        public startAction(text: string): void {
            this._htmlText.y = this._imgBg.y - 12;
            this._htmlText.innerHTML = text;
            this._htmlText.x = this._imgBg.x + this._initPosX;
            let totalwidth: number = this._htmlText.width + this._imgBg.width;//总的长度为文本长度和屏幕宽度
            this._endPosX = this._initPosX - totalwidth;
            text.length != 0 ? this.isShowbg() : this.isHideBg();
            let t: number = totalwidth / 110;
            Laya.Tween.to(this._htmlText, { x: this._endPosX }, t * 1000, null, Handler.create(this, () => { ChatNoticeMgr.getInstance().startNext(); }));
        }

        public show(): void {
            super.show(false, false);
            this.startAction(this.dataSource);
        }
    }

    export class NoticeVo {
        ID: number;
        data: Array<any>;
        constructor(data: Array<any>) {
            this.ID = data.shift();
            this.data = data;
        }
        getText(): string {
            if (this.ID == -1) {
                return this.data[0];
            } else {
                return ChatNoticeMgr.getInstance().getNoticeText([this.ID, ...this.data],false);
            }
        }
    }
}


