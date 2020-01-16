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
    var MainTabPage = /** @class */ (function (_super) {
        __extends(MainTabPage, _super);
        function MainTabPage() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.uiScene1 = new Base2dSceneLayerExt();
            _this.boxRole.addChild(_this.uiScene1);
            _this.btnRank.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.boxFirst.on(Laya.Event.CLICK, _this, _this.onShowInfo, [0]);
            _this.boxSecond.on(Laya.Event.CLICK, _this, _this.onShowInfo, [1]);
            _this.boxThird.on(Laya.Event.CLICK, _this, _this.onShowInfo, [2]);
            return _this;
        }
        MainTabPage.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        MainTabPage.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        MainTabPage.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        MainTabPage.prototype.close = function () {
            // super.close();
            this.listRank.array = null;
            this._list = null;
            this.uiScene1.onExit();
            this.lab_time.clearTimer(this, this.onLoop);
        };
        MainTabPage.prototype.init = function () {
            this._data = this.dataSource;
            var ary = [];
            for (var i = 0; i < this._data.rewardList.length; i++) {
                ary.push(this._data.rewardList[i]);
            }
            this._list = ary;
            this.listRank.array = this._list;
            this.lab_mypower.text = this._data.getMyRankDesc();
            this.lab_myrank.text = this._data.getMyValueDesc();
            Laya.timer.clearAll(this);
            this.lab_time.timerLoop(10000, this, this.onLoop);
            this.onLoop();
            this.drawRank();
        };
        MainTabPage.prototype.onLoop = function () {
            var nTime = App.getOpenServerTime() + this._data.rankType.time[1] * TimeConst.ONE_DAY_SEC;
            var visibleTime = nTime - App.getServerTime();
            if (visibleTime > 0) {
                this.lab_time.text = LanMgr.getLan("", 12632) + activityTime(nTime, App.getServerTime());
            }
            else {
                this.lab_time.text = LanMgr.getLan("", 11010);
                this.lab_time.clearTimer(this, this.onLoop);
            }
        };
        MainTabPage.prototype.drawRank = function () {
            var firstVo = this._list[0];
            if (firstVo.hasPerson) {
                this.lbFirstName.text = firstVo.name;
                this.lbFisrtDesc.text = firstVo.getTitle() + ":" + firstVo.getValueDesc();
            }
            this.lbFirstName.visible = this.lbFisrtDesc.visible = firstVo.hasPerson;
            this.lbFirstEmpty.visible = this.imgFirstEmpty.visible = !firstVo.hasPerson;
            var secondVo = this._list[1];
            if (secondVo.hasPerson) {
                this.lbSecondName.text = secondVo.name;
                this.lbSecondDesc.text = secondVo.getTitle() + ":" + secondVo.getValueDesc();
            }
            this.lbSecondName.visible = this.lbSecondDesc.visible = secondVo.hasPerson;
            this.lbSecondEmpty.visible = this.imgSecondEmpty.visible = !secondVo.hasPerson;
            var thirdVo = this._list[2];
            if (thirdVo.hasPerson) {
                this.lbThirdName.text = thirdVo.name;
                this.lbThirdDesc.text = thirdVo.getTitle() + ":" + thirdVo.getValueDesc();
            }
            this.lbThirdName.visible = this.lbThirdDesc.visible = thirdVo.hasPerson;
            this.lbThirdEmpty.visible = this.imgThirdEmpty.visible = !thirdVo.hasPerson;
            this.uiScene1.onShow();
            var model = firstVo.hasPerson ? this._data.getModelId(1) : 0;
            Laya.timer.once(300, this, this.showmodel1, [model]);
            model = secondVo.hasPerson ? this._data.getModelId(2) : 0;
            Laya.timer.once(350, this, this.showmodel2, [model]);
            model = thirdVo.hasPerson ? this._data.getModelId(3) : 0;
            Laya.timer.once(400, this, this.showmodel3, [model]);
        };
        MainTabPage.prototype.showmodel1 = function (model) {
            this.removeUIChar(1);
            if (model == 0)
                return;
            var posSprite = this.imgFirstTY;
            var point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar1 = this.uiScene1.addModelChar(String(model), point.x + posSprite.width * posSprite.scaleX / 2 - Launch.offsetX, point.y + 40 - Launch.offsetY, 180, 1.8);
        };
        MainTabPage.prototype.showmodel2 = function (model) {
            this.removeUIChar(2);
            if (model == 0)
                return;
            var posSprite = this.imgSecondTY;
            var point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar2 = this.uiScene1.addModelChar(String(model), point.x + posSprite.width * posSprite.scaleX / 2 - Launch.offsetX, point.y + 40 - Launch.offsetY, 180, 1.8);
        };
        MainTabPage.prototype.showmodel3 = function (model) {
            this.removeUIChar(3);
            if (model == 0)
                return;
            var posSprite = this.imgThirdTY;
            var point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar3 = this.uiScene1.addModelChar(String(model), point.x + posSprite.width * posSprite.scaleX / 2 - Launch.offsetX, point.y + 40 - Launch.offsetY, 180, 1.8);
        };
        MainTabPage.prototype.removeUIChar = function (index) {
            if (index == 1 && this._uiChar1) {
                this._uiChar1.removeSelf();
                this._uiChar1 = null;
            }
            else if (index == 2 && this._uiChar2) {
                this._uiChar2.removeSelf();
                this._uiChar2 = null;
            }
            else if (index == 3 && this._uiChar3) {
                this._uiChar3.removeSelf();
                this._uiChar3 = null;
            }
        };
        MainTabPage.prototype.onClick = function () {
            dispatchEvt(new game.PowerrankEvent(game.PowerrankEvent.OPEN_DETAIL_PANEL));
        };
        MainTabPage.prototype.onShowInfo = function (index) {
            var vo = this._list ? this._list[index] : null;
            if (!vo)
                return;
            UIUtil.showPlayerLineupInfo(vo.playerID);
        };
        return MainTabPage;
    }(ui.activity.powerrank.mainTabPageUI));
    game.MainTabPage = MainTabPage;
})(game || (game = {}));
