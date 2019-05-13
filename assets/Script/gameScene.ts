// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import player from './player'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    leftPocker = null

    @property(cc.Node)
    rightPocker = null

    @property(cc.Node)
    leftList = null

    @property(cc.Node)
    rightList = null

    @property(cc.Label)
    timeLabel = null

    @property(cc.Label)
    statusLabel = null

    @property(cc.Node)
    recodeList = null

    @property(cc.Prefab)
    choujingPrefab = null
    @property(cc.Prefab)
    gameUser = null
    @property(cc.Node)
    otherUser = null
    @property(cc.Node)
    currentUser = null
    @property(cc.Label)
    roomState = null
    @property(cc.Label)
    leftPockerValue = null
    @property(cc.Label)
    rightPockerValue = null
    @property(cc.Node)
    leftPockerParent = null
    @property(cc.Node)
    rightPockerParent = null
    // 当前玩家选择投哪一边  0.  庄    1.   闲     2. 和
    gameBian = 0
    
    choumaParent:cc.Node = null
    //  当前局的总投注数
    zhuangTotal = 0
    xianTotal = 0
    heTotal = 0
    @property(cc.Label)
    zhuangzhuLabel:cc.Label = null
    @property(cc.Label)
    xianzhuLabel:cc.Label = null
    @property(cc.Label)
    hezhuLabel:cc.Label = null


    // 筹码
    @property(cc.Prefab)
    chuomaPrefab:cc.Prefab[] = []

    choumaArray:cc.NodePool[]= []



    yuan1Nodepool:cc.NodePool = new cc.NodePool()
    yuan10Nodepool:cc.NodePool = new cc.NodePool()
    fiftyNodePool:cc.NodePool = new cc.NodePool()
    hundredNodePool:cc.NodePool = new cc.NodePool()
    fiveHundredNodePool:cc.NodePool = new cc.NodePool()

    mianer:number[] = [1,10,50,100,500]
    pockerValue:string[] = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    longScore = 0
    huScore = 0
    // 倒计时时间参数
    timeCount = 0


    playerArray:cc.Node[] = []

    @property(cc.Node)
    zhuang = null

    @property(cc.Node)
    xian = null

    @property(cc.Node)
    he = null

    @property(cc.Node)
    yiyuan = null
    @property(cc.Node)
    shiyuan = null
    @property(cc.Node)
    wushiyuan = null
    @property(cc.Node)
    yibaiyuan = null
    @property(cc.Node)
    wubaiyuan = null

    @property(cc.Prefab)
    playHeader = null
  
  
    // 各种声音资源
    @property(cc.AudioClip)
    baMusic = null 
    @property(cc.AudioClip)
    longWin = null
    @property(cc.AudioClip)
    huWin = null
    @property(cc.AudioClip)
    heju = null

    @property(cc.AudioClip)
    vsAudio = null


    roomStatus = 1   // 1。 下注时间   2。 停止下注

     time = 2

    onLoad () {

      this.schedule(this.timeMethod,1)

      // 添加房间的玩家

        let nodeone = cc.instantiate(this.gameUser)
        let nodetwo = cc.instantiate(this.gameUser)
        let nodethe = cc.instantiate(this.gameUser)
        let nodefou = cc.instantiate(this.gameUser)
        let nodefiv = cc.instantiate(this.gameUser)
        let nodesix = cc.instantiate(this.gameUser)
        nodeone.getComponent('player').totalCount = 10000
        nodetwo.getComponent('player').totalCount = 20000
        nodethe.getComponent('player').totalCount = 30000
        nodefou.getComponent('player').totalCount = 40000
        nodefiv.getComponent('player').totalCount = 50000
        nodesix.getComponent('player').totalCount = 60000
        nodeone.getComponent('player').playerid = 1
        nodetwo.getComponent('player').playerid = 2
        nodethe.getComponent('player').playerid = 3
        nodefou.getComponent('player').playerid = 4
        nodefiv.getComponent('player').playerid = 5
        nodesix.getComponent('player').playerid = 6


        this.leftList.addChild(nodeone)
        this.leftList.addChild(nodetwo)
        this.leftList.addChild(nodethe)

        this.rightList.addChild(nodefou)
        this.rightList.addChild(nodefiv)
        this.rightList.addChild(nodesix)

        nodeone.setPosition(cc.v2(0,300))
        nodetwo.setPosition(cc.v2(0,0))
        nodethe.setPosition(cc.v2(0,-300))
        nodefou.setPosition(cc.v2(0,300))
        nodefiv.setPosition(cc.v2(0,0))
        nodesix.setPosition(cc.v2(0,-300))

        this.playerArray.push(nodeone)
        this.playerArray.push(nodetwo)
        this.playerArray.push(nodethe)
        this.playerArray.push(nodefou)
        this.playerArray.push(nodefiv)
        this.playerArray.push(nodesix)

        this.choumaParent = this.node.getChildByName('choumaParent')


        let other = cc.instantiate(this.gameUser)
        this.otherUser.addChild(other)
        other.getComponent('player').playerid = 7

        let current = cc.instantiate(this.gameUser)
        this.currentUser.addChild(current)
        current.getComponent('player').playerid = 8

        this.playerArray.push(current)
        this.playerArray.push(other)
        
        this.initChouma()
   
        console.log('start Game+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
   
    }

   initChouma(){

    this.choumaArray.push(this.yuan1Nodepool)
    this.choumaArray.push(this.yuan10Nodepool)
    this.choumaArray.push(this.fiftyNodePool)
    this.choumaArray.push(this.hundredNodePool)
    this.choumaArray.push(this.fiveHundredNodePool)
    for(let j = 0;j < 5;j++)
    {

        for(let i = 0;i < 50;i++){

            let node = cc.instantiate(this.chuomaPrefab[j])

             this.choumaArray[j].put(node)

        }


    }

   }

   // 获取筹码方法

   getChoumaMethod(index){

    if(this.choumaArray[index].size() > 0){


        return this.choumaArray[index].get()
    }

     let node = cc.instantiate(this.chuomaPrefab[index])

     return node
   }

    timeMethod(var1){

        this.time --    
        if(this.time === 0){

            this.unschedule(this.timeMethod)
            this.updateRoomState(2)
            this.node.getChildByName('tingzhixiazhu').active = true
            this.timeLabel.string = ''
            this.scheduleOnce(this.timeMethod2,3)
            return;
        }else if(this.time > 0 && this.time <= 4){

        }

        this.timeLabel.string = this.time.toString()

    }

    timeMethod2(){

       this.node.getChildByName('tingzhixiazhu').active = false
       this.showPockerCard()
        
    }

    // 翻牌动画
    showPockerCard(){

           // 生成龙的牌随机点数   

             this.longScore = Math.floor(Math.random() * this.pockerValue.length)

            // 生成虎的牌随机点数
      
             this.huScore  = Math.floor(Math.random() * this.pockerValue.length)
      
             let longValue = this.pockerValue[this.longScore]
             let huvalue = this.pockerValue[this.huScore]
      
             this.leftPocker.active = false
             this.rightPocker.active = false
             this.leftPockerParent.active = true
             this.rightPockerParent.active = true
             this.leftPockerValue.string = longValue
             this.rightPockerValue.string = huvalue

             if(this.longScore > this.huScore){
                
                cc.audioEngine.play(this.longWin,false,1)

             }else if(this.longScore < this.huScore){

                cc.audioEngine.play(this.huWin,false,1)
             }else if(this.longScore == this.huScore){

                cc.audioEngine.play(this.heju,false,1)
             }

           this.scheduleOnce(this.doneAnimation,2)
    }
    
    // 展示结局动画
    doneAnimation(){

            cc.audioEngine.play(this.vsAudio,false,1)
            this.node.getChildByName('animationNode').active = true
        
            this.scheduleOnce(()=>{
                this.node.getChildByName('animationNode').active = false
                 this.endTheGame()
            },2)

    }

    // 更新房间状态方法 1. 开始下注  2. 停止下注         需要修改状态标题等
    updateRoomState(type){

        this.roomStatus = type
        if(type == 1){

            this.statusLabel.string = '开始下注'    
            this.node.getChildByName('tingzhixiazhu').active = false
        }else if(type == 2){

            this.statusLabel.string = '停止下注'
            this.node.getChildByName('tingzhixiazhu').active = true
        }


    }

    // 选择投注哪一边  0.庄 1.闲  2.和
    touzhuZhuang(){

        this.gameBian = 0
    }
    touzhuXian(){

        this.gameBian = 1
    }
    touzhuHe(){

        this.gameBian = 2
    }
    // 投注方法
    touzhu1yuan(){

       if(this.roomStatus == 1){

            this.touzhuAnimation(1)
    
        }
    }
    touzhu10yuan(){

        if(this.roomStatus == 1){
   
            this.touzhuAnimation(10)
   
        }
    }
    touzhu50yuan(){
        
        if(this.roomStatus == 1){

            this.touzhuAnimation(50)

        }
        
    }
    touzhu100yuan(){

        if(this.roomStatus == 1){

            this.touzhuAnimation(100)

        }
    }
    touzhu500yuan(){

        if(this.roomStatus == 1){

            this.touzhuAnimation(500)

        }
    }

    // 投注动画方法 当前用户投注方法
    touzhuAnimation(amount){

        let despos = this.node.getPosition()
        let randomX = Math.random() - 0.5
        let randomY = Math.random() - 0.5
        let taizuoObj = null
        if(this.gameBian == 0){

            despos = this.zhuang.getPosition()
            let contentSize =  this.zhuang.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY
            taizuoObj = this.zhuang
        }else if(this.gameBian == 1){

            despos = this.xian.getPosition()
            let contentSize =  this.xian.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY
            taizuoObj = this.xian
        }else if(this.gameBian == 2){
            despos = this.he.getPosition()
            let contentSize =  this.he.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY
            taizuoObj = this.he
        }

        let des =  taizuoObj.convertToWorldSpaceAR(despos)
         despos = this.choumaParent.convertToNodeSpaceAR(des)
   

        let newChouJing = this.getChoumaMethod(this.mianer.indexOf(amount))
        let srcpos = this.playerArray[6].getPosition()
        // if(amount == 1){

        //     srcpos = this.yiyuan.getPosition()
      
        // }else if(amount == 10){

        //     srcpos = this.shiyuan.getPosition()
    
        // }else if(amount == 50){

        //     srcpos = this.wushiyuan.getPosition()
      
        // }else if(amount == 100){

        //     srcpos = this.yibaiyuan.getPosition()
   
        // }else if(amount == 500){

        //     srcpos = this.wubaiyuan.getPosition()
     
        // }

     
      //  let wordpos = this.node.getChildByName('bottomBar').getChildByName('bottomList').convertToWorldSpaceAR(srcpos)
        srcpos = this.choumaParent.convertToNodeSpaceAR(srcpos)
        this.choumaParent.addChild(newChouJing)
        newChouJing.setPosition(srcpos)
    
        newChouJing.runAction(cc.moveTo(1,despos))
    }


    // 其它用户投注方法   左起 1 ,2 , 3   右起 4 , 5 , 6 

    xiazhuMehtod(userNumber,index,tuAmount){

      let score =  this.playerArray[userNumber - 1].getComponent('player').totalCount


      if(score - tuAmount < 0){

            return
      }else{

        let gamePlayerNode = this.playerArray[userNumber - 1]
        gamePlayerNode.getComponent('player').totalCount -= tuAmount
      }

        let srcpos = cc.v2(0,0)
        let despos = cc.v2(0,0)
        let contentSize:cc.Size = null

        let randomX = Math.random() - 0.5
        let randomY = Math.random() - 0.5
        let playerObj:cc.Node = null
        let taizuoObj:cc.Node = null
        if(userNumber == 1){

            playerObj = this.playerArray[0]
            taizuoObj = this.zhuang
            contentSize =  this.zhuang.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY

            srcpos.x = playerObj.getContentSize().width / 2 + 20
            srcpos.y = 300
        }else if(userNumber == 2){

            playerObj = this.playerArray[1]
            contentSize =  this.zhuang.getContentSize()
            taizuoObj = this.zhuang
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY

            srcpos.x = playerObj.getContentSize().width / 2 + 20
        }else if(userNumber == 3){
                
            playerObj = this.playerArray[2]
            taizuoObj = this.xian
            contentSize =  this.xian.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY
            
            srcpos.x = playerObj.getContentSize().width / 2 + 20
            srcpos.y = -300
        }else if(userNumber == 4){

            playerObj = this.playerArray[3]
            taizuoObj = this.xian
            contentSize =  this.xian.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY


            srcpos.x = -playerObj.getContentSize().width / 2 - 20
            srcpos.y = 300
        }else if(userNumber == 5){

            playerObj = this.playerArray[4]
            taizuoObj = this.he
            contentSize =  this.he.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 -80) * randomY

            srcpos.x = -playerObj.getContentSize().width / 2 - 20
            srcpos.y = 0
        }else if(userNumber == 6){

            playerObj = this.playerArray[5]
            taizuoObj = this.he
            contentSize =  this.he.getContentSize()
            despos.x = (contentSize.width - 60 - 60) * randomX
            despos.y = (contentSize.height - 60 - 80) * randomY

            srcpos.x = -playerObj.getContentSize().width / 2 - 20
            srcpos.y = -300
        }


        srcpos = playerObj.parent.convertToWorldSpaceAR(srcpos)
        srcpos = this.choumaParent.convertToNodeSpaceAR(srcpos)
    



        let chouma = this.getChoumaMethod(index)
        chouma.setPosition(srcpos)

        this.choumaParent.addChild(chouma)
        let wordpos =  taizuoObj.convertToWorldSpaceAR(despos)
        let pos = this.choumaParent .convertToNodeSpaceAR(wordpos)
     

        // let middlepos1 = cc.v2((pos.x + srcpos.x) / 4 * 3, (pos.y + srcpos.y) / 4  * 3 + 20)

        // var bezier = [srcpos, middlepos1,pos];
        // var bezierTo = cc.bezierTo(2, bezier);

       let middlePos = cc.v2(0,0)

        if(userNumber <= 3){

            middlePos.x = pos.x - 20
            middlePos.y = pos.y - 10

            }else{

             middlePos.x = pos.x + 20
             middlePos.y = pos.y - 10   
        }

        let rotation = Math.random() * 90
        chouma.runAction(cc.sequence(cc.moveTo(0.8,middlePos),cc.rotateTo(0.1,rotation),cc.moveTo(0.2,pos),cc.callFunc(()=>{

                
                        if(userNumber == 1){
                            this.zhuangTotal += tuAmount

                        }else if(userNumber == 2){

                            this.zhuangTotal += tuAmount
                        }else if(userNumber == 3){

                            this.xianTotal += tuAmount
                        }else if(userNumber == 4){  

                            this.xianTotal += tuAmount
                        }else if(userNumber == 5){

                            this.heTotal += tuAmount
                        }else if(userNumber == 6){

                            this.heTotal += tuAmount
                        }

                        this.updateTotalZhu()
                        this.updateGameScore()
            })))


    }
    // 更新总投注额度
    updateTotalZhu(){

         this.zhuangzhuLabel.string = this.zhuangTotal.toString()
         this.xianzhuLabel.string = this.xianTotal.toString()
         this.hezhuLabel.string = this.xianTotal.toString()
    
     }
     // 更新玩家分数
     updateGameScore(){

            for (const player of this.playerArray) {
                
                    player.getComponent('player').updateUserAmount()
            }

     }
     // 当前局结束
     endTheGame(){

       let v =  this.choumaParent.children
        

       let zhuangArray:cc.Node[] = []
       let xianArray:cc.Node[] = []
       let heArray:cc.Node[] = []
       let zhuangPos = this.zhuang.getPosition()
       let xianPos = this.xian.getPosition()
       let hePos = this.he.getPosition()

       let zhuangSize = this.zhuang.getContentSize()
       let xianSize = this.xian.getContentSize()
       let heSize = this.he.getContentSize()


       let gameDesk = this.node.getChildByName('gameDesktop')
       let zhuangWordPos =  gameDesk.convertToWorldSpaceAR(zhuangPos)
       let xianWordPos = gameDesk.convertToWorldSpaceAR(xianPos)
       let  heWordPos = gameDesk.convertToWorldSpaceAR(hePos)
    

        for (const subnode of v) {

                let pos = subnode.getPosition()
                let wordPos =  subnode.parent.convertToWorldSpaceAR(subnode.getPosition())
                
                // 判断当前坐标点是否在庄区域
                if(wordPos.x >= zhuangWordPos.x - zhuangSize.width  / 2 && wordPos.x <=  zhuangWordPos.x + zhuangSize.width  / 2 && zhuangWordPos.y >= zhuangWordPos.y - zhuangSize.height / 2 && zhuangWordPos.y + zhuangSize.height / 2){

                    zhuangArray.push(subnode)
                }else if(wordPos.x >= xianWordPos.x - xianSize.width / 2 && wordPos.x <= xianWordPos.x + xianSize.width / 2 && wordPos.y >= xianWordPos.y - xianSize.height / 2 && wordPos.y <= xianWordPos.y + xianSize.height / 2){
    
                    xianArray.push(subnode)
                }else if(wordPos.x >= heWordPos.x - heSize.width / 2 && wordPos.x <= heWordPos.x + heSize.width / 2 && wordPos.y >= heWordPos.y - heSize.height / 2 && wordPos.y <= heWordPos.y + heSize.height / 2){

                    heArray.push(subnode)
                }


        }
      
       let despos =   this.otherUser.getPosition()
       let pos =      this.otherUser.parent.convertToWorldSpaceAR(despos)
       let des =      this.choumaParent.convertToNodeSpaceAR(pos)

        // 首先移除庄家的筹码
        this.subNodetoRemove(zhuangArray,des)    

    //     // 再次移除闲家的筹码
       this.subNodetoRemove(xianArray,des)

        // 再次移除和家的筹码
        this.subNodetoRemove(heArray,des)
    }
        // 批量执行动画移除操作
     subNodetoRemove(nodeArray,des){

        if(nodeArray.length <= 0){

            return
        }
        
        let delay = 0.02
     
        this.schedule(()=>{
         let subnode = nodeArray.pop()
         let srcpos = subnode.getPosition()
 
         let bezierPath = [srcpos,cc.v2((srcpos.x + des.x) / 2,srcpos.y + 400),des]
         let bezier = cc.bezierTo(0.4,bezierPath)

         console.log('des.x: ' + des.x + ' des.y: ' + des.y)

        //  subnode.runAction( cc.jumpTo(2, des, 50,0))

        //     return;

          subnode.runAction(cc.sequence(cc.jumpTo(0.4,des),cc.callFunc(()=>{
 
     
                                  //    subnode.destroy()

                                        subnode.removeFromParent(false)
                                        switch(subnode.name){

                                            case 'chip-1':

                                                this.choumaArray[0].put(subnode)

                                                break
                                            case 'chip-10':
                                               this.choumaArray[1].put(subnode)
                                                break
                                            case 'chip-50':

                                               this.choumaArray[2].put(subnode)
                                                break
                                            case 'chip-100':

                                                 this.choumaArray[3].put(subnode)
                                                break
                                            case 'chip-500':

                                                 this.choumaArray[4].put(subnode)
                                               break

                                        }

                                      if(this.choumaParent.children.length == 0){

                                        // 当前局数结束以后，清除所有的筹码，并且初始化时间参数，开始新的一局游戏
                                         this.time = 10
                                         this.updateRoomState(1)
                                         this.schedule(this.timeMethod,1)
                                         this.leftPocker.active = true
                                         this.rightPocker.active = true
                                         this.leftPockerParent.active = false
                                         this.rightPockerParent.active = false
                                         this.zhuangTotal = 0
                                         this.xianTotal = 0
                                         this.heTotal = 0
                                         this.updateTotalZhu()
                                         
                                     }
  
                            
               })))
             },delay,nodeArray.length - 1,0)




       }

      testMethod100(){

        let despos = this.otherUser.getPosition()

        let pos =     this.otherUser.convertToWorldSpaceAR(despos)
        let des =      this.choumaParent.convertToNodeSpaceAR(pos)

        let v =  this.choumaParent.children
      
      }

    update(dt){

        if(this.roomStatus == 1){

        this.timeCount ++ 
        let index =   Math.floor(Math.random() * 5) 
        let erdu = this.mianer[index]
    
        let playerIndex = 0


        if(this.timeCount % 6 == 0){

           playerIndex = 1
        }else if(this.timeCount % 10 == 0){

           playerIndex = 2
        }else if(this.timeCount % 15 == 0){

           playerIndex = 3
        }else if(this.timeCount % 22 == 0){

           playerIndex = 4
        }else if(this.timeCount % 25 == 0){

          playerIndex = 5
        }else if(this.timeCount % 29 == 0){

          playerIndex = 6
        }
        if(playerIndex <= 0 || this.playerArray[playerIndex - 1].getComponent('player').totalCount - erdu < 0){

            return
        }
        let playerObj = this.playerArray[playerIndex - 1]
   


        let contentSize = playerObj.getContentSize()
        let srcpos = cc.v2(0,0)
        let middlePos = cc.v2(0,0)
        if(playerIndex == 1){

            srcpos.y = 300

            middlePos.x = contentSize.width / 2 + 20
            middlePos.y = 300
        }else if(playerIndex == 2){

            
            middlePos.x = contentSize.width  / 2 + 20
        }else if(playerIndex == 3){

            srcpos.y = -300

            middlePos.x = contentSize.width  / 2 + 20
            middlePos.y = -300
        }else if(playerIndex == 4){

            srcpos.y = 300

            middlePos.x = -contentSize.width / 2 - 20
            middlePos.y = 300
        }else if(playerIndex == 5){

            middlePos.x = -contentSize.width / 2 - 20
        }else if(playerIndex == 6){
        
            srcpos.y = -300

            middlePos.x = -contentSize.width / 2 - 20
            middlePos.y = -300
        }

         playerObj.runAction(cc.sequence(cc.moveTo(0.1,middlePos),cc.moveTo(0.1,srcpos),cc.callFunc(()=>{

                   this.xiazhuMehtod(playerIndex,index,erdu)

         })))

     }

    }

}
