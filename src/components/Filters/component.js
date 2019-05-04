import React, { PureComponent } from "react";

import { icons } from "../NodeName";
import { statusColors } from "../../utils";

// This should be defined elsewhere
const labels = ["active", "supernode", "hub", "potential"];
const displayLabels = { active: "node" };

export default class Filters extends PureComponent {
	render() {
		const { showFilters } = this.props;
		if (!showFilters) return null;
		return (
			<div className="">
				<div role="group" className="dib pa2">
					<div>{labels.map(label => this.renderFilter(label))}</div>
				</div>
			</div>
		);
	}

	renderFilter(label) {
		const { filters, statusCounts, toggleFilter } = this.props;
		const enabled = filters[label] || filters[label] === undefined;
		const opacity = enabled ? "o-100" : "o-50 strike";
		const sanitizedLabel = label.replace("-", " ");
		const labelName = displayLabels[sanitizedLabel] || sanitizedLabel;
		return (
			<div
				key={label}
				className={`pointer flex items-center justify-between ${opacity}`}
				onClick={() => toggleFilter(label)}
			>
				<label
					htmlFor={label}
					style={{ color: statusColors[label] }}
					className="ttc pointer flex items-center nowrap"
				>
					<div
						className="h2 w2 flex items-center justify-center"
					>
						{icons[label]}
					</div>
					<span className="ml1">
						{labelName} ({statusCounts[label] || 0})
					</span>
				</label>
				<input
					type="checkbox"
					name={label}
					defaultChecked={enabled}
					className="ma0 ml2 dn"
				/>
			</div>
		);
	}
}
