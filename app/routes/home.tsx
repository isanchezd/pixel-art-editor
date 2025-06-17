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
    <>
      <header className="w-full flex justify-center p-4 border-b-1">
        <h1 className="text-2xl">Sprite Art Editor</h1>
      </header>
      <main className="container mx-auto p-4">
        <Editor />
      </main>
    </>
  );
}
