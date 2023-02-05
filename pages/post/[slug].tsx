import { BlogPost } from "@/@types/schema";
import NotionService from "@/services/notion.service";

interface PostProps {
    post: BlogPost;
}

interface PostParams {
    params: {
        slug: string;
    }
}

export async function getStaticPaths() {
    const notionService = new NotionService();

    const posts = await notionService.getBlogPostList();
    const paths = posts.map((post) => ({params: {slug: post.slug}}));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async ({params: {slug}}: PostParams) => {
    const notionService = new NotionService();
    console.log(slug);

    const post = await notionService.getBlogPost(slug);
  
    return {
      props: {
        post,
      },
    }
  }


const Post = ({post}: PostProps) => {

    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.description}} />
        </div>
    )
}

export default Post;