<template>
  <div class="pb-10">
    <div
      v-for="event in events"
      :key="event.title"
      class="mb-10 mt-1 text-center"
    >
      <div
        v-if="daysBetween(event.date, new Date()) >= 0"
      >
        <div class="text-primary text-2xl font-semibold mb-5">
          {{ event.title }}
        </div>
        <img
          style="max-height: 600px"
          :src="event.imageUrl"
          :alt="event.imageAlt"
          class="pa-2 m-auto"
        />
      </div>
    </div>

    <div class="mb-5 grid grid-flow-col px-2">
      <div
        v-for="(link, i) in topLinks"
        :key="link.title"
        class="col-span-full md:col-span-4 flex flex-col m-auto text-center md:mt-0"
        :class="{ 'mt-20': i > 0 }"
      >
        <h2 class="text-primary text-xl font-semibold mb-4">
          {{ link.title }}
        </h2>
        <img :src="link.imageUrl" :alt="link.imageAlt" height="300" />
        <nuxt-link :to="link.linkUrl">
          <div class="p-2 bg-primary text-white mt-7 text-lg rounded">
            {{ link.linkText }}
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="bg-primary text-white text-lg px-3 py-5 text-center mt-20">
      We are open again and look forward to praying with you!
    </div>

    <div class="mt-8 mb-5 full-height-video">
      <div class="text-primary text-xl font-semibold mb-3">
        Praying to One... Praying for All
      </div>
      <iframe
        class="mt-10"
        src="https://player.vimeo.com/video/900984265?h=9f03d09ef0&title=0&byline=0&portrait=0"
        frameborder="0"
      />
    </div>

    <div class="mt-10 pt-5 full-height-video">
      <div class="text-primary text-xl font-semibold mb-3">
        Divine Distancing
      </div>
      <iframe
        class="mt-10 pt-5 mb-10"
        src="https://youtube.com/embed/bxqZUB-8lNk"
        frameborder="0"
      />
    </div>

    <div class="my-5 grid grid-cols-2 gap-10">
      <div
        v-for="video in videos"
        :key="video.url"
        class="mt-10 full-height-video col-span-2 md:col-span-1"
      >
        <div class="text-primary text-xl font-semibold mt-4">
          {{ video.title }}
        </div>
        <iframe
          class="mt-20 md:mt-10 sm:mt-10 sm:pt-5 md:pt-10 lg:pt-5"
          :src="video.url"
          frameborder="0"
        />
      </div>
    </div>

    <div class="mt-20 pt-5 full-height-video">
      <div class="text-primary text-xl font-semibold mb-3">
        The Power of Prayer: Thank you!
      </div>
      <iframe
        class="mt-10 pt-5"
        src="https://youtube.com/embed/s1Z2hgzY7xM"
        frameborder="0"
      />
    </div>

    <hr class="bg-gray-50 mt-20" />
    <h2 class="my-7 text-primary text-xl font-semibold">
      Monastery Construction Photos
    </h2>
    <div class="mt-5 mb-7 grid grid-cols-3 gap-5 md:gap-20 mx-0 md:mx-20">
      <div
        v-for="monasteryImage in monasteryGallery"
        :key="monasteryImage.imageUrl"
        class="col-span-1"
      >
        <img
          :src="monasteryImage.imageUrl"
          :alt="monasteryImage.imageAlt"
          class="full-width-image pa-2"
        />
      </div>
    </div>

    <hr class="bg-gray-50 mt-20" />
    <h2 class="my-7 text-primary text-xl font-semibold">Testimonials</h2>
    <div class="mt-5 mb-7 grid grid-cols-3 gap-5 md:gap-20 mx-0 md:mx-20">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.person"
        class="col-span-3 md:col-span-1 gap-5 mb-10 md:mb-0"
      >
        <img
          src="~/assets/icons/quote-left-secondary.svg"
          width="30"
          class="mb-2"
        />
        <p class="text-primary italic">
          {{ testimonial.text }}
        </p>
        <p class="text-primary italic mt-5">~ {{ testimonial.person }}</p>
      </div>
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
    videos: [
      {
        title: 'Power of Prayer: One year later…Sew for the Soul',
        url: 'https://youtube.com/embed/UEq_Q-2ejrw'
      },
      {
        title: 'EOHSJ Feature on the Perpetual Adoration Sisters',
        url: 'https://player.vimeo.com/video/362171995'
      },
      {
        title: 'The Power of Prayer – A Survivor’s Story',
        url: 'https://youtube.com/embed/mpf_6fOSyAk'
      },
      {
        title: 'The Power of Prayer – A Leap of Faith',
        url: 'https://youtube.com/embed/rnk5TNHg3K4'
      }
    ],
    monasteryGallery: [
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_01.jpg'),
        imageAlt: 'Bishop blessing the monastery'
      },
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_02.jpg'),
        imageAlt: 'Sisters walking near the monastery'
      },
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_03.jpg'),
        imageAlt: 'Sisters and the bishop at the opening of the monastery'
      },
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_04.jpg'),
        imageAlt: "Construction of the monastery's basement"
      },
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_05.jpg'),
        imageAlt: 'Foundation of the monastery is being poured'
      },
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_06.jpg'),
        imageAlt: 'Construction worker reviews the site plans'
      },
      {
        imageUrl: require('~/assets/home/Monastery_Gallery_07.jpg'),
        imageAlt: 'Walls are being framed for the monastery'
      }
    ],
    testimonials: [
      {
        text: 'We always call the Perpetual Adoration Sisters of the Blessed Sacrament and have them pray when our family needs it. Their prayer brings our family peace when we need it most. They are a great gift to our diocese!',
        person: 'Barb Swift'
      },
      {
        text: "Praying with the Perpetual Adoration Sisters of the Blessed Sacrament has had a profound effect on my life and my family's. When I pray with the Sisters I truly feel the presence of the Lord.",
        person: 'Dave Fleck'
      },
      {
        text: 'The meditation aspect of adoration with the Eucharist is impossible to describe. Having the Adoration Sisters available 24 hours a day to pray for us, is perhaps the greatest unadvertised benefit available to us in our diocese. They are a blessing.',
        person: 'Steve Lynch'
      }
    ],
    events: [
      {
        title: 'Join us for our 2025 fiesta!',
        date: Date.parse('2025-10-05'),
        imageUrl: require('~/assets/events/2025_fiesta_fundraiser_main.jpeg'),
        imageAlt:
          'Perpetual Adoration Sisters Fiesta Fundraiser Flyer. Event is Sunday, October 5th, 2024, 1:00 - 5:30 PM, at 707 W. 4th Street Sioux Falls, SD.'
      }
    ]
  }),
  methods: {
    daysBetween (date1, date2) {
      const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
      const diffDays = Math.ceil((date1 - date2) / oneDay)
      return diffDays
    }
  }
}
</script>

<style scoped>
.full-height-video {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  height: 0;
}

.full-height-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.full-width-image {
  max-width: 100%;
  width: 100%;
  height: 100%;
}
</style>
