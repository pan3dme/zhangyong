
import TimeUtil = tl3d.TimeUtil;
import Matrix3D = tl3d.Matrix3D
import UIData = tl3d.UIData
import CharTitleUiVo = tl3d.CharTitleUiVo;
import Disp2DBaseText = tl3d.Disp2DBaseText;
import TextureManager = tl3d.TextureManager;
import UiDraw = tl3d.UiDraw;
import UIRectangle = tl3d.UIRectangle;
import Dis2DUIContianerPanel = tl3d.Dis2DUIContianerPanel;
import Dis2DUIFram = tl3d.Dis2DUIFram;
import ArtFont = tl3d.ArtFont;
import Rectangle = tl3d.Rectangle;


class BloodManagerExt extends tl3d.BloodManager {

    // private _actionbarUIConatiner: actionBarUIConatiner//行动条;
    private _buffDis2DUI: Dis2DUIContianerPanel;
    private _levDis2DUI: Dis2DUIContianerPanel;
    private _startDis2DUI: Dis2DUIContianerPanel;
    private _bloodExtDis2DUI: Dis2DUIContianerPanel;
    private _angerExtDis2DUI: Dis2DUIFram;

    constructor() {
        super();
        // this._actionbarUIConatiner = new actionBarUIConatiner();//行动条
        // this.uiContianerItem.splice(1, 0, this._actionbarUIConatiner);

        this._buffDis2DUI = new Dis2DUIContianerPanel(BuffTitleUiVo, new Rectangle(0, 0, 88, 66), 15);//buff
        this.uiContianerItem.splice(this.uiContianerItem.length - 3, 0, this._buffDis2DUI);

        this._levDis2DUI = new Dis2DUIContianerPanel(LevelTitleUiVo, new Rectangle(0, 0, 38, 26), 15);//等级 + 种族
        this.uiContianerItem.splice(this.uiContianerItem.length - 3, 0, this._levDis2DUI);

        this._startDis2DUI = new Dis2DUIContianerPanel(StartTitleUiVo, new Rectangle(0, 0, 107, 18), 6);//星级
        this.uiContianerItem.splice(this.uiContianerItem.length - 3, 0, this._startDis2DUI);

        this._bloodExtDis2DUI = new Dis2DUIContianerPanel(BloodExtUiVo, new Rectangle(0, 0, 64, 12), 15);//新血条
        this.uiContianerItem.splice(this.uiContianerItem.length - 3, 0, this._bloodExtDis2DUI);

        this._angerExtDis2DUI = new Dis2DUIFram(AngerExtUiVo, new Rectangle(0, 0, 330, 202), 15);//新血条
        this.uiContianerItem.splice(this.uiContianerItem.length - 3, 0, this._angerExtDis2DUI);
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

    public getBuffMeshVo(): BuffTitleMesh {
        var $vo: BuffTitleMesh = new BuffTitleMesh;
        $vo.buffarr = [];
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._buffDis2DUI.showTemp($vo);
        return $vo;
    }

    public clearBuffMeshVo($vo: BuffTitleMesh) {
        this._buffDis2DUI.clearTemp($vo);
    }

    public getAngerExtMeshVo(): AngerExtMesh {
        var $vo: AngerExtMesh = new AngerExtMesh;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._angerExtDis2DUI.showTemp($vo);
        return $vo;
    }

    public clearAngerExtMeshVo($vo: AngerExtMesh) {
        this._angerExtDis2DUI.clearTemp($vo);
    }

    public getBloodExtMeshVo(): BloodExtMesh {
        var $vo: BloodExtMesh = new BloodExtMesh;
        $vo.num = 0;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._bloodExtDis2DUI.showTemp($vo);
        return $vo;
    }

    public clearBloodExtMeshVo($vo: BloodExtMesh) {
        this._bloodExtDis2DUI.clearTemp($vo);
    }

    public getStartMeshVo(): StartTitleMesh {
        var $vo: StartTitleMesh = new StartTitleMesh;
        $vo.num = 0;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._startDis2DUI.showTemp($vo);
        return $vo;
    }

    public clearStartMeshVo($vo: StartTitleMesh) {
        this._startDis2DUI.clearTemp($vo);
    }

    public getLevMeshVo(): LevelTitleMesh {
        var $vo: LevelTitleMesh = new LevelTitleMesh;
        $vo.lev = 0;
        $vo.pos = new tl3d.Vector3D(0, 50, 0);
        this._levDis2DUI.showTemp($vo);
        return $vo;
    }

    public clearLevMeshVo($vo: LevelTitleMesh) {
        this._levDis2DUI.clearTemp($vo);
    }

    // public update(): void {
    //     super.update();
    //     for (var i: number = 0; i < this.uiContianerItem.length; i++) {
    //         this.uiContianerItem[i].update(0)
    //         // for (var j: number = 0; j < this._actionbarUIConatiner.renderList.length; j++) {
    //         //     this.uiContianerItem[i].renderList[j].update();
    //         // }
    //     }
    // }
}

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

class BuffTitleUiVo extends CharTitleUiVo {
    private _buffTitleMesh: BuffTitleMesh
    public makeData(): void {
        if (this._data) {
            this._buffTitleMesh = <BuffTitleMesh>this._data
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            let len = this._buffTitleMesh.buffarr.length;
            let row: number = len < 5 ? 0 : len < 9 ? 1 : 2;//最低行
            let column: number = 0;//列
            for (var i: number = 0; i < this._buffTitleMesh.buffarr.length; i++) {
                if (i < 12) {
                    let cur_row = Math.floor(i / 3);
                    let px: number = 22 * (i % 3) + 12;
                    let py: number = (22 * 3) - (cur_row + 1) * 22;
                    var vo: GodBuffVo = this._buffTitleMesh.buffarr[i];
                    UiDraw.cxtDrawImg(ctx, vo.tb_buff.icon, new Rectangle(px, py, 20, 20), UIData.publicsUi);  //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
                    tl3d.LabelTextFont.writeSingleLabelToCtx(ctx, String(vo.round == 0 ? 1 : vo.round), 10, px + 20 - 8, py + 20 - 12, tl3d.TextAlign.LEFT, "#ffd800", "#000000");
                }
            }
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    }
    public update(): void {
        if (this._buffTitleMesh) {
            if (this._buffTitleMesh.needDraw) {
                this.makeData();
                this._buffTitleMesh.needDraw = false
            }
            if (this._buffTitleMesh.pos) {
                if (this._buffTitleMesh.visible) {
                    if (this.needUpData(this._buffTitleMesh.pos)) {
                        var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p: Vector3D = m.transformVector(this._buffTitleMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
                        this.ui.y -= (this.ui.height / 2) + 6 + this._buffTitleMesh.posy;
                        this.oldPos.x = this._buffTitleMesh.pos.x;
                        this.oldPos.y = this._buffTitleMesh.pos.y;
                    }
                } else {
                    this.ui.x = 10000
                }
            }
            if (this._buffTitleMesh.clear) {
                if (this.ui && this.ui.parent) {
                    this.ui.parent.removeChild(this.ui);
                }
                this._data = null;
            }
        }
    }
}

class BuffTitleMesh extends tl3d.baseMeshVo {
    private _num: Array<any>;
    public posy: number = 0;

    public needDraw: boolean;
    public destory(): void {
        this.pos = null;
        this._num = null;
        // this.clear = true
    }


    public set buffarr(value: Array<any>) {
        this._num = value;
        this.needDraw = true;
    }
    public get buffarr(): Array<any> {
        return this._num;
    }
}

class AngerExtUiVo extends Disp2DBaseText {
    private _angerExtMesh: AngerExtMesh
    public makeData(): void {
        if (this._data) {
            this._angerExtMesh = <AngerExtMesh>this._data
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, "angerFra", new Rectangle(0, 0, 330, 202), UIData.publicsUi);

            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            let pubrec = this.getPubRec(rec);
            let ui = this.ui as tl3d.FrameCompenent
            ui.setFrameData(pubrec);
            ui.tr.setRec(pubrec);
            ui.width = 110;
            ui.height = 101;
            ui.play();
        }
    }

    private getPubRec(rec:UIRectangle): UIRectangle {
        var nrec: UIRectangle = new UIRectangle;

        nrec.x = rec.x;
        nrec.y = rec.y;
        nrec.width = rec.width
        nrec.height = rec.height;
        nrec.pixelWitdh = rec.pixelWitdh;
        nrec.pixelHeight = rec.pixelHeight;
        nrec.pixelX = rec.pixelX;
        nrec.pixelY = rec.pixelY;

        nrec.type = 2;
        nrec.cellX = 3;
        nrec.cellY = 2;

        return nrec;
    }
    public update(): void {
        if (this._angerExtMesh) {
            if (this._angerExtMesh.needDraw) {
                this.makeData();
                this._angerExtMesh.needDraw = false
            }
            let ui = this.ui as tl3d.FrameCompenent
            if (this._angerExtMesh.pos) {
                if (this._angerExtMesh.visible) {
                    if (this.needUpData(this._angerExtMesh.pos)) {
                        var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p: Vector3D = m.transformVector(this._angerExtMesh.pos);
                        ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - ui.width / 2;
                        ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - ui.height / 2 + this._angerExtMesh.offsetY;
                        ui.x += this._angerExtMesh.offsetX;
                    }
                } else {
                    ui.stopEnd();
                    ui.x = 10000
                }
            }
            if (this._angerExtMesh.clear) {
                ui.parent.removeChild(ui);
                this._data = null;
            }
        }
    }
}

class AngerExtMesh extends tl3d.baseMeshVo {
    public needDraw: boolean;
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _play: boolean = false;
    public destory(): void {
        this.pos = null;
        this.needDraw = false;
        this.offsetY = 0;
        // this.clear = true
    }

