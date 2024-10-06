const loadAllPets = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  displayPets(data.pets);
};
loadAllPets();

// load categories pets
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  //   const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};
loadCategories();

// display all pets
const displayPets = (pets) => {
  const petsContainerEl = document.getElementById("pets-container");
  pets.forEach((pet) => {
    // console.log(pet);
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <div class="card bg-base-100 p-5 w-96 border">
                            <figure class="h-52">
                                <img class="h-full w-full object-cover" src=${
                                  pet.image
                                }
                                    alt="pets" />
                            </figure>
                            <div class="card-body mb-2">
                                <h2 class="card-title font-bold text-xl">
                                    ${pet.pet_name}
                                </h2>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (4).png" alt="">
                                    </div>
                                    <div>
                                        <p>Breed: ${pet?.breed || "N/A"}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (1).png" alt="">
                                    </div>
                                    <div>
                                        <p>Birth: ${
                                          pet?.date_of_birth || "N/A"
                                        }</p>
                                    </div>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (2).png" alt="">
                                    </div>
                                    <div>
                                        <p>Gender: ${pet?.gender || "N/A"}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <div>
                                        <img src="images/Frame (3).png" alt="">
                                    </div>
                                    <div>
                                        <p>Price: ${
                                          pet?.price || "Out Of Stock"
                                        } $</p>
                                    </div>
                                </div>
                                <hr class="mt-4 border">
                                <div class="card-actions justify-evenly mt-4">
                                    <div class="badge badge-outline py-3 px-4 text-xl">
                                        <button>

                                            <img src="images/Frame 1171276315.png" alt="">
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            class="badge badge-outline py-3 px-4 text-[#0E7A81] text-xl hover:bg-[#0E7A81] hover:text-white">
                                            Adopt
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            class="badge badge-outline py-3 px-4 text-[#0E7A81] text-xl hover:bg-[#0E7A81] hover:text-white">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
    
    `;
    petsContainerEl.appendChild(div);
  });
};

// display pets by categories
const displayCategories = (categories) => {
  const btnCategoriesContainer = document.getElementById("btn-container");

  categories.forEach((items) => {
    console.log(items);
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
        <button  onClick="loadCategoriesPets(${items.category})" class="btn font-bold text-xl px-14 rounded-full bg-[#0E7A81] text-white
                                    lg:hover:bg-[#0E7A81] hover:text-white">${items.category}
                    </button>

    `;
    btnCategoriesContainer.append(btnContainer);
  });
};

// // load category pets
// const loadCategoriesPets = async (id) => {
//   const url = `https://openapi.programming-hero.com/api/peddy/category/${id}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   //   displayPets(data.petData.category);
//   console.log(data);
// };
// loadCategoriesPets();
