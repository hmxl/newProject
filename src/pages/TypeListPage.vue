<template>
    <!-- 分类页正文 start -->
    <div class="content-box">
        <!-- 分类列表 start -->
        <div class="films-box">
            <div class="list-name">
                <span>{{ typeName }}</span>
            </div>
            <div class="content-list">
                <film-item v-for="(item, index) in list" :key="'list'+index" :film=" item "></film-item>
            </div>
        </div>
        <!-- 分类列表 end -->
    </div>
    <!-- 分类页正文 end -->
</template>

<script>
    import FilmItem from '../components/FilmItem'
    export default {
        data() {
            return {
                list: []
            }
        },
        props: {
            typeId: { default: undefined },
            typeName:{ default: "全网搜索"}
        },
        // props:["typeId","typeName"],
        components: {
            FilmItem
        },
        watch:{
            "$route.query.wd":function(){
                this.getList();
            }   
        },
        methods: {
            getList() {
                let obj={
                    size: 12 
                };
                if(this.typeId){
                    obj.typeId = this.typeId;
                };
                if(this.$route.query.wd){
                    console.log(this.$route.query.wd)
                    obj.seach = this.$route.query.wd;
                }
                this.$api.loadFilmList(obj).then(({ status, data }) => {
                    if (status == 200 && data.resultState) {
                        this.list = data.result;
                        return;
                    }
                    return Promise.reject();
                }).catch(() => {
                    alert("查询失败");
                });
            }
        },
        mounted() {
            this.getList();
            // console.log(this.typeId,this.typeName)
        }

    }
</script>

<style lang="less">
    @import "../var";
    // 分类页样式
    .films-box {
      position: absolute;
      top: 0rem;
      bottom: 0rem;
      left: 0rem;
      right: 0rem;
      overflow-y: auto;
    }
    .content-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      width: 100%;
      font-size: 0rem;
      > * {
        margin-top: 0.2rem;
      }
    }
</style>

