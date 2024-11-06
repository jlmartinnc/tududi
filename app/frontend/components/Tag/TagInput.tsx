import React, { useState } from 'react';
import TaskTags from '../Task/TaskTags';

interface TagInputProps {
  initialTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
}

const TagInput: React.FC<TagInputProps> = ({ initialTags, onTagsChange, availableTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>(initialTags || []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === ',') && inputValue.trim()) {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (!tags.includes(trimmedValue)) {
        const updatedTags = [...tags, trimmedValue];
        setTags(updatedTags);
        onTagsChange(updatedTags);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemoveId: number | string | undefined) => {
    if (tagToRemoveId === undefined) return; // Handle undefined case
    const updatedTags = tags.filter((_, index) => index !== Number(tagToRemoveId));
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div className="space-y-2">
      <TaskTags
        tags={tags.map((tag, index) => ({ id: index, name: tag }))}
        onTagRemove={removeTag}
        className="flex flex-wrap gap-1"
      />

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        list="available-tags"
        placeholder="Type to select an existing tag or add a new one"
        className="w-full px-2 border border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <datalist id="available-tags">
        {availableTags.map((tag, index) => (
          <option key={index} value={tag} />
        ))}
      </datalist>
    </div>
  );
};

export default TagInput;