import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';
import Button from '../Button/Button';
import { plus } from '../../utils/Icon';

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',

    });

    const { title, amount, date, category, description } = inputState;

    const handleInputs = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
        setError('')
    }
    const handleSubmits = e => {
        e.preventDefault();
        addExpense(inputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    }
    return (
        <ExpenseFormStyled onSubmit={handleSubmits}>
            {error && <p className='error'>{error}</p>}
            <div className='input-control'>
                <input type='text' value={title} name={title} placeholder='Expense Title' onChange={handleInputs('title')} />
            </div>
            <div className='input-control'>
                <input type='text' value={amount} name={amount} placeholder='Expense Amount' onChange={handleInputs('amount')} />
            </div>
            <div className='input-control'>
                <DatePicker id='date' placeholderText='Enter A Date' selected={date} dateFormat='dd/MM/yyyy' onChange={(date) => {
                    setInputState({ ...inputState, date: date })
                }} />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInputs('category')}  >
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInputs('description')}></textarea>

            </div>
            <div className='submit-btn'>
                <Button name={'Add Expense'} icon={plus} bPad={'.8rem 1.6rem'} bRad={'30px'} bg={'#BF40BF'} color={'#FFF'} />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: #36454F;
        &::placeholder{
            color: #808080;
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }
    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color:  #36454F;
            &:focus, &:active{
                color:  #36454F;
            }
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: #702963 !important;
            }
        }
    }
`;

export default ExpenseForm