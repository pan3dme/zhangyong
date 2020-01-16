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
    var RankModuleView = /** @class */ (function (_super) {
        __extends(RankModuleView, _super);
        function RankModuleView() {
            var _this = _super.call(this) || this;
            _this._selectTabNum = 0;
            _this.isModelClose = true;
            _this._model = game.RankModel.getInstance();
            _this.uiScene = new Base2dSceneLayerExt();
            _this.boxRole.addChild(_this.uiScene);
            _this.boxFirst.on(Laya.Event.CLICK, _this, _this.onShowInfo, [0]);
            _this.boxSecond.on(Laya.Event.CLICK, _this, _this.onShowInfo, [1]);
            _this.boxThird.on(Laya.Event.CLICK, _this, _this.onShowInfo, [2]);
            return _this;
        }
        RankModuleView.prototype.close = function () {
            this._rankVoList = null;
            _super.prototype.close.call(this);
            if (this.uiScene) {
                this.uiScene.onExit();
            }
            this.list_rankList.array = null;
        };
        RankModuleView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView(this.dataSource);
        };
        RankModuleView.prototype.initView = function (data) {
            var model = this._model;
            // 是否公会排行
            var isGuild = model.curRankType == RankListType.Guild;
            var rank;
            this._rankVoList = [];
            if (isGuild) { //公会
                for (var i in data.levelRankList) {
                    var value = new game.GuildRankListVo(data.levelRankList[i]);
                    this._rankVoList.push(value);
                }
                rank = data.myRank == 0 ? LanMgr.getLan("", 12084) : data.myRank;
                this.list_rankList.y = 135;
                this.list_rankList.height = 848;
                this.boxCommonRank.visible = false;
            }
            else {
                for (var i in data.rankList) {
                    var value = new game.ServerRankListVo(data.rankList[i]);
                    this._rankVoList.push(value);
                }
                rank = data.myRank != 0 ? data.myRank : LanMgr.getLan("", 12187);
                this.list_rankList.y = 614;
                this.list_rankList.height = 369;
                this.boxCommonRank.visible = true;
            }
            for (var i in this._rankVoList) {
                this._rankVoList[i].king = Number(i);
            }
            this.lab_valueName.text = model.getValueName();
            this.setSelectTabNum(~~game.RankModel.getInstance().arrRankListName.findIndex(function (vo) { return vo[2] == model.curRankType; }));
            var selfInfo = this._rankVoList.find(function (Info) { return Info.playerId == App.hero.playerId; });
            this.lab_myValue.text = selfInfo ? selfInfo.value : model.getValue();
            this.lab_myRank.text = rank;
            var bottomList = isGuild ? this._rankVoList : this._rankVoList.slice(3);
            //
            if (isGuild) {
                if (bottomList.length < 6) {
                    for (var i = bottomList.length; i < 6; i++) {
                        bottomList.push({ king: i });
                    }
                }
            }
            else {
                if (bottomList.length < 3) {
                    for (var i = bottomList.length; i < 3; i++) {
                        bottomList.push({ king: i + 3 });
                    }
                }
            }
            this.lab_empty.visible = bottomList.length == 0;
            this.lab_empty.y = isGuild ? 589 : 889;
            this.list_rankList.array = bottomList;
            if (!isGuild) {
                this.uiScene.onShow();
                this.drawTopRank(this._rankVoList[0], this._rankVoList[1], this._rankVoList[2]);
                var godInfo = data['godInfo'] || {};
                var modelId = godInfo[1] && godInfo[1].length >= 3 ? game.GodUtils.getShowGodModel(godInfo[1][0], godInfo[1][2]) : 0;
                Laya.timer.once(400, this, this.showmodel1, [modelId]);
                modelId = godInfo[2] && godInfo[2].length >= 3 ? game.GodUtils.getShowGodModel(godInfo[2][0], godInfo[2][2]) : 0;
                Laya.timer.once(350, this, this.showmodel2, [modelId]);
                modelId = godInfo[3] && godInfo[3].length >= 3 ? game.GodUtils.getShowGodModel(godInfo[3][0], godInfo[3][2]) : 0;
                Laya.timer.once(300, this, this.showmodel3, [modelId]);
            }
            else {
                this.uiScene.onExit();
                Laya.timer.clearAll(this);
            }
        };
        /** 渲染前三名 */
        RankModuleView.prototype.drawTopRank = function (firstVo, secondVo, thirdVo) {
            var _this = this;
            var names = game.RankModel.getInstance().arrRankListName.find(function (vo) { return vo[2] == _this._model.curRankType; });
            var valueName = LanMgr.getLan(names[3], -1);
            if (firstVo) {
                this.lbFirstName.text = firstVo.name;
                this.lbFisrtDesc.text = valueName + "：" + firstVo.value;
            }
            this.lbFirstName.visible = this.lbFisrtDesc.visible = firstVo ? true : false;
            this.lbFirstEmpty.visible = this.imgFirstEmpty.visible = !firstVo;
            this.updateBtn();
            if (secondVo) {
                this.lbSecondName.text = secondVo.name;
                this.lbSecondDesc.text = valueName + "：" + secondVo.value;
            }
            this.lbSecondName.visible = this.lbSecondDesc.visible = secondVo ? true : false;
            this.lbSecondEmpty.visible = this.imgSecondEmpty.visible = !secondVo;
            if (thirdVo) {
                this.lbThirdName.text = thirdVo.name;
                this.lbThirdDesc.text = valueName + "：" + thirdVo.value;
            }
            this.lbThirdName.visible = this.lbThirdDesc.visible = thirdVo ? true : false;
            this.lbThirdEmpty.visible = this.imgThirdEmpty.visible = !thirdVo;
        };
        /** 更新按钮 */
        RankModuleView.prototype.updateBtn = function () {
            // 是否公会排行
            var isGuild = this._model.curRankType == RankListType.Guild;
            if (isGuild) {
                this.list_rankList.refresh();
            }
        };
        RankModuleView.prototype.setSelectTabNum = function (value) {
            this._selectTabNum = value;
            this.bgPanel.dataSource = { uiName: UIConst.RankView, closeOnSide: this.isModelClose, title: game.RankModel.getInstance().arrRankListName[value][3] + LanMgr.getLan("", 12186) };
        };
        RankModuleView.prototype.onTabSelect = function (index) {
            dispatchEvt(new game.RankingListEvent(game.RankingListEvent.SHOW_RANKINGLIST_PANEL), ~~game.RankModel.getInstance().arrRankListName[index][2]);
        };
        RankModuleView.prototype.onTabRender = function ($cell, $index) {
            $cell.btn_tab.selected = $index == this._selectTabNum;
        };
        RankModuleView.prototype.wordShip = function () {
            dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RANKINGLIST_IS_WORKSHIP));
        };
        RankModuleView.prototype.onShowInfo = function (index) {
            var vo = this._rankVoList ? this._rankVoList[index] : null;
            if (!vo || this._model.curRankType == RankListType.Guild)
                return;
            if (vo instanceof game.ServerRankListVo) {
                UIUtil.showPlayerLineupInfo(vo.playerId);
            }
        };
        RankModuleView.prototype.showmodel1 = function (model) {
            if (this._uiChar1) {
                this._uiChar1.removeSelf();
                this._uiChar1 = null;
            }
            if (model == 0)
                return;
            var posSprite = this.imgFirstTY;
            var point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar1 = this.uiScene.addModelChar(String(model), point.x + posSprite.width * posSprite.scaleX / 2 - Launch.offsetX, point.y + 40 - Launch.offsetY, 180, 1.8);
        };
        RankModuleView.prototype.showmodel2 = function (model) {
            if (this._uiChar2) {
                this._uiChar2.removeSelf();
                this._uiChar2 = null;
            }
            if (model == 0)
                return;
            var posSprite = this.imgSecondTY;
            var point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar2 = this.uiScene.addModelChar(String(model), point.x + posSprite.width * posSprite.scaleX / 2 - Launch.offsetX, point.y - 20 - Launch.offsetY, 180, 1.7);
            this._uiChar2.y = -40;
        };
        RankModuleView.prototype.showmodel3 = function (model) {
            if (this._uiChar3) {
                this._uiChar3.removeSelf();
                this._uiChar3 = null;
            }
            if (model == 0)
                return;
            var posSprite = this.imgThirdTY;
            var point = posSprite.localToGlobal(new Laya.Point(0, 0));
            this._uiChar3 = this.uiScene.addModelChar(String(model), point.x + posSprite.width * posSprite.scaleX / 2 - Launch.offsetX, point.y - 20 - Launch.offsetY, 180, 1.7);
            this._uiChar3.y = -40;
        };
        return RankModuleView;
    }(ui.rank.RankViewUI));
    game.RankModuleView = RankModuleView;
})(game || (game = {}));
