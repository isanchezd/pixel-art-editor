import Editor from '~/features/editor/editor';
import type { Route } from './+types/home';

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Pixel Art Editor' },
    { name: 'description', content: 'Welcome to Pixel Art Editor' },
  ];
}

export default function Home() {
  return (
    <Editor />
  );
}
