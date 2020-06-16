<template>
    <div>
        <h1>Einlagern</h1>

        <div :class="{'hidden': currentStep===-1 || currentStep ===6}">
            <md-button @click="goBack" class="md-button" id="return">
                <md-icon>arrow_back_ios</md-icon>
            </md-button>
        </div>

        <div :class="{'hidden': currentStep===6 || saved===false}">
            <md-button @click="goForward" class="md-button" id="next">
                <md-icon>arrow_forward_ios</md-icon>
            </md-button>
        </div>

        <div :class="{'hidden': currentStep!==-1}" style="padding-top: 15%">
            <p>Bitte legen Sie die Ware auf die Waage und klicken Sie danach auf weiter!</p>
        </div>

        <div :class="{'hidden': currentStep!==0}" id="fruitTypes">
            <prediction-component ref="predictionComponent"></prediction-component>
            <div @click="setFruitType(fruitType)"
                 class="fruitTypeDiv card"
                 v-bind:key="fruitType"
                 v-for="fruitType in fruitTypes">
                <md-card>
                    <md-card-media-cover :class="{'chosenClass': payload.fruitType === fruitType}" md-solid>
                        <md-card-media md-ratio="1:1">
                            <img v-bind:src="'/img/' + fruitType + '.jpg'">
                        </md-card-media>
                        <md-card-area>
                            <md-card-header>
                                <span class="md-title">{{fruitType}}</span>
                            </md-card-header>
                        </md-card-area>
                    </md-card-media-cover>
                </md-card>

            </div>
        </div>

        <div :class="{'hidden': currentStep!==1}" id="amountTypes">
            <div @click="setAmount(amount)"
                 class="fruitTypeDiv card"
                 v-bind:key="amount"
                 v-for="amount in amounts">
                <md-card>
                    <md-card-media-cover :class="{'chosenClass': payload.amount === amount}" md-solid>
                        <md-card-media md-ratio="1:1">
                            <img src="/img/weight.png">
                        </md-card-media>
                        <md-card-area md-ratio="1:1">
                            <md-card-header>
                                <span class="md-title">{{amount}}</span>
                            </md-card-header>
                        </md-card-area>
                    </md-card-media-cover>
                </md-card>
            </div>
        </div>

        <div :class="{'hidden': currentStep!==2}" id="comment">
            <h3>Zusatzinformationen:</h3>
            <md-field>
                <md-textarea cols="60"
                             placeholder="Hier können Zusatzinformationen eingegeben werden.."
                             rows="10"
                             v-model="payload.comments"></md-textarea>
            </md-field>
        </div>

        <div :class="{'hidden': currentStep!==3}" id="overview">
            <h2>Überblick</h2>
            <div class="amountTypeDiv card"
                 v-bind:key="value"
                 v-for="(value, key) in payload">
                <p>{{key}}: {{ value }}</p>
            </div>
            <br>
            <md-button @click="saveFirestore()" class="md-raised md-primary">SPEICHERN</md-button>
        </div>

        <div :class="{'hidden': currentStep!==4}">
            <img id="qrcode" src="">
            <br>
            <md-button @click="printQR()" class="md-raised md-primary">Drucken</md-button>
        </div>

        <div :class="{'hidden': currentStep!==5}">
            <h2>Lagervorschlag</h2>
            <p>{{this.storageRecommendation}}</p>

            <div id="fridges">
                <div v-bind:key="fridge.name"
                     v-for="fridge in fridges"
                     class="fridges">
                    <table>
                        <th>{{fridge.name}}</th>
                        <tr v-bind:key="tray.name"
                            v-for="tray in fridge.trays">
                            <td :class="{'recommendedStorage': tray.name === storageRecommendation}">{{tray.name}}</td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>

        <div :class="{'hidden': currentStep!==6}">
            <md-button @click="reloadPage()" class="md-raised md-primary">Neustart</md-button>
        </div>

    </div>
</template>

<script>

    import {generateQRsrc} from "@/js/qrcode";
    import {mapGetters, mapActions} from 'vuex';
    import PredictionComponent from "@/components/predictionComponent";

    export default {
        name: "storeFruits",
        components: {PredictionComponent},
        data() {
            return {
                payload: {
                    fruitType: undefined,
                    amount: 5,
                    storageDate: this.getDate(),
                    comments: undefined,
                },
                currentStep: -1,
                saved: true,
                storageRecommendation: '',
            }
        },
        computed: {
            ...mapGetters([
                'fruitTypes',
                'amounts',
                'lastId',
                'fridges',
            ]),
        },
        methods: {
            ...mapActions([
                'saveToFirestore',
                'getFirestoreDocument',
            ]),
            createQR() {
                generateQRsrc('qrcode', JSON.stringify(this.payload));
            },
            printQR() {
                function ImagetoPrint(source) {
                    return "<html><head><scri" + "pt>function step1(){\n" +
                        "setTimeout('step2()', 10);}\n" +
                        "function step2(){window.print();window.close()}\n" +
                        "</scri" + "pt></head><body onload='step1()'>\n" +
                        document.getElementById(source).outerHTML + "</body></html>";
                }

                function PrintImage(source) {
                    const Pagelink = "about:blank";
                    const pwa = window.open(Pagelink, "_new");
                    pwa.document.open();
                    pwa.document.write(ImagetoPrint(source));
                    pwa.document.close();
                }

                PrintImage('qrcode');
            },
            reloadPage() {
                this.$router.go();
            },
            saveFirestore() {
                this.saveToFirestore(this.payload);
                this.$refs.predictionComponent.showLoader();
                this.saved = true;
            },
            getDate() {
                let date = new Date;
                return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            },
            setAmount(chosenAmount) {
                this.payload.amount = chosenAmount;
            },
            calculateRecommendation(amount) {
                let bestPlace = {};
                for (let i= 0; i < this.fridges.length; i++){
                    let fridge = this.fridges[i];
                    let trayFree = [];
                    for (let j= 0; j < fridge.trays.length; j++){
                        let currentTray = fridge.trays[j].free;
                        if (currentTray >= amount){
                            trayFree.push(currentTray)
                        }
                    }
                    let min = Math.min(...trayFree);
                    let tray = fridge.trays.find( ({ free }) => free === min );
                    bestPlace[tray.name] = min;
                }
                let arr = Object.values(bestPlace);
                let min = Math.min(...arr);

                this.storageRecommendation = Object.keys(bestPlace).find(key => bestPlace[key] === min);
            },
            setFruitType(chosenFruitType) {
                // eslint-disable-next-line no-console
                console.log(chosenFruitType)
                this.payload.fruitType = chosenFruitType;
            },
            goBack() {
                if (this.currentStep > -1) {
                    this.currentStep -= 1;
                }
            },
            goForward() {
                if (this.currentStep < 6) {
                    if (this.currentStep === -1) {
                        this.$refs.predictionComponent.init();
                        this.$refs.predictionComponent.showLoader();
                    }
                    if (this.currentStep === 2) {
                        this.payload.storageDate = this.getDate();
                        this.saved = false;
                    }
                    if (this.currentStep === 3) {
                        this.getFirestoreDocument();
                    }
                    if (this.currentStep === 4) {
                        this.calculateRecommendation(this.payload.amount);
                    }
                    this.currentStep += 1;
                }
            },
        }
    }
</script>

<style scoped>

</style>
