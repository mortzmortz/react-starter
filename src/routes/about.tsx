import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

const deferredQueryOptions = () =>
  queryOptions({
    queryKey: ['deferred'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 3000));
      return {
        message: `Hello deferred from the server!`,
        time: new Date(),
      };
    },
  });

export const Route = createFileRoute('/about')({
  component: About,
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(deferredQueryOptions());
  },
});

function About() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense
        fallback={
          <div className="mx-auto max-w-2xl p-6">
            <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200" />
          </div>
        }
      >
        <DeferredQuery />
      </Suspense>
    </div>
  );
}

function DeferredQuery() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());

  return (
    <div>
      <h1>Deferred Query</h1>
      <div>Message: {deferredQuery.data.message}</div>
      <div>Time: {deferredQuery.data.time.toISOString()}</div>
    </div>
  );
}
