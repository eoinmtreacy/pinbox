import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

async function handleSubmit(e, setErrors) {
    e.preventDefault();
    // post request to /register with email and password
    fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
        })
    })
       .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().errors);
            }

        })
       .catch((errors) => {
            setErrors(Object.values(errors).map((error) => error[0]));
            console.error('Error:', errors);
        });
}

function Signup() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])

    return (
        <div className="container px-4">
            <h1 className="text-center text-2xl font-bold my-4">Sign up</h1>
            <div className="max-w-sm mx-auto p-8 rounded-lg border-solid border-[#020202]">
                <form onSubmit={(e) => { if (handleSubmit(e, setErrors)) navigate(`/mainpage/${e.target.email.value}`)} }>

                    {errors.length > 0 && errors.map((error, index) => (
                        <div key={index} className="error-message">
                            {error}
                        </div>
                    ))}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            className="border rounded w-full py-2 px-3 text-grey-darker"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;