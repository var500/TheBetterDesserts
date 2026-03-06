export default function IngredientsBadge({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={path}
        alt="Oats Flour"
        className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white"
      />
      <span className="font-bold text-lg">{label}</span>
    </div>
  );
}
