import { heroApi } from "../api/hero.api"

export const getHeroByPage = async() =>{

    const {data} = await heroApi.get(`/`);

    return data;
}