import React, { PureComponent } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginGate from "./components/LoginGate";
import Nav from "./components/Nav";
import NodeList from "./components/NodeList";
import NodeMap from "./components/NodeMap";
import Node from "./components/Node";

import rootReducer from "./reducers";
const persistConfig = { key: "root", storage, blacklist: ["nodes"] };
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
							<div className="sans-serif">
								<Route path="/" component={Nav} />
								<div className="flex">
									<Route
										exact
										path="/"
										component={NodeList}
									/>
									<Route path="/" component={NodeMap} />
									<Route path="/node/:id" component={Node} />
								</div>
							</div>
						</Router>
					</LoginGate>
				</PersistGate>
			</Provider>
		);
	}
}
