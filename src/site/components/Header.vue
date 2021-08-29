<template>
  <div class="h-full">
    <div class="bg-accent hidden md:block">
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
    <div
      class="bg-accent block md:hidden p-3 cursor-pointer select-none"
      @click="mobileNavShown = true"
    >
      <nuxt-link to="#navigation">
        <img src="~/assets/icons/menu.svg" class="inline mb-1" width="20" alt="Open navigation"/>
        <span class="text-white ml-2">Navigation</span>
      </nuxt-link>
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
    <nav class="bg-accent hidden md:block">
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
            class="w-auto hover:text-black hover:bg-white py-3 px-3"
            :class="{
              'text-white': !routeMatchesLink(link.route),
              'text-black': routeMatchesLink(link.route),
              'bg-white': routeMatchesLink(link.route)
            }"
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
        <div class="inline ml-1">
          <a
            href="mailto:adortrices@sfcatholic.org"
          >
            <img src="~/assets/icons/mail.svg" class="inline" width="20" alt="Contact us through email" />
          </a>
        </div>
      </div>
    </nav>
    <nav v-if="mobileNavShown" class="absolute top-0 left-0 bottom-1 bg-gray-50 w-4/5">
      <div class="mb-5 grid grid-rows-1 grid-flow-col justify-between p-4">
        <div class="row-span-1">
          <button @click="mobileNavShown = false" class="inline">
            <img src="~/assets/icons/x-square-gray.svg" width="30" alt="Close navigation"/>
          </button>
        </div>
        <div class="row-span-1">
          <nuxt-link class="mb-5 inline" @click.native="mobileNavShown = false" to="/">
            <img src="~/assets/icons/home-gray.svg" width="30" alt="Go home"/>
          </nuxt-link>
        </div>
      </div>
      <p class="text-primary mb-1 font-semibold px-4">
        Main Menu
      </p>
      <div
        v-for="link in navLinks"
        :key="link.text"
        class="py-2 px-4"
        :class="{
          'bg-gray-200': routeMatchesLink(link.route)
        }"
      >
        <nuxt-link
          :to="link.route"
          class="text-black hover:underline"
          @click.native="mobileNavShown = false"
        >
          {{ link.text }}
        </nuxt-link>
        <div v-if="link.subLinks" class="mt-2">
          <div
            v-for="sublink in link.subLinks"
            :key="sublink.text"
            class="py-2"
          >
            <nuxt-link
              :to="sublink.route"
              class="block pl-3 hover:underline"
              @click.native="mobileNavShown = false"
            >
              {{ sublink.text }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <p class="text-primary mb-1 mt-4 font-semibold px-4">
        Prayers
      </p>
      <nuxt-link
        to="prayer-request"
        class="hover:underline block my-3 px-4"
        @click.native="mobileNavShown = false"
      >
        SEND US YOUR PRAYER REQUEST
      </nuxt-link>
      <nuxt-link
        to="mass-cards"
        class="hover:underline block px-4"
        @click.native="mobileNavShown = false"
      >
        REQUEST A MASS CARD
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    mobileNavShown: false,
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
        route: '/formation'
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
  }),
  methods: {
    routeMatchesLink (link) {
      console.log(this.$route)
      return this.$route.path === link
    }
  }
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
