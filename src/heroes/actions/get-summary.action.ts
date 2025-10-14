import { heroApi } from "../api/hero.api"
import type { summaryInformationResponse } from "../interfaces/summary-information.response";

export const getSummaryAction = async () => {

    const { data } = await heroApi.get<summaryInformationResponse>('/summary');
    
    return data;
}
