<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { authService, dbService } from '../fbase';
    import { currentUser } from '../store/user';
    import Tweet from '../components/Tweet.svelte';

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
        // getTweets(); // 옛날 방식
        dbService.collection('tweets').onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            tweets = tweetArray;
            console.log(tweetArray)
        })
    })

    const onSubmit = async () => {
        await dbService.collection('tweets').add({
            text: tweet,
            createAt: Date.now(),
            creatorId: $currentUser.uid,
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
            <Tweet
                tweetObj={data}
                isOwner={data.creatorId === $currentUser.uid}
            />
        {/each}
    </div>
</div>
