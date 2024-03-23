document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('.bg h1, .bg p');
    elements.forEach(function(el) {
        el.classList.add('fade-in');
    });
});