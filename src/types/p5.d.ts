export type P5jsContainerRef = HTMLDivElement;
export type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
export type P5jsContainer = ({ sketch }: { sketch: P5jsSketch }) => React.JSX.Element;
