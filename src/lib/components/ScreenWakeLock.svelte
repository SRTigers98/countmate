<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  // eslint-disable-next-line no-undef
  let wakeLock: WakeLockSentinel | undefined;

  async function requestWakeLock() {
    wakeLock = await navigator.wakeLock.request("screen");
    console.info("Screen Wake Lock active!");
  }

  async function releaseWakeLock() {
    if (!wakeLock) {
      return;
    }

    await wakeLock.release();
    console.info("Screen Wake Lock released!");
    wakeLock = undefined;
  }

  onMount(() => {
    if ("wakeLock" in navigator) {
      if (!document.hidden) {
        requestWakeLock();
      }

      document.addEventListener("visibilitychange", async () => {
        if (document.hidden && !!wakeLock) {
          await releaseWakeLock();
        } else {
          await requestWakeLock();
        }
      });
    } else {
      console.info("Screen Wake Lock API not supported!");
    }
  });

  onDestroy(async () => {
    await releaseWakeLock();
  });
</script>
