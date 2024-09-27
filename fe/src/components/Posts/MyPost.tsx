import React, { useState, useCallback, memo, useEffect } from 'react';
import { Spoiler, Title, Text, Box, Stack, Divider, Button, Collapse } from '@mantine/core';
import { Posts } from './Posts';
import { MyComments } from '../Comment/MyComment';
import axios from 'axios';


const MyPosts = (props: any) => {
    const [openComments, setOpenComments] = useState<{ [key: string]: boolean }>({});
    const [count, setCount] = useState([])
    const handleToggleComments = useCallback((postId: string) => {
        setOpenComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    }, []);

    useEffect(() => {
        const handleCount = async () => {
            const counts: any = await Promise.all(
                props.posts.map(async (post: Posts) => {
                    const { data } = await axios.get(`http://localhost:3000/posts/${post._id}/comments`);
                    return { id: post._id, count: data.length };
                })
            );
            setCount(counts);
        };
        handleCount();
    }, [props.posts]);
    return (
        <>
            {props.posts.map((post: Posts) => (
                <Stack key={post._id}>
                    <Spoiler p={20} maxHeight={220} showLabel="Show more" hideLabel="Hide">
                        <Title ta="center" mt={100}>
                            <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                                {post.title}
                            </Text>
                        </Title>
                        <Box display={"flex"}>
                            <Stack></Stack>
                        </Box>
                        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
                            {post.content}
                        </Text>
                    </Spoiler>
                    <Divider />

                    <Button w={300} onClick={() => handleToggleComments(post._id)}>
                        {count.map((item: any) => (
                            <div key={item.id}>
                                {item.id == post._id ? item.count + " replies" : null}
                            </div>
                        ))}
                    </Button>
                    <Collapse in={!!openComments[post._id]}>
                        <MyComments id={post._id} />
                    </Collapse>
                </Stack>
            ))}
        </>
    );
};

export default MyPosts;