export default [
  {
    name: 'bold',
    icon: 'bold',
    type: 'annotateWords',
    syntax: '**',
  },
  {
    name: 'italic',
    icon: 'italic',
    type: 'annotateWords',
    syntax: '*',
  },
  {
    name: 'header',
    icon: 'header',
    type: 'annotateLine',
    syntax: '#',
    maxStack: 3,
  },
  {
    name: 'quote',
    icon: 'quote-left',
    type: 'annotateLine',
    syntax: '>',
    maxStack: 1,
  },
  {
    name: 'ul',
    icon: 'list-ul',
    type: 'annotateLine',
    syntax: '*',
    maxStack: 1,
  },
  {
    name: 'ol',
    icon: 'list-ol',
    type: 'annotateLine',
    maxStack: 1,
  },
  {
    name: 'link',
    icon: 'link',
  },
  {
    name: 'picture',
    icon: 'picture-o',
  },
  {
    name: 'unsplash',
    icon: 'camera',
  },
  {
    name: 'preview',
    icon: 'eye',
  },
  {
    name: 'help',
    icon: 'question-circle',
  },
];
