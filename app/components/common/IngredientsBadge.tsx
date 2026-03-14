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
        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg md:h-36 md:w-36"
      />
      <span className="text-lg font-bold">{label}</span>
    </div>
  );
}
