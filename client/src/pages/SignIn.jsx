
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();

    function handelChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault();

        try {
            const resp = await fetch('/api/auth/sign-in',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await resp.json();
            if(data.success == false) {
                setMessage(data.message)
                setLoading(false)
                return;
            }

            setMessage('Sign In successfull')
            setTimeout(() => {
                navigate('/')
            }, 2000) 
        }
        catch(err) {
            setMessage(err)
        }

        setLoading(false)
    }

    return <div className="max-w-lg mx-auto p-3">
        <h1 className="text-3xl text-center font-semibold py-7">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input type="text" placeholder="Email" className="border p-3 rounded-lg" id='email' onChange = {(handelChange)} />
            <input type="text" placeholder="Password" className="border p-3 rounded-lg" id='password' onChange = {(handelChange)} />

            <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80" >
                {loading? 'Loading...' : 'Sign In'}
            </button>

        </form>

        <div className="flex gap-2 mt-5">
            <p>Dont have an account?</p>
            <Link to={"/sign-up"}>
            <span className='text-blue-700'>Sign Up</span>
            </Link>
        </div>

        {message && <p className='text-red-500 mt-5'>{message}</p>}
    </div>
}