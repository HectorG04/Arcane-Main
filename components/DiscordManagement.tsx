
import React, { useState, useMemo, Fragment } from 'react';
import type { GoLoginProfileType, DiscordAccount } from '../types';
import { TrashIcon, EditIcon, SaveIcon, XIcon, EyeIcon, EyeOffIcon, PlusIcon, CopyIcon, CheckCircleIcon } from './Icons';
import { SALES_REPS } from '../constants';

interface DiscordManagementProps {
  profiles: GoLoginProfileType[];
  addProfile: (profile: Omit<GoLoginProfileType, 'id' | 'accounts'>) => void;
  updateProfile: (profile: GoLoginProfileType) => void;
  deleteProfile: (profileId: string) => void;
  addAccount: (profileId: string, account: Omit<DiscordAccount, 'id'>) => void;
  updateAccount: (profileId: string, account: DiscordAccount) => void;
  deleteAccount: (profileId: string, accountId: string) => void;
}

const initialNewProfileState: Omit<GoLoginProfileType, 'id' | 'accounts'> = {
  gologinProfileNumber: '',
  assignedRep: '',
};

const initialNewAccountState: Omit<DiscordAccount, 'id'> = {
  discordId: '',
  discordEmail: '',
  discordPassword: '',
  emailPassword: '',
  creationYear: '',
  twoFactorKey: '',
  status: 'Working',
};

const CopyToClipboard: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    return (
        <button 
            onClick={handleCopy} 
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0"
            aria-label="Copy to clipboard"
        >
            {copied ? <CheckCircleIcon className="h-4 w-4 text-emerald-500" /> : <CopyIcon className="h-4 w-4" />}
        </button>
    );
};


const PasswordInput: React.FC<{value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; name?: string}> = ({ value, onChange, placeholder, name }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative">
            <input
                type={isVisible ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-slate-50 dark:bg-gray-600 text-slate-900 dark:text-slate-100 rounded-md p-2 pr-10 border border-slate-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="new-password"
            />
            <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label={isVisible ? "Hide password" : "Show password"}
            >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    );
};

