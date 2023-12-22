export type productItemType = {
    _id?: string;
    id: string;
    name: string;
    quantity?: string;
    description?: string;
    price?: number;
};

export type assortmentType = productItemType[];

export const assortmentList: assortmentType = [
    {
        id: "1",
        name: "Борщ",
        quantity: "300г",
        description: "запашний домашній український борщ із м'ясом",
        price: 80,
    },
    {
        id: "2",
        name: "Вареники із капустою",
        quantity: "400г",
        description: "Вареники із тушеною капустою",
        price: 50,
    },
    {
        id: "3",
        name: "Салат із крабовими паличками",
        quantity: "200г",
        price: 60,
    },
];
