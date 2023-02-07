import { async } from "@firebase/util";
import { useState } from "react";
import  FormInput  from "../../components/form-input/form-input.component"
import { createAuthUserWithEmail, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component"
import './sign-up-form.style.scss'

//Valores por defecto del formulario
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''

}

const SignUpForm = () => {

    //Hook para actualizar los campos del formulario

    const [formFields, setFormFields] = useState(defaultFormFields);
    // cuando hace eso esta desestructurando el objeto para que pueda usar las variables por separado
    const { displayName, email, password, confirmPassword } = formFields;

    //Funcion que reincia el formulario
    const resetForm = () => {
        setFormFields(defaultFormFields)
    }


    const handleSubmit = async (event) => {
        //const {user} = createAuthUserWithEmailAndPassowrd
        // confirmar que el password machea
        // verifcar si autenicamos el usuario con email y password
        // crear un documento en base a lo que retorna

        //significa que todo lo que suceda en el form lo vamos a manejar
        event.preventDefault();

        if (password != confirmPassword) {
            alert('no coinciden los passwords')
            return;
        }

        console.log('Las contrasenias COINCIDEN')
        try {
            const { user } = await createAuthUserWithEmail(
                email,
                password,
            )
            //Se crea el documento del usuario
            await createUserDocumentFromAuth(user, { displayName })
            resetForm();
        }
        catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('Ya se encuentra en uso el correo electronico ingresado')
            }
            else {
                console.log('problemas al crear usuario', error);
            }
        }
    }

    // Funcion que va a actualizar el formulario
    const handleChange = (event) => {
        //Aca lo que hace es obtener el nombre y el valor del evento
        const { name, value } = event.target;
        //Actualizo el campo que obtendo del nombre
        setFormFields({ ...formFields, [name]: value })

    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                

                <FormInput
                label='Display name'
                type='text' 
                required onChange={handleChange} 
                name='displayName' 
                value={displayName}
                />

                <FormInput
                label='Email'
                type='email' 
                required onChange={handleChange} 
                name='email' 
                value={email}
                />  
                

                <FormInput
                label='Password'
                type='password' 
                required onChange={handleChange} 
                name='password' 
                value={password}
                />  

                <FormInput
                label='Confirm password'
                type='password' 
                required onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
                />  

                <Button buttonType={''}>Sign up</Button>

            </form>
        </div>
    )
};

export default SignUpForm;

