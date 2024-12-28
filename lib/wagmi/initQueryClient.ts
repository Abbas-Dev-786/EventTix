import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export function initQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
    // https://tanstack.com/query/latest/docs/reference/QueryCache
    queryCache: new QueryCache({
      onError: (err: Error, query) => {
        console.error(`[${query.queryKey[0]}] ERROR`, err);
        if (err.cause) {
          console.error(`[${query.queryKey[0]}] ERROR cause`, err.cause);
        }
      },
    }),
    // https://tanstack.com/query/latest/docs/reference/MutationCache
    mutationCache: new MutationCache({
      onError: (err: Error, _variables, _context, mutation) => {
        let mutationKey = mutation.options.mutationKey;
        if (!mutationKey?.[0]) {
          console.warn(
            "Please consider adding a mutationKey to your mutations"
          );
          mutationKey = ["Unknown mutation"];
        }
        console.error(`[${mutationKey}] ERROR`, err);
        if (err.cause) {
          console.error(`[${mutationKey}] ERROR cause`, err.cause);
        }
      },
    }),
  });
}
