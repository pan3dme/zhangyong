/**
* name 
*/
module game {
    export class UpRoadProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "UpRoadProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            
        }

    
  
     

  

    

    }
}