    public set play(val: boolean) {
        this._play = val;
        this.needDraw = val;
        this.visible = val;
    }

    public get play() {
        return this._play;
    }

    public set offsetX(value: number) {
        this._offsetX = value;
    }
    public get offsetX(): number {
        return this._offsetX;
    }

    public set offsetY(value: number) {
        this._offsetY = value;
    }
    public get offsetY(): number {
        return this._offsetY;
    }
}

class BloodExtUiVo extends Disp2DBaseText {
    private _bloodExtMesh: BloodExtMesh
    public makeData(): void {
        if (this._data) {
            this._bloodExtMesh = <BloodExtMesh>this._data
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //底图
            UiDraw.cxtDrawImg(ctx, "boold_bg", new Rectangle(0, 0, 61, 12), UIData.publicsUi);
            //中间的图
            UiDraw.cxtDrawImg(ctx, "boold_mid", new Rectangle(2, 1, 59 * this._bloodExtMesh.mid, 6), UIData.publicsUi);
            //上面的图
            UiDraw.cxtDrawImg(ctx, this._bloodExtMesh.isPlayer ? "boold_up_my" : "boold_up_enemy", new Rectangle(2, 1, 59 * this._bloodExtMesh.num, 6), UIData.publicsUi);

            let angerVal = Number((this._bloodExtMesh.anger / tb.TB_skill_set.getSkillSet().spell_anger).toFixed(2));
            angerVal = Math.min(1, angerVal);
            angerVal = Math.max(0.001, angerVal);
            //怒气
            UiDraw.cxtDrawImg(ctx, "anger", new Rectangle(2, 8, 59 * angerVal, 3), UIData.publicsUi);

            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    }
    public update(): void {
        if (this._bloodExtMesh) {
            if (this._bloodExtMesh.needDraw) {
                this.makeData();
                this._bloodExtMesh.needDraw = false
            }
            if (this._bloodExtMesh.pos) {
                if (this._bloodExtMesh.visible) {
                    if (this.needUpData(this._bloodExtMesh.pos)) {
                        var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p: Vector3D = m.transformVector(this._bloodExtMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this._bloodExtMesh.offsetY;
                        this.ui.x += this._bloodExtMesh.offsetX;
                    }
                } else {
                    this.ui.x = 10000
                }
            }
            if (this._bloodExtMesh.clear) {
                this.ui.parent.removeChild(this.ui);
                this._data = null;
            }
        }
    }
}

class BloodExtMesh extends tl3d.baseMeshVo {
    private _mid: number;
    private _num: number;
    public needDraw: boolean;
    public isPlayer: boolean;
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _anger: number = 1;
    public destory(): void {
        this.pos = null;
        this._mid = 0;
        this._num = 0;
        this.needDraw = null;
        this.offsetY = 0;
        // this.clear = true
    }

    public set mid(mid: number) {
        this._mid = mid;
        this.needDraw = true;
    }

    public get mid() {
        return this._mid;
    }

    public set num(up: number) {
        this._num = up;
        this.needDraw = true;
    }

    public get num() {
        return this._num;
    }

    public set anger(val: number) {
        this._anger = val;
        this.needDraw = true;
    }

    public get anger() {
        return this._anger;
    }

    public set offsetX(value: number) {
        this._offsetX = value;
        this.needDraw = true;
    }
    public get offsetX(): number {
        return this._offsetX;
    }

    public set offsetY(value: number) {
        this._offsetY = value;
        this.needDraw = true;
    }
    public get offsetY(): number {
        return this._offsetY;
    }
}


class StartTitleUiVo extends Disp2DBaseText {
    private _startTitleMesh: StartTitleMesh
    public makeData(): void {
        if (this._data) {
            this._startTitleMesh = <StartTitleMesh>this._data
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            let sx: number = 53 - ((this._startTitleMesh.num * 17) >> 1);
            // UiDraw.cxtDrawImg(ctx, this._startTitleMesh.type == 0 ? "starbg0" : "starbg1", new Rectangle(0, 0, 107, 18), UIData.publicsUi);
            for (let i = 0; i < this._startTitleMesh.num; i++) {
                UiDraw.cxtDrawImg(ctx, this._startTitleMesh.type == 0 ? "star0" : "star1", new Rectangle(sx + i * 17, 1, 17, 16), UIData.publicsUi);  //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
            }
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    }
    public update(): void {
        if (this._startTitleMesh) {
            if (this._startTitleMesh.needDraw) {
                this.makeData();
                this._startTitleMesh.needDraw = false
            }
            if (this._startTitleMesh.pos) {
                if (this._startTitleMesh.visible) {
                    if (this.needUpData(this._startTitleMesh.pos)) {
                        var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p: Vector3D = m.transformVector(this._startTitleMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this._startTitleMesh.offsetY;
                        // this.ui.y += 4
                        // this.ui.x -= 40
                        // this.oldPos.x = this._buffTitleMesh.pos.x;
                        // this.oldPos.y = this._buffTitleMesh.pos.y;
                    }
                } else {
                    this.ui.x = 10000
                }
            }
            if (this._startTitleMesh.clear) {
                this.ui.parent.removeChild(this.ui);
                this._data = null;
            }
        }
    }
}

class StartTitleMesh extends tl3d.baseMeshVo {
    private _type: number;
    private _num: number;
    public needDraw: boolean;
    private _offsetY: number = 0;
    public destory(): void {
        this.pos = null;
        this._num = 0;
        this.needDraw = null;
        this.offsetY = 0;
        // this.clear = true
    }

    public set num(value: number) {
        this._num = value;
        this.needDraw = true;
    }
    public get num(): number {
        return this._num;
    }
    public set type(value: number) {
        this._type = value;
        this.needDraw = true;
    }
    public get type(): number {
        return this._type;
    }

    public set offsetY(value: number) {
        this._offsetY = value;
        this.needDraw = true;
    }
    public get offsetY(): number {
        return this._offsetY;
    }
}


class LevelTitleUiVo extends CharTitleUiVo {
    private _levTitleMesh: LevelTitleMesh
    public makeData(): void {
        if (this._data) {
            this._levTitleMesh = <LevelTitleMesh>this._data
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, "team" + this._levTitleMesh.type, new Rectangle(20, 0, 18, 18), UIData.publicsUi);  //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
            let str = String(Math.floor(this._levTitleMesh.lev));
            // var $textMetrics: TextMetrics = tl3d.TextRegExp.getTextMetrics(ctx, str)
            // let tx = 20 - $textMetrics.width;
            let tx = 13;
            if (str.length == 2) {
                tx = 7;
            } else if (str.length > 2) {
                tx = 0;
            }

            tl3d.LabelTextFont.writeSingleLabelToCtx(ctx, str, 12, tx, 4, tl3d.TextAlign.LEFT, ColorConst.WHITE, "#000000", false);
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    }
    public update(): void {
        if (this._levTitleMesh) {
            if (this._levTitleMesh.needDraw) {
                this.makeData();
                this._levTitleMesh.needDraw = false
            }
            if (this._levTitleMesh.pos) {
                if (this._levTitleMesh.visible) {
                    if (this.needUpData(this._levTitleMesh.pos)) {
                        var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                        m.append(Scene_data.viewMatrx3D);
                        var p: Vector3D = m.transformVector(this._levTitleMesh.pos);
                        this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                        this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this._levTitleMesh.offsetY;
                        this.ui.y += 4
                        this.ui.x -= 40
                        // this.oldPos.x = this._buffTitleMesh.pos.x;
                        // this.oldPos.y = this._buffTitleMesh.pos.y;
                    }
                } else {
                    this.ui.x = 10000
                }
            }
            if (this._levTitleMesh.clear) {
                this.ui.parent.removeChild(this.ui);
                this._data = null;
            }
        }
    }
}

class LevelTitleMesh extends tl3d.baseMeshVo {
    private _type: number;
    private _lev: number;
    public needDraw: boolean;
    private _offsetY: number = 0;
    public destory(): void {
        this.pos = null;
        this._lev = null;
        this.needDraw = null;
        this.offsetY = 0;
        // this.clear = true
    }

    public set lev(value: number) {
        this._lev = value;
        this.needDraw = true;
    }
    public get lev(): number {
        return this._lev;
    }
    public set type(value: number) {
        this._type = value;
        this.needDraw = true;
    }
    public get type(): number {
        return this._type;
    }

    public set offsetY(value: number) {
        this._offsetY = value;
        this.needDraw = true;
    }
    public get offsetY(): number {
        return this._offsetY;
    }
}
