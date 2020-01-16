/*
* name;
*/
var ListVo = /** @class */ (function () {
    function ListVo($obj) {
        this.Zorder = UI_DEPATH_VALUE.TOP + 1;
        this.initData($obj);
    }
    ListVo.prototype.initData = function ($obj) {
        this._dataSource = $obj._dataSource;
        this._repeatX = $obj._repeatX;
        this._repeatY = $obj._repeatY;
        this._spaceX = $obj._spaceX;
        this._spaceY = $obj._spaceY;
    };
    ListVo.prototype.setZorder = function (zorder) {
        this.Zorder = zorder == UI_DEPATH_VALUE.ALERT ? zorder : zorder + 1;
    };
    ListVo.prototype.setPosition = function (x, y) {
        this._x = x;
        this._y = y;
    };
    ListVo.prototype.setWidth = function (value) {
        this._width = value;
    };
    ListVo.prototype.setHeight = function (value) {
        this._height = value;
    };
    return ListVo;
}());
