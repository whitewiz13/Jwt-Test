export const config = {
    database: {
        url: "mongodb://localhost:27017/db-test-node"
    },
    jwt: {
        secret: "querty",
        expireseIn: 100000,
    }
}