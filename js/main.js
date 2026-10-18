var contactModal = document.getElementById("contactModal");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var avatarInput = document.getElementById("avatarInput");
var contactId = document.getElementById("contactId");
var totalContacts = document.getElementById("totalContacts");
var searchInput = document.getElementById("searchInput");
var avatarPreview = document.getElementById("avatarPreview");
var totalContactsSpan = document.getElementById("totalContactsSpan");

var contactList = [];

if (localStorage.getItem("contactArray") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactArray"));
  displayContact(contactList);
}

function saveContact() {
  var currentIndex = contactId.value;
  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    group: contactGroup.value,
    notes: contactNotes.value,
    image: `./img/${avatarInput.files[0].name}`,
  };
  if (contactId.value !== "") {
    contactList[currentIndex] = contact;

    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully.",
      icon: "success",
    });
  } else {
    contactList.push(contact);
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
      timer: 2000,
    });
  }
  localStorage.setItem("contactArray", JSON.stringify(contactList));
  displayContact(contactList);
  contactModal.classList.add("d-none");
  clearInputValues();
}

function clearInputValues() {
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";
  avatarInput.value = "";
  avatarPreview.innerHTML = `<i class="fas fa-user"></i>`;
  contactName.classList.remove("is-valid")
}

function displayContact(array) {
  totalContacts.innerHTML = `${array.length}`;
  totalContactsSpan.innerHTML = array.length;
  var cartona = "";
  if (array.length === 0) {
    cartona += `
    <div class="col-12 text-center py-5">
      <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
        rounded-4" style="width: 80px; height: 80px;">
        <i class="fas fa-address-book text-secondary fs-4"></i>
      </div>
      <p class="text-muted fw-semibold mb-1">No contacts found</p>
      <p class="text-secondary small">
        Click <strong>"Add Contact"</strong> to get started
      </p>
    </div>`;
  } else {
    for (var i = 0; i < array.length; i++) {
      cartona += `
            <div  class="col-md-6 col-lg-12 col-xl-6 mb-4">
                <div class="contact-card">
                    <div class="contact-card-header">
                        <div class="d-flex align-items-start justify-content-start gap-3">
                            <div class="position-relative flex-shrink-0  ">
                                <img src="${array[i].image}" alt="sssss"
                                    class="contact-card-avatar object-fit-cover">
                                        <div id="heartIcon${i}"
                                            class="badge-icon d-none badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                            <i class="fas fa-heart-pulse"></i>
                                        </div>
                                        <div id="imgstar${i}"
                                            class="badge-icon d-none badge-star d-flex justify-content-center align-items-center rounded-circle">
                                            <i class="fas fa-star"></i>
                                        </div>
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${array[i].name}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${array[i].phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                   
                                    <div class="contact-details">
                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${array[i].email}</span>
                                        </div>

                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${array[i].address}</span>
                                        </div>
                                    </div>

                               
                                    <div class="contact-tags d-flex align-items-center">
                                        <span class="contact-tag d-inline-flex align-items-center">${array[i].group}</span>
                                        <span id="emergencyBadge${i}" class="contact-tag d-none text-danger align-items-center gap-2 px-2 py-1">
                                        <i class="fas fa-heart-pulse fa-s" ></i>
                                         Emergency
                                        </span>
                                    </div>
                                </div>

                             
                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:01161615618" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button onclick="favoritesContact(${i})"  class="action-button favorite" id="favBtn" title="Favorite">
                                            <i id="favoritesIcon${i}" class="far fa-star"></i>
                                        </button>
                                        <button onclick="emergncyContact(${i})" class="action-button emergency" id="emergncyBtn${i}" title="Emergency">
                                            <i id="emergncyIcon${i}" class="far fa-heart"></i>
                                        </button>
                                        <button onclick="getProductToUpdate(${i})" class="action-button edit" id="editBtn" title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button onclick="deletCotact(${i})" class="action-button delete"id="deleteBtn" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
        `;
    }
  }
  document.getElementById("contactCardContainer").innerHTML = cartona;
}

function previewImage() {
  if (avatarInput.files[0]) {
    var fileName = avatarInput.files[0].name;
    avatarPreview.innerHTML = `<img src="./img/${fileName}" class="w-100 h-100 object-fit-cover rounded-4">`;
  }
}

function addContact() {
  contactModal.classList.remove("d-none");
}

function closeModalBtn() {
  contactModal.classList.add("d-none");
}

function cancelBtn() {
  contactModal.classList.add("d-none");
}

function deletCotact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[index].name} ? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("contactArray", JSON.stringify(contactList));
      displayContact(contactList);

      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
      });
    }
  });
}

function getProductToUpdate(index) {
  contactId.value = index;
  contactName.value = contactList[index].name;
  contactAddress.value = contactList[index].address;
  contactEmail.value = contactList[index].email;
  contactGroup.value = contactList[index].group;
  contactPhone.value = contactList[index].phone;
  contactNotes.value = contactList[index].notes;
  contactModal.classList.remove("d-none");
}

function contactSearch() {
  var searchValue = searchInput.value;
  var searchArray = [];
  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()) ||
      contactList[i].address
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()) ||
      contactList[i].email
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()) ||
      contactList[i].phone
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()) ||
      contactList[i].group
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()) ||
      contactList[i].notes
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    ) {
      searchArray.push(contactList[i]);
    }
  }
  displayContact(searchArray);
}

