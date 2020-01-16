/*
* name;
*/
var utils = /** @class */ (function () {
    function utils() {
    }
    utils.handleForChgVal = function (obj, ruleName) {
        if (!obj) {
            return null;
        }
        var temp, value;
        if (obj instanceof Array) {
            temp = [];
            for (var i = 0, li = obj.length; i < li; i++) {
                value = obj[i];
                temp.push(utils.getMsgValue(value, ruleName));
            }
            return temp;
        }
        temp = {};
        for (var key in obj) {
            value = obj[key];
            if (typeof value !== "object" && !(value instanceof Array)) {
                return utils.getMsgValue(obj, ruleName);
            }
            value = this.handleForChgVal(value, ruleName);
            if (value !== null) {
                temp[key] = value;
            }
        }
        return temp;
    };
    utils.random = function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };
    //字符串转字节数组
    utils.strencode = function (str) {
        var byte = new Laya.Byte();
        byte.writeUTFBytes(str);
        return byte;
    };
    //字节数组转字符串
    utils.strdecode = function (buffer, offset) {
        var body = new Laya.Byte();
        var index = offset;
        var bytesLen = buffer.byteLength || buffer["length"];
        for (; index < bytesLen; index++) {
            body.writeByte(buffer[index]);
        }
        body.pos = 0;
        var bodystr = body.readUTFBytes();
        return bodystr;
    };
    //复制字节数组
    utils.copyArray = function (dest, doffset, src, soffset, length) {
        if (src instanceof ArrayBuffer) {
            for (var index = 0; index < length; index++) {
                dest[doffset++] = src[soffset++];
            }
        }
        else {
            for (var index = 0; index < length; index++) {
                dest[doffset++] = src._getUInt8(soffset++);
            }
        }
    };
    utils.getMsgValue = function (msg, dsName) {
        if (msg && dsName) {
            if (msg instanceof Array) { //如果是数组，那么就对数组中的元素进行转换
                if (msg.length === 0) {
                    return msg;
                }
                for (var i = 0; i < msg.length; i++) {
                    msg[i] = this.getMsgValue(msg[i], dsName);
                }
            }
            else {
                var dc = iface.dsConsts;
                var dsKeys = dc[dsName];
                var res = {};
                for (var name in dsKeys) {
                    var key = dsKeys[name];
                    var dr = iface.dsRule;
                    var dsRuleMap = dr[dsName];
                    if (typeof msg[key] !== "undefined") {
                        var flag = dsRuleMap ? 1 : 0; //1说明有转换规则
                        switch (flag) {
                            case 0: //无转换模板
                                if (msg[key] !== null) {
                                    res[name] = msg[key];
                                }
                                break;
                            case 1: //有转换模板
                                var valueResult;
                                if (dsRuleMap.__valueChangeMap && dsRuleMap.__valueChangeMap[name]) { //如果是key值不变，而是要转换value值的话
                                    valueResult = utils.handleForChgVal(msg[key], dsRuleMap[name]);
                                }
                                else {
                                    valueResult = utils.getMsgValue(msg[key], dsRuleMap[name]);
                                }
                                if (valueResult !== null) {
                                    res[name] = valueResult;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
                msg = res;
            }
        }
        return msg;
    };
    return utils;
}());
