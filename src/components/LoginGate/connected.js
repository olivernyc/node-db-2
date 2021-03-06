import { connect } from "react-redux";
import PureComponent from "./component";
import { setToken } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
	token: state.auth.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setToken: token => setToken(token, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PureComponent);
