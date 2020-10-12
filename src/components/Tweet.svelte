<script>
    export let tweetObj;
    export let isOwner;
    import { authService, dbService } from '../fbase';

    let editing = false;
    let newTweet = tweetObj.text;

    const onDeleteClick = async () => {
        const ok = confirm("정말로 삭제하시겠습니까?")
        console.log(ok)
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    }

    const toggleEditing = () => editing = !editing;

    const onSubmit = async () => {
        console.log(tweetObj, newTweet)
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet
        });
        editing = false;
    }
</script>



<div>
    {#if editing}
        {#if isOwner}
            <form on:submit|preventDefault={onSubmit}>
                <input type="text" placeholder="새로운 텍스트" bind:value={newTweet} required />
                <input type="submit" value="update" />
            </form>
            <button on:click={toggleEditing}>Cancel</button>
        {/if}
    {:else}
        <h4>{tweetObj.text}</h4>
        {#if isOwner}
            <button on:click={onDeleteClick}>Delete Tweet</button>
            <button on:click={toggleEditing}>Edit Tweet</button>
        {/if}
    {/if}


</div>


