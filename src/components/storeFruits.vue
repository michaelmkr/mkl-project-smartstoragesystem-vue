<template>
    <div>
        <button @click="createQR">Create QR Code</button>
        <h1>Einlagern</h1>

        <div @click="goBack" id="return"><i class="material-icons">chevron_left</i></div>
        <div @click="goForward" id="next"><i class="material-icons">chevron_right</i></div>

        <div :class="{'hidden': currentStep!==0}" id="fruitTypes">
            <div @click="setFruitType(fruitType)"
                 class="fruitTypeDiv card"
                 v-bind:key="fruitType"
                 v-for="fruitType in fruitTypes">
                <div class="fruitTypePicture">
                    <img v-bind:src="'/img/' + fruitType + '.jpg'">
                </div>
                <div class="fruitTypeName">{{fruitType}}</div>
            </div>
        </div>

        <div :class="{'hidden': currentStep!==1}" id="amountTypes">
            <div @click="setAmount(amount)"
                 class="amountTypeDiv card"
                 v-bind:key="amount"
                 v-for="amount in amounts">
                <p>{{amount}}</p>
            </div>
        </div>

        <div :class="{'hidden': currentStep!==2}" id="comment">
            <h3>Zusatzinformationen:</h3>
            <label><textarea
                    cols="60"
                    placeholder="Hier können Zusatzinformationen eingegeben werden.."
                    rows="10"
                    v-model="payload.comments"/> </label><br>
        </div>

        <div :class="{'hidden': currentStep!==3}" id="overview">
            <div class="amountTypeDiv card"
                 v-bind:key="value"
                 v-for="value in payload">
                <p>{{ value }}</p>
            </div>
        </div>

        <img :class="{'hidden': currentStep!==4}" id="qrcode" src="">

    </div>
</template>

<script>

    import {generateQRsrc} from "@/js/qrcode";

    export default {
        name: "storeFruits",
        data() {
            return {
                isA: true,
                isB: false,
                payload: {
                    fruitType: undefined,
                    amount: undefined,
                    storageDate: this.getDate(),
                    comments: undefined,
                },
                fruitTypes: [
                    'Erdbeeren',
                    'Marillen',
                    'Zwetschken'
                ],
                amounts: [
                    3,
                    5,
                    10
                ],
                currentStep: 0,
            }
        },
        methods: {
            createQR() {
                generateQRsrc('qrcode', JSON.stringify(this.payload));
            },
            getDate() {
                let date = new Date;
                return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            },
            setAmount(chosenAmount) {
                this.payload.amount = chosenAmount;
            },
            setFruitType(chosenFruitType) {
                this.payload.fruitType = chosenFruitType;
            },
            goBack() {
                if (this.currentStep > 0) {
                    this.currentStep -= 1;
                }
            },
            goForward() {
                if (this.currentStep < 4) {
                    if (this.currentStep === 2) {
                        this.payload.storageDate = this.getDate();
                    }
                    if (this.currentStep === 3) {
                        generateQRsrc('qrcode', JSON.stringify(this.payload));
                    }
                    this.currentStep += 1;
                }
            },
        }
    }
</script>

<style scoped>

</style>
