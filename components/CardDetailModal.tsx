
import React, { useState, useRef, useMemo } from 'react';
import type { CardType, PaymentType, AttachmentType, GoLoginProfileType, CommentType } from '../types';
import { ARTISTS, SALES_REPS } from '../constants';
import { CurrencyDollarIcon, PaperclipIcon, PlusIcon, TrashIcon, XIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon } from './Icons';

interface CardDetailModalProps {
    card: CardType;
    goLoginProfiles: GoLoginProfileType[];
    onClose: () => void;
    onSave: (updatedCard: CardType) => void;
}

const formatDate = (isoDate: string) => new Date(isoDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const formatDateTime = (isoDate: string) => new Date(isoDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const RichTextEditor: React.FC<{ value: string; onChange: (value: string) => void; onFileAttach: (file: File) => void }> = ({ value, onChange, onFileAttach }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCommand = (command: string) => {
        document.execCommand(command, false);
        editorRef.current?.focus();
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        onChange(e.currentTarget.innerHTML);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            onFileAttach(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-slate-300 dark:border-gray-600">
                <div className="p-2 border-b border-slate-200 dark:border-gray-600 flex items-center gap-1">
                    <button type="button" onClick={() => handleCommand('bold')} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 rounded"><BoldIcon className="h-4 w-4" /></button>
                    <button type="button" onClick={() => handleCommand('italic')} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 rounded"><ItalicIcon className="h-4 w-4" /></button>
                    <button type="button" onClick={() => handleCommand('underline')} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 rounded"><UnderlineIcon className="h-4 w-4" /></button>
                    <button type="button" onClick={() => handleCommand('strikeThrough')} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 rounded"><StrikethroughIcon className="h-4 w-4" /></button>
                    <button type="button" onClick={handleFileClick} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 rounded ml-auto"><PaperclipIcon className="h-4 w-4" /></button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                </div>
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    dangerouslySetInnerHTML={{ __html: value }}
                    className="p-3 min-h-[80px] focus:outline-none prose prose-sm dark:prose-invert max-w-none"
                />
            </div>
        </div>
    );
};

const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, goLoginProfiles, onClose, onSave }) => {
    const [editedCard, setEditedCard] = useState<CardType>({ ...card });
    
    const [newCommentContent, setNewCommentContent] = useState('');
    const [newCommentAttachments, setNewCommentAttachments] = useState<AttachmentType[]>([]);

    const handleFieldChange = (field: keyof CardType, value: any) => {
        const newCard = { ...editedCard, [field]: value };
        if (field === 'gologinProfile') {
            newCard.discordHandle = '';
        }
        setEditedCard(newCard);
    };
    
    // --- Payment Handlers ---
    const [newPayment, setNewPayment] = useState<Omit<PaymentType, 'id'>>({ amount: 0, date: new Date().toISOString().split('T')[0], notes: '' });
    
    const handleAddPayment = () => {
        if(newPayment.amount > 0) {
            const paymentToAdd: PaymentType = { id: `pay-${Date.now()}`, ...newPayment };
            setEditedCard(prev => ({...prev, payments: [...prev.payments, paymentToAdd]}));
            setNewPayment({ amount: 0, date: new Date().toISOString().split('T')[0], notes: '' });
        }
    }
    const handleDeletePayment = (paymentId: string) => {
        setEditedCard(prev => ({...prev, payments: prev.payments.filter(p => p.id !== paymentId)}));
    }

    // --- Comment Handlers ---
    const handleFileAttachToComment = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const url = event.target?.result as string;
            const newAttachment: AttachmentType = {
                id: `attach-${Date.now()}`,
                name: file.name,
                url,
                type: file.type.startsWith('image/') ? 'image' : 'document',
                addedAt: new Date().toISOString()
            };
            setNewCommentAttachments(prev => [...prev, newAttachment]);
        };
        reader.readAsDataURL(file);
    };

    const handleAddComment = () => {
        if (newCommentContent.trim() === '' && newCommentAttachments.length === 0) return;

        const newComment: CommentType = {
            id: `comment-${Date.now()}`,
            author: 'Admin', // In a real app, this would be the logged-in user
            content: newCommentContent,
            timestamp: new Date().toISOString(),
            attachments: newCommentAttachments,
        };
        
        setEditedCard(prev => ({...prev, comments: [newComment, ...prev.comments]}));

        // Reset composer
        setNewCommentContent('');
        setNewCommentAttachments([]);
    };

    const setAsCover = (url: string) => {
        handleFieldChange('coverImageUrl', url);
    }
    
    const availableDiscordHandles = useMemo(() => {
        if (!editedCard.gologinProfile) return [];
        const profile = goLoginProfiles.find(p => p.gologinProfileNumber === editedCard.gologinProfile);
        return profile ? profile.accounts.map(acc => acc.discordId) : [];
    }, [editedCard.gologinProfile, goLoginProfiles]);

    const handleSave = () => {
        onSave(editedCard);
    };

    const inputClasses = "w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-2 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const labelClasses = "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1";
    const sectionHeaderClasses = "font-sans text-lg font-bold text-slate-700 dark:text-slate-200 mb-2";

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700 flex justify-between items-center">
                    <input 
                        type="text" 
                        value={editedCard.title} 
                        onChange={e => handleFieldChange('title', e.target.value)}
                        className={`${inputClasses} text-xl font-bold font-sans`}
                    />
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full"><XIcon className="h-6 w-6"/></button>
                </div>

                <div className="p-6 grid grid-cols-3 gap-8 overflow-y-auto">
                    {/* Main Content */}
                    <div className="col-span-2 space-y-6">
                        <div>
                            <h3 className={sectionHeaderClasses}>Description</h3>
                            <textarea 
                                value={editedCard.description}
                                onChange={e => handleFieldChange('description', e.target.value)}
                                placeholder="Add a more detailed description..."
                                rows={4}
                                className={inputClasses}
                            />
                        </div>
                        
                        {/* Comments & Activity */}
                        <div className="space-y-4">
                            <h3 className={sectionHeaderClasses}>Activity &amp; Comments</h3>
                            <div className="space-y-4">
                               {editedCard.comments.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(comment => (
                                   <div key={comment.id} className="flex gap-3">
                                       <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center text-sm font-bold mt-1 shrink-0">
                                           {comment.author === 'system' ? '🤖' : comment.author.slice(0, 2)}
                                       </div>
                                       <div className="flex-1">
                                           <div className="flex items-center gap-2">
                                               <span className="font-semibold">{comment.author}</span>
                                               <span className="text-xs text-slate-500 dark:text-slate-400">{formatDateTime(comment.timestamp)}</span>
                                           </div>
                                           <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: comment.content }} />
                                            {comment.attachments.length > 0 && (
                                                <div className="mt-2 space-y-2">
                                                    {comment.attachments.map(att => (
                                                        <div key={att.id} className="flex items-center justify-between p-2 bg-slate-200/50 dark:bg-gray-800/50 rounded-lg">
                                                            <div className="flex items-center gap-2 overflow-hidden">
                                                                {att.type === 'image' && <img src={att.url} alt={att.name} className="w-10 h-10 object-cover rounded"/>}
                                                                <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">{att.name}</a>
                                                            </div>
                                                            {att.type === 'image' && <button onClick={() => setAsCover(att.url)} className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-md hover:bg-slate-50 dark:hover:bg-gray-600 shrink-0">Set as Cover</button>}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                       </div>
                                   </div>
                               ))}
                            </div>
                             {/* New Comment Form */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-bold mt-1 shrink-0">A</div>
                                <div className="flex-1">
                                    <RichTextEditor value={newCommentContent} onChange={setNewCommentContent} onFileAttach={handleFileAttachToComment} />
                                    {newCommentAttachments.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {newCommentAttachments.map(att => (
                                                <div key={att.id} className="flex items-center justify-between p-2 bg-slate-200/50 dark:bg-gray-800/50 rounded-lg">
                                                    <span className="text-sm truncate">{att.name}</span>
                                                    <button onClick={() => setNewCommentAttachments(prev => prev.filter(a => a.id !== att.id))}><XIcon className="h-3 w-3"/></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <button onClick={handleAddComment} className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-1 space-y-4">
                       <div className="bg-slate-200/50 dark:bg-gray-800/50 p-3 rounded-lg space-y-2">
                         <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-2">Assignment</h4>
                         <div>
                            <label className={labelClasses}>GoLogin Profile</label>
                            <select value={editedCard.gologinProfile || ''} onChange={e => handleFieldChange('gologinProfile', e.target.value)} className={inputClasses}>
                                <option value="">Select profile...</option>
                                {goLoginProfiles.map(p => <option key={p.id} value={p.gologinProfileNumber}>{p.gologinProfileNumber}</option>)}
                            </select>
                         </div>
                         <div>
                             <label className={labelClasses}>Discord Handle</label>
                            <select value={editedCard.discordHandle || ''} onChange={e => handleFieldChange('discordHandle', e.target.value)} className={inputClasses} disabled={!editedCard.gologinProfile || availableDiscordHandles.length === 0}>
                                <option value="">Select handle...</option>
                                {availableDiscordHandles.map(handle => <option key={handle} value={handle}>{handle}</option>)}
                            </select>
                         </div>
                         <div>
                            <label className={labelClasses}>Assigned Artist</label>
                            <select value={editedCard.assignedArtist || ''} onChange={e => handleFieldChange('assignedArtist', e.target.value)} className={inputClasses}>
                               <option value="">Unassigned</option>
                               {ARTISTS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                         </div>
                       </div>
                        <div className="bg-slate-200/50 dark:bg-gray-800/50 p-3 rounded-lg space-y-2">
                            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-2">Payments</h4>
                             {editedCard.payments.map(p => (
                                <div key={p.id} className="p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-semibold">{formatCurrency(p.amount)}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">{formatDate(p.date)}</span>
                                        </div>
                                        <button onClick={() => handleDeletePayment(p.id)} className="text-red-500 hover:text-red-700"><TrashIcon/></button>
                                    </div>
                                    {p.notes && <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">"{p.notes}"</p>}
                                </div>
                            ))}
                            <div className="pt-2 border-t border-slate-300/50 dark:border-gray-700/50 space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Date</label>
                                        <input type="date" value={newPayment.date} onChange={e => setNewPayment(p => ({...p, date: e.target.value}))} className={inputClasses} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Amount ($)</label>
                                        <input type="number" placeholder="Amount" value={newPayment.amount || ''} onChange={e => setNewPayment(p => ({...p, amount: parseFloat(e.target.value) || 0}))} className={inputClasses} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Notes</label>
                                    <input type="text" placeholder="e.g. 50% advance" value={newPayment.notes || ''} onChange={e => setNewPayment(p => ({...p, notes: e.target.value}))} className={inputClasses} />
                                </div>
                               <button onClick={handleAddPayment} className="w-full p-2 bg-slate-600 dark:bg-gray-600 text-white rounded-md hover:bg-slate-700 dark:hover:bg-gray-500 h-10 flex items-center justify-center gap-2">
                                <PlusIcon className="h-4 w-4" /> Add Payment
                               </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 mt-auto border-t border-slate-300 dark:border-gray-700 bg-slate-200/50 dark:bg-gray-800/50">
                    <button onClick={handleSave} className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors font-bold text-lg text-white">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardDetailModal;
