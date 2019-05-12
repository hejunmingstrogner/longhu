const {ccclass,property} = cc._decorator

@ccclass
export default class NewClass extends cc.Component{


      @property(cc.Node)
      markHeader = null
      @property(cc.Node)
      playerHeader = null
      @property(cc.Node)
      address = null

      @property(cc.Node)
      amount = null

      
      @property(cc.SpriteFrame)
      userHeaderone:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeadertwo:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeaderthe:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeaderfou:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeaderfiv:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeadersix:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeadersev:cc.SpriteFrame = null
      @property(cc.SpriteFrame)
      userHeadereig:cc.SpriteFrame = null
   
      // 玩家标志
      playerid = 0
      // 玩家分数
      totalCount = 0

     onLoad(){

        this.updateUserAmount()
        
     }
     start(){

        this.updateUserHeader(this.playerid)
     }
     // 更新玩家的头像
     updateUserHeader(uid){

            if(uid == 1){
               this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeaderone
               this.updateUserAddress('马来西亚')
            }else if(uid == 2){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame =  this.userHeadertwo
                this.updateUserAddress('中国台湾')
            }else if(uid == 3){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeaderthe
                this.updateUserAddress('安微滁州')
            }else if(uid == 4){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeaderfou
                this.updateUserAddress('上海')
            }else if(uid == 5){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeaderfiv
                this.updateUserAddress('新加坡')
            }else if(uid == 6){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeadersix
                this.updateUserAddress('河北承德')
            }else if(uid == 7){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeadersev
                this.updateUserAddress('江苏徐州')
            }else if(uid == 8){
                this.playerHeader.getComponent(cc.Sprite).spriteFrame = this.userHeadereig
                this.updateUserAddress('江西赣州')
            }
            
     }

     // 更新玩家的定位地址
     updateUserAddress(address){

        this.address.getComponent(cc.Label).string = address

     }

     // 更新玩家当前分数信息

     updateUserAmount(){

            this.amount.getComponent(cc.Label).string = this.totalCount.toString()
     }

     // 更新玩家的title          大富豪 战神
     updateUserMarkTiele(type){

        if (type == 1){

        }else if(type == 2){


        }


     }


}
