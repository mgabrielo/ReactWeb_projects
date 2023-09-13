import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
interface IFormInput {
  username: string;
 
}

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log('submission test')
    console.log(data)
  };

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column"  alignItems="center" justifyContent="center" spacing={3}>
            <Grid item>
                <TextField 
                    variant="outlined" 
                    id="username" 
                    label='username'  
                    {...register('username', {
                         
                        required: {value:true, message:'Enter Username'},
                        minLength:{ value: 3 , message: 'Insert chars above length 3'},    
                        maxLength:{ value: 16, message: 'Insert chars below length 17'},    
                    })} 
                />
            </Grid>
            <Grid item>
                <Button variant="contained" type="submit">Sign Up</Button>
            </Grid>
        </Grid>
    </form>
  );
};
export default SignUp;
