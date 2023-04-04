import Head from "next/head";

interface TitleProps { title: string }

export default ({ title }: TitleProps) => (
    <Head>
        <title>{`${title} - Skolfest - APE  de l'école primaire Henri Guérin à Bain de Bretagne`}</title>
    </Head>
);
