/*
* name;
*/
module game {
    export class ResProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "ResProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof ResEvent) {
                switch ($event.type) {
                    case ResEvent.RESOURCE_CHANGE:
                        logdebug("货币变化");
                        break;
                    case ResEvent.PROP_CHANGE:
                        logdebug("道具变化");
                        break;
                }
            }
        }
    }
}
