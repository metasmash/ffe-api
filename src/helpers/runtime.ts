import { environment } from '../../server'

interface IFfeCredentials {
    username: string
    password: string
}
export const retrieve_ffe_credentials = (): IFfeCredentials => ({
    username: environment.FFE_USERNAME,
    password: environment.FFE_PASSWORD,
})
