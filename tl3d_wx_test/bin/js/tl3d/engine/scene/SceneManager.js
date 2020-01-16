var tl3d;
(function (tl3d) {
    var SceneManager = /** @class */ (function () {
        function SceneManager() {
            //private _sceneLoader: SceneRes;
            this._ready = false;
            this.render = true;
            this._particletime = 0;
            this.renderDic = new Object;
            this._displayList = new Array;
            this._displaySpriteList = new Array;
            this._displayRoleList = new Array;
            this._display2DList = new Array;
            this.startTime = tl3d.TimeUtil.START_TIME;
            this._time = tl3d.TimeUtil.getTimer(this.startTime);
            this._sceneDic = new Object;
            this.initScene();
            this._particleList = new Array;
            //
            this.shadowMgr = new tl3d.ShadowManager();
            this.skillMgr = new tl3d.SkillManager(this);
            this.groupDataMgr = new tl3d.GroupDataManager(this);
        }
        Object.defineProperty(SceneManager.prototype, "displayList", {
            get: function () {
                return this._displayList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "displayRoleList", {
            get: function () {
                return this._displayRoleList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "displaySpriteList", {
            get: function () {
                return this._displaySpriteList;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.testUrl = function ($url) {
            return this._currentUrl == $url;
        };
        SceneManager.prototype.loadScene = function ($url, $completeFun, $progressFun, $analysisCompleteFun) {
            var _this = this;
            if (this._currentUrl == $url) { //原场景不加载
                this._ready = true;
                $completeFun();
                $analysisCompleteFun();
                return;
            }
            this.clearStaticScene();
            this._ready = false;
            tl3d.SceneResManager.getInstance().loadSceneRes($url, $completeFun, $progressFun, function ($str) {
                _this.loadSceneConfigCom($str);
                $analysisCompleteFun();
            });
            this._currentUrl = $url;
        };
        SceneManager.prototype.addSceneImgBg = function (info) {
            var displayimg = new tl3d.Display3dBg();
            displayimg.setImgInfo(info.url, info.width, info.height);
            this.addDisplay(displayimg);
        };
        SceneManager.prototype.getDisplayByID = function ($type, $id) {
            if ($type == 0) {
                return this._sceneDic["build" + $id];
            }
            else if ($type == 1) {
                return this._sceneDic["particle" + $id];
            }
        };
        SceneManager.prototype.fixAstart = function (pos) {
            for (var i = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].fixAstartData(pos);
            }
        };
        SceneManager.prototype.loadSceneConfigCom2 = function (obj) {
            this._sceneDic = new Object();
            var groundAry = obj.groundItem;
            var buildAry = obj.buildItem;
            tl3d.Scene_data.fogColor = [obj.fogColor.x / 255.0, obj.fogColor.y / 255.0, obj.fogColor.z / 255.0];
            // Scene_data.fogColor = [1, 1, 1];
            //  //console.log(obj.fogDistance)
            var d = obj.fogDistance * 1; //1000
            var s = obj.fogAttenuation; //0.5.
            tl3d.Scene_data.gameAngle = isNaN(obj.gameAngle) ? 0 : obj.gameAngle;
            tl3d.Scene_data.focus3D.rotationY = tl3d.Scene_data.gameAngle;
            tl3d.Scene_data.fogData = [d * s, 1 / ((1 - s) * d)];
            // Scene_data.fogData = [0, 1 / 5000]
            tl3d.Scene_data.sceneNumId++;
            for (var j = 0; groundAry && j < groundAry.length; j++) {
                var groundDisplay = this.getGroundSprite(groundAry[j], obj.terrain);
                this.addDisplay(groundDisplay);
            }
            for (var i = 0; i < buildAry.length; i++) {
                var itemObj = buildAry[i];
                if (itemObj.type == tl3d.BaseRes.PREFAB_TYPE) {
                    var itemDisplay = this.getBuildSprite(itemObj);
                    this.addDisplay(itemDisplay);
                }
                else if (itemObj.type == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle = this.getParticleSprite(itemObj);
                    this.addParticle(particle);
                }
            }
            tl3d.Scene_data.light.setData(obj.SunNrm, obj.SunLigth, obj.AmbientLight);
            tl3d.LightProbeManager.getInstance().setLightProbeData(obj.lightProbeItem);
            this._ready = true;
            if (obj.quadTreeData) {
                this._sceneQuadTree = new tl3d.SceneQuadTree();
                this._sceneQuadTree.init(obj.quadTreeData, this._sceneDic);
            }
            else {
                this._sceneQuadTree = null;
            }
        };
        SceneManager.prototype.getGroundSprite = function (itemObj, terrain) {
            var itemDisplay = new tl3d.TerrainDisplay3DSprite();
            itemDisplay.setObjUrl(itemObj.objsurl);
            itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
            itemDisplay.materialInfoArr = itemObj.materialInfoArr;
            itemDisplay.setLightMapUrl(itemObj.lighturl);
            itemDisplay.scaleX = itemObj.scaleX;
            itemDisplay.scaleY = itemObj.scaleY;
            itemDisplay.scaleZ = itemObj.scaleZ;
            itemDisplay.x = itemObj.x;
            itemDisplay.y = itemObj.y;
            itemDisplay.z = itemObj.z;
            itemDisplay.rotationX = itemObj.rotationX;
            itemDisplay.rotationY = itemObj.rotationY;
            itemDisplay.rotationZ = itemObj.rotationZ;
            itemDisplay.objData.lightuvsOffsets = itemDisplay.objData.uvsOffsets;
            if (terrain) {
                itemDisplay.setGrounDataMesh(terrain[itemObj.id]);
            }
            this._sceneDic["ground" + itemObj.id] = itemDisplay;
            return itemDisplay;
        };
        SceneManager.prototype.makeCollisioin = function (arr) {
        };
        Object.defineProperty(SceneManager.prototype, "ready", {
            get: function () {
                return this._ready;
            },
            set: function ($value) {
                //console.log("--setready--", $value);
                this._ready = $value;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.getBuildSprite = function (itemObj) {
            var itemDisplay = new tl3d.Display3DSprite();
            itemDisplay.setObjUrl(itemObj.objsurl);
            itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
            itemDisplay.materialInfoArr = itemObj.materialInfoArr;
            itemDisplay.setLightMapUrl(itemObj.lighturl);
            itemDisplay.scaleX = itemObj.scaleX;
            itemDisplay.scaleY = itemObj.scaleY;
            itemDisplay.scaleZ = itemObj.scaleZ;
            itemDisplay.x = itemObj.x;
            itemDisplay.y = itemObj.y;
            itemDisplay.z = itemObj.z;
            itemDisplay.rotationX = itemObj.rotationX;
            itemDisplay.rotationY = itemObj.rotationY;
            itemDisplay.rotationZ = itemObj.rotationZ;
            itemDisplay.isPerspective = itemObj.isPerspective;
            itemDisplay.type = 0;
            itemDisplay.id = itemObj.id;
            this._sceneDic["build" + itemObj.id] = itemDisplay;
            return itemDisplay;
        };
        SceneManager.prototype.getParticleSprite = function (itemObj) {
            var particle;
            particle = tl3d.ParticleManager.getInstance().getParticleByte(tl3d.Scene_data.fileRoot + itemObj.url);
            particle.scaleX = itemObj.scaleX;
            particle.scaleY = itemObj.scaleY;
            particle.scaleZ = itemObj.scaleZ;
            particle.x = itemObj.x;
            particle.y = itemObj.y;
            particle.z = itemObj.z;
            particle.rotationX = itemObj.rotationX;
            particle.rotationY = itemObj.rotationY;
            particle.rotationZ = itemObj.rotationZ;
            particle.type = 0;
            this._sceneDic["particle" + itemObj.id] = particle;
            return particle;
        };
        SceneManager.prototype.initScene = function () {
            //this._displayList.push(new GridLineSprite());
        };
        SceneManager.prototype.addDisplay = function ($display) {
            if (this._displayList.indexOf($display) != -1) {
                return;
            }
            this._displayList.push($display);
            $display.addStage();
        };
        SceneManager.prototype.removeDisplay = function ($display) {
            var index = this._displayList.indexOf($display);
            if (index != -1) {
                this._displayList.splice(index, 1);
            }
            $display.removeStage();
        };
        /**
         * 动态添加的staticMesh 物件例如武器等
        */
        SceneManager.prototype.addSpriteDisplay = function ($display) {
            if (this._displaySpriteList.indexOf($display) != -1) {
                return;
            }
            $display.addStage();
            for (var i = 0; i < this._displaySpriteList.length; i++) {
                if (this._displaySpriteList[i].materialUrl == $display.materialUrl) {
                    this._displaySpriteList.splice(i, 0, $display);
                    return;
                }
            }
            this._displaySpriteList.push($display);
        };
        SceneManager.prototype.removeSpriteDisplay = function ($display) {
            var index = this._displaySpriteList.indexOf($display);
            if (index != -1) {
                this._displaySpriteList.splice(index, 1);
            }
            $display.removeStage();
        };
        SceneManager.prototype.addMovieDisplayTop = function ($display) {
            this._displayRoleList.unshift($display);
            $display.addStage();
        };
        SceneManager.prototype.setParticleVisible = function () {
            var $arr = this._particleList;
            for (var i = 0; $arr && i < $arr.length; i++) {
                if (!$arr[i].dynamic && $arr[i].bindVecter3d) {
                    var dis = tl3d.Vector3D.distance(new tl3d.Vector3D(tl3d.Scene_data.focus3D.x, tl3d.Scene_data.focus3D.y, tl3d.Scene_data.focus3D.z), new tl3d.Vector3D($arr[i].x, $arr[i].y, $arr[i].z));
                    $arr[i].sceneVisible = (dis < 1000);
                }
            }
        };
        SceneManager.prototype.upFrame = function () {
            tl3d.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = tl3d.TimeUtil.getTimer(this.startTime);
            }
            this.updateMovieFrame();
            if (this._ready) {
                this.updateParticleTime();
                this.skillMgr.update();
                if (this.render) {
                    tl3d.Scene_data.context3D.setWriteDepth(true);
                    tl3d.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    this.shadowMgr.update();
                    tl3d.Scene_data.context3D.setWriteDepth(false);
                    this.updateParticles();
                    if (this.bloodMgr)
                        this.bloodMgr.update();
                    tl3d.Scene_data.context3D.setBlendParticleFactors(0);
                    tl3d.Scene_data.context3D.setWriteDepth(true);
                    tl3d.Scene_data.context3D.setWriteDepth(false);
                }
                tl3d.Scene_data.context3D.setDepthTest(false);
                tl3d.UIManager.getInstance().update();
                this.cameraMatrix = tl3d.Scene_data.cam3D.cameraMatrix.clone();
                this.viewMatrx3D = tl3d.Scene_data.viewMatrx3D.clone();
            }
        };
        SceneManager.prototype.updateFBO = function () {
            if (!tl3d.Scene_data.fbo) {
                tl3d.Scene_data.fbo = tl3d.Scene_data.context3D.getFBO();
            }
            if (this._displayList.length == 0) {
                return;
            }
            tl3d.Scene_data.context3D.updateFBO(tl3d.Scene_data.fbo);
            tl3d.Scene_data.viewMatrx3D.identity();
            tl3d.Scene_data.context3D.renderContext.viewport(0, 0, tl3d.FBO.fw, tl3d.FBO.fh);
            tl3d.Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(2, 1, 50, tl3d.Scene_data.camFar);
            tl3d.Scene_data.viewMatrx3D.appendScale(2, 2 * (tl3d.Scene_data.stageWidth / tl3d.Scene_data.stageHeight), 1);
            tl3d.MathClass.updateVp();
            this.updateStaticDiplay();
            tl3d.Engine.resetSize();
            tl3d.Scene_data.context3D.renderContext.bindFramebuffer(tl3d.Scene_data.context3D.renderContext.FRAMEBUFFER, null);
        };
        SceneManager.prototype.addDisplay2DList = function ($dis) {
            this._display2DList.push($dis);
        };
        SceneManager.prototype.mathCamFar = function () {
            var $p = new tl3d.Vector3D;
            var $far = 0;
            for (var i = 0; i < this._displayList.length; i++) {
                var $dis = this._displayList[i];
                if ($dis.sceneVisible && $dis.aabb) {
                    var $m = $dis.posMatrix.clone();
                    $m.append(tl3d.Scene_data.cam3D.cameraMatrix);
                    var $aabbVect = $dis.aabbVect;
                    for (var k = 0; k < $aabbVect.length; k++) {
                        $p = tl3d.Scene_data.cam3D.cameraMatrix.transformVector($aabbVect[k]);
                        if ($p.z > $far) {
                            $far = $p.z;
                        }
                    }
                    /*
                    if (this._displayList[i].objData) {
                    
                        for (var j: number = 0; j < $dis.objData.vertices.length/3; j++) {
                            $p.x = $dis.objData.vertices[j * 3 + 0]
                            $p.y = $dis.objData.vertices[j * 3 + 1]
                            $p.z = $dis.objData.vertices[j * 3 + 2]
                            $p = $dis.posMatrix.transformVector($p);
                            $p=Scene_data.cam3D.cameraMatrix.transformVector($p)
                            if ($p.z > $far) {
                                $far = $p.z
                            }
                        }
                    }
                    */
                }
            }
            tl3d.Scene_data.camFar = Math.max(500, $far + 100);
            tl3d.Engine.resetViewMatrx3D();
        };
        SceneManager.prototype.updateStaticDiplay = function () {
            var num = 0;
            for (var i = 0; i < this._displayList.length; i++) {
                this._displayList[i].update();
                // if (this._displayList[i].sceneVisible) {
                //     num++;
                // }
            }
            // FpsMc.tipStr = "drawNum:" + (num + this._displayRoleList.length) + "/" + this._displayList.length; 
        };
        SceneManager.prototype.updateStaticBind = function () {
            // for (var i: number = 0; i < this._displayList.length; i++) {
            //     this._displayList[i].updateBind();
            // }
        };
        SceneManager.prototype.updateSpriteDisplay = function () {
            for (var i = 0; i < this._displaySpriteList.length; i++) {
                this._displaySpriteList[i].update();
            }
        };
        SceneManager.prototype.updateMovieDisplay = function () {
            for (var i = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].update();
            }
            // if (this._displayRoleList.length) {
            //    Scene_data.context3D.setVa(0, 2, null); //如果有角色,在这里要将顶点置空  ->$$$ 需要优化。这里临时处理
            //    Scene_data.context3D.setVa(1, 2, null); //如果有角色,在这里要将顶点置空  ->$$$ 需要优化。这里临时处理
            //    Scene_data.context3D.setVa(2, 2, null); //如果有角色,在这里要将顶点置空  ->$$$ 需要优化。这里临时处理
            // }
        };
        SceneManager.prototype.updateMovieFrame = function () {
            var t = tl3d.TimeUtil.getTimer(this.startTime);
            var delay = t - this._time;
            this._time = t;
            for (var i = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].updateFrame(delay);
            }
            //  FpsMc.tipStr = "人数:" + (this._displayRoleList.length) 
        };
        SceneManager.prototype.changeBloodManager = function ($bloodManager) {
            this.bloodMgr = $bloodManager;
        };
        SceneManager.prototype.addMovieDisplay = function ($display) {
            $display._scene = this;
            this._displayRoleList.push($display);
            $display.addStage();
        };
        SceneManager.prototype.loadSceneConfigCom = function (obj) {
            //保持原来的角度
            var $rotationY = tl3d.Scene_data.focus3D.rotationY;
            this.loadSceneConfigCom2(obj);
            tl3d.Scene_data.focus3D.rotationY = tl3d.Scene_data.focus3D.rotationY;
        };
        SceneManager.prototype.clearStaticScene = function () {
            //清理角色
            for (var key in this._sceneDic) {
                var obj = this._sceneDic[key];
                if (obj instanceof tl3d.CombineParticle) {
                    this.removeParticle(obj);
                }
                if (obj instanceof tl3d.Display3DSprite) {
                    obj.removeStage();
                    obj.destory();
                }
            }
            this._ready = false;
            this._sceneDic = null;
            this._sceneQuadTree = null;
            this._displayList.length = 0;
            this.removeAllMovieDisplay();
            this._displayRoleList.length = 0;
            //清除所有特效（包含遗漏的）
            this.clearAllParticle();
            this._currentUrl = "";
        };
        SceneManager.prototype.playLyf = function ($url, $pos, $r, $scale) {
            var _this = this;
            if ($r === void 0) { $r = 20; }
            if ($scale === void 0) { $scale = 1; }
            this.groupDataMgr.getGroupData(tl3d.Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = tl3d.ParticleManager.getInstance().getParticleByte(tl3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationX = $r;
                        $particle.scaleX = $scale;
                        $particle.scaleY = $scale;
                        $particle.scaleZ = $scale;
                        _this.addParticle($particle);
                        $particle.addEventListener(tl3d.BaseEvent.COMPLETE, _this.onPlayCom, _this);
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        SceneManager.prototype.charPlaySkill = function ($char, $skillfile, $skilleff, $cb) {
            if ($skilleff === void 0) { $skilleff = "skill_01"; }
            if ($cb === void 0) { $cb = null; }
            if (!$char._scene.ready) {
                return;
            }
            var $skill = this.skillMgr.getSkill(getSkillUrl($skillfile), $skilleff);
            if (!$skill.keyAry) {
                return;
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            $skill.configFixEffect($char, $cb);
            this.skillMgr.playSkill($skill);
            return $skill;
        };
        SceneManager.prototype.removeCharSkill = function ($skill) {
            $skill.removeSkillForce();
        };
        //清除场景中所有的对象模型
        SceneManager.prototype.removeAllMovieDisplay = function () {
            while (this._displayRoleList.length > 0) {
                var display = this._displayRoleList.splice(0, 1);
                display[0].removeStage();
                display[0].destory();
            }
        };
        //移除场景对象
        SceneManager.prototype.removeMovieDisplay = function ($display) {
            if (!$display)
                return;
            var index = this._displayRoleList.indexOf($display);
            if (index != -1) {
                this._displayRoleList.splice(index, 1);
            }
            $display.removeStage();
            // $display.destory();
        };
        SceneManager.prototype.onPlayCom = function (value) {
            this.removeParticle((value.target));
        };
        SceneManager.prototype.updateParticles = function () {
            // for (var i: number = 0; i < this._particleList.length; i++) {
            //     this._particleList[i].update();
            // }
            this.updateRenderDic();
            this.clearPaticleVa();
        };
        SceneManager.prototype.clearPaticleVa = function () {
            tl3d.Scene_data.context3D.clearVa(2);
            tl3d.Scene_data.context3D.clearVa(3);
            tl3d.Scene_data.context3D.clearVa(4);
            tl3d.Scene_data.context3D.clearVa(5);
        };
        SceneManager.prototype.setParticleHide = function () {
            for (var i = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].dynamic) {
                    //  this._particleList[i].sceneVisible = false;
                }
            }
        };
        Object.defineProperty(SceneManager.prototype, "particleList", {
            get: function () {
                return this._particleList;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.updateParticleTime = function () {
            var _tempTime = tl3d.TimeUtil.getTimer(this.startTime);
            if (this._particletime == 0) { //开始
                this._particletime = _tempTime;
            }
            var t = _tempTime - this._particletime;
            this._particletime = _tempTime;
            for (var i = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].sceneVisible) {
                    continue;
                }
                this._particleList[i].updateTime(t);
            }
        };
        SceneManager.prototype.addRenderDic = function ($particle) {
            var url = $particle.url;
            if (!this.renderDic[url]) {
                this.renderDic[url] = new Array;
            }
            this.renderDic[url].push($particle);
        };
        SceneManager.prototype.removeRenderDic = function ($particle) {
            var url = $particle.url;
            var indexs = this.renderDic[url].indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this.renderDic[url].splice(indexs, 1);
            if (this.renderDic[url].length == 0) {
                delete this.renderDic[url];
            }
        };
        SceneManager.prototype.updateRenderDic = function () {
            for (var key in this.renderDic) {
                var list = this.renderDic[key];
                if (list.length == 1) {
                    list[0].update();
                }
                else {
                    var size = list[0].size;
                    for (var j = 0; j < size; j++) {
                        for (var i = 0; i < list.length; i++) {
                            list[i].updateItem(j);
                        }
                    }
                }
            }
        };
        SceneManager.prototype.addParticle = function ($particle) {
            if (this._particleList.lastIndexOf($particle) != -1) {
                return;
            }
            this._particleList.push($particle);
            this.addRenderDic($particle);
        };
        SceneManager.prototype.removeParticle = function ($particle) {
            var indexs = this._particleList.indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this._particleList.splice(indexs, 1);
            this.removeRenderDic($particle);
            $particle.reset();
        };
        SceneManager.prototype.clearAllParticle = function () {
            this._particletime = 0;
            while (this._particleList && this._particleList.length > 0) {
                var particle = this._particleList.pop();
                this.removeRenderDic(particle);
                particle.reset();
            }
        };
        return SceneManager;
    }());
    tl3d.SceneManager = SceneManager;
})(tl3d || (tl3d = {}));
