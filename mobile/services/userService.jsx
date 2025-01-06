// src/services/userService.js
export const registerUser = async (userData) => {
    try {
      console.log('Sending registration request for:', userData.Email);
      
      const response = await fetch(`http://10.0.2.2:4000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log('Server response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Registration failed');
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };