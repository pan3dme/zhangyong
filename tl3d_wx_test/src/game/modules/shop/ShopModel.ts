module game {
	export class ShopModel {

		constructor() { }
		private static _instance: ShopModel;
		public static getInstance(): ShopModel {
			if (!this._instance) {
				this._instance = new ShopModel();
			}
			return this._instance;
		}

		private _ShopData: Array<Object>;
		initModel(): void {
			//type == 类型枚举 == 表中字段
			this._ShopData = [
				{ name: LanMgr.getLan("",12153), sysId: ModuleConst.JISHI, type: ShopType.jishi, speak:LanMgr.getLan("",12161) },
				{ name: LanMgr.getLan("",12154), sysId: ModuleConst.SHOP, type: ShopType.shangcheng , speak:LanMgr.getLan("",12162)},
				{ name: LanMgr.getLan("",12155), sysId: ModuleConst.JINGJI, type: ShopType.jingjichang, speak:LanMgr.getLan("",12163) },
				{ name: LanMgr.getLan("",12156), sysId: ModuleConst.GONGHUI, type: ShopType.guild , speak:LanMgr.getLan("",12164)},
				{ name: LanMgr.getLan("",12157), sysId: ModuleConst.SHENMEN, type: ShopType.shenjie, speak:LanMgr.getLan("",12165) },
				{ name: LanMgr.getLan("",12158), sysId: ModuleConst.EXPEDITION, type: ShopType.yuanzheng , speak:LanMgr.getLan("",12166)},
				{ name: LanMgr.getLan("",12159), sysId: ModuleConst.GLORY_FIGHT, type: ShopType.rongyao, speak:LanMgr.getLan("",12167) },
				{ name: LanMgr.getLan("",12160), sysId: ModuleConst.GOD_DOMAIN, type: ShopType.godDm, speak:LanMgr.getLan("",12168) }
			];
		}

		getTabs() {
			let ary = [];
			for (let k = 0; k < this._ShopData.length; k++) {
				let vo = this._ShopData[k];
				if (App.IsSysOpen(Number(vo['sysId']))) {
					if (ShopType.guild == vo['type'] && !GuildModel.getInstance().isHasGuild()) {
						continue;
					}
					ary.push(vo);
				}
			}
			return ary;
		}

		findShopDataByType(type: number) {
			return this.getTabs().find((vo) => {
				return Number(vo['type']) == type;
			});
		}

		isOpenByType(type: number) {
			let vo = this.findShopDataByType(type);
			if (ShopType.guild == vo.type) {
				return App.IsSysOpen(vo.sysId) && GuildModel.getInstance().isHasGuild();
			}
			return App.IsSysOpen(vo.sysId);
		}

		private _shopMap: Laya.Dictionary = new Laya.Dictionary();
		public set shopMap($value: Laya.Dictionary) {
			this._shopMap = $value;
		}
		public get shopMap(): Laya.Dictionary {
			return this._shopMap;
		}
		/** 请求商品 */
		requestShopList(type: number): Promise<any> {
			return new Promise((resolve) => {
				if (this._shopMap.get(type)) {
					resolve();
				} else {
					let arg = {};
					arg[Protocol.game_shop_list.args.type] = type;
					PLC.request(Protocol.game_shop_list, arg, ($data) => {
						if (!$data) {
							resolve();
							return;
						}
						let ary = [];
						for (let {id, count} of $data.shopList) {
							ary.push(new ShopItemVo(id, count));
						}
						ary.sort((a: ShopItemVo, b: ShopItemVo) => {
							return a.tbGoods.rank - b.tbGoods.rank;
						});
						this._shopMap.set(type, ary);
						resolve();
					});
				}
			});
		}
		/** 请求集市商品 */
		requestJishiList(): Promise<any> {
			return new Promise((resolve) => {
				let needRequest = this._jishiList.length <= 0;
				if (needRequest) {
					PLC.request(Protocol.game_market_list, {}, ($data) => {
						if (!$data) {
							resolve();
							return;
						}

						this._jishiList = [];
						for (let i = 0; i < $data.marketList.length; i++) {
							this._jishiList.push(new JishiItemVo(i, $data.marketList[i].id, $data.marketList[i].count, $data.marketList[i].price, $data.marketList[i].itemInfo));
						}
						resolve();
					});
				} else {
					resolve();
				}
			});
		}

        /** 获取商品列表 
		 * @param type 商店类型
		*/
		getShopListByType(type: number): any[] {
			if (type == ShopType.jishi) return this.getJiShiList();
			let ary = this._shopMap.get(type);
			return ary ? ary : [];
		}

		/** 集市数组 */
		public _jishiList: Array<JishiItemVo> = [];
		/**获取集市商品 */
		getJiShiList(): JishiItemVo[] {
			return this._jishiList ? this._jishiList : [];
		}

		/**通过物品id获取商品
		 * @param id 物品id
		 * @param type 商店类型
		 */
		getGoodsById(id: number, type: number): ShopItemVo {
			let list = this.getShopListByType(type);
			return list.find((vo) => {
				return vo.id == id;
			});
		}

		/**通过种族id获取商品
		 * @param race 种族
		 * @param type 商店类型
		 */
		getGoodsByRace(race: number, type: number) {
			let list = this.getShopListByType(type);
			if (race == 0) return list;
			return list.filter((vo) => {
				return vo.tbGoods.label == race;
			});
		}

		/** 通过商品id获取到商城的限购次数 */
		getLimitNumById(type: number, id: number): number {
			let list = this.getShopListByType(type);
			let good: ShopItemVo = list.find((vo) => {
				return vo.id == id;
			});
			return good.tbGoods.num - good.count;
		}

		/** 获取资源类型
		 * @param type 商店类型
		 */
		getResType(type: number): number {
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
		}

	}
}
