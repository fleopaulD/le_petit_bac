let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const mainDiv = document.querySelector(".main")

const buttonDiv = document.createElement("div")
const startButton = document.createElement("button")
startButton.classList.add("custom-btn", "btn-11")
startButton.innerHTML = "Let's gooooo"
buttonDiv.appendChild(startButton);

const remainingLettersDiv = document.createElement("p")
remainingLettersDiv.innerHTML = `Encore ${letters.length} lettres en stock`
remainingLettersDiv.style.textAlign = "center"
buttonDiv.appendChild(remainingLettersDiv)
mainDiv.appendChild(buttonDiv)

const audioAlert = new Audio('alert.mp3')

async function generateLettersAnim(n) {
    if(n === 0) return

    const letter = letters[Math.floor(Math.random() * letters.length)][0]
    await wait(80)
    document.querySelector("#letter").innerText = letter.toUpperCase()
    await generateLettersAnim(n - 1)
}

function wait (duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(duration)
        }, duration)
    })
}

async function timerDisplay(duration) {
    if(duration < 0) return

    const timerElement = document.getElementById("timer")

    let minutes = parseInt(duration / 60, 10)
    let secondes = parseInt(duration % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
    await wait(1000)
    timerElement.innerText = `${minutes}:${secondes}`
    await timerDisplay(duration - 1)
}

startButton.addEventListener("click", async function() {
    const timer = document.createElement("div")
    timer.id = ("timer")
    timer.innerText = "--:--"

    const letter = document.createElement("div")
    letter.id = ("letter")
    
    mainDiv.removeChild(buttonDiv)
    mainDiv.appendChild(letter)
    mainDiv.appendChild(timer)

    await generateLettersAnim(30)

    const choosenLetter = letters.splice([Math.floor(Math.random() * letters.length)], 1)[0]
    document.querySelector("#letter").innerText = choosenLetter.toUpperCase()

    await timerDisplay(30)
    audioAlert.play()
    mainDiv.removeChild(letter)
    mainDiv.removeChild(timer)
    remainingLettersDiv.innerHTML = `Encore ${letters.length} lettres en stock`
    mainDiv.appendChild(buttonDiv)
})
