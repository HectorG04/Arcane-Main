
import React from 'react';
import type { CardType } from '../types';
import { PaperclipIcon, PlusIcon, TrashIcon, ClockIcon } from './Icons';

interface CardProps {
  card: CardType;
  columnId: string;
  onDelete: (cardId: string) => void;
  onClick: () => void;
}

const ArtistAvatar: React.FC<{ artist?: string }> = ({ artist }) => {
    if (!artist) return null;
    const initials = artist.split(' ').map(n => n[0]).join('');
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
    const colorIndex = (artist.charCodeAt(0) || 0) % colors.length;
    return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${colors[colorIndex]}`}>
            {initials}
        </div>
    );
};

const DueDateDisplay: React.FC<{ dueDate?: string | null, isComplete?: boolean }> = ({ dueDate, isComplete }) => {
    if (!dueDate) return null;

    const now = new Date();
    const dueDateObj = new Date(dueDate);
    now.setHours(0,0,0,0);
    dueDateObj.setHours(0,0,0,0);

    const isOverdue = !isComplete && dueDateObj < now;
    const isDueSoon = !isComplete && !isOverdue && (dueDateObj.getTime() - now.getTime()) <= 3 * 24 * 60 * 60 * 1000;
    
    let colorClass = 'text-slate-500 dark:text-slate-400';
    if(isComplete) {
        colorClass = 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    } else if(isOverdue) {
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    } else if(isDueSoon) {
        colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    }
    
    return (
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
            <ClockIcon className="h-3 w-3" />
            {dueDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
    );
}

const Card: React.FC<CardProps> = ({ card, columnId, onDelete, onClick }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const cardInfo = {
        cardId: card.id,
        sourceColumnId: columnId
    }
    e.dataTransfer.setData('cardInfo', JSON.stringify(cardInfo));
    e.currentTarget.classList.add('opacity-50', 'rotate-3');
    // Stop propagation to prevent triggering onClick when starting a drag
    e.stopPropagation();
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'rotate-3');
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when deleting
    onDelete(card.id);
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-all border border-transparent hover:border-slate-300 dark:hover:border-gray-600"
    >
        {card.coverImageUrl && (
            <img src={card.coverImageUrl} alt={card.title} className="w-full h-32 object-cover rounded-t-lg" />
        )}
        <div className="p-3">
            <p className="text-slate-800 dark:text-slate-100 text-sm">{card.title}</p>
            <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                    <DueDateDisplay dueDate={card.dueDate} isComplete={card.dueDateComplete} />
                    {card.comments && card.comments.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400" title={`${card.comments.length} comments`}>
                            💬
                            {card.comments.length}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <ArtistAvatar artist={card.assignedArtist} />
                    <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-opacity">
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card;
