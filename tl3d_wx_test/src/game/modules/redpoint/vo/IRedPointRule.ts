
module game {

    export interface IRedPointRule {
        addHandler(handler:Handler);
        removeHandler(callback:Function, context:Object);
        visible:boolean;
        name:string;
        hasHandler (callback:Function, context:Object):boolean;
        getHandler (callback:Function, context:Object):Handler;
        clearHandler ():void;
        onDispose ():void;
    }
}