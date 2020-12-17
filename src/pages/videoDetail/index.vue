<template>
  <view class="video_play">
      <img :src="videoObj.img">
    <view class="video_tool">
        <view @click="handleMuted">{{ muted? "静音":"声音"}}</view>
        <view ><button open-type="share">转发</button> </view>
    </view>
    <view class="video_warp">
        <video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
    </view>
    <view class="download">
        <view class="download_btn" @click="handleDownload">
            下载高清
        </view>
    </view>
  </view>
</template>

<script>
export default {
    data(){
        return{
            videoObj:{},
            muted:false
        }
    },
    onLoad(){
        console.log(getApp().globalData);
        this.videoObj = getApp().globalData.video
    },
    methods:{
        handleMuted(){
            this.muted=!this.muted
        },
        onShareAppMessage(){
            console.log(3333);
        },
        async handleDownload(){
            await uni.showLoading({ title: "下载中"})
            const  { tempFilePath }  = (await uni.downloadFile({url:this.videoObj.video}))[1]
            await uni.saveImageToPhotosAlbum({
                filePath:tempFilePath
            })
            uni.hideLoading()
            await uni.showToast({"title":"下载成功"})
        }
    }
}
</script>

<style lang="scss" scope>
.video_play {
    position: relative;
    img {
        position: absolute;
        width: 100vh;
        height: 100vh;
        z-index: -1;
        filter:blur(20px)
    }

  .video_tool {
    height: 80rpx;
    display: flex;
    justify-content: center;
  }

  .video_warp {
      display: flex;
      justify-content: center;
    video {
        width: 360rpx;
        height: 600rpx;
    }
  }

  .download {
      display: flex;
      justify-content: center;
    .download_btn {
        width: 360rpx;
        height: 80rpx;
        display: flex;
        border: 1px solid #000;
        justify-content: center;
        border-radius: 40rpx;
        align-items: center;
        margin-top:10px;
        color:red
    }
  }
}
</style>