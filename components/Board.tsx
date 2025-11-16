
import React, { useState } from 'react';
import type { ColumnType, CardType, GoLoginProfileType } from '../types';
import Column from './Column';
import { PlusIcon } from './Icons';
import CardDetailModal from './CardDetailModal';

interface BoardProps {
  columns: ColumnType[];
  goLoginProfiles: GoLoginProfileType[];
  addColumn: (title: string) => void;
  deleteColumn: (columnId: string) => void;
  addCard: (columnId: string, title: string) => void;
  updateCard: (card: CardType) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, sourceColumnId: string, destColumnId: string) => void;
}

const AddColumnForm: React.FC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
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
        className="flex items-center gap-2 w-72 min-w-[18rem] p-2 text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-gray-800/50 rounded-lg hover:bg-slate-300/70 dark:hover:bg-gray-700/70 transition-colors border border-slate-300/50 dark:border-gray-700/50"
      >
        <PlusIcon />
        Add another list
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-72 min-w-[18rem] p-2 bg-slate-200 dark:bg-gray-800 rounded-lg space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter list title..."
        autoFocus
        className="w-full p-2 bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-100 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex items-center gap-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors">
          Add List
        </button>
        <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 rounded-md">
          Cancel
        </button>
      </div>
    </form>
  );
};


const Board: React.FC<BoardProps> = ({ columns, goLoginProfiles, addColumn, deleteColumn, addCard, updateCard, deleteCard, moveCard }) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
  };
  
  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleSaveCard = (updatedCard: CardType) => {
    if (selectedCard) {
      updateCard(updatedCard);
      setSelectedCard(null);
    }
  };

  return (
    <>
      {selectedCard && (
        <CardDetailModal 
          card={selectedCard}
          goLoginProfiles={goLoginProfiles}
          onClose={handleCloseModal}
          onSave={handleSaveCard}
        />
      )}
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Column 
            key={column.id} 
            column={column}
            addCard={addCard}
            deleteCard={deleteCard}
            moveCard={moveCard}
            deleteColumn={deleteColumn}
            onCardClick={handleCardClick}
          />
        ))}
        <AddColumnForm onAdd={addColumn} />
      </div>
    </>
  );
};

export default Board;
