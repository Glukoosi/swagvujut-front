import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { createApp, reactive } from "https://unpkg.com/petite-vue@0.2.2/dist/petite-vue.es.js"
import axios from 'https://cdn.skypack.dev/axios';

const capacity = 64;
const slug = "xwag";

const openTimestamp = new Date("2021-09-01T10:37:00.000Z");
const closeTimestamp = new Date("2022-09-30T20:59:00.000Z");

const registered = reactive({
    capacity: capacity,
    entries: [],
    getRegistered() {
        axios.get(`https://api.ilmo.io/api/registrations/names/${slug}`)
            .then(result => {
                this.entries = result.data.reverse();
            })

        const socket = io("https://api.ilmo.io");

        socket.on(slug, (msg) => {
            this.entries.push(msg);
        });
    }
})

const formTimer = reactive({
    openTimestamp: openTimestamp,
    closeTimestamp: closeTimestamp,
    timestamp: new Date(),
    timer() {
        setInterval(() => {
            this.timestamp = new Date()
        }, 1000);
    }
})

formTimer.timer()
registered.getRegistered()

createApp({
    form: {
        name: "",
        email: "",
        group: "",
        greeting: "",
        food: "",
        alcohol: "",
        bottle: "",
        history: "",
        tablewish: "",
        free: "",
        checkbox: "",
    },
    errorMessages: [],
    send() {
        axios.post(`https://api.ilmo.io/api/registration/${slug}`, this.form)
            .then(() => {
                this.errorMessages = []
                for (const item in this.form) {
                    this.form[item] = '';
                }
            })
            .catch(error => {
                const response = JSON.parse(error.request.response)
                this.errorMessages.push(response.error);
            });
    },
    registered,
    formTimer
}).mount()



document.getElementById("numberlayer").style.backgroundPosition = (Math.floor(Math.random() * 3000)) + "px " +  (Math.floor(Math.random() * 3000)) + "px";
