type Props = {
  type: string;
  value: string;
  placeHolder?: string;
  onChange: (value: string) => void;
};

export default function Input({
  type,
  value,
  placeHolder = '',
  onChange,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeHolder}
      className="input"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
