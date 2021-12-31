const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'F8-PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
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
            name: 'Talk Love',
            singer: 'K.Will',
            path: './assets/music_link/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Cưới thôi',
            singer: 'Masew x Masiu x B Ray x TAP',
            path: './assets/music_link/song4.mp3',
            image: './assets/img/song4.jpg'
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
            name: 'Lạ Lùng',
            singer: 'Vũ',
            path: './assets/music_link/song9.mp3',
            image: './assets/img/song9.jpg'
        },
        {
            name: 'Hôm Qua Tôi Đã Khóc Remix',
            singer: 'Hà Thái Hoàng ft Tôm Hải Phòng Mix',
            path: './assets/music_link/song10.mp3',
            image: './assets/img/song10.jpg'
        }
    ],
    setConfig: function (key,value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
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

        playList.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this,'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        // xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const crollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - crollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click Play
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }       
        }

        // Khi song được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi song được pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua xong
        progress.onchange = function (e) {
            const seekTime =audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }

        // Khi next song 
        nextBtn.onclick = function () {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi prev song 
        prevBtn.onclick = function () {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // xử lý bật / tắt random song 
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
        }

        // xử lý lập lại một song
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }

        // xử lý next song khi audio ended
        audio.onended = function () {
            if(_this.isRepeat) {
                audio.play()
            }else {
                nextBtn.click()
            }
        } 

        // Lắng nghe hành vi click vào playlist
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                // xử lý khi click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // xử lý khi click vào song option
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        // gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // hiển thị trạng thái ban đầu của button repeat và random
        randomBtn.classList.toggle('active',this.isRandom);
        repeatBtn.classList.toggle('active',this.isRepeat);
    }
}
app.start()