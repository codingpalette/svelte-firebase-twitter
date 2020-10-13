<script>
    import {onMount} from 'svelte';
    import {push} from 'svelte-spa-router';
    import {authService, dbService} from '../fbase';
    import {currentUser} from '../store/user';
    import Tweet from '../components/Tweet.svelte';
    import TweetFactory from "../components/TweetFactory.svelte";

    onMount(() => {
        authService.onAuthStateChanged(user => {
            // console.log(user)
            if (!user) {
                push('/auth')
            }
        })
    });


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
        // console.log(tweets)
    }

    onMount(() => {
        // getTweets(); // 옛날 방식
        dbService.collection('tweets').onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            tweets = tweetArray;
            // console.log(tweetArray)
        })
    });


</script>


<div class="container">
    <TweetFactory />
    <div style="margin-top: 30px">
        {#each tweets as data}
            <Tweet
                tweetObj={data}
                isOwner={data.creatorId === $currentUser.uid}
            />
        {/each}
    </div>
</div>
