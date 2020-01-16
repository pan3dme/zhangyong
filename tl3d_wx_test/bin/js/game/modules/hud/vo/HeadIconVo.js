var game;
(function (game) {
    var HeadIconVo = /** @class */ (function () {
        function HeadIconVo(id, godTab, isLock) {
            if (godTab === void 0) { godTab = null; }
            if (isLock === void 0) { isLock = false; }
            this.headId = 0;
            this.headIcon = "";
            this.isLock = false;
            this.name = "";
            if (!isNaN(Number(id)))
                id = Number(id);
            this.headId = id;
            this.isLock = isLock;
            this.godTab = godTab;
            this.headIcon = SkinUtil.getHeroIcon(this.headId);
            this.name = this.godTab ? this.godTab.getName() : "";
        }
        return HeadIconVo;
    }());
    game.HeadIconVo = HeadIconVo;
})(game || (game = {}));