function emergncyContact(index) {
  var heartIcon = document.getElementById(`heartIcon${index}`);
  var bigEmergncy = document.getElementById("bigEmergencyItem");
  var emergencyBadge = document.getElementById(`emergencyBadge${index}`);
  var icon = document.getElementById(`emergncyIcon${index}`);
  var emergencyBtn = document.getElementById(`emergncyBtn${index}`);
  var totalEmergencyContacts = document.getElementById(
    `totalEmergencyContacts`,
  );

  if (icon.classList.contains("fa-heart")) {
    icon.classList.remove("fa-heart");
    icon.classList.add("fa-heart-pulse");
    icon.classList.remove("far");
    icon.classList.add("fas");
    emergencyBtn.classList.add("is-active");

    heartIcon.classList.remove("d-none");

    emergencyBadge.classList.remove("d-none");

    document.getElementById("emptyStateEmergency").classList.add("d-none");

    bigEmergncy.innerHTML += `
    <div class="col-12">
    <div id="smallEmergncyItem${index}"
        class="contact-item-emergency d-flex align-items-center gap-3 p-2 rounded-3">
    <div class="flex-shrink-0">
        <img src="${contactList[index].image}" alt="sssss" class="contact-avatar" />
    </div>
    <div class="flex-grow-1 text-truncate">
        <h4 class="mb-0 fw-medium text-dark small text-truncate">${contactList[index].name}</h4>
        <p class="mb-0 text-muted small text-truncate">${contactList[index].phone}</p>
    </div>
    <a href="tel:${contactList[index].phone}"
        class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
        <i class="fas fa-phone"></i>
        </a>
    </div>
   </div>
      
   `;
  } else {
    icon.classList.add("fa-heart");
    icon.classList.remove("fa-heart-pulse");
    icon.classList.add("far");
    icon.classList.remove("fas");
    emergencyBtn.classList.remove("is-active");

    heartIcon.classList.add("d-none");

    emergencyBadge.classList.add("d-none");
    bigEmergncy.innerHTML = "";
    bigEmergncy.innerHTML += `           
        <div id="emptyStateEmergency" class="empty-state">
            <p class="text-muted mb-0">No emergency contacts</p>
        </div>
    
    `;
  }

  var counter = 0;
  for (var i = 0; i < contactList.length; i++) {
    var icon = document.getElementById(`emergncyIcon${i}`);
    if (icon && icon.classList.contains("fa-heart-pulse")) {
      counter++;
    }
  }
  totalEmergencyContacts.innerHTML = counter;
}

function favoritesContact(index) {
  var favIcon = document.getElementById(`favoritesIcon${index}`);
  var imgstar = document.getElementById(`imgstar${index}`);
  var smallFavItem = document.getElementById(`smallFavItem${index}`);
  var bigFavItem = document.getElementById("bigFavItem");
  var totalFavContacts = document.getElementById("totalFavContacts");

  if (favIcon.classList.contains("far")) {
    //star Btn
    favIcon.classList.remove("far");
    favIcon.classList.add("fas");
    //img icon
    imgstar.classList.remove("d-none");

    document.getElementById("emptyStateFav").classList.add("d-none");

    bigFavItem.innerHTML += `
                    <div class="col-12">
                    <div
                      id="smallFavItem${index}"
                      class="contact-item d-flex justify-content-between align-items-center gap-3 p-2 rounded-3 mb-3"
                    >
                      <div class="flex-shrink-0">
                        <img
                          src="${contactList[index].image}"
                          alt="sssss"
                          class="contact-avatar"
                        />
                      </div>
                      <div class="flex-grow-1 text-truncate">
                        <h4
                          class="mb-0 fw-medium text-dark small text-truncate"
                        >
                         ${contactList[index].name}
                        </h4>
                        <p class="mb-0 text-muted small text-truncate">
                          ${contactList[index].phone}
                        </p>
                      </div>
                      <a
                        href="tel:${contactList[index].phone}"
                        class="call-btn d-flex align-items-center justify-content-center flex-shrink-0"
                      >
                        <i class="fas fa-phone"></i>
                      </a>
                    </div>
                  </div>
    `;
  } else {
    //starBtn
    favIcon.classList.add("far");
    favIcon.classList.remove("fas");
    //img icon
    imgstar.classList.add("d-none");

    bigFavItem.innerHTML = "";
    bigFavItem.innerHTML += `
     <div class="col-12">
      <div id="emptyStateFav" class="empty-state">
        <p class="text-muted mb-0">No favorites yet</p>
      </div>
      </div>
    `;
  }

  var counter = 0;
  for (var i = 0; i < contactList.length; i++) {
    var favIcon = document.getElementById(`favoritesIcon${i}`);
    if (favIcon && favIcon.classList.contains("fas")) {
      counter++;
    }
  }
  totalFavContacts.innerHTML = counter;
}

function validateContactName() {
  var contactNameError = document.getElementById("contactNameError")
  var contactNameRegex = /^[A-Za-z]{2,50}$/
  if(contactNameRegex.test(contactName.value)){
    contactName.classList.add("is-valid")
    contactName.classList.remove("is-invalid")
    contactNameError.classList.add("d-none")
  }else{
    contactName.classList.remove("is-valid")
    contactName.classList.add("is-invalid")
    contactNameError.classList.remove("d-none")
  }
}
