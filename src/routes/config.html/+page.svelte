<svelte:head>
	<title>Configure FriedEggGames</title>
	<link rel="stylesheet" href="/panel.css" />
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';

	let helperReady = $state(false);
	let statusMessage = $state('Connecting to Twitch…');

	onMount(() => {
		const twitch = window.Twitch?.ext;
		if (!twitch) {
			statusMessage = 'Twitch Extension Helper is unavailable.';
			return;
		}

		twitch.onAuthorized(() => {
			helperReady = true;
			statusMessage = 'Ready to save the broadcaster setup.';
		});

		twitch.onError((error) => {
			console.error('Twitch Extension Helper error:', error);
			helperReady = false;
			statusMessage = 'Twitch could not authorize this setup page. Reload and try again.';
		});
	});

	function completeSetup() {
		const configuration = window.Twitch?.ext.configuration;

		if (!helperReady || !configuration) {
			statusMessage = 'Twitch is not ready yet. Reload this page and try again.';
			return;
		}

		configuration.set('broadcaster', '1', JSON.stringify({ enabled: true }));
		statusMessage = 'Setup saved. Close this page and enable the extension in Extension Manager.';
	}
</script>

<main class="card">
	<div class="egg" aria-hidden="true">🍳</div>
	<p class="eyebrow">BROADCASTER SETUP</p>
	<h1>Set up FriedEggGames</h1>
	<p class="message">
		This test extension has no options. Save its empty broadcaster configuration to finish setup.
	</p>
	<button class="setup-button" onclick={completeSetup} disabled={!helperReady}>
		Save and finish setup
	</button>
	<p class="role" role="status" aria-live="polite">{statusMessage}</p>
</main>
