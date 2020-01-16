/*
* name;
*/
class GameMsgHandler{
    constructor(){

    }
   
public static init() {
  /**
   * Handle move  message
   * @param data {Object} The message, contains move information
   */
  let pomelo=PLC.getInstance();
  pomelo.on('onMove', function(data){
    var path = data.path;
    logdebug("onMove:[%j]", data.path);
    /*var character = app.getCurArea().getEntity(data.entityId);
    if(!character){
      //logdebug('no character exist for move!' + data.entityId);
      return;
    }

    var sprite = character.getSprite();
    var totalDistance = utils.totalDistance(path);
    var needTime = Math.floor(totalDistance / sprite.getSpeed() * 1000 - app.getDelayTime());
    var speed = totalDistance/needTime * 1000;
    sprite.movePath(path, speed);*/
  });

  /**
   * Handle remove item message
   * @param data {Object} The message, contains the info for remove item
   */
  pomelo.on('onRemoveItem', function(data){
    //app.getCurArea().removeEntity(data.entityId);
    logdebug("onRemoveItem:[%j]", data);
  });

  /**
   * Handle pick item message
   * @param data {Object} The message, contains the info for pick item
   */
  pomelo.on('onPickItem', function(data) {
    /*var area = app.getCurArea();
    var player = area.getEntity(data.player);
    var item = area.getEntity(data.item);
    //Only add item for current player
    if (player.entityId === area.getCurPlayer().entityId && !!item) {
      player.bag.addItem({id: item.kindId, type: item.type}, data.index);
    }
    area.removeEntity(data.item);*/
    logdebug("onPickItem:[%j]", data);
  });

  /**
   * Handle npc talk message
   * @param data {Object} The message, contains the info for npc talk
   */
  pomelo.on('onNPCTalk', function(data){
    /*var npc = app.getCurArea().getEntity(data.npc);
    var curPlayer = app.getCurPlayer();
    var dir = {
      x1: curPlayer.getPosition().x,
      y1: curPlayer.getPosition().y,
      x2: npc.getPosition().x,
      y2: npc.getPosition().y
    };
    curPlayer.getSprite().stand(dir);
    dialogPanel.open(data);*/
    logdebug("onNPCTalk:[%j]", data);
  });

  /**
   * the order of attack, whose result contains success, killed and not_in_range
   * @param {Object} data  contains attacter, target, result ect.
   */
  pomelo.on('onAttack', function(data){
    /*var area = app.getCurArea();
    var skillId = data.skillId;
    var attacker = area.getEntity(data.attacker);
    var target = area.getEntity(data.target);

    if(!attacker || !target){
      logdebug('attacker or target not exist ! attacker: ' + data.attacker + ', target : ' + data.target);
      return;
    }

    var attackerSprite = attacker.getSprite();
    var targetSprite = target.getSprite();
    var attackerPos = attackerSprite.getPosition();
    var targetPos = targetSprite.getPosition();
    var resultData = data.result;
    var result = resultData.result;
    var skillEffectParams = {
      id: skillId,
      player: attacker,
      position: {x: targetPos.x - attackerPos.x, y: targetPos.y - attackerPos.y}
    };
    if (app.getCurPlayer().entityId == data.attacker && skillId > 1) {
      mainPanel.skillBox[skillId].start();
    }

    var params ={
      attacker: attacker,
      attackerSprite: attackerSprite,
      target: target,
      targetSprite: targetSprite,
      attackerPos: attackerPos,
      targetPos: targetPos,
      resultData: resultData,
      skillEffectParams: skillEffectParams,
      experience: data.exp
    };
    if (result === AttackResult.SUCCESS) {
      successAction(params);
    } else if (result === AttackResult.KILLED) {
      killedAction(params);
    } else if (result === AttackResult.NOT_IN_RANGE) {
      targetSprite.stand({x1: attackerPos.x, x2:attackerPos.y, y1: targetPos.x, y2: targetPos.y});
    }
    uiUpdate();*/
    logdebug("onAttack:[%j]", data);
  });

  /**
   * when player revives, it works
   * @param {Object} data
   */
  pomelo.on('onRevive', function(data) {
    /*var area = app.getCurArea();
    var curPlayer = app.getCurPlayer();
    if (curPlayer.entityId !== data.entityId) {
      area.addEntity(data.entity);
    }
    var player = area.getEntity(data.entityId);
    player.died = false;
    player.set('hp', data.hp);
    var sprite = player.getSprite();
    sprite.revive(data, function() {
      if (player.entityId === app.getCurPlayer().entityId) {
        area.map.centerTo(data.x, data.y);
        mainPanel.reviveMaskHide();
      }
    });*/
    logdebug("onRevive:[%j]", data);
  });
}
}