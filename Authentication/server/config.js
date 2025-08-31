const config = {
    port: 4000,
    jwt_secret_key: 'duthanhduoc',
    jwt_expire_access_token: 30, // 10 second
    jwt_expire_refresh_token: '1h', // 1 hour
    initialDatabase: {
        access_token: [],
        refresh_token: [],
        users: [
            {
                username: 'admin',
                password: 'admin'
            }
        ],
        products: [
            {
                id: 1,
                name: 'Iphone'
            },
            {
                id: 2,
                name: 'Samsung'
            }
        ]
    }
}
export default config