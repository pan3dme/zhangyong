import BloodLineMeshVo = tl3d.BloodLineMeshVo;
import Scene_data = tl3d.Scene_data;
import Vector3D = tl3d.Vector3D;
class FightChar extends Game2dChar {
    public is2d: boolean = false;
    constructor() {
        super();
    }

    //重写一下2d界面角度 -45+30
    public updateMatrix(): void {
        super.updateMatrix();
        if (!this.is2d) return;
        this.posMatrix.identity();
        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
        this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
        this.posMatrix.appendRotation(30, Vector3D.X_AXIS)
        this.posMatrix.appendTranslation(this._x, this._y, this._z);
    }

    public getCharHeight(): number {
        return this.py + this.tittleHeight + 13;
    }

    // public setBloodOffsetY(value: number): void {
    //     this._charBloodVo && (this._charBloodVo.offsety = value);
    // }

    public setBloodExtOffsetY(value: number): void {
        this._bloodExtVo && (this._bloodExtVo.offsetY = value);
    }

    public setBloodExtOffsetX(value: number): void {
        this._bloodExtVo && (this._bloodExtVo.offsetX = value);
    }

    public setBuffOffsetY(value: number): void {
        this._buffVo && (this._buffVo.posy = value);
    }

    public setLevOffsetY(value: number): void {
        this._rolelevVo && (this._rolelevVo.offsetY = value);
    }

    // 行动条
    // protected _charActionVo: BloodLineMeshVo;

    private _actionRatio: number = 0;
    set actionRatio(v: number) {
        this._actionRatio = v;
        // this._charActionVo && (this._charActionVo.num = this._actionRatio);
    }
    get actionRatio(): number {
        return this._actionRatio;
    }

    // // 是否显示行动条
    // private _actionEnable: boolean = false;
    // set actionBarEnable(v: boolean) {
    //     this._actionEnable = v;
    //     if (!this._charActionVo) {
    //         this._charActionVo = (<BloodManagerExt>(this._scene).bloodManager).getActionBarMeshVo();
    //         this._charActionVo.colortype = 1
    //     }
    // }


