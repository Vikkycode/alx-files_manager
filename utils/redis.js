
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
  }

  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    return new Promise((resolve) => {
      this.client.get(key, (err, value) => {
        if (err) {
          console.error(err);
          resolve(null);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setEx(key, duration, value, (err, reply) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(reply);
      });
    });
  }


  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
