import React from 'react';
import { UnstyledButton, Group, ThemeIcon, Avatar, Text } from '@mantine/core';

export default function SidebarOption({img, txt, onClick}) {
    return <UnstyledButton onClick={onClick} style={{margin: '1%'}}>
        <Group styles={(theme) => ({
            root: {
                padding: '15px',
                '&:hover': {
                    backgroundColor: theme.fn.darken('#f8f9fa', 0.05),
                },
            },
        })}>
        <ThemeIcon>
          {img ? <Avatar size={40} src={img}></Avatar> : <Avatar size={40}></Avatar> }
        </ThemeIcon>
        <Text>{txt}</Text>
    </Group>
  </UnstyledButton> 
}