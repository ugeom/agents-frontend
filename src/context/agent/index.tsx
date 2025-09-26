// React imports
import { useState, useRef, useContext, createContext } from 'react';

// Utils
import { postJsonRequest, buildApiUrl } from 'utils/agent';

const AgentApiContext: React.Context<any> = createContext(null)

export const useAgentApi = () => useContext(AgentApiContext)

export const AgentApiProvider = ({children}: any) => {
	const isFirstRequest = useRef(true);
	
	const [ agentData, setAgentData ] = useState<any>(null);

	const fetchAgent = async (question: any) => {
	    let completeResponse = null;
	    let currentQuestion = question;

	    const url = buildApiUrl('/agent');

	    try {
	        while (true) {
	            const data = await postJsonRequest(url, {
	                question: currentQuestion,
	                first_request: isFirstRequest.current,
	            });
	            completeResponse = data;
	            
	            setAgentData(data);

	            isFirstRequest.current = false;
	            if (data.tool_name === "") break;
	        }
	    } 
	    catch (error) {
	    	const message = error instanceof Error ? error.message : 'Request failed';
	        const errorData = { 
	        	error: true, 
	        	message, 
	        	tool_name: "" 
	        };
	        setAgentData(errorData);
	        return errorData;
	    }
	    return completeResponse;
	}

	return (
		<AgentApiContext.Provider value={{ fetchAgent, agentData }}>
			{children}
		</AgentApiContext.Provider>
	)
}

AgentApiContext.displayName = "AgentApiContext";