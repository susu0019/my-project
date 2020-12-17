<template>
    <view>列表详情</view>
</template>

<script>
export default {
    data(){
        return{
            params:{
                limit:30,
                order:'new',
                skip:0,
                first:0
            },
            id:-1
        }
    },
    onLoad(options){
        console.log(options)
        this.id = options.id
        // this.id="5965cd0be7bce7312ef79fbf"
        this.getList()

    },
    methods:{
        getList(){
            this.request({
                url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data:this.params
            }).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>