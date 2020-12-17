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
            <view v-if="current === 0">
                <home-recommend />
            </view>
            <view v-if="current === 1">
                <home-category />
            </view>
            <view v-if="current === 2">
                <home-new />
            </view>
            <view v-if="current === 3">
                <home-album />
            </view>
        </view>
    </view>
</template>

<script>
import {homeAlbum} from "./home-album"
import {homeCategory} from "./home-category"
import {homeNew} from "./home-new"
import {homeRecommend} from "./home-recommend"
import {uniSegmentedControl} from '@dcloudio/uni-ui'
import { log } from 'util'
export default {
    components: { 
        homeAlbum,
        homeCategory,
        homeNew,
        homeRecommend,
        uniSegmentedControl
     },
    data() {
        return {
            items: [
                {title:"推荐",index:0},
                {title:"分类",index:1},
                {title:"最新",index:2},
                {title:"专辑",index:3}
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