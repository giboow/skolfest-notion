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

