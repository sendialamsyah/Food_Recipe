/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/Auth.register.module.css";
import Input from "../../components/base/Input";
import Button from "../../components/base/Button";
import {useRouter} from 'next/router'
import { useState } from "react";
import axios from 'axios'
import swal from 'sweetalert'

const Register = () => {
  const router = useRouter()
  const [dataRegister, setDataRegister] = useState({
    email: '',
    password: '',
    name: '',
    phonumber: ''
  })
  const handleChange=(e)=>{
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value
    })
  }
  const handleRegister=(e)=>{
    e.preventDefault()
    axios.post(`${process.env.URL}/user/register`, dataRegister)
    .then(()=>{
      swal("Good job!", "Register Success!", "success");
      router.push('/auth/Login')
    })
    .catch((error)=>{
      swal("Register Failed!", "", "error");
      console.log(error)
    })
    console.log(dataRegister)
  }
  return (
    <>
      <div className={`row ${styles.container}`}>
        <div className={`col-5 ${styles.bgImage}`}>
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
            <h5>Let’s Get Started !</h5>
            <p>Create new account to access all features</p>
            <hr />
            <div className={styles.formWarpper}>
              <form onSubmit={handleRegister}>
            <label htmlFor="name">Name</label>
              <Input type="text" name='name' id='name' value={dataRegister.name} placeholder='Name' onChange={handleChange} />
              <label htmlFor="email">Email address*</label>
              <Input type="email" name='email' id='email' value={dataRegister.email} placeholder='Enter email address' onChange={handleChange} />
              <label htmlFor="phonenumber">Phone Number</label>
              <Input type="number" name='phonenumber' id='phonenumber' value={dataRegister.phonenumber} placeholder='08xxxxxxxxxx' onChange={handleChange} />
              <label htmlFor="password">Create New Password</label>
              <Input type="password" name='password' id='password' value={dataRegister.password} placeholder='Create New Password' onChange={handleChange} />
              <label htmlFor="password">New Password</label>
              <Input type="password" name='password' id='password' value={dataRegister.password} placeholder='New Password' onChange={handleChange} />
              {/* <input type="checkbox" name="terms" id="terms" className={styles.check}/>
              <label htmlFor="terms">I agree to terms & conditions</label> */}
              {/* <Button title="Register Account" width='300px' height='40px' onClick={()=>router.push('/auth/Login')}/> */}
              <Button title="Log In" width='300px' height='40px' type='submit'/>
              </form>
            </div>
            <p className={styles.signUp}>
              Already have account? <span onClick={()=>router.push('/auth/Login')}>Log In Here</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
