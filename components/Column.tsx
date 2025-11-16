
import React, { useState } from 'react';
import type { ColumnType, CardType } from '../types';
import Card from './Card';
import { PlusIcon, TrashIcon } from './Icons';

interface ColumnProps {
  column: ColumnType;
  addCard: (columnId: string, title: string) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, sourceColumnId: string, destColumnId: string) => void;
  deleteColumn: (columnId: string) => void;
  onCardClick: (card: CardType) => void;
}

const AddCardForm: React.FC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center w-full p-2 mt-2 text-slate-500 dark:text-slate-400 hover:bg-slate-300/50 dark:hover:bg-gray-700/50 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
      >
        <PlusIcon />
        <span className="ml-2">Add a card</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title for this card..."
        autoFocus
        className="w-full p-2 bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-100 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={3}
      />
      <div className="flex items-center gap-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors">
          Add Card
        </button>
        <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 rounded-md">
          Cancel
        </button>
      </div>
    </form>
  );
};


const Column: React.FC<ColumnProps> = ({ column, addCard, deleteCard, moveCard, deleteColumn, onCardClick }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
        const cardInfo = JSON.parse(e.dataTransfer.getData('cardInfo'));
        if(cardInfo.sourceColumnId !== column.id) {
            moveCard(cardInfo.cardId, cardInfo.sourceColumnId, column.id);
        }
    } catch(err) {
        console.error("Error parsing dragged data", err);
    }
  };

  return (
    <div className={`w-72 min-w-[18rem] bg-slate-200 dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 ${isDragOver ? 'ring-2 ring-indigo-500' : ''}`}>
      <div className="p-3 flex justify-between items-center border-b border-slate-300 dark:border-gray-700">
        <h2 className="font-sans font-bold text-slate-800 dark:text-slate-100">{column.title}</h2>
        <button onClick={() => deleteColumn(column.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
            <TrashIcon />
        </button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="p-2 space-y-2 min-h-[5rem] max-h-[70vh] overflow-y-auto"
      >
        {column.cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            columnId={column.id}
            onDelete={deleteCard}
            onClick={() => onCardClick(card)}
            />
        ))}
         <div className={`transition-colors duration-300 rounded-lg ${isDragOver ? 'bg-slate-300/50 dark:bg-gray-700/50 h-10' : 'h-0'}`}></div>
      </div>
      <div className="p-2 border-t border-slate-300/50 dark:border-gray-700/50">
        <AddCardForm onAdd={(title) => addCard(column.id, title)} />
      </div>
    </div>
  );
};

export default Column;
