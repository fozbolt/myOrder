<!-- source: https://github.com/lian-yue/vue-upload-component/blob/master/docs/views/examples/Avatar.vue -->
<template>  
    <div class="example-avatar">
        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
            <h3>Drop files to upload</h3>
        </div>
        <div class="avatar-upload"  v-show="!edit">
            <div class="text-center p-2">
                <label for="avatar">
                    <img v-if="!info" :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                    <img v-else :src="info.url ? info.url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                </label>
            </div>
            <div class="text-center p-2">
                <file-upload
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    name="avatar"
                    class="btn btn-primary"
                    post-action="/upload/post"
                    :drop="!edit"
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    ref="upload"
                    >
                    Upload avatar
                </file-upload>
            </div>
        </div>
    </div>
</template>

<script>
import FileUpload from 'vue-upload-component';

export default {
    components: {FileUpload},
    props: ['info', 'isModalOpened'],

    data() {
        return {
            files: [],
            edit: false,
        }
    },
    watch: {
        async edit(value) {
            if(this.edit) {
                if (this.info) this.info.url =  this.files[0].url //replace existing image projection with new during update
                this.$emit('blob', await this.getImageBlob()); //w/o $parent it sends to parent component, with it sends to grandparent

                this.edit = false //close avatar upload when image is successfully uploaded
            }
        },

        isModalOpened: {
            // erase img when modal is closed
            // immediate: true, 
            handler (val, oldVal) {
                if (val === false) this.files = []
            }
        }
    },
    methods: {
        async getImageBlob(){
            return await fetch(this.files[0].url).then(r => r.blob());
        },

        alert(message) {
            alert(message)
        },

        inputFile(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                this.$nextTick(function () {
                    this.edit = true
                })
            }
            if (!newFile && oldFile) {
                this.edit = false
            }
        },

        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    this.alert('Your choice is not a picture')
                    return prevent()
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file)
                }
            }
        },

    },

    
}
</script>

<style>
.example-avatar .avatar-upload .rounded-circle {
    width: 200px;
    height: 200px;
}
.example-avatar .text-center .btn {
    margin: 0 .5rem
}
.example-avatar .avatar-edit-image {
    max-width: 100%
}
.example-avatar .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;
}
.example-avatar .drop-active h3 {
    margin: -.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
}

.file-uploads{
    top: -40px;
}
</style>


