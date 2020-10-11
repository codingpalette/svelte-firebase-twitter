<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import {authService, dbService} from '../fbase';

    onMount(() => {
        authService.onAuthStateChanged(user => {
            if(!user) {
                push('/auth')
            }
        })
    });

    let tweet = '';
    let tweets = [];

    const getTweets = async () => {
        const dbTweets = await dbService.collection('tweets').get();
        dbTweets.forEach((document) => {
            const tweetObject = {
                ...document.data(),
                id: document.id
            }
            tweets = [tweetObject, ...tweets]
        })
        console.log(tweets)
    }

    onMount(() => {
        getTweets();

    })

    const onSubmit = async () => {
        await dbService.collection('tweets').add({
            tweet: tweet,
            createAt: Date.now(),
        });
        tweet = '';
    }
</script>


<div>
    <form on:submit|preventDefault={onSubmit}>
        <input type="text" placeholder="무슨일이 있는지 적어주세요." maxlength="120" bind:value={tweet} />
        <input type="submit" value="Tweet">
    </form>
    <div>
        {#each tweets as data}
            <div>
                <h4>{data.tweet}</h4>
            </div>
        {/each}
    </div>
</div>
