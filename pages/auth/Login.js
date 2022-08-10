/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/Auth.module.css";
import Input from "../../components/base/Input";
import Button from "../../components/base/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import axios from 'axios'
import swal from 'sweetalert'

const Login = () => {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:4000/v1/user/login', dataLogin, {withCredentials: true})
  //   .then(()=>{
  //     alert('Login Success')
  //     router.push('/')
  //   })
  //   .catch((error)=>{
  //     alert('Wrong Email or Password')
  //     // console.log(error)
  //   })
  //   // console.log(dataLogin);
  // };
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${process.env.URL}/user/login`, dataLogin)
    .then((res)=>{
      const respData = res.data.data
      console.log(respData);
    
      localStorage.setItem('token', respData.token)
      localStorage.setItem('refreshToken', respData.refreshToken)
      swal({
        title: "Good job!",
        text: "Login Success",
        icon: "success",
        button: "Oke",
      });
      router.push('/')
    })
    .catch((error)=>{
      swal({
        title: "Login Failed",
        text: "wrong email or password",
        icon: "error",
        button: "Ok",
      });
      // console.log(error)
    })
    // console.log(dataLogin);
  };
  return (
    <>
      <div className={`row ${styles.container}`}>
        <div className={`col-5 ${styles.bgImage}`}>
          {/* <div>
            <img
              src="/assets/image 15.png"
              alt="img"
              className={styles.background}
            />
          </div> */}
        </div>
        <div className={styles.icon}>
        <img
              src="/assets/icon/Group 697.png"
              alt="img"
              // className={styles.background}
            />
        </div>
        <div className={`col-5 ${styles.main}`}>
          <div className={styles.content}>
            <h5>Welcome</h5>
            <p>Log in into your exiting account</p>
            <hr />
            <div className={styles.formWarpper}>
              <form onSubmit={handleLogin}>
                <label htmlFor="email">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={dataLogin.email}
                  placeholder="examplexxx@gmail.com"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={dataLogin.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                {/* <Button title="Log In" width='300px' height='40px' onClick={()=>router.push('/')}/> */}
                <Button
                  title="Log In"
                  width="300px"
                  height="40px"
                  type="submit"
                />
              </form>
            </div>
            <p className={styles.forgotPassword}>Forgot Password?</p>
            <p className={styles.signUp}>
              Don’t have an account?
              <Link href="/auth/Register">
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
