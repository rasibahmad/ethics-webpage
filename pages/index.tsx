import { useUser, useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const router = useRouter();
  console.log(session)

  useEffect(() => {
    if(!session){
      router.push('/login')
    }
  },[session])

  return (
    <>
      <h2>Welcome {user?.email}</h2>
    </>
  )
}
