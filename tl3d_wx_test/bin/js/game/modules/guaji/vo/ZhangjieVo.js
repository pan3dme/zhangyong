/**
* name
*/
var game;
(function (game) {
    /**
     * 挂机章节
     */
    var ZhangjieVo = /** @class */ (function () {
        function ZhangjieVo(copy) {
            //本章节最高通关关卡
            this.maxGuanka = null;
            this.tbCopy = copy;
            this.id = copy.ID;
            this.guankaMap = [];
            var tbCopyInfos = tb.TB_copy_info.get_TB_copy_info("area", copy.ID.toString());
            for (var index = 0; index < tbCopyInfos.length; index++) {
                var vo = new game.GuaJiGuanqiaVo();
                vo.index = index + 1;
                vo.chapterId = copy.ID;
                vo.chapter = copy.chapter;
                vo.tbCopyInfo = tbCopyInfos[index];
                vo.difflev = copy.sub_type;
                this.guankaMap[vo.tbCopyInfo.ID] = vo;
                this.updateGuaqiaState(vo.tbCopyInfo.ID);
            }
        }
        /**
         * 更新章节中关卡的通关状态
         */
        ZhangjieVo.prototype.updateGuaqiaState = function (id) {
            if (this.guankaMap.hasOwnProperty(id)) {
                var vo = this.guankaMap[id];
                this.updateState(vo);
            }
        };
        /**
         * 更新下一个关卡
         */
        ZhangjieVo.prototype.updateNextGuaqiaState = function (id) {
            if (this.guankaMap.hasOwnProperty(id)) {
                var vo = this.guankaMap[id];
                var nextid = vo.tbCopyInfo.next;
                if (this.guankaMap.hasOwnProperty(nextid)) {
                    var nextvo = this.guankaMap[nextid];
                    this.updateState(nextvo);
                    return -1;
                }
                else {
                    //下个章节的关卡开放了
                    return nextid;
                }
            }
        };
        ZhangjieVo.prototype.updateState = function (vo) {
            vo.updateState();
            if (vo.isPass) {
                if (!this.maxGuanka || this.maxGuanka.tbCopyInfo.ID < vo.tbCopyInfo.ID) {
                    this.maxGuanka = vo;
                }
            }
        };
        /**
         * 是否全部通关
         */
        ZhangjieVo.prototype.finish = function () {
            for (var key in this.guankaMap) {
                if (this.guankaMap.hasOwnProperty(key)) {
                    var element = this.guankaMap[key];
                    if (!element.isPass) {
                        return false;
                    }
                }
            }
            return true;
        };
        /**
         * 是否是新章节
         * 排除第一章
         */
        ZhangjieVo.prototype.isNew = function () {
            var hasnext = false;
            for (var key in this.guankaMap) {
                if (this.guankaMap.hasOwnProperty(key)) {
                    var element = this.guankaMap[key];
                    if (element.isPass) {
                        return false;
                    }
                    if (element.isNext())
                        hasnext = true;
                }
            }
            return hasnext && this.tbCopy.ID != 1000;
        };
        ZhangjieVo.prototype.getOpenLev = function () {
            for (var key in this.guankaMap) {
                if (this.guankaMap.hasOwnProperty(key)) {
                    var element = this.guankaMap[key];
                    if (element.tbCopyInfo.area_number == 1) {
                        return element.needLev();
                    }
                }
            }
            return 0;
        };
        /** 章节是否开放 */
        ZhangjieVo.prototype.isOpen = function () {
            for (var key in this.guankaMap) {
                if (this.guankaMap.hasOwnProperty(key)) {
                    var element = this.guankaMap[key];
                    if (element.isPass) {
                        return true;
                    }
                    if (element.isNext()) {
                        if (element.levPass()) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**获取关卡 */
        ZhangjieVo.prototype.getGuanqiaById = function (id) {
            if (this.guankaMap.hasOwnProperty(id)) {
                return this.guankaMap[id];
            }
            return null;
        };
        ZhangjieVo.prototype.getNext = function () {
            for (var key in this.guankaMap) {
                if (this.guankaMap.hasOwnProperty(key)) {
                    var element = this.guankaMap[key];
                    if (element.isNext()) {
                        return element;
                    }
                }
            }
            return null;
        };
        /**
         * 获得本章最大通关关卡
         */
        ZhangjieVo.prototype.getMaxPassVo = function () {
            var guanqia = null;
            for (var key in this.guankaMap) {
                if (this.guankaMap.hasOwnProperty(key)) {
                    var element = this.guankaMap[key];
                    if (!guanqia && element.isPass) {
                        guanqia = element;
                        continue;
                    }
                    if (!guanqia && element.isNext()) {
                        guanqia = element;
                        continue;
                    }
                    if (element.isPass && guanqia.tbCopyInfo.ID < element.tbCopyInfo.ID) {
                        guanqia = element;
                    }
                }
            }
            // if(!guanqia && this.tbCopy.ID == 1000){
            // 	guanqia = this.guankaMap[10001];
            // }
            return guanqia;
        };
        ZhangjieVo.prototype.getCurGuanqia = function () {
            var guanqia;
            if (this.finish()) {
                guanqia = this.maxGuanka;
            }
            else {
                guanqia = this.getNext();
            }
            return guanqia;
        };
        ZhangjieVo.prototype.getCurPassGuanqia = function () {
            var guanqia;
            if (this.maxGuanka) {
                guanqia = this.maxGuanka;
            }
            else {
                var keys = Object.keys(this.guankaMap);
                guanqia = this.guankaMap[keys[0]];
            }
            return guanqia;
        };
        return ZhangjieVo;
    }());
    game.ZhangjieVo = ZhangjieVo;
})(game || (game = {}));
