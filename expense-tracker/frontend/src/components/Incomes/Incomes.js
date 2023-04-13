import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Incomes() {
    const { addIncome, incomes, getIncome, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncome();
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>

                <h2 style={{ textAlign: 'center', justifyContent: 'center', marginBottom: 2 }}>Incomes</h2>
                <h3 className='total-income'>Total Income : <span style={{ color: '#50C878' }}>${totalIncome()}</span></h3>
                <div className='income-content'>
                    <div className='form-container'></div>
                    <div className='incomes' style={{ margin: 10 }}>
                        <Form />
                    </div>
                    <div className='incomes'>
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;

                            return <IncomeItem key={_id} id={_id} title={title} description={description} type={type}
                                date={date} amount={amount} category={category} deleteItem={deleteIncome} />


                        })}
                    </div>
                </div>

            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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


export default Incomes