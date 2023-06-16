import axios from 'axios';

/* export default axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
 */

export default axios.create({
  baseURL: 'https://stormy-tux-tuna.cyclic.app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
}); 
