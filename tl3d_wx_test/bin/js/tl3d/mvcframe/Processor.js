var tl3d;
(function (tl3d) {
    var Processor = /** @class */ (function () {
        function Processor() {
        }
        Processor.prototype.getName = function () {
            throw new Error("process必须复写命名");
            //return "";
        };
        /**
        * 解析事件，之后交给处理函数
        * @param $notification
        */
        Processor.prototype.receivedModuleEvent = function ($event) {
        };
        /**
        * 监听的事件类的集合
        * 请注意：返回为事件的CLASS(这些CLASS必须继承自ModuleEvent)的数组
        * @return
        *
        */
        Processor.prototype.listenModuleEvents = function () {
            return null;
        };
        Processor.prototype.registerEvents = function () {
            //注册消息监听
            var meClassArr = this.listenModuleEvents();
            if (meClassArr != null && meClassArr.length > 0) {
                tl3d.ModuleEventManager.addEvents(meClassArr, this.receivedModuleEvent, this);
            }
        };
        Processor.prototype.getHanderMap = function () {
            var obj = new Object;
            return obj;
        };
        return Processor;
    }());
    tl3d.Processor = Processor;
})(tl3d || (tl3d = {}));
