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
    EnderAnswer: {
        name: "EnderAnswer",
        title: "Modder[Admin]",
        picture: "/authors/EnderAnswer.jpg",
    },
    简言之: {
        name: "简言之",
        title: "Modder[Admin]",
        picture: "/authors/简言之.jpg",
    },
    善良滑稽: {
        name: "善良滑稽",
        title: "Modder[Admin]",
        picture: "/authors/善良滑稽.jpg",
    },
    雪丶我: {
        name: "雪丶我",
        title: "Modder",
        picture: "/authors/雪丶我.jpg",
    }
};

export default authors;
