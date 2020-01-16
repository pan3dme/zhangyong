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
var tl3d;
(function (tl3d) {
    var ParticleGpuData = /** @class */ (function (_super) {
        __extends(ParticleGpuData, _super);
        function ParticleGpuData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ParticleGpuData;
    }(tl3d.ObjData));
    tl3d.ParticleGpuData = ParticleGpuData;
})(tl3d || (tl3d = {}));
