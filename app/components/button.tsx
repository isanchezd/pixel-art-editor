interface Props {
  children?: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  onClick, isActive = false, isDisabled = false, children,
}: Props) {
  return (
    <button
      type="button"
      className={`btn ${isActive ? 'btn-primary' : ''}`}
      disabled={isDisabled}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
}
