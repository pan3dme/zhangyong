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
var TimeUtil = tl3d.TimeUtil;
var Matrix3D = tl3d.Matrix3D;
var UIData = tl3d.UIData;
var CharTitleUiVo = tl3d.CharTitleUiVo;
var Disp2DBaseText = tl3d.Disp2DBaseText;
var TextureManager = tl3d.TextureManager;
var UiDraw = tl3d.UiDraw;
var UIRectangle = tl3d.UIRectangle;
var Dis2DUIContianerPanel = tl3d.Dis2DUIContianerPanel;
var Dis2DUIFram = tl3d.Dis2DUIFram;
var ArtFont = tl3d.ArtFont;
var Rectangle = tl3d.Rectangle;
var BloodManagerExt = /** @class */ (function (_super) {
    __extends(BloodManagerExt, _super);
    function BloodManagerExt() {
        var _this = _super.call(this) || this;
        // this._actionbarUIConatiner = new actionBarUIConatiner();//行动条
        // this.uiContianerItem.splice(1, 0, this._actionbarUIConatiner);
        _this._buffDis2DUI = new Dis2DUIContianerPanel(BuffTitleUiVo, new Rectangle(0, 0, 88, 66), 15); //buff
        _this.uiContianerItem.splice(_this.uiContianerItem.length - 3, 0, _this._buffDis2DUI);
        _this._levDis2DUI = new Dis2DUIContianerPanel(LevelTitleUiVo, new Rectangle(0, 0, 38, 26), 15); //等级 + 种族
        _this.uiContianerItem.splice(_this.uiContianerItem.length - 3, 0, _this._levDis2DUI);
        _this._startDis2DUI = new Dis2DUIContianerPanel(StartTitleUiVo, new Rectangle(0, 0, 107, 18), 6); //星级
        _this.uiContianerItem.splice(_this.uiContianerItem.length - 3, 0, _this._startDis2DUI);
        _this._bloodExtDis2DUI = new Dis2DUIContianerPanel(BloodExtUiVo, new Rectangle(0, 0, 64, 12), 15); //新血条
        _this.uiContianerItem.splice(_this.uiContianerItem.length - 3, 0, _this._bloodExtDis2DUI);
        _this._angerExtDis2DUI = new Dis2DUIFram(AngerExtUiVo, new Rectangle(0, 0, 330, 202), 15); //新血条
        _this.uiContianerItem.splice(_this.uiContianerItem.length - 3, 0, _this._angerExtDis2DUI);
        return _this;
    }
    // public getActionBarMeshVo(): BloodLineMeshVo {
    //     var $vo: BloodLineMeshVo = new BloodLineMeshVo;
    //     $vo.num = 100;
    //     $vo.colortype = 0
    //     $vo.pos = new tl3d.Vector3D(0, 50, 0);
    //     this._actionbarUIConatiner.showTemp($vo);
    //     return $vo;
    // }
    // public clearActionBarMeshVo($vo: BloodLineMeshVo) {
    //     this._actionbarUIConatiner.clearTemp($vo);
    // }
    BloodManagerExt.prototype.getBuffMeshVo = function () {
        var $vo = new BuffTitleMesh;
        $vo.buffarr = [];
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._buffDis2DUI.showTemp($vo);
        return $vo;
    };
    BloodManagerExt.prototype.clearBuffMeshVo = function ($vo) {
        this._buffDis2DUI.clearTemp($vo);
    };
    BloodManagerExt.prototype.getAngerExtMeshVo = function () {
        var $vo = new AngerExtMesh;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._angerExtDis2DUI.showTemp($vo);
        return $vo;
    };
    BloodManagerExt.prototype.clearAngerExtMeshVo = function ($vo) {
        this._angerExtDis2DUI.clearTemp($vo);
    };
    BloodManagerExt.prototype.getBloodExtMeshVo = function () {
        var $vo = new BloodExtMesh;
        $vo.num = 0;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._bloodExtDis2DUI.showTemp($vo);
        return $vo;
    };
    BloodManagerExt.prototype.clearBloodExtMeshVo = function ($vo) {
        this._bloodExtDis2DUI.clearTemp($vo);
    };
    BloodManagerExt.prototype.getStartMeshVo = function () {
        var $vo = new StartTitleMesh;
        $vo.num = 0;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._startDis2DUI.showTemp($vo);
        return $vo;
    };
    BloodManagerExt.prototype.clearStartMeshVo = function ($vo) {
        this._startDis2DUI.clearTemp($vo);
    };
    BloodManagerExt.prototype.getLevMeshVo = function () {
        var $vo = new LevelTitleMesh;
        $vo.lev = 0;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._levDis2DUI.showTemp($vo);
        return $vo;
    };
    BloodManagerExt.prototype.clearLevMeshVo = function ($vo) {
        this._levDis2DUI.clearTemp($vo);
    };
    return BloodManagerExt;
}(tl3d.BloodManager));
// class actionBarUIConatiner extends tl3d.UIConatiner {
//     private _baseRender: actionBarUIRenderComponent;
//     constructor() {
//         super();
//         this.width = tl3d.UIData.designWidth;
//         this.height = tl3d.UIData.designHeight;
//         this._baseRender = new actionBarUIRenderComponent();
//         this.addRender(this._baseRender);
//         this._baseRender.uiAtlas = new tl3d.UIAtlas
//         this._baseRender.uiAtlas.configData = new Array;
//         this._uiItem = new Array();
//         this.loadBloodTexture()
//     }
//     private loadBloodTexture(): void {
//         tl3d.TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/blood.png", ($textureRes: tl3d.TextureRes) => {
//             this._baseRender.uiAtlas.textureRes = $textureRes
//         });
//     }
//     protected _uiItem: Array<ActionBarDisp2DBaseText>;
//     public update(t: number): void {
//         if (this._baseRender.uiAtlas.textureRes) {
//             for (var i: number = 0; i < this._uiItem.length; i++) {
//                 if (this._uiItem[i].data) {
//                     this._uiItem[i].update();
//                 }
//             }
//         }
//     }
//     public removeChild($ui: tl3d.UICompenent): void {
//         for (var i: number = 0; i < this._uiItem.length; i++) {
//             if (this._uiItem[i].ui == $ui) {
//                 this._uiItem.splice(i, 1);
//                 break;
//             }
//         }
//         super.removeChild($ui);
//     }
//     public clearOneTemp(): void {
//         while (this._uiItem.length > 25) {
//             this.removeChild(this._uiItem[0].ui)
//         }
//     }
//     public clearTemp($data: any): void {
//         for (var i: number = 0; i < this._uiItem.length; i++) {
//             if (this._uiItem[i].data == $data) {
//                 this._uiItem[i].data = null
//                 this.removeChild(this._uiItem[i].ui);
//                 break
//             }
//         }
//     }
//     public showTemp($data: any): void {
//         // if (this._uiItem.length >= 40) {
//         //     //logdebug("超过50。暂时设置不可再添加");
//         //     return
//         // }
//         var $BloodDisp2DBaseText: ActionBarDisp2DBaseText = new ActionBarDisp2DBaseText;
//         $BloodDisp2DBaseText.parent = this._baseRender;
//         $BloodDisp2DBaseText.ui = <tl3d.UICompenent>this._baseRender.creatBaseComponent("test");
//         $BloodDisp2DBaseText.data = $data;
//         this.addChild($BloodDisp2DBaseText.ui);
//         this._uiItem.push($BloodDisp2DBaseText);
//     }
// }
// class actionBarUIRenderComponent extends tl3d.BloodUIRenderComponent {
//     constructor() {
//         super();
//     }
//     private lastTime: number = 0
//     public update(): void {
//         if (!this.visible || this._uiList.length == 0) {
//             return;
//         }
//         // //logdebug(this._uiList.length);
//         Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
//         Scene_data.context3D.setProgram(this.program);
//         if (this.lastTime < TimeUtil.getTimer() || this.renderData2.length != this._uiList.length * 4) {
//             if (this.renderData2.length != this._uiList.length * 4) {
//                 this.renderData2 = new Float32Array(this._uiList.length * 4);
//             }
//             for (var i: number = 0; i < this._uiList.length; i++) {
//                 var $bloodUICompenent: BloodUICompenent = <BloodUICompenent>this._uiList[i];
//                 var a: number = $bloodUICompenent.lifeNum / 100;
//                 var b: number = ($bloodUICompenent.colortype + 1) * 13 / 52;
//                 this.renderData2[i * 4 + 0] = a;
//                 this.renderData2[i * 4 + 1] = b;
//             }
//             this.lastTime = TimeUtil.getTimer() + 300;
//         }
//         Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
//         Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);
//         Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
//         Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
//         if (this.uiAtlas) {
//             Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
//         }
//         Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
//         if (this.modelRenderList) {
//             for (var i: number = 0; i < this.modelRenderList.length; i++) {
//                 this.modelRenderList[i].update();
//             }
//         }
//     }
//     public creatBaseComponent($skinName: string): BloodUICompenent {
//         var ui: BloodUICompenent = new BloodUICompenent();
//         ui.tr.setRec(new tl3d.UIRectangle(0, 0, 1, 1));
//         ui.width = 85;
//         ui.height = 8;
//         ui.uiRender = this;
//         ui.lifeNum = 100
//         return ui;
//     }
//     public makeRenderDataVc($vcId: number): void {
//         if (!this.renderData || (this.renderData && this.renderData.length != this._uiList.length * 4)) {
//             this.renderData = new Float32Array(this._uiList.length * 4);
//         }
//         if ($vcId == -1) {
//             for (var i: number = 0; this._uiList && i < this._uiList.length; i++) {
//                 this._uiList[i].vcId = i;
//                 this.renderData[i * 4 + 0] = this._uiList[i].renderData[0];
//                 this.renderData[i * 4 + 1] = this._uiList[i].renderData[1];
//                 this.renderData[i * 4 + 2] = this._uiList[i].renderData[2];
//                 this.renderData[i * 4 + 3] = this._uiList[i].renderData[3];
//             }
//         } else {
//             if ($vcId < this._uiList.length) {
//                 this.renderData[$vcId * 4 + 0] = this._uiList[$vcId].renderData[0];
//                 this.renderData[$vcId * 4 + 1] = this._uiList[$vcId].renderData[1];
//                 this.renderData[$vcId * 4 + 2] = this._uiList[$vcId].renderData[2];
//                 this.renderData[$vcId * 4 + 3] = this._uiList[$vcId].renderData[3];
//             }
//         }
//     }
// }
// class ActionBarDisp2DBaseText extends tl3d.Disp2DBaseText {
//     private bloodLineMeshVo: BloodLineMeshVo
//     public makeData(): void {
//         if (this._data) {
//             this.bloodLineMeshVo = <BloodLineMeshVo>this.data;
//         }
//     }
//     private tempMatrix: Matrix3D = new Matrix3D;
//     public update(): void {
//         if (this.bloodLineMeshVo) {
//             if (this.bloodLineMeshVo.pos) {
//                 if (this.bloodLineMeshVo.visible) {
//                     if (this.needUpData(this.bloodLineMeshVo.pos) || this.bloodLineMeshVo.visibleChange) {
//                         var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
//                         m.append(Scene_data.viewMatrx3D);
//                         var p: tl3d.Vector3D = m.transformVector(new tl3d.Vector3D(this.bloodLineMeshVo.pos.x, this.bloodLineMeshVo.pos.y, this.bloodLineMeshVo.pos.z))
//                         this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
//                         this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
//                         this.ui.y += 12
//                         this.bloodLineMeshVo.visibleChange = false
//                     }
//                     (<BloodUICompenent>this.ui).lifeNum = this.bloodLineMeshVo.num;
//                     (<BloodUICompenent>this.ui).colortype = this.bloodLineMeshVo.colortype;
//                 } else {
//                     this.ui.x = 10000
//                 }
//             }
//             if (this.bloodLineMeshVo.clear) {
//                 this.ui.parent.removeChild(this.ui);
//                 this._data = null;
//             }
//         }
//     }
// }
var BuffTitleUiVo = /** @class */ (function (_super) {
    __extends(BuffTitleUiVo, _super);
    function BuffTitleUiVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuffTitleUiVo.prototype.makeData = function () {
        if (this._data) {
            this._buffTitleMesh = this._data;
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var len = this._buffTitleMesh.buffarr.length;
            var row = len < 5 ? 0 : len < 9 ? 1 : 2; //最低行
            var column = 0; //列
            for (var i = 0; i < this._buffTitleMesh.buffarr.length; i++) {
                if (i < 12) {
                    var cur_row = Math.floor(i / 3);
                    var px = 22 * (i % 3) + 12;
                    var py = (22 * 3) - (cur_row + 1) * 22;
                    var vo = this._buffTitleMesh.buffarr[i];
                    UiDraw.cxtDrawImg(ctx, vo.tb_buff.icon, new Rectangle(px, py, 20, 20), UIData.publicsUi); //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
                    tl3d.LabelTextFont.writeSingleLabelToCtx(ctx, String(vo.round == 0 ? 1 : vo.round), 10, px + 20 - 8, py + 20 - 12, tl3d.TextAlign.LEFT, "#ffd800", "#000000");
                }
            }
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    };
    BuffTitleUiVo.prototype.update = function () {
        if (this._buffTitleMesh) {
            if (this._buffTitleMesh.needDraw) {
                this.makeData();
                this._buffTitleMesh.needDraw = false;
            }
            if (this._buffTitleMesh.pos) {
                if (this._buffTitleMesh.visible) {
                    if (this.needUpData(this._buffTitleMesh.pos)) {
                        var m = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p = m.transformVector(this._buffTitleMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
                        this.ui.y -= (this.ui.height / 2) + 6 + this._buffTitleMesh.posy;
                        this.oldPos.x = this._buffTitleMesh.pos.x;
                        this.oldPos.y = this._buffTitleMesh.pos.y;
                    }
                }
                else {
                    this.ui.x = 10000;
                }
            }
            if (this._buffTitleMesh.clear) {
                if (this.ui && this.ui.parent) {
                    this.ui.parent.removeChild(this.ui);
                }
                this._data = null;
            }
        }
    };
    return BuffTitleUiVo;
}(CharTitleUiVo));
var BuffTitleMesh = /** @class */ (function (_super) {
    __extends(BuffTitleMesh, _super);
    function BuffTitleMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.posy = 0;
        return _this;
    }
    BuffTitleMesh.prototype.destory = function () {
        this.pos = null;
        this._num = null;
        // this.clear = true
    };
    Object.defineProperty(BuffTitleMesh.prototype, "buffarr", {
        get: function () {
            return this._num;
        },
        set: function (value) {
            this._num = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    return BuffTitleMesh;
}(tl3d.baseMeshVo));
var AngerExtUiVo = /** @class */ (function (_super) {
    __extends(AngerExtUiVo, _super);
    function AngerExtUiVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AngerExtUiVo.prototype.makeData = function () {
        if (this._data) {
            this._angerExtMesh = this._data;
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, "angerFra", new Rectangle(0, 0, 330, 202), UIData.publicsUi);
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            var pubrec = this.getPubRec(rec);
            var ui_1 = this.ui;
            ui_1.setFrameData(pubrec);
            ui_1.tr.setRec(pubrec);
            ui_1.width = 110;
            ui_1.height = 101;
            ui_1.play();
        }
    };
    AngerExtUiVo.prototype.getPubRec = function (rec) {
        var nrec = new UIRectangle;
        nrec.x = rec.x;
        nrec.y = rec.y;
        nrec.width = rec.width;
        nrec.height = rec.height;
        nrec.pixelWitdh = rec.pixelWitdh;
        nrec.pixelHeight = rec.pixelHeight;
        nrec.pixelX = rec.pixelX;
        nrec.pixelY = rec.pixelY;
        nrec.type = 2;
        nrec.cellX = 3;
        nrec.cellY = 2;
        return nrec;
    };
    AngerExtUiVo.prototype.update = function () {
        if (this._angerExtMesh) {
            if (this._angerExtMesh.needDraw) {
                this.makeData();
                this._angerExtMesh.needDraw = false;
            }
            var ui_2 = this.ui;
            if (this._angerExtMesh.pos) {
                if (this._angerExtMesh.visible) {
                    if (this.needUpData(this._angerExtMesh.pos)) {
                        var m = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p = m.transformVector(this._angerExtMesh.pos);
                        ui_2.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - ui_2.width / 2;
                        ui_2.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - ui_2.height / 2 + this._angerExtMesh.offsetY;
                        ui_2.x += this._angerExtMesh.offsetX;
                    }
                }
                else {
                    ui_2.stopEnd();
                    ui_2.x = 10000;
                }
            }
            if (this._angerExtMesh.clear) {
                ui_2.parent.removeChild(ui_2);
                this._data = null;
            }
        }
    };
    return AngerExtUiVo;
}(Disp2DBaseText));
var AngerExtMesh = /** @class */ (function (_super) {
    __extends(AngerExtMesh, _super);
    function AngerExtMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._offsetX = 0;
        _this._offsetY = 0;
        _this._play = false;
        return _this;
    }
    AngerExtMesh.prototype.destory = function () {
        this.pos = null;
        this.needDraw = false;
        this.offsetY = 0;
        // this.clear = true
    };
    Object.defineProperty(AngerExtMesh.prototype, "play", {
        get: function () {
            return this._play;
        },
        set: function (val) {
            this._play = val;
            this.needDraw = val;
            this.visible = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngerExtMesh.prototype, "offsetX", {
        get: function () {
            return this._offsetX;
        },
        set: function (value) {
            this._offsetX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngerExtMesh.prototype, "offsetY", {
        get: function () {
            return this._offsetY;
        },
        set: function (value) {
            this._offsetY = value;
        },
        enumerable: true,
        configurable: true
    });
    return AngerExtMesh;
}(tl3d.baseMeshVo));
var BloodExtUiVo = /** @class */ (function (_super) {
    __extends(BloodExtUiVo, _super);
    function BloodExtUiVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BloodExtUiVo.prototype.makeData = function () {
        if (this._data) {
            this._bloodExtMesh = this._data;
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //底图
            UiDraw.cxtDrawImg(ctx, "boold_bg", new Rectangle(0, 0, 61, 12), UIData.publicsUi);
            //中间的图
            UiDraw.cxtDrawImg(ctx, "boold_mid", new Rectangle(2, 1, 59 * this._bloodExtMesh.mid, 6), UIData.publicsUi);
            //上面的图
            UiDraw.cxtDrawImg(ctx, this._bloodExtMesh.isPlayer ? "boold_up_my" : "boold_up_enemy", new Rectangle(2, 1, 59 * this._bloodExtMesh.num, 6), UIData.publicsUi);
            var angerVal = Number((this._bloodExtMesh.anger / tb.TB_skill_set.getSkillSet().spell_anger).toFixed(2));
            angerVal = Math.min(1, angerVal);
            angerVal = Math.max(0.001, angerVal);
            //怒气
            UiDraw.cxtDrawImg(ctx, "anger", new Rectangle(2, 8, 59 * angerVal, 3), UIData.publicsUi);
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    };
    BloodExtUiVo.prototype.update = function () {
        if (this._bloodExtMesh) {
            if (this._bloodExtMesh.needDraw) {
                this.makeData();
                this._bloodExtMesh.needDraw = false;
            }
            if (this._bloodExtMesh.pos) {
                if (this._bloodExtMesh.visible) {
                    if (this.needUpData(this._bloodExtMesh.pos)) {
                        var m = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p = m.transformVector(this._bloodExtMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this._bloodExtMesh.offsetY;
                        this.ui.x += this._bloodExtMesh.offsetX;
                    }
                }
                else {
                    this.ui.x = 10000;
                }
            }
            if (this._bloodExtMesh.clear) {
                this.ui.parent.removeChild(this.ui);
                this._data = null;
            }
        }
    };
    return BloodExtUiVo;
}(Disp2DBaseText));
var BloodExtMesh = /** @class */ (function (_super) {
    __extends(BloodExtMesh, _super);
    function BloodExtMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._offsetX = 0;
        _this._offsetY = 0;
        _this._anger = 1;
        return _this;
    }
    BloodExtMesh.prototype.destory = function () {
        this.pos = null;
        this._mid = 0;
        this._num = 0;
        this.needDraw = null;
        this.offsetY = 0;
        // this.clear = true
    };
    Object.defineProperty(BloodExtMesh.prototype, "mid", {
        get: function () {
            return this._mid;
        },
        set: function (mid) {
            this._mid = mid;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodExtMesh.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (up) {
            this._num = up;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodExtMesh.prototype, "anger", {
        get: function () {
            return this._anger;
        },
        set: function (val) {
            this._anger = val;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodExtMesh.prototype, "offsetX", {
        get: function () {
            return this._offsetX;
        },
        set: function (value) {
            this._offsetX = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodExtMesh.prototype, "offsetY", {
        get: function () {
            return this._offsetY;
        },
        set: function (value) {
            this._offsetY = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    return BloodExtMesh;
}(tl3d.baseMeshVo));
var StartTitleUiVo = /** @class */ (function (_super) {
    __extends(StartTitleUiVo, _super);
    function StartTitleUiVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartTitleUiVo.prototype.makeData = function () {
        if (this._data) {
            this._startTitleMesh = this._data;
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var sx = 53 - ((this._startTitleMesh.num * 17) >> 1);
            // UiDraw.cxtDrawImg(ctx, this._startTitleMesh.type == 0 ? "starbg0" : "starbg1", new Rectangle(0, 0, 107, 18), UIData.publicsUi);
            for (var i = 0; i < this._startTitleMesh.num; i++) {
                UiDraw.cxtDrawImg(ctx, this._startTitleMesh.type == 0 ? "star0" : "star1", new Rectangle(sx + i * 17, 1, 17, 16), UIData.publicsUi); //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
            }
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    };
    StartTitleUiVo.prototype.update = function () {
        if (this._startTitleMesh) {
            if (this._startTitleMesh.needDraw) {
                this.makeData();
                this._startTitleMesh.needDraw = false;
            }
            if (this._startTitleMesh.pos) {
                if (this._startTitleMesh.visible) {
                    if (this.needUpData(this._startTitleMesh.pos)) {
                        var m = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p = m.transformVector(this._startTitleMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this._startTitleMesh.offsetY;
                        // this.ui.y += 4
                        // this.ui.x -= 40
                        // this.oldPos.x = this._buffTitleMesh.pos.x;
                        // this.oldPos.y = this._buffTitleMesh.pos.y;
                    }
                }
                else {
                    this.ui.x = 10000;
                }
            }
            if (this._startTitleMesh.clear) {
                this.ui.parent.removeChild(this.ui);
                this._data = null;
            }
        }
    };
    return StartTitleUiVo;
}(Disp2DBaseText));
var StartTitleMesh = /** @class */ (function (_super) {
    __extends(StartTitleMesh, _super);
    function StartTitleMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._offsetY = 0;
        return _this;
    }
    StartTitleMesh.prototype.destory = function () {
        this.pos = null;
        this._num = 0;
        this.needDraw = null;
        this.offsetY = 0;
        // this.clear = true
    };
    Object.defineProperty(StartTitleMesh.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (value) {
            this._num = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StartTitleMesh.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StartTitleMesh.prototype, "offsetY", {
        get: function () {
            return this._offsetY;
        },
        set: function (value) {
            this._offsetY = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    return StartTitleMesh;
}(tl3d.baseMeshVo));
var LevelTitleUiVo = /** @class */ (function (_super) {
    __extends(LevelTitleUiVo, _super);
    function LevelTitleUiVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelTitleUiVo.prototype.makeData = function () {
        if (this._data) {
            this._levTitleMesh = this._data;
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, "team" + this._levTitleMesh.type, new Rectangle(20, 0, 18, 18), UIData.publicsUi); //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
            var str = String(Math.floor(this._levTitleMesh.lev));
            // var $textMetrics: TextMetrics = tl3d.TextRegExp.getTextMetrics(ctx, str)
            // let tx = 20 - $textMetrics.width;
            var tx = 13;
            if (str.length == 2) {
                tx = 7;
            }
            else if (str.length > 2) {
                tx = 0;
            }
            tl3d.LabelTextFont.writeSingleLabelToCtx(ctx, str, 12, tx, 4, tl3d.TextAlign.LEFT, ColorConst.WHITE, "#000000", false);
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    };
    LevelTitleUiVo.prototype.update = function () {
        if (this._levTitleMesh) {
            if (this._levTitleMesh.needDraw) {
                this.makeData();
                this._levTitleMesh.needDraw = false;
            }
            if (this._levTitleMesh.pos) {
                if (this._levTitleMesh.visible) {
                    if (this.needUpData(this._levTitleMesh.pos)) {
                        var m = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p = m.transformVector(this._levTitleMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this._levTitleMesh.offsetY;
                        this.ui.y += 4;
                        this.ui.x -= 40;
                        // this.oldPos.x = this._buffTitleMesh.pos.x;
                        // this.oldPos.y = this._buffTitleMesh.pos.y;
                    }
                }
                else {
                    this.ui.x = 10000;
                }
            }
            if (this._levTitleMesh.clear) {
                this.ui.parent.removeChild(this.ui);
                this._data = null;
            }
        }
    };
    return LevelTitleUiVo;
}(CharTitleUiVo));
var LevelTitleMesh = /** @class */ (function (_super) {
    __extends(LevelTitleMesh, _super);
    function LevelTitleMesh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._offsetY = 0;
        return _this;
    }
    LevelTitleMesh.prototype.destory = function () {
        this.pos = null;
        this._lev = null;
        this.needDraw = null;
        this.offsetY = 0;
        // this.clear = true
    };
    Object.defineProperty(LevelTitleMesh.prototype, "lev", {
        get: function () {
            return this._lev;
        },
        set: function (value) {
            this._lev = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelTitleMesh.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelTitleMesh.prototype, "offsetY", {
        get: function () {
            return this._offsetY;
        },
        set: function (value) {
            this._offsetY = value;
            this.needDraw = true;
        },
        enumerable: true,
        configurable: true
    });
    return LevelTitleMesh;
}(tl3d.baseMeshVo));
