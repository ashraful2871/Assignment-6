const loadAllPets = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  const pets = data.pets;
  displayPets(pets);
  document.getElementById("spinner").classList.add("hidden");
};

// load all pets sort
const loadSort = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  const pets = data.pets;
  shortDescendingPrice(pets);
};

// sort pets by descending order based on price
const shortDescendingPrice = (pets) => {
  document.getElementById("pets-container").classList.add("hidden");
  document.getElementById("like-pets-container").classList.add("hidden");
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(() => {
    const sortPetsByPrice = pets.sort((a, b) => b.price - a.price);
    displayPets(sortPetsByPrice);
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("like-pets-container").classList.remove("hidden");
    document.getElementById("pets-container").classList.remove("hidden");
  }, 2000);
};

//loading spinner
const loadingSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");

  setTimeout(function () {
    loadAllPets();
  }, 2000);
};
loadingSpinner();

// load categories pets btn
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};

// load category pets
const loadCategoriesPets = async (category, id) => {
  document.getElementById("pets-container").classList.add("hidden");
  document.getElementById("like-pets-container").classList.add("hidden");
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(async () => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    const activeBtn = document.getElementById(`btn-${id}`);
    removeClassBtn();
    activeBtn.classList.add("active");
    displayPets(data.data);
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("like-pets-container").classList.remove("hidden");
    document.getElementById("pets-container").classList.remove("hidden");
  }, 2000);
};

