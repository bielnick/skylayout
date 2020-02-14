let handlerApi = (function () {

    const URI = 'https://sky-frontend.herokuapp.com/movies';
    const options = {};
    return {
        setConfigSlide : function(){
            let width = window.innerWidth;
            if(width == 770){
                options.slidesPerViewHighLight = 2;
                options.slidesPerViewGallery = 2;
            }

            if(width <= 768){
                options.slidesPerViewHighLight = 1;
                options.slidesPerViewGallery = 1;
            }

            if(width >= 1024){
                options.slidesPerViewHighLight = 3;
                options.slidesPerViewGallery = 5;
            }
        },
        fetchMovies: function () {
            fetch(URI).then(dataToJson => dataToJson.json())
                .then(result => {
                    let movies = {
                        highlights: result[0],
                        carrousel: result[2]
                    }
                    return movies
                }).then(movies => {
                    this.setHighLights(movies.highlights)
                    this.setMovies(movies.carrousel.movies)
                })
        },
        setMovies: function (carrousel) {
            var countMoviesPerRow = 0;
            var galleryNum = 0;
            var temp;
            $('.content-slides').append(template.renderContainer(galleryNum))

            var swiper = new Swiper('.list-movies' + galleryNum, {
                loop: true,
                freeMode: true,
                slidesPerView: options.slidesPerViewGallery,
                spaceBetween: 30,
            });
            
            carrousel.map(item => {
                if (countMoviesPerRow == 6) {
                    galleryNum++;

                    $('.content-slides').append(template.renderContainer(galleryNum))

                    swiper = new Swiper('.list-movies' + galleryNum, {
                        loop: true,
                        freeMode: true,
                        slidesPerView: options.slidesPerViewGallery,
                        spaceBetween: 30,
                    });


                    countMoviesPerRow = 0;
                }
         
                swiper.appendSlide(template.renderSlide(item))
                countMoviesPerRow++
            });
        },
        setHighLights: function (highlights) {
            var temp;
            var swiper = new Swiper('.list-highlights', {
                loop: true,
                slidesPerView: options.slidesPerViewHighLight,
                spaceBetween: 30,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });


           
            highlights.items.map(item => {
                swiper.appendSlide(template.renderSlideHighLight(item))
            })

            var sw = document.querySelector('.swiper-container').swiper
            setInterval(function () {
                sw.slideNext();
            }, 5000)
        },

    }
})()
handlerApi.setConfigSlide();
handlerApi.fetchMovies();