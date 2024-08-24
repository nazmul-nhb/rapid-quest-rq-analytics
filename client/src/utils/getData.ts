import axios from "axios";
import { ICLTVReport, ICLTVResponse } from "../types/interfaces";

export const baseURL = import.meta.env.VITE_BASE_URL;

export const getCLTVReport = async (): Promise<ICLTVReport[]> => {
	const { data }: { data: ICLTVResponse } = await axios.get(
		`${baseURL}/orders/lifetime-value`
    );
    
    const { CLTVReport } = data;
    
	return CLTVReport;
};
