
// Input search (user onMounseDown event for searchHistory)
function search() {
    var inputSearch = document.querySelector('.header__search-input');
    var searchHistory = document.querySelector('.header__search-history');
    var listHistory = document.querySelector('.header__search-history-list');
    
    /*inputSearch.addEventListener('focus', function(event) {
        searchHistory.style.display = "block";
    });

    inputSearch.addEventListener('focusout', function(event) {
        searchHistory.style.display = "none";
    });*/

    searchHistory.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });

    listHistory.addEventListener('mouseup', function(event) {
        inputSearch.value = event.target.innerText;
        /*searchHistory.style.display = "none";*/
    });
}

//Header-search checkbox
function searchCheckboxWrap() {
    var searchCheckbox = document.querySelector('.header__search-checkbox');
    var checkboxItems = document.querySelectorAll('.search__checkbox-item');
    var firstItem = document.querySelector('.search__checkbox-item');

    for(var item of checkboxItems) {
        item.onclick = function(event) {
            searchCheckbox.querySelector('span').outerHTML = event.currentTarget.querySelector('span').outerHTML;
            if(!event.currentTarget.matches('.search__checkbox-item--choose')) {
                event.currentTarget.querySelector('.fas.fa-check').style.display = 'inline-block';
                firstItem.querySelector('.fas.fa-check').style.display = "none";
            } else {
                firstItem.querySelector('.fas.fa-check').style.display = "inline-block";
                for(var item of checkboxItems) {
                    if(!item.matches('.search__checkbox-item--choose')) {
                        item.querySelector('.fas.fa-check').style.display = 'none';
                    }
                }
            }
        }
    }
}

// Navbar-account
function account() {

    var modalElement = document.querySelector('.modal');
    var registerFormWrap = document.querySelector('.auth-form.register-form');
    var loginFormWrap = document.querySelector('.auth-form.login-form');
    var moveForm = document.querySelectorAll('.move-form');
    var registerForm = document.querySelector('#register-form');
    var loginForm = document.querySelector('#login-form');
    var inputElements = document.querySelectorAll('input[name][data-rule]');
    var backButton = document.querySelectorAll('.btn.btn--back');
    var overlay = document.querySelector('.modal__overlay');
    var chatBtn = document.querySelector('.chat__conversation--btn');
    overlay.addEventListener('click', showModal);
    chatBtn.addEventListener('click', showModal);

    // Thêm sự kiện click cho 2 nút back
    for(var button of backButton) {
        button.addEventListener('click', showModal);
    }
    for(var btn of moveForm) {
        btn.addEventListener('click', showModal);
    }

    var modalBody = document.querySelector('modal__body');
    function showModal(event){
        if(!event.target.matches('.move-form')) {
            modalElement.classList.toggle('modal-show');
            
            // Reset form khi nhấn btnBack hoặc overlay
            if(event.currentTarget.matches('.btn.btn--back') || event.currentTarget.matches('.modal__overlay')) {
                registerForm.reset();
                loginForm.reset();
                Array.from(inputElements).forEach( function(inputElement) {
                    resetValidate(inputElement, true);
                })
            }
        }

        if(event.target.classList.contains('navbar-item-register') || event.target.matches('.auth-form__header-Dk-right')) {
            registerFormWrap.style.display = "block";
            loginFormWrap.style.display = "none";
        }
        else {              // || event.target.matches('.auth-form__header-Dn-right') || event.target === chatBtn
            registerFormWrap.style.display = "none";
            loginFormWrap.style.display = "block";
        }
    }

    // Register
    var registerElement = document.querySelector('.navbar-item-register');
    registerElement.addEventListener('click', showModal);

    // Log-in
    var loginElement = document.querySelector('.navbar-item-login');
    loginElement.addEventListener('click', showModal);
}

// Chat
function chat() {
    var chat = document.querySelector('.chat');
    var chatOn = document.querySelector('.chat-on');
    var chatOff = document.querySelector('.chat-off');
    var chatClose = document.querySelector('.chat__heading-collapse');

    chatOff.addEventListener('click', function(event) {
        chat.style.animation = 'growth-origin 0.3s ease-out';
        chatOn.style.display = 'block';
        chatOff.style.display = 'none';
    })

    chatClose.addEventListener('click', function(e) {
        chatOff.style.display = 'block';
        chat.removeAttribute('style');
        chatOn.style.display = 'none';
    })
}

