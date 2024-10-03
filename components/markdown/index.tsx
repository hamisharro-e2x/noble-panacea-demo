import ReactMarkdown from 'markdown-to-jsx';

import { Link } from '~/components/link';

interface MarkdownProps {
  content: string | null | undefined;
  className?: string;
}

const options = {
  overrides: {
    a: { component: Link },
    h1: {
      component: ({ ...props }) => (
        <h1 className="my-5 text-3xl font-light uppercase lg:text-5xl">
          <span {...props} />
        </h1>
      ),
    },
    h2: {
      component: ({ ...props }) => (
        <h2 className="my-5 text-2xl font-light uppercase lg:text-4xl">
          <span {...props} />
        </h2>
      ),
    },
    h3: {
      component: ({ ...props }) => (
        <h3 className="my-4 text-xl font-light uppercase lg:text-3xl">
          <span {...props} />
        </h3>
      ),
    },
    h4: {
      component: ({ ...props }) => (
        <h4 className="my-3 text-xl font-light uppercase lg:text-2xl">
          <span {...props} />
        </h4>
      ),
    },
    h5: {
      component: ({ ...props }) => (
        <h5 className="my-2 text-xl font-light lg:text-xl">
          <span {...props} />
        </h5>
      ),
    },
    h6: {
      component: ({ ...props }) => (
        <h5 className="my-4 font-light">
          <span {...props} />
        </h5>
      ),
    },
    ul: {
      component: ({ ...props }) => (
        <ul {...props} style={{ listStyle: 'disc', margin: '0px', paddingLeft: '40px' }}>
          <span {...props} />
        </ul>
      ),
    },
    ol: {
      component: ({ ...props }) => (
        <ol {...props} style={{ listStyle: 'decimal', margin: '0px', paddingLeft: '40px' }}>
          <span {...props} />
        </ol>
      ),
    },
    li: {
      component: ({ ...props }) => (
        <li>
          <span {...props} />
        </li>
      ),
    },
  },
};

function Markdown({ content, className }: MarkdownProps) {
  if (!content) return null;

  return (
    <div className={className}>
      <ReactMarkdown options={options}>{content}</ReactMarkdown>
    </div>
  );
}

export default Markdown;
