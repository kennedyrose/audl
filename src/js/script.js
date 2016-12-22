// @codekit-prepend "_slide.js";
// @codekit-prepend "_fastclick.js";

!function(win, doc){"use strict"

	// Activate slide
	var slideShow = slide()
	slideShow.init()

	// Activate fastclick
	FastClick.attach(document.body)

	var scrollSlides = {
			faq: doc.getElementById('faq')
		},
		scrollDisableDelay = 500,
		scrollDisable = false

	function scrollEnable(){
		scrollDisable = false
	}

	// Change slide on mouse wheel
	var moving = false
	window.startMove = function(){
		moving = true
	}
	window.stopMove = function(){
		setTimeout(stopMoving, 400)
	}
	function stopMoving(){
		moving = false
	}
	function onWheel(e){
		if(moving){
			e.preventDefault()
			return false
		}
		var dir = e.wheelDelta || -e.detail
		if(slide.onSlide in scrollSlides){
			for(var i = e.path.length; i--;){
				if(e.path[i].dataset && 'scroll' in e.path[i].dataset){
					// See if scrollTop is at max or min
					if(e.path[i].scrollTop === 0 && dir > 0){
						break
					}
					else if(e.path[i].scrollTop >= e.path[i].scrollHeight - e.path[i].clientHeight && dir < 0){
						break
					}
					else{
						// Temporary disable scroll
						scrollDisable = true
						setTimeout(scrollEnable, scrollDisableDelay)
					}
					return true
				}
			}
		}
		if(scrollDisable === true){
			e.preventDefault()
			return false
		}
		e.preventDefault()
		if(Math.abs(dir) < 5){
			return false
		}
		// Scrolling up
		if(dir > 0){
			slideShow.prev()
			return false
		}
		// Scrolling down
		slideShow.next()
		return false
	}
	doc.addEventListener("mousewheel", onWheel, false)
	doc.addEventListener("DOMMouseScroll", onWheel, false)


	// Nav icon
	var navIcon = doc.getElementById('navIcon'),
		body = document.body
	navIcon.addEventListener('click', function(){
		if(slide.onSlide === 'navMenu'){
			return slideShow.goto(slide.lastSlide)
		}
		slideShow.goto('navMenu')
	}, false)


	// Contact form
	var form = doc.getElementById('contactForm')
	/*
	form.addEventListener('submit', function(e){
		e.preventDefault()

		var r = new XMLHttpRequest()
		r.open("POST", "contact.php", true)
		r.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		r.onreadystatechange = function () {
			if (r.readyState != 4 || r.status != 200){
				return
			}
			if(r.responseText === 'success'){
				window.alert("Thanks for the message! I'll get back to you soon.")
				slideShow.goto('about')
			}
			else{
				window.alert(r.responseText);
			}
		}
		r.send('email=' + form.querySelector('#yourEmail').value + '&message=' + form.querySelector('#yourMessage').value + '&captcha=' + form.querySelector('.g-recaptcha-response').value)

		return false
	}, false)
*/
	form.addEventListener('keyup', function(e){
		e.stopPropagation()
	})
	form.addEventListener('keydown', function(e){
		e.stopPropagation()
	})


	// If touch screen, display arrows
	if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)){
		var leftArrow = doc.getElementById('leftArrow'),
			rightArrow = doc.getElementById('rightArrow')
		leftArrow.style.display = 'block'
		rightArrow.style.display = 'block'
		leftArrow.addEventListener('touchstart', slideShow.prev, false)
		rightArrow.addEventListener('touchstart', slideShow.next, false)
	}




}(window, document)