import React, { PureComponent } from "react";

export default class Component extends PureComponent {
	render() {
		const { location } = this.props;
		const left =
			location.pathname.indexOf("/node/") === 0 ? "48rem" : "24rem";
		return (
			<div
				style={{
					left,
					top: "65px"
				}}
				className="fixed pv3 pr3 flex right-0 bottom-0 bg-white"
			>
				<div className="h-100 w-100 bg-near-white" />
			</div>
		);
	}
}
