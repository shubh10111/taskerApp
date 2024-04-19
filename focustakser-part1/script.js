const checkBoxList = document.querySelectorAll(".custom-checkbox")
const inputFields = document.querySelectorAll(".goal-input")
const errorLabel  = document.querySelector("error-label")
const progressBar = document.querySelector('.progress-bar')
const progressLabel = document.querySelector('.progress-label')
const progressValue = document.querySelector('.progress-value')
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
const allQuotes =[
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! you just comeleted all the goals, time for chill :D'
    
]

let completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
  ).length
  progressValue.style.width = `${completedGoalsCount/3 * 100}%`
  progressValue.firstElementChild.textContent = `${completedGoalsCount}/3 completed`
  progressLabel.textContent = allQuotes[completedGoalsCount]




checkBoxList.forEach((checkBox)=>{
    checkBox.addEventListener('click',(e)=>{
        const allGoalsAdded = [...inputFields].every(function(input){
            return input.value
        })
        if (allGoalsAdded){
            checkBox.parentElement.classList.toggle("completed")
            const inputId = checkBox.nextElementSibling.id 
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter(
                (goal) => goal.completed
              ).length
            progressValue.style.width = `${completedGoalsCount/3 * 100}%`
            progressValue.firstElementChild.textContent = `${completedGoalsCount}/3 completed`
            progressLabel.textContent = allQuotes[completedGoalsCount]
            localStorage.setItem('allGoals',JSON.stringify(allGoals))

        }else{
            progressBar.classList.add('show-error')
        }
    })
})

inputFields.forEach((input) => {
    input.value = allGoals[input.id].name
    if (allGoals[input.id].completed){
        input.parentElement.classList.add("completed")
    }
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })
    if (input.value){

    }
    input.addEventListener('input',(e)=>{
        if (allGoals[input.id].completed){
          input.value =  allGoals[input.id].name
          return
        }
    allGoals[input.id] = {
        name:input.value,
        completed:false,

    }
    localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
})