import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Status from "../Status";
import NodeName from "../NodeName";

export default class Node extends PureComponent {
	render() {
		return <div className="pa3 w-100 mw7">{this.renderInfo()}</div>;
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
			</div>
		);
	}

	renderInfo() {
		const { node, match } = this.props;
		if (!node) return null;
		return (
			<div>
				<div className="pa3 bg-white br2 shadow">
					<h1 className="mv0 f4 fw5">
						{node.name
							? node.name
							: `Node ${node.id || match.params.id}`}
					</h1>
				</div>

				{this.renderPhotos()}

				{this.renderDevices()}
				{this.renderLinks()}

				{this.renderLog()}
			</div>
		);
	}

	renderLog() {
		const { node } = this.props;
		if (!node) return null;
		const { links } = node;
		const firstLinkNode = links
			? links[0].toNode.id === node.id
				? links[0].fromNode
				: links[0].toNode
			: null;
		return (
			<div className="mt3 bb b--light-gray bg-white br2 shadow">
				<div className="pa3">
					<span className="f5 fw5">Activity</span>
				</div>
				<div className="">
					{node.installDate && node.connectedNodes
						? node.connectedNodes
								.filter(
									connectedNode =>
										connectedNode.status === "active"
								)
								.sort(
									(a, b) =>
										new Date(b.installDate) -
										new Date(a.installDate)
								)
								.map(connectedNode => (
									<div className="pa3 bt b--light-gray flex items-start">
										<span className="mr2 mt1 f7">🔗</span>
										<div>
											<span className="db f6 mb1">
												Connected to{" "}
												<Link
													to={`/node/${
														connectedNode.id
													}`}
													className="blue fw5 link"
												>
													{connectedNode.name ||
														`Node ${
															connectedNode.id
														}`}
												</Link>
											</span>
											<span className="db f7 gray">
												{format(
													connectedNode.installDate,
													"MMM D, YYYY"
												)}
											</span>
										</div>
									</div>
								))
						: null}

					<div className="pa3 bt b--light-gray flex items-start">
						<span className="mr2 mt1 f7">🎉</span>
						<div>
							<span className="db f6 mb1">Joined</span>
							<span className="db f7 gray">
								{format(
									node.requestDate,
									"MMM D, YYYY, H:MM A"
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderNotes() {
		const { node } = this.props;
		if (!node || !node.notes) return null;
		return (
			<div className="pv3">
				<span className="db gray">{node.notes}</span>
			</div>
		);
	}

	renderDevices() {
		const { node } = this.props;
		if (!node) return null;
		const { devices = [] } = node;
		return (
			<div className="w-100 mv3 bg-white br2 shadow">
				<div className="pa3 flex items-center justify-between bb b--light-gray pv3">
					<h2 className="f5 fw5 mv0">Sectors</h2>
					<button className="pa2 f6 fw5 shadow ba b--light-gray br2 bg-white pointer dark-gray">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
							<span className="ml2">Add sector</span>
						</div>
					</button>
				</div>
				{devices.map(device => (
					<div className="bb b--light-gray pa3 flex items-center pointer">
						<div className="w-30">
							<span className="db fw5 mb1">
								{device.device || "Device"}
							</span>
							<span className="db gray f7">
								{device.width}°
								{device.width !== 360
									? ` ${getCardinal(device.azimuth)}`
									: null}
								{", "}
								{device.radius}{" "}
								{device.radius === 1 ? "Mile" : "Miles"}
							</span>
						</div>
						<div className="w-20 flex">
							<Status status={device.status} />
						</div>
						<span className="f6">10.70.165.131</span>
					</div>
				))}
				{devices.length ? null : (
					<div className="tc pv3">
						<span className="gray f6 db">No devices</span>
					</div>
				)}
			</div>
		);
	}

	renderLinks() {
		const { node } = this.props;
		if (!node) return null;
		const { links = [] } = node;
		return (
			<div className="w-100 mv3 bg-white shadow br2">
				<div className="pa3 flex items-center justify-between bb b--light-gray pv3">
					<h2 className="f5 fw5 mv0 db">Links</h2>
					<button className="pa2 f6 fw5 shadow ba b--light-gray br2 bg-white pointer dark-gray">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
							<span className="ml2">Add link</span>
						</div>
					</button>
				</div>
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
								<div className="bb b--light-gray pv3 pl2 pr3 black">
									<NodeName node={otherNode} />
								</div>
							</Link>
						);
					})}
				{links.filter(link => link.status === "active")
					.length ? null : (
					<div className="tc pv3">
						<span className="gray f6 db">No links</span>
					</div>
				)}
			</div>
		);
	}

	renderPhotos() {
		const { node, match } = this.props;
		if (!node) return null;
		const { panoramas = [] } = node;
		return (
			<div className="mv3 bg-white br2 shadow">
				<div className="pa3 flex items-center justify-between bb b--light-gray pv3">
					<h2 className="f5 fw5 mv0">Photos</h2>
					<button className="pa2 f6 fw5 shadow ba b--light-gray br2 bg-white pointer dark-gray">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
							<span className="ml2">Add photo</span>
						</div>
					</button>
				</div>
				{node.panoramas && node.panoramas.length ? (
					<div className="flex mhn1 pa3">
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
				) : (
					<div className="tc pv3">
						<span className="gray f6 db">No photos</span>
					</div>
				)}
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
