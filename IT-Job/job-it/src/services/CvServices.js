import { del, get, post } from "../utils/request"

export const createCV = async (options) => {
    const result = await post(`cv`, options);
    return result;
}
export const deleteCV = async (id) => {
    const result = await del(`cv`, id);
    return result;
}

export const getListCv = async (id) => {
    const result = await get(`cv?idJob=${id}`);
    return result;
};
export const getAllCv = async () => {
    const result = await get(`cv`);
    return result;
};

export const detailCv = async(id) => {
    const result = await get(`cv/${id}`)
    return result;
}
