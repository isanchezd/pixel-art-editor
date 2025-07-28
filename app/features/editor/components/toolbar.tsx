import { BrushIcon, DownloadIcon, EraserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/button';
import ColorSelector from '~/components/color-selector';
import Slider from '~/components/slider';

const MAX_GRID_SIZE = 4096;

interface ToolbarProps {
  isDrawing: boolean;
  isErasing: boolean;
  color: string;
  pixelSize: number;
  pixels: { width: number; height: number };
  setIsDrawing: (isDrawing: boolean) => void;
  setIsErasing: (isErasing: boolean) => void;
  setColor: (color: string) => void;
  setPixelSize: (size: number) => void;
  editorRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function Toolbar({
  isDrawing,
  isErasing,
  color,
  pixelSize,
  pixels,
  setIsDrawing,
  setIsErasing,
  setColor,
  setPixelSize,
  editorRef,
}: ToolbarProps) {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const gridSize = Math.max(pixels.width, pixels.height);
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
