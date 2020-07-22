const sections = [
    ['login','Окно логина'],
    ['profile','Профиль'],
    ['about','О приложении'],
]

const nav = document.getElementById('navigation')

const application = document.getElementById('application')


for (let section of sections) {
    const button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.setAttribute('data-section', section[0])
    button.value = section[0]
    nav.appendChild(button)
}

const liveSectionsCollection = application.getElementsByTagName('section')

nav.addEventListener('click', function(event){
    window.me=1
    console.log(event.target)
    const sectionId = event.target.getAttribute('data-section')
    console.log(sectionId)
    console.log(liveSectionsCollection)
    const liveSectionsArray = Array.from(liveSectionsCollection)
    liveSectionsArray.forEach(function (sectionElement){
        sectionElement.hidden = true
        if(sectionElement.id === sectionId){
            sectionElement.hidden = false
        }
    })
})

