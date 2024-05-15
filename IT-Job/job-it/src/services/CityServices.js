import { get } from "../utils/request"

export const getListCity = async () => {
    const  result = await get(`cities`)
    return result
}