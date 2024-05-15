import { get } from "../utils/request"

export  const getListTags = async() => {
    const result = get(`tags`);
    return result;
}