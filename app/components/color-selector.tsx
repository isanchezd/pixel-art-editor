import SketchPicker from 'react-color/lib/components/sketch/Sketch';
import Button from './button';

interface Props {
  color: string;
  isColorPickerVisible: boolean;
  handleClickDisplayColor: () => void;
  handleChangeColor: (color: { hex: string }) => void;
}

export default function ColorSelector({
  color, isColorPickerVisible, handleClickDisplayColor, handleChangeColor,
}: Props) {
  return (
    <div className="flex gap-4">
      <Button onClick={handleClickDisplayColor} isActive={false}>
        <span className="w-5 h-5" style={{ backgroundColor: color }} />
      </Button>
      {isColorPickerVisible && (
      <div className="absolute z-10 mt-10">
        <SketchPicker color={color} onChange={handleChangeColor} />
      </div>
      )}
    </div>
  );
}
