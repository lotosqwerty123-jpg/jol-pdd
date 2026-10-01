import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import * as Network from 'expo-network';

export type JolNetworkState = 'checking' | 'online' | 'offline';

function normalize(state: Network.NetworkState): JolNetworkState {
  if (state.isConnected === false || state.isInternetReachable === false) return 'offline';
  if (state.isConnected === true) return 'online';
  return 'checking';
}

export function useNetworkStatus() {
  const [status, setStatus] = useState<JolNetworkState>('checking');

  useEffect(() => {
    let mounted = true;

    const refresh = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (mounted) setStatus(normalize(state));
      } catch {
        if (mounted) setStatus('checking');
      }
    };

    void refresh();

    const networkSubscription = Network.addNetworkStateListener((state) => {
      if (mounted) setStatus(normalize(state));
    });

    const appSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void refresh();
    });

    // Small fallback poll makes source links react even on devices where reachability
    // updates are delayed by Android power/network policies.
    const timer = setInterval(() => void refresh(), 4000);

    return () => {
      mounted = false;
      networkSubscription.remove();
      appSubscription.remove();
      clearInterval(timer);
    };
  }, []);

  return status;
}
