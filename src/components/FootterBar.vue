<template>
    <!-- 底部评论区 start -->
    <footer class="footer-box">
        <div class="comment-input" @click="flag=true">不想说点什么吗？</div>
        <div class="comment-detail" id="userCommentMb" v-show="flag" @click="flag = false ">
            <div class="user-input" @click.stop>
                <h4>头像</h4>
                <ul class="user-head" @click="changeClass($event)">
                    <li v-for="i in 24" :key="'img'+i" :style="`background-image: url(../../static/imgs/users/user${i}.png)`" 
                    :data-img = " `user${ i }.png` " 
                    :class=" `user${ i }.png`==userComment.userImg?'user-choose':'' "></li>
                    <!-- class="user-choose" data-img="user1.png"  -->
                </ul>
                <h4>昵称</h4>
                <input class="user-nikename" type="text" placeholder="昵称" v-model="userComment.username">
                <h4>评分</h4>
                <div class="film-source reset-star">
                    <!-- <span class="star-img open"></span>
                    <span class="star-img open"></span>
                    <span class="star-img open"></span>
                    <span class="star-img close"></span>
                    <span class="star-img close"></span>
                    <span class="star-source">7.9</span> -->
                    <rate id="sourceself" v-model=" userComment.userSource " show-score :score-template=" userComment.userSource | formatNum"></rate>
                </div>
                <h4>评论</h4>
                <textarea class="user-message" placeholder="留下点足迹..." v-model="userComment.userMsg"></textarea>
                <div class="send-btn">
                    <span @click=" flag=false ">关闭</span>
                    <span @click=" sendCom() ">发送</span>
                </div>
            </div>
        </div>
    </footer>
    <!-- 底部评论区 end -->
</template>

<script>
export default {
    data() {
        return {
            objClass: {
                'user-choose': true
            },
            flag: false,
            userComment: {
                userSource: 5,
                filmId: "",
                username: "",
                userMsg: "",
                userImg: "user1.png"
            }

        }
    },
    filters: {
        formatNum(value) {
            return (value * 1).toFixed(1);
        }
    },
    methods: {
        changeClass(e) {
            this.userComment.userImg = e.target.getAttribute("data-img");

        },
        sendCom() {
            this.$api.insertComment(
                // {
                // username: this.userComment.username,
                // userImg: this.userComment.userImg,
                // userSource: this.userComment.userSource,
                // userMsg: this.userComment.userMsg,
                // filmId: this.userComment.filmId,
                this.userComment

            // }
            ).then(({ status, data }) => {
                if (status == 200) {
                    let id = this.userComment.filmId;
                    // console.log(this)
                    // console.log(this.filmId)
                    this.flag = false;
                    this.$router.push({
                        path: "/detail",
                        query: {
                            fid: id,
                            aa: Math.random()
                        }
                    });
                    return;
                }
                return Promise.reject();
            }).catch(() => {
                alert("请求失败")
            });
        },
    },
    mounted() {
        this.$root.$on("send:id", (b) => {
            this.userComment.filmId = b;
            // console.log(b)
        })
    }
}
</script>

