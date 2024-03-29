import { useContext, useState } from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx"

export default function RegisterAndLoginForm(){
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [isLoginOrRegister , setIsLoginOrRegister] = useState('login');
    const { setUsername:setLoggedInUsername , setId} = useContext(UserContext);
    async function handleSubmit(ev){
        ev.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login'
        const {data} =  await axios.post( url , {username , password});
        setLoggedInUsername(username);
        setId(data.id);
    }
    return(
        <div className="bg-blue-50 h-screen flex items-center">
            <form onSubmit={handleSubmit} className="w-64 mx-auto mb-12">
                <input type="text" value={username} 
                onChange={ev => setUsername(ev.target.value)} placeholder="username" 
                className="block w-full rounded-sm p-2 mb-2 border" />
                <input type="password"
                 value={password} onChange={ev => setPassword(ev.target.value)} 
                 placeholder="password" 
                 className="block w-full rounded-sm p-2 mb-2 border"  />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                </button>
                <div className="text-center mt-2">
                    
                    {isLoginOrRegister === 'register' && (
                        <div>
                            Already a membre?
                            <button onClick={() => setIsLoginOrRegister('login')}>
                              Login here
                          </button>
                        </div>
                    )}
                    {isLoginOrRegister === 'login' && (
                        <div>
                            Dont have an account?
                            <button onClick={() => setIsLoginOrRegister('register')}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}