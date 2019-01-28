import React, { PureComponent, Fragment } from "react";
import { Marker } from "react-google-maps";
import Sector from "./Sector";

class NodeMarker extends PureComponent {
	render() {
		const { node, visible, onClick } = this.props;
		const { id, notes, coordinates } = node;
		const [lng, lat] = coordinates;
		const title = `${id}${notes ? ` - ${notes}` : ""}`;
		const { icon, zIndex } = this.getMarkerProps();
		const adjustedZ = this.getZIndex(zIndex);
		const opacity = this.getOpacity();
		return (
			<Fragment>
				<Marker
					defaultPosition={{ lat, lng }}
					defaultIcon={icon}
					defaultTitle={title}
					options={{ opacity }}
					visible={visible}
					zIndex={adjustedZ}
					onClick={onClick}
				/>
				{this.renderSectors()}
			</Fragment>
		);
	}

	renderSectors() {
		const { node, visible, visibility, filters } = this.props;
		const { devices } = node;

		if (!devices || !visible) {
			return null;
		}

		return devices.map((sector, index) => {
			const isFiltered =
				sector.status === "potential" &&
				filters[sector.status] === false;
			if (isFiltered && visibility !== "highlight") {
				return null;
			}
			const key = `${node.id}-${index}`;
			return (
				<Sector
					key={key}
					sector={sector}
					visibility={visibility}
					node={node}
				/>
			);
		});
	}

	getOpacity() {
		const { visibility } = this.props;
		if (visibility === "highlight") return 1;
		if (visibility === "secondary") return 1;
		if (visibility === "dim") return 0.25;
		return 1;
	}

	getZIndex(defaultZIndex) {
		const { visibility } = this.props;
		if (visibility === "highlight") return defaultZIndex + 999;
		if (visibility === "secondary") return defaultZIndex + 998;
		return defaultZIndex;
	}

	getMarkerProps() {
		const { node } = this.props;
		const { type } = node;

		if (type === "supernode")
			return {
				icon: {
					url: "/img/map/supernode.svg",
					anchor: { x: 14, y: 14 }
				},
				zIndex: 100
			};

		if (type === "hub")
			return {
				icon: {
					url: "/img/map/hub.svg",
					anchor: { x: 10, y: 10 }
				},
				zIndex: 99
			};

		if (type === "active")
			return {
				icon: {
					url: "/img/map/active.svg",
					anchor: { x: 7, y: 7 }
				},
				zIndex: 98
			};

		if (type === "potential-supernode")
			return {
				icon: {
					url: "/img/map/potential-supernode.svg",
					anchor: { x: 14, y: 14 }
				},
				zIndex: 89
			};

		if (type === "potential-hub")
			return {
				icon: {
					url: "/img/map/potential-hub.svg",
					anchor: { x: 10, y: 10 }
				},
				zIndex: 88
			};

		if (type === "potential")
			return {
				icon: {
					url: "/img/map/potential.svg",
					anchor: { x: 7, y: 7 }
				},
				zIndex: 87
			};

		return {
			icon: {
				url: "/img/map/dead.svg",
				anchor: { x: 5, y: 5 }
			},
			zIndex: 86
		};
	}
}

export default class VisibilityMarker extends PureComponent {
	state = {
		visibility: "default"
	};

	render() {
		return (
			<NodeMarker {...this.props} visibility={this.state.visibility} />
		);
	}

	setVisibility(visibility) {
		this.setState({ visibility });
	}
}
