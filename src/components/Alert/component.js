import React, { PureComponent } from "react";

export default class Alert extends PureComponent {
	render() {
		const { errors } = this.props;
		if (!errors) return null;
		return errors.map((error, index) => (
			<div
				key={error.message + index}
				className="z-9999 fixed left-0 top-0 right-0 mw6 center ma2 br2 bg-red pa1 white tc"
			>
				<span className="fw7">{error.message}</span>
			</div>
		));
	}
}
