import axios from "axios";

const AIClient = axios.create({
  baseURL: import.meta.env.VITE_AI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default AIClient;
