import { connect } from "react-redux";
import PureComponent from "./component";
import { fetchNode } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
	node: state.nodesById[ownProps.match.params.id] || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchNode: node => fetchNode(node, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PureComponent);
