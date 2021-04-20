
// Render html footer
function renderHtmlFooter(linkImageFolder) {
    document.querySelector('footer.footer').innerHTML = `
    <div class="grid wide">
    <div class="row">
        <div class="col l-2-4 m-6 c-12">
            <h3 class="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
            <ul class="footer__list">
                <li class="footer__item">
                    <a href="" class="footer__item-link">Trung Tâm Trợ Giúp</a>
                </li>
                <li class="footer__item">
                    <a href="" class="footer__item-link">Phản Hồi Khách Hàng</a>
                </li>
                <li class="footer__item">
                    <a href="" class="footer__item-link">Hướng Dẫn Mua Hàng</a>
                </li>
            </ul>
        </div>
        <div class="col l-2-4 m-6 c-12 footer--mobile-margin">
            <h3 class="footer__heading">VỀ CHÚNG TÔI</h3>
            <ul class="footer__list">
                <li class="footer__item">
                    <a href="" class="footer__item-link">Giới Thiệu Về Shop</a>
                </li>
                <li class="footer__item">
                    <a href="" class="footer__item-link">Tuyển Dụng</a>
                </li>
                <li class="footer__item">
                    <a href="" class="footer__item-link">Điều Khoản Shop</a>
                </li>
            </ul>
        </div>
        <div class="col l-2-4 m-0 c-0">
            <h3 class="footer__heading">THANH TOÁN</h3>
        </div>
        <div class="col l-2-4 m-6 c-12 footer--tablet-mobile-margin">
            <h3 class="footer__heading">THEO DÕI CHÚNG TÔI TRÊN</h3>
            <ul class="footer__list">
                <li class="footer__item footer__item--social">
                    <a href="#" class="footer__item-link">
                        <i class="footer__item-icon fab fa-facebook"></i>
                        <span class="footer__item-label">Facebook</span>
                    </a>
                </li>
                <li class="footer__item footer__item--social">
                    <a href="#" class="footer__item-link">
                        <i class="footer__item-icon fab fa-instagram"></i>
                        <span class="footer__item-label">Instagram</span>
                    </a>
                </li>
                <li class="footer__item footer__item--social">
                    <a href="#" class="footer__item-link">
                        <i class="footer__item-icon fab fa-linkedin"></i>
                        <span class="footer__item-label">Linkedln</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col l-2-4 m-6 c-0 footer--tablet-margin">
            <h3 class="footer__heading">VÀO CỬA HÀNG TRÊN ỨNG DỤNG</h3>
            <div class="footer__download">
                <a href="#" style="text-decoration: none">
                        <img class="footer__download-QR" src="${linkImageFolder}/image/QR.png">
                </a>
                <div class="footer__download-apps">
                    <a href="#" class="footer__down-link">
                        <img class="footer__download-apps-img" src="${linkImageFolder}/image/App Store.png">
                    </a>
                    <a href="#" class="footer__down-link">
                        <img class="footer__download-apps-img" src="${linkImageFolder}/image/Google Play.png">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="footer-bottom">
    <ul class="footer-bottom__list">
        <li class="footer-bottom__item">
            <a href="#" class="footer-bottom__item-link">CHÍNH SÁCH BẢO MẬT</a>
        </li>
        <li class="footer-bottom__item">
            <a href="#" class="footer-bottom__item-link">QUY CHẾ HOẠT ĐỘNG</a>
        </li>
        <li class="footer-bottom__item">
            <a href="#" class="footer-bottom__item-link">CHÍNH SÁCH VẬN CHUYỂN</a>
        </li>
        <li class="footer-bottom__item">
            <a href="#" class="footer-bottom__item-link">CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</a>
        </li>
    </ul>
    <div class="footer-bottom__logo">
        <a href="#" class="footer-bottom__logo-link">
            <div class="footer-bottom__img" style="background-image: url('${linkImageFolder}/image/Dang\ ky\,\ thong\ bao\ website\ thuong\ mai\ dien\ tu.png')"></div>
        </a>
    </div>
    <div class="footer-bottom__address">Địa chỉ: Thôn 3, Xã Canh Nậu, Huyện Thạch Thất, Hà Nội</div>
    <div class="footer-bottom__copyright">
        <i class="far fa-copyright"></i> 2020 - Bản quyền thuộc về Công Ty TTT
    </div>
</div>`;
}