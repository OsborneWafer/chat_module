import { initializeDatabase, initializeLogger, initializeSockets, loadConfig, startServer } from '~/bootstraps'

const main = async () => {
    console.clear()
    await loadConfig()
    await initializeLogger()
    await initializeDatabase()
    await startServer()
    await initializeSockets()
}

main()