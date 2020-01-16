/*
* name;
*/
class App {
    /** 登录公告版本的存储key */
    static LOGIN_NOTICE_VERSION : string = "LOGIN_NOTICE_VERSION";
    /** 登录公告是否不再弹窗的存储key  "1"表示不再弹出*/
    static LOGIN_NOTICE_CHECKBOX : string = "LOGIN_NOTICE_CHECKBOX";

    static hero: common.Hero;
    static main: Launch;
    private static _clientTime: number;
    /** 服务器时间戳（毫秒） */
    private static _serverTime: number;
    public static enterGame: boolean = false;
    constructor() {

    }

    static init(): void {
        App.hero = new common.Hero();
        TimeUtil.init();
        UIMgr.getInstance();
        ResUseMgr.startTick();
    }

    static offline(): void {
        this.hero.offline();
        clearTimeout(this._tickId);
        this._nextDayFlag = true;
    }

    /** 服务器时间（秒） */
    static get serverTimeSecond(): number {
        return App.serverTime / 1000;
    }

    private static _tickId: number;
    private static _nextDayFlag: boolean = true;   // 跨天请求标识
    public static _curday:number = 0;
    /** 设置服务器时间（毫秒） */
    static set serverTime(num) {
        let cday = new Date(num).getDate();
        // if(App._curday == 0){
        //     App._curday = cday;
        // }
        // if(App._curday != cday){
        //     //跨天刷新
        //     App.updateCrossDayInfo();
        //     App._curday = cday;
        // }
        // if (App._nextDayFlag) {
        //     App._nextDayFlag = false;
        //     let date = new Date(Date.now() + TimeConst.ONE_DAY_MILSEC);
        //     date.setHours(0, 0, 0, 0);
        //     let time = date.getTime() - num + 2000;
        //     App._tickId = setTimeout(App.updateCrossDayInfo, time);
        //     logdebug(`-----延迟${time}毫秒之后更新跨天数据------`);
        // }
        App._serverTime = num;
        App._clientTime = new Date().getTime();
    }
    /** 更新跨天数据 */
    static updateCrossDayInfo(): void {
        logdebug('-----开始请求更新跨天数据------');
        dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
        clearTimeout(App._tickId);
        PLC.request(Protocol.game_common_getCrossDayInfo, null, ($data) => {
            if (!$data) {
                logdebug('-----请求数据失败，2秒后重新请求跨天数据------');
                App._tickId = setTimeout(App.updateCrossDayInfo, 2000);
            } else {
                logdebug('-----请求数据成功，开始更新跨天数据------',$data);
                App._nextDayFlag = true;
                App.hero.updateCrossDayInfo($data);
            }
        }, false);
    }

    /** 获取服务器时间（毫秒） */
    static get serverTime(): number {
        let nowTime = new Date().getTime();
        return (App._serverTime + nowTime - App._clientTime);
    }

    /** 获取服务器时间（秒） */
    static getServerTime(): number {
        return Math.round(this.serverTime / 1000);
    }

    /** 获取到开服时间戳(秒) 经转换0h0m0s*/
    static getOpenServerTime(): number {
        let openTime = new Date(App.hero.openSvrTime * 1000);
        openTime.setHours(0, 0, 0, 0);
        return Math.floor(openTime.getTime() / 1000);
    }

    /**
     * 是否为开服几天后
     */
    static isOpenSvrDay(day:number):boolean{
        return App.getServerTime() - App.getOpenServerTime() > day * TimeConst.ONE_DAY_SEC;
    }

    /** 
     * 获取
     *  开放等级
     *  开放的关卡完成id
     *  开放的任务完成id
    */
    static getOpenValue(fundId: number): number {
        let tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
        return tbData ? tbData.open_parameter : 0;
    }
    /** 获取开放条件类型 */
    static getOpenType(fundId: number): number {
        let tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
        return tbData.open_type;
    }

    /**是否开放 */
    static IsSysOpen(fundId: number): boolean {
        let tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
        if (!tbData) return true;
        let value = tbData ? tbData.open_parameter : 0;
        switch (tbData.open_type) {
            case SysConditionType.default:
                return true;
            case SysConditionType.level:
                return value <= App.hero.level;
            case SysConditionType.copy:
                return game.GuajiModel.getInstance().isPassCopy(value);
            default:
                return true;
        }
    }

