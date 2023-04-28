const choice = document.querySelectorAll(".choice");
const preview = document.querySelector(".order-preview");
const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");

const initialSentence = `Customize your plan with the <span class="custom">above</span> options then come back to review and confirm.`;

const summarySentence = `“I drink my coffee <span
id="using-as"></span> <span class="custom" id="how">. . . </span>, with a <span class="custom" 
id="type">. . . </span> type of bean. <span class="custom" id="quantity">. . . </span> 
<span id="capsule-variation">ground ala </span><span class="custom" id="grind">. . . 
</span>, sent to me <span class="custom" id="frequency">. . . </span>.”`;

const plan = {
    how: ["Capsule", "Filter", "Espresso"],
    type: ["Single origin", "Decaf", "Blended"],
    quantity: ["250g", "500g", "1000g"],
    grind: ["Wholebean", "Filter", "Cafetiére"],
    frequency: [
        "Every week",
        "Every 2 weeks",
        "Every month"
    ]
};

preview.children[1].innerHTML = initialSentence;

const sentenceModifier = function (option, value) {
    document.getElementById(option).textContent = value;
};

// OPTIONS selection
// how
const capsule = document.getElementById("capsule");
const filter = document.getElementById("filter");
const espresso = document.getElementById("espresso");

// type
const origin = document.getElementById("origin");
const decaf = document.getElementById("decaf");
const blended = document.getElementById("blended");

// quantity
const small = document.getElementById("250");
const medium = document.getElementById("500");
const large = document.getElementById("1000");

// grind
const wholebean = document.getElementById("wholebean");
const grindFilter = document.getElementById("grind-filter");
const cafetiere = document.getElementById("cafetiere");

// frequency
const weekly = document.getElementById("weekly");
const twoWeeks = document.getElementById("two-weeks");
const monthly = document.getElementById("monthly");

const clearFrequency = () => {
    [weekly, twoWeeks, monthly].forEach((frequency) => {
        frequency.classList.remove("answer--active");
    });
    deliveries = false;
};

// CHOICE OPENER
const qMap = document.querySelectorAll(".question-map");

// Bottom Button Logic
let preferences = false;
let bean = false;
let quantities = false;
let grinds = false;
let deliveries = false;
let capsuleCheck = false;

const checkPlan = function () {
    if (capsuleCheck && bean && quantities && deliveries) {
        document
            .getElementById("confirm")
            .classList.remove("disabled");
        document
            .getElementById("confirm")
            .addEventListener("click", getOrder);
    } else if (
        preferences &&
        bean &&
        quantities &&
        grinds &&
        deliveries
    ) {
        document
            .getElementById("confirm")
            .classList.remove("disabled");
        document
            .getElementById("confirm")
            .addEventListener("click", getOrder);
    } else {
        document
            .getElementById("confirm")
            .classList.add("disabled");
    }
};

const checkDelivery = () => {
    if (
        (capsuleCheck && bean && quantities) ||
        (preferences && bean && quantities && grinds)
    ) {
        if (
            choice[4].classList.contains("choice--disabled")
        ) {
            choice[4].classList.remove("choice--disabled");
        }
    }
};

// CHOICE OPENER
for (let i = 0; i < choice.length; i++) {
    choice[i].children[0].addEventListener("click", () => {
        choice[i].children[0].classList.toggle(
            "question--open"
        );

        choice[i].children[1].classList.toggle(
            "answers--open"
        );

        choice[i].scrollIntoView({
            behavior: "smooth"
        });

        if (
            preview.children[1].innerHTML ===
            initialSentence
        ) {
            preview.children[1].innerHTML = summarySentence;
        }
    });
    qMap[i].addEventListener("click", () => {
        qMap[i].classList.add("question-map--active");
        setTimeout(() => {
            qMap[i].classList.remove(
                "question-map--active"
            );
        }, 1500);
        choice[i].children[0].classList.add(
            "question--open"
        );
        choice[i].children[1].classList.add(
            "answers--open"
        );
        choice[i].scrollIntoView({
            behavior: "smooth"
        });
        if (
            preview.children[1].innerHTML ===
            initialSentence
        ) {
            preview.children[1].innerHTML = summarySentence;
        }
    });
}

