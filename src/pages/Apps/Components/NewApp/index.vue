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
          <div class="grid gap-6 mb-6 md:grid-cols-2">
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

              <div class="flex flex-row">
                <div
                  class="w-full max-w-[10rem] bg-white border border-gray-50 cursor-pointer rounded-md shadow dark:border-gray-300 hover:dark:border-indigo-400 hover:bg-indigo-100 flex flex-col gap-2 items-center justify-center"
                >
                  <img
                    class="px-6 pt-6 rounded-t-lg"
                    src="../../../../assets/whatsapp.svg"
                    alt="product image"
                  />
                  <label
                    for="organization"
                    class="block mb-2 text-sm font-medium text-gray-900 pb-6"
                    >Whatsapp
                  </label>
                </div>
              </div>
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
