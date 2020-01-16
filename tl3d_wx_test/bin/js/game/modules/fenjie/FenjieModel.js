/**
* FenjieModel
*/
var game;
(function (game) {
    var FenjieModel = /** @class */ (function () {
        function FenjieModel() {
            /** 临时返还材料数据 */
            this.tempReturnData = {};
        }
        FenjieModel.getInstance = function () {
            if (!FenjieModel._instance) {
                FenjieModel._instance = new FenjieModel();
            }
            return FenjieModel._instance;
        };
        /** 请求返还材料数据 */
        FenjieModel.prototype.requestReturnList = function (godList) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (godList.length == 0) {
                    resolve([]);
                    return;
                }
                // 没缓存列表
                var ids = [];
                for (var i = 0; i < godList.length; i++) {
                    var godVo = godList[i];
                    if (!_this.tempReturnData.hasOwnProperty(godVo.uuid)) {
                        ids.push(godVo.uuid);
                    }
                }
                if (ids.length == 0) {
                    resolve(_this.getReturnList(godList, [], true));
                    return;
                }
                var onlyId = ids.length == 1 ? ids[0] : "";
                var args = {};
                args[Protocol.game_god_queryResolve.args.rsvIds] = ids;
                PLC.request(Protocol.game_god_queryResolve, args, function (data) {
                    if (!data)
                        return;
                    var list = [];
                    for (var _i = 0, _a = data['resolveItem']; _i < _a.length; _i++) {
                        var ary = _a[_i];
                        list.push(new ItemVo(ary[0], ary[1]));
                    }
                    // 只请求一个，缓存起来
                    if (onlyId != "") {
                        _this.tempReturnData[onlyId] = list;
                        resolve(_this.getReturnList(godList, [], true));
                    }
                    else {
                        resolve(_this.getReturnList(godList, list, false));
                    }
                });
            });
        };
        /** 获取返还材料数据 */
        FenjieModel.prototype.getReturnList = function (gods, itemList, fromCache) {
            var list = [];
            if (fromCache) {
                var itemObj = {};
                for (var _i = 0, gods_1 = gods; _i < gods_1.length; _i++) {
                    var obj = gods_1[_i];
                    var tempList = this.tempReturnData[obj.uuid];
                    if (!tempList || tempList.length == 0)
                        continue;
                    for (var _a = 0, tempList_1 = tempList; _a < tempList_1.length; _a++) {
                        var itemVo = tempList_1[_a];
                        if (!itemObj.hasOwnProperty(itemVo.id)) {
                            itemObj[itemVo.id] = 0;
                        }
                        itemObj[itemVo.id] += itemVo.count;
                    }
                }
                itemList = [];
                for (var key in itemObj) {
                    itemList.push(new ItemVo(Number(key), Number(itemObj[key])));
                }
            }
            if (itemList && itemList.length > 0) {
                list.push.apply(list, itemList);
            }
            var gemDic = {};
            // 装备放后
            for (var _b = 0, gods_2 = gods; _b < gods_2.length; _b++) {
                var obj = gods_2[_b];
                var arrEquip = obj.getEquipItems();
                for (var _c = 0, arrEquip_1 = arrEquip; _c < arrEquip_1.length; _c++) {
                    var obj_1 = arrEquip_1[_c];
                    var equip = App.hero.getEquipByuuid(obj_1);
                    equip.show = true;
                    equip.type = 2;
                    list.push(equip);
                }
                var gemsList = obj.gemsList;
                for (var _d = 0, gemsList_1 = gemsList; _d < gemsList_1.length; _d++) {
                    var gemVo = gemsList_1[_d];
                    if (!gemDic[gemVo.templateId]) {
                        gemDic[gemVo.templateId] = 0;
                    }
                    gemDic[gemVo.templateId]++;
                }
            }
            for (var id in gemDic) {
                list.push(new ItemVo(Number(id), gemDic[id]));
            }
            return list;
        };
        return FenjieModel;
    }());
    game.FenjieModel = FenjieModel;
})(game || (game = {}));
