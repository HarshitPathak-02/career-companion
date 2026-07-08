export interface QueryOptions {
    search?: string;
    sort?: string;
}


export const buildSearchQuery = (
    fields: string[],
    search?: string
) => {

    if (!search) {
        return {};
    }


    return {
        $or: fields.map((field) => ({
            [field]: {
                $regex: search,
                $options: "i",
            },
        })),
    };
};



export const buildSortQuery = (
    sort?: string
): Record<string, 1 | -1> => {

    if (!sort) {
        return {
            createdAt: -1,
        };
    }


    const order: 1 | -1 =
        sort.startsWith("-")
            ? -1
            : 1;


    const field =
        sort.replace("-", "");


    return {
        [field]: order,
    };
};