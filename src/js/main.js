const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav__item')
const navBtnBars = document.querySelector('.burger-btn__bars')
const allSections = document.querySelectorAll('.section')
const footerYear = document.querySelector('.footer__year')
const msgStatus = document.querySelector('.contact__form-msg-status')
const navDesktop = document.querySelector('.desktop-nav')
const allNavDesktopItems = document.querySelectorAll('.desktop-nav__item')

const setActiveClass = event => {
	allNavDesktopItems.forEach(item => item.classList.remove('desktop-nav__item--active'))

	event.currentTarget.classList.add('desktop-nav__item--active')
}

const handleNav = () => {
	nav.classList.toggle('nav--active')

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active')
		})
	})
	handleNavItemsAnimation()
}

const handleNavItemsAnimation = () => {
	let delayTime = 0

	allNavItems.forEach(item => {
		item.classList.toggle('nav-item-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const handleObserver = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.remove('black-bars-color')
		}
	})
}

const scrollFunction = () => {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		navDesktop.classList.add('desktop-nav--transparent')
	} else {
		navDesktop.classList.remove('desktop-nav--transparent')
	}
}

const handleMailForm = () => {
	if (document.location.search === '?mail_status=sent') {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'

		setTimeout(() => {
			msgStatus.classList.remove('success')
		}, 3000)
	}

	if (document.location.search === '?mail_status=error') {
		msgStatus.classList.add('error')
		msgStatus.textContent = 'Błąd wysyłania!!'

		setTimeout(() => {
			msgStatus.classList.remove('error')
		}, 3000)
	}
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleMailForm()
handleCurrentYear()
navBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', handleObserver)
window.onscroll = () => scrollFunction()

allNavDesktopItems.forEach(item => {
	item.addEventListener('click', setActiveClass)
})
