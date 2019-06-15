<template>
  <div class="container">
    <h1 class="title">料理画像からレシピを生成するAI</h1>
    <el-upload
      class="upload-demo"
      drag
      name="image"
      accept="image/*"
      action="http://28.122.83.34.bc.googleusercontent.com/"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :hidden="uploadHidden"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">画像を入れるか <em>選択する</em></div>
      <div slot="tip" class="el-upload__tip">
        レシピを生成する料理の画像を入れてね
      </div>
    </el-upload>
    <el-progress
      type="circle"
      :percentage="progress"
      :style="{ display: progressHidden ? 'none' : 'inline-block' }"
    ></el-progress>
    <p :hidden="progressHidden">レシピを生成中</p>
    <el-image
      v-if="!thumbnailHidden"
      style="max-width: 480px; max-height: 480px; border-radius: 4px"
      :src="thumbnail"
      fit="contain"
    ></el-image>
    <div v-for="(recipi, index) in recipis" :key="index" style="margin: 8px">
      <h3>料理名: {{ recipi.outs.title }}</h3>
      <p>材料: {{ recipi.outs.ingrs.join(', ') }}</p>
      <ol style="margin: 4px; text-align: left">
        <li v-for="(r, i) in recipi.outs.recipe" :key="i">{{ r }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      progress: 0,
      uploadHidden: false,
      progressHidden: true,
      recipis: [],
      thumbnail: null,
      thumbnailHidden: true
    }
  },
  methods: {
    handleBeforeUpload(file) {
      this.uploadHidden = true
      this.progressHidden = false
      const duration = 24
      const timer = setInterval(() => {
        if (this.progress >= 100) clearInterval(timer)
        else this.progress += 100 / duration
        this.progress = Math.floor(this.progress)
      }, 1000)

      const reader = new FileReader()
      reader.onloadend = () => {
        this.thumbnail = reader.result
      }
      if (file) {
        reader.readAsDataURL(file)
      } else {
        this.thumbnail = null
      }
    },
    handleSuccess(recipis) {
      this.progressHidden = true
      this.thumbnailHidden = false
      this.recipis = recipis
      debugger
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  margin: 32px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.upload-demo {
  margin: 32px;
}
</style>
