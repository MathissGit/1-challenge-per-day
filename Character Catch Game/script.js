const screens = document.querySelectorAll('.screen');
const choose_character_btn = document.querySelectorAll('.choose-character-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('Score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_characters = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_character_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const id = btn.getAttribute('id')
        const src = img.getAttribute('src')
        switch (id) {
            case 'Michael':
                img.setAttribute('src', 'image/Michael-Scott.png')
                img.setAttribute('alt', 'Michael Scott')
                break;
            case 'Kevin':
                img.setAttribute('src', 'image/kevin-malone.png')
                img.setAttribute('alt', 'Kevin Malone')
                break;
            case 'Dwight':
                 img.setAttribute('src', 'image/dwight-schrute.png')
                 img.setAttribute('alt', 'Dwight Fart Schrute')
                 break;
            default:
                break;
        }
        
        const alt = img.getAttribute('alt')
        selected_characters = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createCharacter, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m 
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createCharacter() {
    const character = document.createElement('div')
    character.classList.add('character')
    const { x, y } = getRandomLocation()
    character.style.top = `${y}px`
    character.style.left = `${x}px`
    character.innerHTML = `<img src="${selected_characters.src}" alt="${selected_characters.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    character.addEventListener('click', cacthCharacter)

    game_container.appendChild(character)
    increaseScore();
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.floor(Math.random() * (width - 200) + 100)
    const y = Math.floor(Math.random() * (height - 200) + 100)
    return { x, y }
}

function cacthCharacter() {
    setTimeout(createCharacter, 1000)
    setTimeout(createCharacter, 1500)
    document.querySelector('catch')
}

function increaseScore() {
    score++
    if(score > 19) {
        message.setAttribute('class','visible')
    }
    scoreEl.innerHTML = `score: ${score}`
}