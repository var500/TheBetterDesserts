"use client";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // 1. Global handler for GET requests (useQuery)
        queryCache: new QueryCache({
          onError: (error) => {
            if (error.message.includes("503")) {
              toast.error(
                "Our servers are experiencing high traffic. Please try again in a moment.",
                { toastId: "global-503" },
              );
            }
          },
        }),

        // 2. Global handler for POST/PATCH/DELETE (useMutation)
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error.message.includes("503")) {
              toast.error(
                "Action paused: Database is temporarily unreachable.",
                { toastId: "global-503-mutation" },
              );
            }
          },
        }),

        defaultOptions: {
          queries: {
            // Your existing config
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: true,

            // 3. Stop retrying immediately if we know the DB is down
            retry: (failureCount, error) => {
              if (error.message.includes("503")) return false;
              // Otherwise, retry normal network blips up to 3 times
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
