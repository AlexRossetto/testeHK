import React, { useState, useEffect } from 'react';
import './styles.css'
import  { FaTrashAlt, FaPen } from "react-icons/fa";
import Modal from '../../components/Modal';
import Button from '../../components/Button';

export default function List() {

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState([]);
  const [destroyUser, setDestroyUser] = useState()
  const [openEdit, setOpenEdit] = useState(false);
  const [openDestroy, setOpenDestroy] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("users") !== null) {
      setUsers(JSON.parse(localStorage.getItem("users")))
    }
  }, [])

  function openModalDestroy(id){
    const [ currentUser ] = JSON.parse(localStorage.getItem("users")).filter(user => user.id == id)
    setDestroyUser(currentUser.id)
    setOpenDestroy(true)
  }

  function destroy(id) {
    const deletedUsers = users.filter(user => user.id !== id)
    setUsers(deletedUsers);
    localStorage.setItem("users", JSON.stringify(deletedUsers))
  }

  function openModalEdit(id){
    const [ currentUser ] = JSON.parse(localStorage.getItem("users")).filter(user => user.id == id)
    setEditUser(currentUser)
    setOpenEdit(true)
  }

  function edit(newUser){
    const editedUsers = JSON.parse(localStorage.getItem("users")).map(user => newUser.id === user.id ? newUser : user)
    setUsers(editedUsers);
    localStorage.setItem("users", JSON.stringify(editedUsers))
    setOpenEdit(false)
  }  

  return(
    <div className="flex-container">
        <section>
          <h2>Lista de usuários</h2>
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>E-mail</td>
                <td>Telefone</td>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>  
                  <td>{user.nome}</td>      
                  <td>{user.email}</td>      
                  <td>{user.phone}</td>  
                  <td><button onClick={() => openModalDestroy(user.id)} className="btn-delete"><FaTrashAlt /></button> </td>   
                  <td><button onClick={() => openModalEdit(user.id)} className="btn-edit"><FaPen /></button> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {openEdit && <EditUserModal toggleModal={() => setOpenEdit(!openEdit)} user={editUser} edit={edit} />}
        {openDestroy && <DestroyUserModal toggleModal={() => setOpenDestroy(!openDestroy)} id={destroyUser} destroy={destroy} />} 
    </div>
  )
}


const EditUserModal = ({ toggleModal, user, edit }) => {
  const [newUser, setNewUser] = React.useState(user)

  return(
      <Modal title="Editar usuário" closeModal={toggleModal}> 
        <form onSubmit={(e) => e.preventDefault()} action="#" className=" form edit-form">
            <div className="form-group">
              <label htmlFor="name">*Name :</label>
              <input onChange={e => setNewUser({...newUser,
              nome: e.target.value})} name="username" value={newUser.nome} />
            </div>
            <div className="form-group">
              <label>*E-mail :</label>
              <input onChange={e => setNewUser({...newUser,
              email: e.target.value})} name="email" type="email" value={newUser.email} />
            </div>
            <div className="form-group">
              <label htmlFor="contact">*Telefone Celular :</label>
              <input onChange={e => setNewUser({...newUser,
              phone: e.target.value})} name="contact" type="text" value={newUser.phone} />
            </div> 
            <Button action={() => edit(newUser)}>Editar</Button>
          </form>
      </Modal>
  )
}

const DestroyUserModal = ({ toggleModal, id, destroy }) => {
  return (
    <Modal title="Deseja deletar o usuário?" closeModal={toggleModal} subtitle="Após a deleção esses dados não poderão ser recuperados">
      <div className="buttons">
        <Button color="red" action={() => { 
          destroy(id) 
          toggleModal()
        }}>Sim</Button>
        <Button action={() => toggleModal()}>Não</Button>
      </div>
    </Modal>
  )
}