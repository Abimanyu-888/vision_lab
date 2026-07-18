import { useAuth } from '../../auth_context'
import user from '../../assets/user.svg'
import camera from '../../assets/camera.svg'
function Identity(){
    const MAX_SIZE = 10 * 1024 * 1024;
    const { currentUser }=useAuth();
    return(
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
                        <img src={currentUser.photoURL} className="avatar-img" alt="avatar" />
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
    )
}

export default Identity;