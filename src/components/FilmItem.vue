<template>
    <!-- 电影展示组件 start -->
    <router-link class="film-item" tag="div" :to="'/detail/'+film.filmId">
        <div class="film-img" v-lazy=" film.filmImg " ></div>
        <div class="film-title">{{ film.filmName }}</div>
        <div class="film-source">
            <!-- <span class="star-img open"></span>
            <span class="star-img open"></span>
            <span class="star-img open"></span>
            <span class="star-img close"></span>
            <span class="star-img close"></span>
            <span class="star-source">7.9</span> -->
            <rate v-model=" getSource " show-score disabled :score-template=" film.source | formatNum "></rate>
        </div>
    </router-link>
    <!-- 电影展示组件 end -->
</template>

<script>
    export default {
        props: ["film"],
        computed: {
            getSource: {
                get() {
                    return this.film.source * 1;
                },
                set() { }
            }
        },
        filters: {
            formatNum(value) {
                return (value * 1).toFixed(1);
            }
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

    .film-item {
      width: 2.35rem;
      height: 4.55rem;
      display: inline-block;
      margin-left: 0.1rem;
      vertical-align: top;
      > .film-img {
        height: 3.6rem;
        background-color: @gray-light;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      > .film-title {
        font-size: 0.26rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0.1rem;
      }
    }

    // 评分样式
    .film-source {
      margin: 0rem 0.1rem 0rem 0rem;
      > span {
        height: 0.22rem;
        width: 0.22rem;
        line-height: 0.22rem;
        margin-left: 0.1rem;
      }
      > .star-img {
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      > .open {
        background-image: url("../../static/imgs/star-open.png");
      }
      > .close {
        background-image: url("../../static/imgs/star-close.png");
      }
      > .star-source {
        padding-right: 0.1rem;
        font-size: 0.3rem;
      }
      > .star-tip {
        color: @gray;
        font-size: 0.28rem;
      }
    }
</style>
<style lang="less" >
    .film-source {
      .el-rate__icon {
        font-size: 12px !important;
      }
    }
</style>

