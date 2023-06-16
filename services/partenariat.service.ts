import {Partenaire} from "@/@types/schema";
import {Client} from "@notionhq/client";


export default  class PartenariatService {

    client: Client = new Client({ auth: process.env.NOTION_TOKEN });

    async getPartenaires(): Promise<Partenaire[]> {
        const response = await this.client.databases.query({
            database_id: process.env.PARTENAIRE_DATABASE_ID!,
        });
        return response.results.map(this.notionToPartnaire);
    }

    notionToPartnaire(notion: any): Partenaire  {
        return  {
            id: notion.id,
            name: (<any>notion.properties.Name).title[0].plain_text
        }
    }

}
