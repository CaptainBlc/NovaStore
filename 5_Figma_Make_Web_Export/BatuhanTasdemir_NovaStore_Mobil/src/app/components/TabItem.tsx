interface TabItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabItem({ label, isActive, onClick }: TabItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-3 relative"
    >
      <span
        className={`text-sm font-medium ${
          isActive ? "text-[#FF6D00]" : "text-gray-500"
        }`}
      >
        {label}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6D00] rounded-full" />
      )}
    </button>
  );
}
