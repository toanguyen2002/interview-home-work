import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Text, Drawer, Modal } from '@mantine/core';
import { randomId, useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { any } from 'prop-types';

export default function MyLogin() {
    const user = JSON.parse(localStorage.getItem("user") || '""')
    const [login, isLogin] = useState(true)
    const [auth, setAuth] = useState<any>({})
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: 'meowmeow',
            password: '1234567890',
        },
    });
    const [opened, { open, close }] = useDisclosure(false);
    const handleLogin = async () => {
        try {
            const { data } = await axios.post(`http://localhost:3000/users/login`,
                {
                    username: form.getValues().username,
                    password: form.getValues().password
                }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            localStorage.setItem("user", JSON.stringify(data))
            isLogin(!login)
            close()
        } catch (error) {
            throw error
        }

    }
    useEffect(() => {
        setAuth(user)
    }, [login])
    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication" centered>
                <TextInput
                    label="username"
                    placeholder="usename"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    mt="md"
                    label="password"
                    placeholder="password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <Group justify="center" mt="xl">
                    <Button onClick={handleLogin} >
                        Login
                    </Button>
                </Group>
            </Modal>
            {auth ?
                <Text style={{ cursor: "pointer" }} onClick={open}>hello {auth.name} </Text> :
                <Text style={{ cursor: "pointer" }} onClick={open}>log In</Text>
            }

        </>

    );
}