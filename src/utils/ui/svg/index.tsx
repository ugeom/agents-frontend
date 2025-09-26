// React imports
import { useCallback, Children, cloneElement } from 'react';

export const SVGWrapper = ({ width, height, setWidth, setHeight, margin, children }: any) => {
	const parentRef = useCallback((node: any) => {
		if (node) {
			const { width, height } = node.getBoundingClientRect();
			setWidth(width);
			setHeight(height);
		}
	}, []);

	return (
		<div ref={parentRef} style={{width: "100%", height: "100%"}}>
			{width && height &&
				<svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						{Children.map(children, (child, index) => 
				            cloneElement(child, {width: "100%"})
				        )}
			        </g>
				</svg>
			}
		</div>
	)
}

SVGWrapper.displayName="SVGWrapper";