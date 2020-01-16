var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var GameUtil = /** @class */ (function () {
    function GameUtil() {
    }
    /**
     * 转换成cd字符串
     * @param time 秒数
     * @param format 格式  如 hh:mm:ss hh-mm-ss
     * @param type 类型 1、表示小时可大于24(天数转换成小时)    2、表示将分钟可大于60(小时转换成分钟)
     */
    GameUtil.toCountdown = function (time, format, type) {
        var _this = this;
        if (type === void 0) { type = 0; }
        if (time < 0) {
            return '00:00:00';
        }
        var day;
        var hour;
        if (type == 1) {
            day = 0;
            hour = Math.floor(time / 3600);
            time = time % 3600;
        }
        else if (type == 2) {
            day = 0;
            hour = 0;
        }
        else {
            day = Math.floor(time / 86400);
            time = time % 86400;
            hour = Math.floor(time / 3600);
            time = time % 3600;
        }
        var minutes = Math.floor(time / 60);
        time = time % 60;
        var seconds = Math.floor(time);
        var str = format.replace(/((\[)(.*?))?(D{1,2})(([^\]]?)\])?/gi, function (all, _, prefix, before, key, suffix, after) {
            if (prefix == '[' && day <= 0) {
                return '';
            }
            return (before || "") + _this.padNum(day, key) + (after || "");
        });
        str = str.replace(/((\[)(.*?))?(H{1,2})(([^\]]?)\])?/gi, function (all, _, prefix, before, key, suffix, after) {
            if (prefix == '[' && hour <= 0) {
                return '';
            }
            return (before || "") + _this.padNum(hour, key) + (after || "");
        });
        str = str.replace(/((\[)(.*?))?(M{1,2})(([^\]]?)\])?/gi, function (all, _, prefix, before, key, suffix, after) {
            if (prefix == '[' && hour <= 0 && minutes <= 0) {
                return '';
            }
            return (before || "") + _this.padNum(minutes, key) + (after || "");
        });
        str = str.replace(/((\[)(.*?))?(S{1,2})(([^\]]?)\])?/gi, function (all, _, prefix, before, key, suffix, after) {
            if (prefix == '[' && hour > 0) {
                return '';
            }
            return (before || '') + _this.padNum(seconds, key) + (after || '');
        });
        return str;
    };
    GameUtil.padNum = function (num, str) {
        var numStr = num.toString();
        var len = str.length - numStr.length;
        if (len > 0) {
            return '0' + numStr;
        }
        return numStr;
    };
    /** 对比数组是否有改变 */
    GameUtil.aryIsChange = function (ary1, ary2) {
        if (ary1.length != ary2.length)
            return true;
        for (var i = 0, len = ary1.length; i < len; i++) {
            if (ary1[i] !== ary2[i]) {
                return true;
            }
        }
        return false;
    };
    /** 链接数组,不改变原有数组 */
    GameUtil.concatArray = function (ary1, ary2) {
        ary1 = ary1 ? __spreadArrays(ary1) : [];
        ary2 = ary2 ? __spreadArrays(ary2) : [];
        return __spreadArrays(ary1, ary2);
    };
    /** 格式化时间 -- 大于1天显示 x天x小时，否则显示hh:mm:ss*/
    GameUtil.getTimeStr = function (time) {
        var timeStr = "";
        if (time > TimeConst.ONE_DAY_SEC) {
            var day = Math.floor(time / TimeConst.ONE_DAY_SEC);
            var hour = Math.ceil(time % TimeConst.ONE_DAY_SEC / TimeConst.ONE_HOURS_SEC);
            timeStr = LanMgr.getLan("", 12096, day, hour);
        }
        else {
            timeStr = GameUtil.toCountdown((time), "hh:mm:ss");
        }
        return timeStr;
    };
    /** 格式化时间 -- 大于1天显示 x天x小时，否则显示x小时x分 */
    GameUtil.getTimeStr2 = function (time) {
        var timeStr = "";
        var day = Math.floor(time / TimeConst.ONE_DAY_SEC);
        if (day >= 1) {
            var hour = Math.ceil((time - day * TimeConst.ONE_DAY_SEC) / TimeConst.ONE_HOURS_SEC);
            timeStr = LanMgr.getLan("", 12094, day, hour);
            ;
        }
        else {
            var hour = Math.floor(time / TimeConst.ONE_HOURS_SEC);
            var mini = Math.ceil((time - hour * TimeConst.ONE_HOURS_SEC) / 60);
            timeStr = LanMgr.getLan("", 12095, hour, mini);
        }
        return timeStr;
    };
    /**
     * 获取本周 某天某时某分 的时间戳
     * @param week 周几（周日是7）
     * @param hour 小时
     * @param minu 分钟
     * @param second 秒
     */
    GameUtil.getFormatTime = function (week, hour, minu, second) {
        if (second === void 0) { second = 0; }
        var date = new Date();
        date.setTime(App.serverTime);
        date.setHours(0, 0, 0, 0);
        var curSecond = date.getTime() / 1000;
        var curWeek = date.getDay();
        curWeek = curWeek == WeekNum.Sun ? 7 : curWeek;
        var endDayTime = curWeek >= week ? (curSecond - (curWeek - week) * TimeConst.ONE_DAY_SEC) : (curSecond + (week - curWeek) * TimeConst.ONE_DAY_SEC);
        return endDayTime + hour * TimeConst.ONE_HOURS_SEC + minu * 60 + second;
    };
    GameUtil.isString = function (obj) {
        return (typeof obj == 'string') && obj.constructor == String;
    };
    GameUtil.isArray = function (obj) {
        return (typeof obj == 'object') && obj.constructor == Array;
    };
    GameUtil.isNumber = function (obj) {
        return (typeof obj == 'number') && obj.constructor == Number;
    };
    GameUtil.isFunction = function (obj) {
        return (typeof obj == 'function') && obj.constructor == Function;
    };
    GameUtil.isObject = function (obj) {
        return (typeof obj == 'object') && obj.constructor == Object;
    };
    GameUtil.isDate = function (obj) {
        return (typeof obj == 'object') && obj.constructor == Date;
    };
    /** 是否是ios原生 */
    GameUtil.isIosNative = function () {
        return Laya.Browser.onIOS && !Laya.Browser.onMiniGame;
    };
    /** 获取 */
    GameUtil.getItemQulityByID = function (id) {
        var table = tb.TB_item.get_TB_itemById(id);
        var quality = 1;
        if (table) {
            if (table.type == iface.tb_prop.itemTypeKey.god) {
                quality = table.defined[1] || table.quality;
                quality = quality > 6 ? 6 : quality;
            }
            else {
                quality = table.quality;
            }
        }
        return quality;
    };
    /** 通用请求排行列表 */
    GameUtil.requestRankList = function (rankType, clz) {
        return new Promise(function (resolve, reject) {
            var args = {};
            args[Protocol.game_rank_getRankList.args.rankType] = rankType;
            PLC.request(Protocol.game_rank_getRankList, args, function ($data) {
                if (!$data)
                    return;
                var ary = [];
                for (var key in $data.rankList) {
                    var rankVo = new clz();
                    if (rankType == iface.tb_prop.rankTypeKey.groupCopyFloor) {
                        //构造的结构不同
                        rankVo.setArrayTypeGroupCopyFloor($data.rankList[key], Number(key));
                    }
                    else {
                        rankVo.setArray($data.rankList[key], Number(key));
                    }
                    ary.push(rankVo);
                }
                resolve({ myRank: $data['myRank'], rankValue: $data['rankValue'], rankList: ary });
            });
        });
    };
    /** 在线时间 */
    GameUtil.getTimePrev = function (time) {
        var lastTime = App.serverTimeSecond - time;
        var str = "";
        if (lastTime < TimeConst.ONE_HOURS_SEC) {
            var mini = Math.floor(lastTime / 60);
            str = (mini || 1) + LanMgr.getLan("", 12097);
        }
        else if (lastTime < TimeConst.ONE_DAY_SEC) {
            var hour = Math.floor(lastTime / 3600);
            str = (hour || 1) + LanMgr.getLan("", 12098);
        }
        else {
            var day = Math.floor(lastTime / 86800);
            str = (day > 7 ? 7 : day) + LanMgr.getLan("", 12099);
        }
        return str;
    };
    /** 离线时间 */
    GameUtil.getOfflineTimeStr = function (time, nowTime) {
        var t = nowTime - time;
        if (t < 60) {
            return LanMgr.getLan("", 12100);
        }
        else if (t < 3600) {
            //分钟级别
            t = Math.ceil(t / 60);
            return LanMgr.getLan("", 12101, t);
        }
        else if (t < 86400) {
            //小时级别
            t = Math.ceil(t / 3600);
            return LanMgr.getLan("", 12102, t);
        }
        else if (t < 2592000) {
            //天级别
            t = Math.ceil(t / 86400);
            return LanMgr.getLan("", 12103, t);
        }
        else {
            return LanMgr.getLan("", 12104);
        }
    };
    /** 是否全面屏 -- 粗略判断高度大于1280,由于地层四舍五入的取法，可能导致一像素之差 */
    GameUtil.isFullScreen = function () {
        // return Laya.stage.height > Launch.SCENE_HEIGHT + 1;
        return false;
    };
    /** 获取最低开启等级 */
    GameUtil.getMinOpenLv = function (sysids) {
        var minLv = -1;
        for (var _i = 0, sysids_1 = sysids; _i < sysids_1.length; _i++) {
            var id = sysids_1[_i];
            var tbSys = tb.TB_sys_open.get_TB_sys_openById(id);
            if (!tbSys)
                continue;
            if (minLv == -1 || tbSys.open_parameter < minLv) {
                minLv = tbSys.open_parameter;
            }
        }
        return minLv;
    };
    //字符串转字节数组
    GameUtil.strencode = function (obj) {
        var str = JSON.stringify(obj);
        var byte = new Laya.Byte();
        byte.writeUTFBytes(str);
        byte.pos = 0;
        var str2 = byte.getUTFBytes();
        return str2;
    };
    return GameUtil;
}());