const DiscordAccountRow: React.FC<{
    profileId: string;
    account: DiscordAccount;
    onUpdate: (profileId: string, account: DiscordAccount) => void;
    onDelete: (profileId: string, accountId: string) => void;
}> = ({ profileId, account, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(account);
    const [isDiscordPassVisible, setIsDiscordPassVisible] = useState(false);
    const [isEmailPassVisible, setIsEmailPassVisible] = useState(false);


    const handleUpdate = () => {
        onUpdate(profileId, editData);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const tdClasses = "p-2 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 align-middle";
    const inputClasses = "w-full bg-slate-50 dark:bg-gray-600 text-slate-900 dark:text-slate-100 rounded-md p-1 border border-slate-300 dark:border-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

    if (isEditing) {
        return (
            <tr className="bg-slate-100 dark:bg-gray-700/50">
                <td className={tdClasses}><input type="text" name="discordId" value={editData.discordId} onChange={handleChange} className={inputClasses} /></td>
                <td className={tdClasses}><input type="email" name="discordEmail" value={editData.discordEmail} onChange={handleChange} className={inputClasses} /></td>
                <td className={tdClasses}><PasswordInput value={editData.discordPassword || ''} onChange={(e) => setEditData({...editData, discordPassword: e.target.value})} placeholder="Discord Pass"/></td>
                <td className={tdClasses}><PasswordInput value={editData.emailPassword || ''} onChange={(e) => setEditData({...editData, emailPassword: e.target.value})} placeholder="Email Pass"/></td>
                <td className={tdClasses}><input type="text" name="twoFactorKey" value={editData.twoFactorKey} onChange={handleChange} className={inputClasses} /></td>
                <td className={tdClasses}>
                    <select name="status" value={editData.status} onChange={handleChange} className={inputClasses}>
                        <option value="Working">Working</option><option value="Error">Error</option>
                    </select>
                </td>
                <td className={tdClasses}>
                    <div className="flex items-center gap-2">
                        <button onClick={handleUpdate} className="text-emerald-600 hover:text-emerald-700"><SaveIcon /></button>
                        <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-slate-700"><XIcon /></button>
                    </div>
                </td>
            </tr>
        );
    }
    
    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-gray-800/60 transition-colors">
            <td className={tdClasses}>{account.discordId}</td>
            <td className={tdClasses}>
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate" title={account.discordEmail}>{account.discordEmail}</span>
                    <CopyToClipboard textToCopy={account.discordEmail} />
                </div>
            </td>
            <td className={tdClasses}>
                <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs truncate max-w-[100px]">{isDiscordPassVisible ? account.discordPassword : '••••••••••'}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); setIsDiscordPassVisible(v => !v); }} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                           {isDiscordPassVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </button>
                        <CopyToClipboard textToCopy={account.discordPassword || ''} />
                    </div>
                </div>
            </td>
            <td className={tdClasses}>
                 <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs truncate max-w-[100px]">{isEmailPassVisible ? account.emailPassword : '••••••••••'}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); setIsEmailPassVisible(v => !v); }} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                           {isEmailPassVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </button>
                        <CopyToClipboard textToCopy={account.emailPassword || ''} />
                    </div>
                </div>
            </td>
            <td className={`${tdClasses} font-mono text-xs`}>
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate" title={account.twoFactorKey}>{account.twoFactorKey}</span>
                    <CopyToClipboard textToCopy={account.twoFactorKey} />
                </div>
            </td>
            <td className={tdClasses}>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${account.status === 'Working' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                    {account.status}
                </span>
            </td>
            <td className={tdClasses}>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsEditing(true)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"><EditIcon /></button>
                    <button onClick={() => onDelete(profileId, account.id)} className="text-red-500 hover:text-red-700"><TrashIcon /></button>
                </div>
            </td>
        </tr>
    );
};

const AddDiscordAccountForm: React.FC<{
    profileId: string;
    onAdd: (profileId: string, account: Omit<DiscordAccount, 'id'>) => void;
}> = ({ profileId, onAdd }) => {
    const [newAccount, setNewAccount] = useState(initialNewAccountState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newAccount.discordId && newAccount.discordEmail) {
            onAdd(profileId, newAccount);
            setNewAccount(initialNewAccountState);
        }
    };
    
    const inputClasses = "w-full bg-white dark:bg-gray-600 text-slate-900 dark:text-slate-100 rounded-md p-1 border border-slate-300 dark:border-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
    
    return (
        <tfoot>
            <tr className="bg-slate-200/50 dark:bg-gray-700/30">
                <td className="p-2"><input type="text" name="discordId" value={newAccount.discordId} onChange={handleChange} placeholder="Discord Handle" required className={inputClasses} /></td>
                <td className="p-2"><input type="email" name="discordEmail" value={newAccount.discordEmail} onChange={handleChange} placeholder="Discord Email" required className={inputClasses} /></td>
                <td className="p-2"><PasswordInput name="discordPassword" value={newAccount.discordPassword || ''} onChange={handleChange} placeholder="Discord Pass"/></td>
                <td className="p-2"><PasswordInput name="emailPassword" value={newAccount.emailPassword || ''} onChange={handleChange} placeholder="Email Pass"/></td>
                <td className="p-2"><input type="text" name="twoFactorKey" value={newAccount.twoFactorKey} onChange={handleChange} placeholder="2FA Key" className={inputClasses} /></td>
                <td className="p-2">
                     <select name="status" value={newAccount.status} onChange={handleChange} className={inputClasses}>
                        <option value="Working">Working</option><option value="Error">Error</option>
                    </select>
                </td>
                <td className="p-2">
                    <button onClick={handleAdd} className="w-full bg-indigo-600 text-white rounded-md p-1 hover:bg-indigo-700 flex justify-center items-center h-full"><PlusIcon/></button>
                </td>
            </tr>
        </tfoot>
    );
};

const ProfileCard: React.FC<{
    profile: GoLoginProfileType;
    deleteProfile: (profileId: string) => void;
    addAccount: (profileId: string, account: Omit<DiscordAccount, 'id'>) => void;
    updateAccount: (profileId: string, account: DiscordAccount) => void;
    deleteAccount: (profileId: string, accountId: string) => void;
}> = ({ profile, deleteProfile, addAccount, updateAccount, deleteAccount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const thClasses = "p-2 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase";

    return (
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700/80 overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-sans text-lg font-bold text-slate-800 dark:text-slate-100">Profile #{profile.gologinProfileNumber}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Assigned to: <span className="font-semibold">{profile.assignedRep}</span> | 
                            <span className="ml-2">{profile.accounts.length} Accounts</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }} className="text-red-500 hover:text-red-700"><TrashIcon /></button>
                        <span className={`transform transition-transform text-slate-500 dark:text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                </div>
            </button>
            {isOpen && (
                 <div className="border-t border-slate-200 dark:border-gray-700/80">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-slate-100 dark:bg-gray-700/50">
                                <tr>
                                    <th className={thClasses} style={{width: '10%'}}>Handle</th>
                                    <th className={thClasses} style={{width: '20%'}}>Email</th>
                                    <th className={thClasses} style={{width: '15%'}}>Discord Pass</th>
                                    <th className={thClasses} style={{width: '15%'}}>Email Pass</th>
                                    <th className={thClasses} style={{width: '25%'}}>2FA Key</th>
                                    <th className={thClasses} style={{width: '5%'}}>Status</th>
                                    <th className={thClasses} style={{width: '10%'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-gray-700/80">
                                {profile.accounts.map(acc => (
                                    <DiscordAccountRow 
                                        key={acc.id} 
                                        profileId={profile.id} 
                                        account={acc} 
                                        onUpdate={updateAccount}
                                        onDelete={deleteAccount}
                                    />
                                ))}
                            </tbody>
                            <AddDiscordAccountForm profileId={profile.id} onAdd={addAccount} />
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const DiscordManagement: React.FC<DiscordManagementProps> = ({ profiles, addProfile, updateProfile, deleteProfile, addAccount, updateAccount, deleteAccount }) => {
    const [newProfile, setNewProfile] = useState(initialNewProfileState);
    const [isAddingProfile, setIsAddingProfile] = useState(false);
    const [filterRep, setFilterRep] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProfiles = useMemo(() => {
        return profiles.filter(p => {
            const repMatch = filterRep === 'all' || p.assignedRep === filterRep;
            const searchMatch = searchTerm === '' || p.gologinProfileNumber.includes(searchTerm);
            return repMatch && searchMatch;
        });
    }, [profiles, filterRep, searchTerm]);

    const handleNewProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
    };

    const handleAddProfile = (e: React.FormEvent) => {
        e.preventDefault();
        if (newProfile.gologinProfileNumber && newProfile.assignedRep) {
            addProfile(newProfile);
            setNewProfile(initialNewProfileState);
            setIsAddingProfile(false);
        }
    };
    
    const inputClasses = "w-full bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-slate-100 rounded-md p-2 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";
    
    return (
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-slate-200 dark:border-gray-700/80">
            {/* Control Panel */}
            <div className="border-b border-slate-200 dark:border-gray-700/80 pb-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Discord Profiles</h2>
                    <div className="flex flex-wrap items-center gap-4">
                        <select onChange={(e) => setFilterRep(e.target.value)} className={inputClasses + " max-w-xs"}>
                            <option value="all">Filter by Sales Rep</option>
                            {SALES_REPS.map(rep => <option key={rep} value={rep}>{rep}</option>)}
                        </select>
                        <input type="text" placeholder="Search Profile #" onChange={(e) => setSearchTerm(e.target.value)} className={inputClasses + " max-w-xs"}/>
                         <button 
                            onClick={() => setIsAddingProfile(prev => !prev)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                        >
                            <PlusIcon className="h-4 w-4" /> Add New Profile
                        </button>
                    </div>
                </div>
                 {/* Add New Profile Form (Collapsible) */}
                {isAddingProfile && (
                     <form onSubmit={handleAddProfile} className="mt-4 p-4 bg-slate-50 dark:bg-gray-900/30 rounded-lg flex items-end gap-4">
                        <div className="flex-grow">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Profile Number</label>
                            <input type="text" name="gologinProfileNumber" value={newProfile.gologinProfileNumber} onChange={handleNewProfileChange} required className={inputClasses + " mt-1"} />
                        </div>
                        <div className="flex-grow">
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Assign to Rep</label>
                            <select name="assignedRep" value={newProfile.assignedRep} onChange={handleNewProfileChange} required className={inputClasses + " mt-1"}>
                                <option value="" disabled>Select Rep</option>
                                {SALES_REPS.map(rep => <option key={rep} value={rep}>{rep}</option>)}
                            </select>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 h-10">Save</button>
                        <button type="button" onClick={() => setIsAddingProfile(false)} className="px-4 py-2 bg-slate-200 dark:bg-gray-600 text-slate-800 dark:text-slate-100 rounded-md hover:bg-slate-300 dark:hover:bg-gray-500 h-10">Cancel</button>
                     </form>
                )}
            </div>

            {/* Profile List */}
            <div className="space-y-4">
                {filteredProfiles.map(profile => (
                    <ProfileCard 
                        key={profile.id}
                        profile={profile}
                        deleteProfile={deleteProfile}
                        addAccount={addAccount}
                        updateAccount={updateAccount}
                        deleteAccount={deleteAccount}
                    />
                ))}
            </div>
        </div>
    );
};

export default DiscordManagement;