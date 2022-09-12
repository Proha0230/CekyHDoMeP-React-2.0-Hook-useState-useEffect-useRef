
import './App.css';
// import React, {useEffect} from "react";
import React, {useState, useEffect,useRef} from "react";

// здесь мы создали функцию по которой будут выводиться данные из localStorage'а если они есть 
// в изначальное свойство count

function setDefaultValue (){
  const userCount = localStorage.getItem('count');
  return userCount ? +userCount : 0;
};

function App (){

const [count, setCount] = useState(setDefaultValue);
const [isCounting, setIsCount] = useState(false);
const timerIDRef = useRef(null);

const StartTimer = ()=> {
  setIsCount(true);
};

const StopTimer = ()=> {
  setIsCount(false);
};

const ResetTimer = ()=> {
  setCount(0);
  setIsCount(false);
}

//здесь у нас идет привязка к count'у и каждое его изменение будет записано в localStorage
useEffect ( ()=> {
  localStorage.setItem("count", count);
}, [count] );

// здесь у нас идет проверка свойства isCounting (привязка тоже isCounting) из хука setState , 
// в нашем случае оно принимает либо true либо false. При true выполнится setInterval который будет изменять
// предыдущий Count (prevCount)  и к нему прибавлять единицу каждые 1000 мс (1сек).
// если false то выполнится return и остановит интервал и очистит данные Ref'а (на null)
useEffect ( ()=> {
  if (isCounting) {
    timerIDRef.current=setInterval (()=>{
      setCount((prevCount) => prevCount +1);
    }, 1000);
  }

  return ()=> {
    clearInterval(timerIDRef.current);
    timerIDRef.current = null;
  };
  }, [isCounting] );


    return (
      <div className='App' style={{ backgroundColor: "#FFFFCC"}}>
         <h1>React Секундомер 2.0</h1>
         <div> <h1>{count}</h1> </div>

{/* здесь мы так же проверяем параметр isCounting но ввиде противоположности. если он false то покажется
    кнопка start, а если true то кнопка stop. Грубо говоря если таймер идет то он покажет кнопку Остановить
   а если таймер стопнут или не сброшен то кнопка Старт" */}
        {!isCounting ?         
         <button onClick = {StartTimer} style= {{margin: "10px"}}>Старт</button>
         :
         <button onClick = {StopTimer} style= {{margin: "10px"}}>Остановить</button>
        }
         <button onClick={ResetTimer}>Сброс</button>
        
      </div>
    )
  
}

export {App};