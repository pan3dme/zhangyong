module copymodule {
    export class CopyUtils {
        /**
         * 副本是否开启
         * @param precondition 开启条件 表字段
         * @param maxlev 已通关的当前需比较判断最高关卡id
         */
        public static copyOpen(precondition, maxlev) {
            if (precondition.length <= 0) return { isopen: false, info: LanMgr.getLan(``,10316),condition: null };
            for (var i = 0; precondition && i < precondition.length; i++) {
                var element = precondition[i];
                if (element[0] == CopyConditionType.id) {
                    if (maxlev < element[1]) {
                        return { isopen: false, info: LanMgr.getLan("", 11001), condition: element };
                    }
                } else if (element[0] == CopyConditionType.level) {
                    if (element[1] > App.hero.level) {
                        return { isopen: false, info: LanMgr.getLan("", 11002, element[1]), condition: element };
                    }
                } else if (element[0] == CopyConditionType.power) {
                    if (element[1] > App.hero.force) {
                        return { isopen: false, info: LanMgr.getLan("", 11004, element[1]), condition: element };
                    }
                }
            }
            return { isopen: true, info: "", condition: null };
        }
    }
}