import { Category } from "@/lib/models";
import { useStore } from "@/lib/store";

const CategoryCard = () => {
  const { categories, selectedCategories, selectCategory } = useStore();

  const handleCategorySelect = (category: Category) => {
    selectCategory(category);
  };

  return (
    <div className="space-y-1">
      {categories.map((category) => {
        const isSelected = selectedCategories.some((c) => c.id === category.id);

        return (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left 
              ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
            `}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryCard;
