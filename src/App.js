import React from 'react';
import './App.css';
import './style.css';
import logo1 from './img/logo.svg';
import logo2 from './img/logo2.svg';
import loadGif from './img/loading.gif';
import menu from './img/menu.png';
import iconBanner from './img/iconBanner.png';
import playButton from './img/playButton.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// No projeto tem o método isLogado() que eu estava usando para verificar se o token está no localStorage
// assim iria manter o login do usuário mesmo com a página atualizada.

// Porém por algum motivo, nesse método eu não estava conseguindo acessar nada, nem os states, nem nada. Só dava erro
// então não implementei essa função.

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            email: "",
            campoEmail: "",
            campoSenha: "",
            campoId: "",
            foto: "",
            msgErro: "",
            color: "",
            logado: false,
            displayErro: "none",
            msgLoad: "none",
            dadosUser: "none",
            right: "none",
            btnCadastro: "inline-block",
            doisBr: "inline-block",
            btnSair: "none",
            btnLogar: "inline-block"
        }
    }

    logar(){

        this.setState({
            email: "",
            senha: "",
            btnCadastro: "none",
            doisBr: "none",
            right: "inline-block",
            logado: true,
            btnSair: "inline-block",
            btnLogar: "none"
        })

    }

    sair(){

        localStorage.removeItem("token");

        this.setState({
            logado: false,
            right: "none",
            btnSair: "none",
            btnLogar: "inline-block"
        })

    }

    isLogado = () =>{

        let token = "QpwL5tke4Pnpja7X4"

        if(localStorage.getItem("token") === token){
            this.logar();
            console.log("Logado automaticamente!")
        }

        else{
            console.log("Não foi logado automaticamente!")
        }
    }

    loginRequest() {
        this.setState({
            displayErro: "inline-block"
        })

        const axios = require('axios');

        let email = this.state.campoEmail;
        let senha = this.state.campoSenha;

        if(email === "" || senha === ""){
            this.setState({
                msgErro: "Campos vazios!",
                color: "red"
            })
        }

        else{

            axios.post('https://reqres.in/api/login', {
                email: email,
                password: senha
            }).then(((response) => {

                if (response.status === 200) {
                    this.setState({
                        msgErro: "Login com sucesso!",
                        color: "green",
                        logado: true
                    });

                    console.log(response.status);
                    console.log("Logado!");
                    this.setLocalStorage(response.data.token);

                    this.logar();

                }

            })).catch((error) => {
                console.log(error);
                console.log("Erro no login");

                this.setState({
                    msgErro: "Erro no login!",
                    color: "red"
                });
            });

        }

    }

    cadastroRequest() {

        this.setState({
            displayErro: "inline-block"
        })

        const axios = require('axios');

        let email = this.state.campoEmail;
        let senha = this.state.campoSenha;

        if(email === "" || senha === ""){
            this.setState({
                msgErro: "Campos vazios!",
                color: "red"
            })
        }

        else if(email.length < 3 || senha.length < 3){
            this.setState({
                msgErro: "Os campos devem ter no mínimo 3 caracteres",
                color: "red"
            })
        }

        else{

            axios.post('https://reqres.in/api/register', {
                email: email,
                password: senha
            }).then(((response) => {

                if (response.status === 200) {
                    this.setState({
                        msgErro: "Cadastro com sucesso!",
                        color: "green",
                    });

                    console.log(response.status);
                    console.log("Sucesso no cadastro!");
                }

            })).catch((error) => {
                console.log("Erro no cadastro");

                this.setState({
                    msgErro: "Erro no cadastro!",
                    color: "red"
                });
            });

        }

    }

    setLocalStorage(token) {
        localStorage.setItem("token", token);
    };

    jogoRequest() {

        this.setState({
            msgLoad: "inline-block",
            dadosUser: "none"
        });

        const axios = require('axios');

        var id = this.state.campoId;

        axios.get('https://xivapi.com/character/' + id)
            .then(((response) => {

                var usuario = response.data.Character.Name;
                var fotinha = response.data.Character.Portrait;

                this.setState({
                    user: usuario,
                    foto: fotinha
                })

                this.setState({
                    msgLoad: "none",
                    dadosUser: "inline-block"
                });
     

            }));
    };

    changeEmail = (event) =>{
        this.setState({
            campoEmail: event.target.value
        })
    }

    changeSenha = (event) =>{
        this.setState({
            campoSenha: event.target.value
        })
    }

    changeId = (event) =>{
        this.setState({
            campoId: event.target.value
        })
    }

    pesquisarChar() {

        this.jogoRequest();
    }

    render() {
        return (
            <div className="wrapper" resize={this.resize} onLoad={this.isLogado}>
                <header>
                    <div id="contentHeader">
                        <div className="imgsLogo">
                            <img id="logo1" src={logo1} alt="logo" />
                            <img id="logo2" src={logo2} alt="logo2" />
                        </div>

                        <nav className="navMain">
                            <ul>
                                <li className="itemBar">
                                    <a href="/#">Documentation</a>
                                </li>

                                <li className="itemBar">
                                    <a href="/#">Forge</a>
                                </li>

                                <li className="itemBar">
                                    <a href="/#">Ecosystem</a>

                                </li>

                                <li className="itemBar">
                                    <a href="/#">News</a>
                                </li>

                                <li className="itemBar">
                                    <a href="/#">Partners</a>
                                </li>

                            </ul>
                        </nav>

                        <br /><br /><br />


                    </div>

                    <div id="botoes2" style={{textAlign: "center"}}>
                        <div style={{ textAlign: "center", display: this.state.btnLogar }}>
                            <Popup trigger={<button id="btnEntrar"><strong>Entrar</strong></button>} modal position="right center">
                                <div id="loginBox">

                                    <span>Email</span><br />
                                    <input id="user" type="email" disabled={this.state.logado} onChange={this.changeEmail}
                                    style={{width: "75%"}}/><br /><br />

                                    <span>Senha</span><br />

                                    <input id="senha" type="password" disabled={this.state.logado} onChange={this.changeSenha} 
                                    style={{width: "75%"}}
                                    /><br /><br />

                                    <button id="btnCadastro"
                                        disabled={this.state.logado}
                                        onClick={this.cadastroRequest.bind(this)}
                                        style= {{display: this.state.btnCadastro, width: "75%", marginBottom: "10px"}}
                                        ><strong>Cadastrar</strong>
                                            </button>

                                    <span id="doisBr" style={{display: this.state.doisBr}}><br /><br /></span>

                                    <button id="btnLogin"
                                        disabled={this.state.logado}
                                        onClick={this.loginRequest.bind(this)}
                                        style={{width: "75%"}}><strong>Entrar</strong>
                                            </button>

                                    <div id="msgErro"><p style={{
                                        display: this.state.displayErro,
                                        textAlign: "center",
                                        border: "1px solid black",
                                        borderRadius: 7 + "px",
                                        paddingRight: 25 + "px",
                                        paddingLeft: 25 + "px",
                                        paddingTop: 5 + "px",
                                        paddingBottom: 5 + "px",
                                        backgroundColor: this.state.color,
                                        color: "white"
                                    }
                                    }>{this.state.msgErro}</p></div>

                                    <p>Dados para teste</p>
                                    <p>Email: eve.holt@reqres.in</p>
                                    <p>Senha: cityslicka</p>

                                </div>
                            </Popup>

                        </div> 

                        <br/>

                        <div style={{textAlign: "center"}}>
                            <button id="btnEntrar"
                                        style={{display: this.state.btnSair, marginLeft: "10px"}}
                                        onClick={this.sair.bind(this)}
                                        ><strong>Sair</strong>
                                            </button>
                        </div>

                    </div>

                    <div id="hiddenMenu">
                        <img id="menuIcon" style={{ width: 40 + 'px' }} src={menu} alt="menunIcon" />

                        <ul>
                            <li className="itemBar">
                                <a href="/#">Documentation</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">Forge</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">Ecosystem</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">News</a>
                            </li>

                            <hr />

                            <li className="itemBar">
                                <a href="/#">Partners</a>
                            </li>

                            <hr />

                        </ul>
                    </div>

                </header>

                <div id="banner">

                    <img src={iconBanner} alt="iconBanner" />

                    <div>
                        <span>Laravel Vapor is now Available! Sign up today! -></span>
                    </div>

                </div>

                <div id="corpo">

                    <div id="left">

                        <div id="bigBox">

                            <div id="content">
                                <h1>The PHP Framework for Web Artisans</h1>

                                <p>Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.</p>

                                <div id="botoes">
                                    <div id="vermelho">
                                        <span>Documentation</span>
                                    </div>

                                    <div id="branco">
                                        <div id="contentButton">
                                            <img style={{ height: 25 + "px" }} src={playButton} alt="playButton" />
                                            <span style={{ position: "relative", bottom: 7 + "px", marginLeft: 5 + "px", textAlign: "center" }}>Watch Laracasts</span>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div id="right" style={{display: this.state.right}}>
                        <div>
                            <span><strong>ID: </strong></span>
                            <input id="inputId" onChange={this.changeId}/>
                            <button id="btnPesquisar" onClick={this.pesquisarChar.bind(this)}>Pesquisar</button><br />
                            <p style={{textAlign: "center"}}>ID para exemplo: 31614784</p>
                            <div id="msgLoad" style={{display: this.state.msgLoad}}>
                                <p><strong>Carregando...</strong></p>
                                <img src={loadGif} alt="loading"/>
                                </div>
                            <div id="dadosUser" style={{display: this.state.dadosUser}}>
                                    <div><strong>Usuário: </strong>{this.state.user}</div><br />
                                    <div><img id="fotoChar" src={this.state.foto} alt="foto do char" /></div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }
}
export default App;