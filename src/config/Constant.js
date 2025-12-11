// Configuration based on environment
const isDevelopment = import.meta.env.MODE === 'development';

// API Configuration
export const BASEURL = isDevelopment
  ? "http://localhost:5173"
  : "https://quiztest-theta.vercel.app";

export const APIURL = isDevelopment
  ? "http://localhost:5000"
  : "/api";

// App Configuration
export const WEBSITE_NAME = import.meta.env.VITE_WEBSITE_NAME || "QuizTest";

// Exam Time Configuration (in milliseconds)
export const EXAM_TIMES = {
  reactJS: parseInt(import.meta.env.VITE_REACT_JS_EXAM_TIME) || 600000, // 10 minutes
  php: parseInt(import.meta.env.VITE_PHP_EXAM_TIME) || 600000,
  fullStack: parseInt(import.meta.env.VITE_FULLSTACK_EXAM_TIME) || 600000,
  aiBots: parseInt(import.meta.env.VITE_AI_BOTS_EXAM_TIME) || 600000
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  PHONE_PATTERN: /^[0-9+\-\s()]{10,15}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// API Endpoints
export const API_ENDPOINTS = {
  REGISTER: `${APIURL}/register`,
  LOGIN: `${APIURL}/login`,
  SAVE_RESULT: `${APIURL}/save-result`,
  SAVE_ANSWER: `${APIURL}/save-answer`,
  USER_RESULTS: `${APIURL}/user-results`
};