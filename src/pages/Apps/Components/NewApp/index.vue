<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div class="font-normal text-2xl"><h1>New App</h1></div>
    </div>
    <div class="pt-5">
      <div
        class="w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-white"
      >
        <form>
          <div class="grid gap-6 mb-6 lg:grid-cols-2">
            <div class="pr-6">
              <label
                for="app_name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Name of your app</label
              >
              <input
                type="text"
                id="app_name"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:placeholder-gray-600"
                placeholder="App Name"
                required
              />
            </div>
            <div class="max-md:hidden"></div>
            <div class="pr-6">
              <label
                for="organization"
                class="block mb-2 text-sm font-medium text-gray-900"
                >What organization should it belong to?
              </label>
              <select
                id="countries"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 focus:placeholder-gray-600"
              >
                <option selected value="US">Organisation 1</option>
                <option value="CA">Organisation 2</option>
                <option value="FR">Organisation 3</option>
                <option value="DE">Organisation 4</option>
              </select>
            </div>
            <div class="max-md:hidden"></div>
            <div>
              <label
                for="organization"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Set up web push or mobile push. You can set up more later.
              </label>
              <ul class="flex w-full gap-3 flex-wrap">
                <li class="max-sm:w-full">
                  <input
                    type="radio"
                    id="hosting-small"
                    name="hosting"
                    value="hosting-small"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="hosting-small"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
                <li class="max-sm:w-full">
                  <input
                    type="radio"
                    id="hosting-small2"
                    name="hosting"
                    value="hosting-small2"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="hosting-small2"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
                <li class="max-sm:w-full">
                  <input
                    type="radio"
                    id="hosting-small3"
                    name="hosting"
                    value="hosting-small3"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="hosting-small3"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
                <li class="max-sm:w-full">
                  <input
                    type="radio"
                    id="hosting-small4"
                    name="hosting"
                    value="hosting-small4"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="hosting-small4"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
      <div class="pt-3">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center gap-2"
        >
          <span>Next Step </span>
          <span class="pi pi-angle-right text-white"></span>
        </button>
      </div>
    </div>
  </div>
</template>
