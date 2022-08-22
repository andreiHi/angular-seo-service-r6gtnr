// need to be localized
export const RES = {
  SITE_NAME: 'Sekrab Garage',
  DEFAULT_PAGE_TITLE: 'Welcome to Turtles and Lizards',
  // group static titles together
  PAGE_TITLES: {
    NOT_FOUND: 'Page no longer exists',
    ERROR: 'Oh oh! Something went wrong.',
    PROJECT_CONTACT: 'Contact us about a project',
    HOME: 'Homepage',
  },
  // group other formatted strings together
  SEO_CONTENT: {
    PROJECT_TITLE: '$0, in $1',
    PROJECT_RESULTS_TITLE: '$0 projects in $1',
    PROJECT_RESULTS_DESC: 'Found $0 projects categorized under $1',
  },
};

export const toFormat = (s: string, ...args: any) => {
  const regExp = /\$(\d+)/gi;
  // match $1 $2 ...
  return s.replace(regExp, (match, index) => {
    return args[index] ?? match;
  });
};
