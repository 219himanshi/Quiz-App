import React, { useState ,useRef} from 'react'
import './Quiz.css'
import { data } from '../assets/data'

// function
function Quiz() {

//   use states for storing data just like variables
    let[index,setIndex] = useState(0);
    let[ques,setQues] = useState(data[index]);
    let[lock,setLock1] = useState(false);

    let optio1= useRef(null);
    let optio2= useRef(null);
    let optio3= useRef(null);
    let optio4= useRef(null);
    
    let option_array =[optio1,optio2,optio3,optio4];

    let[score,setScore]= useState(0);
    let[result,setResult]= useState(false);

// arrow function for check and lock answers
    const checkAns=(e,ans)=>{
        if(lock===false){
            if(ques.answer===ans){
                e.target.classList.add("correct");
                setLock1(true);
                setScore(prev=>prev+1)
            }else{
                e.target.classList.add("wrong");
                setLock1(true);
                option_array[ques.answer-1].current.classList.add("correct")
            }
        }
    }

    // function for next button
     const next =()=>{
        if(lock===true){
            if(index===data.length-1){
                setResult(true)
                return 0;
            }
            setIndex(++index)
            setQues(data[index])
            setLock1(false)
            option_array.map((option)=>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
            })
        }
     }

    //  arrow function for reset button
    const reset=()=>{
        setIndex(0);
        setQues(data[0])
        setScore(0)
        setLock1(false)
        setResult(false)
    }
    // html part
    return(
        <div className='outer'>
           <div className='container'>
            {/* condition rendering */}
            {result?<>
            {/*  score interface */}
            <h3>Your Score {score} out of {data.length}</h3>
            <button onClick={reset}>Reset</button>
            </>:<>
            {/* questions interface */}
            <h1>Quiz App</h1>
            <hr />
            <h2>{index+1}.{ques.question}</h2>
            <ul>
                <li ref={optio1} onClick={(e)=>{checkAns(e,1)}}>{ques.option1}</li>
                <li ref={optio2} onClick={(e)=>{checkAns(e,2)}}>{ques.option2}</li>
                <li ref={optio3} onClick={(e)=>{checkAns(e,3)}}>{ques.option3}</li>
                <li ref={optio4} onClick={(e)=>{checkAns(e,4)}}>{ques.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className='index'>{index+1} of {data.length} Questions</div>
            </>}
            
          </div>
        </div>
    )
}

export default Quiz