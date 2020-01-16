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
    var ParticleManager = /** @class */ (function (_super) {
        __extends(ParticleManager, _super);
        function ParticleManager() {
            return _super.call(this) || this;
        }
        ParticleManager.getInstance = function () {
            if (!ParticleManager._instance) {
                ParticleManager._instance = new ParticleManager();
            }
            return ParticleManager._instance;
        };
        ParticleManager.prototype.getParticleByte = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            var combineParticle;
            var url = $url;
            if (this._dic[url]) {
                var baseData = this._dic[url];
                combineParticle = baseData.getCombineParticle();
            }
            else {
                combineParticle = new tl3d.CombineParticle();
            }
            // else {
            //     LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
            //         var byte: ByteArray = new ByteArray($byte);
            //         combineParticle.setDataByte(byte)
            //     });
            // }
            combineParticle.url = url;
            return combineParticle;
        };
        ParticleManager.prototype.registerUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (this._dic[$url]) {
                var baseData = this._dic[$url];
                baseData.useNum++;
            }
        };
        ParticleManager.prototype.releaseUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (this._dic[$url]) {
                var baseData = this._dic[$url];
                baseData.clearUseNum();
            }
        };
        ParticleManager.prototype.addResByte = function ($url, $data) {
            if (!this._dic[$url]) {
                var baseData = new tl3d.CombineParticleData();
                ////console.log("load particle",$url);
                baseData.setDataByte($data);
                this._dic[$url] = baseData;
            }
        };
        return ParticleManager;
    }(tl3d.ResGC));
    tl3d.ParticleManager = ParticleManager;
})(tl3d || (tl3d = {}));
