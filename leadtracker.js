import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js"
import { getDatabase, 
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://lead-acquisition-app-default-rtdb.firebaseio.com/" // Worked because it was hardcoded directly and which is not the right way to go about it.
}

// console.log(databaseURL)

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("del-btn")
const ulEl = document.getElementById("ul-el")

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        listItems += `
                        <li>
                            <a href = '${leads[i]}' target = '_blank'> 
                                ${leads[i]} 
                            </a>
                        </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshop) {
    const snapshotExit = snapshop.exists()
    if(snapshotExit) {
        const snapshopValue = snapshop.val()
        const leads = Object.values(snapshopValue)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})
