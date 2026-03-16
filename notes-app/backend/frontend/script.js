const API = "http://localhost:5000/notes"

const input = document.getElementById("noteInput")
const list = document.getElementById("notesList")
const toggle = document.getElementById("themeToggle")

/* =========================
   GET NOTES FROM BACKEND
========================= */

async function getNotes(){

try{

const res = await fetch(API)

const notes = await res.json()

list.innerHTML = ""

notes.forEach(note => {

const li = document.createElement("li")

li.innerHTML = `
<span>${note.text}</span>
<button onclick="deleteNote(${note.id})">Delete</button>
`

list.appendChild(li)

})

}catch(error){

console.log("Error fetching notes",error)

}

}

/* =========================
   ADD NOTE
========================= */

async function addNote(){

const text = input.value.trim()

if(text === ""){

alert("Please write a note")

return

}

try{

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
text:text
})
})

input.value=""

getNotes()

}catch(error){

console.log("Error adding note",error)

}

}

/* =========================
   DELETE NOTE
========================= */

async function deleteNote(id){

try{

await fetch(`${API}/${id}`,{
method:"DELETE"
})

getNotes()

}catch(error){

console.log("Error deleting note",error)

}

}

/* =========================
   DARK MODE TOGGLE
========================= */

toggle.addEventListener("click",()=>{

document.body.classList.toggle("dark")

if(document.body.classList.contains("dark")){

toggle.innerText="☀️"

}else{

toggle.innerText="🌙"

}

})

/* =========================
   LOAD NOTES
========================= */

getNotes()