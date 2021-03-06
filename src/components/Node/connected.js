import { connect } from "react-redux";
import PureComponent from "./component";

const mapStateToProps = (state, ownProps) => ({
	node: state.nodes[ownProps.match.params.nodeId]
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PureComponent);
