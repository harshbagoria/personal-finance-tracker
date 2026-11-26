import Cards from '../Component/Cards';
import { useEffect, useState } from 'react';
import AddExpenseModal from '../Component/Modal/AddExpence';
import AddIncomeModal from '../Component/Modal/AddIncomeModel';
import {addTransaction, getTransactions } from '../Services/Transaction';
import { Tooltip } from 'antd';


const Dashboard = () => {
    const [isshowIncomeModel, setisshowIncomeModel] = useState(false);
    const [showisExpenseModel, setshowisExpenseModel] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
    const [transactionsError, setTransactionsError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions();
                const fetchedTransactions = response.data.transactions;

                if (!Array.isArray(fetchedTransactions)) {
                    throw new Error('The server returned an invalid transactions response.');
                }

                setTransactions(fetchedTransactions);
            } catch (error) {
                setTransactionsError(
                    error.response?.data?.message || error.message || 'Could not load transactions.'
                );
            } finally {
                setIsLoadingTransactions(false);
            }
        };

        fetchTransactions();
    }, []);


const handleAddTransaction = async (transactiondata) => {
  const response = await addTransaction(transactiondata);
  setTransactions((current) => [
    response.data.transaction,
    ...current,
  ]);
};



    const showIncomeModel = () => {
        setisshowIncomeModel(true);

    }
    const showExpencemodel = () => {
        setshowisExpenseModel(true);
    }
    const showExpensecancel = () => {
        setshowisExpenseModel(false);
    }
    const Showincomecancel = () => {
        setisshowIncomeModel(false);
    }

    const totalIncome = transactions
        .filter((item) => item.type === "income")
        .reduce((total, item) => total + Number(item.amount), 0);

    const totalExpense = transactions
        .filter((item) => item.type === "expense")
        .reduce((total, item) => total + Number(item.amount), 0);

    const currentBalance = totalIncome - totalExpense;







    return (
        <div className="min-h-screen bg-stone-50 p-6">
            <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>
            <Cards

                totalIncome={totalIncome}
                totalExpense={totalExpense}
                currentBalance={currentBalance}
                showIncomeModel={showIncomeModel}
                showExpencemodel={showExpencemodel}
            />
            <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
                {isLoadingTransactions ? (
                    <p className="mt-4 text-sm text-slate-500">Loading transactions...</p>
                ) : transactionsError ? (
                    <p role="alert" className="mt-4 text-sm text-rose-700">
                        Could not load transactions: {transactionsError}
                    </p>
                ) : transactions.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500">No transactions yet.</p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium">Title</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Type</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Category</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Amount</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Date</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Payment method</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {transactions.map((transaction) => (
                                    <tr key={transaction._id} className="text-slate-700">
                                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                                            {transaction.title}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 capitalize">
                                            {transaction.type}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            {transaction.category}
                                        </td>
                                        <td className={`whitespace-nowrap px-4 py-3 font-semibold ${transaction.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}₹
                                            {Number(transaction.amount).toLocaleString('en-IN', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            {transaction.notes ? (
                                                <Tooltip title={transaction.notes} placement="top">
                                                    <button
                                                        type="button"
                                                        aria-label={`View notes for ${transaction.title}`}
                                                        className="cursor-help text-indigo-700 underline decoration-dotted underline-offset-2"
                                                    >
                                                        View notes
                                                    </button>
                                                </Tooltip>
                                            ) : (
                                                <span className="text-slate-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
            <AddExpenseModal
                open={showisExpenseModel}
                onClose={showExpensecancel}
                onAddExpense={handleAddTransaction}
            />

            <AddIncomeModal
                open={isshowIncomeModel}
                onClose={Showincomecancel}
                onAddIncome={handleAddTransaction}


            />




        </div>
    );
};

export default Dashboard;
