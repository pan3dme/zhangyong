/**
* name
*/
var game;
(function (game) {
    var LIMITTIMETYPE;
    (function (LIMITTIMETYPE) {
        LIMITTIMETYPE[LIMITTIMETYPE["DEL"] = 0] = "DEL";
        LIMITTIMETYPE[LIMITTIMETYPE["ADD"] = 1] = "ADD";
    })(LIMITTIMETYPE = game.LIMITTIMETYPE || (game.LIMITTIMETYPE = {}));
    var EQUTYPE;
    (function (EQUTYPE) {
        EQUTYPE[EQUTYPE["DEL"] = 0] = "DEL";
        EQUTYPE[EQUTYPE["ADD"] = 1] = "ADD";
        EQUTYPE[EQUTYPE["MODIFY"] = 2] = "MODIFY";
    })(EQUTYPE = game.EQUTYPE || (game.EQUTYPE = {}));
    var TABTYPE;
    (function (TABTYPE) {
        TABTYPE[TABTYPE["HERO"] = 0] = "HERO";
        TABTYPE[TABTYPE["SUIPIAN"] = 1] = "SUIPIAN";
        TABTYPE[TABTYPE["CAILIAO"] = 2] = "CAILIAO";
        TABTYPE[TABTYPE["EQU"] = 3] = "EQU";
        TABTYPE[TABTYPE["TREASURE"] = 4] = "TREASURE";
    })(TABTYPE = game.TABTYPE || (game.TABTYPE = {}));
    var BagModel = /** @class */ (function () {
        function BagModel() {
        }
        BagModel.getInstance = function () {
            if (!BagModel._instance) {
                BagModel._instance = new BagModel();
            }
            return BagModel._instance;
        };
        /**
         * 计算品质数量
         * @param data
         */
        BagModel.prototype.countQuality = function (data) {
            var white = 0;
            var green = 0;
            var blue = 0;
            var purple = 0;
            for (var i = 0; i < data.length; i++) {
                var itemvo = data[i];
                if (itemvo.godId && itemvo.godId != "")
                    continue;
                switch (itemvo.quality) {
                    case QualityConst.WHITE:
                        white++;
                        break;
                    case QualityConst.GREEN:
                        green++;
                        break;
                    case QualityConst.BLUE:
                        blue++;
                        break;
                    case QualityConst.PURPLE:
                        purple++;
                        break;
                }
            }
            return [white, green, blue, purple];
        };
        BagModel.prototype.getAllSuipian = function () {
            var tempAry = new Array;
            var tempAllItem = tb.TB_item.get_TB_item("type", "6");
            for (var i = 0; i < tempAllItem.length; i++) {
                if (tempAllItem[i].type == 6) {
                    tempAry.push(tempAllItem[i]);
                }
            }
            return tempAry;
        };
        BagModel.prototype.getListByType = function ($type) {
            var tempary = [];
            if ($type == TABTYPE.HERO) {
            }
            else if ($type == TABTYPE.EQU) {
                //装备
                tempary = this.getEquList();
            }
            else if ($type == TABTYPE.SUIPIAN) {
                //碎片
                tempary = this.getBagObjByType(iface.tb_prop.itemTypeKey.chip);
                this.sortBagObj(tempary);
            }
            else if ($type == TABTYPE.CAILIAO) {
                //消耗
                tempary = this.getBagObjByType(iface.tb_prop.itemTypeKey.gift);
                tempary = tempary.concat(this.getBagObjByType(iface.tb_prop.itemTypeKey.optionalCard));
                tempary = tempary.concat(this.getBagTimeObj());
                //材料
                tempary = tempary.concat(this.getBagObjByType(iface.tb_prop.itemTypeKey.materials));
                // 宝石
                tempary = tempary.concat(this.getBagObjByType(iface.tb_prop.itemTypeKey.gemstone));
                this.sortBagObj(tempary);
            }
            else if ($type == TABTYPE.TREASURE) {
            }
            return this.changeArry(tempary);
        };
        /**
         * 将数组转换成所需要的特殊list显示项的结构
         * @param needArry
         */
        BagModel.prototype.changeArry = function (needArry) {
            var ary = new Array;
            //初始化序号和选择项
            for (var j = 0; j < needArry.length; j++) {
                var element = needArry[j];
                element.selectid = -1;
                element.indexid = j;
            }
            //一维数组转二维数组的方法
            var len = needArry.length;
            var n = BagModel.line_num; //假设每行显示6个
            var lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
            for (var i = 0; i < lineNum; i++) {
                // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                var temp = needArry.slice(i * n, i * n + n);
                ary.push(temp);
            }
            return ary;
        };
        BagModel.prototype.getBagObjByType = function ($type) {
            var ary = new Array;
            var reslist = this.getBagObj();
            for (var i = 0; i < reslist.length; i++) {
                var element = reslist[i];
                if (element.type == $type) {
                    ary.push(element);
                }
            }
            this.sortBagObj(ary);
            return ary;
        };
        BagModel.prototype.insertResVo = function (key, val, lvStr) {
            var itemtb = tb.TB_item.get_TB_itemById(key);
            if (itemtb && itemtb.type != iface.tb_prop.itemTypeKey.resource && val != 0) {
                var vo = App.hero.createItemVo(val, key);
                vo.show = false;
                vo.bag = true;
                vo.countFromBag = true;
                vo.lvStr = lvStr;
                this._resList.push(vo);
            }
        };
        BagModel.prototype.getBagObj = function () {
            if (this._resList) {
                return this._resList;
            }
            this._resList = new Array;
            var tempObj = App.hero.bagItemsObj;
            for (var i in tempObj) {
                var num = tempObj[i];
                this.insertResVo(Number(i), num);
            }
            // 宝石
            this.updateGemstones();
            return this._resList;
        };
        /**
         * 更新背包里的对象数据  -- 新增的需要通过这个入口区添加
         * @param key
         * @param value
         */
        BagModel.prototype.updateBagObj = function ($key, $value) {
            if (!this._resList) {
                return;
            }
            //如果有找到
            for (var i = 0; i < this._resList.length; i++) {
                var element = this._resList[i];
                if (element.id == $key) {
                    if ($value <= 0) {
                        //移除
                        this._resList.splice(i, 1);
                    }
                    else {
                        element.count = $value;
                    }
                    return;
                }
            }
            //如果没找到
            this.insertResVo($key, $value);
        };
        /** 更新宝石数据 */
        BagModel.prototype.updateGemstones = function () {
            if (!this._resList) {
                return;
            }
            var len = this._resList.length;
            var model = game.GemstoneModel.getInstance();
            var curGems = [];
            for (var i = len - 1; i >= 0; i--) {
                var itemVo = this._resList[i];
                if (itemVo.type == iface.tb_prop.itemTypeKey.gemstone) {
                    // 该宝石
                    var gemVo = model.getGemstoneByTbID(itemVo.id);
                    if (!gemVo || gemVo.num <= 0) {
                        this._resList.splice(i, 1);
                    }
                    else {
                        itemVo.count = gemVo.num;
                        curGems.push(itemVo.id);
                    }
                }
            }
            var gemsObj = App.hero.gemstones;
            for (var key in gemsObj) {
                var svo = gemsObj[key];
                var tbItem = tb.TB_item.get_TB_itemById(svo.templateId);
                var tbGem = tbItem ? tb.TB_gemstone_new.getTBOneById(tbItem.defined[0]) : null;
                // 未镶嵌 
                if (tbGem && !svo.godId && svo.num > 0 && curGems.indexOf(svo.templateId) == -1) {
                    this.insertResVo(svo.templateId, svo.num, "Lv." + tbGem.getLevel());
                }
            }
        };
        BagModel.prototype.getBagTimeObj = function () {
            if (this._timeresList) {
                return this._timeresList;
            }
            this._timeresList = new Array;
            var bagTimeItemsObj = App.hero.bagTimeItemsObj;
            for (var i in bagTimeItemsObj) {
                var obj = bagTimeItemsObj[i];
                this.insertLimitTimeResVo(Number(i), obj);
            }
            return this._timeresList;
        };
        BagModel.prototype.insertLimitTimeResVo = function (key, val) {
            var itemtb = tb.TB_item.get_TB_itemById(Number(val.templateId));
            if (itemtb) {
                var vo = new LimitItemVo(key, Number(val.limitTime), itemtb.ID, 1, itemtb.type);
                vo.show = false;
                vo.bag = true;
                this._timeresList.push(vo);
            }
        };
        BagModel.prototype.updateLimitTimeRes = function ($uuid, $type, obj) {
            if (!this._timeresList) {
                return;
            }
            if ($type == LIMITTIMETYPE.ADD) {
                this.insertLimitTimeResVo($uuid, obj);
                return;
            }
            if ($type == LIMITTIMETYPE.DEL) {
                for (var i = 0; i < this._timeresList.length; i++) {
                    var vo = this._timeresList[i];
                    if (vo.uuid == $uuid) {
                        this._timeresList.splice(i, 1);
                        break;
                    }
                }
            }
        };
        BagModel.prototype.updateEquObj = function ($key, $type, vo) {
            if (!this._queList) {
                return;
            }
            if ($type == EQUTYPE.ADD) {
                vo.bag = true;
                this._queList.push(vo);
                return;
            }
            for (var i = 0; i < this._queList.length; i++) {
                var element = this._queList[i];
                if (element.uuid == $key) {
                    if ($type == EQUTYPE.DEL) {
                        this._queList.splice(i, 1);
                        break;
                    }
                    else if ($type == EQUTYPE.MODIFY) {
                        if (vo) {
                            this._queList.splice(i, 1, vo);
                        }
                        break;
                    }
                }
            }
        };
        BagModel.prototype.getEquList = function () {
            var tempary = this.getNoEquObj();
            tempary.sort(function (a, b) {
                return a.quality - b.quality;
            });
            // this.sortEquObj(tempary);
            return tempary;
        };
        /**
         * 剔除已穿戴装备
         */
        BagModel.prototype.getNoEquObj = function () {
            var ary = new Array;
            var list = this.getEquObj();
            for (var i = 0; i < list.length; i++) {
                var element = list[i];
                if (!element.isExsitGod()) {
                    ary.push(element);
                }
            }
            return ary;
        };
        BagModel.prototype.getEquObj = function () {
            if (this._queList) {
                this.sortEquObj(this._queList);
                return this._queList;
            }
            this._queList = App.hero.getEquips(0, true);
            for (var i = 0; i < this._queList.length; i++) {
                this._queList[i].bag = true;
            }
            return this._queList;
        };
        BagModel.prototype.sortBagObj = function (list) {
            list.sort(function (a, b) {
                var neednuma = a.using.length > 0 && Number(a.using[0]) == 1 ? Number(a.using[1]) : 1;
                var neednumb = b.using.length > 0 && Number(b.using[0]) == 1 ? Number(b.using[1]) : 1;
                var a_red = App.hero.getBagItemNum(a.id) >= neednuma;
                var b_red = App.hero.getBagItemNum(b.id) >= neednumb;
                if (a_red == b_red) {
                    // if (a.using.length > 0 && b.using.length > 0) {
                    if (a.type == b.type) {
                        return a.id - b.id;
                    }
                    else {
                        var atype = a.type == 2 ? 100 : a.type == 10 ? 90 : a.type;
                        var btype = b.type == 2 ? 100 : b.type == 10 ? 90 : b.type;
                        return btype - atype;
                    }
                    // }else{
                    // 	return b.using.length - a.using.length;
                    // }
                }
                else {
                    return a_red ? -1 : 1;
                }
            });
        };
        BagModel.prototype.sortEquObj = function (list) {
            //品质、强化等级、精练等级排序
            list.sort(function (a, b) {
                //如果已装备，往前排
                var aexsit = a.isExsitGod();
                var bexsit = b.isExsitGod();
                if (aexsit == bexsit) {
                    if (a.tab_item.quality == b.tab_item.quality) {
                        if (a.strengthLv == b.strengthLv) {
                            return b.refineLv - a.refineLv;
                        }
                        else {
                            return b.strengthLv - a.strengthLv;
                        }
                    }
                    else {
                        return b.tab_item.quality - a.tab_item.quality;
                    }
                }
                else {
                    return aexsit ? -1 : 1;
                }
            });
        };
        BagModel.line_num = 5;
        // bag_group_all
        BagModel.bagTypeName = ["", "bag_group_suipian", "bag_group_cailiao", "bag_group_zhuangbei", ""];
        return BagModel;
    }());
    game.BagModel = BagModel;
})(game || (game = {}));
