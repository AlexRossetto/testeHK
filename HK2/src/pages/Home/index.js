import React, { useState, useEffect } from 'react';
import './styles.css'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [user, setUser] = useState({})
  const [button, setButton] = useState(true);
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (user.nome && user.email && user.phone && isAllowed) {
      if(user.phone.length == 11 && !isNaN(user.phone)) {
        setButton(false)
      } else {
        setButton(true)
      }
    } else {
      setButton(true);
    }
  }, [user])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("users")) && JSON.parse(localStorage.getItem("users")).length == 5) {
      setIsAllowed(false);
    }
  }, [])

  async function handleSubmit(e) {
    let stored = [];
    let users = [];

    if (!localStorage.getItem("users")) {
      user.id = uuidv4();
      stored.push(user)
      return localStorage.setItem("users", JSON.stringify(stored))
    } else {
      users.push(localStorage.getItem("users"))
      stored = JSON.parse(users)
      if (stored.length < 5) {
        user.id = uuidv4();
        stored.push(user);
        return localStorage.setItem("users", JSON.stringify(stored))
      }
    }
  }

  return (
    <div className="flex-container">
      <section>
        <h2 className="form-title">Cadastro</h2>
        <form onSubmit={handleSubmit} action="#" className="form">
          <div className="form-group">
            <label htmlFor="name">*Nome :</label>
            <input onChange={e => setUser({
              ...user,
              nome: e.target.value
            })} name="username" />
          </div>
          <div className="form-group">
            <label>*E-mail :</label>
            <input onChange={e => setUser({
              ...user,
              email: e.target.value
            })} name="email" type="email" />
          </div>
          <div className="form-group">
            <label htmlFor="contact">*Telefone Celular (com DDD) :</label>
            <input minLength="11" maxLength="11" onChange={e =>setUser({
              ...user,
              phone: e.target.value
            })} name="contact" type="text" />
          </div>
          <div class="form-footer">
            <button disabled={button} type="submit" className="btn-home">Salvar</button>
            {!isAllowed ? (
              <span className="warning">* Já existem 5 registros em localStorage</span>
            ) : (
              <></>
            )}

          </div>
        </form>
      </section>
    </div>
  )
}