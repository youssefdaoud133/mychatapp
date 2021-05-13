
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[/?&]?([^=]+)=([^/&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
function usernamebyurl() {
    let obuser = getQueryParams(document.location.search);
    return `${obuser.name}`;

}
console.log(usernamebyurl());
window.onload = function () {
    msgInput.value = "";
    socket.emit('Joined', usernamebyurl());
};










const msgForm = document.querySelector('#message')
const msgInput = msgForm.querySelector('input')
const socket = io()
let userjoin = document.querySelector('.userjoin');
let jointxt = document.querySelector('#jointxt');
let bodyy = document.body;
let msgsshow = document.querySelector(".msgsshow");

// window.onload = function () { msgInput.value = ""; };
// لما قلنا للسيرفر فوق ان حد دخل بقي
// عايزين لما السيرفر يبعتلهم ان حد دخل نعمل اي حاجة احنا عايزنها
// زي ان احنا نقول مثلا ان كذا دخل للناس التانيه

// Server ودي اللي بتخليك تستقبل اي حاجة هيبعتها ال on وهي socket علي method هنا استخدمنا تاني
// يبعت اي حاجة server وتعمل اي حاجة بقي كل ما ال

socket.on('UserJoined', (data) => {
    // هنا السيرفر هيبعت في الداتا دي اسم كذا دخل وتقدر هنا بقي
    // وتقول فيها للناس ان كذا دخل message تعمل
    console.log(data)
    // crjoin();
    let bodyy = document.getElementById("mybody");
    const crdivjoin = document.createElement("div");
    const crhtwo = document.createElement("h2");
    crdivjoin.classList.add("userjoin");
    crhtwo.setAttribute("id", "jointxt");
    bodyy.appendChild(crdivjoin);
    crdivjoin.appendChild(crhtwo);

    crhtwo.innerHTML = data;
    crdivjoin.setAttribute("id", "userjoin");

    setTimeout(() => {
        crdivjoin.remove();
    }, 8000);

})


// هنقول للسيرفر يبعت لكل الناس بما فيهم انتا الرسالة اللي اتبعتت submit هنا اول ما اليوزر يعمل
msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // هنا بنبعت للسيرفر ونقوله اسم الايفينت اللي عايزين نشغله والداتا اللي عايزين نبعتها
    socket.emit('message', msgInput.value)
    //
    const crdivshaml = document.createElement("div");
    crdivshaml.classList.add("meshaml");
    msgsshow.append(crdivshaml);
    //
    const crmeminishaml = document.createElement("div");
    crmeminishaml.classList.add("meminishaml");
    crdivshaml.append(crmeminishaml);
    //
    const crnamedate = document.createElement("div");
    crnamedate.classList.add("namedate");
    crmeminishaml.append(crnamedate);
    //name
    const menameus = document.createElement("div");
    menameus.classList.add("metxt", "menameus");
    crnamedate.append(menameus);
    menameus.innerHTML = "Me";
    //date
    const crmedatest = document.createElement("div");
    crmedatest.classList.add("metxt", "namedate");
    crnamedate.append(crmedatest);
    crmedatest.innerHTML = datetime();

    //
    const crmemessagevalue = document.createElement("div");
    crmemessagevalue.classList.add("memessagevalue");
    crmeminishaml.append(crmemessagevalue);
    crmemessagevalue.innerHTML = msgInput.value;
    //
    msgInput.value = "";







})

// يبعتلنا ان في رسالة اتبعتت ويقولنا اللي جوا الرسالة server هنا اول ما ال
socket.on('newMessage', (data) => {
    // وهنا تقدر تظهر في الفرونت كارد او رسالة اللي اتبعتت
    console.log(data);
    const crdivshaml = document.createElement("div");
    crdivshaml.classList.add("shaml");
    msgsshow.append(crdivshaml);
    //
    const crmeminishaml = document.createElement("div");
    crmeminishaml.classList.add("minishaml");
    crdivshaml.append(crmeminishaml);
    //
    const crnamedate = document.createElement("div");
    crnamedate.classList.add("namedate");
    crmeminishaml.append(crnamedate);
    //name
    const menameus = document.createElement("div");
    menameus.classList.add("nameus");
    crnamedate.append(menameus);
    menameus.innerHTML = data.sender;
    //date
    const crmedatest = document.createElement("div");
    crmedatest.classList.add("namedate");
    crnamedate.append(crmedatest);
    crmedatest.innerHTML = datetime();

    //
    const crmemessagevalue = document.createElement("div");
    crmemessagevalue.classList.add("messagevalue");
    crmeminishaml.append(crmemessagevalue);
    crmemessagevalue.innerHTML = data.msg;
})

// دلوقتي Connected Users بتجيبلك كل ال function ودي
// عشان لو كنت عايز تظهرهم او كده علي الجنب
// تقدر بقي تشغلها في اي وقت وتجيب اليوزرز اللي موجودين دلوقتي

const getAllConnectedUsers = async () => {
    const parsed = await fetch('/users')
    const data = await parsed.json()
    const obj = data.users;

    obj.forEach((each) => {
        console.log(each.name)
        const leftcon = document.querySelector(".leftcont");
        const crdivonl = document.createElement("div");
        crdivonl.innerHTML = `${each.name} is online`;
        crdivonl.classList.add("useronline");
        leftcon.append(crdivonl);
    });


    // return data.users

};


// getAllConnectedUsers();
const on = document.querySelector(".on");
const off = document.querySelector(".off");

on.onclick = () => {
    on.classList.add("offf");
    off.classList.add("onn");

    console.log("hello world");






    getAllConnectedUsers();

}
off.onclick = () => {
    on.classList.remove("offf");
    off.classList.remove("onn");
    let leftcont = document.querySelector(".leftcont");
    if (leftcont.childNodes.length > 3) {
        let i;
        for (i = 0; i < leftcont.childNodes.length - 1; i++) {
            let del = document.querySelector(".useronline");
            del.remove();
        }

    } else {
        del.remove();
    }








}



























function datetime() {
    const currenttime = new Date();
    // const time = currenttime.getDate();
    if (currenttime.getHours() > 12) {
        return `${currenttime.getHours()}:${currenttime.getMinutes()}PM`;
    } else {
        return `${currenttime.getHours()}:${currenttime.getMinutes()}AM`;
    }

}
// datetime();
// console.log(datetime());


const shroot = document.querySelector(".shroot");
shroot.onclick = () => {
    console.log("hello world");
    const shrttwo = document.querySelector(".shrttwo");
    const shrtone = document.querySelector(".shrtone");
    const shrtthree = document.querySelector(".shrtthree");
    const leftcont = document.querySelector(".leftcont");
    const rightcont = document.querySelector(".rightcont");
    const ex = document.querySelector(".ex");
    leftcont.classList.add("morewidth");
    rightcont.classList.add("lesswidth");
    ex.classList.add("fgaa");

    getAllConnectedUsers();
}
const ex = document.querySelector(".ex");
ex.onclick = () => {
    console.log("hello world");

    let leftcont = document.querySelector(".leftcont");
    const rightcont = document.querySelector(".rightcont");
    const ex = document.querySelector(".ex");
    leftcont.classList.remove("morewidth");
    rightcont.classList.remove("lesswidth");
    ex.classList.remove("fgaa");
    if (leftcont.childNodes.length > 1) {
        let i;
        for (i = 0; i < leftcont.childNodes.length - 1; i++) {
            let del = document.querySelector(".useronline");
            del.remove();
        }

    } else {
        del.remove();
    }


    console.log(leftcont.childNodes);



}