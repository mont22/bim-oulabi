import {useEffect, useRef, useCallback} from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {WEBSOCKET_CONFIG} from '../constants/config';
import {useAppSelector, useAppDispatch} from './useAppDispatch';
import {updateDomainFromWebSocket} from '../store/slices/domainsSlice';
import {DomainDetail} from '../types/domain.types';

window.Pusher = Pusher;

export const useWebSocket = () => {
  const echoRef = useRef<Echo<'reverb'> | null>(null);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const connect = useCallback(() => {
    if (!token || echoRef.current) {
      return;
    }

    try {
      const echoConfig: any = {
        broadcaster: 'reverb' as const,
        key: WEBSOCKET_CONFIG.key,
        wsHost: WEBSOCKET_CONFIG.wsHost,
        wsPort: WEBSOCKET_CONFIG.wsPort,
        wsPath: WEBSOCKET_CONFIG.wsPath,
        forceTLS: WEBSOCKET_CONFIG.forceTLS,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: WEBSOCKET_CONFIG.authEndpoint,
        disableStats: WEBSOCKET_CONFIG.disableStats,
        encrypted: WEBSOCKET_CONFIG.encrypted,
        activityTimeout: WEBSOCKET_CONFIG.activityTimeout,
        pongTimeout: WEBSOCKET_CONFIG.pongTimeout,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      };

      if (WEBSOCKET_CONFIG.authorizer) {
        echoConfig.authorizer = WEBSOCKET_CONFIG.authorizer;
      }

      echoRef.current = new Echo<'reverb'>(echoConfig);

      const pusher = (echoRef.current as any).connector.pusher;

      pusher.connection.bind('unavailable', () => {
        setTimeout(() => {
          if (echoRef.current) {
            pusher.connect();
          }
        }, 5000);
      });

      const channel = echoRef.current.private('bids');

      channel.listen('.bid.created', (event: {domain: DomainDetail}) => {
        try {
          dispatch(updateDomainFromWebSocket(event.domain));
        } catch (err) {}
      });
    } catch (error) {}
  }, [token, dispatch]);

  const disconnect = useCallback(() => {
    if (echoRef.current) {
      echoRef.current.disconnect();
      echoRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (token) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [token, connect, disconnect]);

  return {connect, disconnect, echo: echoRef.current};
};

