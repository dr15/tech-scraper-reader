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

import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinksGroup';
import Link from 'next/link';

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
  { label: 'Dashboard', icon: IconGauge, link: '/reader/dashboard' },
  { label: 'All Items', icon: IconList, link: '/reader/allitems' },
  { label: 'Bookmarked', icon: IconBookmark, link: '/reader/bookmarked' },
  { label: 'Comments', icon: IconMessage, link: '/reader/comments' },
  {
    label: 'Feeds',
    icon: IconRss,
    initiallyOpened: true,
    link: '/feeds',
    links: [
      {
        label: 'Cult by Honeypot',
        link: '/',
        rssUrl: 'cult.honeypot.io/rss.xml',
      },
      { label: 'Dev.to', link: '/', rssUrl: 'dev.to/feed' },
      // { label: 'CSS Tricks', link: '/', rssUrl: 'css-tricks.com/feed/' },
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

export default function ReaderLayout({ children }) {
  const { classes } = useStyles();

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

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
            <Link href="/reader">
              <Group>
                <ThemeIcon variant="light" size={30}>
                  <IconBook size={18} />
                </ThemeIcon>
                Tech Reader
              </Group>
            </Link>
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
      {children}
    </AppShell>
  );
}
