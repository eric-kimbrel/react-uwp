import * as React from "react";
import * as ReactTransitionGroup from "react-addons-transition-group";
import SlideInOutChild from "./SlideInOutChild";
interface DataProps {
	[key: string]: any;
}
export interface SlideInOutProps extends DataProps {
	appearAnimate?: boolean;
	childAttributes?: React.HTMLAttributes<HTMLDivElement>;
	children?: React.ReactElement<any>;
	direction?: "Left" | "Right" | "Top" | "Bottom";
	distance?: string | number;
	enterDelay?: number;
	leaveDelay?: number;
	mode?: "In" | "Out" | "Both";
	speed?: number;
	style?: React.CSSProperties;
}
interface SlideInOutState {}

export default class SlideInOut extends React.Component<SlideInOutProps, SlideInOutState> {
	static defaultProps: SlideInOutProps = {
		speed: 500,
		enterDelay: 0,
		leaveDelay: 0,
		direction: "Left",
		mode: "Both",
		distance: "100%",
		children: <div>SlideInOut</div>,
		appearAnimate: true,
	};

	render() {
		const {
			appearAnimate, // tslint:disable-line:no-unused-variable
			childAttributes,
			children,
			direction,
			distance,
			enterDelay,
			leaveDelay,
			mode,
			speed,
			style, // tslint:disable-line:no-unused-variable
			...others,
		} = this.props;
		const styles = getStyles(this);

		return (
			<ReactTransitionGroup
				{...others as any}
				style={styles.root}
				component="div"
			>
				{React.Children.map(children, (child: any, index) => (
					<SlideInOutChild
						key={child.key}
						direction={direction}
						enterDelay={enterDelay}
						leaveDelay={leaveDelay}
						mode={mode}
						speed={speed}
						distance={distance}
						appearAnimate={appearAnimate}
						{...childAttributes}
					>
						{child}
					</SlideInOutChild>
				))}
			</ReactTransitionGroup>
		);
	}
}

function getStyles(SlideInOut: SlideInOut): {
	root?: React.CSSProperties;
} {
	const {
		props: { style, speed }
	} = SlideInOut;

	return {
		root: {
			position: "relative",
			width: "100%",
			height: "100%",
			transition: `all ${speed}ms 0s ease-in-out`,
			...style,
		},
	};
}
