import Axios from '.././utils/axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import {useRouter} from 'next/router'

function login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>({});

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const {data} = await Axios.post('/user/login',{password,username})
            router.push('/')
        } catch (err) {
            // console.log(err.response)
            setErrors({...err.response.data.errors})
        }

    }
    return (
        
        <div className="flex">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="w-40 h-screen bg-center bg-cover" style={{ backgroundImage:"url('/images/bricks.jpg')"}}>
            </div>
            <div className="flex flex-col justify-center pl-6">
                <div className="w-70">
                <h1 className="mb-2 ml-2 text-lg font-medium">Log In</h1>
                <form onSubmit={submitHandler}>
                    <InputGroup error={errors.username}  placeholder="Username" setValue={setUsername} type="text" className="mb-2" value={username}/>
                    <InputGroup error={errors.password}  placeholder="Password" setValue={setPassword} type="password" className="mb-2" value={password}/>
                    <button type='submit' className="w-full py-2 mb-4 font-bold text-white uppercase bg-green-500 rounded">Log In</button>
                </form>
                <small> Not a greddiator ? 
                    <Link href="/register">
                        <a className="ml-1 text-green-400 uppercase">Sign Up</a>
                    </Link>
                </small>
                </div>
            </div>
        </div>
    )
}

export default login
