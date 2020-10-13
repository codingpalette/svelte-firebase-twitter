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

    const onClearAttachment = () => attachment = "";

    const onSubmit = async () => {
        if (tweet === ''){
            return;
        }
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


<form on:submit|preventDefault={onSubmit} class="factoryForm">
    <div class="factoryInput__container">
        <input
            type="text"
            placeholder="무슨일이 있는지 적어주세요."
            maxlength="120"
            bind:value={tweet}
            class="factoryInput__input"
        />
        <input type="submit" value="&rarr;" class="factoryInput__arrow" />
    </div>
    <label for="attach-file" class="factoryInput__label">
        <span>Add photos</span>
        <i class="fas fa-plus"></i>
    </label>
    <input
        id="attach-file"
        type="file"
        accept="image/*"
        on:change={onFileChange}
        style="opacity: 0;"
    />
    {#if attachment}
        <div class="factoryForm__attachment">
            <img src={attachment} style="background-image: {attachment}" alt="" />
            <div class="factoryForm__clear" on:click={onClearAttachment}>
                <span>Remove</span>
                <i class="fas fa-times"></i>
            </div>
        </div>
    {/if}
</form>
