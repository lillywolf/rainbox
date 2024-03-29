export default function TriangleUp({ color = 'black' }: { color?: string }) {
  return (
    <svg 
      viewBox="0 0 17 17"
    >    
      <g
        stroke="none"
        stroke-width="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M7.96,2.392 C8.541,1.812 9.482,1.812 10.064,2.392 L16.506,8.836 C17.088,9.417 17.345,10.939 15.506,10.939 L2.518,10.939 C0.616,10.939 0.936,9.418 1.517,8.836 L7.96,2.392 L7.96,2.392 Z"
          fill={color}
        >
        </path>
      </g>
    </svg>
  ); 
}