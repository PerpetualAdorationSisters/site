<template>
  <div class="pb-10">
    <div class="mb-5 grid grid-flow-col px-2">
      <div
        v-for="(link, i) in topLinks"
        :key="link.title"
        class="col-span-full md:col-span-4 flex flex-col m-auto text-center md:mt-0"
        :class="{ 'mt-20': i > 0 }"
      >
        <h2 class="text-primary text-xl font-semibold mb-4 ">
          {{ link.title }}
        </h2>
        <img :src="link.imageUrl" :alt="link.imageAlt" height="300"/>
        <nuxt-link :to="link.linkUrl">
          <div class="p-2 bg-primary text-white mt-7 text-lg rounded">{{ link.linkText }}</div>
        </nuxt-link>
      </div>
    </div>

    <div class="bg-primary text-white text-lg px-3 py-5 text-center mt-20">
      We are open again and look forward to praying with you!
    </div>

    <div class="mt-10 full-height-video">
      <div class="text-primary text-xl font-semibold mb-3">Divine Distancing</div>
      <iframe
        class="mt-10"
        src="https://youtube.com/embed/bxqZUB-8lNk"
        frameborder="0"
      ></iframe>
    </div>

    <div class="my-5 grid grid-cols-2 gap-10">
      <div
        v-for="video in videoList"
        :key="video.url"
        class="mt-10 full-height-video col-span-2 md:col-span-1"
      >
        <div class="text-primary text-xl font-semibold mt-4">{{ video.title }}</div>
        <iframe
          class="mt-20 md:mt-10 sm:mt-10 sm:pt-5 md:pt-10 lg:pt-5"
          :src="video.url"
          frameborder="0"
        ></iframe>
      </div>
    </div>

    <div class="mt-20 pt-5 full-height-video">
      <div class="text-primary text-xl font-semibold mb-3">The Power of Prayer: Thank you!</div>
      <iframe
        class="mt-10 pt-5"
        src="https://youtube.com/embed/s1Z2hgzY7xM"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    topLinks: [
      {
        title: 'Prayer Request',
        linkUrl: '/prayer-request',
        linkText: 'PRAYER REQUEST',
        imageUrl: require('~/assets/home/Monstrance_Icon-225x300.png'),
        imageAlt: 'Monstrance'
      },
      {
        title: 'Mass Card',
        linkUrl: '/mass-cards',
        linkText: 'MASS CARD REQUEST',
        imageUrl: require('~/assets/home/PrayingHands_Icon-225x300.png'),
        imageAlt: 'Hands praying'
      },
      {
        title: 'Make a Donation',
        linkUrl: '/donate',
        linkText: 'MAKE A DONATION',
        imageUrl: require('~/assets/home/Heart_Icon-225x300.png'),
        imageAlt: 'Heart icon'
      }
    ],
    videoList: [
      {
        title: 'Power of Prayer: One year later…Sew for the Soul',
        url: 'https://youtube.com/embed/UEq_Q-2ejrw'
      },
      {
        title: 'EOHSJ Feature on the Perpetual Adoration Sisters',
        url: 'https://player.vimeo.com/video/362171995'
      },
      {
        title: 'What is Intercessory Prayer?',
        url: 'https://youtube.com/embed/SuVym5HksPk'
      },
      {
        title: 'About the Sisters',
        url: 'https://youtube.com/embed/6HUi0qg_yoA'
      },
      {
        title: 'The Power of Prayer – A Survivor’s Story',
        url: 'https://youtube.com/embed/mpf_6fOSyAk'
      },
      {
        title: 'The Power of Prayer – A Leap of Faith',
        url: 'https://youtube.com/embed/rnk5TNHg3K4'
      }
    ]
  })
}
</script>

<style scoped>
.full-height-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}

.full-height-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
