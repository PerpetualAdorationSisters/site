<template>
  <div>
    <img
      src="~/assets/about-us/header-image.jpg"
      class="mb-5"
      alt="Group picture of the sisters"
    >
    <h2 class="text-xl text-primary font-semibold">Who We Are</h2>
    <p class="mb-5 mt-3">
      The mission of the Perpetual Adoration Sisters of the Blessed Sacrament
      is, as their name describes, the adoration to Jesus truly present in the
      Most Blessed Sacrament. Each Sister has her turn for adoration, day and
      night, in front of the Blessed Sacrament where they continually pray for
      the intentions and needs of all humanity, especially those who daily send
      their prayer requests, and all members of the Diocese of Sioux Falls which
      is their home.
      <br />
      <br />
      The sisters way of life is contemplative. Living their mission and charism
      is fulfilled inside the Monastery; leaving it only in order to provide for
      basic needs or special occasions. While their main charism is prayer, each
      sister assists in different community activities such as sewing, cooking,
      sacristy, laundry, host making, receptionist, and office work. Spiritual
      reading, recreation and study are also important duties in their daily
      routine.
      <br />
      <br />
      The Order was originally established in Italy by Blessed Mother Mary
      Magdalene of the Incarnation in 1807. In May of 2002, in response to the
      invitation of Bishop Robert Carlson, seven Sisters arrived from
      Coscomatepec Veracruz, Mexico to start a new community in the Diocese of
      Sioux Falls at the Cathedral of St. Joseph.
      <br />
      <br />
      By following their rule, their mission is accomplished quietly inside the
      walls of their cloister. Day by day the sisters offer their lives lovingly
      to God and his people with their humble service of prayer and adoration to
      Jesus really present in the Most Blessed Sacrament of the Eucharist.
    </p>

    <div class="my-10 grid grid-cols-3 gap-x-5 gap-y-10">
      <div
        v-for="activityImage in activitiesGallery"
        :key="activityImage.imageUrl"
        class="col-span-3 sm:col-span-1"
      >
        <img
          :src="activityImage.imageUrl"
          :alt="activityImage.imageAlt"
          class="full-width-image"
        />
        <p class="text-center text-sm py-1">{{ activityImage.imageLabel }}</p>
      </div>
    </div>

    <h2 class="text-xl text-primary font-semibold mt-10">
      A Typical Day
    </h2>
    <ul class="list-disc ml-7 mt-3">
      <li>
        5:30 AM Rise
      </li>
      <li>
        Traditional Scripture Reading
      </li>
      <li>
        Morning Prayer
      </li>
      <li>
        Holy Mass
      </li>
      <li>
        Mid Morning Prayer
      </li>
      <li>
        Breakfast
      </li>
      <li>
        Monastery Chores
      </li>
      <li>
        Midday Prayer and Devotions
      </li>
      <li>
        Lunch
      </li>
      <li>
        Rest
      </li>
      <li>
        Mid Afternoon Prayer, Holy Rosary and Spiritual Reading
      </li>
      <li>
        Monastery Chores
      </li>
      <li>
        Evening Prayer, Office of Readings and Meditation
      </li>
      <li>
        Dinner
      </li>
      <li>
        Study
      </li>
      <li>
        Recreation
      </li>
      <li>
        10:00 PM Final Prayers
      </li>
    </ul>
    <p class="mt-3">
      Each Sister has an hour of personal adoration before the Blessed Sacrament
      daily and during the night one hour two times a week.
    </p>

    <h2 class="text-xl text-primary font-semibold mt-10">
      Our Monastery in Sioux Falls
    </h2>
    <p class="mb-5 mt-3">
      At the request of Most Rev. Robert Carlson the founding sisters arrived
      from the Monastery of San Juan Bautista de Coscomatepec, Veracruz, Mexico
      in May 2002, to adore the Lord in the Holy Eucharist and to pray for all
      peoples, especially those in this diocese. In May 2018, the Adoration
      Sisters’ new home dedicated to intercessory prayer, The Mater Ecclesiae
      Monastery, opened on the Cathedral of St. Joseph campus. The Sisters’ home
      for their first 16 years of ministry in the Diocese was the Monastery of
      Our Lady of Guadalupe and Saint Joseph located in the former Cathedral of
      St. Joseph rectory.
    </p>

    <h2 class="text-xl text-primary font-semibold">Our Foundress</h2>
    <div class="mb-5 mt-3">
      <div class="float-none sm:float-left mr-5 border-solid border-gray-200 border-2 rounded-sm p-2 text-center mb-2">
        <img
          src="~/assets/about-us/mary-magdelene.jpg"
          class="inline"
          alt="The blesesed Mother Mary Magdelene"
        >
        <p class="text-center text-sm">Blessed Mother Mary Magdelene</p>
      </div>
      Blessed Mother Magdalene of the Incarnation was born in Italy on April 16,
      1770 as Caterina Sordini. She had a lively temperament and after
      sustaining some injuries in some childish escapades, Caterina began to
      settle down. She became engaged to a young man in the village, Alfonso
      Cacece.
      <br>
      <br>
      Before the couple were to get married, Alfonso had to take a trip to
      Constantinople. It was during this trip that Caterina took the opportunity
      to dress in her finest and decked with her jewels given by her fiance she
      went before a mirror.
      There, her reflection was blurred and faded, and in its place, she saw in
      her mind’s eye Christ hanging from the cross and irresistible words came
      inviting her to exclusive love and devotion. This profound experience
      caused her to faint and when she recovered she was a changed young woman.
      After consulting with her spiritual director and parents, Caterina joined
      the Franciscan Tertiaries in lschia di Castro. There she began religious
      life as Sister Mary Magdalene of the Incarnation.
      <br>
      <br>
      During the novitiate with the Franciscans, Sister Mary Magdalene had
      another vision. This time she foresaw that she would found an order
      dedicated to perpetual adoration. Sister went on to make her vows with the
      Fransiscans. Eventually she became the Mother Abbess. It was in her second
      term as Abbess that she gained permission to found the Sisters of
      Perpetual Adoration.
      <br>
      <br>
      After founding a monastery of cloistered sisters, she continued in her
      life of holiness. Many miracles were attributed to her in her lifetime.
      She was called home by her Divine Spouse in 1824. Blessed Mother Mary
      Magdalene was beatified on May 3, 2008. Her body is venerated in Rome.
    </div>

    <div class="flex my-8">
      <img src="~/assets/icons/quote-left-secondary.svg" width="30" class="mr-4 flex-1" >
      <p class="text-primary italic">
        “Jesus, My Supreme Good, I want the whole world to love you even at the
        cost of my many hardships and of my life.” (Aspirations of Blessed
        Mother Mary Magdalene of the Incarnation, Foundress of the Sisters of
        Perpetual Adoration)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activitiesGallery: [
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_01.jpg'),
        imageLabel: 'Making hosts',
        imageAlt: 'Sister using a press to make hosts'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_02.jpg'),
        imageLabel: 'Daily chores',
        imageAlt: 'Sister ironing garments'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_03.jpg'),
        imageLabel: 'Office work',
        imageAlt: 'Sister reading papers'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_04.jpg'),
        imageLabel: 'Office work',
        imageAlt: 'Sister working at a computer'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_05.jpg'),
        imageLabel: 'Working in the sacristy',
        imageAlt: 'Sister working in the sacristy'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_06.jpg'),
        imageLabel: 'Sewing vestments',
        imageAlt: 'Sister sewing vestments'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_07.jpg'),
        imageLabel: 'Spiritual reading',
        imageAlt: 'Sister reading'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_08.jpg'),
        imageLabel: 'Cooking dinner',
        imageAlt: 'Two sisters cooking food'
      },
      {
        imageUrl: require('~/assets/about-us/Activity_Gallery_09.jpg'),
        imageLabel: 'Praying before the Blessed Sacrament',
        imageAlt: 'Sister praying in front of the altar'
      }
    ]
  }),
  head: {
    title: 'Formation - Perpetual Adoration Sisters of the Blessed Sacrament'
  }
}
</script>

<style scoped>
.full-width-image {
  max-width: 100%;
  width:100%;
  height:100%;
}
</style>
