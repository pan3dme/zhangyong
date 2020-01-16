

module game {

    export class ChatModel {

        public static MAX_COUNT : number = 50;
        public static SAVE_PEOPLE_COUNT : number = 10;      // 缓存人数
        public static SAVE_CHAT_COUNT : number = 20;        // 缓存聊天数据条数
        public static STORAGE_KEY : string = "slqy_chat";
        /** 表情数量 从0开始 */
		static ExpressionNum: number = 26;
        constructor() {
        }

        private _storage : PrivateChatStorage;
        private static _instance: ChatModel;
        public static getInstance(): ChatModel {
            if (!this._instance) {
                
                this._instance = new ChatModel();
            }
            return this._instance;
        }
        //语音sdk对象
        public main:IMblend;
        
        /** 初始化：私聊的缓存数据 */
        public initModel():void {
            this._storage = PrivateChatStorage.getInstance();
            this._storage.initStorage();
            this.addCustomChat(LanMgr.getLan("",12495));
        }
        /** 添加世界自定义消息 */
        public addCustomChat(content:string,channel:number=iface.tb_prop.chatChannelTypeKey.world,type=iface.tb_prop.chatTypeKey.text):void {
            let svo : any = {type,time:App.getServerTime(),content};
            let info = new ChatInfoVo(svo,channel);
            if(channel == iface.tb_prop.chatChannelTypeKey.guild){
                this._guildChatList.push(info);
            }else{
                this._worldChatList.push(info);
            }
            dispatchEvt(new ChatEvent(ChatEvent.ADD_ALL_CHAT,[info]));
        }

        public loginVoice():void
        {
            if(!this.main){
                // appId	String	是	应用编号(需向CloudVoice申请，统一由CloudVoice分配)
                // environment	Number	是	0为国内正式环境
                // isRecognize	Number	是	是否开启语音识别1为开启，0为关闭
                var initData:any = {appid:1003447,environment:0,isRecognize:1};
                initData.complate = function(data){
                    console.log('初始化成功',data);
                    setTimeout(()=> {
                        this.loginVoice();
                    }, 100);
                };
            this.main = new IMblend(initData);  // 初始化实例
                // userId	String	是	透传接入方用户id
                // roomId	String	是	房间号
                // complate	Function	是	接收返回结果函数
                var logData:any = {};
                logData.roomId = "1";
                logData.userId = App.hero.playerId;
                logData.complate = function(data){
                    if(data.result == 0){
                        // result 	Number		处理结果，成功为0，其他错误
                        // msg 	String 		返回的消息   
                        console.log('登陆成功',data)
                    };
                };
                this.main.loginRoom(logData);  // 登陆房间：调用该接口前请先初始化。
            }  
        }

        //开始录音
        public startRecord():void
        {
            if(!this.main){
                showToast(LanMgr.getLan(``,10250));
                return;
            }
            // ext	String	否	扩展字段，录音结束时返回
            // start	function	否	录音开始回调函数
            // finish	function	是	录音结束回调函数
            // recognitionFinish	function	否	开启语音识别时需要传递此函数
            this.main.startRecords({
                ext:new Date().getTime(),
                start:function(){
                    console.log('录音开始');
                },
                finish:function(data){
                    console.log('录音结束，在此处调用发送信息接口可以将语音发送给同房间的其他用户')
                    console.log(data);
                    dispatchEvt(new ChatEvent(ChatEvent.SEND_CHAT_TEXT,[data.voiceFilePath,1]));
                },
                recognitionFinish:function(data){
                    console.log('语音识别回调成功')
                    console.log(data)
                }
            }); // 开始录音：调用该接口前请先登陆房间。
        }

        //停止录音
        public stopRecord():void
        {
            if(!this.main){
                showToast(LanMgr.getLan(``,10250));
                return;
            }
            //result	Number		错误码：0为成功，其他为失败
            // msg	String		错误原因
            // voiceUrl	String		上传回调语音文件url（网络地址）
            // text	String		识别内容（finish回调中无此字段）
            this.main.stopRecord(); // 调用该接口后startRecords接口的finish函数接口录音结果, recognitionFinish接收识别返回结果
        }

