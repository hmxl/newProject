import axios from "axios"
import Qs from "qs"

const baseUrl = process.env.BASE_URL;
const requestUrl = {
    // type:"/workspace/filmApi/loadTyps.php",
    // films:"/workspace/filmApi/loadFilms.php",
    // details:"/workspace/filmApi/loadFilmById.php",
    // comments:"/workspace/filmApi/loadCommentById.php",
    // insert:"/workspace/filmApi/insertComment.php",
    type:"/filmApi/loadTyps.php",
    films:"/filmApi/loadFilms.php",
    details:"/filmApi/loadFilmById.php",
    comments:"/filmApi/loadCommentById.php",
    insert:"/filmApi/insertComment.php",
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

const insertComment = function(params){
    return axios.post(baseUrl+requestUrl.insert, Qs.stringify(params));
}

export default{
    loadTypes,loadFilmList,loadDetails,loadComments,insertComment
}