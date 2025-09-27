import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  const handleLogin = (credentials: { username: string; password: string; role: string; department?: string }) => {
    console.log('Login attempted with:', credentials);
  };

  return <LoginForm onLogin={handleLogin} />;
}