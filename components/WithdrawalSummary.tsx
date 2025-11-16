

import React, { useMemo, useState } from 'react';
import type { ProjectType, WithdrawalSummaryDataType, ProjectStatus, WithdrawalDraftType, SubscriptionPaymentType } from '../types';
import { CalculatorIcon, CheckCircleIcon, ClockIcon } from './Icons';

interface WithdrawalSummaryProps {
  projects: ProjectType[];
  withdrawalHistory: WithdrawalSummaryDataType[];
  subscriptionPayments: SubscriptionPaymentType[];
  currentDraft: WithdrawalDraftType;
  updateDraft: (data: WithdrawalDraftType) => void;
  saveWithdrawal: (projectIdsToWithdraw: string[], subscriptionIdsToWithdraw: string[]) => void;
}

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const formatPkr = (amount: number) => `Rs ${new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount)}`;
const formatDate = (isoDate: string): string => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
};
const SummaryRow: React.FC<{ label: string; value: string; isBold?: boolean; className?: string }> = ({ label, value, isBold, className='' }) => (
    <div className={`flex justify-between items-center py-2 ${isBold ? 'font-bold text-slate-800 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'} ${className}`}>
        <span>{label}</span>
        <span className="font-mono">{value}</span>
    </div>
);

// --- MODALS ---

const SubscriptionCostCalculatorModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    subscriptionPayments: SubscriptionPaymentType[];
    withdrawalHistory: WithdrawalSummaryDataType[];
    onApply: (total: number, selectedIds: string[]) => void;
}> = ({ isOpen, onClose, subscriptionPayments, withdrawalHistory, onApply }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const availableSubscriptions = useMemo(() => {
        const allWithdrawnIds = new Set(withdrawalHistory.flatMap(wh => wh.withdrawnSubscriptionIds));
        return subscriptionPayments.filter(p => !allWithdrawnIds.has(p.id));
    }, [subscriptionPayments, withdrawalHistory]);

    if (!isOpen) return null;

    const handleToggle = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
    };

    const handleApply = () => {
        const total = availableSubscriptions
            .filter(p => selectedIds.includes(p.id))
            .reduce((sum, p) => sum + p.amount, 0);
        onApply(total, selectedIds);
        onClose();
    };

    const currentTotal = availableSubscriptions
        .filter(p => selectedIds.includes(p.id))
        .reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700">
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100">Calculate Subscription Costs</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Select available subscriptions to include in this withdrawal.</p>
                </div>
                <div className="p-4 space-y-2 overflow-y-auto">
                    {availableSubscriptions.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 rounded-lg">
                            <label className="flex items-center gap-3 cursor-pointer w-full">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(p.id)}
                                    onChange={() => handleToggle(p.id)}
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-transparent"
                                />
                                <div className="flex-grow">
                                    <div className="font-semibold">{p.serviceName}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{formatDate(p.date)}</div>
                                </div>
                                <span className="font-mono text-sm">{formatPkr(p.amount)}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-300 dark:border-gray-700 mt-auto flex justify-between items-center bg-slate-200/50 dark:bg-gray-800/50">
                    <div className="text-lg">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Selected Total: </span>
                        <span className="font-bold font-mono text-slate-900 dark:text-slate-100">{formatPkr(currentTotal)}</span>
                    </div>
                    <button onClick={handleApply} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                        Apply Total
                    </button>
                </div>
            </div>
        </div>
    );
};

const ArtistPaymentCalculatorModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    projects: ProjectType[];
    initialSelectedProjectIds: string[];
    onApply: (total: number) => void;
}> = ({ isOpen, onClose, projects, onApply, initialSelectedProjectIds }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedProjectIds);
    
    const projectsWithCost = useMemo(() => {
        return projects.filter(p => p.artistCost > 0 && !p.isWithdrawn);
    }, [projects]);
    
    if (!isOpen) return null;

    const handleToggle = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
    };

    const handleApply = () => {
        const total = projectsWithCost
            .filter(p => selectedIds.includes(p.id))
            .reduce((sum, p) => sum + p.artistCost, 0);
        onApply(total);
        onClose();
    };

    const currentTotal = projectsWithCost
        .filter(p => selectedIds.includes(p.id))
        .reduce((sum, p) => sum + p.artistCost, 0);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700">
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100">Calculate Artist Payments</h2>
                </div>
                <div className="p-4 space-y-2 overflow-y-auto">
                    {projectsWithCost.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 rounded-lg">
                            <label className="flex items-center gap-3 cursor-pointer w-full">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(p.id)}
                                    onChange={() => handleToggle(p.id)}
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-transparent"
                                />
                                <div className="flex-grow">
                                    <div className="font-semibold">{p.clientName}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{formatDate(p.date)}</div>
                                </div>
                                <span className="font-mono text-sm">{formatPkr(p.artistCost)}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-300 dark:border-gray-700 mt-auto flex justify-between items-center bg-slate-200/50 dark:bg-gray-800/50">
                    <div className="text-lg">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Selected Total: </span>
                        <span className="font-bold font-mono text-slate-900 dark:text-slate-100">{formatPkr(currentTotal)}</span>
                    </div>
                    <button onClick={handleApply} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                        Apply Total
                    </button>
                </div>
            </div>
        </div>
    );
};

const ConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    calculations: any;
}> = ({ isOpen, onClose, onConfirm, calculations }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700 text-center">
                    <CheckCircleIcon className="h-12 w-12 mx-auto text-emerald-500" />
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100 mt-2">Confirm Withdrawal</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Please review the details before saving.</p>
                </div>
                <div className="p-4 space-y-2">
                    <SummaryRow label="Total Withdrawn (USD)" value={formatCurrency(calculations.totalWithdrawnUSD)} />
                    <SummaryRow label="Total PKR Received" value={formatPkr(calculations.totalPkrReceived)} />
                    <SummaryRow label="Total Expenses (PKR)" value={formatPkr(calculations.totalExpenses)} />
                    <SummaryRow label="NET PROFIT (PKR)" value={formatPkr(calculations.netAmount)} isBold className="text-lg pt-4 border-t border-slate-300 dark:border-gray-700" />
                </div>
                 <div className="p-4 border-t border-slate-300 dark:border-gray-700 bg-slate-200/50 dark:bg-gray-800/50">
                    <h3 className="font-semibold text-center text-slate-700 dark:text-slate-300 mb-2">Partner Shares</h3>
                    <SummaryRow label="Hassan Share" value={formatPkr(calculations.partnerShare)} />
                    <SummaryRow label="Hasnain Share" value={formatPkr(calculations.partnerShare)} />
                    <SummaryRow label="Riyan Share" value={formatPkr(calculations.partnerShare)} />
                </div>
                <div className="p-4 flex gap-4">
                    <button onClick={onClose} className="w-full bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-800 dark:text-slate-200 font-semibold py-2 rounded-md transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition-colors">
                        Confirm & Save
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- TABS ---

const NewWithdrawalTab: React.FC<WithdrawalSummaryProps & { selectedProjectIds: string[], setSelectedProjectIds: (ids: string[]) => void }> = ({
    projects, currentDraft, updateDraft, saveWithdrawal, selectedProjectIds, setSelectedProjectIds, subscriptionPayments, withdrawalHistory
}) => {
    const [isArtistCalculatorOpen, setIsArtistCalculatorOpen] = useState(false);
    const [isSubCalculatorOpen, setIsSubCalculatorOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedSubscriptionIdsForDraft, setSelectedSubscriptionIdsForDraft] = useState<string[]>([]);


    const projectsForCalculation = useMemo(() => projects.filter(p => selectedProjectIds.includes(p.id)), [projects, selectedProjectIds]);
    const availableProjectsForSelection = useMemo(() => projects.filter(p => !p.isWithdrawn), [projects]);

    const calculations = useMemo(() => {
        const { exchangeRate, subscriptionCost, totalArtistPaymentsPKR } = currentDraft;
        const totalWithdrawnUSD = projectsForCalculation.reduce((sum, p) => sum + p.afterDeduction, 0);
        const totalPkrReceived = totalWithdrawnUSD * exchangeRate;
        const managementShare = totalPkrReceived * 0.10;
        const totalExpenses = subscriptionCost + totalArtistPaymentsPKR + managementShare;
        const netAmount = totalPkrReceived - totalExpenses;
        const partnerShare = netAmount / 3;

        return { totalWithdrawnUSD, totalPkrReceived, managementShare, totalExpenses, netAmount, partnerShare };
    }, [projectsForCalculation, currentDraft]);

    const handleDetailsChange = (field: keyof WithdrawalDraftType, value: any) => {
        updateDraft({ ...currentDraft, [field]: value });
    };

    const handleNotesChange = (section: keyof typeof currentDraft.notes, value: string) => {
        updateDraft({ ...currentDraft, notes: { ...currentDraft.notes, [section]: value } });
    };

    const handleSelectionChange = (projectId: string) => {
        const newSelectedIds = selectedProjectIds.includes(projectId)
            ? selectedProjectIds.filter(id => id !== projectId)
            : [...selectedProjectIds, projectId];

        setSelectedProjectIds(newSelectedIds);

        const totalArtistCost = projects
            .filter(p => newSelectedIds.includes(p.id))
            .reduce((sum, p) => sum + p.artistCost, 0);
        updateDraft({ ...currentDraft, totalArtistPaymentsPKR: totalArtistCost });
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedIds = e.target.checked ? availableProjectsForSelection.map(p => p.id) : [];
        setSelectedProjectIds(newSelectedIds);

        const totalArtistCost = projects
            .filter(p => newSelectedIds.includes(p.id))
            .reduce((sum, p) => sum + p.artistCost, 0);
        updateDraft({ ...currentDraft, totalArtistPaymentsPKR: totalArtistCost });
    };
    
    const handleSave = () => {
        saveWithdrawal(selectedProjectIds, selectedSubscriptionIdsForDraft);
        setConfirmModalOpen(false);
        setSelectedProjectIds([]);
        setSelectedSubscriptionIdsForDraft([]);
    }

    const thClasses = "p-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider";
    const tdClasses = "p-3 whitespace-nowrap text-sm";
    const statusBg = (status: ProjectStatus) => ({
        'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
        'In Progress': 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
        'Cancelled': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'Refunded': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    }[status]);

    return (
        <>
            <ArtistPaymentCalculatorModal isOpen={isArtistCalculatorOpen} onClose={() => setIsArtistCalculatorOpen(false)} projects={projects} initialSelectedProjectIds={selectedProjectIds} onApply={(total) => handleDetailsChange('totalArtistPaymentsPKR', total)} />
            <SubscriptionCostCalculatorModal isOpen={isSubCalculatorOpen} onClose={() => setIsSubCalculatorOpen(false)} subscriptionPayments={subscriptionPayments} withdrawalHistory={withdrawalHistory} onApply={(total, selectedIds) => { handleDetailsChange('subscriptionCost', total); setSelectedSubscriptionIdsForDraft(selectedIds); }} />
            <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)} onConfirm={handleSave} calculations={calculations} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-gray-700 space-y-4 divide-y divide-slate-200 dark:divide-gray-700">
                        {/* Settings */}
                        <div>
                            <h3 className="font-sans font-bold text-slate-800 dark:text-slate-100 mb-2">Settings</h3>
                            <div className="text-slate-700 dark:text-slate-300">
                                <label htmlFor="exchangeRate" className="flex justify-between items-center py-2"><span>Exchange Rate (PKR/USD)</span></label>
                                <input id="exchangeRate" type="number" value={currentDraft.exchangeRate} onChange={(e) => handleDetailsChange('exchangeRate', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-1 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                             <div className="text-slate-700 dark:text-slate-300 mt-2">
                                <label htmlFor="subscriptionCost" className="flex justify-between items-center py-2"><span>Subscription Cost (PKR)</span></label>
                                <div className="flex items-center gap-1">
                                    <input id="subscriptionCost" type="number" value={currentDraft.subscriptionCost} onChange={(e) => handleDetailsChange('subscriptionCost', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-1 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <button onClick={() => setIsSubCalculatorOpen(true)} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-md transition-colors" aria-label="Calculate subscription costs"><CalculatorIcon /></button>
                                </div>
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 mt-2">
                                <label htmlFor="artist-payments" className="flex justify-between items-center py-2"><span>Total Artist Payments (PKR)</span></label>
                                <div className="flex items-center gap-1">
                                    <input id="artist-payments" type="number" value={currentDraft.totalArtistPaymentsPKR} onChange={(e) => handleDetailsChange('totalArtistPaymentsPKR', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-1 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <button onClick={() => setIsArtistCalculatorOpen(true)} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-md transition-colors" aria-label="Calculate artist payments"><CalculatorIcon /></button>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="pt-4">
                            <h3 className="font-sans font-bold text-slate-800 dark:text-slate-100 mb-2">Summary</h3>
                            <SummaryRow label="Total Withdrawn (USD)" value={formatCurrency(calculations.totalWithdrawnUSD)} />
                            <SummaryRow label="Total PKR Received" value={formatPkr(calculations.totalPkrReceived)} />
                            <SummaryRow label="10% Mngmt Share" value={formatPkr(calculations.managementShare)} />
                            <SummaryRow label="Total Expenses" value={formatPkr(calculations.totalExpenses)} />
                            <SummaryRow label="NET PROFIT" value={formatPkr(calculations.netAmount)} isBold className="text-lg pt-2 border-t mt-2 dark:border-gray-700" />
                        </div>

                        {/* Distribution */}
                        <div className="pt-4">
                            <h3 className="font-sans font-bold text-slate-800 dark:text-slate-100 mb-2">Partner Shares</h3>
                            <SummaryRow label="Hassan Share" value={formatPkr(calculations.partnerShare)} />
                            <SummaryRow label="Hasnain Share" value={formatPkr(calculations.partnerShare)} />
                            <SummaryRow label="Riyan Share" value={formatPkr(calculations.partnerShare)} />
                        </div>

                        {/* Notes */}
                        <div className="pt-4">
                             <label htmlFor="notes" className="font-sans font-bold text-slate-800 dark:text-slate-100 mb-2">Notes</label>
                            <textarea id="notes" value={currentDraft.notes.profit} onChange={e => handleNotesChange('profit', e.target.value)} rows={4} className="w-full bg-slate-50/50 dark:bg-gray-700/50 text-slate-800 dark:text-slate-200 rounded-md p-2 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <button onClick={() => setConfirmModalOpen(true)} disabled={selectedProjectIds.length === 0} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors disabled:bg-slate-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Preview & Save Withdrawal
                    </button>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Project Selection for Withdrawal Calculation</h2>
                    <div className="overflow-x-auto max-h-[70vh]">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                            <thead className="bg-slate-100 dark:bg-gray-900/50 sticky top-0">
                                <tr>
                                    <th className={`${thClasses} w-10`}><input type="checkbox" className="h-4 w-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" checked={availableProjectsForSelection.length > 0 && selectedProjectIds.length === availableProjectsForSelection.length} onChange={handleSelectAll} aria-label="Select all available projects" /></th>
                                    <th className={thClasses}>Client</th>
                                    <th className={thClasses}>Status</th>
                                    <th className={thClasses}>Payment (USD)</th>
                                    <th className={thClasses}>Date</th>
                                    <th className={thClasses}>Conversion (PKR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                                {projects.map((p) => (
                                    <tr key={p.id} className={p.isWithdrawn ? 'bg-slate-200/70 dark:bg-gray-800/70 text-gray-400 dark:text-gray-500' : `${selectedProjectIds.includes(p.id) ? 'bg-slate-100 dark:bg-gray-900/30' : ''} hover:bg-slate-50 dark:hover:bg-gray-700/50 text-slate-700 dark:text-slate-300`}>
                                        <td className={tdClasses}><input type="checkbox" className="h-4 w-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed" checked={selectedProjectIds.includes(p.id)} disabled={p.isWithdrawn} onChange={() => handleSelectionChange(p.id)} /></td>
                                        <td className={`${tdClasses} ${p.isWithdrawn ? 'line-through' : ''}`}>{p.clientName}</td>
                                        <td className={tdClasses}><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.isWithdrawn ? 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400' : statusBg(p.projectStatus)}`}>{p.projectStatus}</span></td>
                                        <td className={`${tdClasses} ${p.isWithdrawn ? 'line-through' : ''}`}>{formatCurrency(p.afterDeduction)}</td>
                                        <td className={`${tdClasses} font-mono ${p.isWithdrawn ? 'line-through' : ''}`}>{formatDate(p.date)}</td>
                                        <td className={`${tdClasses} ${p.isWithdrawn ? 'line-through' : ''}`}>{formatPkr(p.afterDeduction * currentDraft.exchangeRate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-100 dark:bg-gray-900/50 sticky bottom-0">
                                <tr className="font-bold">
                                    <td colSpan={3} className={`${tdClasses} text-right text-slate-700 dark:text-slate-300`}>Selected Totals</td>
                                    <td className={`${tdClasses} text-slate-700 dark:text-slate-300 font-mono`}>{formatCurrency(calculations.totalWithdrawnUSD)}</td>
                                    <td className={tdClasses}></td>
                                    <td className={`${tdClasses} text-slate-700 dark:text-slate-300 font-mono`}>{formatPkr(calculations.totalPkrReceived)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const HistoryTab: React.FC<{ withdrawalHistory: WithdrawalSummaryDataType[], projects: ProjectType[] }> = ({ withdrawalHistory, projects }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    if (withdrawalHistory.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-slate-200 dark:border-gray-700 text-center text-slate-600 dark:text-slate-400">
                <ClockIcon className="h-12 w-12 mx-auto text-slate-400 dark:text-slate-500" />
                <h3 className="font-sans text-xl font-bold mt-4">No Withdrawal History</h3>
                <p>Once you save a withdrawal, it will appear here.</p>
            </div>
        )
    }

    const findProject = (id: string) => projects.find(p => p.id === id);

    return (
        <div className="space-y-4">
            {withdrawalHistory.map(withdrawal => {
                const projectsInWithdrawal = withdrawal.withdrawnProjectIds.map(findProject).filter(Boolean) as ProjectType[];
                const totalWithdrawnUSD = projectsInWithdrawal.reduce((sum, p) => sum + p.afterDeduction, 0);
                const totalPkrReceived = totalWithdrawnUSD * withdrawal.exchangeRate;
                const managementShare = totalPkrReceived * 0.10;
                const totalExpenses = withdrawal.subscriptionCost + withdrawal.totalArtistPaymentsPKR + managementShare;
                const netAmount = totalPkrReceived - totalExpenses;
                
                const isExpanded = expandedId === withdrawal.id;

                return (
                    <div key={withdrawal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setExpandedId(isExpanded ? null : withdrawal.id)} className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-sans font-bold text-lg text-slate-800 dark:text-slate-100">Withdrawal - {formatDate(withdrawal.date)}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Net Profit: <span className="font-semibold text-emerald-700 dark:text-emerald-400">{formatPkr(netAmount)}</span></p>
                                </div>
                                <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                            </div>
                        </button>
                        {isExpanded && (
                            <div className="p-4 border-t border-slate-200 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-900/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold mb-2">Summary</h4>
                                        <SummaryRow label="Total Withdrawn (USD)" value={formatCurrency(totalWithdrawnUSD)} />
                                        <SummaryRow label="Exchange Rate" value={`${withdrawal.exchangeRate} PKR/USD`} />
                                        <SummaryRow label="Total PKR Received" value={formatPkr(totalPkrReceived)} />
                                        <SummaryRow label="Subscription Cost" value={formatPkr(withdrawal.subscriptionCost)} />
                                        <SummaryRow label="Artist Payments" value={formatPkr(withdrawal.totalArtistPaymentsPKR)} />
                                        <SummaryRow label="10% Mngmt Share" value={formatPkr(managementShare)} />
                                        <SummaryRow label="NET PROFIT" value={formatPkr(netAmount)} isBold className="border-t mt-2 pt-2 dark:border-gray-700"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Projects Included ({projectsInWithdrawal.length})</h4>
                                        <div className="max-h-60 overflow-y-auto border border-slate-200 dark:border-gray-700/50 rounded-lg">
                                            <table className="min-w-full text-sm">
                                                <thead className="bg-slate-100 dark:bg-gray-700/50 sticky top-0">
                                                    <tr>
                                                        <th className="p-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Client</th>
                                                        <th className="p-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Status</th>
                                                        <th className="p-2 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Payment (USD)</th>
                                                        <th className="p-2 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Conversion (PKR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200 dark:divide-gray-600">
                                                    {projectsInWithdrawal.map(p => (
                                                        p && <tr key={p.id}>
                                                            <td className="p-2 whitespace-nowrap text-slate-700 dark:text-slate-300">{p.clientName}</td>
                                                            <td className="p-2 whitespace-nowrap text-slate-700 dark:text-slate-300">{p.projectStatus}</td>
                                                            <td className="p-2 text-right font-mono whitespace-nowrap text-slate-700 dark:text-slate-300">{formatCurrency(p.afterDeduction)}</td>
                                                            <td className="p-2 text-right font-mono whitespace-nowrap text-slate-700 dark:text-slate-300">{formatPkr(p.afterDeduction * withdrawal.exchangeRate)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const WithdrawalSummary: React.FC<WithdrawalSummaryProps> = (props) => {
    const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
    const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
    
    const tabClasses = (tab: 'new' | 'history') =>
      `px-4 py-2 rounded-md text-sm font-semibold transition-colors w-40 text-center ${
        activeTab === tab
          ? 'bg-indigo-600 text-white shadow-inner'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-gray-700'
      }`;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-gray-900/50 rounded-lg max-w-min mx-auto">
                <button onClick={() => setActiveTab('new')} className={tabClasses('new')}>
                    New Withdrawal
                </button>
                <button onClick={() => setActiveTab('history')} className={tabClasses('history')}>
                    History
                </button>
            </div>
            <div>
                {activeTab === 'new' ? (
                    <NewWithdrawalTab {...props} selectedProjectIds={selectedProjectIds} setSelectedProjectIds={setSelectedProjectIds} />
                ) : (
                    <HistoryTab withdrawalHistory={props.withdrawalHistory} projects={props.projects} />
                )}
            </div>
        </div>
    );
};

export default WithdrawalSummary;