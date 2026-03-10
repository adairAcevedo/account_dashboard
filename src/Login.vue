<template>
    <div class="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">  
        <div class="col-start-3 row-start-3 flex max-w-lg flex-col bg-gray-100 p-2 dark:bg-white/10">
            <div class="rounded-xl bg-white p-10 text-sm/7 text-gray-700 dark:bg-gray-950">    
                <form>
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-12 dark:border-white/10">
                            <h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Login</h2>
                            <!-- <p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Use a permanent address where you can receive mail.</p> -->

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div class="col-span-full">
                                <label for="street-address" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Username</label>
                                <div class="mt-2">
                                <input id="street-address" type="text" name="username" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                                </div>
                            </div>

                            <div class="col-span-full">
                                <label for="street-address" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Password</label>
                                <div class="mt-2">
                                <input id="street-address" type="password" name="street-address" autocomplete="password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                                </div>
                            </div>



                            </div>
                        </div>
               
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        
                        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>

</script>