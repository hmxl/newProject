<template>
    <div>
        <!-- 电影详情 start -->
        <div class="detail-box">
            <!-- 电影名称 -->
            <div class="film-name">{{ detail.filmName }}</div>
            <!-- 电影信息 stat-->
            <div class="film-info">
                <div class="film-tip">
                    <div class="comment-count">
                        <div class="film-source">
                            <rate v-model=" getSource " show-score disabled :score-template=" detail.source | formatNum "></rate>
                        </div>
                        <div class="star-count">{{ num }}短评</div>
                    </div>
                    <div class="film-desc">
                        <p>
                            <span>上映时间:</span>{{ detail.filmYear }}</p>
                        <p>
                            <span>电影类型:</span>{{ detail.filmTypes }}</p>
                        <p>
                            <span>参演明星:</span>{{ detail.castNames }} </p>
                    </div>
                </div>
                <div class="film-img" v-lazy=" detail.filmImg "></div>
            </div>
            <!-- 电影信息 end-->
            <!-- 电影简介 start -->
            <div class="film-plot">
                <div class="plot-title">剧情简介</div>
                <div class="plot-content">{{ detail.filmDesc }}</div>
            </div>
            <!-- 电影简介 end -->
            <!-- 演员阵容 start -->
            <div class="film-actor">
                <div class="actor-title">导演演员</div>
                <div class="actor-list">
                    <div class="actor-item" v-for="(item, index) in getCastList" :key="index">
                        <div class="actor-img" v-lazy=" item.photo "></div>
                        <div class="actor-name">{{ item.name }}</div>
                    </div>
                </div>
            </div>
            <!-- 演员阵容 end -->
            <!-- 电影评论 start -->
            <div class="film-comments">
                <div class="comment-title">相关评论</div>
                <div class="comment-list">
                    <!-- 用户评论 start -->
                    <div class="comment-item" v-for="(c, index) in comments" :key="'c'+index">
                        <div class="user-img">
                            <img v-lazy.src="'../../static/imgs/users/'+ c.userImg">
                        </div>
                        <div class="user-info">
                            <div class="user-name">
                                <span>{{ c.username }}</span>
                                <div class="film-source">
                                    <rate v-model=" c.userSource " show-score disabled :score-template=" c.userSource | formatNum "></rate>
                                </div>
                            </div>
                            <div class="user-time">{{ c.createTime }}</div>
                        </div>
                        <div class="user-conent">{{ c.userMsg }}</div>
                    </div>
                    <!-- 用户评论 end -->
                </div>
            </div>
            <!-- 电影评论 end -->
        </div>
    </div>
</template>

<script>
    export default {
        props:["filmId"],
        data() {
            return {
                detail: [],
                comments: [],
                num:null
            }
        },
        computed: {
            getSource: {
                get() {
                    return this.detail.source * 1 | [];
                },
                set() { }
            },
            getCastList() {
                return JSON.parse(this.detail.castList || "[]");
            },
        },
        filters: {
            formatNum(value) {
                return (value * 1).toFixed(1);
            }
        },
        methods: {
            getDetails() {
                this.$api.loadDetails({
                    filmId: this.filmId
                }).then(({ status, data }) => {
                    // console.log(status, data);
                    if (status == 200 && data.resultState) {
                        this.detail = data.result;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            getComments(){
                this.$api.loadComments({
                    filmId: this.filmId
                }).then(({ status, data }) => {
                    // console.log(data.result);
                    if (status == 200 && data.resultState) {
                        this.comments = data.result;
                        this.num = data.result.length;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getDetails();
            this.getComments();
        }
    }
</script>

<style lang="less">
    @import "../var.less";
    .detail-box {
      position: absolute;
      top: 0rem;
      bottom: @bottomHeight;
      left: 0rem;
      right: 0rem;
      overflow-y: auto;
    }
    // 详情页样式
    .film-name {
      padding: 0.3rem;
      padding-bottom: 0rem;
      font-size: 0.38rem;
      color: @gray-dark;
    }
    .film-info {
      // css 新布局方式 grid 网格异形布局
      // 浏览器内核已做全面兼容
      color: @gray-dark;
      display: grid;
      grid-template-columns: 2fr 1fr;
      padding: 0rem 0.2rem 0.3rem 0.2rem;
      > .film-tip {
        grid-column-start: 1;
        grid-column-end: 2;
        > .comment-count {
          display: grid;
          grid-template-columns: 4fr 2fr;
          margin: 0.2rem 0rem;
          align-items: center;
          > .film-source {
            grid-column-start: 1;
            grid-column-end: 2;
          }
          > .star-count {
            grid-column-start: 2;
            grid-column-end: 3;
            font-size: 0.3rem;
          }
        }
        > .film-desc {
          font-size: 0.26rem;
          height: 2.4rem;
          overflow: hidden;
          padding-right: 0.2rem;
          line-height: 0.5rem;
          > p > span {
            color: @blue;
            padding-right: 0.1rem;
          }
        }
      }
      > .film-img {
        height: 3.4rem;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 4%;
        background-color: @gray-light;
        background-position: center;
      }
    }
    .film-plot {
      color: @gray-dark;
      padding: 0rem 0.2rem 0.3rem 0.2rem;
      > .plot-title {
        font-size: 0.36rem;
        color: @gray;
        margin-bottom: 0.2rem;
      }
      > .plot-content {
        font-size: 0.24rem;
        text-indent: 0.56rem;
        line-height: 0.4rem;
      }
    }
    .film-actor {
      color: @gray-dark;
      padding-bottom: 0.3rem;
      font-size: 0rem;
      > .actor-title {
        font-size: 0.36rem;
        color: @gray;
        padding: 0rem 0.2rem;
        margin-bottom: 0.2rem;
      }
      .actor-list {
        white-space: nowrap;
        width: 100%;
        overflow-x: auto;
        &::after {
          content: "";
          width: 0.2rem;
          display: inline-block;
        }
        > .actor-item {
          width: 1.6rem;
          padding-left: 0.2rem;
          display: inline-block;
          vertical-align: top;
          > .actor-img {
            background-color: @gray-light;
            width: 1.6rem;
            height: 2.2rem;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          > .actor-name {
            white-space: pre-wrap;
            margin: 0.1rem 0rem;
            font-size: 0.24rem;
            text-align: center;
          }
        }
      }
    }

    // 评论组件
    .film-comments {
      color: @gray-dark;
      padding-bottom: 0.3rem;
      font-size: 0rem;
      > .comment-title {
        font-size: 0.36rem;
        color: @gray;
        padding: 0rem 0.2rem;
        margin-bottom: 0.2rem;
      }
      > .comment-list {
        width: 100%;
        padding-bottom: 0.1rem;
      }
    }
    .comment-item {
      display: grid;
      grid-template-columns: 1fr 6fr;
      grid-template-rows: auto auto;
      padding: 0rem 0.2rem 0.6rem 0.2rem;
      > .user-img {
        width: 100%;
        > img {
          width: 100%;
          height: auto;
          border-radius: 50%;
        }
      }
      > .user-info {
        font-size: 0.3rem;
        padding-left: 0.2rem;
        > .user-name {
          margin-top: 0.1rem;
          > .film-source {
            float: right;
          }
        }
        > .user-time {
          margin-top: 0.1rem;
          font-size: 0.26rem;
          color: @gray;
        }
      }
      > .user-conent {
        font-size: 0.24rem;
        text-indent: 0.56rem;
        line-height: 0.4rem;
        grid-column-start: 2;
        grid-column-end: 3;
        padding-left: 0.2rem;
      }
    }
</style>

