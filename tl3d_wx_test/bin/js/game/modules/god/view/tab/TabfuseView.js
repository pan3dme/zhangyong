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
/**
* name
*/
var game;
(function (game) {
    var godTabfuseView = /** @class */ (function (_super) {
        __extends(godTabfuseView, _super);
        function godTabfuseView() {
            var _this = _super.call(this) || this;
            _this._typeAry = [CostTypeKey.hun_life, CostTypeKey.hun_attack, CostTypeKey.hun_defense];
            /** 旧融魂等级 */
            _this._oldFuseLv = 0;
            _this._imagePoolList = [];
            _this._curImageList = [];
            _this._lableList = [];
            _this.jindubox1.on(Laya.Event.CLICK, _this, _this.onItemClick, [1]);
            _this.jindubox2.on(Laya.Event.CLICK, _this, _this.onItemClick, [2]);
            _this.jindubox3.on(Laya.Event.CLICK, _this, _this.onItemClick, [3]);
            _this.btn_tupo.on(Laya.Event.CLICK, _this, _this.onTupo);
            _this.btn_look.on(Laya.Event.CLICK, _this, _this.onLookInfo);
            _this._needInit = true;
            _this.curBall = 1;
            return _this;
        }
        Object.defineProperty(godTabfuseView.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                var oldVo = this._dataSource;
                if (oldVo && $value && oldVo.uuid == $value.uuid) {
                    this._needInit = false;
                }
                else {
                    this._needInit = true;
                }
                this._dataSource = $value;
            },
            enumerable: true,
            configurable: true
        });
        godTabfuseView.prototype.close = function () {
            this.dataSource = null;
            this._needInit = true;
            this.jindubox1.dataSource = null;
            this.jindubox2.dataSource = null;
            this.jindubox3.dataSource = null;
            Laya.timer.clearAll(this);
            this.removeAllEffect();
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateResCount, this);
        };
        godTabfuseView.prototype.init = function () {
            var godVo = this.dataSource;
            if (!godVo || !this._needInit)
                return;
            this._needInit = false;
            this._oldFuseLv = 0;
            this.updateView();
            this.list_have.array = this._typeAry;
            this.onItemClick(this.curBall);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateResCount, this);
        };
        /** 更新按钮状态 */
        godTabfuseView.prototype.updateView = function () {
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            var nexttab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel + 1);
            var isMaxLimit = godVo.isRonghunMax();
            var isMaxLv = nexttab ? false : true;
            this.box_ronghun.visible = !isMaxLimit;
            this.box_tupo.visible = !this.box_ronghun.visible && !isMaxLv;
            this.boxMaxLv.visible = isMaxLv && isMaxLimit;
            this.lab_tiaojian.text = LanMgr.getLan("", 12359, fusiontab.break_limit);
            this.lab_level.text = godVo.fuseLevel + LanMgr.getLan("", 10031);
            if (godVo.fuseLevel > this._oldFuseLv) {
                this._oldFuseLv = godVo.fuseLevel;
                this.jindubox1.dataSource = { attrNo: 1, curVo: godVo };
                this.jindubox2.dataSource = { attrNo: 2, curVo: godVo };
                this.jindubox3.dataSource = { attrNo: 3, curVo: godVo };
                this.onItemClick(this.curBall);
                this.removeAllEffect();
            }
        };
        /** 更新资源变化 */
        godTabfuseView.prototype.updateResCount = function () {
            this.list_have.refresh();
        };
        /**
         * 选择属性球
         * @param type 序号 1生命 2攻击 3防御
         */
        godTabfuseView.prototype.onItemClick = function (type) {
            var godVo = this.dataSource;
            this.curBall = type;
            for (var i = 1; i < 4; i++) {
                var uiitem = this["jindubox" + i];
                uiitem.setSelect(type == i ? true : false);
            }
            var soulTab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            this.img_oneIcon.skin = SkinUtil.getRonghunHave(this._typeAry[type - 1]);
            var cost = soulTab.getOnceCost(type);
            this.lab_oneNeed.text = cost + "";
            this.updateCostColor(soulTab, type);
            this.ronghunRP.onDispose();
            this.ronghunRP.setRedPointName("god_ronghun_" + godVo.uuid + "_" + type);
            this.ronghunTenRP.onDispose();
            this.ronghunTenRP.setRedPointName("god_ronghunten_" + godVo.uuid + "_" + type);
            this.btn_one.on(Laya.Event.CLICK, this, this.onRonghun, [type, false]);
            this.btn_ten.on(Laya.Event.CLICK, this, this.onAuto, [type, true]);
            dispatchEvt(new game.GodEvent(game.GodEvent.SELECT_RONGHUN_ITEM));
        };
        /**
         * 点击融魂
         * @param type
         * @param isTen
         */
        godTabfuseView.prototype.onRonghun = function (type, isTen) {
            var _this = this;
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            if (godVo.fuseAttrLevels[type] >= fusiontab.attr_max[type - 1][1]) {
                showToast(LanMgr.getLan('', 10374));
                return;
            }
            var oneCost = fusiontab.getOnceCost(type);
            var cost = isTen ? (oneCost * 10) : oneCost;
            var costid = this._typeAry[type - 1];
            if (App.hero.getBagItemNum(costid) < cost) {
                showToast(LanMgr.getLan('', 10120, costid));
                return;
            }
            var args = {};
            args[Protocol.game_god_fuseSoul.args.godId] = godVo.uuid;
            args[Protocol.game_god_fuseSoul.args.attrType] = type;
            args[Protocol.game_god_fuseSoul.args.numType] = isTen ? iface.tb_prop.fuseNumTypeKey.ten : iface.tb_prop.fuseNumTypeKey.one;
            PLC.request(Protocol.game_god_fuseSoul, args, function ($data, $msg) {
                if (!$data)
                    return;
                _this.updateCostColor(fusiontab, type);
                _this.successEffect(_this.btn_one, type, fusiontab);
                dispatchEvt(new game.GodEvent(game.GodEvent.RONGHUN_SUCCESS));
            });
        };
        /** 自动融魂 */
        godTabfuseView.prototype.onAuto = function (type, isAuto) {
            this._timeout = 0;
            //设遮罩
            game.GuideMask.show(this.btn_ten, game.DirectionType.none, null, true, null, 0, false);
            //替换事件
            this.btn_ten.off(Laya.Event.CLICK, this, this.onAuto);
            this.btn_ten.label = LanMgr.getLan("停 止", -1);
            this.btn_ten.on(Laya.Event.CLICK, this, this.onStop);
            //开始自动融魂
            this._timeoutflag = false;
            this.onRonghunAuto(type, isAuto);
            Laya.timer.loop(150, this, this.onRonghunAuto, [this.curBall, true]);
        };
        /** 停下 */
        godTabfuseView.prototype.onStop = function () {
            this._timeout = 0;
            this._timeoutflag = false;
            //停止自动融魂
            Laya.timer.clear(this, this.onRonghunAuto);
            //遮罩隐藏
            game.GuideMask.hide();
            //替换事件
            this.btn_ten.off(Laya.Event.CLICK, this, this.onStop);
            this.btn_ten.label = LanMgr.getLan("", 12358);
            this.btn_ten.on(Laya.Event.CLICK, this, this.onAuto, [this.curBall, true]);
        };
        /** 自动融魂 */
        godTabfuseView.prototype.onRonghunAuto = function (type, isAuto) {
            var _this = this;
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            if (godVo.fuseAttrLevels[type] >= fusiontab.attr_max[type - 1][1]) {
                this.onStop();
                showToast(LanMgr.getLan('', 10374));
                return;
            }
            var oneCost = fusiontab.getOnceCost(type);
            var costid = this._typeAry[type - 1];
            if (App.hero.getBagItemNum(costid) < oneCost) {
                this.onStop();
                showToast(LanMgr.getLan('', 10120, costid));
                return;
            }
            if (this._timeoutflag) {
                if ((App.serverTime - this._timeout) > 5000) {
                    //5秒超时，就停止自动
                    this.onStop();
                }
                return;
            }
            this._timeoutflag = true;
            this._timeout = App.serverTime;
            var args = {};
            args[Protocol.game_god_fuseSoul.args.godId] = godVo.uuid;
            args[Protocol.game_god_fuseSoul.args.attrType] = type;
            args[Protocol.game_god_fuseSoul.args.numType] = iface.tb_prop.fuseNumTypeKey.one;
            PLC.request(Protocol.game_god_fuseSoul, args, function ($data, $msg) {
                _this._timeoutflag = false;
                if (!$data) {
                    _this.onStop();
                    return;
                }
                ;
                _this.updateCostColor(fusiontab, type);
                _this.successEffect(_this.btn_ten, type, fusiontab);
                dispatchEvt(new game.GodEvent(game.GodEvent.RONGHUN_SUCCESS));
            });
        };
        /** 更新消耗颜色 */
        godTabfuseView.prototype.updateCostColor = function (fusiontab, type) {
            var needNum = fusiontab.getOnceCost(type);
            this.lab_oneNeed.color = App.hero.getBagItemNum(this._typeAry[type - 1]) >= needNum ? ColorConst.normalFont : ColorConst.redFont;
        };
        /**
         * 点击突破
         *
         */
        godTabfuseView.prototype.onTupo = function () {
            var _this = this;
            var godVo = this.dataSource;
            if (!godVo)
                return;
            var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            var nexttab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel + 1);
            if (!nexttab) {
                showToast(LanMgr.getLan("", 10375));
                return;
            }
            if (godVo.starLevel < fusiontab.break_limit) {
                showToast(LanMgr.getLan("", 10376, fusiontab.break_limit));
                return;
            }
            var args = {};
            args[Protocol.game_god_break.args.godId] = godVo.uuid;
            PLC.request(Protocol.game_god_break, args, function ($data, $msg) {
                if (!$data)
                    return;
                UIMgr.showUI(UIConst.God_TupoView, App.hero.getGodVoById(godVo.uuid));
                _this.updateView();
            });
        };
        /** 成功特效 */
        godTabfuseView.prototype.successEffect = function (btn, type, tbFusion) {
            this.updateView();
            var skin = "";
            var num = 0;
            var text = iface.tb_prop.fuseAttrType[type] + "+" + num;
            var targetBox = this["jindubox" + type];
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                skin = SkinUtil.getRonghunHave(CostTypeKey.hun_life);
                num = tbFusion.add_hp;
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                skin = SkinUtil.getRonghunHave(CostTypeKey.hun_attack);
                num = tbFusion.add_atk;
            }
            else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                skin = SkinUtil.getRonghunHave(CostTypeKey.hun_defense);
                num = tbFusion.add_def;
            }
            if (num == 0 || !targetBox)
                return;
            text = LanMgr.attrName[type] + "+" + num;
            var targetX = targetBox.x + targetBox.width / 2;
            var targetY = targetBox.y + 120;
            var img;
            if (this._imagePoolList.length > 0) {
                img = this._imagePoolList.shift();
                img.skin = skin;
            }
            else {
                img = new Laya.Image(skin);
                img.width = img.height = 28;
                img.anchorX = img.anchorY = 0.5;
            }
            this._curImageList.push(img);
            img.x = this.box_ronghun.x + btn.x + btn.width / 2;
            img.y = this.box_ronghun.y + btn.y;
            this.addChild(img);
            // loghgy(img.x,img.y,targetX,targetY,this.dataSource.fuseAttrLevels[type]);
            Laya.Tween.to(img, { x: targetX, y: targetY }, 1000, Laya.Ease.sineOut, new Handler(this, this.popText, [img, targetBox, type, text]));
        };
        godTabfuseView.prototype.popText = function (img, box, type, text) {
            if (!this.dataSource)
                return;
            box.dataSource = { attrNo: type, curVo: this.dataSource };
            img.removeSelf();
            this._imagePoolList.push(img);
            var index = this._curImageList.indexOf(img);
            if (index != -1) {
                this._curImageList.splice(index, 1);
            }
            var label = new Laya.Label(text);
            label.fontSize = 20;
            label.x = img.x + 50;
            label.y = img.y;
            label.color = "#00ff00";
            this._lableList.push(label);
            this.addChild(label);
            Laya.Tween.to(label, { y: label.y - 50 }, 800, Laya.Ease.sineOut, new Handler(this, function () {
                label.removeSelf();
            }));
        };
        /**
         * 点击放大镜
         */
        godTabfuseView.prototype.onLookInfo = function () {
            if (!this.dataSource)
                return;
            UIMgr.showUI(UIConst.God_fuseView, this.dataSource);
        };
        /** 移除所有特效 */
        godTabfuseView.prototype.removeAllEffect = function () {
            Laya.Tween.clearTween(this);
            for (var _i = 0, _a = this._lableList; _i < _a.length; _i++) {
                var label = _a[_i];
                label.removeSelf();
            }
            for (var _b = 0, _c = this._curImageList; _b < _c.length; _b++) {
                var image = _c[_b];
                image.removeSelf();
                this._imagePoolList.push(image);
            }
        };
        return godTabfuseView;
    }(ui.god.tab.TabRonghunUI));
    game.godTabfuseView = godTabfuseView;
})(game || (game = {}));
