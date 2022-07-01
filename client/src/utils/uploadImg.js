import { storage, ref, uploadBytesResumable, getDownloadURL } from "../firebase";

export default function uploadImage(imageFile, location) {
    const storageRef = ref(storage, location);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object")
                        reject("User doesn't have permission to access the object")
                        break;
                    case 'storage/canceled':
                        console.log("User canceled the upload")
                        reject("User canceled the upload")
                        break;
                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect error.serverResponse")
                        reject("Unknown error occurred, inspect error.serverResponse")
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        )
    })
}