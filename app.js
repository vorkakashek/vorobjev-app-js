function ready() {
	console.log("app.js");

	//
	// фиксим безумие Эйха

	document.addEventListener('click', e => {
		const target = e.target;

		if (!target.matches('[data-action]')) {
			const parent = target.closest('[data-action]');
			if (parent !== null && !(target.classList.contains('link'))) {
				parent.click();
			}
		}
	});
	//
	// 

	// ВНУТРИ ПК навигации - НАВЕДЕНИЕ НА ДРОПДАУНЫ
	document.addEventListener('mouseover', e => {
		const target = e.target;
		const navlinkCatalog = target.closest('.navlink-catalog ');
		if (target.matches('.dropdown-trigger')) {
			if (navlinkCatalog !== null) {
				
				const linkName = target.querySelector('a').textContent;
				const rightSide = navlinkCatalog.querySelector('.navlink-catalog-lvl-3[data-lvl3-content="' + linkName + '"]')
	
				if (linkName !== null && rightSide !== null) {
					if (!rightSide.classList.contains('active')) {
						[...navlinkCatalog.querySelectorAll('.navlink-catalog-lvl-3')].map(e => e.classList.remove('active'));
						rightSide.classList.add('active');
					}
				}

				if (!target.classList.contains('active')) {
					[...navlinkCatalog.querySelectorAll('.dropdown-trigger')].map(e => e.classList.remove('active'));
					target.classList.add('active');
				}

			}
		}
	});


	// НАВЕДЕНИЕ по стрелке линка
	document.addEventListener('mouseover', e => {
		const target = e.target;

		if (target.classList.contains('navlink')) {
			const navlinkDropdownIcon = target.querySelector('.navlink-dropdown');
			const navigation = target.closest('.navigation');
			const body = document.querySelector('body');

			const navlinkCatalogWrap = navigation.querySelector('.navlink-catalog-wrap');
			const btnMobNav = navigation.querySelector('.btn-mob-menu');

			const navlinkCatalogcontainer = navlinkCatalogWrap.querySelector('.nav-container');

			if (navlinkDropdownIcon !== null) {
				const navlinkGroup = target.closest('.navlink-group');

				if (navlinkGroup !== null) {
					if (!target.classList.contains('active')) {
						// console.log("okay"); 
	
						navlinkCatalogcontainer.style.display = "block";

						// Дали класс .active кликнутой ссылке
						[...navlinkGroup.querySelectorAll('.navlink')].map(e => e.classList.remove('active'));
						target.classList.add('active');

						// body LOCK
						body.classList.add('scroll-lock');

						// Найдем значение dataLinkGroupName активной ссылки
						const dataLinkGroupName = target.getAttribute('data-link-group-name');

						// Открываем менюху!

						navlinkCatalogWrap.classList.add('active');

						// ВЫСТАВИМ ВЫСОТУ НАВИГАЦИИ
						// ВЫСОТА ЭКРАНА МИНУС ВЫСОТА ВИДИМОЙ НАВИГАЦИИ
						navlinkCatalogWrap.style.height = 'calc(100vh - ' + navigation.getBoundingClientRect().bottom + 'px';

						// Открыв менюху, активируем нужный .navlink-catalog
						// Ищем нужный нам .navlink-catalog c ссылками [data-link-group-content]
						// И записываем в переменную
						const navlinkCatalog = navigation.querySelector('.navlink-catalog[data-link-group-content="' + dataLinkGroupName + '"]');

						// Если переменная все таки записалась, то даем ей класс .active
						if (navlinkCatalog !== null && (!navlinkCatalog.classList.contains('active'))) {
							[...navigation.querySelectorAll('.navlink-catalog[data-link-group-content]')].map(e => e.classList.remove('active'));
							navlinkCatalog.classList.add('active');
						}
	
						// ВЫСТАВИМ ВЫСОТУ НАВИГАЦИИ
						// ВЫСОТА ЭКРАНА МИНУС ВЫСОТА ВИДИМОЙ НАВИГАЦИИ
						navigation.querySelector('.navlink-catalog-wrap').style.height = 'calc(100vh - ' + navigation.querySelector('.navlink-group').getBoundingClientRect().bottom + 'px';

						// и добавляем класс .opened объекту .navigation
						navigation.classList.add('opened');

						// отнимаем класс .active у всех .navlink-catalog-link.dropdown-trigger
						[...navigation.querySelectorAll('.navlink-catalog.active .navlink-catalog-link.dropdown-trigger')].map(e => e.classList.remove('active'));
						// даем класс .active первой .navlink-catalog-link.dropdown-trigger
						if (navigation.querySelector('.navlink-catalog.active .navlink-catalog-link.dropdown-trigger') !== null) {
							navigation.querySelector('.navlink-catalog.active .navlink-catalog-link.dropdown-trigger').classList.add('active');
						}

						// УБИРАЕМ класс .active всем .navlink-catalog-lvl-3 с .active
						[...navigation.querySelectorAll('.navlink-catalog.active .navlink-catalog-lvl-3')].map(e => e.classList.remove('active'));
						// даем класс .active первой .navlink-catalog-lvl-3
						if (navigation.querySelector('.navlink-catalog.active .navlink-catalog-lvl-3') !== null) {
							navigation.querySelector('.navlink-catalog.active .navlink-catalog-lvl-3').classList.add('active');
						}

					}
				}
			}
		}


		// КЛИК ПО ОВЕРЛЕЮ
		if (target.matches('.catalog-overlay')) {
			const navigation = target.closest('.navigation');
			const body = document.querySelector('body');
			const navlinkCatalogWrap = navigation.querySelector('.navlink-catalog-wrap');
			const btnMobNav = navigation.querySelector('.btn-mob-menu');

			target.classList.remove('active');
			navigation.classList.remove('opened');
			// body unLOCK
			body.classList.remove('scroll-lock');
			[...navigation.querySelectorAll('.navlink')].map(e => e.classList.remove('active'));
			navlinkCatalogWrap.classList.remove('active');

			// btn-mob-menu снимаем active
			btnMobNav.classList.remove('active');

			if (navigation.classList.contains('opened')) {
				navigation.classList.remove('opened');
				navigation.querySelector('.navlink-catalog-wrap').classList.remove('active');
				[...navigation.querySelectorAll('.navlink')].map(e => e.classList.remove('active'));
				// body unLOCK
				body.classList.remove('scroll-lock');
			}

			//СНИМАЕМ ВСЕ .active
			[...navigation.querySelectorAll('.active')].map(e => e.classList.remove('active'));
		}
		
	});

	// Убрали курсор со стрелки
	// document.addEventListener('mouseout', e => {
	// 	const target = e.target;

	// 	if (target.classList.contains('navlink')) {
	// 		clearTimeout(timerId);
	// 	}

	// });


	// mob nav toggler
	document.addEventListener('click', e => {
		const target = e.target;
		const body = document.querySelector("body");


		// КЛИК по бургер кнопке
		if (target.classList.contains('btn-mob-menu')) {
			const navigation = target.closest('.navigation');
			const navlinkCatalogWrap = navigation.querySelector('.navlink-catalog-wrap');
			const navlinkCatalogcontainer = navlinkCatalogWrap.querySelector('.nav-container');

			if (navigation !== null) {

				if (!target.classList.contains('active')) {
					// обнулим / расставим все active классы внутри мобильной навигации
					// mobile-navlink-group-lvl-1 добавляем
					navigation.querySelector('.mobile-navlink-group-lvl-1').classList.add('active');
					// mobile-navlink-group-lvl-2 убираем
					[...navigation.querySelectorAll('.mobile-navlink-group-lvl-2')].map(e => e.classList.remove('active'));

					// даем класс .active первой .navlink-catalog-link.dropdown-trigger
					navigation.querySelector('.navlink-catalog-link.dropdown-trigger').classList.add('active');

					target.classList.add('active');
					navigation.classList.add('opened');
					navlinkCatalogcontainer.style.display = "block";

					// body LOCK
					body.classList.add('scroll-lock');

					[...navigation.querySelectorAll('.navlink')].map(e => e.classList.remove('active'));
					navigation.querySelector('.navlink').classList.add('active');

					navlinkCatalogWrap.classList.add('active');

					// активируем первую ссылку / вкладку по счету navlink-catalog
					if (navlinkCatalogWrap.querySelector('.navlink-catalog') !== null) {
						[...navlinkCatalogWrap.querySelectorAll('.navlink-catalog')].map(e => e.classList.remove('active'));
						navlinkCatalogWrap.querySelector('.navlink-catalog').classList.add('active');

						navlinkCatalogWrap.querySelector('.navlink-catalog.active .navlink-catalog-lvl-3').classList.add('active')
					}
					


					// ВЫСТАВИМ ВЫСОТУ НАВИГАЦИИ
					// ВЫСОТА ЭКРАНА МИНУС ВЫСОТА ВИДИМОЙ НАВИГАЦИИ
					navigation.querySelector('.mobile-navlink-catalog').style.height = 'calc(100vh - ' + navigation.getBoundingClientRect().bottom + 'px';
					navigation.querySelector('.navlink-catalog-wrap').style.height = 'calc(100vh - ' + navigation.querySelector('.navlink-group').getBoundingClientRect().bottom + 'px';

					// проверим проскроллена ли страница на высоту .top-nav
					// если ДА, то:
					// СКРОЛЛИМ ВНИЗ НА ВЫСОТУ .top-nav
					// !navigation.classList.contains('scrolled')
					if (!navigation.classList.contains('scrolled')) {
						const scrollValue = window.scrollY + navigation.getBoundingClientRect().bottom;
						window.scroll(0, scrollValue);

						// ВЫСТАВИМ ВЫСОТУ НАВИГАЦИИ
						// ВЫСОТА ЭКРАНА МИНУС ВЫСОТА ВИДИМОЙ НАВИГАЦИИ
						navigation.querySelector('.mobile-navlink-catalog').style.height = 'calc(100vh + 11px - ' + navigation.offsetHeight + 'px';
						navigation.querySelector('.navlink-catalog-wrap').style.height = 'calc(100vh - ' + navigation.querySelector('.navlink-group').offsetHeight + 'px';
					}

				} else {
					target.classList.remove('active');
					navigation.classList.remove('opened');
					// body unLOCK
					body.classList.remove('scroll-lock');
					[...navigation.querySelectorAll('.navlink')].map(e => e.classList.remove('active'));
					navlinkCatalogWrap.classList.remove('active');

					//СНИМАЕМ ВСЕ .active
					[...navigation.querySelectorAll('.active')].map(e => e.classList.remove('active'));
				}
			}
		}

		// МОБИЛЬНАЯ НАВИГАЦИЯ
		// КЛИК по стрелке линка
		if (target.classList.contains('navlink-dropdown')) {
			const navlink = target.closest('.mobile-navlink-lvl-1');
			if (navlink !== null) {
				const navlinkGroup = navigation.querySelector('.mobile-navlink-group-lvl-1');

				if (!navlink.classList.contains('active')) {
					if (navlinkGroup !== null) {
						// Дали класс .active кликнутой ссылке
						[...navlinkGroup.querySelectorAll('.mobile-navlink-lvl-1')].map(e => e.classList.remove('active'));
						navlink.classList.add('active');

						// Найдем значение dataLinkGroupName активной ссылки
						const dataLinkGroupName = navlink.getAttribute('data-link-group-name');
						// console.log(dataLinkGroupName)

						// Открываем менюху!
						// и Т.Е. удаляем класс active у левл 1 - navlinkGroup
						navlinkGroup.classList.remove('active');
						// Т.Е. активируем mobile-navlink-group-lvl-2 с нужным data-link-group-content
						// И записываем в переменную
						const navlinkCatalog = navigation.querySelector('.mobile-navlink-group-lvl-2[data-link-group-content="' + dataLinkGroupName + '"]');
						navlinkCatalog.classList.add('active');

					}

				} else {
					navlink.classList.remove('active');
				}
			}
		}

		// КЛИК по стрелке назад - вернуться на уровень навигации №1
		if (target.classList.contains('navlink-dropdown')) {
			const navlinkGroup = target.closest('.mobile-navlink-group-lvl-2');
			const parent = target.closest('.mobile-navlink-back-btn');
			if (navlinkGroup !== null && parent !== null) {
				navlinkGroup.classList.remove('active');
				navigation.querySelector('.mobile-navlink-group-lvl-1').classList.add('active');
				[...navigation.querySelectorAll('.mobile-navlink-lvl-1')].map(e => e.classList.remove('active'));
			}
		}

		// КЛИК по стрелке - раскрыть группы ссылок (уровни 3-4)
		if (target.classList.contains('navlink-dropdown')) {
			const navlink = target.closest('.mobile-navlink-lvl-2.mobile-navlink-dropdown-wrap');
			const dropdownWrap = target.closest('.mobile-navlink-dropdown');
			const navlinkGroup = target.closest('.mobile-navlink-group-lvl-2');
			if (navlink !== null && dropdownWrap !== null) {
				if (!dropdownWrap.classList.contains('active')) {
					[...navlinkGroup.querySelectorAll('.mobile-navlink-dropdown')].map(e => e.classList.remove('active'));
					dropdownWrap.classList.add('active');
				} else {
					dropdownWrap.classList.remove('active');
				}
			}
		}

		

		// КЛИК по ИМЕННО стрелке линка -ПК
		if (target.classList.contains('navlink-dropdown')) {
			const navlink = target.closest('.navlink');
			const navigation = target.closest('.navigation');

			const navlinkCatalogWrap = navigation.querySelector('.navlink-catalog-wrap');
			const btnMobNav = navigation.querySelector('.btn-mob-menu');

			const navlinkCatalogcontainer = navlinkCatalogWrap.querySelector('.nav-container');


			if (navlink !== null) {
				const navlinkGroup = navlink.closest('.navlink-group');

				if (navlinkGroup !== null) {
					if (!navlink.classList.contains('active')) {
						navlinkCatalogcontainer.style.display = "block";

						// убираем всем navlinkCatalogWrap .navlink-catalog клас .active
						// даем .active первому navlinkCatalogWrap .navlink-catalog
						if (navlinkCatalogWrap.querySelector('.navlink-catalog') !== null) {
							[...navlinkCatalogWrap.querySelectorAll('.navlink-catalog')].map(e => e.classList.remove('active'));
							navlinkCatalogWrap.querySelector('.navlink-catalog').classList.add('active');
						}

						// Дали класс .active кликнутой ссылке
						[...navlinkGroup.querySelectorAll('.navlink')].map(e => e.classList.remove('active'));
						navlink.classList.add('active');

						// body LOCK
						body.classList.add('scroll-lock');

						// Найдем значение dataLinkGroupName активной ссылки
						const dataLinkGroupName = navlink.getAttribute('data-link-group-name');

						// Открываем менюху!

						navlinkCatalogWrap.classList.add('active');

						// ВЫСТАВИМ ВЫСОТУ НАВИГАЦИИ
						// ВЫСОТА ЭКРАНА МИНУС ВЫСОТА ВИДИМОЙ НАВИГАЦИИ
						navlinkCatalogWrap.style.height = 'calc(100vh - ' + navigation.getBoundingClientRect().bottom + 'px';

						// Открыв менюху, активируем нужный .navlink-catalog
						// Ищем нужный нам .navlink-catalog c ссылками [data-link-group-content]
						// И записываем в переменную
						const navlinkCatalog = navigation.querySelector('.navlink-catalog[data-link-group-content="' + dataLinkGroupName + '"]');

						// Если переменная все таки записалась, то даем ей класс .active
						if (navlinkCatalog !== null && (!navlinkCatalog.classList.contains('active'))) {
							[...navigation.querySelectorAll('.navlink-catalog[data-link-group-content]')].map(e => e.classList.remove('active'));
							navlinkCatalog.classList.add('active');
						}

						// ВЫСТАВИМ ВЫСОТУ НАВИГАЦИИ
						// ВЫСОТА ЭКРАНА МИНУС ВЫСОТА ВИДИМОЙ НАВИГАЦИИ
						navigation.querySelector('.navlink-catalog-wrap').style.height = 'calc(100vh - ' + navigation.querySelector('.navlink-group').getBoundingClientRect().bottom + 'px';

						// и добавляем класс .opened объекту .navigation
						navigation.classList.add('opened');

						// отнимаем класс .active у всех .navlink-catalog-link.dropdown-trigger
						[...navigation.querySelectorAll('.navlink-catalog.active .navlink-catalog-link.dropdown-trigger')].map(e => e.classList.remove('active'));
						// даем класс .active первой .navlink-catalog-link.dropdown-trigger
						if (navigation.querySelector('.navlink-catalog.active .navlink-catalog-link.dropdown-trigger') !== null) {
							navigation.querySelector('.navlink-catalog.active .navlink-catalog-link.dropdown-trigger').classList.add('active');
						}
						
						// УБИРАЕМ класс .active всем .navlink-catalog-lvl-3 с .active
						[...navigation.querySelectorAll('.navlink-catalog.active .navlink-catalog-lvl-3')].map(e => e.classList.remove('active'));
						// даем класс .active первой .navlink-catalog-lvl-3
						if (navigation.querySelector('.navlink-catalog.active .navlink-catalog-lvl-3') !== null) {
							navigation.querySelector('.navlink-catalog.active .navlink-catalog-lvl-3').classList.add('active');
						}


					} else {
						navlink.classList.remove('active');


						if (!btnMobNav.classList.contains('active')) {
							navigation.classList.remove('opened');
							// body unLOCK
							body.classList.remove('scroll-lock');
						}

						if (navlinkCatalogWrap.classList.contains('active') && !navigation.querySelector('.btn-mob-menu').classList.contains('active')) {
							navlinkCatalogWrap.classList.remove('active');
						}

						if (navlinkCatalogWrap.classList.contains('active') && navigation.querySelector('.btn-mob-menu').classList.contains('active')) {
							navlinkCatalogcontainer.style.display = 'none';

							// navlinkCatalogWrap.classList.add('overlay-active');
						}

					}

				}
			}
		}
	});



	//Get the button
	let mybutton = document.getElementById("btn-back-to-top");

	let navigation = document.getElementById("navigation");

	// When the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function () {
		scrollFunction();
		scrollFunctionNav();
	};

	function scrollFunctionNav() {
		if (document.body.scrollTop > document.querySelector('.nav-top').offsetHeight || document.documentElement.scrollTop > document.querySelector('.nav-top').offsetHeight) {
			navigation.classList.add("scrolled");
		} else {
			navigation.classList.remove("scrolled");
		}
	}

	function scrollFunction() {
		if (
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20
		) {
			// mybutton.style.display = "flex";
			mybutton.classList.add("active");
		} else {
			// mybutton.style.display = "none";
			mybutton.classList.remove("active");
		}
	}
	// When the user clicks on the button, scroll to the top of the document
	mybutton.addEventListener("click", backToTop);

	function backToTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}


	lightbox.option({
		// 'resizeDuration': 200,
		// 'wrapAround': true
		disableScrolling: true,
		showImageNumberLabel: false,
	})


	// Swiper Этапы лечения -- _stages.pug
	for (const element of document.querySelectorAll('.swiper-stages-container')) {
		const stagesSwiper = new Swiper('.swiper-stages-container', {
			// Optional parameters
			loop: false,
			grabCursor: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1200: {
					slidesPerView: '3',
				},
				992: {
					slidesPerView: '2',
					navigation: false,
					spaceBetween: 60,
				},
				768: {
					slidesPerView: '1',
					spaceBetween: 60,
				},
				576: {
					slidesPerView: '1',
					spaceBetween: 60,
				},
				0: {
					spaceBetween: 20,
				}
			}
		});
	}


	// Swiper Специалисты -- _specialists.pug
	for (const element of document.querySelectorAll('.swiper-specialists-container')) {
		const specialistsSwiper = new Swiper('.swiper-specialists-container', {
			// Optional parameters
			loop: false,
			spaceBetween: 40,
			grabCursor: true,
			speed: 500,

			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1200: {
					slidesPerView: '4',
				},
				992: {
					slidesPerView: '3',
					navigation: false,
				},
				768: {
					slidesPerView: '2',
				},
				0: {
					slidesPerView: '1',
				},
			}
		});
	}


	// Swiper Сертификаты -- _sertificates.pug
	for (const element of document.querySelectorAll('.swiper-sertificates-container')) {
		const certificatesSwiper = new Swiper('.swiper-sertificates-container', {
			// Optional parameters
			loop: false,
			spaceBetween: 100,
			grabCursor: true,
			speed: 500,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1200: {
					slidesPerView: '4',
				},
				992: {
					slidesPerView: '3',
					navigation: false,
				},
				768: {
					slidesPerView: '2',
				},
				0: {
					slidesPerView: '1',
				},
			}
		});
	}


	// Swiper Отзывы -- _feedbacks.pug
	for (const element of document.querySelectorAll('.swiper-feedbacks-container')) {
		const certificatesSwiper = new Swiper('.swiper-feedbacks-container', {
			// Optional parameters
			loop: false,
			spaceBetween: 40,
			grabCursor: true,
			speed: 500,
			height: "auto",
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1200: {
					slidesPerView: '3',
				},
				992: {
					slidesPerView: '2',
					navigation: false,
				},
				768: {
					slidesPerView: '1',
				},
				0: {
					slidesPerView: '1',
				},
			}
		});
	}


	// управление видосом О клинике
	document.addEventListener("click", e => {
		const target = e.target;
		
		// youtube:

		// // ВОСПРОИЗВЕДЕНИЕ ВИДОСА ПОСЛЕ ОТКРЫТИЯ МОДАЛКИ
		// if (target.matches(".play-video-button[data-bs-target='#modalAboutClinic']")) {
		// 	player.playVideo();
		// }

		// // СТОП ВИДОС ПОСЛЕ ЗАКРЫТИЯ МОДАЛКИ
		// if (target.matches('.btn-close') && target.closest('.modal#modalAboutClinic') !== null) {
		// 	player.stopVideo();
		// }

		// html5
		const video = document.querySelector('#modalAboutClinic video'); 

		if (target.matches(".play-video-button[data-bs-target='#modalAboutClinic']")) {
			video.play();
		}

		if ((target.matches('.btn-close') && target.closest('.modal#modalAboutClinic') !== null) || target.matches('.modal')) {
			video.pause();
		}
	});
}
document.addEventListener("DOMContentLoaded", ready);