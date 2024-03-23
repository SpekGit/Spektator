let animorder = 0;

document.addEventListener('DOMContentLoaded', function() {
    runAnimation();
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
        default:
            console.log('Animation completed');
            break;
    }
}
