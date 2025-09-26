// App imports
import { Logo } from './logo';
import { Chat } from './chat';
import { Maps } from './maps';
import './styles.scss';

// Context import
import { ContextProvider } from 'context';

export const App = () => {
  return (
    <ContextProvider>
      <Logo/>
      <div className="world-wrapper">
        <Maps/>
        <Chat/>
      </div>
    </ContextProvider>
  );
};

App.displayName = "App";