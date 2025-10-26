import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <SignIn />
    </div>
  );
}

export default Login;
