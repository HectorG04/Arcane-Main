import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import DiscordManagement from './components/DiscordManagement';
import Financials from './components/Financials';
import WithdrawalSummary from './components/WithdrawalSummary';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ReleaseNotes from './components/ReleaseNotes';
import type { ColumnType, ProjectType, GoLoginProfileType, SubscriptionPaymentType, WithdrawalSummaryDataType, WithdrawalDraftType, DiscordAccount, CardType } from './types';
import { INITIAL_COLUMNS, INITIAL_GOLOGIN_PROFILES, INITIAL_PROJECTS, INITIAL_SUBSCRIPTION_PAYMENTS, INITIAL_CURRENT_WITHDRAWAL_DRAFT, INITIAL_WITHDRAWAL_DATA } from './constants';
import { auth, db } from '@/src/firebaseConfig';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, addDoc, updateDoc, deleteDoc, writeBatch, getDocs, getDoc } from 'firebase/firestore';


export type Page = 'dashboard' | 'board' | 'discord' | 'financials' | 'withdrawal' | 'releasenotes';
export type Theme = 'light' | 'dark';


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [goLoginProfiles, setGoLoginProfiles] = useState<GoLoginProfileType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [subscriptionPayments, setSubscriptionPayments] = useState<SubscriptionPaymentType[]>([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalSummaryDataType[]>([]);
  const [currentWithdrawalDraft, setCurrentWithdrawalDraft] = useState<WithdrawalDraftType>(INITIAL_CURRENT_WITHDRAWAL_DRAFT);

  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- Authentication ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Real-time Data Loading from Firestore ---
  useEffect(() => {
    if (!user) {
      setProjects([]);
      setColumns([]);
      setGoLoginProfiles([]);
      setSubscriptionPayments([]);
      setWithdrawalHistory([]);
      return;
    };

    // Listener for Board data
    const unsubscribeBoard = onSnapshot(doc(db, "board", "main"), (docSnap) => {
        if (docSnap.exists()) {
            setColumns(docSnap.data().columns || []);
        } else {
            console.log("Board document does not exist, using initial data.");
            setColumns(INITIAL_COLUMNS);
        }
    });
    
    // Generic listener for collections
    const createCollectionListener = (collectionName: string, setter: Function) => {
      return onSnapshot(collection(db, collectionName), (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setter(items);
      });
    };

    const unsubscribeProjects = createCollectionListener("projects", setProjects);
    const unsubscribeProfiles = createCollectionListener("gologin_profiles", setGoLoginProfiles);
    const unsubscribeSubscriptions = createCollectionListener("subscription_payments", setSubscriptionPayments);
    const unsubscribeWithdrawals = createCollectionListener("withdrawal_history", (items: WithdrawalSummaryDataType[]) => {
      setWithdrawalHistory(items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    });
    
    return () => {
      unsubscribeBoard();
      unsubscribeProjects();
      unsubscribeProfiles();
      unsubscribeSubscriptions();
      unsubscribeWithdrawals();
    };
  }, [user]);


  const handleLogout = () => {
    signOut(auth).then(() => {
        setCurrentPage('dashboard');
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
  };
  
  // --- Column and Card Management ---
  const saveBoard = async (newColumns: ColumnType[]) => {
      await setDoc(doc(db, "board", "main"), { columns: newColumns });
  }

  const addColumn = (title: string) => {
    const newColumn: ColumnType = { id: `col-${Date.now()}`, title, cards: [] };
    saveBoard([...columns, newColumn]);
  };
  
  const deleteColumn = (columnId: string) => {
    saveBoard(columns.filter((col) => col.id !== columnId));
  };
  
  const addCard = (columnId: string, title: string) => {
      const newCard: CardType = {
          id: `card-${Date.now()}`,
          title: title.trim(),
          payments: [],
          comments: []
      };
      const newColumns = columns.map(c => 
          c.id === columnId ? { ...c, cards: [...c.cards, newCard] } : c
      );
      saveBoard(newColumns);
  };

  const updateCard = (updatedCard: CardType) => {
      const newColumns = columns.map(c => ({
          ...c,
          cards: c.cards.map(card => card.id === updatedCard.id ? updatedCard : card)
      }));
      saveBoard(newColumns);
  };

  const deleteCard = (cardId: string) => {
      const newColumns = columns.map(c => ({
          ...c,
          cards: c.cards.filter(card => card.id !== cardId)
      }));
      saveBoard(newColumns);
  };

  const moveCard = (cardId: string, sourceColumnId: string, destColumnId: string) => {
      let cardToMove: CardType | undefined;
      const intermediateColumns = columns.map(c => {
          if (c.id === sourceColumnId) {
              cardToMove = c.cards.find(card => card.id === cardId);
              return { ...c, cards: c.cards.filter(card => card.id !== cardId) };
          }
          return c;
      });

      if (cardToMove) {
          const finalColumns = intermediateColumns.map(c => {
              if (c.id === destColumnId) {
                  return { ...c, cards: [...c.cards, cardToMove!] };
              }
              return c;
          });
          saveBoard(finalColumns);
      }
  };

  // --- Financials Management ---
  const addProject = async (project: Omit<ProjectType, 'id' | 'isWithdrawn'>) => {
    await addDoc(collection(db, "projects"), { ...project, isWithdrawn: false });
  };

  const updateProject = async (updatedProject: ProjectType) => {
    let projectToSave = { ...updatedProject };
    
    if (projectToSave.projectStatus === 'Cancelled') {
        projectToSave.projectAmount = projectToSave.amountReceived;
        projectToSave.amountRemaining = 0;
    }
    const { id, ...data } = projectToSave;
    await updateDoc(doc(db, "projects", id), data);
  };
  
  const deleteProject = async (projectId: string) => await deleteDoc(doc(db, "projects", projectId));
  
  const toggleProjectWithdrawal = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        await updateDoc(doc(db, "projects", projectId), { isWithdrawn: !project.isWithdrawn });
    }
  };

  // --- Discord Management ---
  const addGoLoginProfile = async (profile: Omit<GoLoginProfileType, 'id' | 'accounts'>) => {
      await addDoc(collection(db, "gologin_profiles"), { ...profile, accounts: [] });
  };
  const updateGoLoginProfile = async (updatedProfile: GoLoginProfileType) => {
      const { id, ...data } = updatedProfile;
      await updateDoc(doc(db, "gologin_profiles", id), data);
  };
  const deleteGoLoginProfile = async (profileId: string) => {
      await deleteDoc(doc(db, "gologin_profiles", profileId));
  };

  const addDiscordAccountToProfile = async (profileId: string, account: Omit<DiscordAccount, 'id'>) => {
      const newAccount: DiscordAccount = { id: `discord-${Date.now()}`, ...account };
      const profile = goLoginProfiles.find(p => p.id === profileId);
      if (profile) {
          await updateDoc(doc(db, "gologin_profiles", profileId), { accounts: [...profile.accounts, newAccount] });
      }
  };
  const updateDiscordAccountInProfile = async (profileId: string, updatedAccount: DiscordAccount) => {
      const profile = goLoginProfiles.find(p => p.id === profileId);
      if (profile) {
          const updatedAccounts = profile.accounts.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc);
          await updateDoc(doc(db, "gologin_profiles", profileId), { accounts: updatedAccounts });
      }
  };
  const deleteDiscordAccountFromProfile = async (profileId: string, accountId: string) => {
      const profile = goLoginProfiles.find(p => p.id === profileId);
      if (profile) {
          const updatedAccounts = profile.accounts.filter(acc => acc.id !== accountId);
          await updateDoc(doc(db, "gologin_profiles", profileId), { accounts: updatedAccounts });
      }
  };

  // Subscription Payment Management
  const addSubscriptionPayment = async (payment: Omit<SubscriptionPaymentType, 'id'>) => {
    await addDoc(collection(db, "subscription_payments"), payment);
  };
  const updateSubscriptionPayment = async (updatedPayment: SubscriptionPaymentType) => {
    const { id, ...data } = updatedPayment;
    await updateDoc(doc(db, "subscription_payments", id), data);
  };
  const deleteSubscriptionPayment = async (paymentId: string) => await deleteDoc(doc(db, "subscription_payments", paymentId));

  // Withdrawal Management
  const updateCurrentWithdrawalDraft = (draft: WithdrawalDraftType) => {
    setCurrentWithdrawalDraft(draft);
  };

  const saveWithdrawal = async (projectIdsToWithdraw: string[], subscriptionIdsToWithdraw: string[]) => {
    const newWithdrawal: Omit<WithdrawalSummaryDataType, 'id'> = {
        date: new Date().toISOString(),
        ...currentWithdrawalDraft,
        withdrawnProjectIds: projectIdsToWithdraw,
        withdrawnSubscriptionIds: subscriptionIdsToWithdraw,
    };
    
    // Use a batch write to ensure atomicity
    const batch = writeBatch(db);
    
    // 1. Add new withdrawal document
    const withdrawalRef = doc(collection(db, "withdrawal_history"));
    batch.set(withdrawalRef, newWithdrawal);

    // 2. Update all withdrawn projects
    projectIdsToWithdraw.forEach(projectId => {
        const projectRef = doc(db, "projects", projectId);
        batch.update(projectRef, { isWithdrawn: true });
    });

    await batch.commit();

    // Reset draft state locally
    setCurrentWithdrawalDraft(INITIAL_CURRENT_WITHDRAWAL_DRAFT);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard projects={projects} />;
      case 'board':
        return <Board 
                    columns={columns} 
                    goLoginProfiles={goLoginProfiles}
                    addColumn={addColumn} 
                    deleteColumn={deleteColumn} 
                    addCard={addCard} 
                    updateCard={updateCard} 
                    deleteCard={deleteCard} 
                    moveCard={moveCard} 
                />;
      case 'discord':
        return <DiscordManagement 
                    profiles={goLoginProfiles} 
                    addProfile={addGoLoginProfile} 
                    updateProfile={updateGoLoginProfile} 
                    deleteProfile={deleteGoLoginProfile}
                    addAccount={addDiscordAccountToProfile}
                    updateAccount={updateDiscordAccountInProfile}
                    deleteAccount={deleteDiscordAccountFromProfile}
                />;
      case 'financials':
        return <Financials 
                  projects={projects} 
                  addProject={addProject} 
                  updateProject={updateProject} 
                  deleteProject={deleteProject}
                  toggleProjectWithdrawal={toggleProjectWithdrawal}
                  subscriptionPayments={subscriptionPayments}
                  addSubscriptionPayment={addSubscriptionPayment}
                  updateSubscriptionPayment={updateSubscriptionPayment}
                  deleteSubscriptionPayment={deleteSubscriptionPayment}
                />;
      case 'withdrawal':
        return <WithdrawalSummary
                  projects={projects}
                  withdrawalHistory={withdrawalHistory}
                  subscriptionPayments={subscriptionPayments}
                  currentDraft={currentWithdrawalDraft}
                  updateDraft={updateCurrentWithdrawalDraft}
                  saveWithdrawal={saveWithdrawal}
                />;
      case 'releasenotes':
        return <ReleaseNotes />;
      default:
        return null;
    }
  }
  
  if (isLoadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme} 
      />
      <main className="p-4 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;