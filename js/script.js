// brand starting numbers

let binObject = {
    master: [51, 52, 53, 54, 55],
    american: [34, 37],
    discover: [60],
    res: 'visa',
    set brand(value) {
        for(i in this){
            if(this[i].includes(+value)){
                this.res = String(i);
                return true;
            }
        };
        return this.res = 'visa';
    },
    get brand() {
        return this.res;
    },
};

// Card flip animation

let cardCover = document.querySelector(".card_cover");
let cvvInput = document.querySelector('.cvvInput');

document.body.addEventListener('click', (e) => {
    if(e.target == cvvInput)
        return cardCover.style.cssText = "transform: rotateY(180deg);";
    return cardCover.style.cssText = "transform: rotateY(0);"
});

// background-image changing part

let randomCheck = 0;
let random = Math.floor(Math.random() * 7) + 1;
let cardBg = [...document.getElementsByClassName("bg")];

if(random == randomCheck && random != 7) random += 1
        else if(random == randomCheck && random == 7) random = 1;

cardBg.forEach((bg) => {
    bg.style.cssText = `background-image: url(./img/${random}.jpeg);`;
    return randomCheck = random;
})

// Focus part

let root = document.querySelector(":root");
let numberInput = document.getElementById("cardNumber_input");
let nameInput = document.getElementById("cardName_input");
let cardDate = document.querySelector('.expiration_form');

function focus_in_out(x, y, width, height) {
    root.style.setProperty('--x', x);
    root.style.setProperty('--y', y);
    root.style.setProperty('--width', width);
    root.style.setProperty('--height', height);
}

numberInput.addEventListener('focusin', () =>{
    if(window.innerWidth > 992) focus_in_out('4%', '43%', '90%', '20%');
    else if(window.innerWidth > 800) focus_in_out('4%', '44%', '90%', '20%');
    else if(window.innerWidth > 600) focus_in_out('4%', '48%', '90%', '20%');
    else if(window.innerWidth > 360) focus_in_out('5%', '42%', '90%', '20%');
    else focus_in_out('5%', '47%', '90%', '20%')
});
nameInput.addEventListener('focusin', () => {
    if(window.innerWidth > 992) focus_in_out('4%', '69%', '67%', '20%');
    else if(window.innerWidth > 800)  focus_in_out('4%', '75%', '67%', '20%');
    else if(window.innerWidth > 600) focus_in_out('4%', '74%', '65%', '20%');
    else if(window.innerWidth > 350) focus_in_out('5%', '70%', '60%', '22%');
    else focus_in_out('5%', '72%', '52%', '21%')
});
cardDate.addEventListener('focusin', () => {
    if(window.innerWidth > 992) focus_in_out('73%', '69%', '24%', '20%');
    else if(window.innerWidth > 800) focus_in_out('72%', '75%', '25%', '20%');
    else if(window.innerWidth > 600) focus_in_out('71%', '74%', '25%', '20%');
    else if(window.innerWidth > 350) focus_in_out('65%', '70%', '30%', '22%');
    else focus_in_out('58%', '72%', '30%', '21%')
});
numberInput.addEventListener('focusout', () => focus_in_out('-5px', '-5px', '105%','105%'));
nameInput.addEventListener('focusout', () => focus_in_out('-5px', '-5px', '105%', '105%'));
cardDate.addEventListener('focusout', () => focus_in_out('-5px', '-5px', '105%', '105%'));

// Providing Text

let spans = [...document.querySelectorAll("li span")];
let holderName = document.querySelector('.holderName');

// === Function that checks for number ===

function numberFilter(event) {
    var digitPeriodRegExp = new RegExp('\\d|\\.');
    if(event.ctrlKey || event.altKey || !isNaN(event.key)|| event.key.length !== 1) return true;
    if(!digitPeriodRegExp.test(event.key)) event.preventDefault();
};

// === NUMBER ===

numberInput.addEventListener('keydown', (e) => numberFilter(e));

numberInput.addEventListener('keyup', () => {
    let textArr = numberInput.value.split(""); 
    spans.forEach((span) => {
        span.textContent = "#";
        span.classList.remove('stars');
        span.style.cssText = 'animation-name: none';
    });
    for(let i = 0; i < textArr.length; i++) {
        if(i < 4 || i > 11) {
            spans[i].textContent = textArr[i];
        } else {
            spans[i].textContent = '*';
            spans[i].classList.add('stars');
        }
        spans[i].style.cssText = 'animation-name: anim-lineUp';
    };
    // === brand image ===
    let brand = [...document.getElementsByClassName('brand')];
    let beforeBrand = binObject.brand;
    binObject.brand = (spans[0].textContent + spans[1].textContent);
    brand.forEach((item) => {
        item.src = `./img/${binObject.brand}.png`;
        if(beforeBrand != binObject.brand) {
            item.style.cssText = "animation: 0.5s anim-lineUp";
            setTimeout(() => item.style.cssText = 'animation: none;', 500);
        }
    });
})

// === NAME ===

nameInput.addEventListener('keyup', () => {
    if(nameInput.value.length == 0) return holderName.textContent = 'Full Name';
    return holderName.innerHTML = nameInput.value;
});

// === CVV ===

let res = false;
cvvInput.addEventListener('keydown', (event) => res = numberFilter(event));

cvvInput.addEventListener('keyup', (event) => {
    if(cvvInput.value.length > 4) return;
    if(res || event.key == 'Backspace') {
        document.querySelector('.cvv input').value = '';
        for(let i = 0; i < cvvInput.value.length; i++){
                    document.querySelector('.cvv input').value += ' *';
        };
    };
});

// === Date Changer ===

let month_options = document.querySelector('#card_month');
let year_options = document.querySelector('#card_year');

function optionChanger(elementName, inputName) {
    elementName = document.getElementById(`${elementName}`);
    elementName.textContent = inputName.value;
    elementName.style.cssText = `animation: 0.7s anim-lineUp; width: 18.1px;`;
    setTimeout(() => {
        elementName.style.cssText = `animation-name: none`;
    }, 700)
}

month_options.addEventListener('change', () => optionChanger('month', month_options));
year_options.addEventListener('change', () => optionChanger('year', year_options));
