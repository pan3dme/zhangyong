/*
* name;
*/
class BaseSceneMgr {
    static _instance: BaseSceneMgr;
    static getInstance(): BaseSceneMgr {
        if (!BaseSceneMgr._instance) {
            BaseSceneMgr._instance = new BaseSceneMgr();
        }
        return BaseSceneMgr._instance;
    }
    _uiScene: Base2dSceneLayer;
    _particles: Object = {};
    _count: number = 0;
    _parent: any;
    constructor() {

    }

    getScene(){
        if (!this._uiScene) {
            this._uiScene = new Base2dSceneLayer();
        }
        return this._uiScene;
    }

    //显示特效
    showEffect(target: any, cindex: number, id: number, px, py, scale, rotation, autoRemove: boolean = false, cb: Function = null): void {
        if (!this._uiScene) {
            this._uiScene = new Base2dSceneLayer();
        }

        this._count++;
        (cindex != -1) ? target.addChildAt(this._uiScene, cindex) : target.addChild(this._uiScene);
        this._parent = target;
        this._uiScene.addEffect(null, id, new tl3d.Vector3D(px, 0, py), scale, rotation, ($particle: tl3d.CombineParticle) => {
            if (this._particles.hasOwnProperty(id)) {
                this._uiScene.removeEffect($particle);
                return;
            }

            if (target.parent) {
                this._particles[id] = $particle;
            } else {
                logdebug("添加的目标已移除");
                this._uiScene.removeEffect($particle);
            }

            $particle.onComplete = (particle) => {
                if (cb) {
                    cb(particle);
                }
                if (autoRemove) {
                    this.removeEffect(id);
                }
            };

        }, 0, 0);
        this._uiScene.onShow();
    }

    //移除特效
    removeEffect(id: number): void {
        if (!this._uiScene) {
            return;
        }
        let $particle = this._particles[id];
        if ($particle) {
            this._count--;
            this._uiScene.removeEffect($particle);
            delete this._particles[id];
        }
        if (this._count <= 0 && this._uiScene.parent) {
            this._uiScene.onExit();
            this._uiScene.removeSelf();
        }
    }

    clearScene(): void {

    }
}