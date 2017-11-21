import React, { Component } from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimelineApi from '../logicas/TimelineApi';

export default class Timeline extends Component {

    constructor(props){
        super(props);
        this.state = {fotos: []};
        this.login = props.login;
    }

    componentWillMount(){
        this.props.store.subscribe(() => {
            this.setState({fotos: this.props.store.getState()});
        });
    }

    componentDidMount(){
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    carregaFotos(){
        let urlPerfil = this.login === undefined ?
            `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}` :
            `http://localhost:8080/api/public/fotos/${this.login}`;

        this.props.store.dispatch(TimelineApi.lista(urlPerfil));
    }

    like(fotoId){
        this.props.store.dispatch(TimelineApi.like(fotoId));
        //this.props.store.like(fotoId);
    }

    comenta(fotoId, comentario){
        this.props.store.dispatch(TimelineApi.comenta(fotoId,comentario));
        //this.props.store.comenta(fotoId,comentario);
    }

    render(){
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    {
                        this.state.fotos.map(foto => (<FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)}/>))
                    }

                </ReactCSSTransitionGroup>
            </div>
        );
    }
}