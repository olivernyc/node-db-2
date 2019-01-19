import React, { PureComponent } from "react";
import Nav from "../Nav";
import "../../api";

export default class Dashboard extends PureComponent {
	componentDidMount() {
		this.props.fetchNodes();
	}

	render() {
		const { nodes = [] } = this.props;
		return (
			<div>
				<div>
					{nodes.map(node => (
						<div>
							<span>{JSON.stringify(node)}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
}
