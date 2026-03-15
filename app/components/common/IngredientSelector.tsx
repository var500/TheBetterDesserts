import React, { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
}

interface IngredientSelectorProps {
  availableIngredients: Ingredient[];
  selectedIngredientIds: string[];
  onChange: (newSelectedIds: string[]) => void;
  // 👇 New prop to handle API creation
  onCreateNew: (
    name: string,
    description: string,
  ) => Promise<string | undefined>;
}

export default function IngredientSelector({
  availableIngredients,
  selectedIngredientIds,
  onChange,
  onCreateNew,
}: IngredientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // States for creating a new ingredient
  const [isCreating, setIsCreating] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (id: string) => {
    if (!selectedIngredientIds.includes(id)) {
      onChange([...selectedIngredientIds, id]);
    }
    setSearchTerm("");
  };

  const handleRemove = (idToRemove: string) => {
    onChange(selectedIngredientIds.filter((id) => id !== idToRemove));
  };

  const handleCreateSubmit = async () => {
    if (!searchTerm || !newDesc) return;
    setIsSubmitting(true);

    // Call the parent function to hit the API, which should return the new ID
    const newId = await onCreateNew(searchTerm, newDesc);

    if (newId) {
      onChange([...selectedIngredientIds, newId]);
      setIsCreating(false);
      setSearchTerm("");
      setNewDesc("");
    }
    setIsSubmitting(false);
  };

  const filteredAvailable = availableIngredients.filter(
    (ing) =>
      !selectedIngredientIds.includes(ing.id) &&
      ing.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedIngredients = availableIngredients.filter((ing) =>
    selectedIngredientIds.includes(ing.id),
  );

  // Check if the exact search term already exists to decide whether to show the "Create" button
  const exactMatchExists = availableIngredients.some(
    (ing) => ing.name.toLowerCase() === searchTerm.toLowerCase(),
  );

  return (
    <div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
      <label className="block text-sm font-medium text-gray-700">
        Recipe Ingredients
      </label>

      {/* Selected Ingredients Tags */}
      {selectedIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {selectedIngredients.map((ing) => (
            <span
              key={ing.id}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {ing.name}
              <button
                type="button"
                onClick={() => handleRemove(ing.id)}
                className="ml-1 text-blue-600 hover:text-blue-900"
              >
                <Icons.X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* INLINE CREATION FORM */}
      {isCreating ? (
        <div className="space-y-3 rounded-md border border-blue-200 bg-blue-50/50 p-4">
          <h4 className="text-sm font-semibold text-blue-900">
            Add New Ingredient
          </h4>
          <div>
            <label className="text-xs text-gray-600">Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Description *</label>
            <textarea
              rows={2}
              required
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="E.g., Crunchy and nutrient-rich..."
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsCreating(false);
                setSearchTerm("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting || !searchTerm || !newDesc}
              onClick={handleCreateSubmit}
            >
              {isSubmitting ? "Saving..." : "Save & Add"}
            </Button>
          </div>
        </div>
      ) : (
        /* STANDARD SEARCH INPUT */
        <div className="relative">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
          />

          {searchTerm && (
            <ul className="ring-opacity-5 absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
              {filteredAvailable.map((ing) => (
                <li
                  key={ing.id}
                  onClick={() => handleSelect(ing.id)}
                  className="relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-blue-50"
                >
                  <span className="block truncate font-normal">{ing.name}</span>
                </li>
              ))}

              {/* TRIGGER TO CREATE NEW IF NO EXACT MATCH */}
              {!exactMatchExists && (
                <li
                  onClick={() => setIsCreating(true)}
                  className="relative cursor-pointer border-t border-gray-100 bg-gray-50 py-2 pr-9 pl-3 font-medium text-blue-600 select-none hover:bg-blue-100"
                >
                  <span className="block truncate">
                    + Create &quot;{searchTerm}&quot;
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
