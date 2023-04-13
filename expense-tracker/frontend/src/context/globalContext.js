import { createContext, useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/'
const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //income calculation
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income).catch((error) => {
            setError(error.response.data.message)
        })

        getIncome();
    }

    const getIncome = async (income) => {
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data);

    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncome();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        });

        return totalIncome;
    }

    //Expense calculation

    const addExpense = async (expenses) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expenses).catch((error) => {
            setError(error.response.data.message)
        })

        getExpense();
    }

    const getExpense = async (income) => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data);

    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpense();
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((income) => {
            totalExpense = totalExpense + income.amount
        });

        return totalExpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history;
    }

    return (
        <GlobalContext.Provider value={{
            addIncome, getIncome, incomes, deleteIncome, totalIncome, transactionHistory,
            addExpense, getExpense, deleteExpense, totalExpense, expenses, totalBalance, error, setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}