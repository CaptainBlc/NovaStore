interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryChip({ label, isSelected, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-3xl whitespace-nowrap transition-all ${
        isSelected
          ? "bg-[#1A237E] text-white"
          : "bg-white text-gray-600 border-2 border-gray-200"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
