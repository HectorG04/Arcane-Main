import React, { useMemo, useState, Fragment, useEffect } from 'react';
import type { ProjectType, ProjectStatus } from '../types';
import { XIcon, ArrowDownIcon, ArrowUpIcon } from './Icons';
import { SALES_REPS } from '../constants';

interface DashboardProps {
    projects: ProjectType[];
}

const formatCurrency = (amount: number, compact = false) => {
    if (compact) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(amount);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
const formatDate = (isoDate: string): string => {
    if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
    const date = new Date(isoDate.replace(/-/g, '/'));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
};

const getProjectRevenue = (project: ProjectType): number => {
    // The revenue is the amount received from the client.
    // This value can be negative for refunds, which correctly subtracts from totals.
    return project.amountReceived;
};


const KpiCard: React.FC<{
  title: string;
  value: number;
  previousValue?: number;
  formatFn: (value: number, compact?: boolean) => string;
  compactDisplay?: boolean;
}> = ({ title, value, previousValue, formatFn, compactDisplay = true }) => {
  const change = previousValue !== undefined && previousValue !== 0 
    ? ((value - previousValue) / previousValue) * 100 
    : undefined;
    
  const changeType = change === undefined ? 'neutral' : change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';

  const changeText = change !== undefined ? `${Math.abs(change).toFixed(1)}%` : null;

  const changeColor = {
    positive: 'text-emerald-500 dark:text-emerald-400',
    negative: 'text-red-500 dark:text-red-400',
    neutral: 'text-slate-500 dark:text-slate-400'
  }[changeType];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
        <h3 className="text-sm text-slate-500 dark:text-slate-400 capitalize">{title}</h3>
        <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatFn(value, compactDisplay)}</p>
            {changeText && (
                <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
                    {changeType === 'positive' && <ArrowUpIcon className="h-3 w-3" />}
                    {changeType === 'negative' && <ArrowDownIcon className="h-3 w-3" />}
                    <span>{changeText}</span>
                </div>
            )}
        </div>
        {changeText && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">vs. previous month</p>}
    </div>
  );
};

