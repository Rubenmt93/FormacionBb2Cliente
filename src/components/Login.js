import { useNavigate } from 'react-router-dom'
import { Formik, Form } from "formik"
import EmailLoginInput from './FormComponents/EmailLoginInput'
import PasswordInput from './FormComponents/PasswordInput'
import ButtonBB2 from './FormComponents/ButtonBB2'
import { useEffect, useState } from "react";
function Login() {
    const [query, setQuery] = useState("");   
    const navigate = useNavigate();
  
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
            localStorage.setItem("FormacionBb2User", response.headers.get("User"))
            navigate('/');
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
   

    
   
  return (
    <div>
      <div className='title'>
        <h1>Inicia sesión</h1>
      </div>
      <div className='container'>
        <Formik
        
          initialValues={{email:'ruben@gmail.com',password:'admin'}}
          validate={validate}
          onSubmit ={submit}>
      
          <Form className ="formik">                  
             <EmailLoginInput  type='email' name='email' placeholder="Email"  />      
              <PasswordInput name='password' />      
              <div className='reverse-row'>
                <ButtonBB2 name="button" primary='true' type='submit' text="Enviar"/>
              </div>   
          </Form> 
          
        </Formik> 
      </div>
    </div>
  )
}

export default Login
