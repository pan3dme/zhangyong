
module common {


    export class AutoLayoutList extends Laya.List {

        public AutoLayout(parentWidth:number, arr:any[]=null):void{
            if (!arr) arr = this.array;
            let num:number = arr ? arr.length : 0;
            let sjw:number = 0;
            if (num > 0){
                if (num < this.repeatX){
                    let cell = this.getCell(0);
                    sjw = (cell.width + this.spaceX)*num - this.spaceX;
                }else{
                    sjw = this.width;
                }
            }
            this.x = (parentWidth-sjw)/2;
        }

    }
}