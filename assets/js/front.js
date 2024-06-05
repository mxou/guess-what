document.addEventListener('DOMContentLoaded', function () {

    const count_page_btn = document.querySelectorAll('.count_page_btn');
    const remove_btn = document.querySelector('.remove_btn');
    const add_btn = document.querySelector('.add_btn');
    const random_btn = document.querySelectorAll('.button')
    const arbutton = document.querySelectorAll('.add_remove-btn')

    gsap.from(".buttonIndex", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "elastic",
        stagger: 0.2,
    });

    gsap.to(".buttonIndex:not(#caca)", {
        duration: 1,
        ease: "elastic",
        delay: 5,
        repeatDelay: 5,
        scale: 1.1,
        // rotation: 15,
        repeat: -1,
        yoyo: "true"
    });

    const logotl = gsap.timeline();

    // gsap.from("#Logo_main_page", {
    //     x: -300,
    //     opacity: 0,
    //     duration: .7,
    //     ease: "power2.out",
    //     delay: .2,
    //     rotation: -300
    // });

    logotl.from("#Logo_main_page", {
        x: -300,
        opacity: 0,
        duration: .7,
        ease: "power2.out",
        delay: .2,
        rotation: -300
    },);
    logotl.to("#Logo_main_page", {
        duration: .8,
        scale: .8,
        ease: "power2.inOut"
    }, "-=30%");

    // random_btn.addEventListener('click', function () {
    //     gsap.fromTo('.button', {
    //         scale: .8,
    //         duration: .2,
    //         ease: "power2.out"
    //     })
    // })
    // arbutton.addEventListener('click', function () {
    //     gsap.fromTo('.add_remove_btn', {
    //         scale: .8,
    //         duration: .2,
    //         ease: "power2.out"
    //     })
    //     console.log('écrase toi')
    // })

    gsap.from('h1', {
        y: -100,
        opacity: 0,
        duration: 1.3,
        ease: "elastic.out"
    })

    gsap.from('.button:not(.buttonIndex)', {
        x: -200,
        opacity: 0,
        stagger: .1,
        duration: .25,
        ease: "power2.out"
    })

    // gsap.from('add_remove_button', {
    //     opacity: 0,
    //     duration: .3,
    //     delay: .2,
    //     ease: "power2.out"
    // })

    const count_btn = document.querySelector('.count_btn');
    let count_player = 3;
    count_btn.textContent = Number(count_player);
    console.log(count_btn.textContent);

    count_page_btn.forEach(function (button) {
        button.addEventListener('click', function () {
            this.classList.toggle('button_active');
            console.log('Classe togglée');
        });
    });

    function updateButtonState() {
        if (count_player === 2) {
            remove_btn.style.backgroundColor = '#FCD772';
            remove_btn.disabled = true;
            remove_btn.style.pointerEvents = 'none';
        } else {
            remove_btn.style.backgroundColor = '#FF8811';
            remove_btn.disabled = false;
            remove_btn.style.pointerEvents = 'auto';
        }
        playersInput.value = count_player;
    }



    add_btn.addEventListener('mousedown', function () {
        gsap.to('.add_btn', {
            scale: 0.5,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    add_btn.addEventListener('mouseup', function () {
        count_player = count_player + 1;
        count_btn.textContent = Number(count_player);
        gsap.to('.add_btn', {
            scale: 1,
            duration: 0.1,
            ease: "power2.out"
        });
        console.log(count_player);
        updateButtonState();
    });


    remove_btn.addEventListener('mousedown', function () {
        gsap.to('.remove_btn', {
            scale: 0.5,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    remove_btn.addEventListener('mouseup', function () {
        count_player = count_player - 1;
        count_btn.textContent = Number(count_player);
        gsap.to('.remove_btn', {
            scale: 1,
            duration: 0.1,
            ease: "power2.out"
        });
        console.log(count_player);
        updateButtonState();
    });




});