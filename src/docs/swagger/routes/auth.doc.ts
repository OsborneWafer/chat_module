export const authSwaggerDoc = {
    '/auth/login': {
        post: {
            tags: [ 'Auth' ],
            summary: 'Login',
            description: 'Login',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/login'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Login success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/LoginSuccess'
                            }
                        }
                    }
                },

                404: {
                    description: 'User not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User not found',
                                        description: 'User not found',
                                    },
                                },
                            }
                        }
                    }
                },

                400: {
                    description: 'Invalid credentials',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Invalid credentials',
                                        description: 'Invalid credentials',
                                    },
                                },
                            }
                        }
                    }
                },

                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Internal server error',
                                        description: 'Internal server error',
                                    },
                                },
                            }
                        }
                    }
                }
            }
        }
    },

    '/auth/register': {
        post: {
            tags: [ 'Auth' ],
            summary: 'Register',
            description: 'Register',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/register'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Register success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User created successfully',
                                        description: 'Register success',
                                    },
                                },
                            }
                        }
                    }
                },

                409: {
                    description: 'User already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User already exists',
                                        description: 'User already exists',
                                    },
                                },
                            }
                        }
                    }
                },

                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Internal server error',
                                        description: 'Internal server error',
                                    },
                                },
                            }
                        }
                    }
                }
            }
        }
    },

    '/auth/verify': {
        get: {
            tags: [ 'Auth' ],
            summary: 'Verify',
            description: 'Verify',
            security: [
                {
                    //@ts-ignore
                    Bearer: []
                }
            ],

            responses: {
                200: {
                    description: 'Ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Ok',
                                        description: 'Ok',
                                    },
                                },
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized',
                                        description: 'Unauthorized',
                                    },
                                },
                            }
                        }
                    }
                }
            }
        },
    }
}