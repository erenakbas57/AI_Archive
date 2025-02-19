import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent } from "@radix-ui/react-accordion";
import { useStore } from "@/lib/store";
import { Tag } from "@/lib/models";

const TagCard = () => {
  const { tags, selectedTags, selectTag } = useStore();

  const handleTagSelect = (tag: Tag) => {
    selectTag(tag); // Tag'ı seç veya kaldır
  };

  return (
    <AccordionContent className="bg-white border p-2 rounded-lg">
      <div className="space-y-2">
        {tags.map((tag) => (
          <div key={tag.id} className="space-y-1">
            <div
              className="flex items-center cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => handleTagSelect(tag)}
            >
              <Checkbox 
                className="form-checkbox" 
                checked={selectedTags.some(selectedTag => selectedTag.id === tag.id)} // Checkbox'un durumunu belirle
              />
              <span className="cursor-pointer">{tag.name}</span>
            </div>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
};

export default TagCard;
