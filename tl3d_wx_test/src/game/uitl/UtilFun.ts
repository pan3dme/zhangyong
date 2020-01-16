

// 打印
var getTimeShortStr: Function = (v: number) => {
    return new Date(v).toTimeString();
};

/**
 * 
 * @param args 打印错误
 */
function logdebug(...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 3) return;
    // logerror(args); 111
    console.log(getTimeShortStr(Laya.timer.currTimer), ...args);
}

/** 打印必要性的log */
function logNeed(...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 1) return;
    console.log(getTimeShortStr(Laya.timer.currTimer), ...args);
}

/**
 * 
 * @param args 打印错误
 */
function logwarn(...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 2) return;
    console.warn(getTimeShortStr(Laya.timer.currTimer), "[W]", ...args);
}

/**
 * 
 * @param args 打印提示
 */
function logerror(...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 1) return;
    console.error(getTimeShortStr(Laya.timer.currTimer), "[E]", ...args);
}

/**
 * 
 * @param args 打印提示
 */
function logyhj(str, ...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 5) return;
    // let time = getTimeShortStr(Laya.timer.currTimer);
    let time = Date.now();
    console.log(`%c [yhj]:${time} ` + str, 'color:#ff0000', ...args);
}

/**
 * 
 * @param args 打印提示
 */
function logfight(str, ...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 999) return;
    let time = getTimeShortStr(Laya.timer.currTimer);
    console.log(`%c [fight]:${time} %c` + str, 'color:#ff0000', 'color:#000000', ...args);
}

/**
 * 
 * @param args 打印提示
 */
function logzhanbao(...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 998) return;
    let time = getTimeShortStr(Laya.timer.currTimer);
    console.log(`%c [zhanbao]:${time} `, 'color:#ff0000', ...args);
}


function loghgy(...args: any[]): void {
    if (ExtConfig.LOG_LEVEL < 6) return;
    let time = getTimeShortStr(Laya.timer.currTimer);
    console.log(`%c hgy:${time} `, 'color:#ff0000', ...args);
}

/**
 * 显示窗口tip
 * @param text 提示内容
 */
function showToast($text: string, color: string = ColorConst.WHITE) {
    if (!$text || $text == "") {
        return;
    }

    ToastMgr.getInstance().arrTextPushBack({ $text: $text, color: color });
}

function dispatchEvt(cls, data = null) {
    if (!cls.data) {
        cls.data = data;
    }
    tl3d.ModuleEventManager.dispatchEvent(cls);
}

function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        pos = 0;

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

/**阿拉伯数字转换成中文数字 */
function num2ChiNum($id: number): string {
    return LanMgr.numChinese[$id];
}

/**标准化数字 */
function Snums($num: number): string {
    if ($num >= 100000000) {
        // 亿
        let yi = LanMgr.getLan("",12086);
        return ($num % 100000000) == 0 ? ($num / 100000000) + yi : ($num / 100000000).toFixed(2) + yi;
    } else if ($num >= 10000) {
        // 万
        let wan = LanMgr.getLan("",12087);
        return ($num % 10000) == 0 ? ($num / 10000) + wan : $num >= 1000000 ? Number(($num / 10000).toFixed(0)) + wan : Number(($num / 10000).toFixed(2)) + wan;
    } else {
        return String($num);
    }
}

function FormatStr(str: string, args: Array<any>): string {
    for (let i = 0; i < args.length; i++) {
        var parent = "\\{" + i + "\\}";
        var reg = new RegExp(parent, "g")
        str = str.replace(reg, args[i]);
    }
    return str;
}

function isEmptyObject(e) {
    var t;
    if (!e) {
        return true;
    }
    for (t in e)
        return !1;
    return !0
}


function randomNum(n) {
    var t = '';
    for (var i = 0; i < n; i++) {
        t += Math.floor(Math.random() * 10);
    }
    return t;
}


// // 全部替换
// function replaceall(restr, oldstr, newstr) {
//     while (restr.indexOf(oldstr) >= 0) {
//         restr = restr.replace(oldstr, newstr.repeat(oldstr.length));
//     }
//     return restr;
// }

// // 处理屏蔽词
// function doShield1(s) {
//     //先转成小写
//     let lowerStr: string = s.toLowerCase();
//     var $obj: any = TableData.getInstance().getTableByName(TableData.tb_shield);
//     var str = "*";
//     for (var i in $obj.data) {
//         lowerStr = replaceall(lowerStr, $obj.data[i].name, str);
//     }
//     //在转回原来的大写
//     for (var k = 0; k < lowerStr.length; k++) {
//         if (lowerStr[k] == "*") {
//             s = s.substring(0, k) + "*" + s.substring(k + 1);
//         }
//     }
//     console.log("原：", lowerStr, s);
//     return s;
// };

