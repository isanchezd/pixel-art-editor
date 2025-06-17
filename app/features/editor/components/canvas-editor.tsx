import {
  useCallback, useEffect, useState,
} from 'react';

interface EditorCanvasProps {
  totalPixels: number;
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
    Array.from({ length: totalPixels }, () => Array.from({ length: totalPixels }, () => '')),
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
    [pixels],
  );

  const getPixelPosition = (
    xAxis: number,
    yAxis: number,
  ): { row: number; col: number } | undefined => {
    const editor = editorRef.current;
    if (!editor) return;

    const rect = editor.getBoundingClientRect();
    const x = xAxis - rect.left;
    const y = yAxis - rect.top;

    if (x > 0 + totalPixels * pixelSize || y > 0 + totalPixels * pixelSize) return;

    const row = Math.floor((x - 0) / pixelSize);
    const col = Math.floor((y - 0) / pixelSize);

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
  }, [pixels]);

  return (
    <canvas
      ref={editorRef}
      width={totalSize}
      height={totalSize}
      onClick={handleClickCanvas}
      onMouseDown={handleMouseDownCanvas}
      onMouseUp={handleMouseUpCanvas}
      onMouseMove={handleMouseMoveCanvas}
    />
  );
}
