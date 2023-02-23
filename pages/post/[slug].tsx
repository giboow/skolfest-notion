import { SinglePost } from "@/@types/schema";
import NotionService from "@/services/notion.service";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ClockIcon } from "@heroicons/react/24/solid";
import { DateTime } from "luxon"

interface PostProps {
    post: SinglePost;
}

interface PostParams {
    params: {
        slug: string;
    }
}

export async function getStaticPaths() {
    const notionService = new NotionService();

    const posts = await notionService.getBlogPostList();
    const paths = posts.map((post) => ({ params: { slug: post.slug } }));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async ({ params: { slug } }: PostParams) => {
    const notionService = new NotionService();
    console.log(slug);

    const post = await notionService.getBlogPost(slug);

    return {
        props: {
            post,
        },
    }
}


const Post = ({ post }: PostProps) => {
    const { cover } = post;
    return (
        <div className="postPage">
            <img className="postPage__cover" src={cover || "/images/default.jpg"} alt="" />
            <main className="postPage__main">

                <div className="postPage__container">
                    <article className="post">
                        <h1 className="post__title">{post.title}</h1>
                        <div className="meta">
                            <div className="meta__datetime">
                                <ClockIcon className="meta__datetime-icon"></ClockIcon>
                                <time className="meta__datetime-time" dateTime={post.date}>
                                    {DateTime.fromISO(post.date).setLocale('fr').toFormat('yyyy LLLL dd')}
                                </time>
                            </div>
                        </div>
                        <ReactMarkdown>{post.markdown}</ReactMarkdown>
                    </article>
                </div>
            </main >
        </div >
    )
}

export default Post;