<script lang="ts">
	import { onMount } from 'svelte';

	let roleStatus = $state('Waiting for Twitch…');

	onMount(() => {
		const twitch = window.Twitch?.ext;
		if (!twitch) {
			roleStatus = 'Twitch Extension Helper is unavailable';
			return;
		}

		const updateRole = () => {
			const role = twitch.viewer.role;
			const label = role
				? role.charAt(0).toUpperCase() + role.slice(1)
				: 'Unavailable';

			roleStatus = `Visible as: ${label}`;
		};

		twitch.onAuthorized(() => {
			updateRole();
		});
		updateRole();
	});
</script>

<svelte:head>
	<title>FriedEggGames</title>
	<link rel="stylesheet" href="/panel.css" />
</svelte:head>

<main class="card">
	<div class="egg" aria-hidden="true">🍳</div>
	<p class="eyebrow">CHANNEL EXTENSION TEST</p>
	<h1>FriedEggGames</h1>
	<p class="message">This panel is shared with everyone watching this channel.</p>
	<p class="role" role="status" aria-live="polite">{roleStatus}</p>
</main>
