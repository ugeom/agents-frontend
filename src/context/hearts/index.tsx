// React imports
import { useState, useContext, createContext, useEffect } from 'react';

// Utils
import { getJsonRequest, buildApiUrl } from 'utils/agent';

interface HeartState {
  state: 'full' | 'three-quarter' | 'half' | 'quarter' | 'empty';
}

const HeartsContext: React.Context<any> = createContext(null);

export const useHearts = () => useContext(HeartsContext);

export const HeartsProvider = ({ children }: any) => {
  const maxCalls = 3;
  const TOTAL_CALLS = 100;

  // Initialize to 0 until we fetch from backend
  const [ remainingCalls, setRemainingCalls ] = useState<number>(0);
  
  // Fetch initial remaining calls from backend
  useEffect(() => {
    const fetchRemainingCalls = async () => {
      try {
        const url = buildApiUrl('/hearts');
        const data = await getJsonRequest(url);
        if (data.remaining_calls !== undefined) {
          setRemainingCalls(data.remaining_calls);
        }
      } catch (error) {
        console.error('Failed to fetch remaining calls:', error);
        // Fallback to empty hearts if we can't reach the backend
        setRemainingCalls(0);
      }
    };
    fetchRemainingCalls();
  }, []);
  
  // Calculate heart states based on remaining calls
  const calculateHeartStates = () => {
    const hearts: HeartState[] = [];
    const callsPerHeart = TOTAL_CALLS / maxCalls;
    const callsPerQuarter = callsPerHeart / 4;
    
    for (let i = 0; i < maxCalls; i++) {
      // Calculate calls for this heart (hearts diminish from right to left)
      const heartMinCalls = i * callsPerHeart;
      const heartMaxCalls = heartMinCalls + callsPerHeart;
      
      if (remainingCalls >= heartMaxCalls) {
        hearts.push({ state: 'full' });
      } else if (remainingCalls >= heartMinCalls + callsPerQuarter * 3) {
        hearts.push({ state: 'three-quarter' });
      } else if (remainingCalls >= heartMinCalls + callsPerQuarter * 2) {
        hearts.push({ state: 'half' });
      } else if (remainingCalls >= heartMinCalls + callsPerQuarter * 1) {
        hearts.push({ state: 'quarter' });
      } else {
        hearts.push({ state: 'empty' });
      }
    }
    return hearts;
  };

  const hearts = calculateHeartStates();

  return (
    <HeartsContext.Provider value={{ hearts, maxCalls, setRemainingCalls }}>
      {children}
    </HeartsContext.Provider>
  );
};

HeartsProvider.displayName = 'HeartsProvider';