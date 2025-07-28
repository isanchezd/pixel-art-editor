interface Props {
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Button({ onClick, isActive = true, children }: Props) {
  return (
    <button type="button" className={`btn ${isActive ? 'btn-primary' : ''}`} onClick={onClick} aria-pressed={isActive}>{children}</button>
  );
}
