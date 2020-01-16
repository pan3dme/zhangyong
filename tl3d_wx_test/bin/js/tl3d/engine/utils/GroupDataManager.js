var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tl3d;
(function (tl3d) {
    var GroupDataManager = /** @class */ (function (_super) {
        __extends(GroupDataManager, _super);
        function GroupDataManager(scene) {
            var _this = _super.call(this) || this;
            _this._loadDic = new Object;
            _this.scene = scene;
            return _this;
        }
        GroupDataManager.prototype.getGroupData = function ($url, $fun) {
            var _this = this;
            if (this._dic[$url]) {
                var gr = this._dic[$url];
                gr.useNum++;
                $fun(gr);
                return;
            }
            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);
            var group = new tl3d.GroupRes();
            group.load($url, function () {
                var ary = _this._loadDic[$url];
                for (var i = 0; i < ary.length; i++) {
                    var fun = ary[i];
                    fun(group);
                }
                _this._dic[$url] = group;
                delete _this._loadDic[$url];
                group.initReg();
            });
        };
        GroupDataManager.prototype.perLoadData = function ($url, $fun) {
            var _this = this;
            if (this._dic[$url]) {
                if ($fun) {
                    $fun();
                }
                return;
            }
            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);
            var group = new tl3d.GroupRes();
            group.scene = this.scene;
            group.load($url, function () {
                _this._dic[$url] = group;
                delete _this._loadDic[$url];
                group.initReg();
                if ($fun) {
                    $fun();
                }
            });
        };
        return GroupDataManager;
    }(tl3d.ResGC));
    tl3d.GroupDataManager = GroupDataManager;
})(tl3d || (tl3d = {}));
