const isLocal = window.location.hostname === "localhost";

export const BASEURL = isLocal ? "http://localhost" : "https://quiztest-gilt.vercel.app";
export const APIURL = isLocal ? "http://localhost:5000/" : "https://quiztest-gilt.vercel.app/api/";