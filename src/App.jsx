import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import validaEmail from "./../utils/validaEmail.js";

function App() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgErrorEmail, setMsgErrorEmail] = useState();
  const [msgDeErrorPassword, setMsgDeErrorPassword] = useState();
  const [msgDeErrorCodigo, setMsgErrorCodigo] = useState();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [step, setStep] = useState(0);

  const onSubmitEmail = async () => {
    if (email === "") {
      return setMsgErrorEmail("Campo email obrigatório");
    }
    if (validaEmail(email) === false) {
      return setMsgErrorEmail("Email invalido");
    }

    setBtnDisabled(true);

    let response = await axios.post(
      `https://api.criatools.com.br/change_password`,
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.msg === "Email não cadastrado") {
      setMsgErrorEmail("Email não cadastrado");
      setBtnDisabled(false);
    } else if (response.data.msg === "email enviado") {
      setStep(step + 1);
    }

    //Envia código para o email caso ele exista no banco de dados
  };

  const onSubmitPassword = async () => {
    if (password != confirmPassword) {
      return setMsgDeErrorPassword("As senhas não são iguais");
    }
    try {
      let response = await axios.post(
        `https://api.criatools.com.br/confirm_code_change_password`,
        {
          email: email,
          codigo: codigo,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setMsgDeErrorPassword("Ocorreu algum erro por favor tente novamente");
    }
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
              <button
                className="button"
                onClick={onSubmitEmail}
                disabled={btnDisabled}
              >
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
                  onChange={(ev) => {
                    setCodigo(ev.target.value);
                  }}
                />
                {msgDeErrorCodigo && (
                  <>
                    <p>{msgDeErrorCodigo}</p>
                  </>
                )}
              </div>
              <button
                className="button"
                onClick={() => {
                  if (codigo === "") {
                    return setMsgErrorCodigo("Campo código obrigatório");
                  }
                  setStep(step + 1);
                }}
              >
                Confirmar código
              </button>
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
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                  }}
                />
                <input
                  type="password"
                  name="confirmsenha"
                  id="confirmsenha"
                  placeholder="Confirme sua senha"
                  onChange={(ev) => {
                    setConfirmPassword(ev.target.value);
                  }}
                />
                {msgDeErrorPassword && (
                  <>
                    <p>{msgDeErrorPassword}</p>
                  </>
                )}
              </div>
              <button className="button" onClick={onSubmitPassword}>
                Alterar senha
              </button>
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