<style lang="less">
@import "../var.less";
.footer-box {
  position: absolute;
  bottom: 0rem;
  // background-color: red;
  height: @bottomHeight;
  width: 100%;
  border-top: 1px solid @gray-light;
  > .comment-input {
    font-size: 0.24rem;
    margin: 0.2rem;
    background-color: @gray-ee;
    height: @bottomHeight - 0.4rem;
    line-height: @bottomHeight - 0.4rem;
    border-radius: 1000rem;
    cursor: pointer;
    color: @gray;
    padding: 0rem 0.2rem;
  }
  > .comment-detail {
    position: fixed;
    bottom: 0rem;
    top: 0rem;
    left: 0rem;
    right: 0rem;
    margin: 0 auto;
    max-width: 750px;
    // display: none;
    background-color: fade(black, 50%);
    > .user-input {
      position: absolute;
      bottom: 0rem;
      max-height: 100%;
      left: 0rem;
      right: 0rem;
      padding: 0.2rem;
      background-color: #f8f9fa;
      overflow-y: auto;
      box-sizing: border-box;
      > h4 {
        font-size: 0.28rem;
        font-weight: normal;
        // padding: 0.1rem;
        color: @gray;
        padding-bottom: 0.1rem;
      }
      > .user-head {
        list-style: none;
        font-size: 0rem;
        width: 100%;
        overflow-y: scroll;
        height: 2rem;
        background-color: #ddd;
        border-radius: 0.2rem;
        margin-bottom: 0.2rem;
        > li {
          display: inline-block;
          background-repeat: no-repeat;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0.1rem;
          box-sizing: border-box;
          background-size: cover;
          border-radius: 50%;
          vertical-align: top;
        }
        > .user-choose::after {
          content: "";
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACgklEQVRoQ+2XP2gTcRTHv+9CaxqL7R0uIh2UpJuboEInKQjOFpwEKR3SiIOuIkJX16SNS6SgoIugqIjiIOgibnbpWSuCpUjJpbXYlib35BoibbjL/Xl36QUuY/i9x/fzvu+b3y+EHv9Qj+tHAnDYDiYOJA4IJ5CskHCA4vLEAfEInRrcY2X4uD6GFCnM/HN9evS73dF4OlD8PahR7RlA45ZoZuwAmDAKuRftEPEDsMSj9g5E5/aLZfCaMdA3guuntvd/Hy8AB/EtwUx0xshnv8YToLyS0eqb79sn/188w6QG1OrN3Eb8AMorGbW++YaIxhx/FJhmqoXs3fhlwIt4oFLNZydBxPECEIq3YA4vxCGI7whwbG4pp7B5kkylbkyf/mhnX+BLrLKcVv/uvu248x3WxjXEWkmfYPAjAvU1LxJ+ZewMXMGtka3AoluFleW0tlV/CeBih16OO++egfnVo9qfjVUQDR68SPDJ2E6PiyBCFm+7QkNzS2dTpvnZbjoMAUQE4m0BMuUfJ440dn+RQ8ADQUQk3jHEw0X9vkK47bSjviCeLvRra/2vw9p59ww0U0vqrP6YQFdFEE3xzwFcCiOw/p7TUoguiHe/yIJCdEm8O0BrnUrfHhLhmqd16qJ4bwA+IJBSLlPDfBLlznsLse0lwKS6O7FOwFBUgfUX4oAQ3RTvfYUOvCn2nCgTYcrHu8jz28ZHz72jgZ/TalF/4BEiMvEiAKvYA0Sk4sUALhCRiw8FwGqilRZnALrT2l8GZo18thDqnyCHcATOQHs/raSfB+OCyfyldmP0g98wBj0fGkBQAdK6BEA6QWl94oB0gtL6xAHpBKX1iQPSCUrre96Bfz9PREAFqyCcAAAAAElFTkSuQmCC);
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          background-repeat: no-repeat;
          background-size: 80%;
          background-position: center;
          background-color: fade(black, 70%);
          border-radius: 50%;
        }
      }
      > .user-nikename {
        box-sizing: border-box;
        border: none;
        background-color: #ddd;
        display: block;
        font-size: 0.24rem;
        padding: 0.2rem 0.2rem;
        width: 100%;
        border-radius: 0.2rem;
        outline: none;
        margin-bottom: 0.2rem;
      }
      > .reset-star {
        margin-bottom: 0.2rem;
        > span {
          height: 0.4rem !important;
          width: 0.4rem !important;
          line-height: 0.4rem !important;
        }
        > .star-source {
          font-size: 0.52rem !important;
          color: @gray!important;
        }
      }
      .user-message {
        outline: none;
        border: none;
        display: block;
        width: 100%;
        background-color: #ddd;
        font-size: 0.24rem;
        padding: 0.2rem 0.2rem;
        border-radius: 0.2rem;
        box-sizing: border-box;
        height: 2rem;
        margin-bottom: 0.2rem;
        resize: none;
      }
      .send-btn {
        color: @gray;
        font-size: 0.3rem;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        > span {
          padding: 0.1rem 0.2rem;
          cursor: pointer;
        }
        > .span:first-child {
          float: left;
        }
        > .span:last-child {
          float: right;
        }
      }
    }
  }
}
</style>
<style lang="less">
#sourceself {
  > span {
    > i {
      font-size: 25px !important;
    }
  }
}
</style>

