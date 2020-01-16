var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var Event = Laya.Event;
    var MainView = /** @class */ (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            //上次记录的两个触模点之间距离 用于双指缩放
            _this.lastDistance = 0;
            _this.factor = 0.15;
            _this.sfactor = 0.005;
            //地图编号
            _this.mapid = 'scene021';
            _this._camMoveFlag = false;
            _this._upperBtn = {};
            _this._hudmodel = game.HudModel.getInstance();
            _this.camParam = [
                [-7, -19, 485, -33, 117, 5, 1.1],
                [-1, 1, 300, -12, 75, 5, 1.15],
                [4, 2, 250, -7, 75, 5, 1.15]
            ];
            _this._posList = [
                [28, 43.7],
                [-22, 48],
                [70, 0.54],
                [28, -42.4],
                [-28, -45.2],
                [-62, 6.16],
            ];
            _this.toflag = false;
            _this._isShowBtn = false;
            _this.group = UIConst.hud_group;
            _this.gameScene = new Base3dSceneLayer();
            _this.gameScene.scene.changeBloodManager(new BloodManagerExt);
            _this.addChildAt(_this.gameScene, 0);
            _this.gameScene.camMoveFun = function () {
                _this.camMove();
            };
            _this.on(Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.on(Event.MOUSE_OUT, _this, _this.onMouseUp);
            _this.btn_friend.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btn_mail.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btn_rank.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btn_tujian.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btn_shop.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btn_shenjiezhimen.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btnZhaohuan.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.btnGonghui.on(Event.CLICK, _this, _this.onModuleEvent);
            _this.img_chat.on(Event.CLICK, _this, _this.onChat);
            _this.btn_task.on(Event.CLICK, _this, _this.onTask);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON, _this.updateBtnTypeCache, _this);
            _this.chatList.renderHandler = new Handler(_this, _this.chatRender);
            _this.gameScene.y = 0;
            return _this;
        }
        MainView.prototype.onMouseWheel = function (e) {
            //相机距离
            this.gameScene.camDistance -= (e.delta / Math.abs(e.delta)) * this.factor * 20;
            if (this.gameScene.camDistance > 388) {
                this.gameScene.camDistance = 388;
            }
            if (this.gameScene.camDistance < 228) {
                this.gameScene.camDistance = 228;
            }
        };
        MainView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
        };
        MainView.prototype.onTask = function (e) {
            dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_TASK_VIEW));
        };
        /**判断是否开启 */
        MainView.prototype.isBtnNotOpen = function (fundId) {
            var tbData = fundId ? tb.TB_sys_open.get_TB_sys_openById(fundId) : null;
            if (tbData && !App.IsSysOpen(fundId)) {
                showToast(tbData.prompt);
                return true;
            }
            return false;
        };
        //点击功能按钮
        MainView.prototype.onModuleEvent = function (e) {
            var funId = parseInt(e.target.name);
            if (this.isBtnNotOpen(funId))
                return;
            switch (funId) {
                case ModuleConst.SUMMON:
                    dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_ZHAOHUAN_PANEL));
                    break;
                case ModuleConst.GONGHUI:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
                    break;
                case ModuleConst.TUJIAN:
                    dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_TUJIAN_PANEL));
                    break;
                case ModuleConst.SHENMEN:
                    dispatchEvt(new game.GodDoorEvent(game.GodDoorEvent.OPEN_SHEN_MEN_VIEW));
                    break;
                case ModuleConst.SHOP:
                    dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.jishi);
                    break;
                case ModuleConst.FRIEND:
                    dispatchEvt(new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL));
                    break;
                case ModuleConst.PAIHBAN:
                    PLC.request(Protocol.guild_guild_getRankTopList, null, function (data) {
                        if (!data || !data["topRankList"])
                            return;
                        UIMgr.showUI(UIConst.RankTabView, data["topRankList"]);
                    });
                    break;
                case ModuleConst.MAIL:
                    dispatchEvt(new game.MailEvent(game.MailEvent.SHOW_MAIL_PANEL));
                    break;
            }
        };
        MainView.prototype.onChat = function (e) {
            dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_CHAT_PANEL), [game.OpenType.common, iface.tb_prop.chatChannelTypeKey.all]);
        };
        // 聊天
        MainView.prototype.updateChatList = function () {
            this.chatList.array = game.ChatModel.getInstance().getChatListByType(iface.tb_prop.chatChannelTypeKey.all, 2);
        };
        /** 聊天内容渲染 */
        MainView.prototype.chatRender = function (box, index) {
            var lbChannel = box.getChildByName("lbChannel");
            lbChannel.autoSize = true;
            var lbContent = box.getChildByName("lbContent");
            lbContent.style.fontSize = 22;
            lbContent.style.color = "#ffeac2";
            var chatVo = box.dataSource;
            if (chatVo) {
                lbChannel.color = chatVo.getChannelColor();
                lbChannel.text = "\u3010" + (chatVo.channel == iface.tb_prop.chatChannelTypeKey.province ? chatVo.getCity() : chatVo.channelName) + "\u3011";
                lbContent.x = lbChannel.x + lbChannel.width;
                lbContent.width = 680 - lbChannel.width - 10;
                lbContent.innerHTML = chatVo.isSystem() ? "" + chatVo.getSimpleCt(22) : chatVo.getName() + ":" + chatVo.getSimpleCt(18);
            }
            else {
            }
        };
        MainView.prototype.onOpened = function () {
            var _this = this;
            _super.prototype.onOpened.call(this);
            this.gameScene.camAotuMove = false;
            this.updateBtnType();
            if (game.FightView.chkCam) {
                Laya.stage.on(Event.KEY_DOWN, this, this.onkeydown);
            }
            this.initItems();
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateRole, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateLev, this);
            this.updateChatList();
            game.ChatThread.getInstance().startAutoRequest(iface.tb_prop.chatChannelTypeKey.all);
            if (!this._initScene) {
                this._initScene = true;
                this.gameScene.scene.loadScene(this.mapid, function () { }, function (num) { }, this.sceneLoadComplete.bind(this));
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
            this.timerOnce(200, this, function () {
                //播放主城音效
                AudioMgr.playMusic("sound/bgmusic.mp3");
            });
            UIUtil.boxUpDownTween(this.boxBottom, 1009 + this.boxBottom.height, 1009, true, 310, 0.05);
            var boxY = this.height - this.boxBottom.height - 100;
            UIUtil.boxUpDownTween(this.boxBottom, boxY + this.boxBottom.height, boxY, true, 310, 0.05);
            this.gameScene.addEffect(this, 10000027, new tl3d.Vector3D(0, 0, 0), 5, 10, function ($particle) {
                // logyhj("特效加载完成");
                if (_this._eff1 || !UIMgr.hasStage(UIConst.Main3DView)) {
                    _this.gameScene.removeEffect($particle);
                    return;
                }
                _this._eff1 = $particle;
            });
            this.gameScene.addEffect(this, 10000028, new tl3d.Vector3D(50, 0, 500), 2, 0, function ($particle) {
                // logyhj("特效加载完成");
                if (_this._eff2 || !UIMgr.hasStage(UIConst.Main3DView)) {
                    _this.gameScene.removeEffect($particle);
                    return;
                }
                _this._eff2 = $particle;
            }, 100);
        };
        MainView.prototype.onCharPlay = function () {
            if (this._charItemList) {
                var itemkeys = this.filterItems();
                if (itemkeys.length > 0) {
                    var key = random(itemkeys.length);
                    var vo = this._charItemList[itemkeys[key]];
                    if (vo && vo.char) {
                        // vo.char.randomPlayAction();
                        vo.char.play(tl3d.CharAction.ATTACK_01, 2);
                    }
                }
            }
            this.timerOnce(utils.random(5000, 10000), this, this.onCharPlay);
        };
        MainView.prototype.filterItems = function () {
            var templist = [];
            for (var i = 0; i < this._charItemList.length; i++) {
                var item = this._charItemList[i];
                if (item.char && item.char.visible) {
                    templist.push(i);
                }
            }
            return templist;
        };
        MainView.prototype.updateLev = function () {
            for (var k = 0; k < this._charItemList.length; k++) {
                var vo = this._charItemList[k];
                if (vo && vo.char && vo.getTitle() != vo.char.charName && vo.getTitle() == "") {
                    vo.char.setRoleUrl(getRoleUrl(String(vo.getTempId())));
                }
            }
        };
        MainView.prototype.updateRole = function () {
            this.frameOnce(3, this, this.refreshRole);
        };
        MainView.prototype.refreshRole = function () {
            this.clearAllRole();
            this.initItems();
            this._loadId = 0;
            this.addBaseRole();
        };
        MainView.prototype.clearAllRole = function () {
            if (!this._charItemList)
                return;
            for (var k = 0; k < this._charItemList.length; k++) {
                var vo = this._charItemList[k];
                if (vo) {
                    vo.destory();
                }
            }
        };
        MainView.prototype.initItems = function () {
            this._charItemList = [];
            var lineUplist = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack, true);
            var lineUpOpenList = tb.TB_game_set.get_TB_game_setById(1).lineup;
            // let ary = [];
            for (var i = 0; i < lineUplist.length; i++) {
                var goditem = lineUplist[i];
                var openLev = lineUpOpenList[i];
                var vo = new game.CharItemVo(i, openLev, goditem, this._posList[i]);
                // ary.push(vo.getTempId());
                this._charItemList.push(vo);
            }
            // return ary;
        };
        MainView.prototype.sceneLoadComplete = function () {
            // this.initCam(this.camParam[2]);
            this.initCam(this._camMoveFlag ? this.camParam[1] : this.camParam[0]);
            this._loadId = 0;
            // this.sceneComplete();
            if (!this._camMoveFlag) {
                this.timerOnce(600, this, this.moveCam);
                this._camMoveFlag = true;
            }
            else {
                this.sceneComplete();
            }
        };
        MainView.prototype.moveCam = function () {
            var _this = this;
            var camParm = this.camParam[1];
            Laya.Tween.to(this.gameScene, { camRotationX: Number(camParm[0]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camRotationY: Number(camParm[1]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camDistance: Number(camParm[2]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camPositionX: Number(camParm[3]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camPositionY: Number(camParm[4]) }, 1000, Laya.Ease.sineIn);
            Laya.Tween.to(this.gameScene, { camPositionZ: Number(camParm[5]) }, 1000, Laya.Ease.sineIn, Handler.create(this, function () {
                _this.sceneComplete();
            }));
        };
        MainView.prototype.sceneComplete = function () {
            this.addBaseRole();
            this.gameScene.camAotuMove = false;
            this.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            this.on(Event.MOUSE_WHEEL, this, this.onMouseWheel);
            this.timerOnce(1000, this, this.moveCamIng);
        };
        MainView.prototype.moveCamIng = function () {
            this.gameScene.camAotuMove = true;
        };
        MainView.prototype.camMove = function () {
            if (this.gameScene.camRotationY <= -10 || this.gameScene.camRotationY >= 10) {
                this.toflag = !this.toflag;
            }
            this.gameScene.camRotationY = this.toflag ? (this.gameScene.camRotationY + 0.025) : (this.gameScene.camRotationY - 0.025);
        };
        MainView.prototype.onClosed = function () {
            this.clearTimer(this, this.moveCam);
            Laya.Tween.clearAll(this.gameScene);
            _super.prototype.onClosed.call(this);
            this.clearTimer(this, this.onCharPlay);
            this.clearAllRole();
            tl3d.ModuleEventManager.removeEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateRole, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateLev, this);
            this._charItemList = null;
            // this._roleAry = null;
            game.ChatThread.getInstance().stopRequest();
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
        };
        MainView.prototype.onkeydown = function (e) {
            if (game.FightView.chkCam && this.char) {
                this.setPos(e.keyCode);
            }
        };
        MainView.prototype.onMouseMove = function (e) {
            var touches = e.touches;
            if (touches && touches.length == 2) {
                //双指
                var distance = this.getDistance(e.touches);
                //判断当前距离与上次距离变化，确定是放大还是缩小
                var scale = (distance - this.lastDistance) * this.factor;
                this.lastDistance = distance;
                //相机距离
                this.gameScene.camDistance -= scale;
                if (this.gameScene.camDistance > 388) {
                    this.gameScene.camDistance = 388;
                }
                if (this.gameScene.camDistance < 228) {
                    this.gameScene.camDistance = 228;
                }
            }
            else {
                //单指
                var posX = (this.prevX - this.stage.mouseX) * this.factor;
                var posY = (this.prevY - this.stage.mouseY) * this.factor;
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
        };
        MainView.prototype.onMouseUp = function (e) {
            this.gameScene.camAotuMove = true;
            this.off(Event.MOUSE_MOVE, this, this.onMouseMove);
            if (this.downX == this.stage.mouseX && this.downY == this.stage.mouseY) {
                this.onClick();
            }
        };
        /**计算两个触摸点之间的距离*/
        MainView.prototype.getDistance = function (points) {
            var distance = 0;
            if (points && points.length == 2) {
                var dx = points[0].stageX - points[1].stageX;
                var dy = points[0].stageY - points[1].stageY;
                distance = Math.sqrt(dx * dx + dy * dy);
            }
            return distance;
        };
        MainView.prototype.onMouseDown = function (e) {
            this.gameScene.camAotuMove = false;
            this.downX = this.prevX = this.stage.mouseX;
            this.downY = this.prevY = this.stage.mouseY;
            this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            var touches = e.touches;
            if (touches && touches.length == 2) {
                this.lastDistance = this.getDistance(touches);
            }
        };
        MainView.prototype.setPos = function (pos) {
            if (pos == Laya.Keyboard.UP) {
                this.char.pz += 1;
            }
            else if (pos == Laya.Keyboard.DOWN) {
                this.char.pz -= 1;
            }
            else if (pos == Laya.Keyboard.LEFT) {
                this.char.px -= 1;
            }
            else if (pos == Laya.Keyboard.RIGHT) {
                this.char.px += 1;
            }
            else if (pos == Laya.Keyboard.X) {
                for (var o = 0; o < this._charItemList.length; o++) {
                    var element = this._charItemList[o];
                    logyhj("角色: %d  2d坐标： %o", element.idx, element.char.get2dPos());
                }
            }
        };
        MainView.prototype.initCam = function (camP) {
            //相机角度
            this.gameScene.camRotationX = camP[0]; //垂直角度
            this.gameScene.camRotationY = camP[1]; //水平角度 -31 - 35
            //相机距离
            this.gameScene.camDistance = camP[2]; //167 - 293
            //相机位置
            this.gameScene.camPositionX = camP[3]; //左右
            this.gameScene.camPositionY = camP[4]; //上下
            this.gameScene.camPositionZ = camP[5]; //前后-3 45
            this.gameScene.camViewLH = camP[6]; //透视
            // this.gameScene.camFar = value;//镜头距离
        };
        //添加角色
        MainView.prototype.addBaseRole = function () {
            var _this = this;
            if (!this._charItemList) {
                return;
            }
            var itemvo = this._charItemList[this._loadId];
            if (!itemvo) {
                return;
            }
            var roleID = itemvo.getTempId();
            //添加队列标记
            var roleurl = getRoleUrl(String(roleID));
            // this._loadList.push({ url: roleurl, state: true });
            var $baseChar = new MainChar();
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
            $baseChar.setRoleUrl(roleurl, function () {
                if (!itemvo.isOpen() || !itemvo.hasGod()) {
                    // $baseChar.visible = false;
                    if (!itemvo.isOpen()) {
                        $baseChar.nameEnable = true;
                        $baseChar.setcharNameColor('#e41e1e');
                        $baseChar.charName = itemvo.getTitle();
                        $baseChar.setNamePos(itemvo.getPosX(), 15, itemvo.getPosZ());
                    }
                }
                else {
                    // $baseChar.visible = true;
                    $baseChar.shadow = true;
                    $baseChar.setShadowSize(2);
                    $baseChar.nameEnable = true;
                    $baseChar.setcharNameColor('#ffffff', '#9b2e3c');
                    $baseChar.charName = itemvo.getTitle();
                    $baseChar.roleStartEnable = true;
                    var num = itemvo.getStar();
                    // $baseChar.
                    $baseChar.setroleStart(num > 5 ? (num - 5) : num, num > 5 ? 1 : 0);
                }
                _this._loadId++;
                Laya.timer.frameOnce(10, _this, _this.addBaseRole.bind(_this));
            });
        };
        MainView.prototype.onClick = function () {
            var itemvo;
            for (var i = 0; this._charItemList && i < this._charItemList.length; i++) {
                itemvo = this._charItemList[i];
                var role = itemvo.char;
                if (!role)
                    continue;
                var $hit = role.mouseClik(this.getCam3d(), this.downPointTo3d(Laya.stage.mouseX, Laya.stage.mouseY));
                if ($hit) {
                    logfight("选中目标：", itemvo);
                    if (game.FightView.chkCam) {
                        this.char = role;
                    }
                    else {
                        if (!itemvo.isOpen()) {
                            showToast(itemvo.getTitle());
                            return;
                        }
                        if (itemvo.hasGod()) {
                            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_SHENGLING_PANEL), [itemvo.getUuid()]);
                            return;
                        }
                        else {
                            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
                        }
                    }
                }
            }
        };
        MainView.prototype.getCam3d = function () {
            return new tl3d.Vector3D(this.gameScene.copyCam3d.x, this.gameScene.copyCam3d.y, this.gameScene.copyCam3d.z);
        };
        MainView.prototype.downPointTo3d = function ($x, $y) {
            var $pos = this.gameScene.getGroundPos($x, $y);
            return $pos;
        };
        MainView.prototype.updateBtnTypeCache = function () {
            Laya.timer.frameOnce(5, this, this.updateBtnType);
        };
        /**更新按钮开启状态 */
        MainView.prototype.updateBtnType = function () {
            var isChange = this._hudmodel.isActivityBtnChange();
            if (isChange)
                this.callLater(this.updateActivityBtns);
        };
        MainView.prototype.onClickShow = function () {
            this.showBtn = !this._isShowBtn;
            if (this.showBtn) {
                this.btn_show.aniFang.play(0, false);
            }
            else {
                this.btn_show.aniShou.play(0, false);
            }
        };
        Object.defineProperty(MainView.prototype, "showBtn", {
            get: function () {
                return this._isShowBtn;
            },
            set: function (val) {
                this._isShowBtn = val;
                Laya.Tween.clearAll(this.btnbox);
                var alpha = val ? 1 : 0;
                // let right: number = val ? 12 : 12 - this.btnbox.width;
                var toY = val ? 122 : 122 - this.btnbox.height;
                this.btnbox.visible = true;
                Laya.Tween.to(this.btnbox, { alpha: alpha, y: toY }, 200, null, Handler.create(this, this.onBtnboxCOmplete));
            },
            enumerable: true,
            configurable: true
        });
        MainView.prototype.onBtnboxCOmplete = function () {
            if (!this._isShowBtn) {
                this.btnbox.visible = false;
            }
        };
        /**按钮位置自适应 */
        MainView.prototype.updateActivityBtns = function () {
            var btnbox = this.btnbox;
            var spaceX = 100; //基于X轴坐标点的X轴间隔	
            var spaceY = 99; //基于Y轴坐标点的Y轴间隔	
            var repeatX = 7; //X轴数量
            var upperbtnVos = this._hudmodel.upperBtnVos;
            //在活动时间内的
            var vos = upperbtnVos.filter(function (vo) { return vo.isOnActivityTime(); });
            /**检测有没有需要删除的 */
            var ids = vos.map(function (vo) { return vo.sysOpenId; });
            var _loop_1 = function (key) {
                if (!ids.some(function (id) { return id == ~~key; })) {
                    this_1._upperBtn[key].removeBtn();
                    delete this_1._upperBtn[key];
                }
            };
            var this_1 = this;
            for (var key in this._upperBtn) {
                _loop_1(key);
            }
            /**从右向左遍历 */
            for (var i = 0; i < vos.length; i++) {
                var btn = this.createUpperBtnIR(vos[i]);
                var liney = Math.floor(i / repeatX);
                var linex = ((i / repeatX) == liney) ? 0 : (i % repeatX);
                btn.y = btn.height / 2 + spaceY * liney;
                btn.x = btnbox.width - spaceX * linex;
                //按钮有锚点
                btn.redPoint.x = btn.x - 40;
                btn.redPoint.y = btn.y - 40;
                // loghgy("按钮位置：",vos[i].sysOpenId,btn.y,btn.x,btn.redPoint.x,btn.redPoint.y);
            }
        };
        /** 内存里面有取内存的 */
        MainView.prototype.createUpperBtnIR = function (vo) {
            var sysId = vo.sysOpenId;
            var isfind = this.btnbox.getChildByName(sysId + "");
            if (!this._upperBtn[sysId]) {
                this._upperBtn[sysId] = new game.ActivityBtnIR(vo);
            }
            if (!isfind) {
                var abi = this._upperBtn[sysId];
                abi.redPoint.removeSelf();
                this.btnbox.addChild(abi);
                this.btnbox.addChild(abi.redPoint); //把红点放到上层，减少dc
            }
            return this._upperBtn[sysId];
        };
        MainView.prototype.getActivityBtnIR = function (sysId) {
            return this._upperBtn[sysId];
        };
        return MainView;
    }(ui.hud.MainViewUI));
    game.MainView = MainView;
})(game || (game = {}));
