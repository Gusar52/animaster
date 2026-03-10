addListeners();

function addListeners() {
    let resetFadeInPlay;
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            resetFadeInPlay = animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            resetFadeInPlay.reset(block);
        });    

    let resetFadeOutPlay;
    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            resetFadeOutPlay = animaster().fadeOut(block, 1000);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            resetFadeOutPlay.reset(block);
        });     

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    let moveAndHideAnimation;
    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            moveAndHideAnimation = animaster().moveAndHide(block, 1000);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            if (moveAndHideAnimation) {
                moveAndHideAnimation.reset();
            }
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 999);
        });

    let stop;
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            stop = animaster().heartBeating(block, 100);
        })

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            stop.stop();
        })
}



function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster(){
    /**
     * Функция, передвигающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param translation — объект с полями x и y, обозначающими смещение блока
     */
    function move(element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
    }
    function resetMoveAndScale(element) {
        element.style.transitionDuration =  null;
    }

    /**
     * Блок плавно появляется из прозрачного.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function fadeIn(element, duration) {
        element.style.transitionDuration =  `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
        return {reset: function(element) {
                resetFadeIn(element);
            }};
    }
    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.add('hide');
        element.classList.remove('show');
    }
    function fadeOut(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
        return {reset: function(element) {
                resetFadeOut(element);
            }};
    }
    function resetFadeOut(element) {
        element.style.transitionDuration =  null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    /**
     * Функция, увеличивающая/уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     */
    function scale(element, duration, ratio) {
        element.style.transitionDuration =  `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
    }

    function moveAndHide(element, duration) {
        let active = true;

        setTimeout(() => {
            if (active) move(element, 0.4 * duration, {x: 100, y: 20});
        }, 0);

        setTimeout(() => {
            if (active) fadeOut(element, 0.6 * duration);
        }, 0.4 * duration);

        return {
            reset: function() {
                active = false;
                element.style.transform = getTransform({x: 0, y: 0}, null);
                element.classList.add('show');
                element.classList.remove('hide');
                element.style.transitionDuration = '0ms';
            }
        };
    }

    function showAndHide(element, duration) {
        element.classList.remove('hide');
        element.classList.add('show');

        fadeIn(element, duration/2);

        setTimeout(() => {
            fadeOut(element, duration/2);
        }, duration/2);
    }

    function heartBeating(element) {
        let growing = true;
        let intervalId;

        intervalId = setInterval(() => {
            if (growing) {
                element.style.transform = getTransform(null, 1.4);
            } else {
                element.style.transform = getTransform(null, 1);
            }
            growing = !growing;
        }, 500);

        element.style.transitionDuration = '500ms';

        return {
            stop: function() {
                clearInterval(intervalId);
                element.style.transform = getTransform(null, 1);
            }
        };
    }



    return {
        move,
        fadeIn,
        scale,
        fadeOut,
        moveAndHide,
        showAndHide,
        heartBeating,
        resetFadeIn,
        resetMoveAndScale,
        resetFadeOut
    }

}