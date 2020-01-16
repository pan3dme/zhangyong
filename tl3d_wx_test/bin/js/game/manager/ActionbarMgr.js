var ActionbarMgr = /** @class */ (function () {
    function ActionbarMgr() {
    }
    ActionbarMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new ActionbarMgr();
        }
        return this._instance;
    };
    return ActionbarMgr;
}());
