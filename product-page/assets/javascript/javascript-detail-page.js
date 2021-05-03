
// Lấy infor của sản phẩm mà user chọn trên localStr và Update lại thông tin sp của trang
function UpdateProduct() {
    var productInfor = JSON.parse(localStorage.getItem('chosenProduct'));
    document.querySelector('.left-slider__item-img').style.backgroundImage = `url(${productInfor['image']})`;
    document.querySelector('.products-briefing__left-sourse-img').style.backgroundImage = `url(${productInfor['image']})`;
    document.querySelector('.right-price__sale-off-percent').innerText = productInfor['discountPercent'];
    document.querySelector('.right-heading__label').innerText = productInfor['name'];
    document.querySelector('.right-price__current').innerText = productInfor['curentPrice'];
    document.querySelector('.right-price__old').innerText = productInfor['oldPrice'];
}

// Tạo cho thanh scroll mượt hơn;
document.querySelector('.right-detail__info-link').onclick = function(event) {
    document.querySelector('html').style.scrollBehavior = 'smooth';
}

// Phần quantity
function Quantity() {
    var reductionBtn = document.querySelectorAll('button.quantity-button--reduction');
    var increaseBtn = document.querySelectorAll('button.quantity-button--increase');
    var currentQuantity = document.querySelectorAll('input.right-detail__quantity-current');

    for(var btn of reductionBtn) {
        btn.addEventListener('click', function(event){
            if(Number(currentQuantity[1].value) > 1 && Number(currentQuantity[0].value) > 1) {
                currentQuantity[0].value = Number(currentQuantity[0].value) - 1;
                currentQuantity[1].value = Number(currentQuantity[1].value) - 1;
            }
        });
    }

    for(var btn of increaseBtn) {
        btn.addEventListener('click', function(event){
            currentQuantity[0].value = Number(currentQuantity[0].value) + 1;
            currentQuantity[1].value = Number(currentQuantity[1].value) + 1;
        });
    }
}

// Phần replace image
function HoverImage() {
    var primaryImage = document.querySelector('.products-briefing__left-sourse-img');
    var sliderItems = document.querySelectorAll('.left-slider__item-img');

    for(var item of sliderItems) {
        item.addEventListener('mouseenter', function(event) {
            for(var i of sliderItems) {
                if(i.classList.contains('left-slider__item--hover')) {
                    i.classList.remove('left-slider__item--hover');
                }
            }
            event.target.classList.add('left-slider__item--hover');
            primaryImage.style.backgroundImage = event.target.style.backgroundImage;
        });
    }
}

function getParent(element, selector) {
    while(element.parentElement) {
        if(element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

// Phần slider product
function sliderImage() {
    var listImages = document.querySelectorAll('.promotion-combo__products-list');

    // Kiểm tra nếu số lượng ảnh vừa đầy hoặc ít hơn diện tích ô chứa thì tắt button click slider. Còn nếu image vượt quá thới thêm nút slider
    for(var list of listImages) {
        if(list.childElementCount > 6) {
            getParent(list, '.promotion-combo__products').classList.add('promotion-combo__products-full');
        }
    }

    // Phần click
    var countLq = 1;
    var countBc = 1;
    var totalTranslate;
    var totalTranslate2;
    var btnLeft = document.querySelectorAll('.products-button--left');
    var btnRight = document.querySelectorAll('.products-button--right');
    var widthItem = document.querySelector('.promotion-combo__products-item').offsetWidth;

    for(var btn of btnLeft) {
        btn.addEventListener('click', function(event) {
            var getDivParent = getParent(event.currentTarget, '.promotion-combo__products');
            getDivParent.querySelector('.products-button--right').style.display = 'block';
            // Khi ảnh slider đến ảnh đầu tiên thì ẩn đi nút left vì ko thể sang left đc nữa

            if(getDivParent.title === 'lq') {
                totalTranslate = totalTranslate - widthItem;
                sliderAction(totalTranslate, event.currentTarget);
                if(countLq == 2) {
                    event.currentTarget.style.display = 'none';
                }
                countLq--;
            } else {
                totalTranslate2 = totalTranslate2 - widthItem;
                sliderAction(totalTranslate2, event.currentTarget);
                if(countBc == 2) {
                    event.currentTarget.style.display = 'none';
                }
                countBc--;
            }
        })
    }

    for(var btn of btnRight) {
        btn.addEventListener('click', function(event) {
            var getDivParent = getParent(event.currentTarget, '.promotion-combo__products');

            // Khi ảnh slider đến ảnh cuối cùng thì ẩn đi nút right vì ko thể sang right đc nữa(đã kịch)
            
            if(getDivParent.title === 'lq') {
                totalTranslate = widthItem * countLq;
                sliderAction(totalTranslate, event.currentTarget);
                if(countLq === getDivParent.querySelector('.promotion-combo__products-list').childElementCount - 6) {
                    event.currentTarget.style.display = 'none';
                }
                countLq++;
            } else {
                totalTranslate2 = widthItem * countBc;
                sliderAction(totalTranslate2, event.currentTarget);
                if(countBc === getDivParent.querySelector('.promotion-combo__products-list').childElementCount - 6) {
                    event.currentTarget.style.display = 'none';
                }
                countBc++;
            }
            getDivParent.querySelector('.products-button--left').style.display = 'block';
        })
    }

    function sliderAction(param, listElement) {
        getParent(listElement, '.promotion-combo__products').querySelector('.promotion-combo__products-list').style.transform = `translateX(-${param}px)`;
    }

    
}

function showModal() {
    document.querySelector('.modal').classList.toggle('modal-show');
    document.querySelector('.auth-form.register-form').style.display = "none";
    document.querySelector('.auth-form.login-form').style.display = "block";
    setTimeout(() => {
        alert(`Bạn cần phải đăng nhập trước khi có thể sử dụng được chức năng này.

Nếu bạn chưa có tài khoản thì có thể đăng ký tại form đăng ký của chúng tôi, bằng cách click vào ô "đăng ký" ở góc trên bên phải của form đăng nhập.
Xin cảm ơn! `);
    }, 300);
}

// Phan Favourite product
function FavouriteProduct() {
    var favouriteButton = document.querySelector('.left-footer__favourite');
    var favouriteEmpty = document.querySelector('.left-footer__favourite-empty');
    var favouriteFill = document.querySelector('.left-footer__favourite-fill');

    favouriteEmpty.addEventListener('click', Favourite);

    favouriteFill.addEventListener('click', Favourite);

    function Favourite(event) {
        if(localStorage.getItem('currentUser')) {
            favouriteButton.classList.toggle('left-footer__favourite-action');
        } else {
            showModal();
        }
    }
}

// Điều hướng sang trang cart page khi click nút mua hàng
(function direction() {
    var purchaseBtn = document.querySelectorAll('.right-action__buy-now');

    for(var btn of purchaseBtn) {
        btn.addEventListener('click', (event) => {
            if(localStorage.getItem('currentUser')) {
                window.location.href = '../cart-page/cartIndex.html';
            } else {
               showModal();
            }
        })
    }
})();