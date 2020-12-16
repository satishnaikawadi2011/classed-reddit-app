import Axios from '.././utils/axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import {useRouter} from 'next/router'

function register() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [agreement, setAgreement] = useState(false)
    const [errors, setErrors] = useState<any>({});

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(agreement)
        if(!agreement){
            setErrors({...errors,agreement:'You must agree to out T&Cs to proceed!'})
        }else{
            
        try {
            const {data} = await Axios.post('/user/register',{email,password,username})
            router.push('/login')
        } catch (err) {
            setErrors({...err.response.data.errors})
            // console.log(err.response)
        }
        }

    }
    return (
        
        <div className="flex">
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="w-40 h-screen bg-center bg-cover" style={{ backgroundImage:"url('/images/bricks.jpg')"}}>
            </div>
            <div className="flex flex-col justify-center pl-6">
                <div className="w-70">
                <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
                <p className="mb-10 text-xs">
                    By continuing you agree to our User Agreement and Privacy Policy.
                </p>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <input type="checkbox" checked={agreement} onChange={e => setAgreement(e.target.checked)} className="mr-1 cursor-pointer" id="agreement"/>
                        <label htmlFor="agreement" className="text-xs cursor-pointer">
                            I agree to get emails about cool stuff on Greddit.
                        </label>
                        <small className="block font-medium text-red-600">{errors.agreement}</small>
                    </div>
                    <InputGroup error={errors.email}  placeholder="Email" setValue={setEmail} type="text" className="mb-2" value={email}/>
                    <InputGroup error={errors.username}  placeholder="Username" setValue={setUsername} type="text" className="mb-2" value={username}/>
                    <InputGroup error={errors.password}  placeholder="Password" setValue={setPassword} type="password" className="mb-2" value={password}/>
                    <button type='submit' className="w-full py-2 mb-4 font-bold text-white uppercase bg-green-500 rounded"> Sign Up</button>
                </form>
                <small> Already a greddiator ? 
                    <Link href="/login">
                        <a className="ml-1 text-green-400 uppercase">Log In</a>
                    </Link>
                </small>
                </div>
            </div>
        </div>
    )
}

export default register
