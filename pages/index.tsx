import type { NextPage } from 'next'
import styles from '../styles/Calculator.module.css';
import {useEffect, useState} from 'react';

const Home: NextPage = () => {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '+', '-', '.'];

  const updateValue = (value:string) => {
    if(
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return;
    };

    setCalc(calc + value);

    if(!ops.includes(value)){
      setResult(eval(calc + value).toString());
    }
  };

  const digits = () => {
    const digits = [];

    for(let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateValue(i.toString())} key={i}>{i}</button>
        );
    };

    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if(calc == '') {
      return;
    };

    const value = calc.slice(0, -1);
    setCalc(value);
  };

  useEffect(() => {
   const getDigits = document.querySelector('#digits');
   if(calc.length >= 15){
    const value = calc.slice(-1);
    setCalc(value);
   }
  }, [calc]);


  return (
    <div className={styles.container}>
      

    <div className={styles.calculator}>
    <div className={styles.displayArea}>
    {result ? <span>({result})</span> : ''} {calc || '0'}
    </div>

    <div className={styles.operators}>
      <button onClick={() => updateValue('/')} className={styles.operator}>/</button>
      <button onClick={() => updateValue('*')} className={styles.operator}>X</button>
      <button onClick={() => updateValue('+')} className={styles.operator}>+</button>
      <button onClick={() => updateValue('-')} className={styles.operator}>-</button>
      <button id="delOperator" onClick={deleteLast} className={styles.operator}>DEL</button>
    </div>

    <div id="digits" className={styles.numbers}>

    	{digits()}
      <button onClick={() => updateValue('0')} >0</button>
      <button onClick={() => updateValue('.')} >.</button>
      <button onClick={calculate}>=</button>

    </div>

    </div>
     
    </div>
  )
}

export default Home
