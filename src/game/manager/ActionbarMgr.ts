class ActionbarMgr {

    private _round: number;
    public uplimit: number;
    public static _instance: ActionbarMgr;
    public static getInstance(): ActionbarMgr {
        if (!this._instance) {
            this._instance = new ActionbarMgr();
        }
        return this._instance;
    }

    constructor() {

    }
}