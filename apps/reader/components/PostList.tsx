import { Group, Text, Card, Title, createStyles } from '@mantine/core';

import { PostItem } from '../utils/store/store';

const useStyles = createStyles((theme) => ({
  stack: {
    height: 'auto',
    backgroundColor: 'red',
  },
  itemCard: {
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& code': {
      whiteSpace: 'normal', //TODO: check if this should be true for all text
    },
    '& iframe': {
      maxWidth: '100%',
    },
  },
}));

export function PostItem({ title, date, link, author, content }: PostItem) {
  const { classes } = useStyles();

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      mb="md"
      className={classes.itemCard}
    >
      <Group>
        <a href={link}>
          <Title order={2}>{title}</Title>
        </a>
        {author && <Text size="sm">{author}</Text>}
        <Text size="xs" color="dimmed">
          {date}
        </Text>
      </Group>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </Card>
  );
}

interface PostListProps {
  items?: PostItem[];
}

export default function PostList({ items }: PostListProps) {
  return (
    <>{items && items.map((item) => <PostItem {...item} key={item.link} />)}</>
  );
}
