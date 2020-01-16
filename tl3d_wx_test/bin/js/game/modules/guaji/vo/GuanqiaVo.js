/**
* name
*/
var game;
(function (game) {
    /**
     * 挂机关卡
     */
    var GuaJiGuanqiaVo = /** @class */ (function () {
        function GuaJiGuanqiaVo() {
            this._model = game.GuajiModel.getInstance();
        }
        /** 是否boss关卡 */
        GuaJiGuanqiaVo.prototype.isboss = function () {
            return this.tbCopyInfo && this.tbCopyInfo.boss_icon ? true : false;
        };
        /** 更新关卡通关状态 */
        GuaJiGuanqiaVo.prototype.updateState = function () {
            if (this.isPass)
                return;
            if (App.hero.runeCopyInfo.hasOwnProperty(this.chapter)) {
                var passid = Number(App.hero.runeCopyInfo[this.chapter]);
                this.isPass = passid >= this.tbCopyInfo.ID;
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.RED_CHANGE));
            }
            else {
                this.isPass = false;
            }
            // let openvo = copymodule.Util.copyOpen(this.tbCopyInfo.precondition, this._model.getMaxLev());
            // this.isopen = openvo.isopen;
            // this.openinfo = openvo.info;
        };
        /**
         * 是否为接下去的关卡
         */
        GuaJiGuanqiaVo.prototype.isNext = function () {
            var preid = this.preId();
            //第一关特殊
            if (preid == 0 && isEmptyObject(App.hero.runeCopyInfo))
                return true;
            //如果通关的最高关卡 == 前置关卡，则为下一个开放关卡。
            return this._model.getMaxLev() == preid;
        };
        GuaJiGuanqiaVo.prototype.preId = function () {
            for (var i = 0; this.tbCopyInfo.precondition && i < this.tbCopyInfo.precondition.length; i++) {
                var element = this.tbCopyInfo.precondition[i];
                if (element[0] == CopyConditionType.id) {
                    return element[1];
                }
            }
            return 0;
        };
        GuaJiGuanqiaVo.prototype.levPass = function () {
            return this.needLev() <= App.hero.level;
        };
        GuaJiGuanqiaVo.prototype.needLev = function () {
            for (var i = 0; this.tbCopyInfo.precondition && i < this.tbCopyInfo.precondition.length; i++) {
                var element = this.tbCopyInfo.precondition[i];
                if (element[0] == CopyConditionType.level) {
                    return element[1];
                }
            }
            return 0;
        };
        GuaJiGuanqiaVo.prototype.hasNotReceive = function () {
            return App.hero.mapBoxAwardIds.indexOf(this.tbCopyInfo.ID) == -1;
        };
        return GuaJiGuanqiaVo;
    }());
    game.GuaJiGuanqiaVo = GuaJiGuanqiaVo;
})(game || (game = {}));
