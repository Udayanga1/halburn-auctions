import { FormEvent, useState } from "react";
import { SignUpForm } from "../types/SignUpForm";

export default function SignUp() {

  const [form, setForm] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    purpose: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      purpose: form.purpose === '1' ? 'SELLER' : 'BUYER'
    };

    console.log(payload);
    

    fetch('http://localhost:8080/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then((response)=>response.text)
      .then((text) => {
        console.log(text);
        alert('User created');
      })
      .catch((error)=>{
        console.log(error);
        alert('Registration failed');
      })
  };

  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mx-auto w-auto text-center text-2xl/9 font-bold text-violet-500">Halburn Auctions</h2>
          <h2 className="mt-5 text-center font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            <div className="mt-2">
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
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm/6 font-medium text-gray-900">Purpose of Registration</label>
            <div className="mt-2">
              <select
                id="purpose"
                name="purpose"
                required
                value={form.purpose}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
              >
                <option value="1">Sell</option>
                <option value="2">Buy/Bid</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            Sign Up
          </button>
        </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{' '}
            <a href="#" className="font-semibold text-violet-500 hover:text-violet-400">
              Sign in
            </a>
          </p>
        </div>
      </div>
  )
}