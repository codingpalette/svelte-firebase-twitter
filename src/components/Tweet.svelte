<script>
    export let tweetObj;
    export let isOwner;
    import { authService, dbService, storageService } from '../fbase';

    let editing = false;
    let newTweet = tweetObj.text;

    const onDeleteClick = async () => {
        const ok = confirm("정말로 삭제하시겠습니까?")
        // console.log(ok)
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => editing = !editing;

    const onSubmit = async () => {
        // console.log(tweetObj, newTweet)
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet
        });
        editing = false;
    }
</script>



<div class="nweet">
    {#if editing}
        {#if isOwner}
            <form on:submit|preventDefault={onSubmit} class="container nweetEdit">
                <input type="text" placeholder="새로운 텍스트" autoFocus bind:value={newTweet} required class="formInput" />
                <input type="submit" value="update" class="formBtn" />
            </form>
            <button on:click={toggleEditing} class="formBtn cancelBtn">Cancel</button>
        {/if}
    {:else}
        <h4>{tweetObj.text}</h4>
        {#if tweetObj.attachmentUrl}
            <img src={tweetObj.attachmentUrl} alt="" />
        {/if}
        {#if isOwner}
            <div class="nweet__actions">
                <span on:click={onDeleteClick}>
                    <i class="fas fa-trash"></i>
                </span>
                <span on:click={toggleEditing}>
                    <i class="fas fa-pencil-alt"></i>
                </span>
            </div>
        {/if}
    {/if}


</div>


