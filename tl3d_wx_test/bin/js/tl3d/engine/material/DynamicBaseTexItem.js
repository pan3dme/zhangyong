var tl3d;
(function (tl3d) {
    var DynamicBaseTexItem = /** @class */ (function () {
        function DynamicBaseTexItem() {
        }
        DynamicBaseTexItem.prototype.destory = function () {
            if (this.textureRes) {
                this.textureRes.useNum--;
            }
            this.target = null;
        };
        Object.defineProperty(DynamicBaseTexItem.prototype, "texture", {
            get: function () {
                if (this.textureRes) {
                    return this.textureRes.texture;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return DynamicBaseTexItem;
    }());
    tl3d.DynamicBaseTexItem = DynamicBaseTexItem;
})(tl3d || (tl3d = {}));
