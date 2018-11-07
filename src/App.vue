<template>
    <div id="app" class="app">
        <nav-bar></nav-bar>
        <!-- <home-page class="content-box"></home-page> -->
        <!-- <type-list-page class="content-box"></type-list-page> -->
        <!-- <detail-page class="content-box"></detail-page> -->
        <router-view class="content-box"></router-view>
        <footter-bar v-show=" showFootter "></footter-bar>
    </div>
</template>

<script>
    import NavBar from "./components/NavBar";
    import HomePage from "./pages/HomePage";
    import TypeListPage from './pages/TypeListPage';
    import DetailPage from './pages/DetailPage';
    import FootterBar from './components/FootterBar'

    export default {
        data() {
            return {
                showFootter: false
            }
        },
        components: {
            NavBar, HomePage, TypeListPage, DetailPage, FootterBar
        },
        watch: {
            "$route.meta.showFootter": function () {
                // console.log(this.$route.meta.showFootter);
                this.showFootter = this.$route.meta.showFootter;
            }
        }


    };
</script>

<style lang="less">
    @import "./var.less";
    * {
      padding: 0px;
      margin: 0px;
      background-color: @dark;
    }
    .app {
      max-width: 750px;
      margin: 0 auto;
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      background-color: @light;
      overflow: hidden;
      * {
        background-color: @light;
      }
    }
    .content-box {
      background-color: #cccccc;
      position: absolute;
      top: @topHeight;
      bottom: 0rem;
      left: 0rem;
      right: 0rem;
    }
</style>
