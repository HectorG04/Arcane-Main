
import React, { useState, useMemo, Fragment } from 'react';
import type { ProjectType, SubscriptionPaymentType, ProjectStatus, PaymentMerchantType } from '../types';
import { TrashIcon, EditIcon, SaveIcon, XIcon, PlusIcon, CurrencyDollarIcon } from './Icons';
import { SALES_REPS, PAYMENT_MERCHANTS } from '../constants';

interface FinancialsProps {
  projects: ProjectType[];
  addProject: (project: Omit<ProjectType, 'id' | 'isWithdrawn'>) => void;
  updateProject: (project: ProjectType) => void;
  deleteProject: (projectId: string) => void;
  toggleProjectWithdrawal: (projectId: string) => void;
  subscriptionPayments: SubscriptionPaymentType[];
  addSubscriptionPayment: (payment: Omit<SubscriptionPaymentType, 'id'>) => void;
  updateSubscriptionPayment: (payment: SubscriptionPaymentType) => void;
  deleteSubscriptionPayment: (paymentId: string) => void;
}

const initialNewProjectState: Omit<ProjectType, 'id' | 'isWithdrawn'> = {
    clientName: '', projectType: '', profileNoId: '', projectAmount: 0, amountReceived: 0, afterDeduction: 0,
    amountRemaining: 0, salesRepName: '', date: new Date().toISOString().split('T')[0], projectStatus: 'In Progress', artistCost: 0, paymentMerchant: '',
};

