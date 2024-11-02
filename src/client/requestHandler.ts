import type { AxiosInstance } from 'axios'
import { APIError } from '@exceptions/apiError'
import axios, { AxiosError } from 'axios'

export class RequestHandler {
  session: AxiosInstance

  constructor(baseUrl: string) {
    this.session = axios.create({ baseURL: baseUrl })
  }

  private handleError(error: unknown): never {
    if (!(error instanceof AxiosError) || error.response === undefined) {
      throw new Error('API request failed', { cause: error })
    }
    throw new APIError(error)
  }

  public async get(
    authorizationHeader: string,
    path: string,
    queryParameters?: Record<string, string | number | boolean | undefined>,
  ): Promise<unknown> {
    try {
      return (
        await this.session.get(path, { params: queryParameters, headers: { Authorization: authorizationHeader } })
      ).data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async post(authorizationHeader: string, path: string, body?: Record<string, unknown>): Promise<unknown> {
    try {
      return (await this.session.post(path, body, { headers: { Authorization: authorizationHeader } })).data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async put(authorizationHeader: string, path: string, body?: Record<string, unknown>): Promise<unknown> {
    try {
      return (await this.session.put(path, body, { headers: { Authorization: authorizationHeader } })).data
    } catch (error) {
      this.handleError(error)
    }
  }

  public async delete(authorizationHeader: string, path: string): Promise<void> {
    try {
      await this.session.delete(path, { headers: { Authorization: authorizationHeader } })
    } catch (error) {
      this.handleError(error)
    }
  }
}
