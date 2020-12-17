<template>
    <scroll-view @scrolltolower="handleTolow" class="recommend_view" scroll-y v-if="recommends.length>0">
        <view class="recommend_warp" v-if="recommends">
            <view class="recommend_item"
                v-for="item in recommends"
                :key="item.id"
            >
           
                <img mode="widthFix" :src="item.thumb" alt="">
            
            </view>
        </view>
        <view class="months_wrap" v-if="monthes">
            <view class="months_title">
                <view class="months_title_info">
                    <view class="months_info">
                        <text>{{monthes.DD}}/</text>{{monthes.MM}}月
                    </view>
                    <view class="months_text">
                        {{monthes.title}}
                    </view>
                </view>
                <view class="months_title_mor">
                    更多 > 
                </view>
            </view>
            <view class="months_content">
                <view class="months_items"
                    v-for = "(item,index) in monthes.items"
                    :key="item.id"
                >
                 <go-detail :list="monthes.items" :index="index">
                    <img mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>', 360)" >
                </go-detail>
                </view>
            </view>
        </view>
        <view class="hot_wrap">
            <view class="hot_title">
                <view class="hot_title_info">
                    <view class="hot_info">
                        <text>热门</text>
                    </view>
                </view>
            </view>
            <view class="hot_content">
                <view class="hot_items"
                    v-for = "item in hot"
                    :key="item.id"
                >
                <img mode="aspectFill" :src="item.thumb">
                </view>
            </view>
        </view>
    </scroll-view>

</template>

<script>
import moment from 'moment'
import goDetail from '@/components/goDetail'
export default {
    components:{
        goDetail
    },
    data(){
        return{
            recommends:[],
            monthes:{},
            hot:[],
            params:{
                limit: 30,
                order: "hot",
                skip: 0
            },
            hasmore:true
        }
    },
    mounted(){
        this.reqEvent() 
        uni.setNavigationBarTitle({title:"推荐"})
    },
    methods:{
        reqEvent(){
            this.request({
                url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
                data: this.params
            }).then(res => {
                console.log(res)
                if(this.recommends.length ===0){
                    this.recommends = res.res.homepage[1].items
                    this.monthes = res.res.homepage[2]
                    this.monthes.MM=moment(this.monthes.stime).format("MM");    
                    this.monthes.DD=moment(this.monthes.stime).format("DD"); 
                }
                if(res.res.vertical.length==0){
                    this.hasmore=false
                    return;
                }
                this.hot = [...this.hot,...res.res.vertical]
            })
        },
        handleTolow(){
            if(this.hasmore){
                this.params.skip+=this.params.limit
                this.reqEvent()
            }else{
                uni.showToast({
                    title:"没有数据了",
                    icon:"none"
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.recommend_view{
     height: calc( 100vh - 36px);
}
.recommend_warp{
    overflow: hidden;
    .recommend_item {
        width: 50%;
        border: 5rpx solid #ccc;
        float: left;
        box-sizing: border-box;
        img{
            width: 100%;
        }
    }
}
.months_wrap {
  .months_title {
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
    .months_title_info {
        color:$color;
        font-size:30rpx;
        display: flex;
      .months_info {
        text {

        }
      }

      .months_text {    
          margin-left: 10rpx;
      }
    }

    .months_title_mor {

    }
  }

  .months_content {
      display: flex;
      flex-wrap: wrap;
      .months_items{
          width:33.33%;
          border:5rpx solid #ccc;
          box-sizing: border-box;
          img{
            width: 100%;
        }
      }
  }
}
.hot_wrap {
  .hot_title {
      padding: 20rpx;
    .hot_title_info {
      .hot_info {
        text {
            border-left: 5px solid $color;
            padding-left: 20rpx;
        }
      }
    }
  }

  .hot_content {
      display:flex;
      flex-wrap: wrap;
    .hot_items {
        width:33.33%;
        border: 5rpx solid #fff;
        box-sizing: border-box;
      img {
          width:100%
      }
    }
  }
}

</style>