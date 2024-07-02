import express from 'express';
// import dbClient from './utils/db';
// import redisClient from './utils/redis';
import routes from './routes';

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', routes);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
