import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const { addExpense, expenses, getExpense, deleteExpense, totalExpense } = useGlobalContext();

    useEffect(() => {
        getExpense();
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>

                <h2 style={{ textAlign: 'center', justifyContent: 'center', marginBottom: 2 }}>Expenses</h2>
                <h3 className='total-income'>Total Expenses : <span style={{ color: '#50C878' }}>${totalExpense()}</span></h3>
                <div className='income-content'>
                    <div className='form-container'></div>
                    <div className='incomes' style={{ margin: 10 }}>
                        <ExpenseForm />
                    </div>
                    <div className='incomes'>
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;

                            return <IncomeItem key={_id} id={_id} title={title} description={description} type={type}
                                date={date} amount={amount} category={category} deleteItem={deleteExpense} />


                        })}
                    </div>
                </div>

            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        height: 20px;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: .3rem 0;
        font-size: 1.5rem;
        gap: .5rem;
        span{
            font-size: 1.5rem;
            text-align: center;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 1rem;
        .incomes{
            flex: 1;
        }
    }
`;


export default Expenses;