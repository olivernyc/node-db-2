import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import NodeStatus from "../NodeStatus";

export default class Node extends PureComponent {
	componentDidMount() {
		const { node, fetchNode, match } = this.props;
		fetchNode(node);
	}

	render() {
		const { node, match } = this.props;
		const { id } = node;
		return (
			<div className="pa3 w-100 mw7">
				<Link to="/" className="link mb3 db blue">
					Back
				</Link>
				<div className="flex items-center">
					<h1 className="mv0 f3">Node {id || match.params.id}</h1>
					<NodeStatus node={node} />
				</div>
				<div className="flex items-center mt3">
					<span className="w4 db fw6 mr2">Lat</span>
					<span>{node.coordinates[0]}</span>
				</div>

				<div className="flex items-center">
					<span className="w4 db fw6 mr2">Lng</span>
					<span>{node.coordinates[1]}</span>
				</div>

				<div className="flex items-center">
					<span className="w4 db fw6 mr2">Joined</span>
					<time>
						{new Date(node.requestDate).toLocaleDateString()}
					</time>
				</div>
			</div>
		);
	}
}
