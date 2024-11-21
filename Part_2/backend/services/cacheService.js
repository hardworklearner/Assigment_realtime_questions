const redis = require("redis");

class CacheService {
  constructor() {
    this.client = redis.createClient({
      url: "redis://127.0.0.1:6379",
    });

    this.client.on("error", (err) => {
      console.error("Redis Error:", err);
    });

    this.connect();
  }

  async connect() {
    if (!this.client.isOpen) {
      try {
        await this.client.connect();
        console.log("Connected to Redis.");
      } catch (err) {
        console.error("Error connecting to Redis:", err);
        throw err;
      }
    }
  }

  async get(key) {
    try {
      if (!this.client.isOpen) {
        await this.connect();
      }
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Error getting key "${key}" from Redis:`, err);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      if (!this.client.isOpen) {
        await this.connect();
      }
      await this.client.set(key, JSON.stringify(value), { EX: ttl });
    } catch (err) {
      console.error(`Error setting key "${key}" in Redis:`, err);
      throw err;
    }
  }

  async delete(key) {
    try {
      if (!this.client.isOpen) {
        await this.connect();
      }
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key "${key}" from Redis:`, err);
      throw err;
    }
  }

  async quit() {
    try {
      if (this.client.isOpen) {
        await this.client.quit();
        console.log("Redis connection closed.");
      }
    } catch (err) {
      console.error("Error closing Redis connection:", err);
      throw err;
    }
  }
}

module.exports = new CacheService();
