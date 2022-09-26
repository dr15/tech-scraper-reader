import { Group, Text, Card, Title, createStyles } from '@mantine/core';

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
  },
}));

interface FeedItemProps {
  title: string;
  date: string;
  link: string;
  author?: string;
  content?: string;
}

export function FeedItem({
  title,
  date,
  link,
  author,
  content,
}: FeedItemProps) {
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

interface FeedListProps {
  items?: FeedItemProps[];
}

export default function FeedList({ items }: FeedListProps) {
  return (
    <>
      {items.map((item) => (
        <FeedItem {...item} key={item.link} />
      ))}
    </>
  );
}
