const biList = document.querySelector('.bi-list')
const navbar = document.querySelector('#navbar')
const listItem = document.querySelector('.list')
const listItems = document.querySelectorAll('.list-item')
const header = document.getElementById('header')
const topbar = document.getElementById('topbar')

//------ Switch Navbar ---------
switchNav()
window.addEventListener('resize', () => switchNav())

function switchNav() {
    navbar.classList.remove('nav-mobile')
    const width = window.innerWidth
    if (width <= 900) {
        biList.style.display = 'block'
        listItem.style.display = 'none'
    }
    else {
        biList.style.display = 'none'
        listItem.style.display = 'flex'
        navbar.classList.remove('nav-mobile')
        navbar.classList.add('navbar-menu')
    }
}

biList.addEventListener('click', () => {
    navbar.classList.remove('navbar-menu')
    navbar.classList.add('nav-mobile')
    listItem.style.display = 'block'
})

function removeActiveMenuItem() {
    listItems.forEach(item => {
        item.classList.remove('active')
    })
}

listItems.forEach(item => {
    item.addEventListener('click', () => {
        removeActiveMenuItem();
        item.classList.add('active')
        switchNav()
    })
})

window.addEventListener('scroll', (e) => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        topbar.classList.add('topbar-scrolled')
        header.classList.add('topbar-scrolled')
    }
    else {
        topbar.classList.remove('topbar-scrolled')
        header.classList.remove('topbar-scrolled')
    }
})


const body = document.getElementById('carousel')
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const captions = document.querySelectorAll('.slid-caption')

let activeSlide = 0



if (rightBtn)
rightBtn.addEventListener('click', () => {
    activeSlide++

    if (activeSlide > slides.length - 1) {
        activeSlide = 0
    }

    setBgToBody()
    setActiveSlide()

})

if (leftBtn)
leftBtn.addEventListener('click', () => {
    activeSlide--

    if (activeSlide < 0) {
        activeSlide = slides.length - 1
    }

    setBgToBody()
    setActiveSlide()

})

setBgToBody()



function setBgToBody() {
    if (body)
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}


//function setActiveSlide() {
//    slides.forEach(slide => {
//        slide.classList.remove('active')
//    })
//    if (slides)
//    slides[activeSlide].classList.add('active')
//    captions[activeSlide].style.display='flex'
//}

////setInterval(slider,5000)

////setTimeout(slider, 2000)

//function slider() {
//    activeSlide++

//    if (activeSlide > slides.length - 1) {
//        activeSlide = 0
//    }
    
//    setBgToBody()
//    setActiveSlide()
//}


//setInterval(slider,10000)








