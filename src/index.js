import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/login.css';
import './css/reset.css';
import './css/timeline.css';
import App from './App';
import Login from './componentes/Login'
import Logout from './componentes/Logout'
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory} from 'react-router';

function verificaAutenticacao(nextState, replace) {
    if (localStorage.getItem('auth-token') === null && nextState.params.login === undefined){
        replace('/?msg=você precisa estar logado para acessar o endereço');
    }
}

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Login}/>
            <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao}/>
            <Route path="/logout" component={Logout} />
        </Router>
    )
    , document.getElementById('root'));
registerServiceWorker();
