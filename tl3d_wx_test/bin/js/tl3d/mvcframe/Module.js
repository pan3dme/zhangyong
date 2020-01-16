var tl3d;
(function (tl3d) {
    var Module = /** @class */ (function () {
        function Module() {
            /**
                 * processor字典
                 */
            this.processorMap = new Object();
        }
        Module.prototype.getModuleName = function () {
            throw new Error("module必须复写命名");
            //return "";
        };
        /**
        * 注册的Processor的集合
        * 请注意：返回为Processor的实例数组
        * @return
        *
        */
        Module.prototype.listProcessors = function () {
            return null;
        };
        /**
         * 模块初始化
         */
        Module.prototype.onRegister = function () {
        };
        /**
        * 注册所有的Processor
        */
        Module.prototype.registerProcessors = function () {
            //注册Processor
            var processorArr = this.listProcessors();
            if (processorArr != null && processorArr.length > 0) {
                for (var i = 0; i < processorArr.length; i++) {
                    this.registerProcessor(processorArr[i]);
                }
            }
        };
        /**
        * 注册Processor
        * @param $processor
        */
        Module.prototype.registerProcessor = function ($processor) {
            //单例
            if (this.processorMap[$processor.getName()] != null) {
                throw new Error("同一Module不能注册两个相同的Processor");
            }
            this.processorMap[$processor.getName()] = $processor;
            $processor.registerEvents();
            //NetManager.getInstance().reg($processor);
        };
        /**
        * 注册Module
        * @param $module
        */
        Module.registerModule = function ($module) {
            //单例
            if (Module.moduleMap[$module.getModuleName()] != null) {
                throw new Error("不能注册两个相同的Module：" + $module.getModuleName());
            }
            Module.moduleMap[$module.getModuleName()] = $module;
            $module.registerProcessors();
            $module.onRegister();
        };
        /**
        * module字典
        */
        Module.moduleMap = new Object();
        return Module;
    }());
    tl3d.Module = Module;
})(tl3d || (tl3d = {}));
