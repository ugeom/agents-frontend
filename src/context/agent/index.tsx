// React imports
import { useState, useRef, useContext, createContext } from 'react';

// Utils
import { postJsonRequest, buildApiUrl } from 'utils';

const AgentApiContext: React.Context<any> = createContext(null)

export const useAgentApi = () => useContext(AgentApiContext)

export const AgentApiProvider = ({children}: any) => {
	const isFirstRequest = useRef(true);
	const [ agentData, setAgentData ] = useState<any>(null);

	const fetchAgent = async (question: any, metaData: any) => {
	    let completeResponse = null;
	    let currentQuestion = question;

	    const url = buildApiUrl('/agent');

	    while (true) {
	        const data = await postJsonRequest(url, {
	            question: currentQuestion,
	            meta_data: JSON.stringify(metaData),
	            first_request: isFirstRequest.current,
	        });
	        completeResponse = data;
	        
	        setAgentData(data);

	        isFirstRequest.current = false;

	        if (data.tool_name === "") break;
	    }

	    return completeResponse;
	}

	return (
		<AgentApiContext.Provider value={{ 
			fetchAgent, agentData 
		}}>
			{children}
		</AgentApiContext.Provider>
	)
}

AgentApiContext.displayName = "AgentApiContext";