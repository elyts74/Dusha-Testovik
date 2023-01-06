var hint = {
    elem: document.createElement("div"),
    options: {
        border: 4,
        color: '#000',
        style: 'solid',
        padding: 18
    }
}
var se = document.querySelector('.block'); // Отслеживаемый элемент
var se_transition = window.getComputedStyle(se).getPropertyValue(`transition`);
var interval;
var manualPos_x = 0;
var manualPos_y = 0;
var randomRectInterval;
var m_mode = false;

function updateHint(data){ 
    hint.elem.style.transition = window.getComputedStyle(se).getPropertyValue(`transition`);
    animationHint(data);
}

function animationHint(data){
    var delay = Number(hint.elem.style.transitionDelay.match(/[\d+][\.]?[\d+]?/)[0])*1000;
    var duration = Number(hint.elem.style.transitionDuration.match(/[\d+][\.]?[\d+]?/)[0])*1000;
    var i = 0;

    if(duration > 0){
        hint.elem.style.transitionDuration = '0s';
        clearInterval(interval);

        interval = setInterval(() => {
            renderHint();

            i = i + 4;
            if(i > (delay + duration)){
                clearInterval(interval);
            }
        });
    }else{
        renderHint();
    }
}

var tracker = new MutationObserver(updateHint); // Функция трекера изменений элемента

tracker.observe(se, {attributes: true}); // Подключение трекера к элементу

window.onload = () => {
    updatePositionSe();
    hint.elem.classList.add('hint');

    hint.elem.style.borderWidth = hint.options.border && `${hint.options.border}px`;
    hint.elem.style.borderStyle = hint.options.style && hint.options.style;
    hint.elem.style.borderColor = hint.options.color && hint.options.color;
    hint.elem.style.padding = hint.options.padding && `${hint.options.padding}px`;

    document.body.appendChild(hint.elem);
    updateHint();
};

document.addEventListener('mousemove', function(e){
    manualPos_x = e.layerX;
    manualPos_y = e.layerY;
    if(m_mode == true){
        se.style.left = (manualPos_x - se.clientWidth/2) + 'px';
        se.style.top = (manualPos_y - se.clientHeight/2) + 'px';
    }
});

document.addEventListener('scroll', (e) => {
    if(m_mode == true){
        se.style.left = (manualPos_x + e.target.scrollingElement.scrollLeft - se.clientWidth/2) + 'px';
        se.style.top = (manualPos_y + e.target.scrollingElement.scrollTop - se.clientHeight/2) + 'px';
    }
});

document.addEventListener('wheel', (e) => {
    if(m_mode == true){
        se.style.width = se.clientWidth + (e.deltaY/10) + 'px';
        se.style.height = se.clientHeight + (e.deltaY/10) + 'px';
        se.style.left = (manualPos_x - se.clientWidth/2) + 'px';
        se.style.top = (manualPos_y - se.clientHeight/2) + 'px';
    }
})

document.addEventListener('keyup', function(e) {
    if(e.code == 'KeyM'){
        m_mode = !m_mode;
        if(m_mode == true){
            se.style.transition = 'all 0s';
            document.body.style.backgroundColor = '#3aa0ad';
            document.body.style.cursor = 'grabbing';
            se.style.left = (manualPos_x - se.clientWidth/2) + 'px';
            se.style.top = (manualPos_y - se.clientHeight/2) + 'px';
            
            renderHint();
            clearInterval(randomRectInterval);
        }else{
            se.style.transition = se_transition;
            document.body.style.backgroundColor = '#aaa';
            document.body.style.cursor = '';
            renderHint();
            updatePositionSe()
        }
    }
});

function renderHint(){
    if(typeof data != 'undefined'){
        se = data[data.length-1].target;
    }
    hint.elem.style.width = se.clientWidth + 'px';
    hint.elem.style.height = se.clientHeight + 'px';
    hint.elem.style.transform = `translate(${se.offsetLeft - hint.options.border - hint.options.padding}px, ${se.offsetTop - hint.options.border - hint.options.padding}px)`;
}

function updatePositionSe(){
    randomRectInterval = setInterval( () => {
        document.querySelector('.block').style.left = (Math.floor(Math.random() * 40) + 30 ) + '%';
        document.querySelector('.block').style.width = (Math.floor(Math.random() * 40) + 80 ) + 'px';
        document.querySelector('.block').style.height = (Math.floor(Math.random() * 40) + 80 ) + 'px';
        document.querySelector('.block').style.top = (Math.floor(Math.random() * 100) + 250 ) + 'px';
    }, 3000);
}