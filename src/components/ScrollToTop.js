import { PureComponent } from "react";
import { withRouter } from "react-router";

class ScrollToTop extends PureComponent {
	componentDidUpdate(prevProps) {
		const searchPage = this.props.location.pathname.indexOf("/s/") === 0;
		if (searchPage) return;
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
