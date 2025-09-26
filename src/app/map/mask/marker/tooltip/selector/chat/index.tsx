export const Chat = ({ onClick, isActiveColor }: any) => {
	return (
		<section className="section-selectors">
			<div className="section-item" style={{backgroundColor: isActiveColor("chat")}}>
				<div onClick={() => onClick("chat")} style={{width: "20px", height: "20px"}}>
					<svg viewBox="0 0 30 30" fill="none">
					  <path
					    d="M27 6C27 4.9 26.1 4 25 4H5C3.9 4 3 4.9 3 6V21C3 22.1 3.9 23 5 23H20L24 27V23H25C26.1 23 27 22.1 27 21V6Z"
					    stroke="rgba(52, 152, 219, 1)"
					    strokeWidth="2"
					    strokeLinejoin="round"
					    fill="none"
					  />
					  <line x1="7" x2="23" y1="10" y2="10" stroke="rgba(52, 152, 219, 1)" strokeWidth="1.5" strokeLinecap="round"/>
					  <line x1="7" x2="23" y1="14" y2="14" stroke="rgba(52, 152, 219, 1)" strokeWidth="1.5" strokeLinecap="round"/>
					  <line x1="7" x2="18" y1="18" y2="18" stroke="rgba(52, 152, 219, 1)" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
				</div>
			</div>
		</section>
	)
}

Chat.displayName="Chat";