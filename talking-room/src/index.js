import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';
import Login from './pages/login.js';
import registerServiceWorker from './registerServiceWorker';



class App extends Component {
  render() {
    return (
    	<Switch>
    		<Route path='/index' component={Login} />
      		<Redirect to="/index" />
     	</Switch>
    );
  }
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
