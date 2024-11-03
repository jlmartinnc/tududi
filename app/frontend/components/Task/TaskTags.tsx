import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from '../../entities/Tag';
import { TagIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface TaskTagsProps {
  tags: Tag[];
  onTagRemove?: (tagId: string | number | undefined) => void;
  className?: string;
}

const TaskTags: React.FC<TaskTagsProps> = ({ tags = [], onTagRemove, className }) => {
  const navigate = useNavigate();

  const handleTagClick = (tagName: string) => {
    navigate(`/tasks?tag=${tagName}`);
  };

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {tags.map((tag, index) => (
        <div
          key={tag.id || index}
          className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-md dark:bg-gray-700 dark:text-gray-200 cursor-pointer"
        >
          <button
            type="button"
            onClick={() => handleTagClick(tag.name)}
            className="flex items-center space-x-1"
          >
            <TagIcon className="hidden md:block h-4 w-4 text-gray-500 dark:text-gray-300" />
            <span className="text-xs text-gray-700 dark:text-gray-300">{tag.name}</span>
          </button>
          {onTagRemove && (
            <button
              type="button"
              onClick={() => onTagRemove(tag.id)}
              className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none"
              aria-label={`Remove tag ${tag.name}`}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskTags;
