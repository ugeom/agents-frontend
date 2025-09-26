// React imports
import { useState, useMemo } from 'react';

// App imports
import { SVGWrapper } from 'utils/ui/svg';

export const Lines = ({ distribution, colors, sumOfValues }: any) => {
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);

    const margin = { top: 0, bottom: 0, left: 0, right: 0 };
    const innerWidth = (width ?? 0) - margin.left - margin.right;
    const innerHeight = (height ?? 0) - margin.top - margin.bottom;

    const numOfColumns = 30;
    const numOfRows = 30;

    const dotWidth = innerWidth / numOfColumns;
    const dotHeight = innerHeight / numOfRows;

    const dotsData = useMemo(() => {
        const positions: { cx: number; cy: number; color: string }[] = [];
        let currentRow = 0;
        let currentCol = 0;

        Object.entries(distribution).forEach(([item, value]: any) => {
            const count = Math.round((value / sumOfValues) * numOfColumns * numOfRows);

            Array.from({ length: count }).forEach(() => {
                const cx = currentCol * dotWidth;
                const cy = currentRow * dotHeight + dotHeight / 2;
                positions.push({ cx, cy, color: colors[item] });

                currentCol++;
                if (currentCol >= numOfColumns) {
                    currentCol = 0;
                    currentRow++;
                }
            });
        });

        return positions;
    }, [ distribution, colors, sumOfValues, dotWidth, dotHeight, numOfColumns ]);

	return (
		<SVGWrapper
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            margin={margin}
        >
			{dotsData.map(({ cx, cy, color }: any, index: any) => (
                <line
                    key={index}
                    x1={cx + 0.5}
                    y1={cy}
                    x2={cx + dotWidth - 1}
                    y2={cy}
                    strokeWidth={10}
                    stroke={color}
                />
            ))}
		</SVGWrapper>
	)
}

Lines.displayName="Lines";