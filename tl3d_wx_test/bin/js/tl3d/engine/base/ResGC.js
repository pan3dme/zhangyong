var tl3d;
(function (tl3d) {
    var ResGC = /** @class */ (function () {
        function ResGC() {
            var _this = this;
            this._dic = new Object();
            var randTime = getRandomNumAssgin(1, 30000, 35000)[0];
            Laya.timer.loop(randTime, this, function () { _this.gc(); });
        }
        ResGC.prototype.gc = function () {
            // console.log("gc清理");
            var keys = [];
            for (var key in this._dic) {
                keys.push(key);
                var rc = this._dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;
                    if (rc.idleTime >= tl3d.ResCount.GCTime) {
                        // console.log("清理 -" + key);
                        rc.destory();
                        delete this._dic[key];
                    }
                }
            }
            // console.log("keys:",keys);
        };
        return ResGC;
    }());
    tl3d.ResGC = ResGC;
})(tl3d || (tl3d = {}));
