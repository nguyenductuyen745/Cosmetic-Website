    
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let totalPayment = 0;
    let totalCurrentProducts = 0;
    let numberOfSelectedProducts = 0;
    const dataCart = getLocalStr('dataCart');
    const currentUser = getLocalStr('currentUser');

    function getLocalStr(key) {
        return key && JSON.parse(localStorage.getItem(key));
    }

    function setLocalStr(key, value) {
        key && localStorage.setItem(key, JSON.stringify(value));
    }

    function updateTotalPayment(totalPayment) {
        const totalPaymentElement = $('.footer-total-price > label');

        totalPaymentElement.innerText = Intl.NumberFormat().format(totalPayment).replace(/[,]/g,'.');
    }

    function updateNumberOfSelcPrd() {
        if(numberOfSelectedProducts < 0) {
            numberOfSelectedProducts = 0;
        }
        $('.amount-product-choosen').innerText = $('.classify-all__quanlity').innerText = numberOfSelectedProducts; 
    }

    function totalPriceFnt(unitPrice, quanlity) {
        let totalPrice = Number(unitPrice.replace(/[.,đ]/g, '')) * Number(quanlity);
        return Intl.NumberFormat().format(totalPrice).replace(/[,]/g,'.');
    }

    function totalProductsInCart() {
        // Render tổng số lượng sản phẩm đang có trong rỏ
        const totalProducts = $('.product-total');
        totalProducts.innerText = totalCurrentProducts;
    }

    function RenderProducts() {
        const containerElement = $('.container');
        const indexProducts = []; // để lưu index của các sản phẩm có trong giỏ hàng của currentUser đc tìm thấy ở trong dataCart trên LocalStr để lát update data cho dễ tìm.
        // Đầu tiên trc khi đổ data products của user thì phải check xem user đã logined chưa
        if(currentUser) {
            const listProducts = $('.cart-product-list');
            const dataCartOfCrrUser = dataCart.filter((crrValue, crrindex) => {
                return crrValue.userName === currentUser['email'] && indexProducts.push(crrindex);
            });
            totalCurrentProducts = dataCartOfCrrUser.length;

            // Nếu user đã có sản phẩm trong cart thì sẽ render ra còn chưa thêm sp nào vào cart thì sẽ show notify
            if(dataCartOfCrrUser.length) {
                dataCartOfCrrUser.forEach((crrValue, crrindex) => {
                    let totalPrice = totalPriceFnt(crrValue['curentPrice'], crrValue['quantity']);
                    
                    listProducts.insertAdjacentHTML('beforeend', `
                    <div class="cart-product-item" data-id="${indexProducts[crrindex]}">
                        <div class="cart-product-item__checkbox">
                            <input type="checkbox" style="display: none;" name="sanpham" class="checkbox" id="myCheck-${crrindex + 1}">
                            <label for="myCheck-${crrindex + 1}" class="checkbox-label">
                                <i class="fas fa-check"></i>
                            </label>
                        </div>
                        <div class="cart-product-item__overview">
                            <img class="product-overview-img" src="${crrValue['image']}" alt="">
                            <div class="product-overview-wrap-name">
                                <span class="product-overview-name">${crrValue['name']}</span>
                                <div class="cart-product-item__unit-price unit-price-mobile">
                                    <sup>₫</sup>
                                    <span>${crrValue['curentPrice']}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cart-product-item__unit-price hiden-on-mobile">
                            <sup>₫</sup>
                            <span>${crrValue['curentPrice']}</span>
                        </div>
                        <div class="cart-product-item__quanlity">
                            <button class="quanlity-btn quanlity-btn--reduction">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" name="productQuanlity" value="${crrValue['quantity']}" class="product-quanlity-input">
                            <button class="quanlity-btn quanlity-btn--increase">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="cart-product-item__total-price hiden-on-mobile-tablet">
                            <sup>₫</sup>
                            <span>${totalPrice}</span>
                        </div>
                        <div class="cart-product-item__Manipulation">
                            <!-- Add keyframes-width-grow class to show remove -->
                            <span class="product-item__Manipulation-remove keyframes-width-grow">Xóa</span>
                            <span class="search-product hiden-on-mobile-tablet">Tìm sản phẩm<br/>tương tự</span>
                        </div>
                    </div>`);
                })
                totalProductsInCart();
            } else {
                containerElement.classList.add('cart-empty');
            }
        } else {
            containerElement.classList.add('cart-empty');
        }
    }

    (function Carousel() {
        let numberOfClicked = 0;
        let slidingParam = 0;
        const carouselInner = $('.carousel-inner');
        const nextCrouselBtn = $('.carousel-control-next');
        const prevCrouselBtn = $('.carousel-control-prev');
        const maxNumberOfSlips = Math.ceil(carouselInner.childElementCount / 6);
        
        const delayActElement = (element, status) => {
            setTimeout(() => {
                element.style.display = status;
            }, 500);
        };

        nextCrouselBtn.addEventListener('click', (event) => {
                if(numberOfClicked + 1 < maxNumberOfSlips) {
                    numberOfClicked++;
                    actionSlide('next');
                    if(numberOfClicked + 1 >= maxNumberOfSlips) {
                        delayActElement(nextCrouselBtn, 'none');
                    }
                }
        });

        prevCrouselBtn.addEventListener('click', (event) => {
            if(numberOfClicked > 0) {
                numberOfClicked--;
                actionSlide('prev');
            }
        });


        // Hàm thực thi hành động lướt băng chuyền
        function actionSlide(direction) {
            const carouselInnerWidth = carouselInner.offsetWidth;

            if(direction == 'next') {
                slidingParam += -carouselInnerWidth;
                    // Thực hiện hành bi hiển thị btn prev khi 
                numberOfClicked == 1 && delayActElement(prevCrouselBtn, 'block');
                    // Thực hiện hành vi trượt
                carouselInner.style.transform = `translateX(${slidingParam}px)`;
                
            } else if(direction == 'prev' && numberOfClicked >= 0) {
                slidingParam += carouselInnerWidth;
                    // Thực hiện hành bi ẩn btn prev khi đến giới hạn
                numberOfClicked == 0 && delayActElement(prevCrouselBtn, 'none');
                    // Thực hiện hành vi trượt
                carouselInner.style.transform = `translateX(${slidingParam}px)`;
                    //
                    delayActElement(nextCrouselBtn, 'block');
            }

        }
    })();

    function updateQualityLocalStr(index, newQuality) {
        dataCart[index].quantity = newQuality;
        setLocalStr('dataCart', dataCart);
    }

    function handleEvents() {

        // handle click event when user click reduction or increase btn to edit quanlity
        (function EditQuantity() {
            const quantityBtns = $$('.quanlity-btn');
            if(quantityBtns.length) {
                for(let btn of quantityBtns) {
                    btn.addEventListener('click', (event) => {
                        isReductionBtn = event.currentTarget.classList.contains('quanlity-btn--reduction');
                        let parentElement = event.currentTarget.parentElement;
                        let currentInput = parentElement.querySelector('.product-quanlity-input');
                        let checkboxElement = parentElement.parentElement.querySelector('.cart-product-item__checkbox > input');
                        let unitPrice = Number(parentElement.parentElement.querySelector('.cart-product-item__unit-price > span:last-of-type').innerText.replace(/[.,đ]/g,''));

                        // thay đổi totalPayment sau khi modifed số lượng nếu product đang đc chọn
                        if(checkboxElement.checked) {
                            if(isReductionBtn) {
                               if(currentInput.value != 1) {
                                    totalPayment -= unitPrice;
                               }
                            } else {
                                totalPayment += unitPrice;
                            }
                            updateTotalPayment(totalPayment);
                        }

                        // thay đổi số lượng ở ô input
                        if(isReductionBtn) {
                            if(currentInput.value > 1) {
                                currentInput.value -= 1;
                            }
                        } else {
                            currentInput.value = Number(currentInput.value) + 1;  
                        }

                        // Thay đổi totalPrice khi user modified số lượng cả khi ko đc chọn và khi đc chọn
                        // Phần nãy có vai trò update lại tổng giá tiền của sản phẩm sau khi modified số lượng
                        let totalPriceElement = parentElement.nextElementSibling;
                        let unitPriceElment = parentElement.previousElementSibling;

                        if(totalPriceElement.matches('.cart-product-item__total-price') && unitPriceElment.matches('.cart-product-item__unit-price')) {
                            totalPriceElement.querySelector('span').innerText = totalPriceFnt(unitPriceElment.querySelector('span').innerText, currentInput.value);
                        }

                        //mỗi lần user thay đổi số lượng sp thì số lượng mới đó sẽ đc cập nhật lại ngay trên CSDL(Local Str)
                        updateQualityLocalStr(parentElement.parentElement.dataset['id'], currentInput.value);
                    })
                }
            }
        })();

        function handleCheck(checkboxs, typeOfCheck) {
            for(let checkbox of checkboxs) {
                checkbox.checked = typeOfCheck;
            }
        }

        // hàm xử lý khi user click vào các nút checkbox để chọn sản phẩm muốn mua.
        (function chooseProduct() {
            const events = new Event('change');
            const checkboxInputs = $$('.checkbox');
            const checkboxAllInputs = $$('.checkbox-all');

            for(let input of checkboxInputs) {
                input.addEventListener('change', (event) => {

                    let latestCheckboxInputs = Array.from($$('.checkbox'));
                    let isChecked = event.target.checked;
                    let totalPrice = event.target.parentElement.parentElement.querySelector('.cart-product-item__total-price > span:last-of-type').innerText;
                    
                    // Khi mà user chận tất cả xong tiếp theo bỏ chọn 1 sp thì lúc này các checkbox-all cần phải tắt bỏ đi
                    if(isChecked == false && checkboxAllInputs[0].checked) {
                        handleCheck(checkboxAllInputs, false);
                    }

                    // Khi user click từng sp cho tới khi click đã click hết toàn bộ sản phẩm thì cần phải bật các checkbox-all nên
                    //start
                    const isCheckedAll = latestCheckboxInputs.every((crrValue) => crrValue.checked);
                    isCheckedAll && handleCheck(checkboxAllInputs, true);
                    // end

                    if(isChecked) {
                        totalPayment += Number(totalPrice.replace(/[.]/g,''));
                        ++numberOfSelectedProducts;
                    } else {
                        totalPayment -= Number(totalPrice.replace(/[.]/g,''));
                        --numberOfSelectedProducts;
                    }

                    // update lại số lượng sản phẩm đã chọn
                    updateNumberOfSelcPrd();
                    // update lại tổng giá thanh toán sau khi user chọn phẩm muốn mua
                    updateTotalPayment(totalPayment);
                });
            }

            for(let input of checkboxAllInputs) {
                input.addEventListener('change', (event) => {

                    // Lý do mà phải selection lại các checkbox là do khi user click nút xóa thì ở đom đã xóa pt nhưng biến lưu các pt checkbox ban đầu chưa bị xóa cho nên khi duyệt mạng nó vẫn duyệt tất cả các checkbox ban đầu lúc chưa xóa
                    let latestCheckboxInputs = $$('.checkbox');
                    const isChecked = event.target.checked;

                    // khi 1 checkbox all nào đc check thì tất cả checkbox(checkbox, checkbox-all) đều phải check theo
                    for(let input of latestCheckboxInputs) {
                        let previousChecked = input.checked;
                        
                        input.checked = isChecked ? true : false;
                        // if ở đây để check trh khi user check lẻ 1 sản phẩm trước sau đó click tiếp check-all (nếu ko có if ở đây thì sản phẩm đc check lẻ sẽ bị tính 2 lần giá vào total payment). Tương tự khi mik bỏ check lẻ xong lại tt bỏ check lẻ tất cả sp
                        if(!previousChecked === isChecked) {  
                            input.dispatchEvent(events);
                        }
                    }

                    for(let input of checkboxAllInputs) {
                        input.checked = isChecked ? true : false;
                    }
                });
            }
        })();

        // hàm xử lý khi user click vào nút xóa sản phẩm
        (function removeProduct() {
            const removeElements = $$('.product-item__Manipulation-remove');
            const listProductElement = $('.cart-product-list');
            let countRemove = 0;

            for(let item of removeElements) {
                item.addEventListener('click', (event) => {
                    const itemElement = event.target.parentElement.parentElement;
                    const isChecked = itemElement.querySelector('input.checkbox').checked;
                    const idProduct = itemElement.dataset['id'];
                    const totalPrice = Number(itemElement.querySelector('.cart-product-item__total-price > span:last-of-type').innerText.replace(/[.]/g,''));

                    // Khi xóa sản phẩm thì ta cần phải chỉnh sửa lại giá nhếu product đó đang đc chọn
                    if(isChecked) {
                        totalPayment -= totalPrice;
                        updateTotalPayment(totalPayment);
                        --numberOfSelectedProducts;
                        updateNumberOfSelcPrd();
                    }

                    // Xóa item sản phẩm khỏi list products 
                    listProductElement.removeChild(itemElement);

                    // Khi mà xóa hết sản phẩm trong rỏ thì cần phải show thông báo cart empty
                    if(listProductElement.childElementCount == 0) {
                        $('.container').classList.add('cart-empty');
                    }

                    // Giảm biến thông kê tổng số lượng sp trong cart xuống
                    totalCurrentProducts--;
                    totalProductsInCart();

                    // Xóa item sản phẩm khỏi CSDL(localStr)
                    // Vị trí của product trong dataCart là ko cố định vì khi ta xóa 1 item nào đó thì vị trí sẽ bị dồn nên trên do đáy index sẽ thay đổi
                    dataCart.splice(idProduct - countRemove, 1);
                    setLocalStr('dataCart', dataCart);
                    ++countRemove;
                });
            }
        })();

        // Hàm thực hiện hành vi show nút xóa ra khi user nhấn nút Sửa ở chế độ mobile interface
        (function modifiedClick() {
            const modifiedElement = $('.cart-product-shop__modified');
            const itemElements = $$('.cart-product-item');
            
            modifiedElement.addEventListener('click', (event) => {
                const currentStatus = event.target.innerText;

                for(let item of itemElements) {
                    item.classList.toggle('keyframes-width-grow');
                }

                event.target.innerText = currentStatus === 'Sửa' ? 'Xong' : 'Sửa';
            })
        })();

        // Hàm xử lý khi user click vào nút mua hàng
        (function purchase() {
            const purchaseBtn = $('.footer-checkout');
            purchaseBtn.addEventListener('click', (event) => {
                alert(`Rất tiếc nhưng chức năng mua hàng đang được bảo trì.
Mong bạn thông cảm về sự cố này, chúng tôi sẽ khắc phục nhanh nhất.
Xin cảm ơn!`);
            })
        })();

        // Hàm xử lý chức năng phân loại sản phẩm(classify)
        (function classify() {
            const classifyGroup = $('.cart-product-classify');
            classifyGroup.addEventListener('click', (event) => {

                // Vì chỉ muốn 1 thằng đc active cho nên trc khi add active class cho element user click thì phải remove bỏ active class trên element hiện đang có active class
                classifyGroup.querySelector('.active').classList.remove ('active');

                // Sau khi xóa xong thì sẽ thêm active class cho element mới mà vừa đc user click
                if(event.target.matches('.classify-all__quanlity')) {
                    event.target.parentElement.classList.add('active');
                } else {
                    event.target.classList.add('active');
                }
            })

        })();
    }