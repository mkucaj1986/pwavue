<template>
    <div class="camera-modal">
        <video ref="video" class="camera-stream"></video>
        <div class="camera-modal-container">
            <el-button @click="capture" type="success">
                <i class="material-icons">Capture photo</i>
            </el-button>
        </div>
        <div v-for="(img, index) in gallery" :key="index">
            <img id="image" :src="img.src" class="gallery-img" alt="Capturing">
        </div>

        <el-button @click="sendImages" type="success" v-if="canSendImages">
            <i class="material-icons">Send gallery images</i>
        </el-button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      mediaStream: null,
      onlineStatus: null,
      gallery: [],
      imgSrc: ''
    };
  },
  async mounted () {
    await this.checkWifi();
    window.addEventListener('load', () => {
      window.addEventListener('sync', this.backgroundSync);
      window.addEventListener('online', this.checkWifi);
      window.addEventListener('offline', this.checkWifi);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      })
      .catch(error => console.error('getUserMedia() error:', error));
  },
  beforeDestroy: function () {
    window.removeEventListener('sync', this.backgroundSync);
    window.removeEventListener('online', this.checkWifi);
    window.removeEventListener('offline', this.checkWifi);
  },
  destroyed () {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  },
  computed: {
    canSendImages () {
      return this.gallery.length;
    }
  },
  methods: {
    capture () {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      const img = document.querySelector('img');
      return imageCapture.takePhoto().then(blob => {
        img.src = URL.createObjectURL(blob);
        this.gallery.push({
          src: img.src
        });
      });
    },
    async checkWifi () {
      const isOnline = await this.$checkWifi();
      this.onlineStatus = !!isOnline;
      this.onlineStatusMsg = isOnline ? 'My network is fine' : 'I am offline';
      if (this.onlineStatus && this.gallery.length) {
        this.makeAjaxCall();
      }
      isOnline
        ? this.$message({
          message: 'My network is fine',
          type: 'success'
        })
        : this.$message.error(
          'You seem to be offline. Connect to send user data'
        );
    },
    sendImages () {
      return this.onlineStatus ? this.makeAjaxCall() : this.showMessage();
    },
    makeAjaxCall () {
      const data = this.gallery;
      axios
        .post('https://www.mocky.io/v2/5c6d101d3700001119fa31a8', {
          body: data
        })
        .then(response => {
          this.$message({
            message: 'Your data was successfully sent',
            type: 'success'
          });
          this.gallery = [];
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    showMessage () {
      this.$message({
        message:
          'You seem to be offline, Your data save successfully Connect to send',
        type: 'warning'
      });
    }
  }
};
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.gallery-img {
  width: 80px;
  margin: 20px;
}
</style>
