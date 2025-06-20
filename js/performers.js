const performers = [
  {
    time: "",
    name: "Відчиняємо двері",
    img: "img/start.jpg",
    desc: "18:30 Заходьте сміливо — місце вже чекає на ваш сміх!",
  },
  {
    time: " ",
    name: "PuzikOVa",
    img: "img/puzikova.jpg",
    desc: "Я не знаю, як так вийшло — прізвище випадково, і понеслося. Топлю за дівчат. Не зліть, а то втоплю.",
  },
  {
    time: " ",
    name: "Галіде",
    img: "img/halia.jpg",
    desc: "Гумор такий чорний та гострий, як твоє минуле. Жарти про циклічність життя. Родився, женився, помер.",
  },
  {
    time: " ",
    name: "Олександра Вороніна",
    img: "img/mafia.jpg",
    desc: "Міссіс Мафія - організую все від проблем до злочинності",
  },
  {
    time: " ",
    name: "Галя Шабаєва",
    img: "img/galia.jpg",
    desc: "З досвідом еміграції, адаптації, істерики й імпровізації. Тримаюсь, бо впасти ніколи.",
  },
  {
    time: " ",
    name: "Віта Рокита",
    img: "img/vika2.jpg",
    desc: "Життя - не жарти , але я спробую.",
  },
  {
    time: " ",
    name: "Марія Черкашина",
    img: "img/mar.jpg",
    desc: "Алергія на дурість — одразу покриваюся сарказмом. Гумор про наше, жіноче.",
  },
  {
    time: " ",
    name: "Tina не Latina.",
    img: "img/tiina.jpg",
    desc: "А хлопці теж мають 'ці дні'?",
  },
  {
    time: " ",
    name: "VRednaja!",
    img: "img/tania2.jpg",
    desc: "З норовом, тонким стоьбом і бронебойною внутрішньою силою.",
  },
  {
    time: "",
    name: "Кінець — але не прощання",
    img: "img/start.jpg",
    desc: "Роздача автографів, селфі й рецептів виживання після стендапу.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("ul[role='list']");
  if (!list) return;

  list.innerHTML = performers
    .map(
      (p) => `
        <li class="flex items-center gap-x-6 py-5 justify-center ">
      
          <div class="flex gap-x-4 items-center">
            <img
              class="size-16 flex-none rounded-full bg-gray-50"
              src="${p.img}"
              alt="Фото ${p.name}"
            />
            <div class="flex-auto max-w-60">
              <p class="text-xl font-oswald uppercase font-semibold text-[#ae241a] tracking-wide">${p.name}</p>
              <p class="mt-1 text-[#dadada] font-montserrat font-light max-w-xs">${p.desc}</p>
            </div>
          </div>
        </li>`
    )
    .join("");
});