// 全部替换
function replaceall(s, restr, oldstr, newstr) {
    var i = restr.indexOf(oldstr);
    while (i >= 0) {
        var l = oldstr.length;
        var rs = newstr.repeat(l);
        restr = restr.replace(oldstr, rs);
        s = s.substring(0, i) + rs + s.substring(i + l);
        i = restr.indexOf(oldstr);
    }
    return s;
}

// 处理屏蔽词(不区分大小写，全部转成小写再比较)
function doShield1(s) {
    s = s.replace(RegConst.EMPTY_ALL_REG, "");
    var str = s.toLowerCase();
    var char = '*';
    var $obj: any = TableData.getInstance().getTableByName(TableData.tb_shield);
    for (var i in $obj.data) {
        s = replaceall(s, str, $obj.data[i].name, char);
    }
    return s;
};

/**
 * 百分数转化
 */
function perc2num($percnum: number) {
    return Number($percnum) / 100;
}

/**
 * 万分数转化
 */
function ext2num($percnum: number) {
    return $percnum / 10000;
}

/**1 转换为0....1 
 * @param num 数字
 * @param length 需要的长度
*/
function buquan(num, length) {
    var numstr = num.toString();
    var l = numstr.length;
    if (numstr.length >= length) { return numstr; }

    for (var i = 0; i < length - l; i++) {
        numstr = "0" + numstr;
    }
    return numstr;
}

/**
 * 生成uuid
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * 帧数转时间
 * @param frame 
 */
function frame2time(frame: number): number {
    if (frame && frame > 0) {
        return Math.floor((1000 / 30) * frame);
    } else {
        return 0;
    }
}

function getEffectUrl(name: string): string {
    return "effect/scene/" + name + getBaseUrl() + ".txt";
}

/**
 * 转换为时间格式
 * @param value 时间戳（秒）
 * @return 最大为小时单位的时间格式
 */
function StringToTime(value: any): string {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    var result = "00:00";
    if (secondTime >= 0) {
        if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt((secondTime / 60).toString());
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt((secondTime % 60).toString());
            //如果分钟大于60，将分钟转换成小时
            if (minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt((minuteTime / 60).toString());
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt((minuteTime % 60).toString());
            }
        }
        //小于10的数前面加一个0
        if (secondTime < 10) {
            result = "0" + parseInt(secondTime.toString());
        } else {
            result = "" + parseInt(secondTime.toString());
        }
        // if (minuteTime > 0) {
        if (minuteTime < 10) {
            result = "0" + parseInt(minuteTime.toString()) + ":" + result;
        } else {
            result = "" + parseInt(minuteTime.toString()) + ":" + result;
        }
        //   }
        if (hourTime > 0) {
            if (hourTime < 10) {
                result = "0" + parseInt(hourTime.toString()) + ":" + result;
            } else {
                result = "" + parseInt(hourTime.toString()) + ":" + result;
            }
        }
    }
    return result;
}

/**
 * 标准时间转换
 * @param time 时间戳（秒）
 *  
 */
function GetTime(time: any) {
    time += "";
    if (time.length < 12) time = parseInt(time) * 1000;
    time = parseInt(time);
    let date = new Date(time);
    let year = date.getFullYear();
    let mon = date.getMonth() + 1;
    mon = mon < 10 ? parseInt("0" + mon) : mon;
    let day = date.getDay();
    day = day < 10 ? parseInt("0" + day) : day;
    let hour = date.getHours();
    hour = hour < 10 ? parseInt("0" + hour) : hour;
    let min = date.getMinutes();
    min = min < 10 ? parseInt("0" + min) : min;
    let sec = date.getSeconds();
    sec = sec < 10 ? parseInt("0" + sec) : sec;
    return year + "-" + mon + "-" + day + "-" + hour + "-" + min + "-" + sec + "-";
}

/**
 * 计算两个时间戳(秒)的时间差
 * @param outtime 过去时间
 * @param nowtime 现在时间
 */
function logindifference(outtime: number, nowtime: number): string {
    //相差多少天
    let unit = LanMgr.getLan("",12088);
    let dayBetween = (nowtime - outtime) / (60 * 60 * 24);
    if (dayBetween < 1) {
        dayBetween *= 24;//小时
        unit = LanMgr.getLan("",12089);
        if (dayBetween < 1) {
            dayBetween *= 60;//分钟
            unit = LanMgr.getLan("",12090);
        }
    } else if (dayBetween > 30) {
        //dayBetween = Math.floor(dayBetween / 30);
        dayBetween = 1;
        unit = LanMgr.getLan("",12091);
    }
    return ~~dayBetween + unit + LanMgr.getLan("",12092);
}

