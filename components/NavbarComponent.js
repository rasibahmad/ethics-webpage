import { Text, Group, Button } from "@mantine/core"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { IconClipboardText, IconFileDescription, IconHelpCircle, IconHome, IconLogout, IconLogin } from "@tabler/icons-react";

const Navbar = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [user_role, setUserRole] = useState('')

    // sign out button
    function signOutUser() {
        supabase.auth.signOut();
        router.push("/login");
    }

    // user_role of logged in user determines navbar
    useEffect(() => {
        const identifyUser = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', user?.id)
                .single()

            if (data) {
                setUserRole(data.user_role)
            }
        }
        identifyUser()
    }, [user])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <a href="/"><img style={{ width: 60, height: 50 }} src={"https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/images/aston_logo.png"} /> </a>
            <Group>
                <Button variant="outline" onClick={() => router.push(`/`)}><IconHome/>Home</Button>
                {/* Navbar options for different user roles */}
                {user_role === 'student' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginRight: '10px' }}>
                        <Button className="btn1" variant="outline" onClick={() => router.push(`/applications`)}><IconFileDescription/>Applications</Button>
                        <Button className="btn2" variant="outline" onClick={() => router.push(`/FAQ`)}><IconHelpCircle/>FAQs</Button>
                    </div>
                ) : user_role === 'staff' ? (
                    <Button variant="outline" onClick={() => router.push(`/supervisors/applications`)}><IconFileDescription/>Supervisor</Button>
                ) : user_role === 'admin' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginRight: '10px' }}>
                        <Button className="btn1" variant="outline" onClick={() => router.push(`/supervisors/applications`)}><IconFileDescription/>Supervisor</Button>
                        <Button className="btn2" variant="outline" onClick={() => router.push(`/ethics-team/applications`)}><IconClipboardText/>Ethics Team</Button>
                    </div>
                ) : (
                    <p></p>
                )}
                {!user ?
                    <Button onClick={() => router.push(`/login`)}><IconLogin/>Login</Button>
                    :
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <Text className="btn1" fz='sm'>{user?.email}</Text>
                        <Button className="btn2" variant="outline" onClick={() => signOutUser()}><IconLogout/>Sign out</Button>
                    </div>
                }
            </Group>
        </div>
    )
}

export default Navbar;
