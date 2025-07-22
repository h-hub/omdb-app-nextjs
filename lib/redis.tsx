import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("Redis Url is not defined");
}
const redis = new Redis(redisUrl);

export default redis;
