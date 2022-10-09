export const SERVER_PORT = 8000;
export const DB_URL = `mongodb://${process.env.DB_HOSTNAME || "localhost"}:27017/isec3004`;

export interface User {
    username: string;
    password: string;
}

export interface TodoItem {
    username: string;
    title: string;
}

export const fakeUsers: User[] = [
    {
        username: "christine",
        password: "a1234",
    },
    {
        username: "jay",
        password: "a1234",
    },
    {
        username: "tristan",
        password: "a1234",
    },
    {
        username: "james",
        password: "a1234",
    },
];

export const fakeTodoItems: TodoItem[] = [
    {
        username: "christine",
        title: "Do ISEC3004 homework.",
    },
    {
        username: "christine",
        title: "Buy ice-cream.",
    },
    {
        username: "jay",
        title: "Do ISEC3004 homework.",
    },
    {
        username: "jay",
        title: "Buy ice-cream.",
    },
    {
        username: "tristan",
        title: "Do ISEC3004 homework.",
    },
    {
        username: "tristan",
        title: "Buy ice-cream.",
    },
    {
        username: "james",
        title: "Do ISEC3004 homework.",
    },
    {
        username: "james",
        title: "Buy ice-cream.",
    },
];
