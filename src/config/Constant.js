const isLocal = window.location.hostname === "localhost";

export const BASEURL = isLocal ? "http://localhost" : "https://quiztest-roan.vercel.app";
export const APIURL = isLocal ? "http://localhost:5000/" : "https://quiztest-roan.vercel.app/api/";