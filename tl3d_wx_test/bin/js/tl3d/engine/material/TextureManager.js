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
    //贴图管理器
    var TextureManager = /** @class */ (function (_super) {
        __extends(TextureManager, _super);
        function TextureManager() {
            var _this = _super.call(this) || this;
            _this._loadDic = new Object();
            _this._resDic = new Object();
            _this.initDefaultLightMapTexture();
            return _this;
        }
        TextureManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new TextureManager();
            }
            return this._instance;
        };
        TextureManager.prototype.hasTexture = function ($url) {
            if (this._dic[$url]) {
                return true;
            }
            return false;
        };
        /**
         * 获取贴图
         * @param 地址
         * @param fun 回调
         * @param wrapType
         * @param info
         * @param filteType
         * @param mipmapType
         */
        TextureManager.prototype.getTexture = function ($url, $fun, $wrapType, $info, $filteType, $mipmapType) {
            var _this = this;
            if ($wrapType === void 0) { $wrapType = 0; }
            if ($info === void 0) { $info = null; }
            if ($filteType === void 0) { $filteType = 0; }
            if ($mipmapType === void 0) { $mipmapType = 0; }
            var textres = this._dic[$url];
            if (textres) {
                if ($info) {
                    $fun(textres, $info);
                }
                else {
                    $fun(textres);
                }
                textres.useNum++;
                return;
            }
            var textureLoad = new TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType); //加载完的回调
            var loadList = this._loadDic[$url];
            if (loadList) {
                loadList.push(textureLoad);
                return;
            }
            loadList = new Array;
            loadList.push(textureLoad);
            this._loadDic[$url] = loadList;
            if (this._resDic[$url]) { //内存存在创建显存即可
                this.loadTextureCom(this._resDic[$url], textureLoad);
                delete this._resDic[$url];
            }
            else { //没有贴图对象就加载创建
                tl3d.LoadManager.getInstance().load($url, tl3d.LoadManager.IMG_TYPE, function ($img, _info) {
                    _this.loadTextureCom($img, _info);
                }, textureLoad);
            }
        };
        //贴图加载完毕
        TextureManager.prototype.loadTextureCom = function ($img, _info) {
            var texture = tl3d.Scene_data.context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);
            var textres = new tl3d.TextureRes(_info.url);
            textres.texture = texture;
            textres.width = $img.width;
            textres.height = $img.height;
            var ary = this._loadDic[_info.url];
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(textres, ary[i].info);
                }
                else {
                    ary[i].fun(textres);
                }
                textres.useNum++;
            }
            delete this._loadDic[_info.url]; //加载队列移除
            this._dic[_info.url] = textres;
        };
        //加载好的图片内存缓存一下
        TextureManager.prototype.addRes = function ($url, $img) {
            if (!this._dic[$url] && !this._resDic[$url]) {
                this._resDic[$url] = $img;
            }
        };
        //清理缓存
        TextureManager.prototype.removeRes = function ($url) {
            var img = this._resDic[$url];
            if (img) {
                delete this._resDic[$url];
            }
        };
        TextureManager.prototype.getCanvasTexture = function (ctx) {
            var tres = new tl3d.TextureRes("");
            var texture = tl3d.Scene_data.context3D.getTexture(ctx.canvas, 0, 0);
            tres.texture = texture;
            return tres;
        };
        TextureManager.prototype.updateTexture = function ($texture, $offsetx, $offsety, ctx) {
            tl3d.Scene_data.context3D.updateTexture($texture, $offsetx, $offsety, ctx.canvas);
        };
        TextureManager.prototype.loadCubeTexture = function ($url, $fun) {
            var cubeMapLoad = new CubemapLoad();
            cubeMapLoad.loadCube($url, function ($cubeList) { $fun($cubeList); });
        };
        //初始化默认光照贴图
        TextureManager.prototype.initDefaultLightMapTexture = function () {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = 32;
            canvas.height = 32;
            ctx.fillStyle = "rgb(" + 255 / 5 + "," + 255 / 5 + "," + 255 / 5 + ")";
            ctx.fillRect(0, 0, 32, 32);
            this.defaultLightMap = tl3d.Scene_data.context3D.getTexture(canvas);
        };
        return TextureManager;
    }(tl3d.ResGC));
    tl3d.TextureManager = TextureManager;
    var TextureLoad = /** @class */ (function () {
        function TextureLoad($fun, $info, $url, $wrap, $filter, $mipmap) {
            this.fun = $fun;
            this.info = $info;
            this.url = $url;
            this.wrap = $wrap;
            this.filter = $filter;
            this.mipmap = $mipmap;
        }
        return TextureLoad;
    }());
    tl3d.TextureLoad = TextureLoad;
    var CubemapLoad = /** @class */ (function () {
        function CubemapLoad() {
            this.ary = new Array(6);
            this.flagNum = 0;
        }
        CubemapLoad.prototype.loadCube = function ($url, $fun) {
            var _this = this;
            this.fun = $fun;
            for (var i = 0; i < 6; i++) {
                var itemUrl = $url + "0" + (i + 1) + ".jpg";
                tl3d.LoadManager.getInstance().load(itemUrl, tl3d.LoadManager.IMG_TYPE, function ($img, $info) { _this.loadCom($img, $info); }, { "id": i });
            }
        };
        CubemapLoad.prototype.loadCom = function ($img, $info) {
            var wh = $img.width / 4;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = wh;
            canvas.height = wh;
            var renderContext = tl3d.Scene_data.context3D.renderContext;
            var texture = renderContext.createTexture();
            renderContext.bindTexture(renderContext.TEXTURE_CUBE_MAP, texture);
            ctx.drawImage($img, wh * 2, wh, wh, wh, 0, 0, wh, wh); //right
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, 0, wh, wh, wh, 0, 0, wh, wh); //left
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh, 0, wh, wh, 0, 0, wh, wh); //top
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh, wh * 2, wh, wh, 0, 0, wh, wh); //bottom
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh, wh, wh, wh, 0, 0, wh, wh); //front
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh * 3, wh, wh, wh, 0, 0, wh, wh); //back
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            this.ary[$info.id] = texture;
            this.flagNum++;
            if (this.flagNum == 6) {
                this.fun(this.ary);
            }
        };
        return CubemapLoad;
    }());
    tl3d.CubemapLoad = CubemapLoad;
})(tl3d || (tl3d = {}));
