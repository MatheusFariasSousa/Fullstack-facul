import React from 'react';
import './Users.css';
import {

    Modal,Box
  } from '@mui/material';
import { useState } from 'react';

    
    
    

    




    function UsersList() {
        
    const boxStyle = {
    backgroundColor: 'white',
    padding: '10px',
    margin: '15% auto',
    width: '400px',
    };
      const [open, setOpen] = useState(false);
      const [users, setUsers] = React.useState([]);
     

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      const [formData, setFormData] = React.useState({
        id:"",
        name: "",
        email: "",
        password: "",
      });
            

      
      React.useEffect(() => {
        fetch("http://localhost:8000/front/users-page")  
          .then(response => {
            if (!response.ok) {
              throw new Error("Erro na resposta do servidor");
            }
            return response.json();
          })
          .then(data => setUsers(data))
          .catch(err => console.error("Erro ao buscar usuários:", err));
      }, []);

      const handleEdit = (user) => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        })
        handleOpen();
        setFormData({
          id:user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };



      
        
    const handleSubmit = async (e) => {
    e.preventDefault();

  const aformData = new FormData();
  aformData.append('id', formData.id);
  aformData.append('name', formData.name);
  aformData.append('email', formData.email);
  aformData.append('password', formData.password);

  try {
    const response = await fetch('http://localhost:8000/front/put-user', {
      method: 'POST',
      body: aformData,
    });

    if (response.redirected) {
      window.location.href = 'http://localhost:3000/front/users-page';
      handleClose();
    } else {
      console.error('Erro ao criar usuário:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
  

};


      return (
        <div>
          <Modal  open={open} onClose={handleClose}>
            <Box style={boxStyle}>
                <form onSubmit={handleSubmit} className="form">
            
                  <label>
                    Name:
                    <input id="name" type="text" name="name" value={formData.name}
                    onChange={handleChange} />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input id="email" type="email" name="email" 
                    value={formData.email}
                    onChange={handleChange}/>
                  </label>
                  <br />
                  <label>
                    Password:
                    <input id="password" type="password" name="password" 
                    value={formData.password}
                    onChange={handleChange}/>
                  </label>
                  <br />
                  <br />
                <button type='submit' id="botao">Editar</button> 
              </form>
            </Box>
        </Modal>

          
          <h2>Users List</h2>
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>
                  Id: {user.id} | Name: {user.name} | Email: {user.email}
                  <button
                  id="editar"
                    className="edit-user"
                    type="button"
                    variant="contained"
                    onClick={() => handleEdit(user)}
                    
                  >
                    Update User
                  </button> 
                  <hr />

                </li>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </ul>
        </div>
      );
    }

export default UsersList;