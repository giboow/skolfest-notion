import { SinglePost } from "@/@types/schema";
import NotionService from "@/services/notion.service";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ArrowDownTrayIcon, ClockIcon } from "@heroicons/react/24/solid";
import { DateTime } from "luxon"
import urls from "rehype-urls";
import rehypeShiftHeading from 'rehype-shift-heading'

import rehypeRaw from "rehype-raw";
import Head from "next/head";
import Title from "@/components/common/title.component";


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

    const post = await notionService.getBlogPost(slug);

    return {
        props: {
            post,
        },
    }
}

const Post = ({ post }: PostProps) => {

    // Rehypes plugin
    const urlPlugin: any = [urls, (url: any, node: any) => {
        const { href } = url;
        if (node.tagName === 'a' && href) {
            const matches = href.match(/[^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/);
            if (matches) {
                let fileName = matches[0];
                if (fileName.match(/\.(pdf|png|jpg|jpeg)/)) {
                    node.properties.class = 'link';
                    node.children = [
                        { type: 'text', value: <ArrowDownTrayIcon key={url} className="link__icon"></ArrowDownTrayIcon> },
                        { type: 'text', value: fileName }
                    ]
                    node.properties.title = `Téléchargez le fichier : ${fileName}`;
                    node.properties.target = '_blank';

                }
            } else {
                node.properties.title = `Visitez l'URL : ${href}`;
                node.children = [{ type: 'text', value: href }];
                node.properties.target = '_blank';
            }
        }
        return url
    }];

    const shiftHeading: any = [rehypeShiftHeading, { shift: 1 }];

    const { cover } = post;

    return (
        <>
            <Title title={post.title} />
            <Head>
                <meta property="og:title" content={post.title} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={post.cover!} />
                <meta property="og:description" content={post.description!} />
            </Head>
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
                            <ReactMarkdown rehypePlugins={[rehypeRaw, urlPlugin, shiftHeading]}>{post.markdown}</ReactMarkdown>
                        </article>
                    </div>
                </main >
            </div >
        </>
    )
}

export default Post;