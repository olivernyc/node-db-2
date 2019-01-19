import { connect } from "react-redux";
import PureComponent from "./component";
import { fetchNodes } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
	nodes: state.nodes
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchNodes: () => fetchNodes(dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PureComponent);
