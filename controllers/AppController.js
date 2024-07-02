import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    redisClient.isAlive((err, redisAlive) => {
      if (err || !redisAlive) {
        return res.status(500).json({ redis: false, db: false });
      }

      const dbAlive = dbClient.isAlive();
      if (!dbAlive) {
        return res.status(500).json({ redis: true, db: false });
      }

      return res.status(200).json({ redis: true, db: true });
    });
  }

  static async getStats(req, res) {
    try {
      const userCount = await dbClient.nbUsers();
      const fileCount = await dbClient.nbFiles();

      return res.status(200).json({ users: userCount, files: fileCount });
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving stats' });
    }
  }
}

module.exports = AppController;
