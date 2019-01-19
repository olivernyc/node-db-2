import React, { PureComponent } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginGate from "./components/LoginGate";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

import rootReducer from "./reducers";
// const persistConfig = { key: "root", storage };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer);
// const persistor = persistStore(store);

export default class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="sans-serif">
						<LoginGate>
							<div className="ph3">
								<div className="mw9 center">
									<Nav />
									<Dashboard />
								</div>
							</div>
						</LoginGate>
					</div>
				</Router>
			</Provider>
		);
	}
}
