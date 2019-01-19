import { connect } from "react-redux";
import PureComponent from "./component";

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PureComponent);
