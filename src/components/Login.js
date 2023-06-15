
import { Formik, Form } from "formik"
import EmailInput from './FormComponents/EmailInput'
import PasswordInput from './FormComponents/PasswordInput'
import { useEffect, useState } from "react";
function Login() {
    const [query, setQuery] = useState("");   
       
    useEffect(() =>{
       if(!query) return
        const requestOptions = {   
               
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: query.email,
            password: query.password,
          }),           
        };        
        
        fetch("http://localhost:8080/auth/login", requestOptions)
        .then(response => { 
          if(response.headers.get("Authorization")){
            localStorage.setItem("FormacionBb2Token", response.headers.get("Authorization"))
          }else{
            console.log("Mal autenticado")
          }       
        })
        
        .catch((e)=>{
          console.error(e)
        });
    },[query]);   

    const submit = (values) => {       
        setQuery(values)        
    }
   
    const validate = (values) => {
        const errors ={}      
        /*
         */
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if(!values.password){
          errors.password = 'Requerido'
        } else if( values.password.length < 5){
            errors.password = 'El password es muy corto'
          }
        return errors
    }
    const logOut = () =>{
      localStorage.setItem("FormacionBb2Token","")
    
    }
   
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Formik
          initialValues={{email:'',password:''}}
          validate={validate}
          onSubmit ={submit}>
      
          <Form>
            <EmailInput name='email' label="Email:" />      
            <PasswordInput name='password' label="Password:" />          
            <button type='submit'>Enviar</button>
          </Form> 
        </Formik> 

        <h1 onClick={logOut} >LogOut</h1>
      </div>
    </div>
  )
}

export default Login
