import {
  useEffect,
  useRef, useState,
} from 'react';
import Toolbar from './components/toolbar';
import Canvas from './components/canvas';
import type { CanvasSize, Preset } from './interfaces';
import ResolutionSelectorDialog from './components/resolution-selector-dialog';
import type { Route } from './+types/editor';
import useDialog from './hooks/useDialog';

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
  const [dimensions, setDimensions] = useState<CanvasSize>({ width: PIXELS, height: PIXELS });
  const [pixels, setPixels] = useState(
    Array.from({ length: dimensions.width }, () => Array.from({ length: dimensions.height }, () => '')),
  );
  const [pixelSize, setPixelSize] = useState(DEFAULT_PIXEL_SIZE);
  const [history, setHistory] = useState<string[][][]>(
    [Array.from({ length: dimensions.width }, () => Array.from({ length: dimensions.height }, () => ''))],
  );
  const [historyIndex, setHistoryIndex] = useState(0);
  const editorRef = useRef<HTMLCanvasElement>(null);
  const { dialogRef, openDialog, closeDialog } = useDialog();

  const handleOnSubmit = (preset: Preset) => {
    setDimensions({ width: preset.width, height: preset.height });
    setPixelSize(preset.pixelSize);
    closeDialog();
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
        dimensions={dimensions}
        history={history}
        historyIndex={historyIndex}
        setIsDrawing={setIsDrawing}
        setIsErasing={setIsErasing}
        setColor={setColor}
        setPixelSize={setPixelSize}
        setPixels={setPixels}
        setHistoryIndex={setHistoryIndex}
        editorRef={editorRef}
      />
      <Canvas
        dimensions={dimensions}
        pixels={pixels}
        pixelSize={pixelSize}
        defaultColor={DEFAULT_COLOR}
        defaultColorEven={DEFAULT_COLOR_EVEN}
        isDrawing={isDrawing}
        isErasing={isErasing}
        color={color}
        editorRef={editorRef}
        history={history}
        historyIndex={historyIndex}
        setPixels={setPixels}
        setHistory={setHistory}
        setHistoryIndex={setHistoryIndex}
      />
      <ResolutionSelectorDialog
        ref={dialogRef}
        closeDialog={closeDialog}
        onSubmit={handleOnSubmit}
      />
    </section>
  );
}
