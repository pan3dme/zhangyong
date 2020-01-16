class GameUtil {

    /**
     * 转换成cd字符串
     * @param time 秒数
     * @param format 格式  如 hh:mm:ss hh-mm-ss
     * @param type 类型 1、表示小时可大于24(天数转换成小时)    2、表示将分钟可大于60(小时转换成分钟)
     */
    static toCountdown(time: number, format: string, type: number = 0): string {
        if (time < 0) {
            return '00:00:00';
        }
        let day: number;
        let hour: number;
        if (type == 1) {
            day = 0;
            hour = Math.floor(time / 3600);
            time = time % 3600;
        } else if (type == 2) {
            day = 0;
            hour = 0;
        } else {
            day = Math.floor(time / 86400);
            time = time % 86400;
            hour = Math.floor(time / 3600);
            time = time % 3600;
        }
        let minutes = Math.floor(time / 60);
        time = time % 60;
        let seconds = Math.floor(time);

        let str = format.replace(/((\[)(.*?))?(D{1,2})(([^\]]?)\])?/gi, (all, _, prefix, before, key, suffix, after) => {
            if (prefix == '[' && day <= 0) {
                return '';
            }
            return (before || "") + this.padNum(day, key) + (after || "");
        });

        str = str.replace(/((\[)(.*?))?(H{1,2})(([^\]]?)\])?/gi, (all, _, prefix, before, key, suffix, after) => {
            if (prefix == '[' && hour <= 0) {
                return '';
            }
            return (before || "") + this.padNum(hour, key) + (after || "");
        });
        str = str.replace(/((\[)(.*?))?(M{1,2})(([^\]]?)\])?/gi, (all, _, prefix, before, key, suffix, after) => {
            if (prefix == '[' && hour <= 0 && minutes <= 0) {
                return '';
            }
            return (before || "") + this.padNum(minutes, key) + (after || "");
        });
        str = str.replace(/((\[)(.*?))?(S{1,2})(([^\]]?)\])?/gi, (all, _, prefix, before, key, suffix, after) => {
            if (prefix == '[' && hour > 0) {
                return '';
            }
            return (before || '') + this.padNum(seconds, key) + (after || '');
        });
        return str;
    }

    static padNum(num, str): any {
        let numStr = num.toString();
        let len = str.length - numStr.length;
        if (len > 0) {
            return '0' + numStr;
        }
        return numStr;
    }
    /** 对比数组是否有改变 */
    static aryIsChange(ary1: any[], ary2: any[]): boolean {
        if (ary1.length != ary2.length) return true;
        for (let i = 0, len = ary1.length; i < len; i++) {
            if (ary1[i] !== ary2[i]) {
                return true;
            }
        }
        return false;
    }

    /** 链接数组,不改变原有数组 */
    static concatArray(ary1: any[], ary2: any[]): any[] {
        ary1 = ary1 ? [...ary1] : [];
        ary2 = ary2 ? [...ary2] : [];
        return [...ary1, ...ary2];
    }
    /** 格式化时间 -- 大于1天显示 x天x小时，否则显示hh:mm:ss*/
    static getTimeStr(time: number): string {
        let timeStr = "";
        if (time > TimeConst.ONE_DAY_SEC) {
            let day = Math.floor(time / TimeConst.ONE_DAY_SEC);
            let hour = Math.ceil(time % TimeConst.ONE_DAY_SEC / TimeConst.ONE_HOURS_SEC);
            timeStr = LanMgr.getLan("",12096,day,hour);
        } else {
            timeStr = GameUtil.toCountdown((time), "hh:mm:ss");
        }
        return timeStr;
    }
    /** 格式化时间 -- 大于1天显示 x天x小时，否则显示x小时x分 */
    static getTimeStr2(time: number): string {
        let timeStr = "";
        let day = Math.floor(time / TimeConst.ONE_DAY_SEC);
        if (day >= 1) {
            let hour = Math.ceil((time - day * TimeConst.ONE_DAY_SEC) / TimeConst.ONE_HOURS_SEC);
            timeStr = LanMgr.getLan("",12094,day,hour);;
        } else {
            let hour = Math.floor(time / TimeConst.ONE_HOURS_SEC);
            let mini = Math.ceil((time - hour * TimeConst.ONE_HOURS_SEC) / 60);
            timeStr = LanMgr.getLan("",12095,hour,mini);
        }
        return timeStr;
    }

    /**
     * 获取本周 某天某时某分 的时间戳
     * @param week 周几（周日是7）
     * @param hour 小时
     * @param minu 分钟
     * @param second 秒
     */
    static getFormatTime(week: number, hour: number, minu: number, second: number = 0): number {
        let date = new Date();
        date.setTime(App.serverTime);
        date.setHours(0, 0, 0, 0);
        let curSecond = date.getTime() / 1000;
        let curWeek = date.getDay();
        curWeek = curWeek == WeekNum.Sun ? 7 : curWeek;
        let endDayTime = curWeek >= week ? (curSecond - (curWeek - week) * TimeConst.ONE_DAY_SEC) : (curSecond + (week - curWeek) * TimeConst.ONE_DAY_SEC);
        return endDayTime + hour * TimeConst.ONE_HOURS_SEC + minu * 60 + second;
    }

    static isString(obj: any): boolean {
        return (typeof obj == 'string') && obj.constructor == String;
    }
    static isArray(obj: any): boolean {
        return (typeof obj == 'object') && obj.constructor == Array;
    }
    static isNumber(obj: any): boolean {
        return (typeof obj == 'number') && obj.constructor == Number;
    }
    static isFunction(obj): boolean {
        return (typeof obj == 'function') && obj.constructor == Function;
    }
    static isObject(obj): boolean {
        return (typeof obj == 'object') && obj.constructor == Object;
    }
    static isDate(obj): boolean {
        return (typeof obj == 'object') && obj.constructor == Date;
    }

    /** 是否是ios原生 */
    static isIosNative(): boolean {
        return Laya.Browser.onIOS && !Laya.Browser.onMiniGame;
    }

    /** 获取 */
    static getItemQulityByID(id: number): number {
        let table: tb.TB_item = tb.TB_item.get_TB_itemById(id);
        let quality = 1;
        if (table) {
            if (table.type == iface.tb_prop.itemTypeKey.god) {
                quality = table.defined[1] || table.quality;
                quality = quality > 6 ? 6 : quality;
            } else {
                quality = table.quality;
            }
        }
        return quality;
    }

    /** 通用请求排行列表 */
    static requestRankList<T extends common.RankVo>(rankType: number, clz: new () => T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let args = {};
            args[Protocol.game_rank_getRankList.args.rankType] = rankType;
            PLC.request(Protocol.game_rank_getRankList, args, ($data: any) => {
                if (!$data) return;
                let ary = [];
                for (let key in $data.rankList) {
                    let rankVo = new clz();
                    if (rankType == iface.tb_prop.rankTypeKey.groupCopyFloor) {
                        //构造的结构不同
                        rankVo.setArrayTypeGroupCopyFloor($data.rankList[key], Number(key));
                    } else {
                        rankVo.setArray($data.rankList[key], Number(key));
                    }
                    ary.push(rankVo);
                }
                resolve({ myRank: $data['myRank'], rankValue: $data['rankValue'], rankList: ary });
            });
        });
    }
    /** 在线时间 */
    static getTimePrev(time: number): string {
        let lastTime: number = App.serverTimeSecond - time;
        let str = "";
        if (lastTime < TimeConst.ONE_HOURS_SEC) {
            let mini = Math.floor(lastTime / 60);
            str = (mini || 1) + LanMgr.getLan("",12097);
        } else if (lastTime < TimeConst.ONE_DAY_SEC) {
            let hour = Math.floor(lastTime / 3600)
            str = (hour || 1) + LanMgr.getLan("",12098);
        } else {
            let day = Math.floor(lastTime / 86800);
            str = (day > 7 ? 7 : day) + LanMgr.getLan("",12099);
        }
        return str;
    }
    /** 离线时间 */
    public static getOfflineTimeStr(time: number, nowTime: number): string {
        let t: number = nowTime - time;
        if (t < 60) {
            return LanMgr.getLan("",12100);
        } else if (t < 3600) {
            //分钟级别
            t = Math.ceil(t / 60);
            return LanMgr.getLan("", 12101, t);
        } else if (t < 86400) {
            //小时级别
            t = Math.ceil(t / 3600);
            return LanMgr.getLan("", 12102, t);
        } else if (t < 2592000) {
            //天级别
            t = Math.ceil(t / 86400);
            return LanMgr.getLan("", 12103, t);
        } else {
            return LanMgr.getLan("",12104);
        }
    }

    /** 是否全面屏 -- 粗略判断高度大于1280,由于地层四舍五入的取法，可能导致一像素之差 */
    static isFullScreen(): boolean {
        // return Laya.stage.height > Launch.SCENE_HEIGHT + 1;
        return false;
    }

    /** 获取最低开启等级 */
    static getMinOpenLv(sysids: number[]): number {
        let minLv = -1;
        for (let id of sysids) {
            let tbSys = tb.TB_sys_open.get_TB_sys_openById(id);
            if (!tbSys) continue;
            if (minLv == -1 || tbSys.open_parameter < minLv) {
                minLv = tbSys.open_parameter;
            }
        }
        return minLv;
    }

    //字符串转字节数组
    public static strencode(obj) {
        let str = JSON.stringify(obj);
        let byte: Laya.Byte = new Laya.Byte();
        byte.writeUTFBytes(str)
        byte.pos = 0;
        let str2 = byte.getUTFBytes();
        return str2;
    }
}