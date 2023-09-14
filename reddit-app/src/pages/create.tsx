import { CreatePostInput, CreatePostMutation } from "@/API";
import ImageDropZone from "@/components/ImageDropZone";
import { createPost } from "@/graphql/mutations";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import {FC, useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api'

interface ICreateProps {
    title: string;
    content:string;
    image?:string;
}

const Create: FC<ICreateProps> = (props) => {
    const router = useRouter()
    const [file, setFile] = useState<File>()
    const { register, formState: { errors }, handleSubmit } = useForm<ICreateProps>();

    const onSubmit: SubmitHandler<ICreateProps> = async (data) => {

        if(file){

            try {
                const imagePath = uuidv4()
                await Storage.put(imagePath, file, {
                    contentType: file?.type, // contentType is optional
                });
                const createNewPostInput: CreatePostInput ={
                    title:data?.title,
                    contents: data?.content,
                    image:imagePath,
                    upvotes:0,
                    downvotes:0
                }
                const createNewPost = (await API.graphql({
                    query:createPost,
                    variables:{input: createNewPostInput},
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                })) as {data : CreatePostMutation}

                // console.log('newpost:',createNewPost)
                router.push(`/post/${createNewPost.data?.createPost?.id}`)
            } catch (error) {
                console.log("Error uploading file: ", error);
            }
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
                        <ImageDropZone file={file} setFile={setFile}/>
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained">Create Post</Button>
                </Grid>
            </Grid>
        </form>
    </Container>
  );
};

export default Create;
