import { swaggerRouteDocs } from './routes'
import { swaggerSchemas } from './schemas'
import { swaggerDocServers } from './server-options'
import { swaggerSetupOptions } from './setup-options'
import { swaggerTags } from './swagger-tags'

export const swaggerDocs = {
    ...swaggerSetupOptions,
    ...swaggerDocServers,
    ...swaggerTags,
    ...swaggerRouteDocs,
    components: {
        ...swaggerSchemas,
        securitySchemes: {
            Bearer: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
        }
    }
}