        //播放线上录音：调用该接口前请先登陆房间。
        public playChatVoice(msg):void
        {
            if(!this.main){
                showToast(LanMgr.getLan(``,10250));
                return;
            }
            //voiceFilePath	String	是	语音文件网络地址
            this.main.playOnlineAudio ({
                voiceFilePath:msg.voiceFilePath,
                start:function(){
                    console.log('播放开始');
                },
                error:function(){
                    console.log('播放出错');
                },
                stop:function(data){
                    console.log('播放完成');     
            }
            }); // 播放线上录音：调用该接口前请先登陆房间。
        }

        //停止播放：调用该接口前请先登陆房间。
        public stopChatVoice():void
        {
            if(!this.main){
                showToast(LanMgr.getLan(``,10250));
                return;
            }
            this.main.stopPlayAudio(); // 停止播放：调用该接口前请先登陆房间。
        }

        //设置语音识别
        public setRecognize():void
        {
            if(!this.main){
                showToast(LanMgr.getLan(``,10250));
                return;
            }
            this.main.setRecognize(1); // 开启语音识别
            this.main.setRecognize(0); // 关闭语音识别
        }

        /**
         * 表情路径
         * @param str 代号 如：##00 ##01 (#会跟颜色#000000冲突)
         * 符号更改需改动的地方 getBqList、ChatInfoVo.formatHtmlText、getExpressionUrl
         */
        static getExpressionUrl(str:string):string {
            // 符号2位
            let bqid = parseInt(str.substring(2));
            return SkinUtil.getExpressionUrl(bqid);
        }
        /** 是否是表情代号 */
        static isExpression(str:string):boolean {
            if(str.length != 4) return false;
            if(str[0] != "#" && str[1]!="#") return false;
            // 符号2位
            let bqid = parseInt(str.substring(2));
            return bqid >= 0 && bqid < ChatModel.ExpressionNum;
        }

        private _bqList : IExpressionVo[];
        /** 获取表情列表 */
        getBqList():any[] {
            if(!this._bqList) {
                this._bqList = [];
                for(let i = 0 ; i < ChatModel.ExpressionNum ; i++) {
                    let id = i < 10 ? `##0${i}` : `##${i}`;
                    this._bqList.push({url:SkinUtil.getExpressionUrl(i),id,index:i});
                }
            }
            return this._bqList;
        }

        /** 获取聊天频道 */
        getChatListByType(type:number,count:number=0):ChatInfoVo[] {
            if(type == iface.tb_prop.chatChannelTypeKey.world) {
                return this._worldChatList;
            }else if(type == iface.tb_prop.chatChannelTypeKey.guild) {
                return this._guildChatList;
            }else if(type == iface.tb_prop.chatChannelTypeKey.group) {
                return this._groupChatList;
            }else if(type == iface.tb_prop.chatChannelTypeKey.province) {
                return this._provinceChatList;
            }else if(type == iface.tb_prop.chatChannelTypeKey.crossServer) {
                return this._crossChatList;
            }else if(type == iface.tb_prop.chatChannelTypeKey.system) {
                return this._systemList;
            }else{
                let chats = this._worldChatList.concat(this._guildChatList).concat(this._provinceChatList).concat(this._crossChatList);
                chats.sort((a,b)=>{
                    return a.svo.time - b.svo.time;
                });
                // 获取最新的几条
                if(count > 0 && chats.length > 0){
                    let start = chats.length - count;
                    start = start < 0 ? 0 : start;
                    chats = chats.slice(start,chats.length);
                }
                return chats;
            }
        }

