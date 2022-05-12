const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playList = $('.play-list')
// Get Variables
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('.audio')
const togglePlayBtn = $('.toggle-play-btn')
const progress = $('.progress')
const nextBtn = $('.next-btn')
const previousBtn = $('.previous-btn')
const randomBtn = $('.random-btn')
const repeateBtn = $('.repeat-btn')
const dashboard = $('.dashboard')
const inputVolume = $('.input-volume')
// Songs
const app = {
    currentIndex: 0,
    isPlaying: false,
    isInput: false,
    isRandom: false,
    isRepeat: false,
    listRandom: [],
    songs: [
        {
            name: 'Cưới thôi',
            author: 'Masiu ft Masew ft B.Ray ft TAP',
            path: './assets/songs/CuoiThoi.mp3',
            thumb: './assets/thumb/cuoi_thoi.jpg'
        },
        {
            name: 'Anh sẽ để em đi',
            author: 'Kidz',
            path: './assets/songs/Anh Se De Em Di - Kidz.mp3',
            thumb: './assets/thumb/anh_se_de_em_di.jpg'
        },
        {
            name: '3 1 0 7',
            author: 'Wn ft Dương ft Nâu',
            path: './assets/songs/3107.mp3',
            thumb: './assets/thumb/3107.jpg'
        },
        {
            name: 'Bước qua nhau',
            author: 'Vũ',
            path: './assets/songs/BuocQuaNhau-Vu.mp3',
            thumb: './assets/thumb/buoc_qua_nhau.jpg'
        },
        {
            name: 'Chạy về khóc với anh',
            author: 'Erik',
            path: './assets/songs/Chay-Ve-Khoc-Voi-Anh-ERIK.mp3',
            thumb: './assets/thumb/chay_ve_khoc_voi_anh.jpg'
        },
        {
            name: 'Demons',
            author: 'Imagine Dragon',
            path: './assets/songs/Demons - Imagine Dragon.mp3',
            thumb: './assets/thumb/demons.jpg'
        },
        {
            name: 'Ngày đầu tiên',
            author: 'Đức Phúc',
            path: './assets/songs/NgayDauTien-DucPhuc-7129810.mp3',
            thumb: './assets/thumb/ngaydautien.jpg'
        },
        {
            name: 'Something just like this',
            author: 'The Chainsmok',
            path: './assets/songs/Something Just Like This - The Chainsmok.mp3',
            thumb: './assets/thumb/some_thing_just_like_this.jpg'
        },
        {
            name: 'Thương nhau tới bến',
            author: 'Nal',
            path: './assets/songs/ThuongNhauToiBen.mp3',
            thumb: './assets/thumb/thuong_nhau_toi_ben.jpg'
        },
        {
            name: 'Tìm được nhau khó thế nào',
            author: 'Anh Tú',
            path: './assets/songs/tim_duoc_nhau_kho_the_nao.mp3',
            thumb: './assets/thumb/tim_duoc_nhau_kho_the_nao.jpg'
        }
    ],
    render() {
        const htmls = this.songs.reduce((accumulator, song, index) => {
            return accumulator + `
                <li class="song" data-index="${index}">
                    <div class="song-thumb" style="background-image: url('${song.thumb}');"></div>
                    <div class="song-title">
                        <h3 class="song-name">${song.name}</h3>
                        <p class="song-author">${song.author}</p>
                    </div>
                    <div class="song-options">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </li>    
            `
        }, '')
        playList.innerHTML = htmls;
    },
    defineProperty() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex]
            }
        }
        )
    },
    activeSong() {
        const listSong = $$('.song')
        const listSonglength = listSong.length
        for (let i = 0; i < listSonglength; i++) {
            listSong[i].classList.toggle('song--active', parseInt(listSong[i].dataset.index) === this.currentIndex)
        }
    },
    loadCurrentSong() {
        $('header h2').innerText = `${this.currentSong.name}`
        cdThumb.style.backgroundImage = `url(${this.currentSong.thumb})`
        audio.src = `${this.currentSong.path}`
        // Hiển thị time tracking
        audio.onloadedmetadata = () => {
            const limitTime = $('.limit-time')
            const minutes = parseInt((audio.duration / 60))
            let seconds = parseInt(audio.duration - minutes * 60)
            if (seconds.toString().length == 1) {
                seconds = '0' + seconds
            }
            limitTime.innerText = `${minutes}:${seconds}`
        }
        this.activeSong()
    },
    changeColorProgressBar() {
        const progressPercent = progress.value + '%'
        progress.style.backgroundImage = `linear-gradient(to right, #0075FF ${progressPercent}, #c4c4c4 ${progressPercent})`
    },
    handleNewSong() {
        progress.value = 0
        $('.current-time').innerText = '0:00'
        this.changeColorProgressBar()
        if (this.isPlaying) {
            audio.play()
        }
    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.handleNewSong()
    },
    previousSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        this.handleNewSong()
    },
    randomSong() {
        do {
            if (this.listRandom.indexOf(this.currentIndex) == -1) {
                this.listRandom.push(this.currentIndex)
            }
            this.currentIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.listRandom.indexOf(this.currentIndex) != -1 && this.listRandom.length < this.songs.length)
        if (this.listRandom.length === this.songs.length) {
            this.listRandom = []
        }
        this.loadCurrentSong()
        this.handleNewSong()
    },
    repeatSong() {
        this.loadCurrentSong()
        this.handleNewSong()
    },
    scrollView() {
        $('.song--active').scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        })
        
    },
    changeProgressVolumeColor() {
        const progressPercent = inputVolume.value + '%'
        inputVolume.style.backgroundImage = `linear-gradient(to right, #0075FF ${progressPercent}, #c4c4c4 ${progressPercent})`
    },
    handleVolume() {
        const volumeValue = inputVolume.value / 100
        audio.volume = volumeValue
        this.changeProgressVolumeColor()
    },
    handleEvents() {
        // Xử lý khi scroll web
        const cdSize = cd.offsetWidth
        const currentTime = $('.current-time')
        document.onscroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop
            const newSize = cdSize - scrollPosition
            if (newSize < 0) {
                cd.style.width = 0
            }
            else {
                cd.style.width = newSize.toString() + 'px'
            }
        }
        // Quay/dừng CD thumb
        const CdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        },
        ], {
            duration: 10000,
            iterations: Infinity
        })
        CdThumbAnimate.pause()
        // Play, Pause song
        togglePlayBtn.onclick = () => {
            togglePlayBtn.classList.toggle('toggle--not-active', this.isPlaying)
            if (this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }

            // Khi audio play
            audio.onplay = () => {
                this.isPlaying = true
                CdThumbAnimate.play()
            }
            // Khi audio pause
            audio.onpause = () => {
                this.isPlaying = false;
                CdThumbAnimate.pause()
            }
        }
        // Xử lý khi tua 
        progress.onchange = () => {
            const seekTime = progress.value / 100 * audio.duration
            audio.currentTime = seekTime
        }
        progress.oninput = (e) => {
            this.isInput = true
            const seekTime = e.target.value / 100 * audio.duration
            const seekMinutes = parseInt(seekTime / 60)
            const seekSeconds = parseInt(seekTime % 60)
            if (seekSeconds < 10) {
                currentTime.innerText = `${seekMinutes}:0${seekSeconds}`   
            }
            else {
                currentTime.innerText = `${seekMinutes}:${seekSeconds}`
            }
            this.changeColorProgressBar()
        }
        progress.onmouseup = () => {
            this.isInput = false;
        }
        // Khi bài hát chạy -> xử lí hiện thị time + thay đổi range progress
        audio.ontimeupdate = () => {
            // Thay đổi range
            if (audio.duration && this.isInput === false) {
                const currentMinutes = parseInt(audio.currentTime / 60)
                const currentSeconds = parseInt(audio.currentTime) % 60;
                if (currentSeconds < 10) {
                    currentTime.innerText = `${currentMinutes}:0${currentSeconds}`   
                }
                else {
                    currentTime.innerText = `${currentMinutes}:${currentSeconds}`
                }
                const progressPercent = (audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                this.changeColorProgressBar()
            }
        }
        // Next song
        nextBtn.onclick = () => {
            if (this.isRandom) {
                this.randomSong()
            }
            else {
                this.nextSong()
            }
            this.scrollView()
        }
        // Previous Song
        previousBtn.onclick = () => {
            if (this.isRandom) {
                this.randomSong()
            }
            else {
                this.previousSong()
            }
            this.scrollView()
        }
        // Bật/ tắt Random song
        randomBtn.onclick = () => {
            this.isRandom = !this.isRandom
            randomBtn.classList.toggle('random-btn--active', this.isRandom)
        }
        // Bật, tắt repeat song + Xử lý khi end song
        repeateBtn.onclick = () => {
            this.isRepeat = !this.isRepeat
            repeateBtn.classList.toggle('repeat-btn--active', this.isRepeat)
        }
        audio.onended = () => {
            this.isPlaying = true
            if (this.isRepeat) {
                this.repeatSong()
            }
            else {
                this.nextSong()
            }
            this.scrollView()
        }
        // Click để active song
        playList.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.song--active)')
            if (songNode && !e.target.closest('.song-options')) {
                this.currentIndex = parseInt(songNode.dataset.index)
                this.loadCurrentSong()
                this.handleNewSong()
            }
            if (e.target.closest('.song-options')) {
                // Xử lý các options trong này
                alert('Chưa cập nhật')
            }
        }
        // Xử lý volume
        inputVolume.oninput = () => {
            this.handleVolume()
        }
    },
    start() {
        // Định nghĩa các thuộc tính cho object songs
        this.defineProperty()
        // Render playlist ra màn hình + active song cho bài hát đầu tiên
        this.render()
        // Load bài hát đầu tiên ra UI khi chạy ứng dụng
        this.loadCurrentSong()
        // Load màu cho volume khi chạy app
        this.changeProgressVolumeColor()
        // Xử lý các sự kiện
        this.handleEvents()
    }
}
app.start()