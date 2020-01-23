<template>
    <div>
        <h1>storeFruits Component</h1>
        <button @click="createQR()">Create QR Code</button>
        <img id="qrcode" src="" >
    </div>
</template>

<script>

    import {generateQRsrc} from "@/js/qrcode";

    export default {
        name: "storeFruits",
        data(){
            return{
                payload: {
                    fruitType: 'strawberry',
                    amount: 3,
                }
            }
        },
        methods: {
            createQR() {
                generateQRsrc('qrcode', JSON.stringify(this.payload));
            }
        }
    }
</script>

<style scoped>

</style>
