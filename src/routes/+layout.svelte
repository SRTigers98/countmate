<script lang="ts">
  import "../app.postcss";
  import { AppShell, AppBar, LightSwitch, initializeStores, Modal } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";
  import { GitHubIcon } from "$lib/icons";

  initializeStores();

  const title = "DeltaCount";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Modal />

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="{base}/">
          <strong class="text-xl uppercase">{title}</strong>
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <LightSwitch />
        <a
          class="btn btn-icon variant-ghost-surface"
          href="https://github.com/srtigers98/deltacount"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <div class="mb-10 h-full w-full flex justify-center items-center">
    <div class="w-4/5 space-y-10 text-center flex flex-col items-center">
      <slot />
    </div>
  </div>
</AppShell>
