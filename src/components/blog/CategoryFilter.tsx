import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategorySelect(null)}
        className={selectedCategory === null ? "blog-gradient text-white" : ""}
      >
        All Posts
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(category)}
          className={selectedCategory === category ? "blog-gradient text-white" : ""}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;