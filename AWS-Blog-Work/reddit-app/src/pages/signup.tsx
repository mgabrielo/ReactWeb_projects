import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useUser } from "@/context/AuthContext";
import { Auth } from "aws-amplify";

interface IFormInput {
  username: string;
  email:string;
  password:string;
}

const SignUp = () => {
    const {user, setUser} =useUser()
    const [open, setOpen] = useState(false)
    const [signUpError, setSignUpError] = useState<string>('')
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
         signUpWithEmailandPass(data)
    } catch (error:any) {
        console.error(error)
        setSignUpError(error.message)
        setOpen(true)       
    }
  };
  console.log('user value : ' , user)

  const handleClose=(event?: React.SyntheticEvent, reason?:string)=>{
    if(reason == 'clickaway'){
        return;
    }
    setOpen(false)
  }


  async function signUpWithEmailandPass(data:IFormInput){
    const  {username,password, email}= data
    try {
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            email, // optional
          },
        });
        console.log("New User : ",user);
      } catch (error:any) {
        // console.log('error signing up:', error);
        throw new error
      }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column"  alignItems="center" justifyContent="center" spacing={3} style={{marginTop:10}}>
            <Grid item>
                <TextField 
                    variant="outlined" 
                    id="username"
                    error={errors.username ?  true : false}
                    helperText= {errors.username ? errors.username.message : null} 
                    label='username'  
                    type="text"
                    {...register('username', {
                         
                        required: {value:true, message:'Please Enter Username'},
                        minLength:{ value: 3 , message: 'Insert chars above length 3'},    
                        maxLength:{ value: 16, message: 'Insert chars below length 17'},    
                    })} 
                />
            </Grid>
            <Grid item>
                <TextField 
                    variant="outlined" 
                    id="email"
                    error={errors.email ?  true : false}
                    helperText= {errors.email ? errors.email.message : null} 
                    label='email'  
                    type="email"
                    {...register('email', {
                         
                        required: {value:true, message:'Please Enter Valid Email'},
                    })} 
                />
            </Grid>
            <Grid item>
                <TextField 
                    variant="outlined" 
                    id="password"
                    error={errors.password ?  true : false}
                    helperText= {errors.password ? errors.password.message : null} 
                    label='password'  
                    type="password"
                    {...register('password', {
                         
                        required: {value:true, message:'Please Enter Valid Password'},
                        minLength:{ value: 6 , message: 'Insert stronger password with min length of 3'},    
                        maxLength:{ value: 20, message: 'Password too long'},    
                    })} 
                />
            </Grid>
            <Grid item style={{marginTop:10}}>
                <Button variant="contained" type="submit">Sign Up</Button>
            </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                    {signUpError}
            </Alert>
        </Snackbar>
    </form>
  );
};
export default SignUp;
