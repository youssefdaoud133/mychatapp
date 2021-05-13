// IO هنا مجرد بنعمل نسخة من الكلاس
// OOP زي مانتا عارف في ال
// دي Realtime للي مسؤول عن العمليات بتاعة ال Socket.io بتخلينا نتوصل ب Library دي مجرد io
const socket = io()

// بتوعنا Forms والاتنين Inputs للأتنين  Select هنا مجرد بنعمل
//form ilgin
const nameForm = document.querySelector('#login')
const nameInput = nameForm.querySelector('input')
//


// اللي عايز يدخل  user الاسم بتاع ال  Server وبعدين نبعت لل submit يعمل user هنا مستنين ال
// هيبعت لكل الناس المتوصلين ماعدي انتا ان كذا دخل Server وال
nameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // emit عليها بنستخدم هنا اول واحده وهي Methods دي عندك اتنين Socket بص بقي هنا
  // argument بأسم معين في اول event ودي اللي بتخليك تبعت
  // اللي انتا عايز تبعتها data والتاني بتحط ال

  // socket.emit('Joined', nameInput.value)

  location.href = `/chattino.html?name=${nameInput.value}/`;

})

