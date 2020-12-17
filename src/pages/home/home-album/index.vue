<template>
  <view class="album_swiper">
    <swiper
      autoplay
      indicator-dots
      circular
    >
      <swiper-item
        v-for="item in banner"
        :key="item.id"
      >
      <img :src="item.thumb" alt="" >
      </swiper-item>
    </swiper>

    <view class="album_list">
      <navigator class="album_item"
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album_img">
          <img mode="aspectFill" :src="item.thumb" alt="">
        </view>
        <view class="album_info">
          <view class="album_name">{{item.atime}}</view>
          <view class="album_desc">{{item.img}}</view>
          <view class="album_btn">
            <view class="album_attention">
              关注
            </view>
          </view>
        </view>
      </navigator> 
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      params:{
        limit:30,
        order:"new",
        skip:0
      },
      banner:[],
      album:[]
    }
  },
  mounted(){
    uni.setNavigationBarTitle({title:"专辑"})
    this.getList()
  },
  methods:{
    getList() {
      this.request({
        url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
        data:this.params
      }).then(res=>{
        console.log(res)
        this.banner=res.res.homepage[1].items
        this.album=res.res.vertical
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.album_swiper{
  swiper{
    height: calc(750rpx/2.3);
    image{
      width: 100%;
      height: 100%;
    }
  }
}
.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    .album_img {
      flex: 1;
      img {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      flex:2;
      //文字不能换行 撑开容器 会将关注对话框放到最后  所以需要溢出隐藏
      overflow: hidden;
      .album_name {

      }

      .album_desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        display: flex;
        padding: 10rpx;
        justify-content: flex-end;
        .album_attention {
          color:$color;
          border: 1px solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>