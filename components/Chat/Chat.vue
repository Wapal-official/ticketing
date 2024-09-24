<template>
  <!-- <div class="chat-container">
    <button
      @click="loadChatBox"
      class="chat-icon"
      @mousedown="chatIconSelected"
      @touchstart="chatIconSelected"
      ref="chatIcon"
      v-if="!showChatBox"
    >
      <i class="bx bx-message-rounded-dots"></i>
    </button>
    <div class="chat-box" ref="widgetbotContainer" v-if="showChatBox">
      <div class="close-button d-flex flex-column align-center justify-center">
        <button @click="showChatBox = false">
          <i class="bx bx-x"></i>
        </button>
      </div>
    </div>
  </div> -->
</template>
<!-- <script>
export default {
  data() {
    return {
      showChatBox: false,
      chatBoxLoaded: false,
      isMouseDown: false,
    };
  },
  methods: {
    loadChatBox() {
      this.showChatBox = true;

      setTimeout(() => {
        const widgetbot = document.createElement("widgetbot");
        widgetbot.setAttribute("server", "1059332099515093053");
        widgetbot.setAttribute("channel", "1202936325477503026");
        widgetbot.setAttribute("class", "chat-box");
        widgetbot.style.height = "100%";
        widgetbot.style.width = "100%";
        this.$refs.widgetbotContainer.appendChild(widgetbot);

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@widgetbot/html-embed";
        script.async = true;

        script.onload = () => {
          this.chatBoxLoaded = true;
        };

        document.head.appendChild(script);
      }, 200);
    },
    chatIconSelected() {
      this.isMouseDown = true;
    },
    chatIconUnSelected() {
      this.isMouseDown = false;
    },
    chatIconMoved(event) {
      if (this.isMouseDown) {
        let moveWidth = event.clientX;
        let moveHeight = event.clientY;

        if (event.touches && event.touches[0]) {
          moveHeight = event.touches[0].clientY;
          moveWidth = event.touches[0].clientX;
        }

        const maxWidth = window.innerWidth - 50;
        const maxHeight = window.innerHeight - 55;

        if (moveHeight > maxHeight) {
          moveHeight = maxHeight;
        }

        if (moveWidth > maxWidth) {
          moveWidth = maxWidth;
        }

        if (moveHeight < 0) {
          moveHeight = 0;
        }

        if (moveWidth < 0) {
          moveWidth = 0;
        }

        this.$refs.chatIcon.style.top = moveHeight + "px";
        this.$refs.chatIcon.style.left = moveWidth + "px";
      }
    },
  },
  mounted() {
    window.addEventListener("mouseup", this.chatIconUnSelected);
    window.addEventListener("mousemove", this.chatIconMoved);
    window.addEventListener("touchend", this.chatIconUnSelected);
    window.addEventListener("touchmove", this.chatIconMoved);
  },
  beforeDestroy() {
    window.addEventListener("mouseup", this.chatIconUnSelected);
    window.addEventListener("mousemove", this.chatIconMoved);
    window.addEventListener("touchend", this.chatIconUnSelected);
    window.addEventListener("touchmove", this.chatIconMoved);
  },
};
</script>
<style scoped>
.chat-container {
  width: 0;
  height: 0;
}
.chat-icon {
  position: fixed;
  right: 8px;
  top: 90%;
  z-index: 999;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #8EE3fB;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.chat-box {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100dvh - 55px);
  z-index: 999;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: #313339;
  color: white;
  border-radius: 0 7px 0 0;
  width: 45px;
  height: 47px;
  font-size: 1.5rem;
}

@media (min-width: 600px) {
  .chat-box {
    width: 400px;
    height: 500px;
  }
}
</style> -->
