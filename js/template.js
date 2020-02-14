let template = (function(){
    return {
        renderSlide: function(item){
            return `<div class="swiper-slide cart"><img src=${item.images[0].url} alt=${item.title} /></div>`;
        },
        renderSlideHighLight: function(item){
            return `<div class="swiper-slide image-highligths"> <img src="${item.images[0].url}" alt="${item.title}">  </div>`
        },
        renderContainer :function(galleryNum){
           return `
                <div class="swiper-container list-movies${galleryNum}">
                    <div class="swiper-wrapper">
                    </div>
                </div>
            `
        }
    }
})()

