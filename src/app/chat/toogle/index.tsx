// React imports
import { useEffect } from 'react';

// App imports
import { Hide } from './hide';
import { Trash } from './trash';
import { Hearts } from 'app/chat/hearts';

export const Toogle = ({ responseData, setResponseData, chatMode, setChatMode }: any) => {
	const hasMessages = responseData && responseData.length > 0;

	useEffect(() => {
		setChatMode(hasMessages ? 'normal' : 'input-only');
	}, [ hasMessages, setChatMode ]);

	return (
		<>
			<Hearts/>
			{hasMessages && 
				<>
					<Hide chatMode={chatMode} setChatMode={setChatMode}/>
					<Trash setResponseData={setResponseData}/>
				</>
			}
		</>
	)
}

Toogle.displayName="Toogle";