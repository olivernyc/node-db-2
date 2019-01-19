import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../../api";

export default class NodeList extends PureComponent {
	componentDidMount() {
		this.props.fetchNodes();
	}

	render() {
		const { nodes = [] } = this.props;
		return (
			<div className="mw5-5 w-100 bg-white">
				<div className="pa3 flex">
					<input
						className="w-100 br2 pa2 bn bg-near-white"
						placeholder="Search"
					/>
				</div>
				{nodes
					.sort((a, b) => a.id - b.id)
					.reverse()
					.map(node => (
						<Link
							key={node.id}
							to={`/node/${node.id}`}
							className="link light-gray no-underline db"
						>
							<div className="ph3 pointer">
								<div className="pv3 bb b--light-gray flex items-center">
									{
										// <div className="h05 w05 bg-red br-pill" />
									}
									<span className="fw6 black">
										Node {node.id}
									</span>
								</div>
							</div>
						</Link>
					))}
			</div>
		);
	}
}
