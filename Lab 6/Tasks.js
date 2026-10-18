"use strict";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchUser(userId) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const user = await response.json();

        if (
            !user ||
            !Number.isInteger(user.id) ||
            typeof user.name !== "string" ||
            !user.name.trim() ||
            typeof user.email !== "string" ||
            !user.email.trim()
        ) {
            throw new Error("Invalid user data");
        }

        return user;
    } catch (error) {
        return { error: error.message };
    }
}

async function getPosts(userId) {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

    if (!response.ok) {
        throw new Error(`Posts API Error: ${response.status}`);
    }

    const posts = await response.json();

    if (
        !Array.isArray(posts) ||
        posts.length === 0 ||
        !posts.every(post =>
            Number.isInteger(post.id) &&
            Number.isInteger(post.userId) &&
            typeof post.title === "string" &&
            post.title.trim() !== "" &&
            typeof post.body === "string" &&
            post.body.trim() !== ""
        )
    ) {
        throw new Error("Invalid posts data");
    }

    return posts;
}

async function getComments(postId) {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

    if (!response.ok) {
        throw new Error(`Comments API Error: ${response.status}`);
    }

    const comments = await response.json();

    if (
        !Array.isArray(comments) ||
        comments.length === 0 ||
        !comments.every(comment =>
            Number.isInteger(comment.id) &&
            Number.isInteger(comment.postId) &&
            typeof comment.name === "string" &&
            comment.name.trim() !== "" &&
            typeof comment.email === "string" &&
            comment.email.trim() !== "" &&
            typeof comment.body === "string" &&
            comment.body.trim() !== ""
        )
    ) {
        throw new Error("Invalid comments data");
    }

    return comments;
}

async function main() {
    const promise1 = getPosts(1);
    const promise2 = getComments(1);

    try {
        const [posts, comments] = await Promise.all([
            promise1,
            promise2
        ]);

        console.log("Main Promise Resolved Successfully");
        console.log("Valid Posts:", posts.length);
        console.log("Valid Comments:", comments.length);

        return { posts, comments };
    } catch (error) {
        console.log("Main Promise Rejected:", error.message);
        throw error;
    }
}

async function run() {
    console.log("TASK 1: Fetch User");

    const user = await fetchUser(1);
    console.log(user);

    console.log("\nTASK 2: Promise.all");

    try {
        await main();
    } catch (error) {
        console.log("Error handled in run():", error.message);
    }
}

run();