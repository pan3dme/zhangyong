var game;
(function (game) {
    var MailModel = /** @class */ (function () {
        function MailModel() {
            /** 登录时是否显示邮件红点（未请求列表） */
            this.loginMailRp = false;
            /** 登录时是否显示友情点红点（未请求列表） */
            this.loginPointRp = false;
            /** 是否有未读邮件 */
            this.hasNewMail = false;
            /** 新友情点邮件数据 */
            this.hasNewPointMail = false;
            // =============================== 邮件 ===============================
            this._list = [];
            /** 是否已请求过列表 */
            this._initedMail = false;
            // =============================== 友情点 ===============================
            this._pointList = [];
            this._initedPoint = false;
        }
        MailModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MailModel();
            }
            return this._instance;
        };
        MailModel.prototype.updateNewMail = function (flag) {
            this.hasNewMail = flag;
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_MAIL_DATA));
        };
        MailModel.prototype.updateNewPoint = function (flag) {
            this.hasNewPointMail = flag;
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_FRIEND_POINT_DATA));
        };
        /** 设置邮件 */
        MailModel.prototype.setMailList = function (mailList) {
            this._list = [];
            for (var _i = 0, mailList_1 = mailList; _i < mailList_1.length; _i++) {
                var svo = mailList_1[_i];
                this._list.push(new game.MailData(svo));
            }
            this._list.sort(function (a, b) {
                return b.svo.endtime - a.svo.endtime;
            });
            this.loginMailRp = false;
            this.hasNewMail = false;
            this._initedMail = true;
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_MAIL_DATA));
        };
        /** 是否需要请求邮件列表 */
        MailModel.prototype.needRequestMail = function () {
            return !this._initedMail || this.hasNewMail;
        };
        /** 获取邮件列表 */
        MailModel.prototype.getMailList = function () {
            return this._list;
        };
        /** 更新邮件状态 */
        MailModel.prototype.updateMailState = function (sdata) {
            for (var _i = 0, sdata_1 = sdata; _i < sdata_1.length; _i++) {
                var arr = sdata_1[_i];
                var mail = this.getMailByID(arr[0]);
                if (mail) {
                    mail.svo.state = arr[1];
                }
            }
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_MAIL_DATA));
        };
        /** 删除邮件 */
        MailModel.prototype.delMail = function (mid) {
            var mail = this.getMailByID(mid);
            if (mail) {
                var index = this._list.indexOf(mail);
                this._list.splice(index, 1);
            }
        };
        /** 删除多封邮件 */
        MailModel.prototype.delMails = function (mids) {
            for (var _i = 0, mids_1 = mids; _i < mids_1.length; _i++) {
                var mid = mids_1[_i];
                this.delMail(mid);
            }
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_MAIL_DATA));
        };
        /** 获取邮件 */
        MailModel.prototype.getMailByID = function (mid) {
            var mail = this._list.find(function (m) {
                return m.svo.mailId == mid;
            });
            return mail;
        };
        /** 获取可删除的邮件数量 1.已读邮件且附件已领取的邮件 2.已读邮件且无附件的邮件*/
        MailModel.prototype.getCanDelMailCnt = function () {
            var list = this._list.filter(function (mail) {
                return mail.isReward() || (mail.isRead() && !mail.isHaveGift());
            });
            return list.length;
        };
        /** 获取可领取的邮件数量*/
        MailModel.prototype.getCanGetMailCnt = function () {
            var list = this._list.filter(function (mail) {
                return mail.isHaveGift() && !mail.isReward();
            });
            return list.length;
        };
        /** 是否显示邮件红点 */
        MailModel.prototype.isShowMailRedpoint = function () {
            return this.loginMailRp || this.hasNewMail || this._list.some(function (mail) {
                return mail.isUnread() || mail.isCanReward();
            });
        };
        MailModel.prototype.getPointList = function () {
            return this._pointList;
        };
        MailModel.prototype.needRequestPointMail = function () {
            return !this._initedPoint || this.hasNewPointMail;
        };
        /** 设置邮件 */
        MailModel.prototype.sePointList = function (pointList) {
            this._pointList = [];
            for (var _i = 0, pointList_1 = pointList; _i < pointList_1.length; _i++) {
                var svo = pointList_1[_i];
                this._pointList.push(new game.PointData(svo));
            }
            this._pointList.sort(function (a, b) {
                return b.svo.endTime - a.svo.endTime;
            });
            this.loginPointRp = false;
            this.hasNewPointMail = false;
            this._initedPoint = true;
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_FRIEND_POINT_DATA));
        };
        /** 删除友情点邮件 */
        MailModel.prototype.delPointMail = function (mid) {
            var mail = this.getPointMailByID(mid);
            if (mail) {
                var index = this._pointList.indexOf(mail);
                this._pointList.splice(index, 1);
            }
        };
        /** 删除多封友情点邮件 */
        MailModel.prototype.delPointMails = function (mids) {
            for (var _i = 0, mids_2 = mids; _i < mids_2.length; _i++) {
                var mid = mids_2[_i];
                this.delPointMail(mid);
            }
            dispatchEvt(new game.MailEvent(game.MailEvent.UPDATE_FRIEND_POINT_DATA));
        };
        /** 获取友情点邮件 */
        MailModel.prototype.getPointMailByID = function (mid) {
            var mail = this._pointList.find(function (m) {
                return m.svo.pointId == mid;
            });
            return mail;
        };
        /** 是否可操作 -- 可领取友情点 */
        MailModel.prototype.canOperateFriendPoint = function () {
            // 每日可领取的友情点上限之内
            // return this._pointList.length > 0 && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.friendPoint) < tb.TB_game_set.getMaxFriendPonit() ;
            return this.loginPointRp || this.hasNewPointMail || this._pointList.length > 0;
        };
        /** 格式化 */
        MailModel.formatAryToStr = function (ary) {
            var result = [];
            for (var i = 0, len = ary.length; i < len; i++) {
                var type = ary[i][0];
                var value = ary[i][1];
                switch (type) {
                    case iface.tb_prop.mailArgsTypeKey.none:
                        result.push(value);
                        break;
                    case iface.tb_prop.mailArgsTypeKey.item:
                        var item = tb.TB_item.get_TB_itemById(value);
                        result.push(item.name);
                        break;
                    case iface.tb_prop.mailArgsTypeKey.honourBet:
                        var tbHonour = tb.TB_honour.getItemById(value);
                        result.push(tbHonour.name);
                        break;
                    case iface.tb_prop.mailArgsTypeKey.honourAward:
                        var tbHonourR = tb.TB_honour_reward.getItemById(value);
                        result.push(tbHonourR.desc);
                        break;
                }
            }
            return result;
        };
        return MailModel;
    }());
    game.MailModel = MailModel;
})(game || (game = {}));