const initialNewPaymentState: Omit<SubscriptionPaymentType, 'id'> = {
    serviceName: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const formatPkr = (amount: number) => `Rs ${new Intl.NumberFormat('en-PK').format(amount)}`;
const formatDate = (isoDate: string): string => {
    if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
    const date = new Date(isoDate.replace(/-/g, '/'));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
};

const AddProjectModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onAdd: (project: Omit<ProjectType, 'id' | 'isWithdrawn'>) => void;
}> = ({ isOpen, onClose, onAdd }) => {
    const [newProject, setNewProject] = useState(initialNewProjectState);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setNewProject({ ...newProject, [name]: isNumber ? parseFloat(value) || 0 : value });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newProject.clientName && newProject.salesRepName) {
            onAdd(newProject);
            setNewProject(initialNewProjectState);
            onClose();
        }
    };
    
    const projectTypeOptions = [
      'PFP', 'Headshot', 'Bustup (with BG)', 'Bustup (without BG)',
      'Half Body (with BG)', 'Half Body (without BG)',
      'Full Body (with BG)', 'Full Body (without BG)',
      'Group Art (with BG)', 'Group Art (without BG)',
    ];

    const inputClasses = "w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-2 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const labelClasses = "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1";

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100">Add New Project</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full"><XIcon className="h-5 w-5"/></button>
                </div>
                <form onSubmit={handleAdd} className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className={labelClasses}>Client Name</label>
                            <input name="clientName" value={newProject.clientName} onChange={handleChange} placeholder="e.g. John Doe" className={inputClasses} required/>
                        </div>
                        <div>
                            <label className={labelClasses}>Project Type</label>
                            <select name="projectType" value={newProject.projectType} onChange={handleChange} className={inputClasses} required>
                                <option value="" disabled>Select a type...</option>
                                {projectTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Profile No & ID</label>
                            <input name="profileNoId" value={newProject.profileNoId} onChange={handleChange} placeholder="e.g. Profile 8" className={inputClasses}/>
                        </div>
                        <div>
                            <label className={labelClasses}>Project Amount ($)</label>
                            <input type="number" name="projectAmount" value={newProject.projectAmount} onChange={handleChange} placeholder="e.g. 150" className={inputClasses}/>
                        </div>
                        <div>
                            <label className={labelClasses}>Amount Received ($)</label>
                            <input type="number" name="amountReceived" value={newProject.amountReceived} onChange={handleChange} placeholder="e.g. 75" className={inputClasses}/>
                        </div>
                        <div>
                            <label className={labelClasses}>After Deduction ($)</label>
                            <input type="number" name="afterDeduction" value={newProject.afterDeduction} onChange={handleChange} placeholder="e.g. 72.5" className={inputClasses}/>
                        </div>
                        <div>
                            <label className={labelClasses}>Amount Remaining ($)</label>
                            <input type="number" name="amountRemaining" value={newProject.amountRemaining} onChange={handleChange} placeholder="e.g. 75" className={inputClasses}/>
                        </div>
                        <div>
                            <label className={labelClasses}>Sales Rep</label>
                            <select name="salesRepName" value={newProject.salesRepName} onChange={handleChange} className={inputClasses} required>
                                <option value="" disabled>Select a Rep...</option>
                                {SALES_REPS.map(rep => <option key={rep} value={rep}>{rep}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Date</label>
                            <input type="date" name="date" value={newProject.date} onChange={handleChange} className={inputClasses}/>
                        </div>
                        <div>
                            <label className={labelClasses}>Project Status</label>
                            <select name="projectStatus" value={newProject.projectStatus} onChange={handleChange} className={inputClasses}>
                                <option>In Progress</option><option>Completed</option><option>Cancelled</option><option>Refunded</option>
                            </select>
                        </div>
                        <div>
                           <label className={labelClasses}>Payment Merchant</label>
                            <select name="paymentMerchant" value={newProject.paymentMerchant} onChange={handleChange} className={inputClasses} required>
                                <option value="" disabled>Select a Merchant...</option>
                                {PAYMENT_MERCHANTS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Artist Cost (PKR)</label>
                            <input type="number" name="artistCost" value={newProject.artistCost} onChange={handleChange} placeholder="e.g. 5000" className={inputClasses}/>
                        </div>
                    </div>
                </form>
                <div className="p-4 mt-auto border-t border-slate-300 dark:border-gray-700 bg-slate-200/50 dark:bg-gray-800/50 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-800 dark:text-slate-200 font-semibold rounded-md transition-colors">Cancel</button>
                    <button onClick={handleAdd} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors">Add Project</button>
                </div>
            </div>
        </div>
    );
}


const SubscriptionManagerModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    payments: SubscriptionPaymentType[];
    addPayment: (payment: Omit<SubscriptionPaymentType, 'id'>) => void;
    updatePayment: (payment: SubscriptionPaymentType) => void;
    deletePayment: (paymentId: string) => void;
}> = ({ isOpen, onClose, payments, addPayment, updatePayment, deletePayment }) => {
    
    const [newPayment, setNewPayment] = useState(initialNewPaymentState);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingData, setEditingData] = useState<SubscriptionPaymentType | null>(null);

    if (!isOpen) return null;

    const handleNewPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setNewPayment({ ...newPayment, [name]: type === 'number' ? parseFloat(value) || 0 : value });
    };

    const handleAddPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if(newPayment.serviceName && newPayment.amount > 0 && newPayment.date) {
            addPayment(newPayment);
            setNewPayment(initialNewPaymentState);
        }
    };
    
    const handleEditClick = (payment: SubscriptionPaymentType) => {
        setEditingId(payment.id);
        setEditingData({ ...payment });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingData(null);
    };

    const handleUpdate = () => {
        if (editingData) {
            updatePayment(editingData);
            handleCancelEdit();
        }
    };

    const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(editingData){
            const { name, value, type } = e.target;
            setEditingData({ ...editingData, [name]: type === 'number' ? parseFloat(value) || 0 : value });
        }
    };

    const inputClasses = "w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-2 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700">
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100">Manage Subscription Payments</h2>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto">
                    {/* List of payments */}
                    <div className="space-y-2">
                        {payments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(p => (
                            <div key={p.id}>
                                {editingId === p.id && editingData ? (
                                    <div className="grid grid-cols-5 gap-2 items-center p-2 bg-slate-200 dark:bg-gray-800 rounded-lg">
                                        <input name="date" type="date" value={editingData.date} onChange={handleEditingChange} className={inputClasses} />
                                        <input name="serviceName" value={editingData.serviceName} onChange={handleEditingChange} className={inputClasses} />
                                        <input name="amount" type="number" value={editingData.amount} onChange={handleEditingChange} className={`${inputClasses} col-span-1`} />
                                        <div className="col-span-2 flex items-center gap-2">
                                            <button onClick={handleUpdate} className="text-green-600 hover:text-green-700 p-2"><SaveIcon/></button>
                                            <button onClick={handleCancelEdit} className="text-slate-500 hover:text-slate-700 p-2"><XIcon/></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-5 gap-2 items-center p-2 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 rounded-lg">
                                        <span className="font-mono text-sm">{formatDate(p.date)}</span>
                                        <span className="font-semibold col-span-2">{p.serviceName}</span>
                                        <span>{formatPkr(p.amount)}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleEditClick(p)} className="text-slate-500 hover:text-slate-700"><EditIcon/></button>
                                            <button onClick={() => deletePayment(p.id)} className="text-red-500 hover:text-red-700"><TrashIcon/></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add new payment form */}
                    <form onSubmit={handleAddPayment} className="p-3 bg-slate-200 dark:bg-gray-800 rounded-lg grid grid-cols-5 gap-2 items-end">
                        <div>
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Date</label>
                            <input name="date" type="date" value={newPayment.date} onChange={handleNewPaymentChange} className={inputClasses} required />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Service Name</label>
                            <input name="serviceName" value={newPayment.serviceName} onChange={handleNewPaymentChange} className={inputClasses} placeholder="e.g. GoLogin" required />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Amount (PKR)</label>
                            <input name="amount" type="number" value={newPayment.amount} onChange={handleNewPaymentChange} className={inputClasses} placeholder="e.g. 7000" required />
                        </div>
                        <button type="submit" className="p-2 bg-indigo-600 rounded-md hover:bg-indigo-700 text-white h-10"><PlusIcon/></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Financials: React.FC<FinancialsProps> = (props) => {
    const { projects, addProject, updateProject, deleteProject, toggleProjectWithdrawal, subscriptionPayments, addSubscriptionPayment, updateSubscriptionPayment, deleteSubscriptionPayment } = props;
    
    const [filterMonth, setFilterMonth] = useState<string>('all');
    const [filterRep, setFilterRep] = useState<string>('all');
    
    // Project state
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingProjectData, setEditingProjectData] = useState<ProjectType | null>(null);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

    // Subscription Modal state
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);

    const salesRepsForFilter = ['all', ...SALES_REPS];
    const months = useMemo(() => {
        const projectMonths = projects.map(p => p.date.substring(0, 7));
        const paymentMonths = subscriptionPayments.map(p => p.date.substring(0, 7));
        const monthSet = new Set([...projectMonths, ...paymentMonths]);
        return ['all', ...Array.from(monthSet)].sort().reverse();
    }, [projects, subscriptionPayments]);

    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const monthMatch = filterMonth === 'all' || p.date.startsWith(filterMonth);
            const repMatch = filterRep === 'all' || p.salesRepName === filterRep;
            return monthMatch && repMatch;
        });
    }, [projects, filterMonth, filterRep]);

    const filteredSubscriptionPayments = useMemo(() => {
        return subscriptionPayments.filter(p => {
            return filterMonth === 'all' || p.date.startsWith(filterMonth);
        });
    }, [subscriptionPayments, filterMonth]);
    
    const totalSubscriptionCost = useMemo(() => {
        return filteredSubscriptionPayments.reduce((sum, p) => sum + p.amount, 0);
    }, [filteredSubscriptionPayments]);

    const overview = useMemo(() => {
        const data: { [key: string]: number } = {
            totalAmount: 0, totalReceived: 0, totalAfterDeduction: 0,
            remainingCollection: 0, withdrawnAmount: 0, remainingWithdraw: 0
        };
        for (const p of filteredProjects) {
            data.totalAmount += p.projectAmount;
            data.totalReceived += p.amountReceived;
            data.totalAfterDeduction += p.afterDeduction;
            data.remainingCollection += p.amountRemaining;
            if (p.isWithdrawn) data.withdrawnAmount += p.afterDeduction;
        }
        data.remainingWithdraw = data.totalAfterDeduction - data.withdrawnAmount;
        return data;
    }, [filteredProjects]);
    
    // Project handlers
    const handleEditProjectClick = (project: ProjectType) => {
        setEditingProjectId(project.id);
        setEditingProjectData({ ...project });
    };
    const handleCancelEditProject = () => {
        setEditingProjectId(null);
        setEditingProjectData(null);
    };
    const handleUpdateProject = () => {
        if (editingProjectData) {
            updateProject(editingProjectData);
            setEditingProjectId(null);
            setEditingProjectData(null);
        }
    };
    const handleEditingProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (editingProjectData) {
            const { name, value, type } = e.target;
            const isNumber = type === 'number';
            setEditingProjectData({ ...editingProjectData, [name]: isNumber ? parseFloat(value) || 0 : value });
        }
    };

    const thClasses = "p-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider";
    const tdClasses = "p-3 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300";
    const inputClasses = "w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-2 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const statusBg = (status: ProjectStatus) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
            case 'In Progress': return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300';
            case 'Cancelled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Refunded': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        }
    };
    const rowBg = (project: ProjectType) => {
        if (project.isWithdrawn) return 'bg-slate-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500';
        if (project.projectStatus === 'Refunded' || project.projectStatus === 'Cancelled') return 'bg-red-50 dark:bg-red-900/20';
        return 'hover:bg-slate-50 dark:hover:bg-gray-800/50';
    };

    return (
        <div className="space-y-8">
            <SubscriptionManagerModal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
                payments={subscriptionPayments}
                addPayment={addSubscriptionPayment}
                updatePayment={updateSubscriptionPayment}
                deletePayment={deleteSubscriptionPayment}
            />
            <AddProjectModal 
                isOpen={isAddProjectModalOpen}
                onClose={() => setIsAddProjectModalOpen(false)}
                onAdd={addProject}
            />

            {/* Overview Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {Object.entries(overview).map(([key, value]) => (
                    <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
                        <h3 className="text-sm text-slate-500 dark:text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(value as number)}</p>
                    </div>
                ))}
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
                    <h3 className="text-sm text-slate-500 dark:text-slate-400">Subscription Costs</h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatPkr(totalSubscriptionCost)}</p>
                </div>
            </div>
            
             {/* Control Panel */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div>
                        <label htmlFor="month-filter" className="block text-sm font-medium text-slate-600 dark:text-slate-400">Month</label>
                        <select id="month-filter" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className={inputClasses}>
                            {months.map(m => <option key={m} value={m}>{m === 'all' ? 'All Months' : m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="rep-filter" className="block text-sm font-medium text-slate-600 dark:text-slate-400">Sales Rep</label>
                        <select id="rep-filter" value={filterRep} onChange={e => setFilterRep(e.target.value)} className={inputClasses}>
                            {salesRepsForFilter.map(r => <option key={r} value={r}>{r === 'all' ? 'All Reps' : r}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsSubModalOpen(true)}
                        className="bg-white dark:bg-gray-700 hover:bg-slate-100 dark:hover:bg-gray-600 border border-slate-300 dark:border-gray-600 text-slate-700 dark:text-slate-200 font-semibold px-4 py-2 rounded-md transition-colors"
                    >
                        Manage Subscriptions
                    </button>
                    <button 
                        onClick={() => setIsAddProjectModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                    >
                        <PlusIcon className="h-4 w-4" /> Add New Project
                    </button>
                </div>
            </div>
            
            {/* Projects Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                    <thead className="bg-slate-100 dark:bg-gray-900/50">
                        <tr>
                            <th className={thClasses}>#</th>
                            <th className={thClasses}>Client</th>
                            <th className={thClasses}>Amount</th>
                            <th className={thClasses}>Received</th>
                            <th className={thClasses}>After Deduction</th>
                            <th className={thClasses}>Remaining</th>
                            <th className={thClasses}>Sales Rep</th>
                            <th className={thClasses}>Date</th>
                            <th className={thClasses}>Merchant</th>
                            <th className={thClasses}>Status</th>
                            <th className={thClasses}>Artist Cost (PKR)</th>
                            <th className={thClasses}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                        {filteredProjects.map((p, index) => (
                           <Fragment key={p.id}>
                               {editingProjectId === p.id && editingProjectData ? (
                                   <tr className="bg-slate-100 dark:bg-gray-900/50">
                                       <td className={tdClasses}>{index + 1}</td>
                                       <td className={tdClasses}><input name="clientName" value={editingProjectData.clientName} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}><input type="number" name="projectAmount" value={editingProjectData.projectAmount} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}><input type="number" name="amountReceived" value={editingProjectData.amountReceived} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}><input type="number" name="afterDeduction" value={editingProjectData.afterDeduction} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}><input type="number" name="amountRemaining" value={editingProjectData.amountRemaining} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}>
                                            <select name="salesRepName" value={editingProjectData.salesRepName} onChange={handleEditingProjectChange} className={inputClasses}>
                                                {SALES_REPS.map(rep => <option key={rep} value={rep}>{rep}</option>)}
                                            </select>
                                       </td>
                                       <td className={tdClasses}><input type="date" name="date" value={editingProjectData.date} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}>
                                           <select name="paymentMerchant" value={editingProjectData.paymentMerchant} onChange={handleEditingProjectChange} className={inputClasses}>
                                               <option value="" disabled>Select...</option>
                                               {PAYMENT_MERCHANTS.map(m => <option key={m} value={m}>{m}</option>)}
                                           </select>
                                       </td>
                                       <td className={tdClasses}><select name="projectStatus" value={editingProjectData.projectStatus} onChange={handleEditingProjectChange} className={inputClasses}><option>In Progress</option><option>Completed</option><option>Cancelled</option><option>Refunded</option></select></td>
                                       <td className={tdClasses}><input type="number" name="artistCost" value={editingProjectData.artistCost} onChange={handleEditingProjectChange} className={inputClasses}/></td>
                                       <td className={tdClasses}><div className="flex items-center gap-2"><button onClick={handleUpdateProject} className="text-green-500"><SaveIcon/></button><button onClick={handleCancelEditProject} className="text-gray-500"><XIcon/></button></div></td>
                                   </tr>
                               ) : (
                                   <tr className={`${rowBg(p)} transition-colors`}>
                                       <td className={tdClasses}>{index + 1}</td>
                                       <td className={tdClasses}>{p.clientName}</td>
                                       <td className={tdClasses}>{formatCurrency(p.projectAmount)}</td>
                                       <td className={tdClasses}>{formatCurrency(p.amountReceived)}</td>
                                       <td className={tdClasses}>{formatCurrency(p.afterDeduction)}</td>
                                       <td className={tdClasses}>{formatCurrency(p.amountRemaining)}</td>
                                       <td className={tdClasses}>{p.salesRepName}</td>
                                       <td className={`${tdClasses} font-mono`}>{formatDate(p.date)}</td>
                                       <td className={tdClasses}>{p.paymentMerchant}</td>
                                       <td className={tdClasses}><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBg(p.projectStatus)}`}>{p.projectStatus}</span></td>
                                       <td className={tdClasses}>{formatPkr(p.artistCost)}</td>
                                       <td className={tdClasses}>
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={() => toggleProjectWithdrawal(p.id)} 
                                                    className={`
                                                        ${p.isWithdrawn ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'} 
                                                        transition-colors
                                                    `}
                                                    title={p.isWithdrawn ? "Remove from withdrawal" : "Add to withdrawal"}
                                                >
                                                    <CurrencyDollarIcon />
                                                </button>
                                                <button onClick={() => handleEditProjectClick(p)} className="text-slate-500 dark:text-slate-400 disabled:text-gray-400 dark:disabled:text-gray-600" disabled={p.isWithdrawn}><EditIcon/></button>
                                                <button onClick={() => deleteProject(p.id)} className="text-red-500 disabled:text-gray-400 dark:disabled:text-gray-600" disabled={p.isWithdrawn}><TrashIcon/></button>
                                            </div>
                                       </td>
                                   </tr>
                               )}
                           </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Financials;
