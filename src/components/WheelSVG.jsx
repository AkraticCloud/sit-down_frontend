// WheelSVG.jsx
// Renders the spinning wheel SVG with restaurant slices

// Helper: convert degrees to radians for SVG math
const degToRad = (deg) => (deg * Math.PI) / 180;

// Helper: compute x,y coordinates on a circle from center, radius and angle
const polarToCartesian = (radius, angleDeg) => {
    const angleRad = degToRad(angleDeg);
    return {
        x: radius * Math.cos(angleRad),
        y: radius * Math.sin(angleRad),
    };
};

function WheelSVG({ restaurants }) {
    // Wheel styling constants
    const sliceColors = ['#E67E22', '#D63031', '#0984E3', '#00B894', '#6C5CE7'];
    const svgSize = 320;
    const center = svgSize / 2;
    const radius = 175;
    const labelRadius = 100;

    return (
        <svg className="wheel-svg" viewBox={`0 0 ${svgSize} ${svgSize}`}>
            {/* Center the wheel and rotate -90° so first slice starts at top */}
            <g transform={`translate(${center}, ${center}) rotate(-90)`}>
                {restaurants.map((r, i) => {
                    // Calculate slice boundaries
                    const segmentAngle = 360 / restaurants.length;
                    const startAngle = i * segmentAngle;
                    const endAngle = startAngle + segmentAngle;
                    const midAngle = startAngle + segmentAngle / 2;

                    // Get slice edge coordinates
                    const { x: x1, y: y1 } = polarToCartesian(radius, startAngle);
                    const { x: x2, y: y2 } = polarToCartesian(radius, endAngle);

                    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                    // Build SVG path for pie slice
                    const pathData = [
                        'M 0 0',
                        `L ${x1} ${y1}`,
                        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                        'Z',
                    ].join(' ');

                    // Position label at midpoint of slice
                    const { x: labelX, y: labelY } = polarToCartesian(labelRadius, midAngle);

                    return (
                        <g key={r.name}>
                            <path
                                className="wheel-slice"
                                d={pathData}
                                fill={sliceColors[i % sliceColors.length]}
                            />
                            <text
                                className="wheel-label"
                                x={labelX}
                                y={labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                transform={`rotate(${midAngle} ${labelX} ${labelY})`}
                            >
                                {r.name}
                            </text>
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}

export default WheelSVG;