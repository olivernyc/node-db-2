import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Status from "../Status";
import NodeName from "../NodeName";

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
				<h1 className="mv0 fw7 f3 f3">
					{node.name
						? node.name
						: `Node ${node.id || match.params.id}`}
				</h1>

				{node.notes ? (
					<div className="mv3 gray">
						<span>{node.notes}</span>
					</div>
				) : null}

				{this.renderPhotos()}

				<div className="flex pv3">
					{this.renderDevices()}
					{this.renderLinks()}
				</div>
			</div>
		);
	}

	renderDevices() {
		const { node } = this.props;
		if (!node) return null;
		const { devices } = node;
		if (!devices) return <div className="w-100" />;
		return (
			<div className="w-100 pr3">
				<h2 className="f5 mv0">Devices</h2>
				{devices.map(device => (
					<div className="bb b--light-gray pv3">
						<div className="flex items-end mb1">
							<span className="db fw5">
								{device.device || "Unknown Device"}
							</span>
							<Status status={device.status} />
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
		);
	}

	renderLinks() {
		const { node } = this.props;
		if (!node) return null;
		const { links } = node;
		if (!links) return <div className="w-100" />;
		return (
			<div className="w-100 pl3">
				<h2 className="f5 mv0">Connected To</h2>
				{links
					.filter(link => link.status === "active")
					.sort((linkA, linkB) => {
						const a =
							linkA.fromNode.id === node.id
								? linkA.toNode
								: linkA.fromNode;

						const b =
							linkB.fromNode.id === node.id
								? linkB.toNode
								: linkB.fromNode;

						if (a.type === b.type) {
							if (a.status === b.status) return 0;
							if (a.status === "active") return -1;
							if (b.status === "active") return 1;
							return 0;
						}

						if (a.type === "supernode") return -1;
						if (b.type === "supernode") return 1;

						if (a.type === "hub") return -1;
						if (b.type === "hub") return 1;

						if (a.type === "active") return -1;
						if (b.type === "active") return 1;

						return 0;
					})
					.map(link => {
						const otherNode =
							link.fromNode.id === node.id
								? link.toNode
								: link.fromNode;
						return (
							<Link to={`/node/${otherNode.id}`} className="link">
								<div className="bb b--light-gray pv3 black">
									<NodeName node={otherNode} />
								</div>
							</Link>
						);
					})}
			</div>
		);
	}

	renderPhotos() {
		const { node, match } = this.props;
		if (!node || !node.panoramas) return null;
		return (
			<div className="mv3">
				<div className="flex mhn1">
					{node.panoramas.slice(0, 4).map((panorama, index) => (
						<Link
							to={`/node/${node.id}/panoramas/${index + 1}`}
							className="h4 w-100 mh1 db"
						>
							<div
								className="h-100 w-100 bg-center cover"
								style={{
									backgroundImage: `url('https://node-db.netlify.com/panoramas/${panorama}')`
								}}
							/>
						</Link>
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
