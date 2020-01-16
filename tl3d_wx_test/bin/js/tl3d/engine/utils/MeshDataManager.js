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
var tl3d;
(function (tl3d) {
    var MeshDataManager = /** @class */ (function (_super) {
        __extends(MeshDataManager, _super);
        function MeshDataManager() {
            var _this = _super.call(this) || this;
            _this._loadDic = new Object();
            return _this;
        }
        MeshDataManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new MeshDataManager();
            }
            return this._instance;
        };
        MeshDataManager.prototype.getMeshData = function ($url, $fun, $batchNum) {
            var _this = this;
            if ($batchNum === void 0) { $batchNum = 1; }
            if (this._dic[$url] && this._dic[$url].ready) {
                $fun(this._dic[$url]);
                this._dic[$url].useNum++;
                return;
            }
            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);
            this.loadRoleRes(tl3d.Scene_data.fileRoot + $url, function ($roleRes) {
                _this.roleResCom($roleRes, $fun);
            }, $batchNum);
        };
        //加载角色
        MeshDataManager.prototype.loadRoleRes = function (url, $fun, $meshBatchNum) {
            var roleRes = new tl3d.RoleRes();
            roleRes.meshBatchNum = $meshBatchNum;
            roleRes.load(url, function () {
                $fun(roleRes);
            });
        };
        MeshDataManager.prototype.roleResCom = function ($roleRes, $fun) {
            var url = $roleRes.roleUrl;
            var skinMesh = this._dic[url];
            skinMesh.loadMaterial();
            //skinMesh.loadParticle();
            skinMesh.setAction($roleRes.actionAry, url);
            skinMesh.url = url;
            if ($roleRes.ambientLightColor) {
                skinMesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
                    [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
                    [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
            }
            for (var i = 0; i < this._loadDic[url].length; i++) {
                this._loadDic[url][i](skinMesh);
                skinMesh.useNum++;
            }
            delete this._loadDic[url];
            skinMesh.ready = true;
            //this._dic[$roleRes.roleUrl] = skinMesh;
            //$fun(skinMesh);
            //var meshUrl: string = $roleRes.roleUrl;
            //MeshDataManager.getInstance().getMeshData(meshUrl, ($skinMesh: SkinMesh) => {
            //    if ($batchNum != 1) {
            //        $roleRes.type = 1;
            //    }
            //    for (var key in this._animDic) {
            //        this.processAnimByMesh(this._animDic[key]);
            //    }
            //    $skinMesh.loadMaterial(($m: Material) => { this.loadMaterialCom($m) });
            //    $skinMesh.loadParticle(this);
            //    this.fileScale = $skinMesh.fileScale;
            //}, $batchNum);
            //var actionAry: Array<string> = this._roleRes.actionAry;
            //for (var i: number = 0; i < actionAry.length; i++) {
            //    this.addAction(actionAry[i], this._roleRes.roleUrl + actionAry[i]);
            //}
        };
        MeshDataManager.prototype.readData = function (byte, $batchNum, $url, $version) {
            var $skinMesh = new tl3d.SkinMesh();
            $skinMesh.fileScale = byte.readFloat();
            if ($version >= 19) {
                $skinMesh.tittleHeight = byte.readFloat();
            }
            else {
                $skinMesh.tittleHeight = 50;
            }
            $skinMesh.hitBox = new tl3d.Vector2D(20, 20);
            if ($version >= 23) {
                $skinMesh.hitBox.x = byte.readFloat();
                $skinMesh.hitBox.y = byte.readFloat();
            }
            $skinMesh.makeHitBoxItem();
            var meshNum = byte.readInt();
            var allParticleDic = new Object;
            for (var i = 0; i < meshNum; i++) {
                var meshData = new tl3d.MeshData;
                if ($version >= 35) {
                    meshData.bindPosAry = this.readBindPosByte(byte);
                    meshData.getBindPosMatrix();
                }
                if ($version >= 21) {
                    this.readMesh2OneBuffer(byte, meshData);
                }
                else {
                    tl3d.BaseRes.readFloatTwoByte(byte, meshData.vertices);
                    tl3d.BaseRes.readFloatTwoByte(byte, meshData.tangents);
                    tl3d.BaseRes.readFloatTwoByte(byte, meshData.bitangents);
                    tl3d.BaseRes.readFloatTwoByte(byte, meshData.normals);
                    tl3d.BaseRes.readFloatTwoByte(byte, meshData.uvs);
                    tl3d.BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
                    tl3d.BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);
                    tl3d.BaseRes.readIntForTwoByte(byte, meshData.indexs);
                    tl3d.BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
                    this.uploadMesh(meshData);
                }
                meshData.treNum = meshData.indexs.length;
                // if ($batchNum != 1) {
                //     this.cloneMeshData(meshData, $batchNum);
                // }
                meshData.materialUrl = byte.readUTF();
                meshData.materialParamData = tl3d.BaseRes.readMaterialParamData(byte);
                var particleNum = byte.readInt();
                for (var j = 0; j < particleNum; j++) {
                    var bindParticle = new tl3d.BindParticle(byte.readUTF(), byte.readUTF());
                    meshData.particleAry.push(bindParticle);
                    allParticleDic[bindParticle.url] = true;
                }
                $skinMesh.addMesh(meshData);
            }
            for (var key in allParticleDic) {
                tl3d.ParticleManager.getInstance().registerUrl(key);
            }
            $skinMesh.allParticleDic = allParticleDic;
            if ($version < 35) { //多个MESH出错后情况
                var bindPosAry = this.readBindPosByte(byte);
                for (var w = 0; w < $skinMesh.meshAry.length; w++) {
                    $skinMesh.meshAry[w].bindPosAry = bindPosAry;
                    $skinMesh.meshAry[w].getBindPosMatrix();
                }
            }
            var sokcetLenght = byte.readInt();
            $skinMesh.boneSocketDic = new Object();
            for (var j = 0; j < sokcetLenght; j++) {
                var boneData = new tl3d.BoneSocketData();
                boneData.name = byte.readUTF();
                boneData.boneName = byte.readUTF();
                boneData.index = byte.readInt();
                boneData.x = byte.readFloat();
                boneData.y = byte.readFloat();
                boneData.z = byte.readFloat();
                boneData.rotationX = byte.readFloat();
                boneData.rotationY = byte.readFloat();
                boneData.rotationZ = byte.readFloat();
                $skinMesh.boneSocketDic[boneData.name] = boneData;
            }
            this._dic[$url] = $skinMesh;
            return $skinMesh;
        };
        MeshDataManager.prototype.readBindPosByte = function (byte) {
            var bindPosLength = byte.readInt();
            var bindPosAry = new Array;
            for (var j = 0; j < bindPosLength; j++) {
                var ary = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat());
                bindPosAry.push(ary);
            }
            return bindPosAry;
        };
        MeshDataManager.prototype.readMesh2OneBuffer = function (byte, meshData) {
            var len = byte.readInt();
            var typeItem = new Array;
            var dataWidth = 0;
            for (var i = 0; i < 5; i++) {
                var tf = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    if (i == 1) {
                        dataWidth += 2;
                    }
                    else {
                        dataWidth += 3;
                    }
                }
            }
            dataWidth += 8;
            len *= dataWidth * 4;
            var uvsOffsets = 3; // 1
            var normalsOffsets = uvsOffsets + 2; // 2
            var tangentsOffsets = normalsOffsets + 3; //3
            var bitangentsOffsets = tangentsOffsets + 3; //4
            var boneIDOffsets;
            if (typeItem[2]) { //normal
                if (typeItem[4]) {
                    boneIDOffsets = bitangentsOffsets + 3;
                }
                else {
                    boneIDOffsets = normalsOffsets + 3;
                }
            }
            else {
                boneIDOffsets = uvsOffsets + 2;
            }
            var boneWeightOffsets = boneIDOffsets + 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2); //boneIDAry
            tl3d.BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1); //boneWeightAry
            // BaseRes.readFloatTwoByte(byte, meshData.vertices);
            // BaseRes.readFloatTwoByte(byte, meshData.uvs);
            // BaseRes.readFloatTwoByte(byte, meshData.normals);
            // BaseRes.readFloatTwoByte(byte, meshData.tangents);
            // BaseRes.readFloatTwoByte(byte, meshData.bitangents);
            // BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
            // BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);
            tl3d.BaseRes.readIntForTwoByte(byte, meshData.indexs);
            tl3d.BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
            meshData.compressBuffer = true;
            meshData.uvsOffsets = uvsOffsets * 4;
            meshData.normalsOffsets = normalsOffsets * 4;
            meshData.tangentsOffsets = tangentsOffsets * 4;
            meshData.bitangentsOffsets = bitangentsOffsets * 4;
            meshData.boneIDOffsets = boneIDOffsets * 4;
            meshData.boneWeightOffsets = boneWeightOffsets * 4;
            meshData.stride = dataWidth * 4;
            meshData.vertexBuffer = tl3d.Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = tl3d.Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);
        };
        MeshDataManager.prototype.cloneMeshData = function (meshData, num) {
            var vertices = meshData.vertices;
            var normals = meshData.normals;
            var uvs = meshData.uvs;
            var bonetIDAry = meshData.boneIDAry;
            var boneWeightAry = meshData.boneWeightAry;
            var indexs = meshData.indexs;
            meshData.vertices = new Array;
            meshData.normals = new Array;
            meshData.uvs = new Array;
            meshData.boneIDAry = new Array;
            meshData.boneWeightAry = new Array;
            meshData.indexs = new Array;
            var vesNum = vertices.length / 3;
            for (var i = 0; i < num; i++) {
                meshData.vertices = meshData.vertices.concat(vertices);
                meshData.normals = meshData.normals.concat(normals);
                meshData.boneIDAry = meshData.boneIDAry.concat(bonetIDAry);
                meshData.boneWeightAry = meshData.boneWeightAry.concat(boneWeightAry);
                for (var j = 0; j < uvs.length; j += 2) {
                    meshData.uvs.push(uvs[j], uvs[j + 1], i);
                }
                for (var j = 0; j < indexs.length; j++) {
                    meshData.indexs.push(indexs[j] + i * vesNum);
                }
            }
            meshData.treNum = meshData.indexs.length;
        };
        MeshDataManager.prototype.uploadMesh = function ($mesh) {
            $mesh.vertexBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.vertices);
            $mesh.uvBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.uvs);
            $mesh.boneIdBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.boneIDAry);
            $mesh.boneWeightBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.boneWeightAry);
            $mesh.indexBuffer = tl3d.Scene_data.context3D.uploadIndexBuff3D($mesh.indexs);
        };
        MeshDataManager.prototype.uploadPbrMesh = function ($mesh, $useNormal) {
            $mesh.normalsBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.normals);
            if ($useNormal) {
                $mesh.tangentBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.tangents);
                $mesh.bitangentBuffer = tl3d.Scene_data.context3D.uploadBuff3D($mesh.bitangents);
            }
        };
        MeshDataManager.prototype.preLoad = function ($url) {
            this.getMeshData($url, function ($skinMesh) {
                $skinMesh.loadMaterial();
            });
        };
        return MeshDataManager;
    }(tl3d.ResGC));
    tl3d.MeshDataManager = MeshDataManager;
})(tl3d || (tl3d = {}));
