<template>
  <view>
      <scroll-view
        scroll-y
        enable-flex
        class="video_main"
      >
        <view class="video_item" v-for="item in videowp" :key="item.id" @click="handleVideo(item)">
            <img :src="item.img" mode="widthFix">
        </view>
      </scroll-view>
  </view>
</template>

<script>
export default {
    props:{
        urlObj:Object
    },
    data(){
        return{
            videowp:[]
        }
    },
    watch:{
        urlObj(){
            this.getList()
        }
    },
    mounted(){
        console.log(this.urlObj);
        this.getList()
    },
    methods:{
        getList(){
            this.request({
                url:this.urlObj.url,
                data:this.urlObj.params
            }).then(res=>{
                console.log(res);
                this.videowp=res.res.videowp
            })
        },
        handleVideo(item){
            console.log(item);
            getApp().globalData.video = item
            uni.navigateTo({
                url:"/pages/videoDetail/index"
            })
        }
    }
}
</script>

<style lang="scss" scoped> 
.video_main{
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .video_item{
        width: 33.33%;
        border: 1px solid #000;
        box-sizing: border-box;
        img{
            width: 100%;
        }
    }
}
</style>