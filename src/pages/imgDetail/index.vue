<template>
  <view>
      <view class="user_info">
          <view class="user_icon">
              <img :src="imgDetail.user.avatar" mode="widthFix" alt="">
          </view>
          <view class="user_desc">
              <view class="user_name">
                {{imgDetail.user.name}}
              </view>
              <view class="user_time">
                {{imgDetail.enTime}}
              </view>
          </view>
      </view>
      <view class="high_img">
        <swiper-action @swiperAction = handleSwiperAction>
            <img mode="widthFix" :src="imgDetail.newThumb">
        </swiper-action>
      </view>
      <view class="download">
          <view class="download_btn" @click="handleDownload">
              下载图片
          </view>
      </view>
  </view>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
import swiperAction from '@/components/swiperAction'
export default {
    data(){
        return{
            imgDetail:{}
        }
    },
    components:{
        swiperAction
    },
    onLoad(){  
        const { imgListIndex } = getApp().globalData
        this.imgListIndex = imgListIndex
        this.getData()
    },
    methods:{
        getData(){
            const { imgList } = getApp().globalData
            this.imgDetail = imgList[this.imgListIndex]
            this.imgDetail.newThumb = this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>', 360)
            this.imgDetail.enTime = moment(this.imgDetail.atime*1000).fromNow()
        },
        handleSwiperAction(val){
            const { imgList } =getApp().globalData
            if( val.direction === "left"&& this.imgListIndex < imgList.length-1){
                this.imgListIndex++
                this.getData()
            }else if(val.direction === "right"&& this.imgListIndex > 0){
                this.imgListIndex--
                this.getData()
            }else{
                uni.showToast({
                    title:"没有数据了",
                    icon:"none"
                })
            }
        },
        handleDownload(){
            uni.downloadFile({
                url:this.imgDetail.img,
                 success: (res) => {
                if (res.statusCode === 200) {
                        console.log('下载成功')
                        console.log(res)
                         uni.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success: function () {
                                console.log('save success');
                            }
                        });
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user_info {
    display: flex;
    padding: 20rpx;
  .user_icon {
      padding: 0 20rpx;
    img {
        width: 88rpx;
        border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {

    }

    .user_time {

    }
  }
}
.high_img{
    img{
        width: 100%
    }
}
.download{
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .download_btn{
        width:90%;
        height: 80%;
        background-color: $color;
        color: #fff;
        font-size: 50rpx;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>