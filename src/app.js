import app from './hooks/server.js';
import { PORT } from './config/config.js';
import http from 'http'

const server = http.createServer(app);

server.listen(PORT,()=>{
  console.log(`Running on PORT ${PORT}`);
})