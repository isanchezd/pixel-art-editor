import {
  useEffect,
  useRef, useState,
} from 'react';
import Toolbar from './components/toolbar';
import CanvasEditor from './components/canvas-editor';
import type { CanvasSize, Preset } from './interfaces';
import ResolutionSelectorDialog from './components/resolution-selector-dialog';
import type { Route } from './+types/editor';

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Pixel Art Editor' },
    { name: 'description', content: 'Welcome to Pixel Art Editor' },
  ];
}

const DEFAULT_COLOR = '#ffffff';
const DEFAULT_COLOR_EVEN = '#f0f0f0';
const DEFAULT_PIXEL_SIZE = 40;
const PIXELS = 16;

export default function Editor() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [color, setColor] = useState('blue');
  const [pixels, setPixels] = useState<CanvasSize>({ width: PIXELS, height: PIXELS });
  const [pixelSize, setPixelSize] = useState(DEFAULT_PIXEL_SIZE);
  const editorRef = useRef<HTMLCanvasElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialog.current) {
      dialog.current.close();
    }
  };

  useEffect(() => {
    openDialog();
  }, []);

  return (
    <section className="flex gap-4 flex-col justify-center items-center p-4">
      <Toolbar
        isDrawing={isDrawing}
        isErasing={isErasing}
        color={color}
        pixelSize={pixelSize}
        pixels={pixels}
        setIsDrawing={setIsDrawing}
        setIsErasing={setIsErasing}
        setColor={setColor}
        setPixelSize={setPixelSize}
        editorRef={editorRef}
      />
      <CanvasEditor
        totalPixels={pixels}
        pixelSize={pixelSize}
        defaultColor={DEFAULT_COLOR}
        defaultColorEven={DEFAULT_COLOR_EVEN}
        isDrawing={isDrawing}
        isErasing={isErasing}
        color={color}
        editorRef={editorRef}
      />
      <ResolutionSelectorDialog
        ref={dialog}
        closeDialog={closeDialog}
        onSubmit={(preset: Preset) => {
          setPixels({ width: preset.width, height: preset.height });
          setPixelSize(preset.pixelSize);
          closeDialog();
        }}
      />
    </section>
  );
}
