import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";

export default class Gallery extends PureComponent {
	static contextTypes = {
		router: PropTypes.object
	};

	componentDidMount() {
		this.keyDownHandler = this.handleKeyDown.bind(this);
		window.addEventListener("keydown", this.keyDownHandler, true);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.keyDownHandler, true);
	}

	handleKeyDown(event) {
		const { keyCode } = event;
		const { node, match } = this.props;
		if (!node) return;
		const { panoramas } = node;
		const { nodeId, panoId } = match.params;
		const { history } = this.context.router;
		const panoIdInt = parseInt(panoId);
		if (keyCode === 27) {
			history.push(`/node/${nodeId}`);
			event.stopPropagation();
		} else if (keyCode === 39) {
			const nextPanoId = panoIdInt < panoramas.length ? panoIdInt + 1 : 1;
			history.push(`/node/${nodeId}/panoramas/${nextPanoId}`);
		} else if (keyCode === 37) {
			const prevPanoId = panoId > 1 ? panoIdInt - 1 : panoramas.length;
			history.push(`/node/${nodeId}/panoramas/${prevPanoId}`);
		}
	}

	render() {
		const { node, match } = this.props;
		const { nodeId, panoId } = match.params;
		if (!node) return null;
		const { panoramas } = node;
		console.log(panoramas);
		if (!panoramas) return null;
		const src = panoramas[panoId - 1];
		console.log(src);

		return (
			<DocumentTitle
				title={`Panorama ${panoId} - Node ${nodeId} - NYC Mesh`}
			>
				<div className="fixed absolute--fill bg-black flex flex-column items-center justify-center z-max">
					<Link to=".." className="absolute top-0 left-0 ma3 white">
						<svg
							className="db ma0"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</Link>

					<img
						onClick={() =>
							window
								.open(
									`https://node-db.netlify.com/panoramas/${src}`,
									"_blank"
								)
								.focus()
						}
						className="db center mh-100 mw-100 zoom-in"
						src={`https://node-db.netlify.com/panoramas/${src}`}
						alt="Panorama"
					/>
					{this.renderPreviews()}
				</div>
			</DocumentTitle>
		);
	}

	renderPreviews() {
		const { node, match } = this.props;
		const { panoramas } = node;
		if (!panoramas || !panoramas.length) {
			return null;
		}
		const { nodeId, panoId } = match.params;
		return (
			<div className="absolute bottom-0 right-0 left-0 flex ph1 pv2 overflow-x-scroll">
				{panoramas.map((panorama, index) => (
					<Link
						key={index}
						to={`/node/${nodeId}/panoramas/${index + 1}`}
					>
						<div
							className={`h3 w4 mh1 cover ba bw1 b--white ${
								index === panoId - 1 ? "" : "o-30"
							}`}
							style={{
								backgroundImage: `url("https://node-db.netlify.com/panoramas/${panorama}")`
							}}
						/>
					</Link>
				))}
			</div>
		);
	}
}
