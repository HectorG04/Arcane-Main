
import React from 'react';
import { TagIcon, RocketLaunchIcon, SparklesIcon } from './Icons';

const ReleaseNoteCard: React.FC<{ title: string; date: string; version: string; children: React.ReactNode }> = ({ title, date, version, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
        <div className="border-b border-slate-200 dark:border-gray-700 pb-4 mb-6">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans">{title}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{date}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full text-sm font-semibold">
                    <TagIcon className="h-4 w-4" />
                    <span>Version {version}</span>
                </div>
            </div>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
        </div>
    </div>
);

const Section: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
            <div className="text-indigo-500 dark:text-indigo-400">{icon}</div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 font-sans">{title}</h3>
        </div>
        {children}
    </div>
);


const ReleaseNotes: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
             <ReleaseNoteCard title="Financials Upgrade & Data Backfill" date="November 22, 2025" version="1.1">
                <p>
                    This update focuses on improving financial tracking and data accuracy, ensuring the app is a reliable source of truth for your business operations.
                </p>
                <Section title="New Features & Enhancements" icon={<RocketLaunchIcon />}>
                    <ul>
                        <li>
                            <strong>Detailed Withdrawal History:</strong> The 'History' tab within the Withdrawal section has been significantly upgraded. You can now expand each past withdrawal to see a comprehensive table of all included projects, including their status, payment in USD, and the calculated conversion to PKR at the time of withdrawal.
                        </li>
                    </ul>
                </Section>
                <Section title="Data & Backend" icon={<SparklesIcon />}>
                     <ul>
                        <li>
                            <strong>Historical Data Import:</strong> We've successfully backfilled the withdrawal data from November 5, 2025, based on the provided spreadsheets. This ensures that the projects from that batch are correctly marked as "withdrawn" and that your financial history within the app is complete and accurate.
                        </li>
                    </ul>
                </Section>
            </ReleaseNoteCard>

            <ReleaseNoteCard title="Initial Release" date="November 20, 2025" version="1.0">
                <p>
                    Welcome to the first version of the <strong>Arcane Brush Suite!</strong> This all-in-one application is designed to streamline your entire operational workflow, from project management and client communication to detailed financial tracking and team collaboration. This release lays the foundation for a more efficient and organized future.
                </p>

                <Section title="Key Features" icon={<RocketLaunchIcon />}>
                    <ul>
                        <li>
                            <strong>Comprehensive Dashboard:</strong> Get a bird's-eye view of your business with key performance indicators (KPIs) like total revenue and outstanding collections. Visualize sales performance over time with dynamic charts and track your team's success with the sales rep leaderboard.
                        </li>
                        <li>
                            <strong>Interactive Kanban Board:</strong> Manage your projects with a flexible, Trello-like board. Drag and drop cards between customizable columns, and dive deep into project details with a rich modal view that supports descriptions, payments, and an activity log.
                        </li>
                        <li>
                            <strong>Secure Discord ID Management:</strong> Centralize and manage your company's GoLogin profiles and associated Discord accounts. A secure, searchable, and editable interface ensures your team has the credentials they need without compromising security.
                        </li>
                        <li>
                            <strong>Integrated Financials Hub:</strong> Track every dollar with a dedicated financials table. Record new projects, update payment statuses, and manage subscription costs all in one place. The system incorporates crucial business logic for handling cancelled and refunded projects automatically.
                        </li>
                        <li>
                            <strong>Streamlined Withdrawal Process:</strong> Simplify profit distribution with the Withdrawal Summary tool. Select projects for withdrawal, calculate expenses and shares with an integrated calculator, and maintain a clear history of all past withdrawals for easy accounting.
                        </li>
                    </ul>
                </Section>
                
                <Section title="Enhancements" icon={<SparklesIcon />}>
                     <ul>
                        <li>
                            <strong>Light & Dark Mode:</strong> A sleek and modern user interface that respects your system preferences or can be toggled manually for optimal viewing comfort.
                        </li>
                        <li>
                            <strong>Data Persistence:</strong> All your data is saved locally in your browser, ensuring your information is preserved between sessions without needing a backend server.
                        </li>
                         <li>
                            <strong>Granular Filtering:</strong> The Dashboard and Financials pages feature robust filtering options, allowing you to drill down into your data by month, year, quarter, or sales representative.
                        </li>
                        <li>
                            <strong>Secure Login:</strong> The entire suite is protected by a simple but effective login screen to keep your business data private.
                        </li>
                    </ul>
                </Section>
            </ReleaseNoteCard>
        </div>
    );
};

export default ReleaseNotes;
