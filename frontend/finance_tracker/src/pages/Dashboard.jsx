import Cards from '../Component/Cards';
import { useEffect, useState } from 'react';
import AddExpenseModal from '../Component/Modal/AddExpence';
import AddIncomeModal from '../Component/Modal/AddIncomeModel';
import { addTransaction, getTransactions } from '../Services/Transaction';
import { Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";


const Dashboard = () => {
    const [isshowIncomeModel, setisshowIncomeModel] = useState(false);
    const [showisExpenseModel, setshowisExpenseModel] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
    const [transactionsError, setTransactionsError] = useState('');
    const [searchText, setSearchText] = useState("");
    const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
    const [sortOption, setSortOption] = useState('date-desc');

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

    const normalizedSearchText = searchText.trim().toLowerCase();
    const filteredTransactions = transactions.filter((transaction) => {
        const matchesType =
            transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter;
        const searchableValues = [
            transaction.title,
            transaction.type,
            transaction.category,
            transaction.amount,
            Number(transaction.amount).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            transaction.date,
            new Date(transaction.date).toLocaleDateString(),
            transaction.paymentMethod,
            transaction.notes
        ];

        return matchesType && searchableValues.some((value) =>
            String(value ?? '').toLowerCase().includes(normalizedSearchText)
        );
    });

    const sortedTransactions = [...filteredTransactions].sort((first, second) => {
        switch (sortOption) {
            case 'date-asc':
                return new Date(first.date).getTime() - new Date(second.date).getTime();
            case 'amount-asc':
                return Number(first.amount) - Number(second.amount);
            case 'amount-desc':
                return Number(second.amount) - Number(first.amount);
            case 'date-desc':
            default:
                return new Date(second.date).getTime() - new Date(first.date).getTime();
        }
    });






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
                    <>
                        <div className="mb-4 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
                            <div className="w-full max-w-sm">
                                <Input
                                    aria-label="Search transactions"
                                    allowClear
                                    prefix={<SearchOutlined />}
                                    placeholder="Search transactions..."
                                    value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)}
                                />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <span>Type:</span>
                                <select
                                    aria-label="Filter transactions by type"
                                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={transactionTypeFilter}
                                    onChange={(event) => setTransactionTypeFilter(event.target.value)}
                                >
                                    <option value="all">All transactions</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <span>Sort by:</span>
                                <select
                                    aria-label="Sort transactions"
                                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={sortOption}
                                    onChange={(event) => setSortOption(event.target.value)}
                                >
                                    <option value="date-desc">Date: Newest first</option>
                                    <option value="date-asc">Date: Oldest first</option>
                                    <option value="amount-desc">Amount: High to low</option>
                                    <option value="amount-asc">Amount: Low to high</option>
                                </select>
                            </label>
                        </div>
                        {filteredTransactions.length === 0 ? (
                            <p className="text-sm text-slate-500">
                                No transactions match the selected filters.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
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
                                        {sortedTransactions.map((transaction) => (
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
                    </>
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
