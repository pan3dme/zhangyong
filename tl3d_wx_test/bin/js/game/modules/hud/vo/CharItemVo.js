var game;
(function (game) {
    var CharItemVo = /** @class */ (function () {
        function CharItemVo(idx, openlev, goditem, pos) {
            this.idx = idx;
            this.openLev = openlev;
            this.godItem = goditem;
            this.pos = pos;
        }
        CharItemVo.prototype.setChar = function (char) {
            this.char = char;
            this.char.set2dPos(this.pos[0], this.pos[1]);
            this.char.y = 0.1;
        };
        CharItemVo.prototype.isOpen = function () {
            return App.hero.level >= this.openLev;
        };
        CharItemVo.prototype.hasGod = function () {
            return this.isOpen() && this.godItem != null;
        };
        CharItemVo.prototype.getStar = function () {
            return this.hasGod() ? this.godItem.getStar() : 1;
        };
        CharItemVo.prototype.getLev = function () {
            return this.hasGod() ? this.godItem.level : 1;
        };
        CharItemVo.prototype.getTempId = function () {
            // return 100005;
            return this.isOpen() ? this.hasGod() ? this.godItem.getModel() : 100004 : 100003;
        };
        CharItemVo.prototype.getName = function () {
            return this.hasGod() ? this.godItem.tab_god.name : "";
        };
        CharItemVo.prototype.getUuid = function () {
            return this.hasGod() ? this.godItem.uuid : "";
        };
        CharItemVo.prototype.getTitle = function () {
            if (this.isOpen()) {
                return this.hasGod() ? "Lv." + this.getLev() + " " + this.getName() : "";
            }
            else {
                return LanMgr.getLan("", 11002, this.openLev);
            }
        };
        CharItemVo.prototype.getPosX = function () {
            return this.char.x;
        };
        CharItemVo.prototype.getPosY = function () {
            return this.char.y;
        };
        CharItemVo.prototype.getPosZ = function () {
            return this.char.z;
        };
        CharItemVo.prototype.destory = function () {
            if (!this.char)
                return;
            this.char.destory();
            this.char = null;
        };
        return CharItemVo;
    }());
    game.CharItemVo = CharItemVo;
})(game || (game = {}));
