
import { toast } from "react-hot-toast"
import { authenticate } from "./helper";

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        //check if user already exist

        const{status}= await authenticate(values.username);
        if(status !== 200){
            errors.exist =toast.error("User does not Exist")
        }
    }
    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors; 
}


export async function resetPasswordValidate(values){
    const errors = passwordVerify({}, values);
   if (values.password !== values.confirm_pass){
            errors.exist = toast.error('Password does not Match !!')
   }

   return errors; 
}

export async function registerValidate(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors,values);

    return errors;
}



export async function profileValidate(values){
    const errors = emailVerify({}, values);

    return errors;
}


/*********************************************/

function passwordVerify(errors ={}, values){

    const special_chars = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?+&^_-]{4,}$/;
    if(!values.password){
        errors.password = toast.error('Password required !!')
    }else if(values.password.includes(" ")){
        errors.username = toast.error("Wrong password !!")
    }else if(values.password.length < 4){
        errors.username = toast.error("Password must be more than 4 Characters !!")
    }else if(!special_chars.test(values.password)){
        errors.username = toast.error("Password must have a number and a special character !!") 
    }
} 
 
function usernameVerify(error={}, values){
    if(!values.username){
        error.username = toast.error('Username required !!')
    }else if(values.username.includes(" ")){
        error.username = toast.error("invalid username !!")
    }

    return error;
}  

function emailVerify(error={}, values){
    if(!values.email){
        error.email = toast.error('Email required !!')
    }else if(values.email.includes(" ")){
        error.email = toast.error('Wrong Email !!')
    }else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(values.email)){
        error.email = toast.error('Invalid email format!!')
    }

    return error;
}



 
