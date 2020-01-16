/*
* name;
*/
var LoginMsgHandler = /** @class */ (function () {
    function LoginMsgHandler() {
        this.reconnect = false;
        this.reconncetTimer = null;
        this.reconnectUrl = null;
        this.reconnectAttempts = 0;
        this.reconnectionDelay = 5000;
        this.DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;
        this.maxReconnectAttempts = 0;
    }
    LoginMsgHandler.init = function (params) {
        params = params || {};
        var reconnect = params.reconnect;
        //var maxReconnectAttempts = params.maxReconnectAttempts || DEFAULT_MAX_RECONNECT_ATTEMPTS;
        /**
         * Handle kick out messge, occours when the current player is kicked out
         */
        var pomelo = PLC.getInstance();
        pomelo.on('onKick', function () {
            logdebug("onKick");
            pomelo.disconnect("onKick");
        });
        /**
         * Handle disconect message, occours when the client is disconnect with servers
         * @param reason {Object} The disconnect reason
         */
        pomelo.on('disconnect', function (reason) {
            logdebug("disconnect:[%s]", reason);
            //back to login
        });
        pomelo.on('close', function (event) {
            logdebug("close");
            pomelo.emit('disconnect', event);
            if (!!reconnect) {
                this.reconncetTimer = setTimeout(function () {
                    pomelo.emit('reconnect');
                    this.reset();
                }, this.reconnectionDelay);
                this.reconnectionDelay *= 2;
            }
        });
        /**
         * Handle user leave message, occours when players leave the area
         * @param data {Object} Contains the playerId to leave the area.
         */
        pomelo.on('onUserLeave', function (data) {
            //var area = app.getCurArea();
            var playerId = data.playerId;
            //area.removePlayer(playerId);
            logdebug("onUserLeave:[%d]", playerId);
        });
    };
    LoginMsgHandler.prototype.reset = function () {
        this.reconnectionDelay = 5000;
        //reconnectAttempts = 0;
        clearTimeout(this.reconncetTimer);
        PLC.getInstance().off();
    };
    ;
    return LoginMsgHandler;
}());
