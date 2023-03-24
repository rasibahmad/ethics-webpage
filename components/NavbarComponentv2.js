import { AppBar, Container, Link, Button } from "@mantine/core" 
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function NavbarComponentv2() {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [user_role, setUserRole] = useState('')

    function signOutUser() {
        supabase.auth.signOut();
        router.push("/login"); 
    }

    useEffect(() => {
        const identifyUser = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', user?.id)
            
            if (data) {
                setUserRole(data.user_role)
            }
        }
        identifyUser()
    }, [])

    return (
        <AppBar>
            <Container>
                <Link href="/">Home</Link>
                <Link href="/applications">Applications</Link>
                <Link href="/FAQ">FAQ</Link>
                <Button onClick={() => signOutUser()}>Sign Out</Button>
            </Container>
        </AppBar>
    )
}

export default NavbarComponentv2;
