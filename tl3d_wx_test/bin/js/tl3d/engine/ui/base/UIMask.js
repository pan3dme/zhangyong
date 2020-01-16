var tl3d;
(function (tl3d) {
    var UIMask = /** @class */ (function () {
        function UIMask() {
            //设定相对坐标
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            //设定绝对坐标
            this.absoluteX = 0;
            this.absoluteY = 0;
            this.absoluteWidth = 0;
            this.absoluteHeight = 0;
            this.scale = 1;
            this.level = 2;
            this._hasDisposed = false;
            this.initData();
            this.renderData = [0, 0, 0, 0];
        }
        UIMask.prototype.initData = function () {
            this.objData = new tl3d.ObjData();
            this.shader = tl3d.ProgrmaManager.getInstance().getProgram(tl3d.UIMaskShader.UI_MASK_SHADER);
            this.program = this.shader.program;
            this.applyObjData();
        };
        UIMask.prototype.applyAbsolutePoint = function () {
            if (this.parent) {
                this.absoluteX = this._x * this.scale * tl3d.UIData.Scale + this.parent.x;
                this.absoluteY = this._y * this.scale * tl3d.UIData.Scale + this.parent.y;
                this.absoluteWidth = this._width * tl3d.UIData.Scale * this.scale;
                this.absoluteHeight = this._height * tl3d.UIData.Scale * this.scale;
                this.applyRenderSize();
            }
        };
        UIMask.prototype.testPoint = function ($x, $y) {
            if ($x > this.absoluteX && $x < (this.absoluteX + this.absoluteWidth) && $y > this.absoluteY && $y < (this.absoluteY + this.absoluteHeight)) {
                return true;
            }
            else {
                return false;
            }
        };
        UIMask.prototype.applyRenderSize = function () {
            if (!this.parent) {
                return;
            }
            this.renderData[0] = this.absoluteX / tl3d.Scene_data.stageWidth;
            this.renderData[1] = this.absoluteY / tl3d.Scene_data.stageHeight;
            this.renderData[2] = this.absoluteWidth / tl3d.Scene_data.stageWidth;
            this.renderData[3] = this.absoluteHeight / tl3d.Scene_data.stageHeight;
        };
        UIMask.prototype.applyObjData = function () {
            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;
            this.objData.vertices.push(0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0);
            this.objData.indexs.push(0, 1, 2, 0, 2, 3);
            this.objData.treNum = this.objData.indexs.length;
            this.objData.vertexBuffer = tl3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.indexBuffer = tl3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        };
        UIMask.prototype.update = function () {
            tl3d.Scene_data.context3D.setBlendParticleFactors(0);
            tl3d.Scene_data.context3D.setProgram(this.program);
            //for (var i: number = 0; i < this._uiList.length; i++) {
            //    this._uiList[i].update();
            //    this._uiList[i].setVc(this.program, i);
            //}
            tl3d.Scene_data.context3D.setVc4fv(this.shader, "ui", this.renderData);
            tl3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            tl3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        };
        Object.defineProperty(UIMask.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIMask.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIMask.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIMask.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.applyAbsolutePoint();
            },
            enumerable: true,
            configurable: true
        });
        UIMask.prototype.dispose = function () {
            if (this._hasDisposed) {
                return;
            }
            this.objData.destory();
            this.objData = null;
            this.program = null;
            this.shader = null;
            this.renderData = null;
            this.parent = null;
            this._hasDisposed = true;
        };
        return UIMask;
    }());
    tl3d.UIMask = UIMask;
})(tl3d || (tl3d = {}));
