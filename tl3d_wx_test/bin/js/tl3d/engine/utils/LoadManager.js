var tl3d;
(function (tl3d) {
    var LoadManager = /** @class */ (function () {
        function LoadManager() {
            this._loadThreadList = new Array;
            this._waitLoadList = new Array;
            for (var i = 0; i < 10; i++) {
                this._loadThreadList.push(new LoaderThread());
            }
        }
        LoadManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new LoadManager();
            }
            return this._instance;
        };
        LoadManager.prototype.getVersion = function (vkey) {
            if (this._versions) {
                return this._versions[vkey] || vkey;
            }
            return vkey;
        };
        LoadManager.prototype.load = function ($url, $type, $fun, $info, $progressFun) {
            if ($info === void 0) { $info = null; }
            if ($progressFun === void 0) { $progressFun = null; }
            if (tl3d.Scene_data.fileRoot != "") { //原生版本优化
                $url = $url.replace(tl3d.Scene_data.fileRoot, "");
                $url = tl3d.Scene_data.fileRoot + this.getVersion($url);
            }
            var loadInfo = new LoadInfo($url, $type, $fun, $info, $progressFun);
            for (var i = 0; i < this._loadThreadList.length; i++) {
                if (this._loadThreadList[i].idle) {
                    this._loadThreadList[i].load(loadInfo);
                    return;
                }
            }
            this._waitLoadList.push(loadInfo);
        };
        LoadManager.prototype.loadWaitList = function () {
            if (this._waitLoadList.length <= 0) {
                return;
            }
            for (var i = 0; i < this._loadThreadList.length; i++) {
                if (this._loadThreadList[i].idle) {
                    this._loadThreadList[i].load(this._waitLoadList.shift());
                    return;
                }
            }
        };
        LoadManager.BYTE_TYPE = "BYTE_TYPE";
        LoadManager.IMG_TYPE = "IMG_TYPE";
        LoadManager.XML_TYPE = "XML_TYPE";
        return LoadManager;
    }());
    tl3d.LoadManager = LoadManager;
    var LoaderThread = /** @class */ (function () {
        function LoaderThread() {
            var _this = this;
            this._xhr = new XMLHttpRequest();
            this._xhr.onreadystatechange = function () {
                if (!_this._xhr || _this._xhr.readyState !== 4) {
                    return;
                }
                if (_this._xhr.status !== 0 && _this._xhr.status !== 200) {
                    _this.loadError();
                    return;
                }
                _this.loadByteXML();
            };
            this._xhr.onprogress = function (e) {
                if (_this._loadInfo.progressFun) {
                    _this._loadInfo.progressFun(e.loaded / e.total);
                }
            };
            this._xhr.onerror = function () {
                _this.loadError();
            };
            this._img = new Image();
            this._img.onload = function () {
                _this.loadImg();
            };
            this._img.onerror = function () {
                _this.loadError();
            };
            this.idle = true;
        }
        LoaderThread.prototype.load = function (loadInfo) {
            this._loadInfo = loadInfo;
            this.idle = false;
            this._url = loadInfo.url;
            if (this._loadInfo.type == LoadManager.BYTE_TYPE) {
                this._xhr.open("GET", loadInfo.vurl, true);
                this._xhr.responseType = "arraybuffer";
                this._xhr.send();
            }
            else if (this._loadInfo.type == LoadManager.XML_TYPE) {
                this._xhr.open("GET", loadInfo.vurl, true);
                this._xhr.responseType = "text";
                this._xhr.send();
            }
            else if (this._loadInfo.type == LoadManager.IMG_TYPE) {
                if (this._img.url == loadInfo.vurl) { //路径相同
                    this.loadImg();
                }
                else { //执行加载
                    this._img.url = loadInfo.vurl;
                    this._img.src = loadInfo.vurl;
                }
            }
        };
        LoaderThread.prototype.loadError = function () {
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();
        };
        LoaderThread.prototype.loadByteXML = function () {
            // if(this.idle){
            //     //console.log("加载完成*****************************"+this._url );
            // }
            if (this._loadInfo.info) {
                this._loadInfo.fun(this._xhr.response, this._loadInfo.info);
            }
            else {
                this._loadInfo.fun(this._xhr.response);
            }
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();
        };
        LoaderThread.prototype.loadByteImg = function () {
            this._img.src = 'data:image/png;base64,' + tl3d.Base64.encode(this._xhr.response);
        };
        LoaderThread.prototype.loadImg = function () {
            if (this._loadInfo.info) {
                this._loadInfo.fun(this._img, this._loadInfo.info);
            }
            else {
                this._loadInfo.fun(this._img);
            }
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();
        };
        return LoaderThread;
    }());
    tl3d.LoaderThread = LoaderThread;
    var LoadInfo = /** @class */ (function () {
        function LoadInfo($url, $type, $fun, $info, $progressFun) {
            if ($info === void 0) { $info = null; }
            if ($progressFun === void 0) { $progressFun = null; }
            this.url = $url;
            this.type = $type;
            this.fun = $fun;
            this.info = $info;
            this.progressFun = $progressFun;
        }
        Object.defineProperty(LoadInfo.prototype, "vurl", {
            get: function () {
                return this.url;
            },
            enumerable: true,
            configurable: true
        });
        return LoadInfo;
    }());
    tl3d.LoadInfo = LoadInfo;
})(tl3d || (tl3d = {}));
