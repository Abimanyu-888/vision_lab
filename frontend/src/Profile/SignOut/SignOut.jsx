import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth"
import { auth } from "../../firebase_config"

function SignOut(){
    const navigate=useNavigate();
    async function handleSighOut(){
        try{
            await signOut(auth);
            console.log("Sign out successfully")
            navigate('/')
        }
        catch(error){
            console.error(error);
        }
    }
    return(
        <section className="danger-zone">
            <div>
                <h2 className="font-mono font-bold text-lg text-neon-red mb-1">END SESSION</h2>
                <p className="text-xs text-gray-400">Save Changes before Loging out</p>
            </div>
            <button className="delete-btn" onClick={handleSighOut}>
                LOG OUT
            </button>
        </section>
    )
}
export default SignOut;