// SHIPMENT PRICE UPDATER
let multiply = 0;
let finalPrice = 0;

const weeklyPrice = document.getElementById("weekly-price");
const biweeklyPrice = document.getElementById(
    "biweekly-price"
);
const monthlyPrice =
    document.getElementById("monthly-price");

small.addEventListener("click", () => {
    weeklyPrice.textContent = 7.2;
    biweeklyPrice.textContent = 9.6;
    monthlyPrice.textContent = 12.0;
});

medium.addEventListener("click", () => {
    weeklyPrice.textContent = 13.0;
    biweeklyPrice.textContent = 17.5;
    monthlyPrice.textContent = 22.0;
});

large.addEventListener("click", () => {
    weeklyPrice.textContent = 22.0;
    biweeklyPrice.textContent = 32.0;
    monthlyPrice.textContent = 42.0;
});

// PREVIEW MESSAGE BUILDER
// HOW
capsule.addEventListener("click", () => {
    preferences = false;
    capsuleCheck = true;
    checkDelivery();
    checkPlan();
    document.getElementById("using-as").textContent =
        "using";
    document.getElementById(
        "capsule-variation"
    ).textContent = "";
    document.getElementById("grind").textContent = "";
    sentenceModifier(`how`, plan.how[0]);
    filter.classList.remove("answer--active");
    espresso.classList.remove("answer--active");
    capsule.classList.add("answer--active");
    wholebean.classList.remove("answer--active");
    grindFilter.classList.remove("answer--active");
    cafetiere.classList.remove("answer--active");
    choice[3].classList.add("choice--disabled");
    choice[3].classList.add("question--disabled");
    choice[3].children[0].classList.remove(
        "question--open"
    );
    choice[3].children[1].classList.remove("answers--open");
    qMap[0].classList.add("question-map--checked");
    qMap[3].classList.add("question-map--disabled");
    qMap[3].classList.remove("question-map--checked");
    document.getElementById("using-as").textContent =
        "using";
});

filter.addEventListener("click", () => {
    if (capsuleCheck) {
        capsuleCheck = false;
    }
    preferences = true;
    checkDelivery();
    checkPlan();
    document.getElementById("using-as").textContent = "as";
    document.getElementById(
        "capsule-variation"
    ).textContent = "ground ala ";
    document.getElementById("grind").textContent = ". . . ";
    sentenceModifier(`how`, plan.how[1]);
    filter.classList.add("answer--active");
    espresso.classList.remove("answer--active");
    capsule.classList.remove("answer--active");
    choice[3].classList.remove("choice--disabled");
    choice[3].children[0].classList.remove(
        "question--disabled"
    );
    qMap[0].classList.add("question-map--checked");
    qMap[3].classList.remove("question-map--disabled");
});

espresso.addEventListener("click", () => {
    if (capsuleCheck) {
        capsuleCheck = false;
    }
    preferences = true;
    checkDelivery();
    checkPlan();
    document.getElementById("using-as").textContent = "as";
    document.getElementById(
        "capsule-variation"
    ).textContent = "ground ala ";
    document.getElementById("grind").textContent = ". . . ";
    sentenceModifier(`how`, plan.how[2]);
    espresso.classList.add("answer--active");
    filter.classList.remove("answer--active");
    capsule.classList.remove("answer--active");
    choice[3].classList.remove("choice--disabled");
    choice[3].children[0].classList.remove(
        "question--disabled"
    );
    choice[3].children[1].classList.remove("answers--open");
    qMap[0].classList.add("question-map--checked");
    qMap[3].classList.remove("question-map--disabled");
});

// TYPE
origin.addEventListener("click", () => {
    bean = true;
    checkDelivery();
    checkPlan();
    sentenceModifier("type", plan.type[0]);
    origin.classList.add("answer--active");
    decaf.classList.remove("answer--active");
    blended.classList.remove("answer--active");
    qMap[1].classList.add("question-map--checked");
});

decaf.addEventListener("click", () => {
    bean = true;
    checkDelivery();
    checkPlan();
    sentenceModifier("type", plan.type[1]);
    origin.classList.remove("answer--active");
    decaf.classList.add("answer--active");
    blended.classList.remove("answer--active");
    qMap[1].classList.add("question-map--checked");
});

