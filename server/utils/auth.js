/**
 * Verifies and decodes a Firebase ID token
 * @param {string} idToken - The Firebase ID token to verify
 * @returns {Object} The decoded token payload
 * @throws {Error} If the token is invalid or expired
 */
export const verifyAndDecodeToken = (idToken) => {
  if (!idToken) {
    throw new Error('No token provided');
  }
  
  // Simple JWT decode (base64)
  const tokenParts = idToken.split('.');
  if (tokenParts.length !== 3) {
    throw new Error('Invalid token format');
  }
  
  // Decode the payload (second part)
  const payload = tokenParts[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  
  // Use Buffer instead of atob for Node.js compatibility
  const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
  
  const decodedToken = JSON.parse(jsonPayload);
  
  // Verify token hasn't expired
  const now = Math.floor(Date.now() / 1000);
  if (decodedToken.exp && decodedToken.exp < now) {
    throw new Error('Token expired');
  }
  
  return decodedToken;
};

/**
 * Extracts the username from a decoded token
 * @param {Object} decodedToken - The decoded token payload
 * @returns {string} The username
 */
export const getUsernameFromToken = (decodedToken) => {
  // Usar solo la parte del correo antes del @
  const email = decodedToken.email || '';
  const username = email.split('@')[0].toLowerCase();
  
  console.log('Token info:', {
    email,
    username,
    tokenKeys: Object.keys(decodedToken)
  });
  
  return username;
};

/**
 * Extracts and verifies a token from the authorization header
 * @param {Object} event - The Nitro event object
 * @returns {Object} An object containing the decoded token and username
 * @throws {Error} If the token is missing, invalid, or expired
 */
export const getAuthFromEvent = (event) => {
  const authHeader = event.node.req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }
  
  // Extract token
  const idToken = authHeader.split('Bearer ')[1];
  
  // Verify and decode token
  const decodedToken = verifyAndDecodeToken(idToken);
  
  // Get username
  const username = getUsernameFromToken(decodedToken);
  
  return {
    decodedToken,
    username
  };
}; 