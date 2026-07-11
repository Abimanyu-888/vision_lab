import arrow from '../assets/arrow-left.svg'
import user from '../assets/user.svg'
import camera from '../assets/camera.svg'
import history from '../assets/history.svg'
import download from '../assets/download.svg'
import { useNavigate,Link } from 'react-router-dom';
import { signOut } from "firebase/auth"
import { auth } from "../firebase_config"
import './Profile.css'
import { useAuth } from '../auth_context'

function Profile() {
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
    const { currentUser }=useAuth();
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

                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-500 hidden sm-inline">Unsaved changes</span>
                    <button className="save-btn">SAVE</button>
                </div>
            </header>

            <div className="container">

                {/* --- Identity Section --- */}
                <section id="profile" className="glass-panel">
                    <div className="section-header">
                        <h2 className="section-title">
                            <div className="icon-box blue">
                                <img src={user} className="text-neon-blue" width="20" height="20"/>
                            </div>
                            Identity
                        </h2>
                    </div>

                    <div className="profile-layout">
                        <div className="avatar-container">
                            <div className="avatar-img-box">
                                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" className="avatar-img" alt="avatar" />
                            </div>
                            <div className="avatar-overlay">
                                <img src={camera} className="text-white" width="32" height="32"/>
                            </div>
                        </div>

                        <div className="form-full">
                            <div className="form-grid">
                                <div>
                                    <label className="label">DISPLAY NAME</label>
                                    <input type="text" value={currentUser.displayName} className="glass-input" disabled/>
                                </div>
                            </div>
                            <div>
                                <label className="label">EMAIL ADDRESS</label>
                                <input type="email" value={currentUser.email} className="glass-input" disabled/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Recent Activity Section --- */}
                <section id="uploads" className="glass-panel">
                    <div className="section-header">
                        <h2 className="section-title">
                            <div className="icon-box blue">
                                <img src={history} className="text-neon-blue" width="20" height="20"/>
                            </div>
                            Recent Activity
                        </h2>
                        <button className="text-link">Clear History</button>
                    </div>

                    <div className="grid-2">
                        <div className="activity-card blue">
                            <div className="activity-thumb">
                                <img src="https://images.unsplash.com/photo-1614036417651-efe4e56b6a28?w=200&auto=format&fit=crop&q=60" alt="scan" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 className="font-mono text-sm text-gray-200 truncate">invoice_scan_004.png</h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="badge badge-mint">COMPLETED</span>
                                    <span className="text-xs font-mono text-gray-500">2h ago</span>
                                </div>
                            </div>
                            <button className="download-btn" title="Download Asset">
                                <img src={download} width="20" height="20"/>
                            </button>
                        </div>

                        <div className="activity-card purple">
                            <div className="activity-thumb">
                                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&auto=format&fit=crop&q=60" alt="city" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 className="font-mono text-sm text-gray-200 truncate">cyber_city_v2.jpg</h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="badge badge-purple">FILTERED</span>
                                    <span className="text-xs font-mono text-gray-500">1d ago</span>
                                </div>
                            </div>
                            <button className="download-btn" title="Download Asset">
                                <img src={download} width="20" height="20"/>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Danger Zone --- */}
                <section className="danger-zone">
                    <div>
                        <h2 className="font-mono font-bold text-lg text-neon-red mb-1">END SESSION</h2>
                        <p className="text-xs text-gray-400">Save Changes before Loging out</p>
                    </div>
                    <button className="delete-btn" onClick={handleSighOut}>
                        LOG OUT
                    </button>
                </section>

                <footer>
                    <p>VISION.AI CORE SYSTEM v2.4.0 • <span>Support</span> • <span>Terms</span></p>
                </footer>

            </div>
        </div>
    )
}

export default Profile