<template>
  <form>
    <h2 class="text-primary text-xl font-semibold mb-4">Submit your prayer request</h2>
    <div>
      <label id="name-label" for="name">Your Name (required)</label>
      <br />
      <input
        id="name"
        aria-labelledby="name-label"
        class="text-input"
        required
        autofocus="autofocus"
        v-model="prayerRequest.name"
      />
    </div>
    <div class="mt-5">
      <label id="email-label" for="email">Your Email (required)</label>
      <br />
      <input
        id="email"
        aria-labelledby="email-label"
        class="text-input"
        required
        v-model="prayerRequest.email"
      />
    </div>
    <div class="mt-5">
      <label id="subject-label" for="subject">Subject</label>
      <br />
      <input
        id="subject"
        aria-labelledby="subject-label"
        class="text-input"
        v-model="prayerRequest.subject"
      />
    </div>
    <div class="mt-5">
      <label id="prayer-request-label" for="prayer-request">Your Prayer Request</label>
      <br />
      <textarea
        id="prayer-request"
        aria-labelledby="prayer-request-label"
        class="text-input"
        required
        rows="8"
        v-model="prayerRequest.request"
      ></textarea>
    </div>
    <p class="my-4">
      If you are offering this prayer request for someone else and would
      like the Sisters to send them a postcard, please fill out the
      following information.
    </p>
    <div class="mt-5">
      <label id="recipient-name-label" for="recipient-name">Recipient's Name</label>
      <br />
      <input
        id="recipient-name"
        aria-labelledby="recipient-name-label"
        class="text-input"
        v-model="prayerRequest.recipientName"
      />
    </div>
    <div class="mt-5">
      <label id="recipient-address-label" for="recipient-address">Recipient's Address</label>
      <br />
      <textarea
        id="recipient-address"
        aria-labelledby="recipient-address-label"
        class="text-input"
        rows="4"
        v-model="prayerRequest.recipientAddress"
      ></textarea>
    </div>
    <p v-if="errMsg" class="mt-2 text-primary">{{ errMsg }}</p>
    <p v-if="isSubmitting" class="mt-2">Submitting...</p>
    <p v-if="submitSucceeded" class="mt-2 text-green-700">Prayer request submitted. Thank you!</p>
    <button v-if="!isSubmitting && !submitSucceeded" type="button" class="px-5 py-2 my-4 bg-blue-700 text-white rounded" @click="submit">SEND</button>
  </form>
</template>

<script>
/* eslint no-useless-escape: "off" */

import axios from 'axios'

export default {
  data: () => ({
    prayerRequest: {
      name: '',
      email: '',
      subject: '',
      request: '',
      recipientName: '',
      recipientAddress: ''
    },
    errMsg: '',
    submitSucceeded: false,
    isSubmitting: false
  }),
  methods: {
    async submit () {
      try {
        this.errMsg = ''
        const validationErrors = this.getValidationErrors()
        if (validationErrors && validationErrors.length > 0) {
          this.errMsg = validationErrors.join(', ')
          return
        }
        this.isSubmitting = true

        await axios.post('https://perpetualadorationsisters.azurewebsites.net/api/createprayerrequest', this.prayerRequest)
        this.submitSucceeded = true
        this.isSubmitting = false
      } catch (err) {
        this.isSubmitting = false
        this.errMsg = 'Error: ' + err.response?.data
      }
    },
    getValidationErrors () {
      const result = []

      if (!this.prayerRequest.name) {
        result.push('Name is required')
      }

      if (!this.prayerRequest.email) {
        result.push('Email is required')
      } else if (!this.prayerRequest.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        result.push('Email is invalid')
      }

      if (!this.prayerRequest.request) {
        result.push('Prayer Request is required')
      }

      return result
    }
  }
}
</script>

<style scoped>
.text-input {
  border: 1px solid gray;
  border-radius: 2px;
  width: 90%;
  padding: 5px;
}
</style>