        /** 新消息数量 */
        private _newNumMap = {};
        /** 世界聊天频道列表 */
        private _worldChatList : ChatInfoVo[] = [];
        /** 工会聊天频道列表 */
        private _guildChatList : ChatInfoVo[] = [];
        /** 私聊频道列表 */
        private _privateChatMap : Laya.Dictionary = new Laya.Dictionary();
        /** 队伍列表 */
        private _groupChatList : ChatInfoVo[] = [];
        /** 同省聊天列表 */
        private _provinceChatList : ChatInfoVo[] = [];
        /** 跨服聊天列表 */
        private _crossChatList : ChatInfoVo[] = [];
        /** 系统信息列表 */
        private _systemList : ChatInfoVo[] = [];
        updateChatList(data:any):void {
             if(!data){
                return;
            }
            let allArr = [];
            let info : ChatInfoVo;
            // 世界系统消息
            let worldSysList : IServerChatVo[] = [];
            let worldList : IServerChatVo[] = data['worldList'] || [];
            if(worldList && worldList.length > 0) {
                worldList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let wchangeList = [];
                let newNum = 0;
                for(let i = 0 ,len = worldList.length ;i<len; i++){
                    let svo = worldList[i];
                    //过滤掉黑名单
                    if (svo.senderId && App.hero.isInBlockList(svo.senderId)){
                        continue;
                    }
                    info = new ChatInfoVo(svo,iface.tb_prop.chatChannelTypeKey.world);
                    // 世界频道内，公告且senderid为空 也要添加进系统频道
                    if(info.svo.type == iface.tb_prop.chatTypeKey.notice && info.isSystem()) {
                        worldSysList.push(svo);
                    }
                    wchangeList.push(info);
                    this._worldChatList.push(info);
                    allArr.push(info);
                    if(!info.isSelf()) {
                        newNum ++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.world,newNum);
                if(this._worldChatList.length > ChatModel.MAX_COUNT) {
                    this._worldChatList.slice(0,ChatModel.MAX_COUNT);
                }
                dispatchEvt(new ChatEvent(ChatEvent.ADD_WORLD_CHAT,[].concat(wchangeList)));
            }
            let guildList : IServerChatVo[] = data['guildList'] || [];
            if(guildList.length > 0) {
                guildList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let gchangeList = [];
                let newNum = 0;
                for(let i = 0 ,len = guildList.length ;i<len; i++){
                    let svo = guildList[i];
                    //过滤掉黑名单
                    if (svo.senderId && App.hero.isInBlockList(svo.senderId)){
                        continue;
                    }
                    info = new ChatInfoVo(svo,iface.tb_prop.chatChannelTypeKey.guild);
                    gchangeList.push(info);
                    this._guildChatList.push(info);
                    allArr.push(info);
                    if(!info.isSelf()) {
                        newNum ++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.guild,newNum);
                if(this._guildChatList.length > ChatModel.MAX_COUNT) {
                    this._guildChatList.slice(0,ChatModel.MAX_COUNT);
                }
                dispatchEvt(new ChatEvent(ChatEvent.ADD_GUILD_CHAT,[].concat(gchangeList)));
            }
            let groupList : IServerChatVo[] = data['groupList'] || [];
            if(groupList.length > 0) {
                groupList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let tchangeList = [];
                let newNum = 0;
                for(let i = 0 ,len = groupList.length ;i<len; i++){
                    info = new ChatInfoVo(groupList[i],iface.tb_prop.chatChannelTypeKey.group);
                    tchangeList.push(info);
                    this._groupChatList.push(info);
                    allArr.push(info);
                    if(!info.isSelf()) {
                        newNum ++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.group,newNum);
                if(this._groupChatList.length > ChatModel.MAX_COUNT) {
                    this._groupChatList.slice(0,ChatModel.MAX_COUNT);
                }
                dispatchEvt(new ChatEvent(ChatEvent.ADD_GROUP_CHAT,[].concat(tchangeList)));
            }
            let provinceList : IServerChatVo[] = data['provinceList'] || [];
            if(provinceList.length > 0) {
                provinceList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let pchangeList = [];
                let newNum = 0;
                for(let i = 0 ,len = provinceList.length ;i<len; i++){
                    info = new ChatInfoVo(provinceList[i],iface.tb_prop.chatChannelTypeKey.province);
                    pchangeList.push(info);
                    this._provinceChatList.push(info);
                    allArr.push(info);
                    if(!info.isSelf()) {
                        newNum ++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.province,newNum);
                if(this._provinceChatList.length > ChatModel.MAX_COUNT) {
                    this._provinceChatList.slice(0,ChatModel.MAX_COUNT);
                }
                dispatchEvt(new ChatEvent(ChatEvent.ADD_PROVINCE_CHAT,[].concat(pchangeList)));
            }
            let crossList : IServerChatVo[] = data['crossList'] || [];
            if(crossList.length > 0) {
                crossList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let tchangeList = [];
                let newNum = 0;
                for(let i = 0 ,len = crossList.length ;i<len; i++){
                    info = new ChatInfoVo(crossList[i],iface.tb_prop.chatChannelTypeKey.crossServer);
                    tchangeList.push(info);
                    this._crossChatList.push(info);
                    allArr.push(info);
                    if(!info.isSelf()) {
                        newNum ++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.crossServer,newNum);
                if(this._crossChatList.length > ChatModel.MAX_COUNT) {
                    this._crossChatList.slice(0,ChatModel.MAX_COUNT);
                }
                dispatchEvt(new ChatEvent(ChatEvent.ADD_CROSS_CHAT,[].concat(tchangeList)));
            }
            let systemList : IServerChatVo[] = data['systemList'] || [];
            if(worldSysList.length > 0 || systemList.length > 0) {
                systemList = worldSysList.concat(systemList);
                systemList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let schangeList = [];
                for(let i = 0 ,len = systemList.length ;i<len; i++){
                    info = new ChatInfoVo(systemList[i],iface.tb_prop.chatChannelTypeKey.system);
                    schangeList.push(info);
                    this._systemList.push(info);
                    allArr.push(info);
                }
                if(this._systemList.length > ChatModel.MAX_COUNT) {
                    this._systemList.slice(0,ChatModel.MAX_COUNT);
                }
                dispatchEvt(new ChatEvent(ChatEvent.ADD_SYSTEM_CHAT,[].concat(schangeList)));
            }
            let whisperList : IServerChatVo[] = data['whisperList'] || [];
            if( whisperList.length > 0){
                whisperList.sort((a,b)=>{
                    return a.time - b.time;
                });
                let newPersonAry : PrivateChatInfoVo[] = [];
                for(let i = 0 ,len = whisperList.length ;i<len; i++){
                    let svo = whisperList[i] as IServerChatVo;
                    //过滤掉黑名单
                    if (svo.senderId && App.hero.isInBlockList(svo.senderId)){
                        continue;
                    }
                    info = new ChatInfoVo(svo,iface.tb_prop.chatChannelTypeKey.whisper);
                    let friendId = info.getFriendId();
                    let privateChatInfo = this._privateChatMap.get(friendId) as PrivateChatInfoVo;
                    if(!privateChatInfo){
                        privateChatInfo = this.createPrivateChatInfo(friendId);
                        newPersonAry.push(privateChatInfo);
                    }
                    if(!privateChatInfo.isExitChat(info.svo.senderId,info.svo.time)){
                        privateChatInfo.addChat(info);
                    }
                }
                this._storage.resetStorage();
                if(newPersonAry.length > 0){
                    dispatchEvt(new ChatEvent(ChatEvent.NEW_PERSON_PRIVATE_CHAT,newPersonAry));
                }
                dispatchEvt(new ChatEvent(ChatEvent.UPDATE_PRIVATE_CHAT));
            }
            if(allArr.length > 0) {
                allArr.sort((a,b)=>{
                    return a.svo.time - b.svo.time;
                });
                dispatchEvt(new ChatEvent(ChatEvent.ADD_ALL_CHAT,allArr));
            }
        }

        private _cdDic : any = {};
        /** 冷却时间(可以发言的时间戳) */
        setCdTime(cdTime,channel:number):void {
            if(cdTime && cdTime > 0){
                this._cdDic[channel] = cdTime;
            }
        }
        getCdTime(channel:number):number {
            return this._cdDic[channel] || 0;
        }
        clearCdTime():void{
            this._cdDic = {};
        }
        /** 新增新聊天消息数量 */
        addNewNum(channel:number,count:number):void {
            if(count == 0) return;
            if(!this._newNumMap.hasOwnProperty(channel)) {
                this._newNumMap[channel] = 0;
            }
            this._newNumMap[channel] += count;
            dispatchEvt(new ChatEvent(ChatEvent.UPDATE_NEW_CHAT_COUNT));
        }
        /** 重置数量 */
        resetNewNum(channel:number):void {
            this._newNumMap[channel] = 0;
            dispatchEvt(new ChatEvent(ChatEvent.UPDATE_NEW_CHAT_COUNT));
        }
        /** 获取新消息数量 */
        getNewNum(channel:number):number {
            return this._newNumMap[channel] || 0;
        }
        /** 是否有新聊天消息 */
        hasNewNum():boolean {
            let num = 0;
            for(let channel in this._newNumMap) {
                num += this.getNewNum(Number(channel));
            }
            return num > 0 ? true : false;
        }

        // ================ 私聊 ================
        hasNewPrivateChat():boolean {
            let ary = this._privateChatMap.values as Array<PrivateChatInfoVo>;
            return ary.some((vo)=>{
                return vo.newNum > 0;
            })
        }
        /** 创建私聊信息 */
        createPrivateChatInfo(playerId:string):PrivateChatInfoVo{
            if(!this._privateChatMap.get(playerId)){
                this._privateChatMap.set(playerId,new PrivateChatInfoVo(playerId));
            }
            return this._privateChatMap.get(playerId);
        }

        getPrivateChatMap():Laya.Dictionary{
            return this._privateChatMap;
        }
        /** 是否有私聊列表 */
        hasPrivateChat():boolean {
            return this._privateChatMap.values.length > 0;
        }
        /** 获取私聊好友列表 */
        getPrivateChatList():PrivateChatInfoVo[] {
            let list : PrivateChatInfoVo[] = [];
            for(let info of this._privateChatMap.values){
                if(FriendModel.getInstance().isMyFriend(info.playerId)) {
                    list.push(info);
                }
            }
            list.sort((a,b)=>{
                return b.lastTime - a.lastTime;
            });
            return list;
        }
        /** 删除私聊信息 */
        delPrivateChat(playerId:string):void {
            this._privateChatMap.remove(playerId);
            this._storage.delStorage(playerId);
            dispatchEvt(new ChatEvent(ChatEvent.UPDATE_PRIVATE_CHAT));
        }

        /** 获取标签页名称 */
        getTabbarDatas(openType:number):number[]{
            openType = isNaN(openType) ? 0 : openType;
            let arg = [iface.tb_prop.chatChannelTypeKey.world,iface.tb_prop.chatChannelTypeKey.guild,iface.tb_prop.chatChannelTypeKey.province,iface.tb_prop.chatChannelTypeKey.crossServer,iface.tb_prop.chatChannelTypeKey.system];
            if(openType == OpenType.godDm){
                arg.push(iface.tb_prop.chatChannelTypeKey.group);
                return arg;
            }else{
                return arg;
            }
        }

        /** 频道映射 分页--频道 */
        public channelMap : number[] = [
            iface.tb_prop.chatChannelTypeKey.world,iface.tb_prop.chatChannelTypeKey.guild,
            iface.tb_prop.chatChannelTypeKey.province,iface.tb_prop.chatChannelTypeKey.crossServer,
            iface.tb_prop.chatChannelTypeKey.system,iface.tb_prop.chatChannelTypeKey.group
        ];
        
        getChannelByIndex(index:number):number {
            return this.channelMap[index];
        }
        getIndexByChannel(channel:number):number {
            return this.channelMap.indexOf(channel);
        }
    }
    
}