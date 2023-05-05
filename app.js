const puzzleBoard = document.querySelector('#puzzle');
const SolveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')

const squares = 81;
const submission = [];
for(let i = 0; i< squares; i++){
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute('min', 1);
    inputElement.setAttribute('max', 9);
    puzzleBoard.appendChild(inputElement);


    if(
        ((i%9 == 0 || i%9 == 1 || i%9 == 2) && i<21)||
        ((i%9 == 6 || i%9 == 7 || i%9 == 8) && i<27)||
        ((i%9 == 3 || i%9 == 4 || i%9 == 5) && (i>27 && i< 53))||
        ((i%9 == 0 || i%9 == 1 || i%9 == 2) && i>53)||
        ((i%9 == 6 || i%9 == 7 || i%9 == 8) && i>53)
        ){
        inputElement.classList.add('even-section');
    }
    else{
        inputElement.classList.add('odd-section');
    }

}


const joinValues = () =>{
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if(input.value){
            submission.push(input.value)
            
        }
        else{
            submission.push('.')
            
        }
    })
    
}

const populatevalue = (solvable, data) => {
    const input = document.querySelectorAll('input');
    if(solvable && solution){
        input.forEach ((input, i) => {
            input.value = solution[i]
            solutionDisplay.innerHTML = "this is the answer"
        })
    }
    else{
        console.log("NOT POSSIBLE");
        solutionDisplay.innerHTML = "Not possible"
    }
    

}


//rapid api
const solve =() =>  {
    joinValues();
    
    const data = submission.join('');
    const options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
    },
    data: {
        puzzle: data
    }
    };

    try {
        const response = axios.request(options);
        console.log(response.data);
        populatevalue(response.data.solvable && response.data.solution);
    } catch (error) {
        console.error(error);
    }
}

SolveButton.addEventListener("click", solve);