blended.addEventListener("click", () => {
    bean = true;
    checkDelivery();
    checkPlan();
    sentenceModifier("type", plan.type[2]);
    origin.classList.remove("answer--active");
    decaf.classList.remove("answer--active");
    blended.classList.add("answer--active");
    qMap[1].classList.add("question-map--checked");
});

// QUANTITY
small.addEventListener("click", () => {
    quantities = true;
    clearFrequency();
    checkDelivery();
    checkPlan();
    sentenceModifier("quantity", plan.quantity[0]);
    small.classList.add("answer--active");
    medium.classList.remove("answer--active");
    large.classList.remove("answer--active");
    qMap[2].classList.add("question-map--checked");
});

medium.addEventListener("click", () => {
    quantities = true;
    clearFrequency();
    checkDelivery();
    checkPlan();
    sentenceModifier("quantity", plan.quantity[1]);
    small.classList.remove("answer--active");
    medium.classList.add("answer--active");
    large.classList.remove("answer--active");
    qMap[2].classList.add("question-map--checked");
});

large.addEventListener("click", () => {
    quantities = true;
    clearFrequency();
    checkDelivery();
    checkPlan();
    sentenceModifier("quantity", plan.quantity[2]);
    small.classList.remove("answer--active");
    medium.classList.remove("answer--active");
    large.classList.add("answer--active");
    qMap[2].classList.add("question-map--checked");
});

// GRIND?
wholebean.addEventListener("click", () => {
    grinds = true;
    checkDelivery();
    checkPlan();
    sentenceModifier("grind", plan.grind[0]);
    wholebean.classList.add("answer--active");
    grindFilter.classList.remove("answer--active");
    cafetiere.classList.remove("answer--active");
    qMap[3].classList.add("question-map--checked");
});

grindFilter.addEventListener("click", () => {
    grinds = true;
    checkDelivery();
    checkPlan();
    sentenceModifier("grind", plan.grind[1]);
    wholebean.classList.remove("answer--active");
    grindFilter.classList.add("answer--active");
    cafetiere.classList.remove("answer--active");
    qMap[3].classList.add("question-map--checked");
});

cafetiere.addEventListener("click", () => {
    grinds = true;
    checkDelivery();
    checkPlan();
    sentenceModifier("grind", plan.grind[2]);
    wholebean.classList.remove("answer--active");
    grindFilter.classList.remove("answer--active");
    cafetiere.classList.add("answer--active");
    qMap[3].classList.add("question-map--checked");
});

// FREQUENCY
weekly.addEventListener("click", () => {
    deliveries = true;
    checkPlan();
    sentenceModifier("frequency", plan.frequency[0]);
    weekly.classList.add("answer--active");
    twoWeeks.classList.remove("answer--active");
    monthly.classList.remove("answer--active");
    qMap[4].classList.add("question-map--checked");
    finalPrice = parseFloat(weeklyPrice.textContent);
    multiply = 4;
});

twoWeeks.addEventListener("click", () => {
    deliveries = true;
    checkPlan();
    sentenceModifier("frequency", plan.frequency[1]);
    weekly.classList.remove("answer--active");
    twoWeeks.classList.add("answer--active");
    monthly.classList.remove("answer--active");
    qMap[4].classList.add("question-map--checked");
    finalPrice = parseFloat(biweeklyPrice.textContent);
    multiply = 2;
});

monthly.addEventListener("click", () => {
    deliveries = true;
    checkPlan();
    sentenceModifier("frequency", plan.frequency[2]);
    weekly.classList.remove("answer--active");
    twoWeeks.classList.remove("answer--active");
    monthly.classList.add("answer--active");
    qMap[4].classList.add("question-map--checked");
    finalPrice = parseFloat(monthlyPrice.textContent);
    multiply = 1;
});

// CHECKOUT
const getOrder = () => {
    console.log(weeklyPrice.textContent);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.getElementById("modal-summary").innerHTML =
        preview.children[1].innerHTML;
    document.getElementById("checkout-price").textContent =
        finalPrice * multiply;
    overlay.addEventListener("click", () => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    });
    document
        .getElementById("checkout-btn")
        .addEventListener("click", () => {
            modal.classList.add("hidden");
            overlay.classList.add("hidden");
        });
};
