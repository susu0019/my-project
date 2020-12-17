<template>
    <view>
        <uni-segmented-control 
            :current="current" 
            :values="items.map(v=>v.title)" 
            @clickItem="onClickItem"
            style-type="text" 
            active-color="#4cd964"
        ></uni-segmented-control>
         <view class="content">
            <view v-if="current < 4" >
                <video-recommend :urlObj="{url:items[current].url,params:items[current].params}"/>
            </view>
            <view v-if="current === 4">
                <video-category />
            </view>
        </view>
    </view>
</template>

<script>
import {uniSegmentedControl} from '@dcloudio/uni-ui'
import videoRecommend from './video-recommend'
import videoCategory from './video-category'
export default {
    components: { 
        uniSegmentedControl,
        videoRecommend,
        videoCategory
     },
    data() {
        return {
            items: [
                {title:"推荐",url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:"hot"}},
                {title:"娱乐",url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe76bc834198a",params:{limit:30,skip:0,order:"new"}},
                {title:"最新",url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"new"}},
                {title:"热门",url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"hot"}},
                {title:"分类",url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",params:{}}
            ],
            current: 0
        }
    },
     methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    }

}
</script>

<style>

</style>