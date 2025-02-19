import React from "react";
import Select from "react-select";

interface Tag {
  id: string;
  name: string;
}

interface TagSelectorProps {
  tags: Tag[];
  value: string[];
  onChange: (selectedTags: string[]) => void;
  placeholder?: string;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  value,
  onChange,
  placeholder,
}) => {
  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const selectedValues = value.map((id) => ({
    value: id,
    label: tags.find((tag) => tag.id === id)?.name || "",
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    onChange(selectedIds);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedValues}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};