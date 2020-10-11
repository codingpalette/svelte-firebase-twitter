<script>
    export let tweetObj;
    export let isOwner;
</script>



<div>
    <h4>{tweetObj.text}</h4>
    {#if isOwner}
        <button>Delete Tweet</button>
        <button>Edit Tweet</button>
    {/if}

</div>


