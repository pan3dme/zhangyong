var game;
(function (game) {
    var MailData = /** @class */ (function () {
        function MailData(vo) {
            this.itemList = [];
            this.svo = vo;
            this.tbMail = tb.TB_mail.getItemById(vo.type);
            for (var _i = 0, _a = vo.item; _i < _a.length; _i++) {
                var arr = _a[_i];
                this.itemList.push(new ItemVo(arr[0], arr[1]));
            }
        }
        /** 过期时间 */
        MailData.prototype.getTime = function () {
            var time = this.svo.endtime - App.serverTimeSecond;
            var day = Math.ceil(time / 86400);
            return day + LanMgr.getLan("", 12088);
        };
        /** 是否未读 */
        MailData.prototype.isUnread = function () {
            return this.svo.state == iface.tb_prop.mailStateTypeKey.unread;
        };
        /** 是否已读 */
        MailData.prototype.isRead = function () {
            return this.svo.state == iface.tb_prop.mailStateTypeKey.read;
        };
        /** 是否已领取 */
        MailData.prototype.isReward = function () {
            return this.svo.state == iface.tb_prop.mailStateTypeKey.get;
        };
        /** 是否有附件 */
        MailData.prototype.isHaveGift = function () {
            return this.itemList.length > 0;
        };
        /** 是否可领取 -- 有附件及未领取 */
        MailData.prototype.isCanReward = function () {
            return this.isHaveGift() && !this.isReward();
        };
        /** 是否已过期 */
        MailData.prototype.isExpired = function () {
            return App.serverTimeSecond >= this.svo.endtime;
        };
        /** 获取内容 */
        MailData.prototype.getContent = function () {
            if (!this.svo.content) {
                return this.tbMail.mail_content;
            }
            var ary = JSON.parse(this.svo.content);
            return FormatStr(this.tbMail.mail_content, game.MailModel.formatAryToStr(ary));
        };
        /** 获取标题 */
        MailData.prototype.getTitle = function () {
            if (!this.svo.title) {
                return this.tbMail.mail_name;
            }
            var ary = JSON.parse(this.svo.title);
            return FormatStr(this.tbMail.mail_name, game.MailModel.formatAryToStr(ary));
        };
        return MailData;
    }());
    game.MailData = MailData;
    var PointData = /** @class */ (function () {
        function PointData(vo) {
            this.svo = vo;
        }
        /** 过期时间 */
        PointData.prototype.getTime = function () {
            var time = this.svo.endTime - App.serverTimeSecond;
            var day = Math.ceil(time / 86400);
            return day + LanMgr.getLan("", 10025);
        };
        return PointData;
    }());
    game.PointData = PointData;
})(game || (game = {}));
