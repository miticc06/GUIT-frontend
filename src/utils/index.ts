export const addslashes = (str: string) => `${str}`.replace(/[\\"'\(\)\[\]]/g, '\\$&').replace(/\u0000/g, '\\0')

export function parseError(err: any) {
  if (err && err.message && /^Network error:/.test(err.message)) {
    return 'Error connect'
  }
  const message = err?.graphQLErrors?.map((er) => er.message).join(',') || err?.message || 'Có lỗi xảy ra'
  return message
}