/**
 * 计算两个时间戳(秒)的时间差
 * @param time1
 * @param time2
 */
function activityTime(time1: number, time2: number): string {
    //相差多少天
    let unit = "";
    let dayBetween = Math.floor(Math.abs(time1 - time2));
    let day: number = 60 * 60 * 24;
    let hour: number = 60 * 60;
    let minutes: number = 60;
    let temptime1 = 0;
    let temptime2 = 0;
    if (day <= dayBetween) {
        //天
        temptime1 = Math.floor(dayBetween / day);
        temptime2 = Math.floor((dayBetween - (temptime1 * day)) / hour);
        unit += temptime1 + LanMgr.getLan("",12088) + temptime2 + LanMgr.getLan("",12089);
    } else if (hour <= dayBetween) {
        //时
        temptime1 = Math.floor(dayBetween / hour);
        temptime2 = Math.floor((dayBetween - (temptime1 * hour)) / minutes);
        unit += temptime1 + LanMgr.getLan("",12089) + temptime2 + LanMgr.getLan("",12090);
    } else if (minutes <= dayBetween) {
        //分钟
        temptime1 = Math.floor(dayBetween / minutes);
        temptime2 = Math.floor((dayBetween - (temptime1 * minutes)));
        unit += temptime1 + LanMgr.getLan("",12090) + temptime2 + LanMgr.getLan("",12093);
    } else {
        unit += dayBetween + LanMgr.getLan("",12093);
    }
    return unit;
}


/** 段位后缀字符串*/
function duanweiValueToString(num: number): string {
    let str = ["", "I", "II", "III"];
    return str[num];
}

/**获得玩家段位 */
function getDuanwei(level: number): number {
    let rank_scoreObj = tb.TB_rank_score.get_TB_rank_score();
    rank_scoreObj.sort((itema, itemb) => {
        return itemb.ID - itema.ID;
    })
    for (let $key in rank_scoreObj) {
        if (level === rank_scoreObj[$key].ID) {
            return Number($key);
        }
    }
    return 13;
}

/**根据名次获取所需积分 */
function getScoreByRank(rank: number): number {
    let tb_arena_rankObj = tb.TB_arena_rank.get_TB_arena_rank();
    for (let $key in tb_arena_rankObj) {
        if (rank >= tb_arena_rankObj[$key].rank[0]
            && rank <= tb_arena_rankObj[$key].rank[1]) {
            return tb_arena_rankObj[$key].need_value;
        }
    }
    return 1500;
}

/**
 * list居中显示
 * @param list list对象
 * @param startX UI中的固定初始坐标
 * @param MaxLength 最多要显示多少个（从1开始计数）
 */
function listAtCenter(list: Laya.List, startX: number, MaxLength: number, len: number,itemW:number = 90): void {
    if (MaxLength > len) {
        list.x = startX + (MaxLength - len) * (itemW + list.spaceX) / 2;
    } else {
        list.x = startX;
    }
}

/**距离下一个签到奖励还差几人 */
function getSignAwardValue(signNum: number): number {
    let obj = tb.TB_guild_sign.get_TB_guild_sign();
    obj.sort((itema, itemb) => {
        return itemb.ID - itema.ID;
    });
    for (let i in obj) {
        if (signNum >= obj[i].scope[0]) {
            return obj[i].ID;
        }
    }
}

/**公会聊天成员变动信息 */
function guildMemberChatSend(content: string): void {
    let arg = {};
    arg[Protocol.chat_chat_send.args.channel] = iface.tb_prop.chatChannelTypeKey.guild;
    arg[Protocol.chat_chat_send.args.type] = iface.tb_prop.chatTypeKey.text;
    arg[Protocol.chat_chat_send.args.content] = content;
    PLC.request(Protocol.chat_chat_send, arg, ($data: any, msg: any) => {
        if (!$data) return;
    })
}

/**获取段位对应荣誉奖励 */
function getHonorReward(section: number): number {
    let obj = tb.TB_rank_score.get_TB_rank_score();
    for (let key in obj) {
        if (obj[key].ID == section) {
            return obj[key].victory_medal[0];
        }
    }
}

/**
 * 获取浏览器参数
 * @param name 
 */
