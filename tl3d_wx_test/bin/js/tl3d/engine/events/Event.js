var tl3d;
(function (tl3d) {
    var BaseEvent = /** @class */ (function () {
        function BaseEvent($type) {
            this.type = $type;
        }
        BaseEvent.COMPLETE = "complete";
        return BaseEvent;
    }());
    tl3d.BaseEvent = BaseEvent;
})(tl3d || (tl3d = {}));
