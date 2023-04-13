const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, deleteIncome, getIncome } = require('../controllers/income');

const router = require('express').Router()

// router.get('/', (req, res) => {
//     res.send('hello route')
// })
router.post('/add-income', addIncome)
    .get('/get-income', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
module.exports = router;