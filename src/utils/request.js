export default (params) =>{
    return new Promise((reslove, reject)=>{
        uni.showLoading({
            title:"加载中"
        })
        wx.request({
            ...params,
            success(res){
                reslove(res.data)
            },
            fail(err){
                reject(err)
            },
            complete(){
                uni.hideLoading()
            }
        })
    })
}