    /** 货币是否足够 */
    static isEnough(type: number, cost: number): boolean {
        switch (Number(type)) {
            case iface.tb_prop.resTypeKey.gold:
                return App.hero.gold >= Number(cost);
            case iface.tb_prop.resTypeKey.diamond:
                return App.hero.diamond >= Number(cost);
            case iface.tb_prop.resTypeKey.godExp:
                return App.hero.godExp >= Number(cost);
            case iface.tb_prop.resTypeKey.friend:
                return App.hero.friend >= Number(cost);
            case iface.tb_prop.resTypeKey.arena:
                return App.hero.arena >= Number(cost);
            case iface.tb_prop.resTypeKey.arenaNum:
                return App.hero.arenaNum >= Number(cost);
            case iface.tb_prop.resTypeKey.guildDonate:
                return App.hero.guildDonate >= Number(cost);
            case iface.tb_prop.resTypeKey.legendChip:
                return App.hero.legendChip >= Number(cost);
            case iface.tb_prop.resTypeKey.soulStone:
                return App.hero.soulStone >= Number(cost);
            case iface.tb_prop.resTypeKey.godCrystal:
                return App.hero.godCrystal >= Number(cost);
            case iface.tb_prop.resTypeKey.darkEssence:
                return App.hero.darkEssence >= Number(cost);
            case iface.tb_prop.resTypeKey.honour:
                return App.hero.honour >= Number(cost);
            case iface.tb_prop.resTypeKey.godDomain:
                return App.hero.godDomain >= Number(cost);
            case iface.tb_prop.resTypeKey.vipScore:
                return App.hero.vipScore >= Number(cost);
            case CostTypeKey.jinhuahuizhang:
                return App.hero.getBagItemNum(type) >= Number(cost);
            default:
                return App.hero.getBagItemNum(type) >= Number(cost);
        }
    }

    /** 获取玩家拥有的资源数量 */
    static getResNum(type: number): number {
        switch (Number(type)) {
            case iface.tb_prop.resTypeKey.gold:
                return App.hero.gold;
            case iface.tb_prop.resTypeKey.diamond:
                return App.hero.diamond;
            case iface.tb_prop.resTypeKey.godExp:
                return App.hero.godExp;
            case iface.tb_prop.resTypeKey.friend:
                return App.hero.friend ;
            case iface.tb_prop.resTypeKey.arena:
                return App.hero.arena;
            case iface.tb_prop.resTypeKey.arenaNum:
                return App.hero.arenaNum;
            case iface.tb_prop.resTypeKey.guildDonate:
                return App.hero.guildDonate;
            case iface.tb_prop.resTypeKey.legendChip:
                return App.hero.legendChip;
            case iface.tb_prop.resTypeKey.soulStone:
                return App.hero.soulStone;
            case iface.tb_prop.resTypeKey.godCrystal:
                return App.hero.godCrystal;
            case iface.tb_prop.resTypeKey.darkEssence:
                return App.hero.darkEssence;
            case iface.tb_prop.resTypeKey.honour:
                return App.hero.honour;
            case iface.tb_prop.resTypeKey.godDomain:
                return App.hero.godDomain;
            case CostTypeKey.jinhuahuizhang:
                return App.hero.getBagItemNum(type);
            default:
                return App.hero.getBagItemNum(type);
        }
    }

    /** 货币是否足够 : 二维数组 */
    static isEnoughByAry(list: Array<Array<number>>): boolean {
        let isEnough = true;
        for (let ary of list) {
            if (!App.isEnough(Number(ary[0]), Number(ary[1]))) {
                isEnough = false;
                break;
            }
        }
        return isEnough;
    }
    /** 货币不足类型 */
    static isNotEnoughType(list: Array<Array<number>>): number {
        for (let ary of list) {
            if (!App.isEnough(Number(ary[0]), Number(ary[1]))) {
                return ary[0];
            }
        }
        return -1;
    }

    private static _maxVipLv: number = 0;
    static getMaxVipLv(): number {
        if (App._maxVipLv == 0) {
            let tb = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_vip)).data;
            for (let id in tb) {
                let tbVip = tb[id] as tb.TB_vip;
                if (tbVip.ID >= App._maxVipLv) {
                    App._maxVipLv = tbVip.ID;
                }
            }
        }
        return App._maxVipLv;
    }

    /** 获取消耗的物品vo */
    static getCostItemVo(type:number,num:number):inface.IItemData {
        let itemVo: inface.IItemData = {
            getQulity: () => { return "" },
            getIconUrl: () => { return SkinUtil.getCostSkin(type) },
            getNum: () => { return num },
            getShow: () => { return false },
            getConstNum: () => { return 0 },
            isStartAction: () => { return false },
            isChip: () => { return false },
            showRace: () => { return 0 },
            getStar: () => { return 0 },
            isMoreThanSix: () => { return false },
            getExtParm:()=>{}
        }
        return itemVo;
    }
}