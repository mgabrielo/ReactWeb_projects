import { Post } from "@/API";
import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccesssTimeIcon  from '@material-ui/icons/AccessTime'
import IconButton from'@material-ui/core/IconButton'
import Image from "next/image";
import { useRouter } from "next/router";
import { timeConvert } from "@/customHooks/formatConverter";

interface IPostPreviewProps {
    post :Post
}

const PostPreview: React.FC<IPostPreviewProps> = ({post}) => {
    const router = useRouter()
   
  return (
    <Grid container direction="row" justifyContent="flex-start" spacing={3} alignItems="flex-start" wrap="nowrap" style={{maxWidth:'100%', paddingTop:15}} > 
        <Paper elevation={2} style={{backgroundColor:'cadetblue', width:'100%', display:'flex', marginBottom:10, padding:5}}>
                <Grid item  style={{maxWidth:128, marginRight:15 }}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item >
                            <IconButton>
                                <ArrowUpwardIcon style={{maxWidth:16}}/>
                            </IconButton>
                        </Grid>
                        <Grid item >
                            <Grid container alignItems="center" direction="column">
                                <Grid item>
                                <Typography variant="h6">{(post?.upvotes - post?.downvotes).toString()}</Typography>
                                </Grid>
                                <Grid>
                                <Typography variant="body2">votes</Typography>
                                </Grid> 
                            </Grid>
                        </Grid>
                        <Grid item >
                            <IconButton>
                                <ArrowDownwardIcon style={{maxWidth:16}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <ButtonBase onClick={()=>router.push(`/post/${post?.id}`)}  >
                    <Grid item  >
                            <Grid container direction="column" alignItems="flex-start" >
                                <Grid item >
                                    <Typography variant="body1"> posted by {post?.owner}</Typography>
                                </Grid>
                                <Grid item style={{display:'flex'}}>
                                    <AccesssTimeIcon style={{maxWidth:16, marginRight:5}}/>
                                    <Typography variant="body1"> {timeConvert(post?.createdAt)}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" style={{marginTop:10}}>{post?.title}</Typography>
                                </Grid>
                                <Grid item >
                                    <Typography variant="body1" style={{textAlign:'start',marginTop:10, maxHeight:45, overflowY:'hidden'}}>
                                        {post?.contents}
                                    </Typography>
                                </Grid>

                                {
                                    !post?.image && (
                                        <Grid item style={{marginTop:15}} >
                                            <Image 
                                            src={`https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&w=980&h=540&dpr=1`}
                                            width={840} 
                                            height={450} 
                                            layout="intrinsic" 
                                            alt="imgs"/>
                                        </Grid>
                                    )
                                }
                            </Grid>
                    </Grid>
                </ButtonBase>
        </Paper>
    </Grid>
    );
};

export default PostPreview;
