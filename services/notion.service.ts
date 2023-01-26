import { BlogPost } from "@/@types/schema";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

export const notionToBlogPost = (notionPost: PageObjectResponse): BlogPost => {
    let cover: string | undefined;
    switch (notionPost.cover?.type) {
        case 'file':
            cover = (<any>notionPost.cover).file
            break;
        case 'external':
            cover = (<any>notionPost.cover).external.url;
            break;
        default:
            // Add default cover image if you want...
            cover = undefined
    }

    return {
        id: notionPost.id,
        title: (<any>notionPost.properties.Name).title[0].plain_text,
        date: (<any>notionPost.properties.Updated).last_edited_time,
        slug: (<any>notionPost.properties.Slug).formula.string,
        tags: (<any>notionPost.properties.Tags).multi_select,
        cover,
        description: (<any>notionPost.properties.Description).rich_text[0].plain_text,
    }
}

export default class NotionService {


    client: Client = new Client({ auth: process.env.NOTION_TOKEN });
    n2m: NotionToMarkdown = new NotionToMarkdown({ notionClient: this.client });

    async getBlogPostList() {
        const response = await this.client.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true
                }
            },
            sorts: [{
                property: "Updated",
                direction: "descending"
            }]
        });

        return (<PageObjectResponse[]>response.results).map(notionToBlogPost);
    }

    async getBlogPost(slug: string) {
        const response = await this.client.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
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
        const markdown = this.n2m.toMarkdownString(mdBlock);

        return {
            ...notionToBlogPost(notionPage),
            markdown
        };
    }
}

