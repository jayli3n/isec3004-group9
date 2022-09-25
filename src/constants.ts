export const SERVER_PORT = 8000
export const DB_URL = `mongodb://${process.env.DB_HOSTNAME || "localhost"}:27017/isec3004`

export interface User {
    username: string
    password: string
}

export interface Post {
    username: string
    title: string
}

export const fakeUsers: User[] = [
    {
        username: "christine",
        password: "1234",
    },
    {
        username: "jay",
        password: "1234",
    },
    {
        username: "tristan",
        password: "1234",
    },
    {
        username: "james",
        password: "1234",
    },
]

export const fakePosts: Post[] = [
    {
        username: "christine",
        title: "I ate fish today.",
    },
    {
        username: "christine",
        title: "I ate an apple today.",
    },
    {
        username: "jay",
        title: "I ate chicken today.",
    },
    {
        username: "jay",
        title: "I ate steak today.",
    },
    {
        username: "tristan",
        title: "I ate nothing today.",
    },
    {
        username: "tristan",
        title: "I ate something today.",
    },
    {
        username: "james",
        title: "I ate watermelon today.",
    },
    {
        username: "james",
        title: "I ate grapes today.",
    },
]
