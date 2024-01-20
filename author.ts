type blogAuthorSchema = {
    name: string;
    title?: string | undefined;
    picture?: string | undefined;
    url?: string | undefined;
};

const authors: Record<string, blogAuthorSchema> = {
    "embers-of-the-fire": {
        name: "Embers of the Fire",
        title: "站长",
        picture: "/authors/Embers-of-the-Fire.jpg",
    },
    _OAO_: {
        name: "_OAO_",
        title: "Modder[Admin]",
        picture: "/authors/_OAO_.jpg",
    },
    Eddy: {
        name: "Eddy",
        title: "Modder[Admin]",
        picture: "/authors/Eddy.jpg",
    },
};

export default authors;
