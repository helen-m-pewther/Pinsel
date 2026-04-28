import { useLocation, Link} from 'react-router-dom'
import s from './Login.module.scss'

function LoginSidebar() {
    return(
        <div>
            <p>Insert cards here</p>
        </div>
    )
}

function LoginForm() {
    return(
        <div className={s.login}>
            <p>Log in to existing account:</p>
            <a href=""></a>

            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
    )
}

function RegisterSidebar() {
    return(
        <div>
            <p>Insert list here</p>
        </div>
    )
}

function RegisterForm() {
    return(
        <div>
            <h3>Create your studio</h3>
            <p>Start with the basics -- your account details.</p>

            <button>[] Continue with Google</button>

            <p>OR</p>

            <p>Already have an account? <Link to="/login">Log in</Link></p>

        </div>
    )
}

function AuthLayout() {
    const { pathname } = useLocation(); 
    const isLogin = pathname === '/login'; 

    return (
        <div className={s.authSplit}>
            <div className={s.heroPanel}>
                <div className={s.brandmark}>
                    <h3>Pinsel</h3>
                    <p className={s.subheading}>artist studio</p>
                    <div>
                        { isLogin ? <LoginSidebar /> : <RegisterSidebar />}
                    </div>
                </div>

                <div className={s.heroBottom}>
                    <blockquote>"Built for artists who'd rather be painting."</blockquote>
                    <ul className={s.featureList}>
                        <li>Kanban board</li>
                        <li>Inspo pinboard</li>
                        <li>Sales log</li>
                    </ul>
                </div>
            </div>

            <div className={s.formPanel}>
                { isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    )
}

export default AuthLayout