function getQueryString(name) {
    if (window['wx']) { //小游戏不给获取
        return null;
    }
    if (!window.location || !window.location.search) {
        return null;
    }
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**当月有多少天 */
function getMonthDays(time): number {
    let curDate: Date = new Date(time * 1000);
    var curMonthDays = new Date(curDate.getFullYear(), (curDate.getMonth() + 1), 0).getDate();
    return curMonthDays;
}

/**返回对象的第一个属性名称 */
function getobjectFirstAttribute(data): string {
    for (var key in data)
        return key;
}

/**
 * state == 3:输入特殊符号 state != 3:strlen本次字符串的长度
 * @param str 
 */
function checkUserName($str): Object {
    var flag = 1;
    var v = $str;
    //[\u4e00-\u9fa5]为汉字的unicode编码，/i表示匹配的时候不区分大小写。
    var rx = /[a-z\d]/i, rxcn = /[\u4e00-\u9fa5]/, num = 0, chr;
    for (var i = 0, j = v.length; i < j; i++) {
        chr = v.charAt(i);
        if (rx.test(chr)) num += 1;
        else if (rxcn.test(chr)) num += 2;
        else {
            flag = 3;
            break;
        }
    }
    return { state: flag, strlen: num };
}

/** 获取下个月第一个的时间戳 */
function getNextMonthTime(time: number): number {
    let curData = new Date(time);
    // 11表示12月
    let year = curData.getMonth() == 11 ? curData.getFullYear() + 1 : curData.getFullYear();
    let month = curData.getMonth() == 11 ? 0 : curData.getMonth() + 1;
    let nextMonthDate = new Date(year, month);
    return nextMonthDate.getTime();
}

/**判断对象是否是数组 */
function isArrayFn(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

/** map转数组 属性类型 */
function map2ary(attrObj: Object): Array<Array<number>> {
    let attriAry = [];
    for (let key in attrObj) {
        attriAry.push([Number(key), attrObj[key]]);
    }
    return attriAry;
}

/** 数组转map 属性类型 */
function ary2map(attrary: Array<Array<number>>): Object {
    if (!(attrary instanceof Array)) return void 0;
    let attrobj = {};
    for (var i = 0; i < attrary.length; i++) {
        attrobj[attrary[i][0]] = attrary[i][1];
    }
    return attrobj;
}
/** 奖励表转道具对象 */
function ary2prop(tabary: Array<Array<number>>): Array<ItemVo> {
    let ary: Array<ItemVo> = [];
    for (var i = 0; tabary && i < tabary.length; i++) {
        ary.push(new ItemVo(tabary[i][0], tabary[i][1]));
    }
    return ary;
}

function convertMapValueToArr(obj, filter?) {
    var arr = [];
    for (var key in obj) {
        var data = obj[key];
        if (filter && typeof filter === 'function' && !filter(data)) {
            continue;
        }
        arr.push(data);
    }
    return arr;
}

//注意此方法适用数据对象，不能克隆带function的原型链
function clone(obj) {
    // var o= JSON.parse(JSON.stringify(obj));
    var o;
    switch (typeof obj) {
        case 'undefined': break;
        case 'string': o = obj + ''; break;
        case 'number': o = obj - 0; break;
        case 'boolean': o = obj; break;
        case 'object':
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj; break;
    }
    return o;
}


/**计算两个触摸点之间的距离*/
function getDistance(points: Array<any>): number {
    var distance: number = 0;
    if (points && points.length == 2) {
        var dx: number = points[0].stageX - points[1].stageX;
        var dy: number = points[0].stageY - points[1].stageY;

        distance = Math.sqrt(dx * dx + dy * dy);
    }
    return distance;
}

function getForce(attrobj, quality): number {
    let allAttr = map2ary(attrobj);
    let shenli: number = 0;
    let settab: tb.TB_game_set = tb.TB_game_set.get_TB_game_setById(1);
    for (let i = 0; i < allAttr.length; i++) {
        let attrkey = allAttr[i][0]; //1
        let attrval = allAttr[i][1];  //1000
        // attrval = attrkey < 4 ? Math.floor(attrval) : (Math.round(attrval * 10000) / 10000);
        attrval = attrkey <= 4 ? Math.floor(attrval) : attrval;
        shenli += attrval * settab.selectAttrItem(attrkey);
    }
    shenli *= Number(settab.quality_para[quality - 1]);
    // logyhj("属性：", allAttr);
    // logyhj("战斗力：", this.templateId, shenli);
    return Math.round(shenli);
}
/** 获取阵容神力 */
function getLineupForce(lineupInfo: any[]): number {
    let teamList = lineupInfo[0]
    let tab = null;
    let force = 0;
    for (var i = 0; i < teamList.length; i++) {
        var element = teamList[i];
        if (element) {
            tab = tb.TB_god.get_TB_godById(Number(element[0]));
            force += getForce(element[3], tab ? tab.quality : 1);
        }
    }
    return force;
}



