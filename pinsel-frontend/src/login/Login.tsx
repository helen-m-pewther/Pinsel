import { Outlet } from 'react-router-dom'
import loginStyles from './Login.module.scss'

export function Login() {
    return(
        <div className={loginStyles.login}>
            <section id="login">
            <p>Login page</p>
            </section>
        </div>
    )
}

export function Register() {
    return(
        <div>
            
        </div>
    )
}

function AuthLayout() {
    return (
        <div className={loginStyles.authSplit}>
            <div className={loginStyles.heroPanel}>
                <h3>Pinsel</h3>
                <p className={loginStyles.subheading}>artist's studio</p>
            </div>
            <Outlet />
        </div>
    )
}

export default AuthLayout