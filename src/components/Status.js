import React, { PureComponent } from "react";
import { statusColors } from "../utils";

export default class Status extends PureComponent {
	render() {
		const { status } = this.props;
		const color = statusColors[status];
		return (
			<div
				className="ml2 flex items-center black-60 pv05 ph2 f7 fw5 br-pill"
				style={{ backgroundColor: color }}
			>
				<span className="ttc">{status}</span>
			</div>
		);
	}
}
