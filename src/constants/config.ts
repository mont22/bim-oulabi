export const API_CONFIG = {
  BASE_URL: 'https://api.qa.bugsbytes.com/api',
  TIMEOUT: 30000,
};

export const WEBSOCKET_CONFIG = {
  broadcaster: 'reverb' as const,
  key: 'assessment',
  wsHost: 'api-assessment.steerhubs.com',
  wsPort: 443,
  wsPath: '/app/assessment',
  forceTLS: true,
  enabledTransports: ['ws', 'wss'] as const,
  authEndpoint: 'https://api-assessment.steerhubs.com/api/broadcasting/auth',
  disableStats: true,
  encrypted: true,
  activityTimeout: 120000,
  pongTimeout: 30000,
  authorizer: (channel: any, options: any) => {
    return {
      authorize: (socketId: string, callback: Function) => {
        fetch(options.authEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': options.auth.headers.Authorization,
          },
          body: JSON.stringify({
            socket_id: socketId,
            channel_name: channel.name,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Auth failed: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            callback(null, data);
          })
          .catch(error => {
            callback(error, null);
          });
      },
    };
  },
};

export const STORAGE_KEYS = {
  TOKEN: '@domain_marketplace_token',
  USER: '@domain_marketplace_user',
  FIRST_LAUNCH: '@domain_marketplace_first_launch',
};

export const ROUTES = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  VERIFICATION: 'Verification',
  MARKETPLACE: 'Marketplace',
  AUCTION: 'Auction',
  NOT_FOUND: 'NotFound',
} as const;

