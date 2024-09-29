import React, { useState, useEffect } from 'react';  
import { EmployeeData } from '../Employeedata';  
import Table from 'react-bootstrap/Table';

function Home() {
    const [data, setData] = useState([]);  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [id, setId] = useState(0);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        setData(EmployeeData);
    }, []);

    const handleEdit = (id) => {
        const dt = data.find(item => item.id === id);
        if (dt) {
            setUpdate(true);
            setId(id);
            setFirstName(dt.firstName);
            setLastName(dt.lastName);
            setAge(dt.age);
        }
    }

    const handleClear = () => {
        setId(0);
        setFirstName('');
        setLastName('');
        setAge('');
        setUpdate(false);
    }

    const handleSave = (e) => {
        e.preventDefault();
        let error = '';
        
        // Validation
        if (firstName === '') error += 'First name is required\n';
        if (lastName === '') error += 'Last name is required\n';
        if (age === '') error += 'Age is required\n';
        
        if (error) {
            alert(error);
            return;
        }

        const newEmployee = {
            id: data.length + 1,
            firstName,
            lastName,
            age: parseInt(age, 10),
        };

        setData([...data, newEmployee]);
        handleClear();
    };

    const handleUpdate = () => {
        const updatedData = data.map((item) => 
            item.id === id ? { ...item, firstName, lastName, age: parseInt(age, 10) } : item
        );
        setData(updatedData);
        handleClear();
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const filteredData = data.filter(item => item.id !== id);
            setData(filteredData);
        }
    }

    return (
        <div className='wrapper'>
            <div className="container">
                <div className="form">
                    <div>
                        <label>First Name:
                            <input
                                type="text"
                                placeholder="Enter first name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Last Name:
                            <input
                                type="text"
                                placeholder="Enter last name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Age:
                            <input
                                type="number"
                                placeholder="Enter age"
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                            />
                        </label>
                    </div>
                    <div className='form__cta'>
                        {!update ? (
                            <button className="btn btn-primary" onClick={handleSave}>Save</button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        )}
                        <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
                    </div>
                </div>
                <div className="responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.age}</td>
                                <td className='action--cta'>
                                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </div>
        </div>
    );
}

export default Home;
