import { Anchor, Avatar, Box, Divider, Spoiler, Stack, Text, Title } from '@mantine/core';
import classes from './MyPost.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MyComments(props: any) {
    const [comments, setComments] = useState([])
    useEffect(() => {
        const handleGetComment = async () => {
            const { data } = await axios.get(`http://localhost:3000/posts/${props.id}/comments`)
            setComments(data);
        }
        handleGetComment()
    }, []);
    return (
        <>
            <Stack>
                {comments.map((comment: any, index) => (
                    <Box p={1} display={"flex"} ta={"center"} style={{
                        alignItems: "center"
                    }}>
                        <Avatar key={"name"} name={"name"} color="initials" />
                        <Text ml={20}>{comment.content}</Text>
                    </Box>
                ))}
            </Stack>
        </>
    );
}