<script>
    import {dbService, storageService} from "../fbase";
    import {v4 as uuidv4} from "uuid";
    import { currentUser } from '../store/user';

    let tweet = '';
    let attachment = '';

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
