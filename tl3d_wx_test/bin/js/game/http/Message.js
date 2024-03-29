var Message = /** @class */ (function () {
    function Message() {
    }
    Message.encode = function (id, type, compressRoute, route, msg, compressGzip) {
        if (compressGzip === void 0) { compressGzip = null; }
        // caculate message max length
        var idBytes = this.msgHasId(type) ? this.caculateMsgIdBytes(id) : 0;
        var msgLen = Message.MSG_FLAG_BYTES + idBytes;
        if (this.msgHasRoute(type)) {
            if (compressRoute) {
                if (typeof route !== 'number') {
                    throw new Error('error flag for number route!');
                }
                msgLen += Message.MSG_ROUTE_CODE_BYTES;
            }
            else {
                msgLen += Message.MSG_ROUTE_LEN_BYTES;
                if (route) {
                    route = utils.strencode(route);
                    if (route.length > 255) {
                        throw new Error('route maxlength is overflow');
                    }
                    msgLen += route.length;
                }
            }
        }
        if (msg) {
            msgLen += msg.length;
        }
        var buffer = new Laya.Byte(msgLen);
        var offset = 0;
        // add flag
        offset = this.encodeMsgFlag(type, compressRoute, buffer, offset, compressGzip);
        // add message id
        if (this.msgHasId(type)) {
            offset = this.encodeMsgId(id, buffer, offset);
        }
        // add route
        if (this.msgHasRoute(type)) {
            offset = this.encodeMsgRoute(compressRoute, route, buffer, offset);
        }
        // add body
        if (msg) {
            offset = this.encodeMsgBody(msg, buffer, offset);
        }
        return buffer;
    };
    Message.decode = function (buffer) {
        var bytesLen = buffer.length;
        var offset = buffer.pos;
        var id = 0;
        var route = null;
        // parse flag
        var flag = buffer._getUInt8(offset++);
        var compressRoute = flag & Message.MSG_COMPRESS_ROUTE_MASK;
        var type = (flag >> 1) & Message.MSG_TYPE_MASK;
        var compressGzip = (flag >> 4) & Message.MSG_COMPRESS_GZIP_MASK;
        // parse id
        if (Message.msgHasId(type)) {
            var m = 0;
            var i = 0;
            do {
                m = buffer._getUInt8(offset);
                id += (m & 0x7f) << (7 * i);
                offset++;
                i++;
            } while (m >= 128);
        }
        // parse route
        if (Message.msgHasRoute(type)) {
            if (compressRoute) {
                route = (buffer._getUInt8(offset++) << 8 | buffer._getUInt8(offset++));
            }
            else {
                var routeLen = buffer._getUInt8(offset++);
                if (routeLen) {
                    route = new ArrayBuffer(routeLen);
                    utils.copyArray(route, 0, buffer, offset, routeLen);
                    route = utils.strdecode(route);
                }
                else {
                    route = '';
                }
                offset += routeLen;
            }
        }
        // parse body
        var bodyLen = bytesLen - offset;
        var body = new ArrayBuffer(bodyLen);
        utils.copyArray(body, 0, buffer, offset, bodyLen);
        return { 'id': id, 'type': type, 'compressRoute': compressRoute,
            'route': route, 'body': body, 'compressGzip': compressGzip };
    };
    Message.encodeMsgBody = function (msg, buffer, offset) {
        utils.copyArray(buffer, offset, msg, 0, msg.length);
        return offset + msg.length;
    };
    Message.encodeMsgRoute = function (compressRoute, route, buffer, offset) {
        if (compressRoute) {
            if (route > Message.MSG_ROUTE_CODE_MAX) {
                throw new Error('route number is overflow');
            }
            buffer[offset++] = (route >> 8) & 0xff;
            buffer[offset++] = route & 0xff;
        }
        else {
            if (route) {
                buffer[offset++] = route.length & 0xff;
                utils.copyArray(buffer, offset, route, 0, route.length);
                offset += route.length;
            }
            else {
                buffer[offset++] = 0;
            }
        }
        return offset;
    };
    Message.encodeMsgId = function (id, buffer, offset) {
        do {
            var tmp = id % 128;
            var next = Math.floor(id / 128);
            if (next !== 0) {
                tmp = tmp + 128;
            }
            buffer[offset++] = tmp;
            id = next;
        } while (id !== 0);
        return offset;
    };
    Message.encodeMsgFlag = function (type, compressRoute, buffer, offset, compressGzip) {
        if (type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY &&
            type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH) {
            throw new Error('unkonw message type: ' + type);
        }
        buffer[offset] = (type << 1) | (compressRoute ? 1 : 0);
        if (compressGzip) {
            buffer[offset] = buffer[offset] | Message.MSG_COMPRESS_GZIP_ENCODE_MASK;
        }
        return offset + Message.MSG_FLAG_BYTES;
    };
    Message.msgHasId = function (type) {
        return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
    };
    Message.caculateMsgIdBytes = function (id) {
        var len = 0;
        do {
            len += 1;
            id >>= 7;
        } while (id > 0);
        return len;
    };
    Message.msgHasRoute = function (type) {
        return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY ||
            type === Message.TYPE_PUSH;
    };
    Message.TYPE_REQUEST = 0;
    Message.TYPE_NOTIFY = 1;
    Message.TYPE_RESPONSE = 2;
    Message.TYPE_PUSH = 3;
    Message.MSG_FLAG_BYTES = 1;
    Message.MSG_ROUTE_CODE_BYTES = 2;
    Message.MSG_ROUTE_LEN_BYTES = 1;
    Message.MSG_COMPRESS_GZIP_ENCODE_MASK = 1 << 4;
    Message.MSG_COMPRESS_ROUTE_MASK = 0x1;
    Message.MSG_COMPRESS_GZIP_MASK = 0x1;
    Message.MSG_TYPE_MASK = 0x7;
    Message.MSG_ROUTE_CODE_MAX = 0xffff;
    return Message;
}());
