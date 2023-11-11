<template>
  <div class="max-w-5xl p-4">
    <div class="grid grid-cols-2 grid-flow-row">
      <h1 class="text-xl font-bold">
        Prayer Requests
      </h1>
      <div v-if="isAuthenticated" class="flex justify-end">
        <button
          type="button"
          class="p-2 border-2 bg-accent white font-bold text-white"
          @click="clearPassword"
        >
          Update Password
        </button>
      </div>
    </div>
    <div v-if="isLoading" class="mt-4 font-semibold">
      Loading...
    </div>
    <div v-if="errorMessage" class="text-red-700 mt-4">
      {{ errorMessage }}
    </div>
    <div v-if="!password && !isLoading" class="mt-4">
      <label class="py-2 mr-2">Password:</label>
      <input
        v-model="passwordInput"
        type="password"
        class="p-2 border-2 mr-2"
      >
      <button
        type="button"
        class="p-2 border-2 bg-accent white font-bold text-white"
        @click="checkAuth"
      >
        Submit
      </button>
    </div>
    <div v-if="isAuthenticated" class="mt-12">
      <div
        v-for="request in prayerRequests"
        :key="request.Id"
        class="border-2 rounded-sm p-4 my-8"
      >
        <div class="flex center mb-4 mt-1 items-center">
          <p class="text-xl font-bold flex-1">
            {{ request.Subject }}
            <span
              v-if="request.IsCompleted"
              class="text-green-600 text-xl font-bold ml-2"
            >(Request Completed)
            </span>
          </p>
          <button
            v-if="!request.IsCompleted"
            type="button"
            class="p-2 border-2 bg-green-600 white font-bold text-white"
            @click="completeRequest(request)"
          >
            Mark Completed
          </button>
          <button
            v-else
            class="p-2 border-2 bg-accent white font-bold text-white"
            @click="request.ShowDetails = !request.ShowDetails"
          >
            {{ request.ShowDetails ? 'Hide' : 'Show' }} Details
          </button>
        </div>
        <div v-if="!request.IsCompleted || request.ShowDetails">
          <p class="text-lg">
            {{ request.Request }}
          </p>
          <p class="mt-4">
            {{ request.Name }}
          </p>
          <p>{{ request.Email }}</p>
          <p>{{ new Date(request.CreatedDate).toLocaleDateString('en-US') }}</p>
          <div
            v-if="request.RecipientName || request.RecipientAddress"
            class="mt-4"
          >
            <div class="font-semibold">
              Recipient Details:
            </div>
            <p v-if="request.RecipientName">
              Name: {{ request.RecipientName }}
            </p>
            <p v-if="request.RecipientAddress">
              Address: {{ request.RecipientAddress }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-useless-escape: "off" */
/* eslint object-shorthand: "off" */

import axios from 'axios'
import apiConsts from '@/apiConsts'

export default {
  data: () => ({
    prayerRequests: undefined,
    password: undefined,
    passwordInput: undefined,
    isLoading: true,
    errorMessage: '',
    passwordStorageKey: 'password',
    isAuthenticated: undefined
  }),
  mounted: async function () {
    this.password = localStorage.getItem(this.passwordStorageKey)
    this.passwordInput = localStorage.getItem(this.passwordStorageKey)

    if (this.password) {
      await this.checkAuth()
    }

    this.isLoading = false
  },
  methods: {
    async checkAuth () {
      try {
        this.isLoading = true
        this.errorMessage = ''

        await axios.get(`${apiConsts.baseUrl}/checkauth`, {
          headers: { PASSWORD: this.passwordInput }
        })

        this.password = this.passwordInput
        localStorage.setItem(this.passwordStorageKey, this.password)
        this.isAuthenticated = true

        await this.loadRequests()

        this.isLoading = false
      } catch (ex) {
        if (ex.response.status === 401) {
          this.errorMessage = 'Incorrect password, please try again.'
          this.isAuthenticated = false
        } else {
          this.errorMessage = 'Something went wrong, please try again shortly.'
        }
        this.isLoading = false
      }
    },
    async loadRequests () {
      try {
        const now = new Date()
        const request1 = axios.get(
          `${
            apiConsts.baseUrl
          }/getprayerrequests?year=${now.getFullYear()}&month=${now.getMonth() +
            1}`,
          {
            headers: { PASSWORD: this.password }
          }
        )

        const request2 = axios.get(
          `${
            apiConsts.baseUrl
          }/getprayerrequests?year=${now.getFullYear()}&month=${now.getMonth()}`,
          {
            headers: { PASSWORD: this.password }
          }
        )

        const [thisMonthResponse, lastMonthResponse] = await Promise.all([
          request1,
          request2
        ])

        thisMonthResponse.data.forEach((element) => {
          element.ShowDetails = false
        })
        lastMonthResponse.data.forEach((element) => {
          element.ShowDetails = false
        })

        this.prayerRequests = [
          ...thisMonthResponse.data,
          ...lastMonthResponse.data
        ].slice(0, 200)
      } catch (ex) {
        if (ex.response.status === 401) {
          this.errorMessage = 'Incorrect password, please try again.'
          this.isAuthenticated = false
        } else if (ex.response.status >= 500) {
          this.errorMessage = 'Something went wrong, please try again shortly.'
        }
        this.isLoading = false
      }
    },
    async completeRequest (prayerRequest) {
      try {
        await axios.post(
          `${apiConsts.baseUrl}/prayer-request/${prayerRequest.Id}/complete`,
          null,
          {
            headers: { PASSWORD: this.password }
          }
        )
        prayerRequest.IsCompleted = true
      } catch (ex) {
        alert('Error completing prayer request.')
      }
    },
    clearPassword () {
      this.password = ''
      this.passwordInput = ''
      localStorage.setItem(this.passwordStorageKey, '')
      this.isAuthenticated = false
    }
  }
}
</script>
