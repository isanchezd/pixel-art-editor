import { BrushIcon, DownloadIcon, EraserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/button';
import ColorSelector from '~/components/color-selector';

interface ToolbarProps {
  isDrawing: boolean;
  isErasing: boolean;
  color: string;
  setIsDrawing: (isDrawing: boolean) => void;
  setIsErasing: (isErasing: boolean) => void;
  setColor: (color: string) => void;
  editorRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function Toolbar({
  isDrawing,
  isErasing,
  color,
  setIsDrawing,
  setIsErasing,
  setColor,
  editorRef,
}: ToolbarProps) {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

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
      <nav className="flex space-x-4">
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
