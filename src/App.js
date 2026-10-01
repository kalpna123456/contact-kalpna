import React, { useState } from 'react';

function App() {
  // Form ka data store karne ke liye simple state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Input fields me likhne par data update karne ke liye function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit button dabane par chalne wala function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend ke server par data bhejna (Jo port 5000 par chal raha hai)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) 
      });

      const data = await response.json();

      if (data.success) {
        alert("Mubarak ho! Data Mongoose database me save ho gaya.");
        setFormData({ name: '', email: '', message: '' }); // Form ko khali karne ke liye
      } else {
        alert("Error: Data save nahi ho saka.");
      }
    } catch (error) {
      alert("Server se connect nahi ho saka. Pehle backend 'node index.js' chalayein.");
    }
  };

  return (
    <>
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1 style={{ padding: '30px',  textAlign: 'center',   fontSize: '40px',   color: '#333333'}}>
        Kalpna</h1>
        <p style={{ fontSize: '18px', color: '#7F8C8D', fontStyle: 'italic' }}>
    Where Imagination Meets Reality
  </p>
    </div>

    <div style={{ padding: '30px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Message:</label><br />
          <textarea name="message" value={formData.message} onChange={handleChange} required style={{ width: '100%', padding: '8px', height: '100px' }}></textarea>
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
    </>
  );
}

export default App;
