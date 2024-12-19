export interface CreateUser {
    username: string;
    email: string;
    authentication: {
        password: string;
    };
}

export interface UpdateUser {
    id: string;
    updateItems: Partial<CreateUser>;
}
