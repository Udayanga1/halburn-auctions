import { FormEvent, useState } from "react";
import { SignInForm } from "../types/SignInForm";
import { User } from "../types/User";

interface SignInForm { email: string; password: string; }
interface SignInProps {
  onSignedIn: (user: User) => void;
  onSwitchToSignUp: () => void;
}

export default function SignIn({ onSignedIn, onSwitchToSignUp }: SignInProps) {

  const [form, setForm] = useState<SignInForm>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    
    try {
      const response = await fetch('http://localhost:8080/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Sign‑in failed');
      }

      const user:User = await response.json();
      // console.log('Signed in user:', user);
      onSignedIn(user);

      // e.g. redirect or update UI
    } catch (err) {
      console.error(err);
      alert('Sign‑in failed');
    }
  };

  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mx-auto w-auto text-center text-2xl/9 font-bold text-violet-500">Halburn Auctions</h2>
          <h2 className="mt-5 text-center font-bold tracking-tight text-gray-900">
          Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-900">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-900">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
            />
          </div>

          <button type="submit" className="w-full bg-violet-500 text-white py-2 rounded-md">
            Sign in
          </button>
        </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <a onClick={onSwitchToSignUp} className="font-semibold text-violet-500 hover:text-violet-400">
              Create a account
            </a>
          </p>
        </div>
      </div>
  )
}