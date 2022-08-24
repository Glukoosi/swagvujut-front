import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { createApp, reactive } from "https://unpkg.com/petite-vue@0.2.2/dist/petite-vue.es.js"
import axios from 'https://cdn.skypack.dev/axios';

const registered = reactive({
    capacity: 64,
    names: [],
    getRegistered() {
        axios.get("https://api.ilmo.io/api/registrations/names/xwagtest")
            .then(data => {
                this.names = data.data.reverse();

            })

        const socket = io("https://api.ilmo.io");

        socket.on("xwagtest", (msg) => {
            this.names.push(msg)
        });
    }
})

const formTimer = reactive({
    openTimestamp: new Date("2021-09-01T10:37:00.000Z"),
    closeTimestamp: new Date("2022-09-30T20:59:00.000Z"),
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
        tablewish: "",
        free: "",
        checkbox: "",
    },
    send() {
        axios.post("https://api.ilmo.io/api/registration/xwagtest", this.form)
        .then(() => {
            for (const item in this.form) {
                this.form[item] = '';
            }
        })
    },
    registered,
    formTimer
}).mount()
