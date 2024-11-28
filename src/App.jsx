import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import validaEmail from "./../utils/validaEmail.js";

function App() {
  const [email, setEmail] = useState("");
  const [msgErrorEmail, setMsgErrorEmail] = useState();
  const [step, setStep] = useState(0);

  const onSubmitEmail = () => {
    if (email === "") {
      return setMsgErrorEmail("Campo email obrigatório");
    }
    if (validaEmail(email) === false) {
      return setMsgErrorEmail("Email invalido");
    }
    //Envia código para o email caso ele exista no banco de dados
    setStep(step + 1);
  };
  return (
    <>
      <div className="container-change-password">
        <img src="https://checkout.criatools.com.br/logo.png" alt="" />
        {step === 0 && (
          <>
            <div className="box-change-password">
              <div className="container-input">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Digite seu email"
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                  }}
                />
                {msgErrorEmail && (
                  <>
                    <p>{msgErrorEmail}</p>
                  </>
                )}
              </div>
              <button className="button" onClick={onSubmitEmail}>
                Alterar senha
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="box-change-password">
              <div className="container-input">
                <input
                  type="text"
                  name="codigo"
                  id="codigo"
                  placeholder="Digite o código que enviamos por email"
                />
              </div>
              <button className="button">Confirmar código</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="box-change-password">
              <div className="container-input">
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Digite sua senha"
                />
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Confirme sua senha"
                />
              </div>
              <button className="button">Alterar senha</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="box-change-password">
              <div className="container-input">
                <img src="./success.png" alt="" srcSet="" />
                <h2>Senha alterada com sucesso</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
