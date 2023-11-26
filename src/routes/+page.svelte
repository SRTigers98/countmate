<script lang="ts">
  import { base } from "$app/paths";
</script>

<section>
  <h1 class="h1 mb-4">
    <span class="title">DeltaCount</span>
  </h1>

  Another counting application that stores your counters
  <strong>locally in the browser</strong>.
</section>

<a href="{base}/counter" class="btn bg-gradient-to-br variant-gradient-primary-secondary">
  Get Started
</a>

<style>
  .title {
    @apply bg-clip-text text-transparent box-decoration-clone;
    @apply bg-gradient-to-br;
    @apply from-primary-500 via-tertiary-500 to-secondary-500;
  }
</style>
