import {
  useRef, useState,
} from 'react';
import Toolbar from './components/toolbar-editor';
import CanvasEditor from './components/canvas-editor';

const DEFAULT_COLOR = '#ffffff';
const DEFAULT_COLOR_EVEN = '#f0f0f0';
const PIXEL_SIZE = 20;
const PIXELS = 16;

export default function Editor() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [color, setColor] = useState('blue');
  const editorRef = useRef<HTMLCanvasElement>(null);

  return (
    <section className="flex gap-4 flex-col justify-center items-center">
      <Toolbar
        isDrawing={isDrawing}
        isErasing={isErasing}
        color={color}
        setIsDrawing={setIsDrawing}
        setIsErasing={setIsErasing}
        setColor={setColor}
        editorRef={editorRef}
      />
      <CanvasEditor
        totalPixels={PIXELS}
        pixelSize={PIXEL_SIZE}
        defaultColor={DEFAULT_COLOR}
        defaultColorEven={DEFAULT_COLOR_EVEN}
        isDrawing={isDrawing}
        isErasing={isErasing}
        color={color}
        editorRef={editorRef}
      />
    </section>
  );
}
