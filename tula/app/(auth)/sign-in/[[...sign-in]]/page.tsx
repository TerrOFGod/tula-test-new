import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/app/(auth)/auth-layout";

export default function page() {
 return (
  <AuthLayout>
   <SignIn />
  </AuthLayout>
 );
}