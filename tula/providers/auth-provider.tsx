"use client";
import { Loading } from "@/components/loading";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { PropsWithChildren } from "react";

const convex = new ConvexReactClient(
 process.env.NEXT_PUBLIC_CONVEX_URL as string
);
export async function AuthConvexProvider({ children }: PropsWithChildren) {
 return (
  <ClerkProvider publishableKey={`${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`}>
   <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <Authenticated>{children}</Authenticated>
    <AuthLoading><Loading/></AuthLoading>
   </ConvexProviderWithClerk>
  </ClerkProvider>
 );
}