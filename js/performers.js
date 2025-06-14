const performers = [
  {
    time: "18:00",
    name: "Олександра Вороніна",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Жарти про материнство, сімейні стосунки та кар'єру.",
  },
  {
    time: "18:20",
    name: "Олександра Вороніна 2",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "І ще жарти — бо їх багато.",
  },
  {
    time: "18:00",
    name: "Олександра Вороніна",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Жарти про материнство, сімейні стосунки та кар'єру.",
  },
  {
    time: "18:20",
    name: "Олександра Вороніна 2",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "І ще жарти — бо їх багато.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("ul[role='list']");
  if (!list) return;

  list.innerHTML = performers
    .map(
      (p) => `
        <li class="flex items-center gap-x-6 py-5 justify-center ">
          <p class="text-[#dadada] shrink-0 text-right font-montserrat">${p.time}</p>
          <div class="flex gap-x-4 items-center">
            <img
              class="size-12 flex-none rounded-full bg-gray-50"
              src="${p.img}"
              alt="Фото ${p.name}"
            />
            <div class="flex-auto w-60">
              <p class="text-xl font-oswald uppercase font-semibold text-[#ae241a] tracking-wide">${p.name}</p>
              <p class="mt-1 text-[#dadada] font-montserrat font-light max-w-xs">${p.desc}</p>
            </div>
          </div>
        </li>`
    )
    .join("");
});
