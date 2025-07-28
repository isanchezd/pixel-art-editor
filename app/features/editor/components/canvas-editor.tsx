import {
  useCallback, useEffect, useState,
} from 'react';
import type { CanvasSize } from '../interfaces';

interface EditorCanvasProps {
  totalPixels: CanvasSize;
  pixelSize: number;
  defaultColor: string;
  defaultColorEven: string;
  isDrawing: boolean;
  isErasing: boolean;
  color: string;
  editorRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function CanvasEditor({
  totalPixels,
  pixelSize,
  defaultColor,
  defaultColorEven,
  isDrawing,
  isErasing,
  color,
  editorRef,
}: EditorCanvasProps) {
  const [pixels, setPixels] = useState(
    Array.from({ length: totalPixels.width }, () => Array.from({ length: totalPixels.height }, () => '')),
  );
  const [tempPixels, setTempPixels] = useState(pixels);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const canvasSize = pixels.length;
  const totalSize = canvasSize * pixelSize;

  const drawEditor = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, totalSize, totalSize);
      pixels.forEach((rowPixels, row) => {
        rowPixels.forEach((currentPixel, col) => {
          if (currentPixel === '') {
            const isEven = (row + col) % 2 === 0;
            ctx.fillStyle = isEven ? defaultColorEven : defaultColor;
          } else {
            ctx.fillStyle = currentPixel;
          }
          ctx.fillRect(row * pixelSize, col * pixelSize, pixelSize, pixelSize);
        });
      });
    },
    [pixels, pixelSize, totalSize, defaultColor, defaultColorEven],
  );

  const getPixelPosition = (
    xAxis: number,
    yAxis: number,
  ): { row: number; col: number } | undefined => {
    const editor = editorRef.current;
    if (!editor) return;

    const rect = editor.getBoundingClientRect();
    // Ajusta las coordenadas del mouse a la escala real del canvas
    const scaleX = editor.width / rect.width;
    const scaleY = editor.height / rect.height;
    const x = (xAxis - rect.left) * scaleX;
    const y = (yAxis - rect.top) * scaleY;

    if (x < 0 || y < 0 || x >= editor.width || y >= editor.height) return;

    const row = Math.floor(x / pixelSize);
    const col = Math.floor(y / pixelSize);

    // eslint-disable-next-line consistent-return
    return {
      row,
      col,
    };
  };

  const updatePixel = (prevData: string[][], row: number, col: number) => {
    const newData = [...prevData];
    if (isErasing) {
      newData[row][col] = '';
    }
    if (isDrawing) {
      newData[row][col] = color;
    }
    return newData;
  };

  const handleClickCanvas = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isDrawing && !isErasing) {
      return;
    }

    const valuePixel = getPixelPosition(event.clientX, event.clientY);
    if (!valuePixel) {
      return;
    }

    const { row, col } = valuePixel;
    setPixels((prevData) => updatePixel(prevData, row, col));
  };

  const handleMouseDownCanvas = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isDrawing && !isErasing) {
      return;
    }
    setIsMouseDown(true);

    const valuePixel = getPixelPosition(event.clientX, event.clientY);
    if (!valuePixel) {
      return;
    }

    const { row, col } = valuePixel;
    setTempPixels((prevData) => updatePixel(prevData, row, col));
  };

  const handleMouseMoveCanvas = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isMouseDown || (!isDrawing && !isErasing)) return;

    const valuePixel = getPixelPosition(event.clientX, event.clientY);
    if (!valuePixel) return;

    const { row, col } = valuePixel;
    setTempPixels((prevData) => updatePixel(prevData, row, col));
  };

  const handleMouseUpCanvas = () => {
    setIsMouseDown(false);
    setPixels(tempPixels);
  };

  useEffect(() => {
    setTempPixels([...pixels]);

    const editor = editorRef.current;
    if (!editor) return;

    const ctx = editor.getContext('2d');
    if (!ctx) return;

    drawEditor(ctx);
  }, [pixels, pixelSize]);

  useEffect(() => {
    const newPixels = Array.from({ length: totalPixels.width }, () => Array.from({ length: totalPixels.height }, () => ''));
    setPixels(newPixels);
    setTempPixels(newPixels);
  }, [totalPixels]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-1">
      <h1>
        Size:
        {`${totalPixels.width}x${totalPixels.height}`}
      </h1>
      <div className="w-full flex justify-center overflow-x-auto overflow-y-auto max-h-[80vh]">
        <canvas
          className="size-full"
          ref={editorRef}
          width={totalSize}
          height={totalSize}
          style={{ width: totalSize, height: totalSize }}
          onClick={handleClickCanvas}
          onMouseDown={handleMouseDownCanvas}
          onMouseUp={handleMouseUpCanvas}
          onMouseMove={handleMouseMoveCanvas}
        />
      </div>
    </div>
  );
}
