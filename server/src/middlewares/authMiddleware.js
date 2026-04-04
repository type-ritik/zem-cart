function authenticateSeller(req, res, next) {
  // Logic to authenticate seller using token from request headers
  // If authentication is successful, set req.sellerId and call next()
  // If authentication fails, return a 401 Unauthorized response
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify token and extract seller ID (this is just a placeholder logic)
    const decoded = {}; // Replace with actual token verification logic
    req.sellerId = decoded.sellerId; // Set seller ID in request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = {
  authenticateSeller,
};
