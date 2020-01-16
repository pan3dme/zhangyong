var game;
(function (game) {
    var ShopModel = /** @class */ (function () {
        function ShopModel() {
            this._shopMap = new Laya.Dictionary();
            /** 集市数组 */
            this._jishiList = [];
        }
        ShopModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ShopModel();
            }
            return this._instance;
        };
        ShopModel.prototype.initModel = function () {
            //type == 类型枚举 == 表中字段
            this._ShopData = [
                { name: LanMgr.getLan("", 12153), sysId: ModuleConst.JISHI, type: ShopType.jishi, speak: LanMgr.getLan("", 12161) },
                { name: LanMgr.getLan("", 12154), sysId: ModuleConst.SHOP, type: ShopType.shangcheng, speak: LanMgr.getLan("", 12162) },
                { name: LanMgr.getLan("", 12155), sysId: ModuleConst.JINGJI, type: ShopType.jingjichang, speak: LanMgr.getLan("", 12163) },
                { name: LanMgr.getLan("", 12156), sysId: ModuleConst.GONGHUI, type: ShopType.guild, speak: LanMgr.getLan("", 12164) },
                { name: LanMgr.getLan("", 12157), sysId: ModuleConst.SHENMEN, type: ShopType.shenjie, speak: LanMgr.getLan("", 12165) },
                { name: LanMgr.getLan("", 12158), sysId: ModuleConst.EXPEDITION, type: ShopType.yuanzheng, speak: LanMgr.getLan("", 12166) },
                { name: LanMgr.getLan("", 12159), sysId: ModuleConst.GLORY_FIGHT, type: ShopType.rongyao, speak: LanMgr.getLan("", 12167) },
                { name: LanMgr.getLan("", 12160), sysId: ModuleConst.GOD_DOMAIN, type: ShopType.godDm, speak: LanMgr.getLan("", 12168) }
            ];
        };
        ShopModel.prototype.getTabs = function () {
            var ary = [];
            for (var k = 0; k < this._ShopData.length; k++) {
                var vo = this._ShopData[k];
                if (App.IsSysOpen(Number(vo['sysId']))) {
                    if (ShopType.guild == vo['type'] && !game.GuildModel.getInstance().isHasGuild()) {
                        continue;
                    }
                    ary.push(vo);
                }
            }
            return ary;
        };
        ShopModel.prototype.findShopDataByType = function (type) {
            return this.getTabs().find(function (vo) {
                return Number(vo['type']) == type;
            });
        };
        ShopModel.prototype.isOpenByType = function (type) {
            var vo = this.findShopDataByType(type);
            if (ShopType.guild == vo.type) {
                return App.IsSysOpen(vo.sysId) && game.GuildModel.getInstance().isHasGuild();
            }
            return App.IsSysOpen(vo.sysId);
        };
        Object.defineProperty(ShopModel.prototype, "shopMap", {
            get: function () {
                return this._shopMap;
            },
            set: function ($value) {
                this._shopMap = $value;
            },
            enumerable: true,
            configurable: true
        });
        /** 请求商品 */
        ShopModel.prototype.requestShopList = function (type) {
            var _this = this;
            return new Promise(function (resolve) {
                if (_this._shopMap.get(type)) {
                    resolve();
                }
                else {
                    var arg = {};
                    arg[Protocol.game_shop_list.args.type] = type;
                    PLC.request(Protocol.game_shop_list, arg, function ($data) {
                        if (!$data) {
                            resolve();
                            return;
                        }
                        var ary = [];
                        for (var _i = 0, _a = $data.shopList; _i < _a.length; _i++) {
                            var _b = _a[_i], id = _b.id, count = _b.count;
                            ary.push(new game.ShopItemVo(id, count));
                        }
                        ary.sort(function (a, b) {
                            return a.tbGoods.rank - b.tbGoods.rank;
                        });
                        _this._shopMap.set(type, ary);
                        resolve();
                    });
                }
            });
        };
        /** 请求集市商品 */
        ShopModel.prototype.requestJishiList = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var needRequest = _this._jishiList.length <= 0;
                if (needRequest) {
                    PLC.request(Protocol.game_market_list, {}, function ($data) {
                        if (!$data) {
                            resolve();
                            return;
                        }
                        _this._jishiList = [];
                        for (var i = 0; i < $data.marketList.length; i++) {
                            _this._jishiList.push(new game.JishiItemVo(i, $data.marketList[i].id, $data.marketList[i].count, $data.marketList[i].price, $data.marketList[i].itemInfo));
                        }
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        };
        /** 获取商品列表
         * @param type 商店类型
        */
        ShopModel.prototype.getShopListByType = function (type) {
            if (type == ShopType.jishi)
                return this.getJiShiList();
            var ary = this._shopMap.get(type);
            return ary ? ary : [];
        };
        /**获取集市商品 */
        ShopModel.prototype.getJiShiList = function () {
            return this._jishiList ? this._jishiList : [];
        };
        /**通过物品id获取商品
         * @param id 物品id
         * @param type 商店类型
         */
        ShopModel.prototype.getGoodsById = function (id, type) {
            var list = this.getShopListByType(type);
            return list.find(function (vo) {
                return vo.id == id;
            });
        };
        /**通过种族id获取商品
         * @param race 种族
         * @param type 商店类型
         */
        ShopModel.prototype.getGoodsByRace = function (race, type) {
            var list = this.getShopListByType(type);
            if (race == 0)
                return list;
            return list.filter(function (vo) {
                return vo.tbGoods.label == race;
            });
        };
        /** 通过商品id获取到商城的限购次数 */
        ShopModel.prototype.getLimitNumById = function (type, id) {
            var list = this.getShopListByType(type);
            var good = list.find(function (vo) {
                return vo.id == id;
            });
            return good.tbGoods.num - good.count;
        };
        /** 获取资源类型
         * @param type 商店类型
         */
        ShopModel.prototype.getResType = function (type) {
            switch (type) {
                case ShopType.shangcheng:
                    return;
                case ShopType.jishi:
                    return;
                case ShopType.jingjichang:
                    return iface.tb_prop.resTypeKey.arena;
                case ShopType.guild:
                    return iface.tb_prop.resTypeKey.guildDonate;
                case ShopType.yuanzheng:
                    return iface.tb_prop.resTypeKey.darkEssence;
                case ShopType.shenjie:
                    return iface.tb_prop.resTypeKey.godCrystal;
                case ShopType.rongyao:
                    return iface.tb_prop.resTypeKey.honour;
                case ShopType.godDm:
                    return iface.tb_prop.resTypeKey.godDomain;
            }
            return;
        };
        return ShopModel;
    }());
    game.ShopModel = ShopModel;
})(game || (game = {}));
