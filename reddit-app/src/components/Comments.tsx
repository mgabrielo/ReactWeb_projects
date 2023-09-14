import { Comment } from "@/API";
import { timeConvert } from "@/customHooks/formatConverter";
import { Grid, Paper, Typography } from "@material-ui/core";

interface ICommentsProps {
comment?:Comment | null
}

const Comments: React.FC<ICommentsProps> = ({comment}) => {
    console.log('comment:',comment)
  return(
    <Paper elevation={2} style={{width:'95%', minHeight:128, padding:8, backgroundColor:'#a9a9a9', marginTop:15,}}>
        <Grid direction="column" container spacing={1}>
            <Grid item>
                <Typography variant="body1"><b>{comment?.owner}</b> - {timeConvert(comment?.createdAt)} </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{comment?.content}</Typography>
            </Grid>
        </Grid>
    </Paper>
  ) ;
};

export default Comments;
