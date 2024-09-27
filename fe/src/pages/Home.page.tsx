import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Code, Drawer, Modal, Text, Textarea, TextInput } from '@mantine/core';
import MyPosts from '@/components/Posts/MyPost';
import { useDisclosure } from '@mantine/hooks';
import MyLogin from '@/components/Login/LoginComponent';
import { hasLength, useForm } from '@mantine/form';
import { string } from 'prop-types';

export function HomePage() {
  const [posts, setPosts] = useState([])
  const [render, isRender] = useState(false)
  const [opened, { open, close }] = useDisclosure(false);
  const user = JSON.parse(localStorage.getItem("user") || '""');
  const form = useForm({
    mode: 'controlled',
    initialValues: { title: 'title test 01', content: 'content test 01', hastags: 'red,green,blue,pink' },
    validate: {
      title: hasLength({ min: 10 }, 'Must be at least 10 characters'),
      content: hasLength({ min: 10 }, 'Must be at least 10 characters'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('http://localhost:3000/posts/')
      setPosts(data)
    }
    getData()
  }, [render])
  const handlePostPost = async () => {
    const hastag = []
    for (let index = 0; index < form.getValues().hastags.split(',').length; index++) {
      const element = form.getValues().hastags.split(',')[index];
      hastag.push(element)
    }

    const { data } = await axios.post(`http://localhost:3000/posts/add`,
      {
        title: form.getValues().title,
        content: form.getValues().content,
        tags: hastag
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }
    )
    isRender(!render)
    close()
  }
  return (
    <>
      <MyLogin />
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <form onSubmit={form.onSubmit(setSubmittedValues)}>
          <TextInput {...form.getInputProps('title')} label="title" placeholder="title" />
          <Textarea {...form.getInputProps('content')} mt="md" label="content" placeholder="content" />
          <TextInput {...form.getInputProps('hastags')} label="hastags" placeholder="hastags" />
          <Button onClick={handlePostPost} type="submit" mt="md">
            Submit
          </Button>
        </form>
      </Modal>
      <Button onClick={open}>add post</Button>
      <MyPosts posts={posts} />
    </>
  );
}
