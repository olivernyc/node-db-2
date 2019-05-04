import { connect } from "react-redux";
import PureMapView from "./component";
import { fetchData } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
	nodes: Object.values(state.nodes),
	nodesById: state.nodes,
	links: state.links,
	kiosks: state.kiosks,
	filters: state.filters.filters,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchData: () => fetchData(dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PureMapView);
