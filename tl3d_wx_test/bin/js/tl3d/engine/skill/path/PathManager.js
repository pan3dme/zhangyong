var tl3d;
(function (tl3d) {
    var PathManager = /** @class */ (function () {
        function PathManager() {
        }
        PathManager.reg = function (types, cls) {
            this.dic[types] = cls;
        };
        PathManager.getNewPath = function (types) {
            var cls = this.dic[types];
            return new cls();
        };
        PathManager.init = function () {
            this.dic[0] = tl3d.SkillPath;
            this.dic[1] = tl3d.SkillSinPath;
            this.dic[2] = tl3d.SkillCosPath;
        };
        PathManager.dic = new Object;
        return PathManager;
    }());
    tl3d.PathManager = PathManager;
})(tl3d || (tl3d = {}));
