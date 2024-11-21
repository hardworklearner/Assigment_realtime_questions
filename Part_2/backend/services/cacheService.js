const redis = require("redis");

const client = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

(async () => {
  await client.connect();
  console.log("Connected to Redis.");
})();

const CacheService = {
  async get(key) {
    if (!client.isOpen) {
      console.error("Redis client is not connected.");
      await client.connect();
    }
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key, value, ttl) {
    if (!client.isOpen) {
      console.error("Redis client is not connected.");
      await client.connect();
    }
    await client.set(key, JSON.stringify(value), { EX: ttl || 3600 });
  },

  async delete(key) {
    if (!client.isOpen) {
      console.error("Redis client is not connected.");
      await client.connect();
    }
    await client.del(key);
  },
};

module.exports = CacheService;
