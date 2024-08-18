import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();  // Ensure 'id' is correctly retrieved
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/getUser/${id}`)
                .then(result => {
                    console.log(result);
                    setName(result.data.name);
                    setEmail(result.data.email);
                    setAge(result.data.age);
                })
                .catch(err => console.log(err));
        }
    }, [id]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age };
        
        axios.put(`http://localhost:3001/updateUser/${id}`, updatedUser)
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            className='form-control' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            className='form-control' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input 
                            type="number" 
                            placeholder="Enter Age" 
                            className='form-control' 
                            value={age} 
                            onChange={(e) => setAge(e.target.value)} 
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div> 
        </div>
    );
}

export default UpdateUser;
