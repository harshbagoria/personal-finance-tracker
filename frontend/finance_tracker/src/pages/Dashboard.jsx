import Cards from '../Component/Cards';
import { useState } from 'react';
import { Modal } from 'antd';
import AddExpenseModal from '../Component/Modal/AddExpence';
import AddIncomeModal from '../Component/Modal/AddIncomeModel';



const Dashboard = () => {
    const [isshowIncomeModel, setisshowIncomeModel] = useState(false);
    const [showisExpenseModel, setshowisExpenseModel] = useState(false);



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
    return (
        <div className="min-h-screen bg-stone-50 p-6">
            <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>
            <Cards
                showIncomeModel={showIncomeModel}
                showExpencemodel={showExpencemodel}

            />
            <AddExpenseModal
                open={showisExpenseModel}
                onClose={showExpensecancel}
                onAddExpense={(expenseData) => {
                    console.log('Expense submitted:', expenseData);
                }}
            />

            <AddIncomeModal
                open={isshowIncomeModel}
                onClose={Showincomecancel}
                onAddIncome={(incomeData) => {
                    console.log('Income submitted:', incomeData);
                }}
            />
            



        </div>
    );
};

export default Dashboard;
