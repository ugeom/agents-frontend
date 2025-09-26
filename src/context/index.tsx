import { GeoProvider } from './geo';
import { AgentApiProvider } from './agent';
import { LLMProvider } from './llm';
import { ChatProvider } from './chat';
import { ThreejsLayerProvider } from './threejs';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <AgentApiProvider>
    <ThreejsLayerProvider>
    <LLMProvider>
    <ChatProvider>
      {children}
    </ChatProvider>
    </LLMProvider>
    </ThreejsLayerProvider>
    </AgentApiProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";