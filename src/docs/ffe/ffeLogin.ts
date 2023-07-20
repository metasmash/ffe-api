export default {
    post: {
        tags: ['Authentication'],
        description: 'FFE Login',
        operationId: 'ffeLogin',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            username: {
                                type: 'string',
                            },
                            password: {
                                type: 'string',
                            },
                        },
                        required: ['username', 'password'],
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Logged in successfully.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            '400': {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            '500': {
                description: 'An error occurred while logging in.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                },
                                error: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}
