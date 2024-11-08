import React from 'react';

interface TaskDueDateProps {
  dueDate: string;
  className?: string;
}

const TaskDueDate: React.FC<TaskDueDateProps> = ({ dueDate, className }) => {
  const getDueDateClass = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (dueDate === today) return 'border-blue-700 dark:text-white';
    if (dueDate === tomorrow) return 'border-blue-700 dark:text-white';
    if (dueDate < today) return 'border-red-700 dark:text-white';
    return 'border-gray-300 dark:text-white';
  };

  const formatDueDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (dueDate === today) return 'TODAY';
    if (dueDate === tomorrow) return 'TOMORROW';
    if (dueDate === yesterday) return 'YESTERDAY';

    return new Date(dueDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`flex items-center text-xs py-1 px-2 rounded-md border ${getDueDateClass()} ${className}`}>
      {formatDueDate()}
    </div>
  );
};

export default TaskDueDate;
