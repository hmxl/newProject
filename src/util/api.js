import axios from "axios"
import Qs from "qs"

const baseUrl = process.env.BASE_URL;
const requestUrl = {
    type:"/workspace/filmApi/loadTyps.php",
    films:"/workspace/filmApi/loadFilms.php",
    details:"/workspace/filmApi/loadFilmById.php",
    comments:"/workspace/filmApi/loadCommentById.php"
};

const loadTypes = function(){
    return axios.post(baseUrl+requestUrl.type);
}

const loadFilmList  =  function(params){
    return axios.post(baseUrl+requestUrl.films, Qs.stringify(params));
}

const loadDetails = function(params){
    return axios.post(baseUrl+requestUrl.details, Qs.stringify(params));
}

const loadComments = function(params){
    return axios.post(baseUrl+requestUrl.comments, Qs.stringify(params));
}

export default{
    loadTypes,loadFilmList,loadDetails,loadComments
}