var tl3d;
(function (tl3d) {
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            this._eventsMap = null;
        }
        EventDispatcher.prototype.addEventListener = function (types, listener, thisObject) {
            if (!this._eventsMap) {
                this._eventsMap = new Object;
            }
            var list = this._eventsMap[types];
            if (!list) {
                list = this._eventsMap[types] = [];
            }
            var eventBin = { listener: listener, thisObject: thisObject };
            for (var i = 0; i < list.length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject) {
                    return;
                }
            }
            list.push(eventBin);
        };
        //是否存在监听
        EventDispatcher.prototype.hasEventListener = function (type) {
            return this._eventsMap && this._eventsMap[type] != null;
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject) {
            if (this._eventsMap == null) {
                return;
            }
            var list = this._eventsMap[type];
            for (var i = 0; list && i < list.length; i++) {
                var bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject) {
                    list.splice(i, 1);
                    return;
                }
            }
        };
        EventDispatcher.prototype.removeEventListenerByName = function (type) {
            if (this._eventsMap == null) {
                return;
            }
            var list = this._eventsMap[type];
            if (list) {
                list.length = 0;
            }
        };
        EventDispatcher.prototype.removeEventListenerByTarget = function (thisObject) {
            if (this._eventsMap == null) {
                return;
            }
            for (var type in this._eventsMap) {
                var list = this._eventsMap[type];
                if (list) {
                    for (var i = 0; list && i < list.length; i++) {
                        var bin = list[i];
                        if (bin.thisObject == thisObject) {
                            list.splice(i, 1);
                            return;
                        }
                    }
                }
            }
        };
        EventDispatcher.prototype.removeEventListenerByNameAndTarget = function (type, thisObject) {
            if (this._eventsMap == null) {
                return;
            }
            var list = this._eventsMap[type];
            if (list) {
                for (var i = 0; list && i < list.length; i++) {
                    var bin = list[i];
                    if (bin.thisObject == thisObject) {
                        list.splice(i, 1);
                        return;
                    }
                }
            }
        };
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var eventMap = this._eventsMap;
            if (!eventMap) {
                return true;
            }
            var list = eventMap[event.type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length == 0) {
                return true;
            }
            event.target = this;
            var copyList = [].concat.apply([], list);
            for (var i = 0; i < length; i++) {
                var eventBin = copyList[i];
                if (eventBin) {
                    eventBin.listener.call(eventBin.thisObject, event);
                }
            }
        };
        return EventDispatcher;
    }());
    tl3d.EventDispatcher = EventDispatcher;
})(tl3d || (tl3d = {}));
