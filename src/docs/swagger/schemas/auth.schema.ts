export const authSwaggerSchema = {
    login: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                example: 'example@mail.com',
                description: 'User email',
            },
            password: {
                type: 'string',
                example: '123456',
                description: 'User password',
            },
        },
    },

    register: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                example: 'example@mail.com',
                description: 'User email',
            },
            password: {
                type: 'string',
                example: '123456',
                description: 'User password',

            },
            firstName: {
                type: 'string',
                example: 'John',
                description: 'User first name',
            },
            lastName: {
                type: 'string',
                example: 'Doe',
                description: 'User last name',
            },
        },
    },

    LoginSuccess: {
        type: 'object',
        properties: {
            accessToken: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJvQlVaNEE4NnFKYjJwM0xpd09rRHRXeUdVVHoxIiwiaWF0IjoxNjgxMzcwMjE2LCJleHAiOjE2ODI2NjYyMTZ9.XPOS8MS3ep3_nz1w8Ebe6DTiq_63hV5Au8vRDs6nNG8',
                description: 'Access token',
            },
        },
    },
}