import { Navbar, Button, Text } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
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
        <Navbar isBordered isCompact>
            <Navbar.Brand as={Link} href="/">
                <img style={{ width: 60, height: 50 }} src={"https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/images/aston_logo.png"} />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" variant="highlight-rounded">
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/applications">Applications</Navbar.Link>
                <Navbar.Link href="/FAQ">FAQs</Navbar.Link>
            </Navbar.Content>

            <Navbar.Content>
                {!user ?  /*User doesnt exist*/
                    <>
                        <Navbar.Link href="/login">
                            <Button auto flat>
                                Login
                            </Button>
                        </Navbar.Link>
                    </>
                :         /* User does exist */
                    <>
                        <Navbar.Item>
                            <Text>{user?.email}</Text>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button auto flat onPress={() => signOutUser()}>
                                Sign Out
                            </Button>
                        </Navbar.Item>
                    </>
                }  
            </Navbar.Content>
        </Navbar>
    )
}

export default NavbarComponent;
