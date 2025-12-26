import { useState } from 'react';
import { login } from './services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('Logged in:', data.user);
      alert(`Welcome ${data.user.name}`);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;