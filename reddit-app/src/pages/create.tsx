import ImageDropZone from "@/components/ImageDropZone";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import {FC} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface ICreateProps {
    title: string;
    content:string;
    image?:string;
}

const Create: FC<ICreateProps> = (props) => {
    const { register, formState: { errors }, handleSubmit } = useForm<ICreateProps>();

    const onSubmit: SubmitHandler<ICreateProps> = async (data) => {
        try {
            
        } catch (error) {
            
        }
    }
  return (
    <Container style={{maxWidth:'100%'}}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField 
                        variant="outlined" 
                        id="title"
                        error={errors.title ?  true : false}
                        helperText= {errors.title ? errors.title.message : null} 
                        label='Title'  
                        type="text"
                        fullWidth={true}
                        {...register('title', {
                            
                            required: {value:true, message:'Please Enter Title'},
                            maxLength:{value:120, message:'Title Limit is 120 Characters'}
                        })} 
                    />    
                </Grid>
                <Grid item>
                    <TextField 
                        variant="outlined" 
                        id="content"
                        error={errors.content ?  true : false}
                        helperText= {errors.content ? errors.content.message : null} 
                        label='Post Content'  
                        type="text"
                        fullWidth
                        multiline 
                        {...register('content', {
                                
                            required: {value:true, message:'Please Enter Content'},
                            maxLength:{value:1200, message:'Content Limit is 1200 Characters'}
                        })} 
                    />  
                </Grid>
                <Grid item>
                        <ImageDropZone/>
                </Grid>
                <Grid item>
                    <Button variant="contained">Create Post</Button>
                </Grid>
            </Grid>
        </form>
    </Container>
  );
};

export default Create;
