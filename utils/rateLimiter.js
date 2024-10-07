const rateLimitMap = new Map();

const rateLimiter = (userId, limit = 5, duration = 10000) => {
  const now = Date.now();
  const userActivity = rateLimitMap.get(userId) || [];

  const recentRequests = userActivity.filter(
    (timestamp) => now - timestamp < duration
  );

  if (recentRequests.length >= limit) {
    return false; // Rate limit exceeded
  }

  recentRequests.push(now);
  rateLimitMap.set(userId, recentRequests);

  return true;
};

module.exports = { rateLimiter };
