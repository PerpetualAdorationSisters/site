<template>
  <div>
    <div class="bg-accent">
      <div class="max-w-5xl text-right mx-auto p-2 px-3">
        <nuxt-link
          to="prayer-request"
          class="w-auto text-white hover:text-black hover:bg-white p-2 text-sm"
        >
          SEND US YOUR PRAYER REQUEST
        </nuxt-link>
        <nuxt-link
          to="mass-cards"
          class="w-auto text-white hover:text-black hover:bg-white p-2 text-sm"
        >
          REQUEST A MASS CARD
        </nuxt-link>
      </div>
    </div>
    <div class="bg-primary flower-bg">
      <div class="max-w-5xl mx-auto px-5">
        <nuxt-link to="/">
          <img
            class="py-5"
            src="~/assets/banner-logo.png"
            alt="Perpetual adoration sisters logo"
          />
        </nuxt-link>
      </div>
    </div>
    <nav class="bg-accent">
      <div class="max-w-5xl mx-auto p-3">
        <span
          v-for="link in navLinks"
          :key="link.text"
          @mouseover="link.isHovered = true"
          @mouseleave="link.isHovered = false"
          @focus="link.isHovered = true"
          @blur="link.isHovered = false"
        >
          <nuxt-link
            :to="link.route"
            class="w-auto text-white hover:text-black hover:bg-white py-3 px-3"
          >
            {{ link.text }}
            <span v-if="link.subLinks" class="text-xs">▼</span>
            <div v-if="link.isHovered" class="absolute z-10">
              <div class="block mt-2">
                <nuxt-link
                  v-for="sublink in link.subLinks"
                  :key="sublink.text"
                  :to="sublink.route"
                  class="block px-3 py-3 hover:underline bg-white dropdown-item"
                >
                  {{ sublink.text }}
                </nuxt-link>
              </div>
            </div>
          </nuxt-link>
        </span>
        <div class="inline">
          <a
            href="mailto:adortrices@sfcatholic.org"
          >
            <img src="~/assets/icons/mail.svg" class="inline" width="20" />
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    navLinks: [
      {
        text: 'Home',
        route: '/'
      },
      {
        text: 'About Us',
        route: '#',
        isHovered: false,
        subLinks: [
          {
            text: 'Who We Are',
            route: '/about-us'
          },
          {
            text: 'Quarterly Newsletter',
            route: '/quarterly-newsletter'
          }
        ]
      },
      {
        text: 'Formation',
        route: '#'
      },
      {
        text: 'Prayers',
        route: '/prayers'
      },
      {
        text: 'Donate',
        route: '#'
      },
      {
        text: 'Contact',
        route: '#'
      }
    ]
  })
}
</script>

<style scoped>
.flower-bg {
  background-image: url('assets/floral-dark.png');
  background-repeat: repeat;
}

.dropdown-item {
  margin-left: 72px;
}
</style>
