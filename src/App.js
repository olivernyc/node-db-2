import React, { PureComponent } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginGate from "./components/LoginGate";
import Alert from "./components/Alert";
import Nav from "./components/Nav";
import NodeList from "./components/NodeList";
import NodeMap from "./components/NodeMap";
import Node from "./components/Node";
import Gallery from "./components/Gallery";
import ScrollToTop from "./components/ScrollToTop";

import rootReducer from "./reducers";
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<LoginGate>
						<Router>
							<ScrollToTop>
								<div className="sans-serif">
									<Alert />
									<Route path="/" component={Nav} />
									<div className="flex">
										<Route
											exact
											path="/"
											component={NodeList}
										/>
										<Route
											path="/node/:nodeId"
											children={({ match }) => (
												<NodeMap match={match} />
											)}
										/>
										<Route
											path="/node/:nodeId"
											component={Node}
										/>
									</div>
									<Route
										path="/node/:nodeId/panoramas/:panoId"
										component={Gallery}
									/>
								</div>
							</ScrollToTop>
						</Router>
					</LoginGate>
				</PersistGate>
			</Provider>
		);
	}
}
