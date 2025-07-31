import {
  BrushIcon, DownloadIcon, EraserIcon, UndoIcon, RedoIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/button';
import ColorSelector from '~/components/color-selector';
import Slider from '~/components/slider';

const MAX_GRID_SIZE = 4096;

interface Props {
  isDrawing: boolean;
  isErasing: boolean;
  color: string;
  pixelSize: number;
  dimensions: { width: number; height: number };
  history: string[][][];
  historyIndex: number
  setIsDrawing: (isDrawing: boolean) => void;
  setIsErasing: (isErasing: boolean) => void;
  setColor: (color: string) => void;
  setPixelSize: (size: number) => void;
  setHistoryIndex: (index: number) => void;
  setPixels: React.Dispatch<React.SetStateAction<string[][]>>;
  editorRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function Toolbar({
  isDrawing,
  isErasing,
  color,
  pixelSize,
  dimensions,
  history,
  historyIndex,
  setIsDrawing,
  setIsErasing,
  setColor,
  setPixelSize,
  setHistoryIndex,
  setPixels,
  editorRef,
}: Props) {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const gridSize = Math.max(dimensions.width, dimensions.height);
  const maxPixelSize = Math.floor(MAX_GRID_SIZE / gridSize);
  const minPixelSize = 1;

  const handleClickBrush = () => {
    setIsDrawing(!isDrawing);
    setIsErasing(false);
  };

  const handleClickErase = () => {
    setIsErasing(!isErasing);
    setIsDrawing(false);
  };

  const handleClickDisplayColor = () => setIsColorPickerVisible(!isColorPickerVisible);

  const handleChangeColor = (newColor: { hex: string }) => {
    setIsColorPickerVisible(false);
    setColor(newColor.hex);
  };

  const handleClickUndo = () => {
    setHistoryIndex(historyIndex - 1);
    setPixels(history[historyIndex - 1].map((row) => [...row]));
  };

  const handleClickRedo = () => {
    setHistoryIndex(historyIndex + 1);
    setPixels(history[historyIndex + 1].map((row) => [...row]));
  };

  const handleOnClickDownload = () => {
    const canvas = editorRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      setDownloadUrl(dataURL);
    }
  };

  useEffect(() => {
    if (!downloadUrl || !downloadLinkRef.current) {
      return;
    }
    downloadLinkRef.current.click();
  }, [downloadUrl]);

  return (
    <>
      <nav className="flex space-x-4 items-center border-2 p-2 rounded-lg border-gray-900">
        <Button isActive={isDrawing} onClick={handleClickBrush}>
          <BrushIcon />
        </Button>
        <ColorSelector
          color={color}
          isColorPickerVisible={isColorPickerVisible}
          handleClickDisplayColor={handleClickDisplayColor}
          handleChangeColor={handleChangeColor}
        />
        <Button isActive={isErasing} onClick={handleClickErase}>
          <EraserIcon />
        </Button>
        <Button onClick={handleClickUndo} isDisabled={historyIndex <= 0}>
          <UndoIcon />
        </Button>
        <Button onClick={handleClickRedo} isDisabled={historyIndex >= history.length - 1}>
          <RedoIcon />
        </Button>
        <Button isActive={false} onClick={handleOnClickDownload}>
          <DownloadIcon />
        </Button>
        <Slider
          min={minPixelSize}
          max={maxPixelSize}
          step={1}
          value={pixelSize}
          setValue={setPixelSize}
        />
      </nav>
      {downloadUrl && (
        <a
          ref={downloadLinkRef}
          href={downloadUrl}
          download="sprite.png"
          style={{ display: 'none' }}
          aria-label="download sprite"
        />
      )}
    </>
  );
}
