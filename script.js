let animorder = 0;

document.addEventListener('DOMContentLoaded', function() {
    runAnimation();
});


function runAnimation() {
    switch (animorder) {
        case 0:
            let elements = document.querySelectorAll('.bg h1, .bg p');
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
        default:
            console.log('Animation completed');
            break;
    }
}
