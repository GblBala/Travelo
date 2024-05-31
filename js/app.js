const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;

let rotateDegree = 0;

window.addEventListener("mousemove", (e) =>{
    xValue = e.clientX - window.innerWidth / 2;
    yValue= e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth/2)) * 20;
    
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth/ 2 ? 1 : -1;
        let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform =`translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${-yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg)`;
    });

});

/* GSAP ANIMATION */

let timeline = gsap.timeline();

parallax_el.forEach((el) =>{
    timeline.from(
        el, 
        {
            top: `${el.offsetHeight / 2 + el.dataset.distance}px` ,
            duration : 1,
            ease: "power3.out"
        },
        "0.5"
    );
})

timeline.from(".text h1", {
    y:window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
    duration: 1.5,
},
"2").from(".text h2", {
    y: -150,
    opacity: 0,
    duration: 1,
},
"2").from(".text .btn", {
    y: -150,
    opacity: 0,
    duration: 1,
},
"2.5").from(".hide", {
    opacity: 0,
    duration: 1,
}, "3");

