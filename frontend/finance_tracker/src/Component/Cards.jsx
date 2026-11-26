const Cards = ({ showExpencemodel, showIncomeModel,
  totalIncome,
  totalExpense,
  currentBalance

}) => (








  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-slate-500">Current Balance:</h2>
      <p className="mt-2 text-2xl font-bold text-slate-900">{currentBalance}</p>
      <button className="mt-4 rounded-lg bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-400">
        Reset Balance
      </button>
    </article>
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-slate-500">Income</h2>
      <p className="mt-2 text-2xl font-bold text-emerald-700">{totalIncome}</p>
      <button className="mt-4 rounded-lg bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-400" onClick={showIncomeModel}>
        Add Income
      </button>
    </article>
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-slate-500">Expenses</h2>

      <p className="mt-2 text-2xl font-bold text-rose-700">{totalExpense}</p>
      <button
        className="mt-4 rounded-lg bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-400"
        onClick={showExpencemodel}
      >
        Add Expense
      </button>
    </article>
  </section>
);

export default Cards;