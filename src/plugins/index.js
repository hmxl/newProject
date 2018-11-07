import api from "../util/api"
import {lazy} from "../plugins/directive/index"
export default{
    install: function(Vue){
        Vue.prototype.$api = api;
        Vue.directive("lazy",lazy);
    }
}