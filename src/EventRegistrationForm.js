
import React, { useState } from 'react';
import './EventRegistrationForm.css'; // Import CSS file
const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let errors = {};
    
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = 'Age must be a number greater than 0';
    }
    
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      errors.guestName = 'Guest name is required if attending with a guest';
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Form submitted successfully\n${JSON.stringify(formData, null, 2)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
        <h1>   EVENT REG FORM </h1>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
      </div>
      
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      </div>
      
      <div>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        {errors.age && <p style={{color: 'red'}}>{errors.age}</p>}
      </div>
      
      <div>
        <label>
          Are you attending with a guest?
          <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
      </div>
      
      {formData.attendingWithGuest === 'Yes' && (
        <div>
          <label>
            Guest Name:
            <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
          </label>
          {errors.guestName && <p style={{color: 'red'}}>{errors.guestName}</p>}
        </div>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
