import axios from "axios";

export default class PostService {

    static getPost = async (page: number) => {
        return await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
    }

}