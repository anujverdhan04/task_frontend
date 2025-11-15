import axios from 'axios';

// Normalize API base URL.
// Use `VITE_API_URL` when provided (developer can set to e.g. http://localhost:5000/apib),
// otherwise default to the project's backend base that exposes boards at `/apib/boards`.
let base = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
let basetask = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
// remove trailing slash if present
if (base.endsWith('/')) base = base.slice(0, -1);

const api = axios.create({ baseURL: base });
// const apit = axios.create({ baseURL: basetask });

export default api;
