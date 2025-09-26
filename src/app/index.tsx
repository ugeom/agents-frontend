// App imports
import { Chat } from './chat';
import { Maps } from './maps';
import './styles.scss';

// Context import
import { ContextProvider } from 'context';

export const App = () => {
  return (
    <ContextProvider>
      <div className="world-wrapper"> 
          <Chat/>
          <Maps/>
      </div>
    </ContextProvider>
  );
};

App.displayName = "App";