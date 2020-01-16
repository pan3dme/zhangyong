module game {
    import Event = Laya.Event;
    export class MainView extends ui.hud.MainViewUI {

        //上次记录的两个触模点之间距离 用于双指缩放
        private lastDistance: number = 0;

        //初始点击位置 判断单击用
        private downX: number;
        private downY: number;
        //滑动位置记录 用于记录左右滑动的过程量
        private prevX: number;
        private prevY: number;

        private factor: number = 0.15;
        private sfactor: number = 0.005;
        //地图编号
        private mapid: string = 'scene021';

        private _camMoveFlag: boolean = false;

        public gameScene: Base3dSceneLayer;
        private _upperBtn: Object = {};
        private _charItemList: Array<CharItemVo>;
        private _hudmodel: HudModel = HudModel.getInstance();
        private camParam = [
            [-7, -19, 485, -33, 117, 5, 1.1],
            [-1, 1, 300, -12, 75, 5, 1.15],
            [4, 2, 250, -7, 75, 5, 1.15]
        ];

        private _posList = [
            [28, 43.7],//一号
            [-22, 48],//二号
            [70, 0.54],//三号
            [28, -42.4],//四号
            [-28, -45.2],//五号
            [-62, 6.16],//六号
        ];

        constructor() {
            super();
            this.group = UIConst.hud_group;
            this.gameScene = new Base3dSceneLayer();
            this.gameScene.scene.changeBloodManager(new BloodManagerExt);
            this.addChildAt(this.gameScene, 0);

            this.gameScene.camMoveFun = () => {
                this.camMove();
            };


            this.on(Event.MOUSE_UP, this, this.onMouseUp);
            this.on(Event.MOUSE_OUT, this, this.onMouseUp);

            this.btn_friend.on(Event.CLICK, this, this.onModuleEvent);
            this.btn_mail.on(Event.CLICK, this, this.onModuleEvent);
            this.btn_rank.on(Event.CLICK, this, this.onModuleEvent);
            this.btn_tujian.on(Event.CLICK, this, this.onModuleEvent);
            this.btn_shop.on(Event.CLICK, this, this.onModuleEvent);
            this.btn_shenjiezhimen.on(Event.CLICK, this, this.onModuleEvent);
            this.btnZhaohuan.on(Event.CLICK, this, this.onModuleEvent);
            this.btnGonghui.on(Event.CLICK, this, this.onModuleEvent);
            this.img_chat.on(Event.CLICK, this, this.onChat);
            this.btn_task.on(Event.CLICK, this, this.onTask);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_MAINVIEW_BUTTON, this.updateBtnTypeCache, this);
            this.chatList.renderHandler = new Handler(this, this.chatRender);
            this.gameScene.y = 0;
        }

        private _initScene: boolean;
        public onMouseWheel(e: Event): void {
            //相机距离
            this.gameScene.camDistance -= (e.delta / Math.abs(e.delta)) * this.factor * 20;

            if (this.gameScene.camDistance > 388) {
                this.gameScene.camDistance = 388;
            }
            if (this.gameScene.camDistance < 228) {
                this.gameScene.camDistance = 228;
            }
        }

        setSize(w: number, h: number): void {
            super.setSize(w, h);
        }

        private onTask(e): void {
            dispatchEvt(new TaskEvent(TaskEvent.SHOW_TASK_VIEW));
        }

        /**判断是否开启 */
        private isBtnNotOpen(fundId: number): boolean {
            let tbData = fundId ? tb.TB_sys_open.get_TB_sys_openById(fundId) : null;
            if (tbData && !App.IsSysOpen(fundId)) {
                showToast(tbData.prompt);
                return true
            }
            return false;
        }

        //点击功能按钮
        private onModuleEvent(e: Event) {
            let funId = parseInt(e.target.name);
            if (this.isBtnNotOpen(funId)) return;
            switch (funId) {
                case ModuleConst.SUMMON:
                    dispatchEvt(new SummonEvent(SummonEvent.SHOW_ZHAOHUAN_PANEL));
                    break;
                case ModuleConst.GONGHUI:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));
                    break;
                case ModuleConst.TUJIAN:
                    dispatchEvt(new TujianEvent(TujianEvent.SHOW_TUJIAN_PANEL));
                    break;
                case ModuleConst.SHENMEN:
                    dispatchEvt(new GodDoorEvent(GodDoorEvent.OPEN_SHEN_MEN_VIEW));
                    break;
                case ModuleConst.SHOP:
                    dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.jishi);
                    break;
                case ModuleConst.FRIEND:
                    dispatchEvt(new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL));
                    break;
                case ModuleConst.PAIHBAN:
                    PLC.request(Protocol.guild_guild_getRankTopList, null, (data: any) => {
                        if (!data || !data["topRankList"]) return;
                        UIMgr.showUI(UIConst.RankTabView, data["topRankList"]);
                    });
                    break;
                case ModuleConst.MAIL:
                    dispatchEvt(new MailEvent(MailEvent.SHOW_MAIL_PANEL));
                    break;
            }
        }

        private onChat(e: Event): void {
            dispatchEvt(new ChatEvent(ChatEvent.SHOW_CHAT_PANEL), [OpenType.common, iface.tb_prop.chatChannelTypeKey.all]);
        }

        // 聊天
        public updateChatList(): void {
            this.chatList.array = ChatModel.getInstance().getChatListByType(iface.tb_prop.chatChannelTypeKey.all, 2);
        }
        /** 聊天内容渲染 */
        private chatRender(box: Laya.HBox, index: number): void {
            let lbChannel = box.getChildByName("lbChannel") as Laya.Label;
            lbChannel.autoSize = true;
            let lbContent = box.getChildByName("lbContent") as Laya.HTMLDivElement;
            lbContent.style.fontSize = 22;
            lbContent.style.color = "#ffeac2";
            let chatVo = box.dataSource as ChatInfoVo;
            if (chatVo) {
                lbChannel.color = chatVo.getChannelColor();
                lbChannel.text = `【${chatVo.channel == iface.tb_prop.chatChannelTypeKey.province ? chatVo.getCity() : chatVo.channelName}】`;
                lbContent.x = lbChannel.x + lbChannel.width;
                lbContent.width = 680 - lbChannel.width - 10;
                lbContent.innerHTML = chatVo.isSystem() ? `${chatVo.getSimpleCt(22)}` : `${chatVo.getName()}:${chatVo.getSimpleCt(18)}`;
            } else {

            }
        }

        public onOpened() {
            super.onOpened();
            this.gameScene.camAotuMove = false;
            this.updateBtnType();
            if (FightView.chkCam) {
                Laya.stage.on(Event.KEY_DOWN, this, this.onkeydown);
            }
            this.initItems();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateRole, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateLev, this);
            this.updateChatList();
            ChatThread.getInstance().startAutoRequest(iface.tb_prop.chatChannelTypeKey.all);

            if (!this._initScene) {
                this._initScene = true;
                this.gameScene.scene.loadScene(this.mapid, () => { }, (num: number) => { }, this.sceneLoadComplete.bind(this));
            }
            else {
                this.sceneLoadComplete();
            }

            this.btnbox.scale(1, 1);
            this.btnbox.alpha = 1;
            this.btnbox.right = 12;
            this.showBtn = true;
            this.btn_show.on(Event.CLICK, this, this.onClickShow);
            this.btn_show.aniShou.gotoAndStop(0);
            this.timerOnce(utils.random(5000, 10000), this, this.onCharPlay);
            this.timerOnce(200, this, () => {
                //播放主城音效
                AudioMgr.playMusic("sound/bgmusic.mp3");
            });
            UIUtil.boxUpDownTween(this.boxBottom, 1009 + this.boxBottom.height, 1009, true, 310, 0.05);
            let boxY = this.height - this.boxBottom.height - 100;
            UIUtil.boxUpDownTween(this.boxBottom, boxY + this.boxBottom.height, boxY, true, 310, 0.05);


            this.gameScene.addEffect(this, 10000027, new tl3d.Vector3D(0, 0, 0), 5, 10, ($particle) => {
                // logyhj("特效加载完成");
                if (this._eff1 || !UIMgr.hasStage(UIConst.Main3DView)) {
                    this.gameScene.removeEffect($particle);
                    return;
                }
                this._eff1 = $particle;
            });
            this.gameScene.addEffect(this, 10000028, new tl3d.Vector3D(50, 0, 500), 2, 0, ($particle) => {
                // logyhj("特效加载完成");
                if (this._eff2 || !UIMgr.hasStage(UIConst.Main3DView)) {
                    this.gameScene.removeEffect($particle);
                    return;
                }
                this._eff2 = $particle;
            }, 100);
        }


        private _eff1;
        private _eff2;

        private onCharPlay() {
            if (this._charItemList) {
                let itemkeys = this.filterItems();
                if (itemkeys.length > 0) {
                    let key = random(itemkeys.length);
                    let vo = this._charItemList[itemkeys[key]];
                    if (vo && vo.char) {
                        // vo.char.randomPlayAction();
                        vo.char.play(tl3d.CharAction.ATTACK_01, 2);
                    }
                }
            }

            this.timerOnce(utils.random(5000, 10000), this, this.onCharPlay);
        }

        private filterItems() {
            let templist = [];
            for (let i = 0; i < this._charItemList.length; i++) {
                let item = this._charItemList[i];
                if (item.char && item.char.visible) {
                    templist.push(i);
                }
            }
            return templist;
        }

        private updateLev() {
            for (var k = 0; k < this._charItemList.length; k++) {
                var vo = this._charItemList[k];
                if (vo && vo.char && vo.getTitle() != vo.char.charName && vo.getTitle() == "") {
                    vo.char.setRoleUrl(getRoleUrl(String(vo.getTempId())));
                }
            }
        }

        private updateRole() {
            this.frameOnce(3, this, this.refreshRole);
        }

        private refreshRole() {
            this.clearAllRole();
            this.initItems();
            this._loadId = 0;
            this.addBaseRole();
        }

        private clearAllRole() {
            if (!this._charItemList) return;
            for (var k = 0; k < this._charItemList.length; k++) {
                let vo = this._charItemList[k];
                if (vo) {
                    vo.destory();
                }
            }
        }

        private initItems() {
            this._charItemList = [];
            let lineUplist = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack, true);
            let lineUpOpenList = tb.TB_game_set.get_TB_game_setById(1).lineup;
            // let ary = [];
            for (let i = 0; i < lineUplist.length; i++) {
                let goditem = lineUplist[i];
                let openLev = lineUpOpenList[i];
                let vo = new CharItemVo(i, openLev, goditem, this._posList[i]);
                // ary.push(vo.getTempId());
                this._charItemList.push(vo);
            }
            // return ary;
        }


        private _loadId: number;


        private sceneLoadComplete() {
            // this.initCam(this.camParam[2]);
            this.initCam(this._camMoveFlag ? this.camParam[1] : this.camParam[0]);
            this._loadId = 0;
            // this.sceneComplete();
            if (!this._camMoveFlag) {
                this.timerOnce(600, this, this.moveCam);
                this._camMoveFlag = true;
            } else {
                this.sceneComplete();
            }
        }

        private moveCam() {
            let camParm = this.camParam[1];
            Laya.Tween.to(this.gameScene, { camRotationX: Number(camParm[0]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camRotationY: Number(camParm[1]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camDistance: Number(camParm[2]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camPositionX: Number(camParm[3]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camPositionY: Number(camParm[4]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camPositionZ: Number(camParm[5]) }, 1000, Laya.Ease.sineIn, Handler.create(this, () => {
                this.sceneComplete();
            }));
        }

        private sceneComplete() {
            this.addBaseRole();
            this.gameScene.camAotuMove = false;
            this.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            this.on(Event.MOUSE_WHEEL, this, this.onMouseWheel);
            this.timerOnce(1000, this, this.moveCamIng);
        }

        private moveCamIng() {
            this.gameScene.camAotuMove = true;
        }

        private toflag: boolean = false;
        private camMove() {
            if (this.gameScene.camRotationY <= -10 || this.gameScene.camRotationY >= 10) {
                this.toflag = !this.toflag;
            }
            this.gameScene.camRotationY = this.toflag ? (this.gameScene.camRotationY + 0.025) : (this.gameScene.camRotationY - 0.025);
        }

        public onClosed() {
            this.clearTimer(this, this.moveCam);
            Laya.Tween.clearAll(this.gameScene);
            super.onClosed();
            this.clearTimer(this, this.onCharPlay);
            this.clearAllRole();
            tl3d.ModuleEventManager.removeEvent(GodEvent.BUZHEN_COMPLETE, this.updateRole, this);
            tl3d.ModuleEventManager.removeEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateLev, this);
            this._charItemList = null;
            // this._roleAry = null;
            ChatThread.getInstance().stopRequest();
            this.btn_show.off(Event.CLICK, this, this.onClickShow);
            Laya.Tween.clearAll(this.btnbox);
            if (this._eff1) {
                this.gameScene.removeEffect(this._eff1);
                this._eff1 = null;
            }
            if (this._eff2) {
                this.gameScene.removeEffect(this._eff2);
                this._eff2 = null;
            }

            Laya.stage.off(Event.KEY_DOWN, this, this.onkeydown);
            this.off(Event.MOUSE_DOWN, this, this.onMouseDown);
            this.off(Event.MOUSE_WHEEL, this, this.onMouseWheel);
        }

        private onkeydown(e: Event) {
            if (FightView.chkCam && this.char) {
                this.setPos(e.keyCode);
            }
        }

        private onMouseMove(e: Event): void {
            var touches: Array<any> = e.touches;
            if (touches && touches.length == 2) {
                //双指
                var distance: number = this.getDistance(e.touches);

                //判断当前距离与上次距离变化，确定是放大还是缩小
                let scale = (distance - this.lastDistance) * this.factor;
                this.lastDistance = distance;

                //相机距离
                this.gameScene.camDistance -= scale;

                if (this.gameScene.camDistance > 388) {
                    this.gameScene.camDistance = 388;
                }
                if (this.gameScene.camDistance < 228) {
                    this.gameScene.camDistance = 228;
                }
            } else {
                //单指
                var posX: number = (this.prevX - this.stage.mouseX) * this.factor;
                var posY: number = (this.prevY - this.stage.mouseY) * this.factor;
                this.prevX = this.stage.mouseX;
                this.prevY = this.stage.mouseY;

                this.gameScene.camRotationY += posX;
                if (this.gameScene.camRotationY > 33) {
                    this.gameScene.camRotationY = 33;
                }
                if (this.gameScene.camRotationY < -20) {
                    this.gameScene.camRotationY = -20;
                }

                this.gameScene.camRotationX += posY;
                if (this.gameScene.camRotationX > 10) {
                    this.gameScene.camRotationX = 10;
                }
                if (this.gameScene.camRotationX < -10) {
                    this.gameScene.camRotationX = -10;
                }
            }
        }

        private onMouseUp(e: Event): void {
            this.gameScene.camAotuMove = true;
            this.off(Event.MOUSE_MOVE, this, this.onMouseMove);
            if (this.downX == this.stage.mouseX && this.downY == this.stage.mouseY) {
                this.onClick();
            }
        }

        /**计算两个触摸点之间的距离*/
        private getDistance(points: Array<any>): number {
            var distance: number = 0;
            if (points && points.length == 2) {
                var dx: number = points[0].stageX - points[1].stageX;
                var dy: number = points[0].stageY - points[1].stageY;

                distance = Math.sqrt(dx * dx + dy * dy);
            }
            return distance;
        }

        private onMouseDown(e: Event): void {
            this.gameScene.camAotuMove = false;
            this.downX = this.prevX = this.stage.mouseX;
            this.downY = this.prevY = this.stage.mouseY;
            this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            var touches: Array<any> = e.touches;
            if (touches && touches.length == 2) {
                this.lastDistance = this.getDistance(touches);
            }
        }

        

        private char;
        public setPos(pos: any) {
            if (pos == Laya.Keyboard.UP) {
                this.char.pz += 1
            } else if (pos == Laya.Keyboard.DOWN) {
                this.char.pz -= 1
            } else if (pos == Laya.Keyboard.LEFT) {
                this.char.px -= 1
            } else if (pos == Laya.Keyboard.RIGHT) {
                this.char.px += 1
            } else if (pos == Laya.Keyboard.X) {
                for (var o = 0; o < this._charItemList.length; o++) {
                    var element = this._charItemList[o];
                    logyhj("角色: %d  2d坐标： %o", element.idx, element.char.get2dPos());
                }
            }
        }

        private initCam(camP: Array<number>): void {
            //相机角度
            this.gameScene.camRotationX = camP[0]; //垂直角度
            this.gameScene.camRotationY = camP[1]; //水平角度 -31 - 35
            //相机距离
            this.gameScene.camDistance = camP[2];//167 - 293
            //相机位置
            this.gameScene.camPositionX = camP[3]; //左右
            this.gameScene.camPositionY = camP[4]; //上下
            this.gameScene.camPositionZ = camP[5]; //前后-3 45
            this.gameScene.camViewLH = camP[6]; //透视
            // this.gameScene.camFar = value;//镜头距离
        }

        //添加角色
        private addBaseRole(): void {
            if (!this._charItemList) {
                return;
            }
            let itemvo = this._charItemList[this._loadId];
            if (!itemvo) {
                return;
            }
            let roleID = itemvo.getTempId();
            //添加队列标记
            let roleurl = getRoleUrl(String(roleID));
            // this._loadList.push({ url: roleurl, state: true });
            var $baseChar: MainChar = new MainChar();
            this.gameScene.scene.addMovieDisplay($baseChar);
            $baseChar.forceRotationY = 170;
            $baseChar.scale = 0.32;

            if (!itemvo.isOpen() || !itemvo.hasGod()) {
                $baseChar.alpha = 0;
            }

            // $baseChar.px = itemvo.getPosX();
            // $baseChar.py = itemvo.getPosY() + 0.5;
            // $baseChar.pz = itemvo.getPosZ();
            itemvo.setChar($baseChar);
            //加载mesh
            $baseChar.setRoleUrl(roleurl, () => {
                if (!itemvo.isOpen() || !itemvo.hasGod()) {
                    // $baseChar.visible = false;
                    if (!itemvo.isOpen()) {
                        $baseChar.nameEnable = true;
                        $baseChar.setcharNameColor('#e41e1e');
                        $baseChar.charName = itemvo.getTitle();
                        $baseChar.setNamePos(itemvo.getPosX(), 15, itemvo.getPosZ());
                    }
                } else {
                    // $baseChar.visible = true;
                    $baseChar.shadow = true;
                    $baseChar.setShadowSize(2);
                    $baseChar.nameEnable = true;
                    $baseChar.setcharNameColor('#ffffff', '#9b2e3c');
                    $baseChar.charName = itemvo.getTitle();
                    $baseChar.roleStartEnable = true;
                    let num = itemvo.getStar();
                    // $baseChar.
                    $baseChar.setroleStart(num > 5 ? (num - 5) : num, num > 5 ? 1 : 0);
                }
                this._loadId++;
                Laya.timer.frameOnce(10, this, this.addBaseRole.bind(this));
            });
        }

        private onClick() {
            let itemvo: CharItemVo;
            for (var i = 0; this._charItemList && i < this._charItemList.length; i++) {
                itemvo = this._charItemList[i];
                let role: MainChar = itemvo.char;
                if (!role) continue;
                let $hit: boolean = role.mouseClik(this.getCam3d(), this.downPointTo3d(Laya.stage.mouseX, Laya.stage.mouseY));
                if ($hit) {
                    logfight("选中目标：", itemvo);
                    if (FightView.chkCam) {
                        this.char = role;
                    } else {
                        if (!itemvo.isOpen()) {
                            showToast(itemvo.getTitle());
                            return;
                        }
                        if (itemvo.hasGod()) {
                            dispatchEvt(new GodEvent(GodEvent.SHOW_SHENGLING_PANEL), [itemvo.getUuid()]);
                            return;
                        } else {
                            dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
                        }
                    }
                }
            }
        }

        public getCam3d(): tl3d.Vector3D {
            return new tl3d.Vector3D(this.gameScene.copyCam3d.x, this.gameScene.copyCam3d.y, this.gameScene.copyCam3d.z);
        }

        public downPointTo3d($x: number, $y: number): tl3d.Vector3D {
            var $pos: tl3d.Vector3D = this.gameScene.getGroundPos($x, $y);
            return $pos;
        }


        private updateBtnTypeCache() {
            Laya.timer.frameOnce(5, this, this.updateBtnType);
        }

        /**更新按钮开启状态 */
        public updateBtnType(): void {
            let isChange = this._hudmodel.isActivityBtnChange();
            if (isChange) this.callLater(this.updateActivityBtns);
        }

        private onClickShow(): void {
            this.showBtn = !this._isShowBtn;
            if(this.showBtn){
                this.btn_show.aniFang.play(0,false);
            }else{
                this.btn_show.aniShou.play(0,false);
            }
        }

        private _isShowBtn: boolean = false;
        private get showBtn(): boolean {
            return this._isShowBtn;
        }

        private set showBtn(val: boolean) {
            this._isShowBtn = val;
            Laya.Tween.clearAll(this.btnbox);
            let alpha: number = val ? 1 : 0;
            // let right: number = val ? 12 : 12 - this.btnbox.width;
            let toY : number = val ? 122 : 122 - this.btnbox.height;
            this.btnbox.visible = true;
            Laya.Tween.to(this.btnbox, { alpha: alpha, y: toY }, 200, null, Handler.create(this, this.onBtnboxCOmplete));
        }

        private onBtnboxCOmplete(): void {
            if (!this._isShowBtn) {
                this.btnbox.visible = false;
            }
        }

        /**按钮位置自适应 */
        private updateActivityBtns(): void {
            let btnbox = this.btnbox;
            let spaceX = 100;//基于X轴坐标点的X轴间隔	
            let spaceY = 99;//基于Y轴坐标点的Y轴间隔	
            let repeatX = 7;//X轴数量
            let upperbtnVos = this._hudmodel.upperBtnVos;
            //在活动时间内的
            let vos = upperbtnVos.filter(vo => vo.isOnActivityTime());
            /**检测有没有需要删除的 */
            let ids = vos.map(vo => vo.sysOpenId);
            for (let key in this._upperBtn) {
                if (!ids.some(id => id == ~~key)) {
                    this._upperBtn[key].removeBtn();
                    delete this._upperBtn[key];
                }
            }
            /**从右向左遍历 */
            for (let i = 0; i < vos.length; i++) {
                let btn = this.createUpperBtnIR(vos[i]);
                let liney = Math.floor(i / repeatX);
                let linex = ((i / repeatX) == liney) ? 0 : (i % repeatX);
                btn.y = btn.height / 2 + spaceY * liney;
                btn.x = btnbox.width - spaceX * linex;
                //按钮有锚点
                btn.redPoint.x = btn.x - 40;
                btn.redPoint.y = btn.y - 40;
                // loghgy("按钮位置：",vos[i].sysOpenId,btn.y,btn.x,btn.redPoint.x,btn.redPoint.y);
            }
        }

        /** 内存里面有取内存的 */
        private createUpperBtnIR(vo: ActivityBtnVo): ActivityBtnIR {
            let sysId = vo.sysOpenId;
            let isfind = this.btnbox.getChildByName(sysId + ``);
            if (!this._upperBtn[sysId]) {
                this._upperBtn[sysId] = new ActivityBtnIR(vo);
            }
            if (!isfind) {
                var abi: ActivityBtnIR = this._upperBtn[sysId];
                abi.redPoint.removeSelf();
                this.btnbox.addChild(abi);
                this.btnbox.addChild(abi.redPoint); //把红点放到上层，减少dc
            }
            return this._upperBtn[sysId];
        }

        public getActivityBtnIR(sysId: number): ActivityBtnIR {
            return this._upperBtn[sysId] as ActivityBtnIR;
        }
    }
}