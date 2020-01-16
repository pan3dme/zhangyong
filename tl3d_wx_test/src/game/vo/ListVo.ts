/*
* name;
*/
class ListVo {
    _dataSource: any
    Zorder:number;
    _repeatX: any
    _repeatY: any
    _spaceX: any
    _spaceY: any
    _height: any
    _width: any
    _x: any
    _y: any
    constructor($obj) {
        this.Zorder = UI_DEPATH_VALUE.TOP + 1;
        this.initData($obj);
    }

    initData($obj) {
        this._dataSource = $obj._dataSource;
        this._repeatX = $obj._repeatX;
        this._repeatY = $obj._repeatY;
        this._spaceX = $obj._spaceX;
        this._spaceY = $obj._spaceY;
    }

    setZorder(zorder:number):void {
         this.Zorder = zorder == UI_DEPATH_VALUE.ALERT ? zorder : zorder + 1; 
    }

    public setPosition(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public setWidth(value: number): void {
        this._width = value;
    }

    public setHeight(value: number): void {
        this._height = value;
    }
}