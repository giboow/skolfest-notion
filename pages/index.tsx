import { BlogPost } from "@/@types/schema";
import CardComponent from "@/components/common/card.component";
import NotionService from "@/services/notion.service";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";


export const getStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getBlogPostList();

  return {
    props: {
      posts,
    },
  }
}


const Home = ({posts}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8">
        {posts.map((post: BlogPost) => (<CardComponent className="m-1" title={post.title} content={post.description} link={`post/${post.slug}`} image={post.cover} />))}
      </div>
    </>
  )
}

export default Home;
