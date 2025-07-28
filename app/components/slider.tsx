interface Props {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  setValue: (value: number) => void;
}

export default function Slider({
  min = 0, max = 100, step = 1, value = 40, setValue,
}: Props) {
  return (
    <input
      type="range"
      className="range range-xs range-primary"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    />
  );
}
