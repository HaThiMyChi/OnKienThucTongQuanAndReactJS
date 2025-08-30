import fs from 'fs'
import { STATUS, tokenType } from './constants.js'
import { signToken, verifyToken } from './utils/jwt.js'
import config from './config.js'
import { response } from 'express'

const getDatabase = () => {
    const rawDB = fs.readFileSync('/database.json')
    const database = JSON.parse(rawDB)
    return database
}

const writeDatabase = (data) => {
    const databaseJSON = JSON.stringify(data)
    fs.writeFileSync('./database.json', databaseJSON)
}

export const loginController = async (req) => {
    const body = req.body
    const {uername, password} = body
    const database = getDatabase()
    const isAccountExist = database.users.some(
        (user) => user.username === username && user.password === password
    )

    if (isAccountExist) {
        const accessToken$ = signToken(
            {
                username,
                tokenType: tokenType.accessToken
            },
            config.jwt_expire_access_token
        )
        const refreshToken$ = signToken(
            {
                username,
                tokenType: tokenType.refreshToken
            },
            config.jwt_expire_refresh_token
        )

        const [access_token, refresh_token] = await Promise.all([
            accessToken$,
            refreshToken$
        ])
        database.access_token.push({
            username,
            token: access_token
        })
        database.refresh_token.push({
            username,
            token: refresh_token
        })
        writeDatabase(database)
        return {
            status: STATUS.OK,
            response: {
                message: 'Đăng nhập thành công',
                data: {
                    access_token,
                    refresh_token
                }
            }
        }
    }

    return {
        status: STATUS.UNAUTHORIZED,
        response: {
            message: 'username hoặc password không đúng!'
        }
    }
}

export const refreshTokenController = async (req) => {
    const {refresh_token} = req.body
    try {
        const decodedRefreshToken = await verifyToken(
            refresh_token,
            tokenType.refreshToken
        )

        const {username} = decodedRefreshToken
        const database = getDatabase()
        const isAccountExist = database.users.some(
            (user) => user.username === username
        )
        const isRefreshTokenExist = database.refresh_token.some(
            (refreshTokenObject) => refreshTokenObject.token === refresh_token
        )

        if (isAccountExist && isRefreshTokenExist) {
            const access_token = await signToken(
                {
                    username,
                    tokenType: tokenType.accessToken
                },
                config.jwt_expire_access_token
            )
            database.accessToken.push({
                username,
                token: access_token
            })
            writeDatabase(database)
            return {
                status: STATUS.OK,
                response: {
                    message: 'Refresh Token thành công',
                    data: {access_token}
                }
            }
        }
        return {
            status: STATUS.NOT_FOUND,
            response: { 
                message: 'Refresh Token không tồn tại' 
            }
        }
    } catch (error) {
        return {...error, response: error.error}
    }
}