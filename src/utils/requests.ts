import type { AxiosInstance } from 'axios'

export const get = async (
  session: AxiosInstance,
  authorizationHeader: string,
  path: string,
  queryParameters?: Record<string, string | number | boolean>,
): Promise<unknown> => {
  return (
    await session.get(path, {
      params: queryParameters,
      headers: { Authorization: authorizationHeader },
    })
  ).data
}
