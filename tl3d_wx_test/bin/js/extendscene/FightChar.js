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
var BloodLineMeshVo = tl3d.BloodLineMeshVo;
var Scene_data = tl3d.Scene_data;
var Vector3D = tl3d.Vector3D;
var FightChar = /** @class */ (function (_super) {
    __extends(FightChar, _super);
    function FightChar() {
        var _this = _super.call(this) || this;
        _this.is2d = false;
        // 行动条
        // protected _charActionVo: BloodLineMeshVo;
        _this._actionRatio = 0;
        _this._lifenumExt = -1;
        _this._bloodNumExt = 0;
        _this._bloodMidNumExt = 0;
        // 是否显示血条
        _this._bloodEnableExt = false;
        _this._buffary = new Array;
        _this._buffEnable = false;
        // 是否显示等级
        _this._roleLevEnable = false;
        return _this;
    }
    //重写一下2d界面角度 -45+30
    FightChar.prototype.updateMatrix = function () {
        _super.prototype.updateMatrix.call(this);
        if (!this.is2d)
            return;
        this.posMatrix.identity();
        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
        this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
        this.posMatrix.appendRotation(30, Vector3D.X_AXIS);
        this.posMatrix.appendTranslation(this._x, this._y, this._z);
    };
    FightChar.prototype.getCharHeight = function () {
        return this.py + this.tittleHeight + 13;
    };
    // public setBloodOffsetY(value: number): void {
    //     this._charBloodVo && (this._charBloodVo.offsety = value);
    // }
    FightChar.prototype.setBloodExtOffsetY = function (value) {
        this._bloodExtVo && (this._bloodExtVo.offsetY = value);
    };
    FightChar.prototype.setBloodExtOffsetX = function (value) {
        this._bloodExtVo && (this._bloodExtVo.offsetX = value);
    };
    FightChar.prototype.setBuffOffsetY = function (value) {
        this._buffVo && (this._buffVo.posy = value);
    };
    FightChar.prototype.setLevOffsetY = function (value) {
        this._rolelevVo && (this._rolelevVo.offsetY = value);
    };
    Object.defineProperty(FightChar.prototype, "actionRatio", {
        get: function () {
            return this._actionRatio;
        },
        set: function (v) {
            this._actionRatio = v;
            // this._charActionVo && (this._charActionVo.num = this._actionRatio);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FightChar.prototype, "lifenumExt", {
        /** 血条缓动 */
        get: function () {
            return this._lifenumExt;
        },
        set: function (value) {
            if (!this._bloodExtVo)
                return;
            if (value == this._lifenumExt)
                return;
            var pre = Number((value / 100).toFixed(2));
            if (this._lifenumExt != -1) {
                // Laya.Tween.clearTween(this);
                // this.bloodMidNumExt = 0
                // if (this._lifenumExt > value) {
                //     this.bloodMidNumExt = (this._lifenumExt - value) / 100
                //     Laya.Tween.to(this, { bloodMidNumExt: 0 }, 500);
                //     this.bloodNum = value;
                // } else if (this._lifenum < value) {
                //     this.bloodNum = this._lifenum
                //     this.bloodMidNum = (value - this._lifenum) / 100;
                //     Laya.Tween.to(this, { bloodNum: value, bloodMidNum: 0 }, 500);
                // }
                Laya.Tween.clearTween(this);
                if (this._lifenumExt > value) {
                    //扣血
                    this.bloodNumExt = pre;
                    // logyhj("缓动开始");
                    Laya.Tween.to(this, { bloodMidNumExt: pre }, 500);
                }
                else if (this._lifenumExt < value) {
                    //加血
                    this.bloodMidNumExt = pre;
                    // logyhj("缓动开始");
                    Laya.Tween.to(this, { bloodNumExt: pre }, 500);
                }
            }
            else {
                this.bloodNumExt = pre;
                this.bloodMidNumExt = pre;
            }
            this._lifenumExt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FightChar.prototype, "bloodNumExt", {
        get: function () {
            return this._bloodNumExt;
        },
        set: function (value) {
            // logyhj("blood:",value);
            this._bloodNumExt = value == 0 ? 0.001 : value;
            if (this._bloodExtVo) {
                this._bloodExtVo.num = this._bloodNumExt;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FightChar.prototype, "bloodMidNumExt", {
        get: function () {
            return this._bloodMidNumExt;
        },
        set: function (value) {
            // logyhj("bloodmid:",value);
            this._bloodMidNumExt = value == 0 ? 0.001 : value;
            if (this._bloodExtVo) {
                this._bloodExtVo.mid = this._bloodMidNumExt;
            }
        },
        enumerable: true,
        configurable: true
    });
    // 是否显示血条
    FightChar.prototype.setbloodColor = function (isPlayer) {
        this._bloodExtVo && (this._bloodExtVo.isPlayer = isPlayer);
    };
    // 设置怒气值
    FightChar.prototype.setAnger = function (val) {
        this._bloodExtVo && (this._bloodExtVo.anger = val);
    };
    // 获得怒气值
    FightChar.prototype.getAnger = function () {
        return this._bloodExtVo && this._bloodExtVo.anger;
    };
    FightChar.prototype.setAngerPlay = function (val) {
        if (!this._angerExtVo) {
            this._angerExtVo = (this._scene).bloodMgr.getAngerExtMeshVo();
        }
        this._angerExtVo && (this._angerExtVo.play = val);
    };
    Object.defineProperty(FightChar.prototype, "bloodEnableExt", {
        get: function () {
            return this._bloodEnableExt;
        },
        set: function (v) {
            this._bloodEnableExt = v;
            if (!this._bloodExtVo) {
                this._bloodExtVo = (this._scene).bloodMgr.getBloodExtMeshVo();
            }
            this._bloodExtVo.visible = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FightChar.prototype, "buffary", {
        get: function () {
            return this._buffary;
        },
        set: function (v) {
            this._buffary = v;
            this._buffVo && (this._buffVo.buffarr = v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FightChar.prototype, "buffEnable", {
        set: function (v) {
            this._buffEnable = v;
            if (!this._buffVo) {
                this._buffVo = (this._scene).bloodMgr.getBuffMeshVo();
            }
            this._buffVo.visible = v;
        },
        enumerable: true,
        configurable: true
    });
    FightChar.prototype.setroleLev = function (v, type) {
        // logyhj("角色等级：", v);
        this._rolelevVo && (this._rolelevVo.lev = v);
        this._rolelevVo && (this._rolelevVo.type = type);
    };
    Object.defineProperty(FightChar.prototype, "roleLevEnable", {
        set: function (v) {
            this._roleLevEnable = v;
            if (!this._rolelevVo) {
                this._rolelevVo = (this._scene).bloodMgr.getLevMeshVo();
            }
            this._rolelevVo.visible = v;
        },
        enumerable: true,
        configurable: true
    });
    // set bloodPosX(v: number) {
    //     this._charBloodVo && (this._charBloodVo.posx = v);
    // }
    FightChar.prototype.refreshPos = function () {
        // super.refreshPos();
        var posY = (this.py + this.tittleHeight) * this.scale;
        posY += 12;
        // let posY: number = this.py + this.tittleHeight + 12;
        if (this.isMount) {
            posY += 20;
        }
        //处理怒气条位置
        // if (this._charActionVo) {
        //     this._charActionVo.pos.x = this.px;
        //     this._charActionVo.pos.y = posY;
        //     this._charActionVo.pos.z = this.pz;
        //     this._charActionVo.visible = this.resultVisible;
        //     // posY += 10;
        // }
        if (this._buffVo && this._buffVo.visible) {
            this._buffVo.pos.x = this.px;
            this._buffVo.pos.y = posY;
            this._buffVo.pos.z = this.pz;
            // this._buffVo.visible = this.resultVisible;
        }
        if (this._rolelevVo && this._rolelevVo.visible) {
            this._rolelevVo.pos.x = this.px + 2.8;
            this._rolelevVo.pos.y = posY;
            this._rolelevVo.pos.z = this.pz;
            // this._rolelevVo.visible = this.resultVisible;
        }
        //处理血条和名字位置 -FIXME--0
        // if (this._charBloodVo) {
        //     this._charBloodVo.pos.x = this.px + 3;
        //     this._charBloodVo.pos.y = posY;
        //     this._charBloodVo.pos.z = this.pz;
        //     // this._charBloodVo.visible = this.resultVisible;
        //     posY += 12;
        // }
        if (this._bloodExtVo && this._bloodExtVo.visible) {
            this._bloodExtVo.pos.x = this.px + 3;
            this._bloodExtVo.pos.y = posY;
            this._bloodExtVo.pos.z = this.pz;
            // this._charBloodVo.visible = this.resultVisible;
            posY += 12;
        }
        if (this._charNameVo && this._charNameVo.visible) {
            this._charNameVo.pos.x = this.px;
            this._charNameVo.pos.y = posY;
            this._charNameVo.pos.z = this.pz;
            this._charNameVo.visible = this.resultVisible;
            // posY += 6;
        }
        if (this._angerExtVo && this._angerExtVo.visible) {
            this._angerExtVo.pos.x = this.px;
            this._angerExtVo.pos.y = posY;
            this._angerExtVo.pos.z = this.pz;
            this._angerExtVo.visible = this.resultVisible;
            // posY += 6;
        }
    };
    FightChar.prototype.removeStage = function () {
        _super.prototype.removeStage.call(this);
        // if (this._charActionVo) {
        //     this._charActionVo.visible = false
        // }
        if (this._buffVo) {
            this._buffVo.visible = false;
        }
        if (this._rolelevVo) {
            this._rolelevVo.visible = false;
        }
        if (this._bloodExtVo) {
            this._bloodExtVo.visible = false;
        }
        if (this._angerExtVo) {
            this._angerExtVo.play = false;
        }
        this.delUIConatiner();
    };
    FightChar.prototype.addStage = function () {
        _super.prototype.addStage.call(this);
        // if (this._charActionVo) {
        //     this._charActionVo.visible = true;
        // }
        if (this._buffVo) {
            this._buffVo.visible = true;
        }
        if (this._rolelevVo) {
            this._rolelevVo.visible = true;
        }
        if (this._bloodExtVo) {
            this._bloodExtVo.visible = true;
        }
    };
    FightChar.prototype.delUIConatiner = function () {
        if (this._buffVo) {
            (this._scene).bloodMgr.clearBuffMeshVo(this._buffVo);
            this._buffVo.destory();
            this._buffVo = null;
        }
        if (this._rolelevVo) {
            (this._scene).bloodMgr.clearLevMeshVo(this._rolelevVo);
            this._rolelevVo.destory();
            this._rolelevVo = null;
        }
        if (this._bloodExtVo) {
            (this._scene).bloodMgr.clearBloodExtMeshVo(this._bloodExtVo);
            this._bloodExtVo.destory();
            this._bloodExtVo = null;
        }
        if (this._angerExtVo) {
            (this._scene).bloodMgr.clearAngerExtMeshVo(this._angerExtVo);
            this._angerExtVo.destory();
            this._angerExtVo = null;
        }
        // if (this._charActionVo) {
        //     (<BloodManagerExt>(this._scene).bloodManager).clearActionBarMeshVo(this._charActionVo);
        //     this._charActionVo.destory();
        //     this._charActionVo = null;
        // }
        // if (this._charBloodVo) {
        //     (<BloodManagerExt>(this._scene).bloodMgr).clearBloodLineMeshVo(this._charBloodVo);
        //     this._charBloodVo.destory();
        //     this._charBloodVo = null;
        // }
    };
    FightChar.prototype.destory = function () {
        this.removeChar();
        _super.prototype.destory.call(this);
    };
    FightChar.prototype.removeChar = function () {
        if (this.onStage && this._scene) {
            this._scene.removeMovieDisplay(this);
        }
        this.removeStage();
    };
    return FightChar;
}(Game2dChar));
