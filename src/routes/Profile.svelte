<script>
    import { onMount } from 'svelte';
    import { authService, dbService } from '../fbase';
    import { push } from 'svelte-spa-router';
    import { currentUser } from '../store/user';

    const getMyTweets = async () => {
        const tweets = await dbService
            .collection('tweets')
            .where('creatorId', '==', $currentUser.uid)
            .orderBy('createAt', 'desc')
            .get();
        // console.log(tweets.docs.map((doc) => doc.data()));
    }

    onMount(() => {
        getMyTweets()
    });

    let newDisplayName = $currentUser.displayName;

    const onLogOutClick = () => {
        authService.signOut();
        push('/home')
    }

    const onSubmit = async () => {
        if ($currentUser.displayName !== newDisplayName) {
            await $currentUser.updateProfile({
                displayName: newDisplayName
            });
            const user = authService.currentUser;
            $currentUser = {
                displayName:user.displayName,
                uid:user.uid,
                updateProfile: (args) => user.updateProfile(args)
            }
        }
    }


</script>


<div class="container">
    <form on:submit|preventDefault={onSubmit} class="profileForm">
        <input
            type="text"
            placeholder="Display name"
            bind:value={newDisplayName}
            autoFocus
        />
        <input
            type="submit"
            value="Update Profile"
            class="formBtn"
            style="margin-top: 10px"
        />
    </form>
    <span class="formBtn cancelBtn logOut" on:click={onLogOutClick}>
        Log Out
    </span>
</div>

