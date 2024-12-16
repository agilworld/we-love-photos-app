export const ApiHeader = (): HeadersInit => {
  const headers = new Headers();
  headers.set(
    "authorization",
    (`Client-ID ` + process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_KEY) as string,
  );
  return headers;
};
