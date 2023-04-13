const ExpenseSchema = require("../models/ExpenseModel")



exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: ' All fields Are Required' })
        }
        if (amount <= 0 || !amount == 'number') {
            return res.status(400).json({ message: ' Amount must be postive number' })
        }

        await expense.save();
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        return res.status(500).json({ message: ' Internal Server error' })
    }

    console.log(expense)
}

exports.getExpense = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id).then((expense) => {
        res.status(200).json({ message: 'Expense Deleted' })
    }).catch((error) => { res.status(500).json({ message: 'Server Error' }) })
} 