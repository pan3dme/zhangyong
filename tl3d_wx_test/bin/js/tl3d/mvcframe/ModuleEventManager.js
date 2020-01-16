var tl3d;
(function (tl3d) {
    var ModuleEventManager = /** @class */ (function () {
        function ModuleEventManager() {
        }
        ModuleEventManager.addEvents = function (ary, $fun, $thisObj) {
            for (var i = 0; i < ary.length; i++) {
                ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
            }
        };
        ModuleEventManager.dispatchEvent = function ($event) {
            ModuleEventManager._instance.dispatchEvent($event);
        };
        ModuleEventManager.addEvent = function (type, listener, thisObject) {
            ModuleEventManager._instance.addEventListener(type, listener, thisObject);
        };
        ModuleEventManager.removeEvent = function (type, listener, thisObject) {
            ModuleEventManager._instance.removeEventListener(type, listener, thisObject);
        };
        ModuleEventManager.removeEventByName = function (type) {
            ModuleEventManager._instance.removeEventListenerByName(type);
        };
        ModuleEventManager.removeEventByNameAndTarget = function (type, thisObject) {
            ModuleEventManager._instance.removeEventListenerByNameAndTarget(type, thisObject);
        };
        ModuleEventManager.removeEventByTarget = function (thisObject) {
            ModuleEventManager._instance.removeEventListenerByTarget(thisObject);
        };
        ModuleEventManager._instance = new tl3d.EventDispatcher();
        return ModuleEventManager;
    }());
    tl3d.ModuleEventManager = ModuleEventManager;
})(tl3d || (tl3d = {}));
