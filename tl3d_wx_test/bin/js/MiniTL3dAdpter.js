var tl3d;
(function (tl3d) {
    /*
    * 微信小游戏适配
    */
    var MiniTL3dAdpter = /** @class */ (function () {
        function MiniTL3dAdpter() {
        }
        MiniTL3dAdpter.init = function () {
            var wx = window['wx'];
            if (wx) {
                this.adpter_Pan3d_LoadManager();
                this.adpter_Pan3d_Init();
            }
        };
        MiniTL3dAdpter.adpter_Pan3d_Init = function () {
            //直接加图片的做法
            tl3d.UIAtlas.prototype.upDataPicToTexture = function ($url, $iconName) {
                var _this_1 = this;
                var img = new Image();
                var comFun = function (evt) {
                    var rec = _this_1.getRec($iconName);
                    _this_1.ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    _this_1.ctx.drawImage(img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    tl3d.TextureManager.getInstance().updateTexture(_this_1.texture, rec.pixelX, rec.pixelY, _this_1.ctx);
                };
                img.onload = comFun;
                img.src = tl3d.Scene_data.fileRoot + $url;
            };
            tl3d.DynamicTexItem.prototype.creatTextureByCurve = function () {
                //在手机上直接使用imageData传给纹理不正确;
                var i = 0;
                var endVecIndex = this.curve.valueVec.length - 1;
                var imgNumVec = new Array;
                for (var i = 0; i < this.life; i++) {
                    if (i < this.curve.begintFrame) {
                        imgNumVec.push(this.curve.valueVec[0][0] * 0xff, this.curve.valueVec[0][1] * 0xff, this.curve.valueVec[0][2] * 0xff, this.curve.valueVec[0][3] * 0xff);
                    }
                    else if (i > this.curve.maxFrame) {
                        if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
                            imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                        }
                        else {
                            imgNumVec.push(this.curve.valueVec[endVecIndex][0] * 0xff, this.curve.valueVec[endVecIndex][1] * 0xff, this.curve.valueVec[endVecIndex][2] * 0xff, this.curve.valueVec[endVecIndex][3] * 0xff);
                        }
                    }
                    else {
                        if (this.curve.begintFrame < 0) {
                            imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                        }
                        else {
                            var index = i - this.curve.begintFrame;
                            imgNumVec.push(this.curve.valueVec[index][0] * 0xff, this.curve.valueVec[index][1] * 0xff, this.curve.valueVec[index][2] * 0xff, this.curve.valueVec[index][3] * 0xff);
                        }
                    }
                }
                var $ctx = tl3d.UIManager.getInstance().getContext2D(64, 2, false);
                var baseindex;
                for (var i = 0; i < 64; i++) {
                    baseindex = Math.floor(i / 64 * this.life) * 4;
                    $ctx.fillStyle = "rgba(" + imgNumVec[baseindex + 0] + "," + imgNumVec[baseindex + 1] + "," + imgNumVec[baseindex + 2] + "," + imgNumVec[baseindex + 3] / 0xff + ")";
                    $ctx.fillRect(i, 0, 1, 2);
                }
                this._textureDynamic = tl3d.TextureManager.getInstance().getCanvasTexture($ctx).texture;
            };
        };
        MiniTL3dAdpter.adpter_Pan3d_Accele = function () {
            var wx = window['wx'];
            if (wx) {
                wx.onCompassChange(function (res) {
                    if (MiniTL3dAdpter.compassChangeFun) {
                        MiniTL3dAdpter.compassChangeFun(res.direction);
                    }
                });
                wx.startCompass();
                wx.onAccelerometerChange(function (res) {
                    if (MiniTL3dAdpter.compassChangeFun) {
                        MiniTL3dAdpter.onAccelerometerChange(res);
                    }
                });
                wx.startAccelerometer({
                    interval: 'game'
                });
            }
        };
        MiniTL3dAdpter.adpter_Pan3d_LoadManager = function () {
            var LoaderThread_load_adpter_callBack = function (success, data) {
                if (success) {
                    if (this._loadInfo.info) {
                        if (this._loadInfo.type == tl3d.LoadManager.IMG_TYPE) {
                            var img = new Image();
                            var bbbb = this._loadInfo;
                            var comFun = function (evt) {
                                bbbb.fun(img, bbbb.info);
                            };
                            img.onload = comFun;
                            img.src = 'data:image/png;base64,' + tl3d.Base64.encode(data);
                        }
                        else {
                            this._loadInfo.fun(data, this._loadInfo.info);
                        }
                    }
                    else {
                        this._loadInfo.fun(data);
                    }
                    this.idle = true;
                    this._loadInfo = null;
                    tl3d.LoadManager.getInstance().loadWaitList();
                }
                else {
                    this.loadError.call(this);
                }
            };
            var Pan3d_LoaderThread_load = tl3d.LoaderThread.prototype.load;
            tl3d.LoaderThread.prototype.load = function (loadInfo) {
                var wx = window['wx'];
                if (!wx || loadInfo.url.indexOf("http://") != -1 || loadInfo.url.indexOf("https://") != -1) {
                    Pan3d_LoaderThread_load.call(this, loadInfo);
                }
                else {
                    this._loadInfo = loadInfo;
                    this.idle = false;
                    this._url = loadInfo.url;
                    var _this_2 = this;
                    var fs = wx.getFileSystemManager();
                    wx.getFileSystemManager();
                    var encoding = 'utf8';
                    // 这里可根据类型 处理
                    if (loadInfo.type == tl3d.LoadManager.BYTE_TYPE) {
                        encoding = '';
                    }
                    else if (loadInfo.type == tl3d.LoadManager.XML_TYPE) {
                        encoding = 'utf8';
                    }
                    else if (loadInfo.type == tl3d.LoadManager.IMG_TYPE) {
                        encoding = '';
                    }
                    fs.readFile({
                        filePath: loadInfo.url,
                        encoding: encoding,
                        success: function (data) {
                            LoaderThread_load_adpter_callBack.call(_this_2, true, data.data);
                        },
                        fail: function (data) {
                            if (data)
                                LoaderThread_load_adpter_callBack.call(_this_2, false, data.data);
                        }
                    });
                }
            };
        };
        return MiniTL3dAdpter;
    }());
    tl3d.MiniTL3dAdpter = MiniTL3dAdpter;
})(tl3d || (tl3d = {}));