// display all pets
const displayPets = (pets) => {
  const petsContainerEl = document.getElementById("pets-container");
  const likePostContainerEl = document.getElementById("like-pets-container");
  petsContainerEl.innerHTML = "";
  if (pets.length == 0) {
    petsContainerEl.classList.remove("grid");
    petsContainerEl.classList.remove("border-2");
    petsContainerEl.innerHTML = `
<div class="card bg-base-100 shadow-xl">
    <figure>
        <img src="images/error.webp" alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="font-bold text-4xl text-center mb-4">
            No Information Available

        </h2>
        <p class="text-center font-normal text-base ">It is a long established fact that a reader will be distracted by
            the readable content of
            a page when looking
            at<br>
            its layout. The point of using Lorem Ipsum is that it has a.</p>

    </div>
</div>

`;
  } else {
    petsContainerEl.classList.add("grid");
    petsContainerEl.classList.add("border-2");
    likePostContainerEl.classList.remove("hidden");
  }
  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
    
                         <div class="card bg-base-100 p-5 w-auto border">
                            <figure class="h-52">
                                <img class="h-full w-full object-cover" src=${
                                  pet.image
                                }
                                    alt="pets" />
                            </figure>
                            <div class="card-body mb-2 relative">
                                <h2 class="card-title font-bold text-xl">
                                    ${pet.pet_name}
                                </h2>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (4).png" alt="">
                                    </div>
                                    <div>
                                        <p>Breed: ${
                                          pet?.breed || "Not Available"
                                        }</p>
                                    </div>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (1).png" alt="">
                                    </div>
                                    <div>
                                        <p>Birth: ${
                                          pet?.date_of_birth || "Not Available"
                                        }</p>
                                    </div>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (2).png" alt="">
                                    </div>
                                    <div>
                                        <p>Gender: ${
                                          pet?.gender || "Not Available"
                                        }</p>
                                    </div>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (3).png" alt="">
                                    </div>
                                    <div>
                                        <p>Price: $${
                                          pet?.price || "Out Of Stock"
                                        }</p>
                                    </div>
                                </div>
                                <hr class="mt-4 border-2 mb-5">
                                <div class="flex gap-5 mt-4 absolute top-[80%] right-[0px] ">
                                    <div class=" px-4 text-xl">
                                        <button class="btn badge-outline px-7 text-[#0E7A81] 
                                            text-xl hover:bg-[#0E7A81] hover:text-white" onclick="likePost('${
                                              pet.image
                                            }')">

                                           <i class="fa-solid fa-thumbs-up"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <button onclick="showCountDown('${
                                          pet.petId
                                        }')"
                                        id="adopt-btn-${pet.petId}"
                                            class="btn  badge-outline px-4 text-[#0E7A81] 
                                            text-xl hover:bg-[#0E7A81] hover:text-white">
                                            Adopt
                                        </button>
                                    </div>
                                    <div>
                                    
                                        <button 
                                        onclick="showModalD('${pet.petId}')"
                                            class="btn  badge-outline  px-4 text-[#0E7A81] 
                                            text-xl hover:bg-[#0E7A81] hover:text-white">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    
    
    `;
    petsContainerEl.appendChild(div);
  });
};

// show modal
const showModalD = async (petId) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();
  const modalContent = document.getElementById("modal-content");
  document.getElementById("customModal").showModal();
  modalContent.innerHTML = `
                            <figure class="min-h-56">
                                <img class="h-full w-full object-cover" src=${
                                  data.petData?.image || "Not Available"
                                }
                                    alt="pets" />
                            </figure>
                            <div class="card-body mb-2">
                                <div class="flex flex-col md:flex-row md:gap-16 md:items-center">
                                    <div>
                                        <h2 class="card-title font-bold text-xl mb-4">
                                            ${
                                              data.petData?.pet_name ||
                                              "Not Available"
                                            }
                                        </h2>
                                        <div class="flex gap-2 items-center">
                                            <div>
                                                <img src="images/Frame (4).png" alt="">
                                            </div>
                                            <div>
                                                <p>Breed: ${
                                                  data.petData?.breed ||
                                                  "Not Available"
                                                }</p>
                                            </div>
                                        </div>

                                        <div class="flex gap-2 items-center">
                                            <div>
                                                <img src="images/Frame (2).png" alt="">
                                            </div>
                                            <div>
                                                <p>Gender: ${
                                                  data.petData?.gender ||
                                                  "Not Available"
                                                }</p>
                                            </div>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <div>
                                                <img src="images/Frame (2).png" alt="">
                                            </div>
                                            <div>
                                                <p>Vaccinated status: Partially</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex gap-2 items-center mt-4">
                                            <div>
                                                <img src="images/Frame (1).png" alt="">
                                            </div>
                                            <div>
                                                <p>Birth: ${
                                                  data.petData?.date_of_birth ||
                                                  "Not Available"
                                                }</p>
                                            </div>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <div>
                                                <img src="images/Frame (3).png" alt="">
                                            </div>
                                            <div>
                                                <p>Price: $${
                                                  data.petData?.price ||
                                                  "Out Of Stock"
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="font-semibold text-base mt-8 mb-3">Details Information</h2>
                                    <p>${
                                      data.petData?.pet_details ||
                                      "Not Available"
                                    }</p>
                                </div>

                            </div>
                            
                            <div class="modal-action">
                                <form method="dialog">
                                  
                                    <button class="btn w-full text-[#0E7A81] text-xl bg-[#0e79811c] hover:bg-[#0E7A81] hover:text-white">Close</button>
                                </form>
                            </div>
  `;
};

// show count down modal
const showCountDown = (id) => {
  my_modal_1.showModal();
  let countValue = 4;
  const countNumberEl = document.getElementById("count-number");

  const countDown = setInterval(() => {
    countValue--;
    countNumberEl.innerText = countValue;
    if (countValue <= 0) {
      clearInterval(countDown);
      my_modal_1.close();
      document.getElementById(`adopt-btn-${id}`).innerText = "Adopted";
      document.getElementById(`adopt-btn-${id}`).classList.add("active");
    }
  }, 1000);
};

const removeClassBtn = () => {
  const buttons = document.getElementsByClassName("category-btn");

  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// display pets by categories
const displayCategories = (categories) => {
  const btnCategoriesContainer = document.getElementById("btn-container");

  categories.forEach((item) => {
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
        <button id="btn-${item.id}"
        onClick="loadCategoriesPets('${item.category}','${item.id}')" 
        class="btn mr-10 category-btn font-bold md:text-xl px-14 rounded-full
           bg-[#0e798131] text-[#0E7A81]  lg:hover:bg-[#0E7A81] hover:text-white">
                <img class="hidden xl:block w-7" src="${item.category_icon}" alt="">
           
           <span>${item.category}</span>
        </button>

    `;
    btnCategoriesContainer.append(btnContainer);
  });
};

// like post section
const likePost = (image) => {
  const likePostContainerEl = document.getElementById("like-pets-container");
  const div = document.createElement("div");
  div.innerHTML = `
              <div>
                <img class="w-full rounded-md" src='${image}' alt="">
              </div>       
  `;
  likePostContainerEl.append(div);
};
loadCategories();
