let animorder = 0;

document.addEventListener('DOMContentLoaded', function() {
    setupObservers();
});

let elements;

function runAnimation() {
    switch (animorder) {
        case 0:
            elements = document.querySelectorAll('.bg h1, .bg p');
            elements.forEach(function(el) {
                el.classList.add('bg-ani');
            });
            document.addEventListener('animationend', function(e) {
                if (e.target.classList.contains('bg-ani')) {
                    e.target.classList.remove('bg-ani');
                }
                animorder = 1;
                console.log(animorder);
                runAnimation();
            }, {once: true});
            break;
        case 1:
            elements = document.querySelectorAll('.navbar .navigation a');
            elements.forEach(function(el, index) {
                setTimeout(function() {
                    el.classList.add('navbar-ani');
                }, index * 500); // 500ms interval between each iteration
            });
            document.addEventListener('animationend', function(e) {
                animorder = 2;
                console.log(animorder);
                runAnimation();
            }, {once: true});
            break;
        case 2:
            let coin = false;
            elements = document.querySelectorAll('.content .header h1, .content .header h2, .content .header p');
            elements.forEach(function(el, index) {
                setTimeout(function() {
                    el.classList.add(coin ? 'header-ani-right' : 'header-ani-left');
                    coin = !coin;
                }, index * 500);
            });
            document.addEventListener('animationend', function(e) {
                animorder = 3;
                console.log(animorder);
                runAnimation();
            }, {once: true});
            break;
        case 3:
            elements = document.querySelectorAll('.FAQ p');
            elements.forEach(function(el, index) {
                setTimeout(function() {
                    el.classList.add('question-anim');
                }, index * 500);
            });
            document.addEventListener('animationend', function(e) {
                animorder = 4;
                console.log(animorder);
                runAnimation();
            }, {once: true});
            break;
        case 4:
            elements = document.querySelectorAll('.FAQ h3');
            elements.forEach(function(el, index) {
                setTimeout(function() {
                    el.classList.add('centred-h3-anim');
                }, index * 500);
            });
            document.addEventListener('animationend', function(e) {
                animorder = 5;
                console.log(animorder);
                runAnimation();
            }, {once: true});
            break;
        default:
            console.log('Animation completed');
            break;
    }
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
        alert('Login successful!');
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
}