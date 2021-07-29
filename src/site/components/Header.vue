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
    <div class="bg-accent">
      <div class="max-w-5xl mx-auto p-3">
        <nuxt-link
          v-for="link in navLinks"
          :key="link.text"
          :to="link.route"
          class="w-auto text-white hover:text-black hover:bg-white py-3 px-3"
        >
          {{link.text}}
        </nuxt-link>
      </div>
    </div>
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
        route: '#'
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
  background-image: url("assets/floral-dark.png");
  background-repeat: repeat;
}
</style>
