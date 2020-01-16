class MainChar extends FightChar {
    constructor() {
        super();
    }

    public getCharHeight(): number {
        return (this.py + this.tittleHeight) * this.scale;
    }

    setNamePos(x,y,z){
        if (this._charNameVo) {
            this._charNameVo.pos.x = x;
            this._charNameVo.pos.y = y;
            this._charNameVo.pos.z = z;
        }
    }

    // 星级
    protected _roleStartVo: StartTitleMesh;

    setroleStart(v: number, type: number) {
        this._roleStartVo && (this._roleStartVo.num = v);
        this._roleStartVo && (this._roleStartVo.type = type);
        // this._roleStartVo && (this._roleStartVo.offsetY = -2);
    }

    // 是否显示星级
    private _roleStartEnable: boolean = false;
    set roleStartEnable(v: boolean) {
        this._roleStartEnable = v;
        if (!this._roleStartVo) {
            this._roleStartVo = (<BloodManagerExt>(this._scene).bloodMgr).getStartMeshVo();
        }
    }

    public removeStage(): void {
        if (this._roleStartVo) {
            this._roleStartVo.visible = false
        }
        super.removeStage();
    }

    public delUIConatiner() {
        super.delUIConatiner();
        if (this._roleStartVo) {
            (<BloodManagerExt>(this._scene).bloodMgr).clearStartMeshVo(this._roleStartVo);
            this._roleStartVo.destory();
            this._roleStartVo = null;
        }
    }


    public refreshPos(): void {
        // super.refreshPos();
        let posY: number = this.getCharHeight();
        if (this._charNameVo) {
            this._charNameVo.pos.x = this.px;
            this._charNameVo.pos.y = posY
            this._charNameVo.pos.z = this.pz;
            this._charNameVo.visible = this.resultVisible;
            posY += 4;
        }
        if (this._roleStartVo) {
            this._roleStartVo.pos.x = this.px;
            this._roleStartVo.pos.y = posY;
            this._roleStartVo.pos.z = this.pz;
            // this._roleStartVo.visible = this.resultVisible;
        }

    }
}