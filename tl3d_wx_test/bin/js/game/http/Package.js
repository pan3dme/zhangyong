/**
 * Package protocol encode.
 *
 * Pomelo package format:
 * +------+-------------+------------------+
 * | type | body length |       body       |
 * +------+-------------+------------------+
 *
 * Head: 4bytes
 *   0: package type,
 *      1 - handshake,
 *      2 - handshake ack,
 *      3 - heartbeat,
 *      4 - data
 *      5 - kick
 *   1 - 3: big-endian body length
 * Body: body length bytes
 *
 * @param  {Number}    type   package type
 * @param  {ByteArray} body   body content in bytes
 * @return {ByteArray}        new byte array that contains encode result
 */
var Package = /** @class */ (function () {
    function Package() {
    }
    Package.encode = function (type, data) {
        var length = data.length;
        var buffer = new Laya.Byte();
        buffer.writeUint8(type & 0xff);
        buffer.writeUint8((length >> 16) & 0xff);
        buffer.writeUint8((length >> 8) & 0xff);
        buffer.writeUint8(length & 0xff);
        data.pos = 0;
        for (var index = 0; index < length; index++) {
            buffer.writeByte(data._getUInt8(index));
        }
        return buffer;
    };
    //解包
    Package.decode2 = function (buffer) {
        buffer.pos = 0;
        var type = buffer.readByte();
        var l1 = buffer.readByte();
        var l2 = buffer.readByte();
        var l3 = buffer.readByte();
        var len = (l1 << 16 | l2 << 8 | l3) >>> 0;
        var body;
        if (buffer.bytesAvailable <= len) {
            body = new Laya.Byte();
            var index = buffer.pos;
            var len1 = buffer.length;
            for (; index < len1; index++) {
                body.writeByte(buffer._getUInt8(index));
            }
        }
        else {
            logdebug('[Package] no enough length for current type:', type);
            len = 0;
        }
        if (body && len > 0 && type != 4) {
            body.pos = 0;
            var bodystr = body.readUTFBytes();
            body = JSON.parse(bodystr);
        }
        else {
            //logdebug("len error",body);
        }
        return { type: type, body: body, length: len };
    };
    //解包
    Package.decode = function (buffer) {
        buffer.pos = 0;
        var type = buffer.readByte();
        //logdebug("------recive:", type);
        var l1 = buffer.readByte();
        var l2 = buffer.readByte();
        var l3 = buffer.readByte();
        var len = (l1 << 16 | l2 << 8 | l3) >>> 0;
        if (buffer.bytesAvailable > len) {
            logdebug('[Package] no enough length for current type:', type);
            len = 0;
        }
        var body = buffer;
        if (len > 0 && type != 4) {
            var bodystr = buffer.readUTFBytes();
            body = JSON.parse(bodystr);
        }
        else {
            //logdebug("len error",buffer);
        }
        return { type: type, body: body, length: len };
    };
    Package.PKG_HEAD_BYTES = 4;
    Package.TYPE_HANDSHAKE = 1; //握手
    Package.TYPE_HANDSHAKE_ACK = 2; //确认
    Package.TYPE_HEARTBEAT = 3; //心跳
    Package.TYPE_DATA = 4; //数据
    Package.TYPE_KICK = 5; //踢人
    return Package;
}());
