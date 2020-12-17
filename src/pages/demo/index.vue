<template>
  <view class="container" @touchstart="handleTouchstart" @touchend="handleTouchend">
  </view>
</template>

<script>
export default {
    data(){
        return{
            startTime: 0,
            endTime: 0,
            startX: 0,
            startY: 0
        }
    },
    methods:{
        handleTouchstart(e){
            // console.log(e);
            this.startTime = Date.now()
            this.startX = e.changedTouches[0].clientX
            this.startY = e.changedTouches[0].clientY

        },
        handleTouchend(e){
            // console.log(e);
            const endTime = Date.now()
            const endX = e.changedTouches[0].clientX
            const endY = e.changedTouches[0].clientY
            if(endTime - this.startTime > 2000){
                return;
            }
            let direction = ''
            if(Math.abs(endX - this.startX) > 10){
                direction = endX - this.startX > 0 ?"right":"left"
            }else{
                return;
            }
            console.log(direction)
        }
    }

}
</script>

<style>
.container{
    width: 100%;
    height: 400rpx;
    background-color: #ddd;
}
</style>