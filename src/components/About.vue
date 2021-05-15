<template>
  <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
      <h1 class="cover-heading">Run this project on dev mode in port 3000: npm run dev</h1> <br>
      <h1>Changing password feature requires email verification.I am using Mailgun free version so you must contact me
        to allow you
        receiving email.</h1><br>
      <h1 class="cover-heading">PHP version 7.4: require extension Imagick for embedding QrCode in mail.</h1> <br>
      <img alt="Vue about" :src="'film.jpg'" class="img-fluid">
    </main>
  </div>
</template>
<script>

export default {
  name: "App"
}
</script>