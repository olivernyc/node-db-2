import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Nav extends PureComponent {
	render() {
		return (
			<div style={{ height: "68px" }}>
				<div className="fixed bg-near-white w-100 ph3">
					<div className="flex items-center pv3">
						<Link
							to="/"
							className="flex items-center link near-black"
						>
							<svg
								className="h2 w2"
								viewBox="0 0 128 128"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g>
									<path
										id="svg_2"
										d="m60.96,0l5.52,0c14.98,0.66 29.71,6.57 40.72,16.79c12.46,11.23 19.94,27.53 20.8,44.24l0,5.49c-0.72,17.12 -8.47,33.83 -21.34,45.17c-10.96,9.96 -25.49,15.67 -40.24,16.31l-5.7,0c-14.21,-0.91 -28.19,-6.33 -38.86,-15.85c-13.2,-11.39 -21.2,-28.37 -21.86,-45.77l0,-5.64c0.96,-16.62 8.42,-32.8 20.82,-43.97c10.87,-10.1 25.37,-15.94 40.14,-16.77z"
										fill="rgb(255,204,0)"
									/>
									<path
										id="svg_4"
										d="m57.68,23.75c5.46,-3.86 14.14,-1.11 16.09,5.37c1.16,2.94 0.4,6.08 -0.61,8.93c6.62,8.4 13.18,16.85 19.88,25.19c-2.31,1.29 -4.47,2.85 -6.25,4.82c-7.04,-7.95 -13.26,-16.63 -19.93,-24.91c-3.83,0.34 -8.16,-0.05 -10.88,-3.11c-4.62,-4.43 -3.75,-12.91 1.7,-16.29z"
										fill="#111"
									/>
									<path
										id="svg_5"
										d="m28.79,70.15c6.65,-8.51 13.39,-16.95 20.11,-25.4c1.85,1.99 4.06,3.6 6.35,5.05c-6.66,8.32 -13.22,16.72 -19.85,25.06c3.06,5.34 1.14,13.13 -4.84,15.44c-6.49,3.26 -15.18,-2 -15.09,-9.3c-0.63,-6.94 6.74,-12.54 13.32,-10.85z"
										fill="#111"
									/>
									<path
										id="svg_8"
										d="m96.61,70.62c6.16,-3.23 14.66,1.33 15.15,8.31c0.78,4.93 -2.49,9.9 -7.17,11.42c-3.33,0.71 -6.94,0.45 -9.87,-1.4c-16.28,8.84 -36.28,10.13 -53.66,3.86c1.54,-2.28 2.81,-4.74 3.77,-7.32c14.78,5.5 31.76,3.91 45.67,-3.34c-0.62,-4.66 1.67,-9.65 6.11,-11.53z"
										fill="#111"
									/>
								</g>
							</svg>
							<span className="f5 fw6 ml2 nowrap">NYC Mesh</span>
						</Link>
						<div className="ml4 shadow bg-white br2 ba b--light-gray overflow-hidden flex items-center w-100 mw6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="gray ml2"
							>
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
							<input
								className="bn pa2 w-100"
								style={{ outline: "none" }}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
