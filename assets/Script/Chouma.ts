const {ccclass,property} = cc._decorator


@ccclass

export default class NewClass extends cc.Component{

        @property(cc.SpriteFrame)
        oneFrame = null
        @property(cc.SpriteFrame)
        tenFrame = null
        @property(cc.SpriteFrame)
        fiftyFrame = null
        @property(cc.SpriteFrame)
        oneHundredFrame = null
        @property(cc.SpriteFrame)
        fiveHunderedFrame = null
        @property(cc.Node)
        mianer = null
        
        amount:number = 0

        onLoad(){

            this.setAmount(this.amount)
        }

        //  设置筹码面额  1. 1   2. 10  3.50  4.100 5.500

        setAmount(type){

            if(type == 1){

                this.mianer.getComponent(cc.Label).string = '1'
                this.getComponent(cc.Sprite).spriteFrame = this.oneFrame

            }else if(type == 10){    


                this.mianer.getComponent(cc.Label).string = '10'
                this.getComponent(cc.Sprite).spriteFrame = this.tenFrame

            }else if(type == 50){

                this.mianer.getComponent(cc.Label).string = '50'
                this.getComponent(cc.Sprite).spriteFrame = this.fiftyFrame

            }else if(type == 100){

                this.mianer.getComponent(cc.Label).string = '100'
                this.getComponent(cc.Sprite).spriteFrame = this.oneHundredFrame
            }else if(type == 500){

                this.mianer.getComponent(cc.Label).string = '500'
                this.getComponent(cc.Sprite).spriteFrame = this.fiveHunderedFrame
            }

        }
        



}