function getParent(element, selector) {
    while(element.parentElement) {
        if(element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

/*Tạo biến này để lưu(coppy) lại hàm validate vì ở phần account() ta cần dùng đến hàm validate nhưng hàm này lại là con của 1 hàm khác(=> validate là hàm local => không thể gọi nó ở ngoài)
 giải pháp:  ta phải tạo 1 biến global lưu cái hàm validate*/
 var resetValidate;

 // Validate Form
 function Validator(selector) {
 
     var isFormValid;
     var currentUserInfor = localStorage.getItem('currentUser');

    // Lấy data của user đang login trên localStorage
    if(currentUserInfor) {
        // và hiển thị thông tin
        loggedInUser(JSON.parse(currentUserInfor));
    }

    // Lưu thông tin user vừa login nên localStorage
    function setInfoCurrentUser(formValue) {
        localStorage.setItem('currentUser', JSON.stringify(formValue));
    }

     // Lưu data user đăng ký nên localStorage và trả về false nếu tài khoản đã tồn tại ngược lại là true.
     function setDataUser(formValue) {
         var dataUsers = JSON.parse(localStorage.getItem('users'));
         // Tránh trh user xóa data trên localStorage xong mới đăng ký.
         if(!dataUsers) {
             dataUsers = [];
         }
         // Kiểm tra và chắc chắn rằng tài khoản vừa nhập ko trùng với 1 account nào đó đã có rồi trên localStorage
         for(user of dataUsers) {
             if(user.email === formValue.email) {
                 return false;
             }
         }
         dataUsers.push(formValue);
         localStorage.setItem('users', JSON.stringify(dataUsers));
         return true;
     }
 
     // Lấy data user trên localStorage và kiểm tra có user nào trùng với thông tin(email, password) mà người dùng vừa nhập vào không, trả về true nếu trùng nhau ngược lại là false?
     function getDataUser(formValue) {
         var dataUsers = JSON.parse(localStorage.getItem('users'));
         if(dataUsers) {
             for(user of dataUsers) {
                 if(user.email === formValue.email && user.password === formValue.password) {
                     return true;
                 }
             }
         } else return false;
     }
 
     // Kiểm tra lỗi và hiển thị
     function validate(inputElement, resetForm) {
         var formGroup = getParent(inputElement, '.auth-form__form-child');
         var formMessage = formGroup.querySelector('.auth-form__form-message');
 
         // không cần dùng đến code này khi ta reset lại form(ở phần function account);
         if(!resetForm) {
             var checkElement;
             var errorMessage = rules['isRequired'](inputElement.value);
 
             //Xác định rằng trường này có 1 rule nào ngoài isRequired ko?
             if(inputElement.dataset['rule'] === 'true') {
                 checkElement = rules[inputElement.name](inputElement.value);
             }
 
             if(checkElement && inputElement.value !== '') {
                 errorMessage = checkElement;
             }
         }
 
         if(errorMessage) {
             isFormValid = false;
             formGroup.classList.add('inValid');
             formMessage.innerHTML = errorMessage;
         } else {
             formMessage.innerHTML = '';
             formGroup.classList.remove('inValid');
         }
     }
 
     resetValidate = validate;
 
     var formElement = document.querySelector(selector);
 
     if(formElement) {
         var inputElements = formElement.querySelectorAll('input[name]');
         if(inputElements) {
             
             //Lặp qua mỗi inputElement và lắng nghe sự kiên blur, input, ...
             Array.from(inputElements).forEach( function(inputElement) {
                 
                 //Xử lý trường hợp blur khỏi input
                 inputElement.addEventListener('blur', function(event) {
                     validate(event.target, false);  // tham số thứ 2 dùng để chỉ định rằng mục đích không phải để reset form, mà là ktra tính hợp hệ của các trường
                 })
 
                 //Xử lý mỗi khi người dùng nhập vào input
                 inputElement.addEventListener('input', function(event) {
                     var formGroup = getParent(event.target, '.auth-form__form-child');
                     var formMessage = formGroup.querySelector('.auth-form__form-message');
                     formMessage.innerHTML = '';
                     formGroup.classList.remove('inValid');
                 })
             })
         }
     }
 
     var formValue = {};
     formElement.addEventListener('submit', submitForm);
     
     function submitForm(event) {
         isFormValid = true;
         Array.from(inputElements).forEach( function(inputElement) {
             // Kiểm tra tất cả trường xem có hợp lệ không
             validate(inputElement, false);
             // Lấy thông tin user nhập và cho vào 1 object
             formValue[inputElement.name] = inputElement.value;
         })
 
         event.preventDefault();
         if(isFormValid) {
             //Xử lý khi click vào btn register
             if(formElement.matches('#register-form')) {
                 var setData = setDataUser(formValue);
                 if(setData) {
                     formElement.reset();
                     alert('Đăng ký thành công.');
                 } else {
                     alert('Tài khoản đã tồn tại! Vui lòng nhập email khác.');
                 }
             }   //Xử lý khi click vào btn login(Khi login succesful)
             else if(formElement.matches('#login-form')) {
                 var getData = getDataUser(formValue);
                 if(getData) {
                     alert('Đăng nhập thành công.');
                     document.querySelector('.modal').classList.toggle('modal-show');
                     loggedInUser(formValue);
                     setInfoCurrentUser(formValue);
                     dropDataCart();
                 } else {
                     alert('Tài khoản nhập chưa đúng. Hoặc không tồn tại!\nVui lòng kiểm tra lại.');
                 }
             }
         }
     }
 
     // Phần define rules for form
     var rules = {
         isRequired: function(value) {
             return value ? undefined : 'Vui lòng nhập trường này';
         },
 
         email: function(value) {
             var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
             return regex.test(value) ? undefined : 'Vui lòng nhập Email';
         },
 
         password: function(value) {
             return value.length >= 8 ? undefined : 'Vui lòng nhập ít nhất 8 ký tự';
         },
         
         confirmation: function(value) {
             var valuePassword = formElement.querySelector('input[name=password]').value;
             return value === valuePassword ? undefined : 'Mật khẩu nhập lại không chính xác';
         },
     }
 }
 
 // Hành động khi user đã đăng nhập
 function loggedInUser(formValue) {
     var registerElement = document.querySelector('.navbar-item-register');
     var accountUserName = document.querySelector('.header__navbar-user');
     var userName = document.querySelector('.header__navbar-user--name');
     var userAvatar = document.querySelector('.header__navbar-user--img');
     var loginChat = document.querySelector('.chat__conversation-login');
 
     // Ẩn phần login ở chỗ chat
     loginChat.style.display = 'none';
 
     registerElement.style.display = 'none';
     registerElement.nextElementSibling.style.display = 'none';
 
     //Thay đổi tên & avatar của user
     if(formValue.email !== 'nguyenductuyen745@gmail.com') {
        var lastIndex = formValue.email.search(/([0-9])|([@])/);
        userName.innerHTML = formValue.email.slice(0,lastIndex);

        // vì là file chung nên đường link chèn phải sẽ phải linh động và ko đc set cứng( ở đây ta lấy link của 1 element có link chuẩn của trang và dựa vào đó set link cho đt)
        var linkUserAvatar = document.querySelector('.header__QR-img').src;
        userAvatar.setAttribute('src', `${linkUserAvatar.slice(0, linkUserAvatar.lastIndexOf('image/'))}image/default-avatar.png`);
     }
     accountUserName.style.display = 'flex';
     
     // Khi user chọn nút Đăng Xuất
     var logoutElement = document.querySelector('.navbar-user-item--logout');
     logoutElement.addEventListener('click', function(event) {
         localStorage.removeItem('currentUser');
         location.reload();
     })
 }

 var updateCart;
 // Phần giỏ hàng
function Cart() {

    // Update lại số lượng product đã thêm vào cart và hiển thị nên cart-notice
    function updateNotice() {
        var noticeCartElement = document.querySelector('.header__cart-notice');
        var listProducts = document.querySelector('.cart__list-item');
        
        noticeCartElement.innerHTML = listProducts.childElementCount;
        if(listProducts.childElementCount === 0) {
            document.querySelector('.header__cart-list').classList.add('header__cart-list--nocart');
            document.querySelector('.cart__list-bottom').style.display = "none";
            document.querySelector('.cart__heading').style.display = "none";
        } else {
            document.querySelector('.header__cart-list').classList.remove('header__cart-list--nocart');
            document.querySelector('.cart__list-bottom').style.display = '';
            document.querySelector('.cart__heading').style.display = '';
        }
    }
    updateNotice();
    updateCart = updateNotice;

    // Thêm thông tin sản phẩm nên rỏ hàng
    var currentProductInfor = JSON.parse(localStorage.getItem('chosenProduct'));
    var additionButton = document.querySelectorAll('.btn.right-action__add-cart');

    for(var btn of additionButton) {
        btn.addEventListener('click', addProductInfor);
    }

    // Hàm thêm sản phẩm khi nhấn thêm product
    function addProductInfor() {
        var totalQuantity;
        var quantityProduct = document.querySelector('input.right-detail__quantity-current').value;
        var notifySuccessful = document.querySelector('.addition-cart-successful');
        var listProducts = document.querySelectorAll('.cart__item');
        var isLike = false;

        // Từ lần thứ 2 thì kiểm tra các item xem nếu item nào giống thì chỉ update lại số lượng
        if(listProducts.length > 0) { 
            for(var item of listProducts) {
                if(item.querySelector('.cart__infor-top--name').innerText === currentProductInfor['name'] && item.querySelector('.cart__item--img').getAttribute('src') === currentProductInfor['image']) {
                    currentQuantity = item.querySelector('.cart__infor-top--soluong');
                    currentQuantity.innerText = Number(currentQuantity.innerText) + Number(quantityProduct);
                    totalQuantity = Number(currentQuantity.innerText);
                    isLike = true;
                    break;
                }
            }
            if(!isLike) {
                insertProduct(currentProductInfor, quantityProduct);
                totalQuantity = quantityProduct;
            }

        } else{ // Chèn thằng sản phẩm khi đó là sp đầu tiên
            insertProduct(currentProductInfor, quantityProduct);
            totalQuantity = quantityProduct;
        }

        // Hiển thị notify thêm hàng thành công
        notifySuccessful.style.display = 'block';
        setTimeout(function() {
            notifySuccessful.style.display = 'none';
        }, 2200)

        // Thêm sự kiện cho nút xóa;
        removeCartItem();
        //
        updateNotice();
        setCartInfor(currentProductInfor, totalQuantity);
    }

    // Hàm này để lưu info sản phẩm vừa thêm nên localStorage
    function setCartInfor(productInfor, quantity) {
        var dataUser = JSON.parse(localStorage.getItem('currentUser'));
        var isExist = false;

        // Chỉ lưu data khi user đãn login
        if(dataUser) {
            productInfor['quantity'] = quantity;
            productInfor['userName'] = dataUser['email'];
            var dataCartList = JSON.parse(localStorage.getItem('dataCart'));
            if(!dataCartList) {
                dataCartList = [productInfor];
            } else {
                // Kiểm tra xem product vừa thêm đã tồn tại hay chưa nếu r thì chỉ update lại số lượng thôi
                for(var item of dataCartList) {
                    if(item['name'] === productInfor['name'] && item['userName'] === productInfor['userName'] && item['image'] === productInfor['image']) {
                        item['quantity'] = quantity;
                        isExist = true;
                    }
                }
                if(!isExist) {
                    dataCartList.push(productInfor);
                }
            }
            localStorage.setItem('dataCart', JSON.stringify(dataCartList));
        }
    }
}

// Hàm dùng để chèn sản phẩm vào cuối list cart
function insertProduct(productInfor, quantity) {
    document.querySelector('.cart__list-item').insertAdjacentHTML('beforeend', `
        <li class="cart__item">
            <img class="cart__item--img" src="${productInfor.image}">
            <div class="cart__item--infor">
                <div class="cart__infor-top">
                    <h4 class="cart__infor-top--name">${productInfor.name}</h4>
                    <div class="cart__infor-top--wrap">
                        <span class="cart__infor-top--price">${productInfor.curentPrice}</span>
                        <span class="cart__infor-top--multiply">x</span>
                        <span class="cart__infor-top--soluong">${quantity}</span>
                    </div>
                </div>
                <div class="cart__info-bottom">
                    <span class="cart__info-bottom--classifi">Phân loại hàng: Bạc</span>
                    <span class="cart__info-bottom--remove">
                        <span class="cart__info-bottom--lable hiden-on-mobile-tablet">Xóa</span>
                        <i class="cart__info-bottom--trash-can fas fa-trash-alt"></i>
                    </span>
                </div>
            </div>
        </li>`);
}

// Đổ dataCart trên localStr vào giỏ hàng
function dropDataCart() {
    var dataUser = JSON.parse(localStorage.getItem('currentUser'));
    if(dataUser) {
        // dòng command bên dưới để tránh trg hợp khi customer thêm sp xong mới đang nhập
        document.querySelector('.cart__list-item').innerHTML = '';
        var dataCartUser = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCartUser) {
            for(var product of dataCartUser) {
                if(product['userName'] === dataUser['email']) {
                    insertProduct(product, product['quantity']);
                }
            };
        }
        updateCart();
        removeCartItem();
    }
}

// Sự kiện khi xóa item cart
function removeCartItem() {
    var removeButton = document.querySelectorAll('.cart__info-bottom--lable');
    var trashButton = document.querySelectorAll('.cart__info-bottom--trash-can');
    var listCartItems = document.querySelector('.cart__list-item');
    var cartItem;

    for(var btn of removeButton) {
        btn.onclick = removeItem;
    }
    for(var btn of trashButton) { // vì khi chuyển sang tablet or mobile thì <span>Xóa</span> sẽ thành cái icon thùng rác => cần bắt event cho cả Xóa và icon thùng rác
        btn.onclick = removeItem;
    }

    function removeItem(event) {
        cartItem = getParent(event.target, '.cart__item');
            listCartItems.removeChild(cartItem);
        var dataCart = JSON.parse(localStorage.getItem('dataCart'));
        var dataUser = JSON.parse(localStorage.getItem('currentUser'));

        if(dataCart && dataUser) {
            for(var i=0; i<dataCart.length; i++) {
                if(dataCart[i]['name'] === cartItem.querySelector('.cart__infor-top--name').innerText && dataCart[i]['userName'] === dataUser['email']) {
                    dataCart.splice(i, 1);
                }
            }
        }
        localStorage.setItem('dataCart', JSON.stringify(dataCart));
        updateCart();
    }
}