import { GetPostQuery, ListPostsQuery, Post } from "@/API";
import Comments from "@/components/Comments";
import PostPreview from "@/components/PostPreview";
import { getPost, listPosts } from "@/graphql/queries";
import Container from "@material-ui/core/Container";
import { API, withSSRContext } from "aws-amplify";
import {  GetStaticPaths, GetStaticProps } from "next";

interface IIndividualPostProps {
    post:Post
}

const IndividualPost: React.FC<IIndividualPostProps> = ({post}) => {
    // console.log(post)
  return (
    <Container maxWidth='md'>
        <PostPreview post={post}/>
        {post.comments?.items.map((comment)=>(
            <Comments key={comment?.postID} comment={comment}/>
        ))}
    </Container>
  );
};

export const getStaticProps:GetStaticProps = (async ({params}) => {
    const SSR = withSSRContext()
    const postQuery = await SSR.API.graphql({
        query:getPost,
        variables:{
            id: params?.id
        }
    }) as {data: GetPostQuery}
    return { 
        props: { 
            post: postQuery.data.getPost as Post
         },
        revalidate:10 
    }
}) 
  
export const getStaticPaths:GetStaticPaths | any = async () => {
    const SSR = withSSRContext()

    const response= await SSR.API.graphql({query:listPosts}) as{
        data:ListPostsQuery;
        errors:any[]
    }

    const paths = response.data.listPosts?.items.map((post)=>({
        params: {id: post?.id }
    }))

    return {paths, fallback: true}
  }
   



export default IndividualPost;
