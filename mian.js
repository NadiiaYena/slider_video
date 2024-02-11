const images = ['0.jpg', '1.jpg', '2.jpg', '3.jpeg', '4.jpeg', '5.jpg', '6.jpg',]
console.log(images)

let activeImage = 0
let activeImageLeft = 0
let activeImageRight = 1
const sliderLine = document.querySelector('.slider-line')
const widthOffset = document.querySelector('.slider').clientWidth
sliderLine.style.width = 4*widthOffset + 'px';
sliderLine.style.height = widthOffset + 'px'
sliderLine.style.left = '-' + widthOffset*1.5 + 'px'

console.log(sliderLine)
let flag = true;

function init(){
    prevImageGenerate()
    console.log('init activeImage', activeImage)

    const img = document.createElement('img')
    img.alt = 'image1'
    img.src = './img/' + images[activeImage]
    sliderLine.append(img)
    
    activeImage = 1
    const img2 = document.createElement('img')
    img2.alt = 'image2'
    img2.src = './img/' + images[activeImage]
    sliderLine.append(img2)
    console.log('init activeImage', activeImage)
    
    activeImage = 0
    nextImagegenerate()
    
    console.log('init activeImage', activeImage)
    

    
}

const prevImageGenerate = (w = false) => {
    console.log('activeImage', activeImage)
    let prevImage = activeImage - 1;
    if (prevImage < 0) {
        prevImage = images.length - 1
    }
    console.log('prevImageGenerate prevImage', prevImage)

    const img = document.createElement('img')
    img.alt = 'image-1'
    img.src = './img/' + images[prevImage]
    if (w) img.style.width = 0
    sliderLine.prepend(img)

    console.log('prevImageGenerate activeImage', activeImage)

}

const nextImagegenerate = () => {
    let nextImage = activeImage + 2
    console.log('nextImage -', nextImage, 'active-', activeImage)
    
    if(nextImage == (images.length -1)+2){
        nextImage = 1
    }
    if (nextImage > images.length -1){
        nextImage = 0
    }
    console.log('nextImagegenerate nextImage', nextImage)

    const img = document.createElement('img')
    img.alt = 'image3'
    img.src = './img/' + images[nextImage]
    sliderLine.append(img)

    console.log('nextImagegenerate activeImage', activeImage)

}

const nextSlide = () => {
    console.log('click next')
    if (!flag) return;
    flag = !flag

    activeImage++;
    if(activeImage > images.length-1) {
        activeImage = 0
    }
    // document.querySelector('.slider-line img').remove()
    nextImagegenerate()
    animate({
        duration : 1000,
        draw: function(progress){
            document.querySelector('.slider-line img').style.width = widthOffset * (1-progress) + 'px';
        },
        removeElement: document.querySelector('.slider-line img')
    })

    console.log('nextSlide activeImage', activeImage)

}

const prevSlide = () => {
    console.log('click prev')

    if (!flag) return;
    flag = !flag

    activeImage--;
    if(activeImage<0){
        activeImage = images.length - 1;
    }
    // document.querySelector('.slider-line img:last-child').remove()
    prevImageGenerate(true)
    animate({
        duration : 1000,
        draw: function(progress){
            document.querySelector('.slider-line img').style.width = (widthOffset * progress) + 'px';
        },
        removeElement: document.querySelector('.slider-line img:last-child')
    })
    console.log('prevSlide activeImage', activeImage)


}

window.addEventListener('resize', init)
init()

document.querySelector('.button-right').addEventListener('click', nextSlide)
document.querySelector('.button-left').addEventListener('click', prevSlide)


const animate = ({duration, draw, removeElement}) => {
    const start = performance.now()
    requestAnimationFrame(function animate(time){
        let step = (time - start)/ duration
        if(step > 1 ){
            step = 1
        }
        draw(step)
        if( step <1) {
            requestAnimationFrame(animate)
        }
        else {
            removeElement.remove()
            flag = true
        }
    })
}
//====

// document.querySelector('.button-right').addEventListener('click', function(){
//     count++;
//     console.log('right count-', count)
//     if(count > images.length-4 ) {
//         console.log('if(count> images.length-4)')
//         count = 0
//     }
//     rollSlider() 
// })

// document.querySelector('.button-left').addEventListener('click', function(){
    
//     console.log('left count-', count)
//     count--;
//     if(count < 0 ) {
//         console.log('if(count <= -4 )')
//         count = images.length - 4
//     }
//     console.log('left count-', count)
//     rollSlider() 
// })


// function rollSlider() {
//     sliderLine.style.transform = 'translate(-' + count * width + 'px)';
//     console.log('rollSlider-',  sliderLine.style.transform )

// }