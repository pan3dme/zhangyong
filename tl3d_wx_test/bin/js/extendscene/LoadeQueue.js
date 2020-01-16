/*
* 角色和技能加载队列;
*/
var LoadeQueue = /** @class */ (function () {
    function LoadeQueue() {
        /**
         * 延迟执行队列
         */
        this._funcs = new Array();
    }
    LoadeQueue.getInstance = function () {
        if (!this._instance) {
            this._instance = new LoadeQueue();
        }
        return this._instance;
    };
    /**
     * 添加逐帧执行的函数
     * @param func
     */
    LoadeQueue.prototype.addQueueExcute = function (func) {
        if (!this._state) {
            this._state = true;
            Laya.timer.frameLoop(2, this, this.excute);
        }
        this._funcs.push(func);
    };
    /**
     * 逐帧执行
     */
    LoadeQueue.prototype.excute = function () {
        if (this._funcs.length > 0) {
            var handler = this._funcs.pop();
            handler.run();
            handler.clear();
        }
        else {
            this._state = false;
            Laya.timer.clear(this, this.excute);
            logdebug("excute all");
        }
    };
    /**
     * 加载多个技能,多个角色，单个场景
     * @param skillurls
     * @param roleurls
     * @param mapid
     * @param fun
     */
    LoadeQueue.prototype.loadAll = function (baseScene, skillurls, roleurls, effurls, mapid, process, onComplete) {
        baseScene.resId = mapid;
        this._baseScene = baseScene;
        this._skillUrl = skillurls;
        this._roleUrl = roleurls;
        this._effUrl = effurls;
        this._mapid = mapid;
        this._process = process;
        this._sonComplete = onComplete;
        logyhj("加载技能 %d个，加载角色 %d 个，加载特效 %d个", skillurls.length, roleurls.length, effurls.length);
        this._loadState = 0;
        this.Load();
    };
    LoadeQueue.prototype.Load = function () {
        this._curcount = 0;
        if (this._loadState == 0) {
            //加载技能
            if (this._skillUrl && this._skillUrl.length > 0) {
                this._count = this._skillUrl.length;
                this.LoadSkill();
            }
            else {
                this._loadState = 1;
                this.Load();
            }
        }
        else if (this._loadState == 1) {
            //加载角色
            if (this._roleUrl && this._roleUrl.length > 0) {
                this._count = this._roleUrl.length;
                this.loadRole();
            }
            else {
                this._loadState = 2;
                this.Load();
            }
        }
        else if (this._loadState == 2) {
            //加载特效
            if (this._effUrl && this._effUrl.length > 0) {
                this._count = this._effUrl.length;
                this.loadEff();
            }
            else {
                this._loadState = 3;
                this.Load();
            }
        }
        else if (this._loadState == 3) {
            //加载地图
            if (this._mapid && this._mapid.length > 0) {
                this._count = 1;
                this.loadMap();
            }
            else {
                this.LoadComplete();
            }
        }
    };
    LoadeQueue.prototype.LoadComplete = function () {
        this._loadState = 4;
        this._baseScene = null;
        if (this._sonComplete) {
            this._sonComplete.call(null);
            this._sonComplete = null;
        }
    };
    /**
     * 开始加载技能
     */
    LoadeQueue.prototype.LoadSkill = function () {
        if (!this._baseScene || !this._baseScene.scene) {
            this.onSkillLoaded();
            return;
        }
        var url = this._skillUrl.shift();
        this._baseScene.scene.skillMgr.preLoadSkill(getSkillUrl(url), this.onSkillLoaded.bind(this));
    };
    /**
     * 技能加载完毕
     */
    LoadeQueue.prototype.onSkillLoaded = function () {
        this.loadProcess();
        this._curcount++;
        if (this._skillUrl.length == 0) {
            this._loadState = 1;
            this.Load();
        }
        else {
            // this.LoadSkill();
            Laya.timer.callLater(this, this.LoadSkill.bind(this));
            // Laya.timer.frameOnce(2, this, this.LoadSkill.bind(this));
        }
    };
    /**
     * 加载角色
     */
    LoadeQueue.prototype.loadRole = function () {
        var filename = this._roleUrl.pop();
        if (!filename) {
            this.onRoleLoaded(null);
            return;
        }
        var url = getRoleUrl(filename.toString());
        tl3d.MeshDataManager.getInstance().getMeshData(url, this.onRoleLoaded.bind(this));
    };
    /**
     * 角色加载完毕
     * @param skinMesh
     */
    LoadeQueue.prototype.onRoleLoaded = function ($skinMesh) {
        this.loadProcess();
        this._curcount++;
        if (this._roleUrl.length == 0) {
            this._loadState = 2;
            this.Load();
        }
        else {
            // this.loadRole();
            Laya.timer.callLater(this, this.loadRole.bind(this));
            // Laya.timer.frameOnce(2, this, this.loadRole.bind(this));
        }
    };
    /**
    * 加载特效
    */
    LoadeQueue.prototype.loadEff = function () {
        var filename = this._effUrl.pop();
        if (!filename || !this._baseScene || !this._baseScene.scene) {
            this.onEffLoaded();
            return;
        }
        var url = Scene_data.fileRoot + getEffectUrl(filename.toString());
        this._baseScene.scene.groupDataMgr.scene = this._baseScene.scene;
        this._baseScene.scene.groupDataMgr.perLoadData(url, this.onEffLoaded.bind(this));
    };
    LoadeQueue.prototype.onEffLoaded = function () {
        this.loadProcess();
        this._curcount++;
        if (this._effUrl.length <= 0) {
            this._loadState = 3;
            this.Load();
        }
        else {
            // this.loadEff();
            Laya.timer.callLater(this, this.loadEff.bind(this));
            // Laya.timer.frameOnce(2, this, this.loadEff.bind(this));
        }
    };
    LoadeQueue.prototype.loadMap = function () {
        var _this = this;
        if (!this._baseScene || !this._baseScene.scene) {
            this.LoadComplete();
            return;
        }
        this._baseScene.scene.loadScene(this._mapid, function () { }, function (num) {
            if (num >= 1)
                return;
            if (_this._process) {
                _this._process.call(null, num, _this._loadState);
            }
        }, this.LoadComplete.bind(this));
    };
    LoadeQueue.prototype.loadProcess = function () {
        if (this._process) {
            var count = this._count <= 0 ? 1 : this._count;
            this._process.call(null, Math.min(this._curcount / count, 1), this._loadState);
        }
    };
    return LoadeQueue;
}());