    // 血条扩展对象
    protected _bloodExtVo: BloodExtMesh;
    /** 血条缓动 */
    public get lifenumExt(): number {
        return this._lifenumExt
    }
    private _lifenumExt: number = -1;
    public set lifenumExt(value: number) {
        if (!this._bloodExtVo) return;
        if (value == this._lifenumExt) return;
        let pre = Number((value / 100).toFixed(2));
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
            } else if (this._lifenumExt < value) {
                //加血
                this.bloodMidNumExt = pre;
                // logyhj("缓动开始");
                Laya.Tween.to(this, { bloodNumExt: pre }, 500);
            }
        } else {
            this.bloodNumExt = pre;
            this.bloodMidNumExt = pre;
        }
        this._lifenumExt = value;
    }
    private _bloodNumExt: number = 0
    public set bloodNumExt(value: number) {
        // logyhj("blood:",value);
        this._bloodNumExt = value == 0 ? 0.001 : value;
        if (this._bloodExtVo) {
            this._bloodExtVo.num = this._bloodNumExt;
        }
    }
    public get bloodNumExt(): number {
        return this._bloodNumExt
    }

    private _bloodMidNumExt: number = 0
    public set bloodMidNumExt(value: number) {
        // logyhj("bloodmid:",value);
        this._bloodMidNumExt = value == 0 ? 0.001 : value;
        if (this._bloodExtVo) {
            this._bloodExtVo.mid = this._bloodMidNumExt;
        }

    }
    public get bloodMidNumExt(): number {
        return this._bloodMidNumExt;
    }

    // 是否显示血条
    public setbloodColor(isPlayer: boolean) {
        this._bloodExtVo && (this._bloodExtVo.isPlayer = isPlayer);
    }

    // 设置怒气值
    public setAnger(val: number) {
        this._bloodExtVo && (this._bloodExtVo.anger = val);
    }

    // 获得怒气值
    public getAnger(): number {
        return this._bloodExtVo && this._bloodExtVo.anger;
    }

    private _angerExtVo:AngerExtMesh
    setAngerPlay(val){
        if (!this._angerExtVo) {
            this._angerExtVo = (this._scene).bloodMgr.getAngerExtMeshVo();
        }
        this._angerExtVo && (this._angerExtVo.play = val);
    }

    // 是否显示血条
    private _bloodEnableExt: boolean = false;
    set bloodEnableExt(v: boolean) {
        this._bloodEnableExt = v;
        if (!this._bloodExtVo) {
            this._bloodExtVo = ((this._scene).bloodMgr as BloodManagerExt).getBloodExtMeshVo();
        }
        this._bloodExtVo.visible = v;
    }

    get bloodEnableExt(){
        return this._bloodEnableExt;
    }

    protected _buffVo: BuffTitleMesh;
    private _buffary: Array<any> = new Array;
    set buffary(v: Array<any>) {
        this._buffary = v;
        this._buffVo && (this._buffVo.buffarr = v);
    }
    get buffary(): Array<any> {
        return this._buffary;
    }

    private _buffEnable: boolean = false;
    set buffEnable(v: boolean) {
        this._buffEnable = v;
        if (!this._buffVo) {
            this._buffVo = (<BloodManagerExt>(this._scene).bloodMgr).getBuffMeshVo();
        }
        this._buffVo.visible = v;
    }

    // 等级
    protected _rolelevVo: LevelTitleMesh;

    setroleLev(v: number, type: number) {
        // logyhj("角色等级：", v);
        this._rolelevVo && (this._rolelevVo.lev = v);
        this._rolelevVo && (this._rolelevVo.type = type);
    }

    // 是否显示等级
    private _roleLevEnable: boolean = false;
    set roleLevEnable(v: boolean) {
        this._roleLevEnable = v;
        if (!this._rolelevVo) {
            this._rolelevVo = (<BloodManagerExt>(this._scene).bloodMgr).getLevMeshVo();
        }
        this._rolelevVo.visible = v;
    }

    // set bloodPosX(v: number) {
    //     this._charBloodVo && (this._charBloodVo.posx = v);
    // }

    public refreshPos(): void {
        // super.refreshPos();
        let posY: number = (this.py + this.tittleHeight) * this.scale;
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
            this._charNameVo.pos.y = posY
            this._charNameVo.pos.z = this.pz;
            this._charNameVo.visible = this.resultVisible;

            // posY += 6;
        }

        if (this._angerExtVo && this._angerExtVo.visible) {
            this._angerExtVo.pos.x = this.px;
            this._angerExtVo.pos.y = posY
            this._angerExtVo.pos.z = this.pz;
            this._angerExtVo.visible = this.resultVisible;

            // posY += 6;
        }
    }

    public removeStage(): void {
        super.removeStage();
        // if (this._charActionVo) {
        //     this._charActionVo.visible = false
        // }
        if (this._buffVo) {
            this._buffVo.visible = false
        }
        if (this._rolelevVo) {
            this._rolelevVo.visible = false
        }
        if (this._bloodExtVo) {
            this._bloodExtVo.visible = false
        }
        if (this._angerExtVo) {
            this._angerExtVo.play = false;
        }
        this.delUIConatiner();
    }

    public addStage(): void {
        super.addStage();
        // if (this._charActionVo) {
        //     this._charActionVo.visible = true;
        // }
        if (this._buffVo) {
            this._buffVo.visible = true;
        }
        if (this._rolelevVo) {
            this._rolelevVo.visible = true
        }
        if (this._bloodExtVo) {
            this._bloodExtVo.visible = true
        }
    }

    public delUIConatiner() {
        if (this._buffVo) {
            (<BloodManagerExt>(this._scene).bloodMgr).clearBuffMeshVo(this._buffVo);
            this._buffVo.destory();
            this._buffVo = null;
        }
        if (this._rolelevVo) {
            (<BloodManagerExt>(this._scene).bloodMgr).clearLevMeshVo(this._rolelevVo);
            this._rolelevVo.destory();
            this._rolelevVo = null;
        }
        if (this._bloodExtVo) {
            (<BloodManagerExt>(this._scene).bloodMgr).clearBloodExtMeshVo(this._bloodExtVo);
            this._bloodExtVo.destory();
            this._bloodExtVo = null;
        }
        if (this._angerExtVo) {
            (<BloodManagerExt>(this._scene).bloodMgr).clearAngerExtMeshVo(this._angerExtVo);
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
    }

    public destory(): void {
        this.removeChar();
        super.destory();
    }

    public removeChar() {
        if (this.onStage && this._scene) {
            this._scene.removeMovieDisplay(this);
        }
        this.removeStage();
    }
}