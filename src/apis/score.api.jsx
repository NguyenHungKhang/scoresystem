import axiosInstance from "./axios.interceptor";

export const getStudentScoreByRegNum = async (regNum) => await axiosInstance.get(`/score/${regNum}`);
export const getStatistic = async (subject) => await axiosInstance.get(`/score/statistics/${subject}`);
export const getTopTenGroupA = async () => await axiosInstance.get(`/score/top10GroupA`);