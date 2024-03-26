let animorder = 0;

const animations = [
    { selector: '.bg h1, .bg p', animationClass: 'bg-ani' },
    { selector: '.navbar .navigation a', animationClass: 'navbar-ani' },
    { selector: '.content .header h1, .content .header h2, .content .header p', animationClass: ['header-ani-right', 'header-ani-left'] },
    { selector: '.FAQ p', animationClass: 'question-anim' },
    { selector: '.FAQ h3', animationClass: 'centred-h3-anim' }
];

document.addEventListener('DOMContentLoaded', function() {
    setupObservers();
});

let elements;

const animations = [
    { selector: '.bg h1, .bg p', animationClass: 'bg-ani' },
    { selector: '.navbar .navigation a', animationClass: 'navbar-ani' },
    { selector: '.content .header h1, .content .header h2, .content .header p', animationClass: ['header-ani-right', 'header-ani-left'] },
    { selector: '.FAQ p', animationClass: 'question-anim' },
    { selector: '.FAQ h3', animationClass: 'centred-h3-anim' }
];

let animOrder = 0;

document.addEventListener('DOMContentLoaded', setupObservers);

function runAnimation() {
    if (animOrder >= animations.length) {
        console.log('Animation completed');
        return;
    }

    const { selector, animationClass } = animations[animOrder];
    const elements = document.querySelectorAll(selector);

    elements.forEach((el, index) => {
        setTimeout(() => {
            if (Array.isArray(animationClass)) {
                el.classList.add(animationClass[index % 2]);
            } else {
                el.classList.add(animationClass);
            }
        }, index * 500);
    });

    document.addEventListener('animationend', (e) => {
        if (Array.isArray(animationClass)) {
            if (e.target.classList.contains(animationClass[0]) || e.target.classList.contains(animationClass[1])) {
                e.target.classList.remove(animationClass[0], animationClass[1]);
            }
        } else {
            if (e.target.classList.contains(animationClass)) {
                e.target.classList.remove(animationClass);
            }
        }
        animOrder++;
        runAnimation();
    }, { once: true });
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Basic validation criteria
    if (username === '' || password === '') {
        alert('Both username and password are required.');
        event.preventDefault(); // Prevent form submission
    } else if (password.length < 3) {
        alert('Password must be at least 3 characters long.');
        event.preventDefault(); // Prevent form submission
    } else if (username === 'admin' && password === 'admin') {
        alert('Login successful as admin!');
        event.preventDefault(); // Prevent form submission
    }else if (username === 'user' && password === 'user') {
        alert('Successful login, dear User!');
        event.preventDefault(); // Prevent form submission
    } else {
        alert('Invalid username or password.');
        event.preventDefault(); // Prevent form submission
    }
});

function setupObservers() {
    let options = {
        root: null,
        threshold: 0.1
    };

    let bgObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('bg-ani');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.bg h1, .bg p').forEach(el => {
        bgObserver.observe(el);
    });

    let navbarObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if(entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('navbar-ani');
                    observer.unobserve(entry.target);
                }, index * 500);
            }
        });
    }, options);

    document.querySelectorAll('.navbar .navigation a').forEach(el => {
        navbarObserver.observe(el);
    });

    let coin = false;
    let headerObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            setTimeout(function() {
                if (entry.isIntersecting) {
                    entry.target.classList.add(coin ? 'header-ani-left' : 'header-ani-right');
                    observer.unobserve(entry.target);
                    coin = !coin;
                }
            }, index * 500);
        });
    }, options);

    document.querySelectorAll('.content .header h1, .content .header h2, .content .header p').forEach(el => {
        headerObserver.observe(el);
        coin = !coin;
    });

    let questionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            setTimeout(function() {
                if (entry.isIntersecting) {
                    entry.target.classList.add('question-anim');
                    observer.unobserve(entry.target);
                }
            }, index * 500);
        });
    }, options);

    document.querySelectorAll('.FAQ p').forEach(el => {
        questionObserver.observe(el);
    });

    let centredH3Observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            setTimeout(function() {
                if (entry.isIntersecting) {
                    entry.target.classList.add('centred-h3-anim');
                    observer.unobserve(entry.target);
                }
            }, index * 500);
        });
    }, options);

    document.querySelectorAll('.FAQ h3').forEach(el => {
        centredH3Observer.observe(el);
    });
}