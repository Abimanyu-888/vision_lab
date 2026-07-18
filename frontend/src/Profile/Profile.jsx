import arrow from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom';

import './Profile.css'

import Identity from './Identitiy/identity.jsx'
import History from './History/History.jsx';
import SignOut from './SignOut/SignOut.jsx';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate=useNavigate();
    return (
        <div className="main-wrapper">
            <div className="bg-mesh"></div>

            <header>
                <div className="flex items-center gap-6">
                    <Link href="VisionLab_UI.html" className="back-btn" title="Back to Lab" onClick={()=>{navigate('/')}}>
                        <img src={arrow} width="24" height="24"/>
                    </Link>

                    <div className="divider-v"></div>

                    <h1 className="font-mono font-bold text-xl tracking-tight">
                        SETTINGS<span className="text-neon-pink">.CONFIG</span>
                    </h1>
                </div>

            </header>

            <div className="container">

                <Identity/>

                <History/>

                <SignOut/>

                <footer>
                    <p>VISION.AI CORE SYSTEM v2.4.0 • <span>Support</span> • <span>Terms</span></p>
                </footer>

            </div>
        </div>
    )
}

export default Profile