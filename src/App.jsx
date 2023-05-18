import React, {useState, useEffect} from "react"

/**
 * Challenge:
 * 
 * When the timer reaches 0, count the number of words the user typed in 
 * and display it in the "Word count" section
 */

function App() {
    const TIME_LEFT = 2
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(TIME_LEFT)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function newGame(){
        setIsTimeRunning(true)
        setTimeRemaining(TIME_LEFT)
        setText("")
        setWordCount(0)
    }
    
    function endGame() {        
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }
    
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
        
    }, [timeRemaining, isTimeRunning])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button 
                    onClick={newGame}
                    disabled={isTimeRunning}
                    >Start
            </button>
            <h1>Word count:{wordCount}</h1>
        </div>
    )
}
export default App