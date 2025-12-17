import './SignIn.css'
function SignIn(){
    return(
        <>
        <div className="bg-mesh"></div>
        <div className="orb orb-purple"></div>
        <div className="orb orb-blue"></div>

        <div className="auth-container">
            
            <div className="logo-area">
                <div className="logo-wrapper">
                    <div className="logo-ring ring-outer"></div>
                    <div className="logo-ring ring-inner"></div>
                    <i data-lucide="aperture" width="32" height="32" className="text-neon-blue"></i>
                </div>
                <h1 className="brand-title">VISION<span className="text-neon-blue">.AI</span></h1>
                <p className="brand-subtitle">NEURAL IDENTITY VERIFICATION</p>
            </div>

            <div className="glass-panel">
                <div className="glass-glow-top"></div>

                <div className="tab-container">
                    <div id="tab-bg" className="tab-slider"></div>
                    
                    <button onclick="switchMode('signin')" className="tab-btn tab-active" id="tab-signin">SIGN IN</button>
                    <button onclick="switchMode('signup')" className="tab-btn tab-inactive" id="tab-signup">REGISTER</button>
                </div>

                <div id="form-container" className="form-container">
                    
                    <form id="signin-form" className="space-y-5 mode-enter" onsubmit="event.preventDefault(); window.location.href='VisionLab_UI.html'">
                        <div className="input-group">
                            <label className="label">Neural ID / Email</label>
                            <div className="input-wrapper">
                                <i data-lucide="mail" className="input-icon"></i>
                                <input type="email" placeholder="user@vision.ai"/>
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label className="label label-row">
                                <span>Passcode</span>
                                <a href="#" className="forgot-link">Forgot?</a>
                            </label>
                            <div className="input-wrapper">
                                <i data-lucide="lock" className="input-icon"></i>
                                <input type="password" placeholder="••••••••"/>
                            </div>
                        </div>

                        <button className="submit-btn btn-primary">
                            <span>INITIALIZE SESSION</span>
                            <i data-lucide="arrow-right" width="16" height="16"></i>
                        </button>
                    </form>

                    <form id="signup-form" className="space-y-5 hidden" onsubmit="event.preventDefault(); window.location.href='VisionLab_UI.html'">
                        <div className="input-row">
                            <div className="input-group">
                                <label className="label">First Name</label>
                                <input type="text" placeholder="Ada" style="padding-left: 1rem;"/> </div>
                            <div className="input-group">
                                <label className="label">Last Name</label>
                                <input type="text" placeholder="Lovelace" style="padding-left: 1rem;"/>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="label">Work Email</label>
                            <div className="input-wrapper">
                                <i data-lucide="mail" className="input-icon"></i>
                                <input type="email" placeholder="dev@vision.ai"/>
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label className="label">Create Passcode</label>
                            <div className="input-wrapper">
                                <i data-lucide="shield-check" className="input-icon"></i>
                                <input type="password" placeholder="••••••••"/>
                            </div>
                        </div>

                        <button className="submit-btn btn-secondary">
                            <span>CREATE ACCOUNT</span>
                            <i data-lucide="user-plus" width="16" height="16"></i>
                        </button>
                    </form>

                </div>

                <div className="divider">
                    <div className="divider-line">
                        <div className="line"></div>
                    </div>
                    <div className="divider-text-wrapper">
                        <span className="divider-text">Or continue with</span>
                    </div>
                </div>

                <div className="social-grid">
                    <button className="social-btn">
                        <i data-lucide="github" className="icon-gh"></i>
                        <span>GITHUB</span>
                    </button>
                    <button className="social-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>GOOGLE</span>
                    </button>
                </div>
            </div>

            <p className="footer-text">
                &copy; 2024 VISION.AI LABS. ACCESS RESTRICTED.
            </p>

        </div>
        </>
    )
}
export default SignIn