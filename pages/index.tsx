import { BlogPost } from "@/@types/schema";
import PostCardComponent from "@/components/common/post-card.component";
import Title from "@/components/common/title.component";
import NotionService from "@/services/notion.service";
import classnames from "classnames";
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


const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Title title="Accueil" />
      <div className="grid grid-cols-1 lg:grid-cols-4  md:grid-cols-2 gap-4">
        {posts.map((post: BlogPost, index: number) => (
          <PostCardComponent
            date={post.date}
            title={post.title}
            key={index}
            content={post.description}
            link={`post/${post.slug}`}
            image={post.cover} />
        ))}
      </div>
    </>
  )
}

export default Home;
