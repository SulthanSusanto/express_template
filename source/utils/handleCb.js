import UAParser from 'ua-parser-js';
import makeLogsDb from '../database/repository/logs.repository.js';

const dbAccess = makeLogsDb();

/**
 * Retrieves browser information from the user agent string.
 *
 * @param {string} userAgent - The user agent string from the request headers.
 * @returns {Object} - An object containing browser-related information.
 */
function parseUserAgent(userAgent) {
  const parser = new UAParser(userAgent); // Create a new UAParser instance.
  const browserInfo = parser.getBrowser(); // Get browser-related information.
  return browserInfo; // Return the parsed browser information.
}

/**
 * Creates an Express callback function to handle HTTP requests and responses.
 *
 * @param {Function} controller - The controller function to handle the HTTP request.
 * @returns {Function} - An Express callback function for handling requests and responses.
 */
export default function createExpressCallback(controller) {
  return async (req, res) => {
    try {
      const httpRequest = {
        host: req.hostname,
        protocol: req.protocol,
        body: req.body || {},
        query: req.query || {},
        params: req.params || {},
        browser: parseUserAgent(req.get('User-Agent')) || '',
        ip: req.ip,
        fileImage: req.files,
        method: req.method,
        path: req.path,
        originalUrl: req.originalUrl,
        user: req.user || {},
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent'),
        },
      };

      const { method, originalUrl, protocol, host, ip } = httpRequest;

      const httpResponse = await controller(httpRequest);

      // insert into database
      if (method) {
        const action = originalUrl
          .split(/api\/v\d+\//i)[1]
          .split('/')
          .join(' ');
        const url = `${protocol}://${host}${originalUrl}`;

        await dbAccess.insert({
          ...httpRequest,
          action,
          url,
          ip_address: ip,
          user: '',
        });
      }

      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.type('json');
      return res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (err) {
      console.log(err);
      return res
        .status(err.statusCode || 500)
        .send({ error: 'An unknown error occurred', message: err.message });
    }
  };
}
