
/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active Song
 * 9. Scroll active song into view
 * 10. Play song when click 
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist')
const cd = $('.cd')
const cdWidth = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const volumeBtn = $('.volume-icon')
const volumeChange = $('.progress-volume')
const mainToast = $('#toast')

const app = {
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    isPlaying: false,
    isMuted: false,
    songs: [
        {
            name: 'Độ Tộc 2',
            singer: 'MASEW x PHÚC DU x PHÁO x ĐỘ MIXI',
            path: './assets/music_link/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            name: '1 phút',
            singer: 'Andiez',
            path: './assets/music_link/song2.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Lạ Lùng',
            singer: 'Vũ',
            path: './assets/music_link/song9.mp3',
            image: './assets/img/song9.jpg'
        },
        {
            name: 'Cưới thôi',
            singer: 'Masew x Masiu x B Ray x TAP',
            path: './assets/music_link/song4.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Talk Love',
            singer: 'K.Will',
            path: './assets/music_link/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        
        {
            name: 'Phận duyên lỡ làng',
            singer: 'phát huy t4 x truzg',
            path: './assets/music_link/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Câu Hứa Chưa Vẹn Tròn',
            singer: 'Phát Huy T4',
            path: './assets/music_link/song6.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'CỐ GIANG TÌNH',
            singer: 'Phát Hồ x JokeS Bii ft. DinhLong',
            path: './assets/music_link/song7.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Suýt Nữa Thì',
            singer: 'Andiez',
            path: './assets/music_link/song8.mp3',
            image: './assets/img/song8.jpg'
        },
        
        {
            name: 'Hôm Qua Tôi Đã Khóc Remix',
            singer: 'Hà Thái Hoàng ft Tôm Hải Phòng Mix',
            path: './assets/music_link/song10.mp3',
            image: './assets/img/song10.jpg'
        }
    ],
    
    render: function () {
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = `${this.currentSong.path}`
    },

    handleEvents: function () {
        _this = this;
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            if (newCdWidth < 0) {
                cd.style.width = 0;
            } {
                cd.style.width = newCdWidth + 'px';
                cd.style.opacity = newCdWidth / cdWidth
            }           
        }

        const cdThumbAnimate = cdThumb.animate({
            transform: 'rotate(360deg)',
        },{
            duration: 10000,
            iterations: Infinity
        });
        cdThumbAnimate.pause()

        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        audio.onplay = function () {
            _this.isPlaying = true;
            $('.player').classList.add('playing')
            cdThumbAnimate.play()
        }

        audio.onpause = function () {
            _this.isPlaying = false;
            $('.player').classList.remove('playing')
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function () {
            const conductCurrentTime = $('.conduct-currentTime')
            const conductDuration = $('.conduct-duration')
            if(audio.duration) {
                progress.value = Math.floor(audio.currentTime / audio.duration * 100)
            
                // left
                const currentTime = Math.floor(audio.currentTime)
                const currentSeconds = currentTime % 60
                const currentMinutes = Math.floor(currentTime / 60)
                var dozenSeconds;

                if (currentSeconds < 10) {
                    dozenSeconds = 0
                } else {
                    dozenSeconds = ''
                }
                conductCurrentTime.textContent = '0' + currentMinutes + ':' + dozenSeconds + currentSeconds 
            
                // right
                const duration = Math.floor(audio.duration)
                const durationSeconds = duration % 60
                const durationtMinutes = Math.floor(duration / 60)
                var secondsDozen;

                if (durationSeconds < 10) {
                    secondsDozen = 0
                } else {
                    secondsDozen = ''
                }
                conductDuration.textContent = '0' + durationtMinutes + ':' + secondsDozen + durationSeconds
            }
        }

        progress.oninput = function () {
            const seekTime = progress.value * (audio.duration / 100)
            audio.currentTime = seekTime
        }

        nextBtn.onclick = function () {
            if(_this.isRandom) {
                _this.currentIndex = Math.floor(Math.random(_this.songs.length) * 10)
                _this.loadCurrentSong()
            } else {
                _this.nextSong()    
            }
            audio.play()
            _this.scrollToActiveSong()
            _this.render()
        }

        prevBtn.onclick = function () {
            if(_this.isRandom) {
                _this.currentIndex = Math.floor(Math.random(_this.songs.length) * 10)
                _this.loadCurrentSong()
            } else {   
                _this.prevSong()    
            }
            audio.play()
            _this.scrollToActiveSong()
            _this.render()
        }

        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle("active", _this.isRandom)
        }

        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle("active", _this.isRepeat)
        }

        audio.onended = function () {
            if(_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        } 

        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode && !e.target.closest('.option')) {
                if(songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }

            if(e.target.closest('.option')) {
                const toast = document.createElement("div");

                const autoRemoveId = setTimeout(() => {
                    mainToast.removeChild(toast); 
                }, 4000)

                toast.onclick = function (e) {
                    if(e.target.closest('.toast__close')) {
                        mainToast.removeChild(toast); 
                        clearTimeout(autoRemoveId)
                    }
                }

                toast.classList.add("toast")
                toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s 3s forwards`;

                toast.innerHTML = `
                        <div class="toast__icon">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">Lưu thành công!</h3>
                            <p class="toast__msg">Bài hát đã được lưu vào mục yêu thích</p>
                        </div>
                        <div class="toast__close">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
                mainToast.appendChild(toast)
            }
        }

        // xu ly am thanh
        volumeBtn.onclick = function () {
            if(audio.muted) {
                audio.muted = false;
                volumeBtn.classList.remove('active')
              } else {
                audio.muted = true;
                volumeBtn.classList.add('active')
            }
        }

        volumeChange.onchange = function (e) {
            audio.volume = e.target.value / 100
        }
    },

    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        },300)
    },

    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        _this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    start: function() {
        this.render()

        this.handleEvents()
        
        this.defineProperties()

        this.loadCurrentSong()
    }   
}
app.start()