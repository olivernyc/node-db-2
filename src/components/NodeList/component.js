import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../../api";
import NodeName from "../NodeName";

export default class NodeList extends PureComponent {
	render() {
		return (
			<div className="mw5-5 w-100 pv2">
				{this.renderList()}
				{this.renderEmpty()}
			</div>
		);
	}

	renderList() {
		const { nodes, filters } = this.props;
		if (!nodes) return null;
		return Object.values(nodes)
			.filter(node => filters[node.type] !== false)
			.sort((a, b) => b.id - a.id)
			.map(node => (
				<div key={node.id}>
					<Link
						to={`/node/${node.id}`}
						className="link no-underline db"
					>
						<div className="ph3 pointer mv2">
							<div className="pv3 pl2 pr3 bg-white br1 shadow black">
								<NodeName node={node} />
							</div>
						</div>
					</Link>
				</div>
			));
	}

	renderEmpty() {
		const { nodes } = this.props;
		if (!Object.values(nodes).length) {
			return (
				<div className="pa3 mv3 flex justify-center">
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="40px"
						height="40px"
						viewBox="0 0 50 50"
					>
						<path
							fill="#111"
							d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
						>
							<animateTransform
								attributeType="xml"
								attributeName="transform"
								type="rotate"
								from="0 25 25"
								to="360 25 25"
								dur="0.6s"
								repeatCount="indefinite"
							/>
						</path>
					</svg>
				</div>
			);
		}
	}
}