const BarChart: React.FC<{ data: { label: string; value: number; topRep?: string }[] }> = ({ data }) => {
    if (!data || data.length === 0 || data.every(d => d.value === 0)) {
        return (
            <div className="flex items-center justify-center h-full p-4 bg-slate-50 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-slate-400">
                No sales data for the selected period.
            </div>
        );
    }

    const actualMaxValue = Math.max(...data.map(d => d.value), 0);

    const yAxisMax = useMemo(() => {
        if (actualMaxValue === 0) return 5000;
        let max = actualMaxValue;
        
        if (max > 10000) return Math.ceil(max / 2000) * 2000;
        if (max > 5000) return Math.ceil(max / 1000) * 1000;
        return Math.ceil(max / 500) * 500;
    }, [actualMaxValue]);

    const yAxisLabels = useMemo(() => {
        const ticks = 5;
        const labels = [];
        for (let i = 0; i <= ticks; i++) {
            const value = (yAxisMax / ticks) * i;
            labels.push({ value, label: formatCurrency(value, true) });
        }
        return labels.reverse();
    }, [yAxisMax]);


    return (
        <div className="h-[22rem] flex gap-4">
            <div className="flex flex-col justify-between text-right text-xs text-slate-400 dark:text-slate-500 py-2 pr-2 border-r border-slate-200 dark:border-gray-700">
                {yAxisLabels.map(item => <span key={item.value}>{item.label}</span>)}
            </div>
            <div className="flex-1 flex items-end justify-around h-full">
                {data.map(({ label, value, topRep }) => {
                    const heightPercentage = value >= 0 ? (value / yAxisMax) * 100 : 0;
                    return (
                        <div key={label} className="flex flex-col items-center w-full max-w-[50px] group text-center h-full">
                            <div className="w-full flex-grow flex items-end">
                                <div
                                    className="relative w-full bg-indigo-400 dark:bg-indigo-500 rounded-t-md transition-all duration-300 ease-in-out transform-origin-bottom group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400"
                                    style={{ height: `${heightPercentage}%` }}
                                >
                                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap">
                                        <p>{formatCurrency(value)}</p>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 truncate w-full">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RepProjectDetailModal: React.FC<{
    repName: string;
    projects: ProjectType[];
    onClose: () => void;
}> = ({ repName, projects, onClose }) => {
    const thClasses = "p-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider";
    const tdClasses = "p-3 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300";
    const statusBg = (status: ProjectStatus) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
            case 'In Progress': return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300';
            case 'Cancelled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Refunded': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        }
    };
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-300 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="font-sans text-xl font-bold text-slate-800 dark:text-slate-100">Projects for {repName}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full"><XIcon className="h-5 w-5"/></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
                        <thead className="bg-slate-200 dark:bg-gray-800">
                            <tr>
                                <th className={thClasses}>Client Name</th>
                                <th className={thClasses}>Project Type</th>
                                <th className={thClasses}>Amount</th>
                                <th className={thClasses}>Status</th>
                                <th className={thClasses}>Artist Assigned</th>
                                <th className={thClasses}>Date Booked</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                            {projects.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50">
                                    <td className={tdClasses}>{p.clientName}</td>
                                    <td className={tdClasses}>{p.projectType}</td>
                                    <td className={`${tdClasses} font-mono`}>{formatCurrency(p.projectAmount)}</td>
                                    <td className={tdClasses}>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBg(p.projectStatus)}`}>
                                            {p.projectStatus}
                                        </span>
                                    </td>
                                    <td className={tdClasses}>{p.artistCost > 0 ? 'Assigned' : 'N/A'}</td>
                                    <td className={`${tdClasses} font-mono`}>{formatDate(p.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const Dashboard: React.FC<DashboardProps> = ({ projects }) => {
    const [salesChartPeriod, setSalesChartPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedRep, setSelectedRep] = useState<string | null>(null);
    const [leaderboardMetric, setLeaderboardMetric] = useState<'revenue' | 'projects' | 'avgValue'>('revenue');

    const availableYears = useMemo(() => {
        if (!projects || projects.length === 0) return [new Date().getFullYear()];
        const years = new Set(projects.map(p => new Date(p.date.replace(/-/g, '/')).getFullYear()).filter(y => !isNaN(y)));
        return Array.from(years).sort((a, b) => b - a);
    }, [projects]);
    
    const availableMonths = useMemo(() => {
        const months = new Set<string>();
        projects.forEach(p => {
            try {
                const date = new Date(p.date.replace(/-/g, '/'));
                if (!isNaN(date.getTime())) {
                    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    months.add(monthKey);
                }
            } catch (e) {}
        });
        return ['all', ...Array.from(months).sort((a,b) => b.localeCompare(a))];
    }, [projects]);
    
    const [leaderboardPeriod, setLeaderboardPeriod] = useState<string>(availableMonths[1] || 'all');

    useEffect(() => {
        if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
            setSelectedYear(availableYears[0]);
        }
    }, [availableYears, selectedYear]);
    
    const monthlyStats = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const prevMonthDate = new Date(now);
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        const prevMonth = prevMonthDate.getMonth();
        const prevYear = prevMonthDate.getFullYear();

        const isCurrentMonth = (date: Date) => date.getFullYear() === currentYear && date.getMonth() === currentMonth;
        const isPrevMonth = (date: Date) => date.getFullYear() === prevYear && date.getMonth() === prevMonth;

        const current = { revenue: 0, newProjects: 0, completedProjects: 0 };
        const previous = { revenue: 0, newProjects: 0, completedProjects: 0 };
        const outstandingCollections = projects.reduce((sum, p) => sum + p.amountRemaining, 0);

        projects.forEach(p => {
            const projectDate = new Date(p.date.replace(/-/g, '/'));
            if(isNaN(projectDate.getTime())) return;
            
            if(isCurrentMonth(projectDate)) {
                current.revenue += getProjectRevenue(p);
                current.newProjects += 1;
                if(p.projectStatus === 'Completed') current.completedProjects += 1;
            } else if (isPrevMonth(projectDate)) {
                previous.revenue += getProjectRevenue(p);
                previous.newProjects += 1;
                if(p.projectStatus === 'Completed') previous.completedProjects += 1;
            }
        });
        
        return { current, previous, outstandingCollections };
    }, [projects]);

    const salesData = useMemo(() => {
        const sales: { [key: string]: { total: number; reps: { [name: string]: number } } } = {};

        if (salesChartPeriod === 'yearly') {
            projects.forEach(p => {
                const date = new Date(p.date.replace(/-/g, '/'));
                if (isNaN(date.getTime())) return;
                const key = date.getFullYear().toString();
                if (!sales[key]) sales[key] = { total: 0, reps: {} };
                const revenue = getProjectRevenue(p);
                sales[key].total += revenue;
                sales[key].reps[p.salesRepName] = (sales[key].reps[p.salesRepName] || 0) + revenue;
            });
            const sortedYears = Object.entries(sales).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            return sortedYears.map(([label, data]) => {
                const topRep = Object.entries(data.reps).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
                return { label, value: data.total, topRep };
            });
        }

        const relevantProjects = projects.filter(p => {
            const projectDate = new Date(p.date.replace(/-/g, '/'));
            return !isNaN(projectDate.getTime()) && projectDate.getFullYear() === selectedYear;
        });

        if (salesChartPeriod === 'monthly') {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            let minMonthIndex = 12;
            relevantProjects.forEach(p => {
                const month = new Date(p.date.replace(/-/g, '/')).getMonth();
                if (month < minMonthIndex) {
                    minMonthIndex = month;
                }
            });
            if (minMonthIndex > 11) minMonthIndex = new Date().getMonth();

            for(let i = minMonthIndex; i < 12; i++) {
                 sales[months[i]] = { total: 0, reps: {} };
            }

            relevantProjects.forEach(p => {
                const date = new Date(p.date.replace(/-/g, '/'));
                const key = months[date.getMonth()];
                if (sales[key]) {
                    const revenue = getProjectRevenue(p);
                    sales[key].total += revenue;
                    sales[key].reps[p.salesRepName] = (sales[key].reps[p.salesRepName] || 0) + revenue;
                }
            });
        } else { // quarterly
            const quarters = ["Q1", "Q2", "Q3", "Q4"];
            quarters.forEach(q => sales[q] = { total: 0, reps: {} });
            relevantProjects.forEach(p => {
                const date = new Date(p.date.replace(/-/g, '/'));
                const quarterIndex = Math.floor(date.getMonth() / 3);
                const key = `Q${quarterIndex + 1}`;
                const revenue = getProjectRevenue(p);
                sales[key].total += revenue;
                sales[key].reps[p.salesRepName] = (sales[key].reps[p.salesRepName] || 0) + revenue;
            });
        }
        
        return Object.entries(sales).map(([label, data]) => {
            const topRep = Object.entries(data.reps).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
            return { label, value: data.total, topRep };
        });

    }, [projects, salesChartPeriod, selectedYear]);

    const leaderboardData = useMemo(() => {
        const repStats: { [name: string]: { revenue: number; projects: number, projectList: ProjectType[] } } = {};

        // Initialize stats for all known sales reps
        SALES_REPS.forEach(repName => {
            repStats[repName] = { revenue: 0, projects: 0, projectList: [] };
        });

        const relevantProjects = projects.filter(p => {
            if (leaderboardPeriod === 'all') return true;
            try {
                return p.date.startsWith(leaderboardPeriod);
            } catch (e) {
                return false;
            }
        });

        relevantProjects.forEach(p => {
            const repName = p.salesRepName;
            // Only count projects for known sales reps
            if (repName && repStats[repName]) {
                repStats[repName].revenue += getProjectRevenue(p);
                repStats[repName].projects += 1;
                repStats[repName].projectList.push(p);
            }
        });
        
        const data = Object.entries(repStats).map(([name, data]) => ({
            name,
            ...data,
            avgValue: data.projects > 0 ? data.revenue / data.projects : 0
        }));

        const sortedData = data.sort((a, b) => b[leaderboardMetric] - a[leaderboardMetric]);
        
        // Always show 6 reps
        return sortedData.slice(0, 6);

    }, [projects, leaderboardPeriod, leaderboardMetric]);

    const LeaderboardMetricToggle = () => (
        <div className="flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-gray-900/50 rounded-lg">
            {(['revenue', 'projects', 'avgValue'] as const).map(metric => (
                 <button
                    key={metric}
                    onClick={() => setLeaderboardMetric(metric)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        leaderboardMetric === metric
                        ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-gray-700/50'
                    }`}
                 >
                    { {revenue: 'Revenue', projects: 'Projects', avgValue: 'Avg Value'}[metric] }
                </button>
            ))}
        </div>
    );
    
    const formatLeaderboardValue = (rep: (typeof leaderboardData)[0]) => {
        switch(leaderboardMetric) {
            case 'revenue': return formatCurrency(rep.revenue);
            case 'projects': return `${rep.projects} project${rep.projects !== 1 ? 's' : ''}`;
            case 'avgValue': return formatCurrency(rep.avgValue);
            default: return '';
        }
    };
    
    return (
        <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Monthly Revenue" value={monthlyStats.current.revenue} previousValue={monthlyStats.previous.revenue} formatFn={formatCurrency} compactDisplay={false} />
                <KpiCard title="New Projects" value={monthlyStats.current.newProjects} previousValue={monthlyStats.previous.newProjects} formatFn={(v) => v.toString()} />
                <KpiCard title="Completed Projects" value={monthlyStats.current.completedProjects} previousValue={monthlyStats.previous.completedProjects} formatFn={(v) => v.toString()} />
                <KpiCard title="Outstanding Collections" value={monthlyStats.outstandingCollections} formatFn={formatCurrency} compactDisplay={false} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Left side taking 2 cols */}
                <div className="lg:col-span-2">
                    {/* Sales Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-gray-700">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Sales Performance</h3>
                            <div className="flex items-center gap-2">
                                <select
                                    value={salesChartPeriod}
                                    onChange={(e) => setSalesChartPeriod(e.target.value as any)}
                                    className="bg-slate-100 dark:bg-gray-700 text-sm p-1 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                {salesChartPeriod !== 'yearly' && (
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        className="bg-slate-100 dark:bg-gray-700 text-sm p-1 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    >
                                        {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                                    </select>
                                )}
                            </div>
                        </div>
                        <BarChart data={salesData} />
                    </div>
                </div>
                
                 {/* Right side taking 1 col */}
                <div className="lg:col-span-1">
                     {/* Sales Rep Leaderboard */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-gray-700 flex flex-col h-full">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Leaderboard</h3>
                            <div className="flex items-center gap-2">
                                <LeaderboardMetricToggle />
                                <select 
                                    value={leaderboardPeriod}
                                    onChange={(e) => setLeaderboardPeriod(e.target.value)}
                                    className="bg-slate-100 dark:bg-gray-700 text-sm p-1.5 rounded-md border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                    {availableMonths.map(month => <option key={month} value={month}>{month === 'all' ? 'All Time' : new Date(month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' })}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2 flex-grow overflow-y-auto pr-2">
                            {leaderboardData.map((rep, index) => (
                                <div key={rep.name}
                                    onClick={() => setSelectedRep(rep.name)}
                                    className="flex items-center p-3 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors"
                                >
                                    <span className="font-bold text-sm w-8">{index + 1}.</span>
                                    <span className="font-semibold flex-1">{rep.name}</span>
                                    <span className="font-bold font-mono text-sm text-right w-36">{formatLeaderboardValue(rep)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {selectedRep && (
                <RepProjectDetailModal
                    repName={selectedRep}
                    projects={leaderboardData.find(rep => rep.name === selectedRep)?.projectList || []}
                    onClose={() => setSelectedRep(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;