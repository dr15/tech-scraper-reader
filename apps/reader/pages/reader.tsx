import { useEffect, useState } from 'react';
import {
  AppShell,
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  ThemeIcon,
} from '@mantine/core';
import {
  IconGauge,
  IconList,
  IconBookmark,
  IconMessage,
  IconRss,
  IconBook,
} from '@tabler/icons';
import Parser from 'rss-parser';

import { UserButton } from '../components/UserButton';
import { LinksGroup } from '../components/NavbarLinksGroup';
import FeedList from '../components/feedList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFeeds = [
  '/api/rss/cult.honeypot.io/rss.xml',
  '/api/rss/css-tricks.com/feed/',
  '/api/rss/dev.to/feed',
  '/api/rss/javascript.plainenglish.io/feed',
  '/api/rss/javascriptweekly.com/rss/',
  '/api/rss/js.libhunt.com/newsletter/feed',
  '/api/rss/nodeweekly.com/rss/',
  '/api/rss/frontendfoc.us/rss/',
];

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  { label: 'All Items', icon: IconList },
  { label: 'bookmarked', icon: IconBookmark },
  { label: 'comments', icon: IconMessage },
  {
    label: 'Feeds',
    icon: IconRss,
    initiallyOpened: true,
    links: [
      {
        label: 'Cult by Honeypot',
        link: '/',
        rssUrl: 'cult.honeypot.io/rss.xml',
      },
      { label: 'CSS Tricks', link: '/', rssUrl: 'css-tricks.com/feed/' },
      { label: 'Dev.to', link: '/', rssUrl: 'dev.to/feed' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    height: '100%',
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 'bold',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingBottom: 0,
  },

  innerFooter: {
    paddingBottom: 0,
  },
}));

export default function Reader() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  const [data, setData] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/rss/${mockdata[4].links[2].rssUrl}`)
      .then((response) => response.text())
      .then((str) => {
        const text = new window.DOMParser().parseFromString(str, 'text/xml');
        setLoading(false);
        console.log(text);

        const parser: Parser = new Parser();
        parser.parseString(str).then((feed) => {
          const data = feed.items.map((item) => {
            return {
              title: item.title,
              date: item.pubDate,
              link: item.link,
              content: item.content,
              author: item.creator,
              //guid
            };
          });
          setData(data);
        });
      });
  }, []);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbar={
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group>
              <ThemeIcon variant="light" size={30}>
                <IconBook size={18} />
              </ThemeIcon>
              Tech Reader
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Ann Nullpointer"
              email="anullpointer@yahoo.com"
              className={classes.innerFooter}
            />
          </Navbar.Section>
        </Navbar>
      }
    >
      <FeedList items={data} />
    </AppShell>
  );
}
