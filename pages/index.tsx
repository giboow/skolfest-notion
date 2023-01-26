import { BlogPost } from "@/@types/schema";
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
      {posts.map((post: BlogPost) => (post.title))}
    </>
  )
}

export default Home;
