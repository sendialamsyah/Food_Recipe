import styles from "../../styles/Auth.module.css";
import Input from "../../components/base/Input";
import Button from "../../components/base/Button";
import {useRouter} from 'next/router'
import { useState } from "react";
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: ''
  })
  const handleChange=(e)=>{
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin=()=>{

    console.log(dataLogin)
  }
  return (
    <>
      <div className={`row ${styles.container}`}>
        <div className={`col-5 ${styles.bgImage}`}>
          <div>
            <img src='/assets/image 15.png' alt='img' className={styles.background}/>
          </div>
        </div>
        <div className={`col-5 ${styles.main}`}>
          <div className={styles.content}>
            <h5>Welcome</h5>
            <p>Log in into your exiting account</p>
            <hr />
            <div className={styles.formWarpper}>
              <label htmlFor="email">E-mail</label>
              <Input type="email" name='email' id='email' value={dataLogin.email} placeholder='examplexxx@gmail.com' onChange={handleChange} />
              <label htmlFor="password">Password</label>
              <Input type="password" name='password' id='password' value={dataLogin.password} placeholder='Password' onChange={handleChange} />
              <input type="checkbox" name="terms" id="terms" className={styles.check}/>
              <label htmlFor="terms">I agree to terms & conditions</label>
              <Button title="Log In" width='300px' height='40px' onClick={()=>router.push('/')}/>
              {/* <Button title="Log In" width='300px' height='40px' type='submit'/> */}
            </div>
            <p className={styles.forgotPassword}>Forgot Password?</p>
            <p className={styles.signUp}>
              Don’t have an account? 
              <Link href='/auth/Register'>
                <span>Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
