const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (err) => {
  console.log("Redis error:", err);
});

const initRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis.");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
};

module.exports = { redisClient, initRedis };
