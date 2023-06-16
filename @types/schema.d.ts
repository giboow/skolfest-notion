export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    slug: string;
    tags: string[];
    cover: string | null;
    description: string | null;
}

export interface SinglePost extends BlogPost {
    markdown: string;
}

export interface Partenaire {
    id: string;
    name: string;
    // address: string;
    // image: string;
    // link: string;
}

