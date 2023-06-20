import { BlogPost } from "@/@types/schema";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import https from 'https';
import path from 'path';
import fs from 'fs';

export const notionToBlogPost = async (notionPost: PageObjectResponse): Promise<BlogPost> => {
    const postId = notionPost.id

    let cover: string | null = null;
    switch (notionPost.cover?.type) {
        case 'file':
            cover = await extractExternalImage(postId, (<any>notionPost.cover).file.url, 'posts');
            break;
        case 'external':
            cover = (<any>notionPost.cover).external.url;
            break;
        default:
            // Add default cover image if you want...
            cover = null
    }

    return {
        id: notionPost.id,
        title: (<any>notionPost.properties.Name).title[0].plain_text,
        date: (<any>notionPost.properties.Created).date.start,
        slug: (<any>notionPost.properties.Slug).formula.string,
        tags: (<any>notionPost.properties.Tags).multi_select,
        cover,
        description: (<any>notionPost.properties.Description).rich_text?.[0]?.plain_text || null,
    }
}

export const extractExternalImage = async (id: string, imageUrl: string, dirname: string): Promise<string> => new Promise(resolve => {
    const matches = imageUrl.match(/[^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/);

    if (matches) {
        const filename = matches[0];
        const dir = path.join(process.cwd(), 'public', dirname, id);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, filename);
        if (!fs.existsSync(filePath)) {
            const fsImage = fs.createWriteStream(filePath);
            https.get(imageUrl, (response) => {
                response.pipe(fsImage);
                fsImage.on("finish", () => {
                    fsImage.close();
                    resolve(`/${dirname}/${id}/${filename}`);
                });
            });
        } else {
            resolve(`/${dirname}/${id}/${filename}`);
        }
    } else {
        resolve(imageUrl);
    }

});

export default class NotionService {


    client: Client = new Client({ auth: process.env.NOTION_TOKEN });
    n2m: NotionToMarkdown = new NotionToMarkdown({ notionClient: this.client });

    async getBlogPostList() {
        const response = await this.client.databases.query({
            database_id: process.env.POSTS_DATABASE_ID!,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true
                }
            },
            sorts: [{
                property: "Created",
                direction: "descending"
            }]
        });

        return await Promise.all((<PageObjectResponse[]>response.results).map(notionToBlogPost));
    }

    async getBlogPost(slug: string) {
        const response = await this.client.databases.query({
            database_id: process.env.POSTS_DATABASE_ID!,
            filter: {
                property: "Slug",
                formula: {
                    string: {
                        equals: slug
                    }
                }
            }
        });

        if (response.results.length === 0) {
            return null;
        }

        const notionPage = <PageObjectResponse>response.results[0];
        const mdBlock = await this.n2m.pageToMarkdown(notionPage.id);
        let markdown = this.n2m.toMarkdownString(mdBlock);

        const regex = /^!?\[\w*]\((https?:\/\/[^()]+)\)$/gm;
        const matches = markdown.match(regex);
        if (matches) {
            for (const match of matches) {
                const imageUrl = match.match(/https?:\/\/[^()]+/gm)?.[0];
                if (imageUrl) {
                    const image = await extractExternalImage(notionPage.id, imageUrl, 'posts');
                    markdown = markdown.replace(imageUrl, image);
                }
            }
        }

        return {
            ...(await notionToBlogPost(notionPage)),
            markdown
        };
    }
}

