<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { v4 as uuidv4 } from 'uuid';
    import { authService, dbService, storageService } from '../fbase';
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
    let attachment = '';

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
            // console.log(tweetArray)
        })
    });

    const onFileChange = (event) => {
        const { target: { files }} = event;
        const theFile = files[0];
        // console.log(theFile);
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget : { result } } = finishedEvent
            attachment = result;
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => attachment = null;

    const onSubmit = async () => {
        let attachmentUrl = ""
        if (attachment !== '') {
            const attachmentRef = storageService.ref().child(`${$currentUser.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const tweetObj = {
            text: tweet,
            createAt: Date.now(),
            creatorId: $currentUser.uid,
            attachmentUrl
        }

        await dbService.collection('tweets').add(tweetObj);
        tweet = '';
        attachment = null;

    }
</script>


<div>
    <form on:submit|preventDefault={onSubmit}>
        <input type="text" placeholder="무슨일이 있는지 적어주세요." maxlength="120" bind:value={tweet} />
        <input type="file" accept="image/*" on:change={onFileChange} />
        <input type="submit" value="Tweet" />
        {#if attachment}
            <div>
                <img src={attachment} width="50px" height="50px" />
                <button on:click={onClearAttachment}>Clear</button>
            </div>
        {/if}
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
