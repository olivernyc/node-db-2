import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import NodeStatus from "../NodeStatus";

export default class Node extends PureComponent {
	render() {
		return (
			<div className="pa3 w-100 mw7">
				{this.renderBar()}
				{this.renderInfo()}
			</div>
		);
	}

	renderBar() {
		return (
			<div className="flex items-center justify-between mb3">
				<Link to="/" className="link db blue flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						viewBox="8 4 8 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="overflow-visible"
					>
						<polyline points="15 18 9 12 15 6" />
					</svg>
					<span className="ml1">Nodes</span>
				</Link>
				<button
					className="bn pa0 bg-transparent blue fw5"
					onClick={() => this.saveNode()}
				>
					Save
				</button>
			</div>
		);
	}

	renderInfo() {
		const { node, match } = this.props;
		if (!node || !node.coordinates) return null;
		return (
			<div>
				<div className="flex items-end">
					<h1 className="mv0 fw7 f3 f3">
						Node {node.id || match.params.id}
					</h1>
					<NodeStatus node={node} />
				</div>

				{this.renderPhotos()}

				{node.notes ? (
					<div className="mb3 pa3 bg-washed-yellow ba b--light-gray">
						<span>{node.notes}</span>
					</div>
				) : null}

				{node.devices ? (
					<div>
						<h2 className="f5 mv0">Devices</h2>
						{node.devices.map(device => (
							<div className="bb b--light-gray pv3">
								<div className="flex items-center mb1">
									<div
										className={`h05 w05 br-pill mr2 ${
											device.status === "active"
												? "bg-red"
												: "bg-gray"
										}`}
									/>
									<span className="db fw5">
										{device.device || "Unknown Device"}
									</span>
								</div>
								<span className="db gray">
									{device.width}°
									{device.width !== 360
										? ` ${getCardinal(device.azimuth)}`
										: null}
									{", "}
									{device.radius} Miles
								</span>
							</div>
						))}
					</div>
				) : null}
			</div>
		);
	}

	renderPhotos() {
		const { node, match } = this.props;
		if (!node || !node.panoramas) return null;
		return (
			<div className="mv3 bt b--light-gray">
				<div className="flex mhn1">
					{node.panoramas.slice(0, 4).map(panorama => (
						<div
							className="h4 w-100 bg-center cover mh1"
							style={{
								backgroundImage: `url('https://node-db.netlify.com/panoramas/${panorama}')`
							}}
						/>
					))}
				</div>
			</div>
		);
	}
}

function getCardinal(angle) {
	//easy to customize by changing the number of directions you have
	var directions = 8;

	var degree = 360 / directions;
	angle = angle + degree / 2;

	if (angle === 360) return "";
	if (angle >= 0 * degree && angle < 1 * degree) return "N";
	if (angle >= 1 * degree && angle < 2 * degree) return "NE";
	if (angle >= 2 * degree && angle < 3 * degree) return "E";
	if (angle >= 3 * degree && angle < 4 * degree) return "SE";
	if (angle >= 4 * degree && angle < 5 * degree) return "S";
	if (angle >= 5 * degree && angle < 6 * degree) return "SW";
	if (angle >= 6 * degree && angle < 7 * degree) return "W";
	if (angle >= 7 * degree && angle < 8 * degree) return "NW";
	//Should never happen:
	return "N";
}
