<template>
    <div>
        <div class="home-box">
            <!-- 首页分类列表 start -->
            <div v-for="t in types" :key="'type'+t.typeId">
                <div class="list-name">
                    <span>{{ t.typeName }}</span>
                    <!-- <span class="list-more">更多 > </span> -->
                    <router-link class="list-more" :to="{ name:'listpage', params:{ typeId:t.typeId, typeName:t.typeName } }" tag="span">更多 > </router-link>
                </div>
                <div class="list-content">
                    <film-item  v-for="(l, i) in t.list" :key="'typelist'+i" :film=" l "></film-item>
                </div>
            </div>
            <!-- 首页分类列表 end -->
        </div>
    </div>
    <!-- 首页正文 end -->
</template>

<script>
    import FilmItem from '../components/FilmItem'
    export default {
        data(){
            return{
                types:[],
            }
        },
        components:{
            FilmItem
        },
        methods:{
            loadFilmTypes(){
                this.$api.loadTypes().then(({status,data})=>{
                    // console.log(status,data.result);
                    if(status==200&&data.resultState){
                        this.types = data.result;
                        return data.result;
                    }
                    return Promise.reject();
                }).then((result)=>{
                    let temp=[];
                    for(let i=0;i<result.length;i++){
                        let p = this.$api.loadFilmList({
                            typeId: result[i].typeId
                        });
                        temp.push(p);
                    }
                    // console.log(Promise.all(temp));
                    return Promise.all(temp);
                    // return temp;
                }).then((result)=>{
                    // console.log(result)
                    for(let i=0;i<result.length;i++){
                        this.$set(this.types[i], "list", result[i].data.result);
                    }
                }).catch(()=>{
                    alert("查询失败");
                });
            }
        },
        mounted(){
            this.loadFilmTypes();
        }
    };
</script>
<style lang="less" >
    @import "../var.less";
    // 标题名称
    .list-name {
      // margin-bottom: 0.2rem;
      > span {
        display: inline-block;
        margin: 0.24rem 0rem 0.24rem 0.1rem;
        padding: 0rem 0.2rem 0rem 0.1rem;
        font-size: 0.32rem;
      }
      > span:first-child {
        border-left: 4px solid @blue;
      }
      > span.list-more {
        float: right;
        font-size: 0.28rem;
        color: @blue;
      }
    }
    // 首页样式
    .home-box {
      position: absolute;
      top: 0rem;
      bottom: 0rem;
      left: 0rem;
      right: 0rem;
      overflow-y: auto;
    }
    .list-content {
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 0.1rem;
      font-size: 0rem;
      &::after {
        content: "";
        width: 0.1rem;
        display: inline-block;
      }
    }
</style>