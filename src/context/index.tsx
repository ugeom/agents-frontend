import { GeoProvider } from './geo';
import { AgentApiProvider } from './agent';
import { LLMProvider } from './llm';
import { ChatProvider } from './chat';
import { ThreeLayerProvider } from './three';
import { HeartsProvider } from './hearts';
import { WeatherProvider } from './weather';

export const ContextProvider = ({children}: any) => {
  return (
    <HeartsProvider>
    <GeoProvider>
    <AgentApiProvider>
    <WeatherProvider>
    <ThreeLayerProvider>
    <LLMProvider>
    <ChatProvider>
      {children}
    </ChatProvider>
    </LLMProvider>
    </ThreeLayerProvider>
    </WeatherProvider>
    </AgentApiProvider>
    </GeoProvider>
    </HeartsProvider>
  )
}

ContextProvider.displayName="ContextProvider";